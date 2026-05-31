import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

// Paymob HMAC field order for transaction.processed callbacks.
// Per Paymob docs: amount_cents, created_at, currency, error_occured, has_parent_transaction,
// id, integration_id, is_3d_secure, is_auth, is_capture, is_refunded, is_standalone_payment,
// is_voided, order.id, owner, pending, source_data.pan, source_data.sub_type, source_data.type,
// success.
function buildHmacString(tx: Record<string, any>): string {
  const order = tx.order ?? {};
  const sd = tx.source_data ?? {};
  const parts = [
    tx.amount_cents, tx.created_at, tx.currency, tx.error_occured, tx.has_parent_transaction,
    tx.id, tx.integration_id, tx.is_3d_secure, tx.is_auth, tx.is_capture, tx.is_refunded,
    tx.is_standalone_payment, tx.is_voided, order.id, tx.owner, tx.pending,
    sd.pan, sd.sub_type, sd.type, tx.success,
  ];
  return parts.map((v) => (v === undefined || v === null ? "" : String(v))).join("");
}

async function hmacHex(secret: string, payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-512" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const HMAC_SECRET = Deno.env.get("PAYMOB_HMAC_SECRET");
  if (!HMAC_SECRET) {
    console.error("PAYMOB_HMAC_SECRET missing");
    return new Response("Server misconfigured", { status: 500, headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return new Response("Bad JSON", { status: 400, headers: corsHeaders });
  }

  const url = new URL(req.url);
  const receivedHmac = url.searchParams.get("hmac") || req.headers.get("hmac") || "";
  const type = payload?.type;
  const obj = payload?.obj ?? {};

  // Only handle transaction events for now.
  let hmacValid = false;
  if (type === "TRANSACTION" || obj?.amount_cents !== undefined) {
    const toSign = buildHmacString(obj);
    const expected = await hmacHex(HMAC_SECRET, toSign);
    hmacValid = expected === receivedHmac.toLowerCase();
  }

  // Resolve booking via special_reference (== bookingId) or extras.
  const orderId = obj?.order?.id ? String(obj.order.id) : null;
  const merchantOrderId =
    obj?.order?.merchant_order_id ??
    obj?.order?.shipping_data?.extra_description ??
    null;
  const extras = obj?.payment_key_claims?.extra ?? obj?.data?.extras ?? {};
  const bookingId = extras?.booking_id || merchantOrderId || null;

  // Log event regardless of HMAC.
  await supabase.from("payment_events").insert({
    booking_id: bookingId,
    provider: "paymob",
    event_type: String(type || "transaction"),
    intent_id: obj?.payment_key_claims?.integration_id ? String(obj.payment_key_claims.integration_id) : null,
    order_id: orderId,
    transaction_id: obj?.id ? String(obj.id) : null,
    amount: obj?.amount_cents ? Number(obj.amount_cents) / 100 : null,
    currency: obj?.currency || null,
    success: typeof obj?.success === "boolean" ? obj.success : null,
    raw_payload: payload,
    hmac_valid: hmacValid,
  });

  if (!hmacValid) {
    console.warn("Invalid HMAC on Paymob webhook");
    return new Response("Invalid signature", { status: 401, headers: corsHeaders });
  }

  if (!bookingId) {
    console.warn("Webhook with no booking reference");
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  const success = Boolean(obj?.success) && !obj?.is_voided && !obj?.is_refunded;
  const updates: Record<string, any> = {
    payment_status: success ? "paid" : (obj?.is_refunded ? "refunded" : "failed"),
    payment_transaction_id: obj?.id ? String(obj.id) : null,
    payment_order_id: orderId,
  };

  // Fetch booking so we can send emails on success.
  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .maybeSingle();

  if (!booking) {
    console.warn("Booking not found:", bookingId);
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  // Idempotency: only fire emails on first successful transition.
  const alreadyPaid = booking.payment_status === "paid";
  await supabase.from("bookings").update(updates).eq("id", bookingId);

  if (success && !alreadyPaid) {
    const resId = `RES-${String(booking.date).replace(/-/g, "")}-${bookingId.slice(0, 4).toUpperCase()}`;
    const sharedTrip = {
      reservationId: resId,
      firstname: booking.firstname,
      service: booking.service_type ?? undefined,
      pickup: booking.pickup,
      dropoff: booking.dropoff || undefined,
      date: booking.date,
      time: booking.time,
      vehicle: booking.vehicle ?? undefined,
    };

    const fnUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-transactional-email`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
    };

    // Await both sends — fire-and-forget would be killed by the Deno
    // worker shutdown before the request is even sent.
    const results = await Promise.allSettled([
      fetch(fnUrl, {
        method: "POST", headers,
        body: JSON.stringify({
          templateName: "booking-received",
          recipientEmail: booking.email,
          idempotencyKey: `booking-received-${bookingId}`,
          templateData: sharedTrip,
        }),
      }).then(async (r) => {
        const body = await r.text();
        if (!r.ok) throw new Error(`client email ${r.status}: ${body}`);
        return body;
      }),
      fetch(fnUrl, {
        method: "POST", headers,
        body: JSON.stringify({
          templateName: "admin-booking-notification",
          idempotencyKey: `admin-booking-${bookingId}`,
          templateData: {
            ...sharedTrip,
            lastname: booking.lastname,
            email: booking.email,
            phone: booking.phone,
            passengers: booking.passengers,
            luggage: booking.luggage,
            flightNumber: booking.flight_number || undefined,
            notes: booking.notes || undefined,
            estimatedPrice: `${booking.currency_display} ${booking.amount_display}`,
          },
        }),
      }).then(async (r) => {
        const body = await r.text();
        if (!r.ok) throw new Error(`admin email ${r.status}: ${body}`);
        return body;
      }),
    ]);
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`email ${i === 0 ? "client" : "admin"} failed`, r.reason);
      }
    });
  }

  return new Response("ok", { status: 200, headers: corsHeaders });
});