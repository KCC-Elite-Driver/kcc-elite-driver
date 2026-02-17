import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Plane, Train, Star, Navigation, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Static fallback locations
interface StaticLocation {
  name: string;
  category: "airport" | "station" | "vip" | "quartier";
}

const STATIC_LOCATIONS: StaticLocation[] = [
  { name: "Aéroport Paris-CDG (Charles de Gaulle)", category: "airport" },
  { name: "Aéroport Paris-Orly", category: "airport" },
  { name: "Aéroport Paris-Le Bourget (Aviation privée)", category: "airport" },
  { name: "Aéroport du Caire International", category: "airport" },
  { name: "Aéroport de Charm el-Cheikh", category: "airport" },
  { name: "Aéroport d'Hurghada", category: "airport" },
  { name: "Gare du Nord, Paris", category: "station" },
  { name: "Gare de Lyon, Paris", category: "station" },
  { name: "Gare Montparnasse, Paris", category: "station" },
  { name: "Gare Ramses, Le Caire", category: "station" },
  { name: "Le Ritz Paris", category: "vip" },
  { name: "Four Seasons Hotel Cairo", category: "vip" },
  { name: "Hôtel George V, Paris", category: "vip" },
  { name: "Champs-Élysées, Paris", category: "quartier" },
  { name: "La Défense, Paris", category: "quartier" },
  { name: "Zamalek, Le Caire", category: "quartier" },
  { name: "New Cairo", category: "quartier" },
];

const categoryIcon = (cat: StaticLocation["category"]) => {
  switch (cat) {
    case "airport": return Plane;
    case "station": return Train;
    case "vip": return Star;
    case "quartier": return Navigation;
  }
};

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

interface GooglePrediction {
  description: string;
  place_id: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}

interface GooglePlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (placeId: string, description: string) => void;
  placeholder: string;
  iconColor?: string;
}

const GooglePlacesAutocomplete = ({
  value,
  onChange,
  onPlaceSelect,
  placeholder,
  iconColor = "text-primary",
}: GooglePlacesAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [predictions, setPredictions] = useState<GooglePrediction[]>([]);
  const [staticResults, setStaticResults] = useState<StaticLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [useStatic, setUseStatic] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const sessionTokenRef = useRef(crypto.randomUUID());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchPredictions = useCallback(async (input: string) => {
    if (input.trim().length < 2) {
      setPredictions([]);
      setUseStatic(true);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("google-places", {
        body: { input, sessionToken: sessionTokenRef.current },
      });

      if (error || !data?.predictions?.length) {
        setUseStatic(true);
        setPredictions([]);
      } else {
        setPredictions(data.predictions);
        setUseStatic(false);
      }
    } catch {
      setUseStatic(true);
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (val: string) => {
    onChange(val);

    // Filter static results
    const q = normalize(val);
    setStaticResults(
      val.trim().length > 0
        ? STATIC_LOCATIONS.filter((l) => normalize(l.name).includes(q)).slice(0, 5)
        : STATIC_LOCATIONS.slice(0, 5)
    );

    setOpen(true);

    // Debounced Google API call
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPredictions(val), 300);
  };

  const handleSelectGoogle = (prediction: GooglePrediction) => {
    onChange(prediction.description);
    onPlaceSelect?.(prediction.place_id, prediction.description);
    setOpen(false);
    // New session token for next search
    sessionTokenRef.current = crypto.randomUUID();
  };

  const handleSelectStatic = (name: string) => {
    onChange(name);
    setOpen(false);
  };

  const handleFocus = () => {
    const q = normalize(value);
    setStaticResults(
      value.trim().length > 0
        ? STATIC_LOCATIONS.filter((l) => normalize(l.name).includes(q)).slice(0, 5)
        : STATIC_LOCATIONS.slice(0, 5)
    );
    setOpen(true);
    if (value.trim().length >= 2) fetchPredictions(value);
  };

  const hasGoogleResults = predictions.length > 0 && !useStatic;
  const hasStaticResults = staticResults.length > 0;
  const showDropdown = open && (hasGoogleResults || hasStaticResults || loading);

  return (
    <div className="relative" ref={ref}>
      <MapPin size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconColor}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3.5 text-base font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        autoComplete="off"
      />
      {loading && (
        <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground animate-spin" />
      )}

      {showDropdown && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg max-h-72 overflow-y-auto">
          {/* Google results */}
          {hasGoogleResults && predictions.map((p) => (
            <button
              key={p.place_id}
              type="button"
              onClick={() => handleSelectGoogle(p)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-secondary/80 transition-colors text-sm font-sans text-foreground"
            >
              <MapPin size={14} className="text-primary shrink-0" />
              <div className="min-w-0">
                <span className="block truncate">
                  {p.structured_formatting?.main_text || p.description}
                </span>
                {p.structured_formatting?.secondary_text && (
                  <span className="block text-xs text-muted-foreground truncate">
                    {p.structured_formatting.secondary_text}
                  </span>
                )}
              </div>
            </button>
          ))}

          {/* Separator if both sources */}
          {hasGoogleResults && hasStaticResults && (
            <div className="border-t border-border my-1" />
          )}

          {/* Static fallback results */}
          {(useStatic || !hasGoogleResults) && hasStaticResults && staticResults.map((loc) => {
            const Icon = categoryIcon(loc.category);
            return (
              <button
                key={loc.name}
                type="button"
                onClick={() => handleSelectStatic(loc.name)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-secondary/80 transition-colors text-sm font-sans text-foreground"
              >
                <Icon size={14} className="text-primary shrink-0" />
                <span>{loc.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GooglePlacesAutocomplete;
