import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const PAYMOB_API = "https://accept.paymob.com/v1/intention/";
const CHECKOUT_URL = "https://accept.paymob.com/unifiedcheckout/";

// EUR -> EGP rate, cached 1h.
let cachedEurEgp: { value: number; ts: number } | null = null;
const RATE_TTL_MS = 60 * 60 * 1000;
const FALLBACK_EUR_EGP = 55;

async function getEurToEgp(): Promise<number> {
  const now = Date.now();
  if (cachedEurEgp && now - cachedEurEgp.ts < RATE_TTL_MS) return cachedEurEgp.value;
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/EUR");
    const data = await res.json();
    const rate = Number(data?.rates?.EGP);
    if (rate && rate > 0) {
      cachedEurEgp = { value: rate, ts: now };
      return rate;
    }
  } catch (e) {
    console.warn("EUR->EGP rate fetch failed:", e);
  }
  return cachedEurEgp?.value ?? FALLBACK_EUR_EGP;
}

function badRequest(msg: string) {
  return new Response(JSON.stringify({ error: msg }), {
    status: 400,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SECRET = Deno.env.get("PAYMOB_SECRET_KEY");
    const PUBLIC = Deno.env.get("PAYMOB_PUBLIC_KEY");
    const INT_CARD = Deno.env.get("PAYMOB_INTEGRATION_ID_CARD");
    if (!SECRET || !PUBLIC || !INT_CARD) {
      return new Response(JSON.stringify({ error: "Paymob keys not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const {
      booking,           // booking fields (firstname, lastname, email, phone, pickup, dropoff, date, time, service_type, vehicle, etc.)
      displayAmount,     // number shown to the user
      displayCurrency,   // "EUR" or "EGP"
      returnUrl,         // e.g. https://site/booking/return
    } = body ?? {};

    if (!booking || typeof booking !== "object") return badRequest("booking required");
    if (!booking.email || !booking.firstname || !booking.lastname || !booking.phone) {
      return badRequest("missing client fields");
    }
    if (!booking.pickup || !booking.date || !booking.time) {
      return badRequest("missing trip fields");
    }
    const amount = Number(displayAmount);
    if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000) {
      return badRequest("invalid amount");
    }
    const cur = String(displayCurrency || "").toUpperCase();
    if (cur !== "EUR" && cur !== "EGP") return badRequest("currency must be EUR or EGP");

    // Convert to EGP if needed (Paymob bills in EGP).
    let fxRate: number | null = null;
    let amountEgp = amount;
    if (cur === "EUR") {
      fxRate = await getEurToEgp();
      amountEgp = Math.round(amount * fxRate);
    }
    const amountCents = Math.round(amountEgp * 100);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Generate reservation reference.
    const bookingId = crypto.randomUUID();
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const rand = String(Math.floor(Math.random() * 900) + 100);
    const resId = `RES-${dateStr}-${rand}`;

    // Insert booking up front so the webhook can locate it.
    const insertPayload = {
      id: bookingId,
      client_id: booking.client_id ?? null,
      service_type: booking.service_type ?? null,
      pickup: String(booking.pickup),
      dropoff: booking.dropoff ? String(booking.dropoff) : "",
      date: String(booking.date),
      time: String(booking.time),
      firstname: String(booking.firstname),
      lastname: String(booking.lastname),
      email: String(booking.email),
      phone: String(booking.phone),
      passengers: Number(booking.passengers) || 1,
      luggage: Number(booking.luggage) || 0,
      notes: booking.notes || null,
      flight_number: booking.flight_number || null,
      meet_greet: Boolean(booking.meet_greet),
      vehicle: booking.vehicle ?? null,
      payment_method: "card",
      status: "pending" as const,
      payment_status: "awaiting",
      payment_provider: "paymob",
      amount_display: amount,
      currency_display: cur,
      amount_charged: amountEgp,
      currency_charged: "EGP",
      fx_rate: fxRate,
    };

    const { error: insErr } = await supabase.from("bookings").insert(insertPayload);
    if (insErr) {
      console.error("booking insert failed:", insErr);
      return new Response(JSON.stringify({ error: "Failed to create booking" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build Paymob intention.
    const [fname, ...rest] = String(booking.firstname).split(" ");
    const phone = String(booking.phone).replace(/\s+/g, "");
    const intentionBody = {
      amount: amountCents,
      currency: "EGP",
      payment_methods: [Number(INT_CARD)],
      billing_data: {
        apartment: "NA",
        first_name: booking.firstname,
        last_name: booking.lastname,
        street: booking.pickup.slice(0, 100) || "NA",
        building: "NA",
        phone_number: phone,
        country: "EG",
        email: booking.email,
        floor: "NA",
        state: "NA",
      },
      customer: {
        first_name: booking.firstname,
        last_name: booking.lastname,
        email: booking.email,
        extras: { reservation_id: resId, booking_id: bookingId },
      },
      extras: { reservation_id: resId, booking_id: bookingId },
      special_reference: bookingId,
      redirection_url: returnUrl || undefined,
      items: [{
        name: `Chauffeur ${booking.service_type ?? "service"} - ${resId}`,
        amount: amountCents,
        description: `${booking.pickup} -> ${booking.dropoff || ""}`.slice(0, 250),
        quantity: 1,
      }],
    };

    const intentRes = await fetch(PAYMOB_API, {
      method: "POST",
      headers: {
        "Authorization": `Token ${SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(intentionBody),
    });
    const intentJson = await intentRes.json();
    if (!intentRes.ok || !intentJson?.client_secret) {
      console.error("Paymob intention failed:", intentRes.status, intentJson);
      // mark booking failed
      await supabase.from("bookings").update({ payment_status: "failed" }).eq("id", bookingId);
      return new Response(JSON.stringify({ error: "Paymob intention failed", details: intentJson }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const clientSecret = intentJson.client_secret;
    const intentId = intentJson.id ?? intentJson.intention_id ?? null;

    await supabase.from("bookings").update({
      payment_intent_id: intentId ? String(intentId) : null,
    }).eq("id", bookingId);

    const checkoutUrl = `${CHECKOUT_URL}?publicKey=${encodeURIComponent(PUBLIC)}&clientSecret=${encodeURIComponent(clientSecret)}`;

    return new Response(JSON.stringify({
      bookingId,
      reservationId: resId,
      checkoutUrl,
      amountCharged: amountEgp,
      currencyCharged: "EGP",
      fxRate,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("create-paymob-intent error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});