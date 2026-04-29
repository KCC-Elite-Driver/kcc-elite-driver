import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type VehicleKey = "suv" | "business" | "first" | "van";

interface PricingRule {
  country: string;
  service_type: string;
  vehicle: string;
  base_price: number | null;
  per_km_over_threshold: number | null;
  hourly_rate: number | null;
  threshold_km: number | null;
  sphinx_surcharge: number | null;
  currency: string;
  currency_symbol: string;
  quote_only: boolean;
}

// ====== Legacy fallback (only used if DB lookup fails) ======
const VEHICLE_MULTIPLIERS: Record<string, number> = {
  suv: 1.0, business: 1.0, first: 1.5, van: 1.3,
};
const DEFAULT_RATE = { rate: 3, currency: "EUR", symbol: "€" };

// ====== Live USD->EGP rate (cached 1h) ======
const FALLBACK_USD_TO_EGP = 50;
let cachedRate: { value: number; ts: number } | null = null;
const RATE_TTL_MS = 60 * 60 * 1000; // 1h

async function fetchWithTimeout(url: string, ms = 3000): Promise<Response> {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(tid);
  }
}

async function getUsdToEgp(): Promise<number> {
  const now = Date.now();
  if (cachedRate && now - cachedRate.ts < RATE_TTL_MS) return cachedRate.value;
  try {
    const res = await fetchWithTimeout("https://open.er-api.com/v6/latest/USD", 3000);
    const data = await res.json();
    const rate = Number(data?.rates?.EGP);
    if (rate && rate > 0) {
      cachedRate = { value: rate, ts: now };
      return rate;
    }
  } catch (e) {
    console.warn("USD->EGP rate fetch failed, using fallback:", e);
  }
  if (cachedRate) return cachedRate.value;
  return FALLBACK_USD_TO_EGP;
}

function isPublicIp(ip: string): boolean {
  if (!ip) return false;
  if (ip === "127.0.0.1" || ip === "::1") return false;
  if (ip.startsWith("10.") || ip.startsWith("192.168.")) return false;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return false;
  if (ip.startsWith("fc") || ip.startsWith("fd")) return false;
  return true;
}

async function getClientCountry(req: Request): Promise<string | null> {
  const fwd = req.headers.get("x-forwarded-for") || "";
  const ip = (fwd.split(",")[0] || req.headers.get("cf-connecting-ip") || "").trim();
  if (!isPublicIp(ip)) return null;
  try {
    const res = await fetchWithTimeout(`https://ipapi.co/${ip}/country/`, 3000);
    if (!res.ok) return null;
    const text = (await res.text()).trim();
    if (/^[A-Z]{2}$/.test(text)) return text;
  } catch (e) {
    console.warn("IP geo lookup failed:", e);
  }
  return null;
}

async function getPlaceMeta(placeId: string, apiKey: string): Promise<{ country: string; name: string }> {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=address_components,name&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  let country = "FR";
  let name = "";
  if (data.status === "OK" && data.result) {
    name = data.result.name || "";
    for (const comp of data.result.address_components || []) {
      if (comp.types.includes("country")) {
        country = comp.short_name;
        break;
      }
    }
  }
  return { country, name };
}

function isSphinx(name: string): boolean {
  return /sphinx|spx/i.test(name);
}

