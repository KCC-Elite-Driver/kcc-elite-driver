import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ====== EGYPT PRICING (USD) ======
// Vehicle keys from front: business -> Class E, first -> Class S, van -> Van, suv -> SUV
type VehicleKey = "suv" | "business" | "first" | "van";

const EG_AIRPORT_FLAT: Record<VehicleKey, number> = {
  suv: 70,
  business: 150, // Class E
  van: 200,
  first: 300, // Class S
};

const EG_HOURLY_RATE: Record<VehicleKey, number> = {
  suv: 45,
  business: 80,
  van: 90,
  first: 140,
};

const EG_DAILY12: Record<VehicleKey, number> = {
  suv: 250,
  business: 400,
  van: 500,
  first: 650,
};

const SPHINX_SURCHARGE_USD = 40;

// ====== Non-EG fallback (existing logic preserved) ======
const VEHICLE_MULTIPLIERS: Record<string, number> = {
  suv: 1.0,
  business: 1.0,
  first: 1.5,
  van: 1.3,
};
const DEFAULT_RATE = { rate: 3, currency: "EUR", symbol: "€" };

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
  return /sphinx/i.test(name);
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

    const {
      originPlaceId,
      destinationPlaceId,
      vehicle = "business",
      serviceType = "airport", // "airport" | "hourly" | "vip" | "intercity"
      hours = 0,
    } = await req.json();

    if (!originPlaceId) {
      return new Response(
        JSON.stringify({ error: "originPlaceId required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // We need destination only when not hourly/vip (vip can still have it but it's quote_only anyway)
    const needsDistance = serviceType === "airport" || serviceType === "intercity";

    // Fetch origin meta + (conditionally) destination meta + distance
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

    const [originMeta, destMeta, distRes] = await Promise.all([originMetaP, destMetaP, distP]);
    const country = originMeta.country;

    let distanceKm: number | null = null;
    let durationMin: number | null = null;
    if (distRes && distRes.rows?.[0]?.elements?.[0]?.status === "OK") {
      const el = distRes.rows[0].elements[0];
      distanceKm = Math.round((el.distance.value / 1000) * 10) / 10;
      durationMin = Math.round(el.duration.value / 60);
    }

    // ====== EGYPT (USD flat-rate grid) ======
    if (country === "EG") {
      const v = (vehicle as VehicleKey) in EG_AIRPORT_FLAT ? (vehicle as VehicleKey) : "business";
      const sphinxTouched = isSphinx(originMeta.name) || isSphinx(destMeta.name);

      // VIP & intercity → quote only
      if (serviceType === "vip" || serviceType === "intercity") {
        return new Response(
          JSON.stringify({
            quote_only: true,
            currency: "USD",
            currency_symbol: "$",
            country,
            distance_km: distanceKm,
            duration_min: durationMin,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Hourly: min 4h. > 12h → quote only. = 12h → forfait 12h.
      if (serviceType === "hourly") {
        const h = Math.max(4, Number(hours) || 4);
        if (h > 12) {
          return new Response(
            JSON.stringify({
              quote_only: true,
              currency: "USD",
              currency_symbol: "$",
              country,
              hours: h,
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        const price = h === 12 ? EG_DAILY12[v] : EG_HOURLY_RATE[v] * h;
        return new Response(
          JSON.stringify({
            price,
            currency: "USD",
            currency_symbol: "$",
            country,
            hours: h,
            service_type: serviceType,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Airport (default)
      const base = EG_AIRPORT_FLAT[v];
      const price = base + (sphinxTouched ? SPHINX_SURCHARGE_USD : 0);
      return new Response(
        JSON.stringify({
          price,
          currency: "USD",
          currency_symbol: "$",
          country,
          distance_km: distanceKm,
          duration_min: durationMin,
          sphinx_surcharge: sphinxTouched ? SPHINX_SURCHARGE_USD : 0,
          service_type: serviceType,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ====== Non-EG fallback (existing per-km logic) ======
    if (!distanceKm) {
      return new Response(
        JSON.stringify({ error: "Cannot calculate distance" }),
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
