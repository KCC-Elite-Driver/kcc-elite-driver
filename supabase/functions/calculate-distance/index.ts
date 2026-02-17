import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VEHICLE_MULTIPLIERS: Record<string, number> = {
  suv: 1.0,
  business: 1.0,
  first: 1.5,
  van: 1.3,
};

const RATES: Record<string, { rate: number; currency: string; symbol: string }> = {
  EG: { rate: 150, currency: "EGP", symbol: "E£" },
  DEFAULT: { rate: 3, currency: "EUR", symbol: "€" },
};

async function getCountryFromPlaceId(placeId: string, apiKey: string): Promise<string> {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=address_components&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === "OK" && data.result?.address_components) {
    for (const comp of data.result.address_components) {
      if (comp.types.includes("country")) {
        return comp.short_name; // "FR", "EG", etc.
      }
    }
  }
  return "FR";
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

    const { originPlaceId, destinationPlaceId, vehicle } = await req.json();
    if (!originPlaceId || !destinationPlaceId) {
      return new Response(
        JSON.stringify({ error: "originPlaceId and destinationPlaceId required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parallel: Distance Matrix + country detection
    const [distRes, country] = await Promise.all([
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${originPlaceId}&destinations=place_id:${destinationPlaceId}&key=${apiKey}&language=fr`
      ).then((r) => r.json()),
      getCountryFromPlaceId(originPlaceId, apiKey),
    ]);

    if (
      distRes.status !== "OK" ||
      !distRes.rows?.[0]?.elements?.[0] ||
      distRes.rows[0].elements[0].status !== "OK"
    ) {
      return new Response(
        JSON.stringify({ error: "Cannot calculate distance", details: distRes.status }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const element = distRes.rows[0].elements[0];
    const distanceKm = Math.round((element.distance.value / 1000) * 10) / 10;
    const durationMin = Math.round(element.duration.value / 60);

    const rateInfo = RATES[country] || RATES.DEFAULT;
    const multiplier = VEHICLE_MULTIPLIERS[vehicle] || 1.0;
    const price = Math.round(distanceKm * rateInfo.rate * multiplier);

    return new Response(
      JSON.stringify({
        distance_km: distanceKm,
        duration_min: durationMin,
        price,
        currency: rateInfo.currency,
        currency_symbol: rateInfo.symbol,
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
