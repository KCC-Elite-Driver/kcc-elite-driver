import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// End-to-end test for the Paymob webhook → booking update → both emails flow.
//
// Required env (loaded from .env or process env):
//  - VITE_SUPABASE_URL                  (project URL)
//  - SUPABASE_SERVICE_ROLE_KEY          (service role; needed to seed/clean DB)
//  - PAYMOB_HMAC_SECRET                 (same secret the deployed function uses)
//
// If any are missing the test is skipped with a clear message — this keeps CI
// green when secrets aren't injected, while still being a real E2E check when
// they are.

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL") || Deno.env.get("SUPABASE_URL");
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const HMAC_SECRET = Deno.env.get("PAYMOB_HMAC_SECRET");

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

Deno.test("paymob-webhook E2E: payment → booking paid → both emails enqueued", async () => {
  if (!SUPABASE_URL || !SERVICE_KEY || !HMAC_SECRET) {
    console.warn("[skip] missing env (VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PAYMOB_HMAC_SECRET)");
    return;
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
  const bookingId = crypto.randomUUID();
  const tag = `e2e-${bookingId.slice(0, 8)}`;
  const recipient = `e2e+${bookingId.slice(0, 8)}@kccelitedriver.test`;

  // 1. Seed booking
  const { error: insErr } = await supabase.from("bookings").insert({
    id: bookingId,
    service_type: "airport-transfer",
    pickup: `E2E pickup ${tag}`,
    dropoff: "E2E destination",
    date: new Date().toISOString().slice(0, 10),
    time: "12:00:00",
    firstname: "E2E",
    lastname: "Tester",
    email: recipient,
    phone: "+33000000000",
    passengers: 1,
    luggage: 0,
    vehicle: "business",
    payment_method: "card",
    payment_status: "awaiting",
    payment_provider: "paymob",
    amount_display: 100,
    currency_display: "EUR",
    amount_charged: 5500,
    currency_charged: "EGP",
    fx_rate: 55,
  });
  assertEquals(insErr, null, `insert booking failed: ${insErr?.message}`);

  const cleanup = async () => {
    await supabase.from("email_send_log").delete().contains("metadata", { booking_id: bookingId });
    await supabase.from("payment_events").delete().eq("booking_id", bookingId);
    await supabase.from("bookings").delete().eq("id", bookingId);
  };

  try {
    // 2. Forge a valid Paymob payload
    const txId = Math.floor(Math.random() * 1_000_000_000);
    const orderId = Math.floor(Math.random() * 1_000_000_000);
    const obj = {
      id: txId,
      amount_cents: 10000,
      created_at: new Date().toISOString(),
      currency: "EGP",
      error_occured: false,
      has_parent_transaction: false,
      integration_id: 12345,
      is_3d_secure: true,
      is_auth: false,
      is_capture: false,
      is_refunded: false,
      is_standalone_payment: true,
      is_voided: false,
      owner: 1,
      pending: false,
      success: true,
      order: { id: orderId, merchant_order_id: bookingId },
      source_data: { pan: "1234", sub_type: "MasterCard", type: "card" },
      payment_key_claims: { extra: { booking_id: bookingId } },
    };
    const sig = await hmacHex(HMAC_SECRET, buildHmacString(obj));

    const callWebhook = async () => {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/paymob-webhook?hmac=${sig}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "TRANSACTION", obj }),
      });
      const body = await res.text();
      return { status: res.status, body };
    };

    // 3. First webhook call
    const first = await callWebhook();
    assertEquals(first.status, 200, `webhook returned ${first.status}: ${first.body}`);

    // 4. Booking should now be paid
    const { data: paid } = await supabase
      .from("bookings").select("payment_status").eq("id", bookingId).maybeSingle();
    assertEquals(paid?.payment_status, "paid");

    // 5. payment_events row with valid HMAC
    const { data: events } = await supabase
      .from("payment_events").select("hmac_valid").eq("booking_id", bookingId);
    assert((events?.length ?? 0) >= 1, "no payment_events recorded");
    assert(events!.some((e) => e.hmac_valid === true), "no hmac_valid event");

    // 6. Both emails logged
    const { data: logs } = await supabase
      .from("email_send_log")
      .select("template_name, status, metadata")
      .contains("metadata", { booking_id: bookingId });
    const clientLog = logs?.find((l) => l.template_name === "booking-received");
    const adminLog = logs?.find((l) => l.template_name === "admin-booking-notification");
    assert(clientLog, "booking-received email not logged");
    assert(adminLog, "admin-booking-notification email not logged");
    assertEquals(
      (clientLog!.metadata as any)?.idempotency_key,
      `booking-received-${bookingId}`,
      "client email idempotency_key mismatch",
    );

    // 7. Idempotence: replay must not duplicate emails
    const replay = await callWebhook();
    assertEquals(replay.status, 200);

    const { data: logsAfter } = await supabase
      .from("email_send_log")
      .select("template_name")
      .contains("metadata", { booking_id: bookingId });
    const clientCount = (logsAfter ?? []).filter((l) => l.template_name === "booking-received").length;
    const adminCount = (logsAfter ?? []).filter((l) => l.template_name === "admin-booking-notification").length;
    assertEquals(clientCount, 1, `expected 1 client email, got ${clientCount}`);
    assertEquals(adminCount, 1, `expected 1 admin email, got ${adminCount}`);
  } finally {
    await cleanup();
  }
});