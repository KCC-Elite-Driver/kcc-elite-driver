import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

    const { input, sessionToken } = await req.json();
    if (!input || input.trim().length < 2) {
      return new Response(JSON.stringify({ predictions: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const params = new URLSearchParams({
      input,
      key: apiKey,
      types: "geocode|establishment",
      components: "country:fr|country:eg",
      language: "fr",
    });
    if (sessionToken) params.set("sessiontoken", sessionToken);

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.error("Google Places error:", data.status, data.error_message);
      return new Response(
        JSON.stringify({ predictions: [], error: data.status }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const predictions = (data.predictions || []).map(
      (p: { description: string; place_id: string; structured_formatting: unknown }) => ({
        description: p.description,
        place_id: p.place_id,
        structured_formatting: p.structured_formatting,
      })
    );

    return new Response(JSON.stringify({ predictions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("google-places error:", err);
    return new Response(JSON.stringify({ predictions: [], error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
