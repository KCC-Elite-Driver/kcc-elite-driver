import { useEffect, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/i18n/LanguageContext";

interface RouteMapProps {
  pickupPlaceId: string;
  dropoffPlaceId: string;
}

const RouteMap = ({ pickupPlaceId, dropoffPlaceId }: RouteMapProps) => {
  const { language } = useTranslation();
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pickupPlaceId || !dropoffPlaceId) {
      setUrl(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("google-maps-embed", {
          body: { originPlaceId: pickupPlaceId, destinationPlaceId: dropoffPlaceId, language },
        });
        if (!cancelled && !error && data?.url) setUrl(data.url);
      } catch (err) {
        console.error("Map load error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [pickupPlaceId, dropoffPlaceId, language]);

  if (!pickupPlaceId || !dropoffPlaceId) {
    return (
      <div className="rounded-lg border border-border bg-secondary/40 h-44 flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <MapPin size={20} className="text-primary/60" />
        <p className="font-sans text-xs text-center px-4">
          Sélectionnez un départ et une destination pour afficher l'itinéraire
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-secondary/40 h-44 relative">
      {loading && !url && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={20} className="animate-spin text-primary" />
        </div>
      )}
      {url && (
        <iframe
          title="Itinéraire"
          src={url}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default RouteMap;