async function fetchRule(
  supabase: ReturnType<typeof createClient>,
  country: string,
  serviceType: string,
  vehicle: string
): Promise<PricingRule | null> {
  const { data } = await supabase
    .from("pricing_rules")
    .select("*")
    .eq("country", country)
    .eq("service_type", serviceType)
    .eq("vehicle", vehicle)
    .maybeSingle();
  return data as PricingRule | null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("VITE_GOOGLE_MAPS_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const {
      originPlaceId,
      destinationPlaceId,
      vehicle = "business",
      serviceType = "airport",
      hours = 0,
    } = await req.json();

    // Detect client country via IP (for currency display)
    const clientCountryP = getClientCountry(req);

    if (!originPlaceId) {
      return new Response(
        JSON.stringify({ error: "originPlaceId required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const needsDistance = serviceType === "airport" || serviceType === "intercity";

    const originMetaP = getPlaceMeta(originPlaceId, apiKey);
    const destMetaP = destinationPlaceId
      ? getPlaceMeta(destinationPlaceId, apiKey)
      : Promise.resolve({ country: "", name: "" });
    const distP =
      needsDistance && destinationPlaceId
        ? fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${originPlaceId}&destinations=place_id:${destinationPlaceId}&key=${apiKey}&language=fr`
          ).then((r) => r.json())
        : Promise.resolve(null);

    const [originMeta, destMeta, distRes, clientCountry] = await Promise.all([
      originMetaP, destMetaP, distP, clientCountryP,
    ]);
    const country = originMeta.country;

    // Display currency: based on client IP location, falls back to pickup country.
    // EG-resident clients see EGP (live converted from USD).
    const displayCountry = clientCountry || country;
    const useEgp = displayCountry === "EG";
    const usdToEgp = useEgp ? await getUsdToEgp() : 1;
    const egpFmt = (usd: number) => Math.round(usd * usdToEgp);

    // Apply EGP conversion to a payload when source rule is in USD and client is in EG.
    // Only converts numeric monetary fields; leaves distance/duration/etc untouched.
    const MONEY_FIELDS = ["price", "sphinx_surcharge", "base_price", "km_surcharge"] as const;
    const localizePayload = (payload: Record<string, unknown>, sourceCurrency: string) => {
      if (!useEgp || sourceCurrency !== "USD") return payload;
      const out: Record<string, unknown> = { ...payload };
      for (const f of MONEY_FIELDS) {
        if (typeof out[f] === "number") out[f] = egpFmt(out[f] as number);
      }
      out.currency = "EGP";
      out.currency_symbol = "EGP";
      out.fx_rate_usd_egp = usdToEgp;
      return out;
    };

    let distanceKm: number | null = null;
    let durationMin: number | null = null;
    if (distRes && distRes.rows?.[0]?.elements?.[0]?.status === "OK") {
      const el = distRes.rows[0].elements[0];
      distanceKm = Math.round((el.distance.value / 1000) * 10) / 10;
      durationMin = Math.round(el.duration.value / 60);
    }

    // ====== DB-driven pricing (EG / FR with rules in pricing_rules) ======
    const v = (["suv", "business", "first", "van"].includes(vehicle) ? vehicle : "business") as VehicleKey;
    const rule = await fetchRule(supabase, country, serviceType, v);

    if (rule) {
      // VIP / intercity / explicit quote_only
      if (rule.quote_only || serviceType === "vip" || serviceType === "intercity") {
        return new Response(
          JSON.stringify({
            quote_only: true,
            currency: rule.currency,
            currency_symbol: rule.currency_symbol,
            country,
            distance_km: distanceKm,
            duration_min: durationMin,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Hourly
      if (serviceType === "hourly") {
        const h = Math.max(4, Number(hours) || 4);
        if (h > 12) {
          return new Response(
            JSON.stringify({
              quote_only: true,
              currency: rule.currency,
              currency_symbol: rule.currency_symbol,
              country,
              hours: h,
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        const hourly = Number(rule.hourly_rate) || 0;
        const price = Math.round(hourly * h);
        return new Response(
          JSON.stringify({
            price,
            currency: rule.currency,
            currency_symbol: rule.currency_symbol,
            country,
            hours: h,
            service_type: serviceType,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Daily12 (forfait fixe)
      if (serviceType === "daily12") {
        const price = Number(rule.base_price) || 0;
        return new Response(
          JSON.stringify({
            price,
            currency: rule.currency,
            currency_symbol: rule.currency_symbol,
            country,
            service_type: serviceType,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Airport
      if (serviceType === "airport") {
        const base = Number(rule.base_price) || 0;
        const threshold = Number(rule.threshold_km) || 0;
        const perKm = Number(rule.per_km_over_threshold) || 0;
        const sphinxFee = Number(rule.sphinx_surcharge) || 0;

        // EG: forfait + Sphinx surcharge
        if (country === "EG") {
          // Surcharge Sphinx appliquée UNIQUEMENT au départ de l'aéroport du Sphinx
          const sphinxDeparture = isSphinx(originMeta.name);
          const price = base + (sphinxDeparture ? sphinxFee : 0);
          return new Response(
            JSON.stringify({
              price,
              currency: rule.currency,
              currency_symbol: rule.currency_symbol,
              country,
              distance_km: distanceKm,
              duration_min: durationMin,
              sphinx_surcharge: sphinxDeparture ? sphinxFee : 0,
              service_type: serviceType,
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // FR (and others): forfait + km surcharge over threshold
        if (!distanceKm) {
          return new Response(
            JSON.stringify({ error: "Cannot calculate distance" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        const extraKm = threshold > 0 ? Math.max(0, distanceKm - threshold) : 0;
        const surcharge = Math.round(extraKm * perKm);
        const price = Math.round(base + surcharge);
        return new Response(
          JSON.stringify({
            price,
            currency: rule.currency,
            currency_symbol: rule.currency_symbol,
            country,
            distance_km: distanceKm,
            duration_min: durationMin,
            base_price: base,
            km_surcharge: surcharge,
            threshold_km: threshold,
            service_type: serviceType,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // ====== Fallback per-km legacy (no rule found in DB) ======
    if (!distanceKm) {
      return new Response(
        JSON.stringify({ error: "No pricing rule available for this country/service/vehicle" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const multiplier = VEHICLE_MULTIPLIERS[vehicle] || 1.0;
    const price = Math.round(distanceKm * DEFAULT_RATE.rate * multiplier);
    return new Response(
      JSON.stringify({
        distance_km: distanceKm,
        duration_min: durationMin,
        price,
        currency: DEFAULT_RATE.currency,
        currency_symbol: DEFAULT_RATE.symbol,
        country,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("calculate-distance error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
