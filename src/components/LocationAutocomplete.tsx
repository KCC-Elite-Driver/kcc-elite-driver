import { useState, useRef, useEffect } from "react";
import { MapPin, Plane, Train, Star, Navigation } from "lucide-react";

interface Location {
  name: string;
  category: "airport" | "station" | "vip" | "quartier";
}

const LOCATIONS: Location[] = [
  // Aéroports
  { name: "Aéroport Paris-CDG (Charles de Gaulle)", category: "airport" },
  { name: "Aéroport Paris-Orly", category: "airport" },
  { name: "Aéroport Paris-Le Bourget (Aviation privée)", category: "airport" },
  { name: "Aéroport du Caire International", category: "airport" },
  { name: "Aéroport de Charm el-Cheikh", category: "airport" },
  { name: "Aéroport d'Hurghada", category: "airport" },
  { name: "Aéroport d'Alexandrie (Borg el-Arab)", category: "airport" },
  // Gares
  { name: "Gare du Nord, Paris", category: "station" },
  { name: "Gare de Lyon, Paris", category: "station" },
  { name: "Gare Montparnasse, Paris", category: "station" },
  { name: "Gare de l'Est, Paris", category: "station" },
  { name: "Gare Ramses, Le Caire", category: "station" },
  // Hôtels / VIP
  { name: "Le Ritz Paris", category: "vip" },
  { name: "Four Seasons Hotel Cairo", category: "vip" },
  { name: "Hôtel George V, Paris", category: "vip" },
  { name: "Marriott Mena House, Le Caire", category: "vip" },
  { name: "Palais des Congrès, Paris", category: "vip" },
  // Quartiers
  { name: "Champs-Élysées, Paris", category: "quartier" },
  { name: "La Défense, Paris", category: "quartier" },
  { name: "Zamalek, Le Caire", category: "quartier" },
  { name: "New Cairo", category: "quartier" },
  { name: "6th of October City", category: "quartier" },
];

const categoryIcon = (cat: Location["category"]) => {
  switch (cat) {
    case "airport": return Plane;
    case "station": return Train;
    case "vip": return Star;
    case "quartier": return Navigation;
  }
};

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  iconColor?: string;
}

const LocationAutocomplete = ({ value, onChange, placeholder, iconColor = "text-primary" }: LocationAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState<Location[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (val: string) => {
    onChange(val);
    if (val.trim().length > 0) {
      const q = normalize(val);
      setFiltered(LOCATIONS.filter((l) => normalize(l.name).includes(q)).slice(0, 8));
      setOpen(true);
    } else {
      setFiltered(LOCATIONS.slice(0, 8));
      setOpen(true);
    }
  };

  const handleSelect = (name: string) => {
    onChange(name);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <MapPin size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconColor}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => handleChange(value)}
        placeholder={placeholder}
        className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filtered.map((loc) => {
            const Icon = categoryIcon(loc.category);
            return (
              <button
                key={loc.name}
                type="button"
                onClick={() => handleSelect(loc.name)}
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

export default LocationAutocomplete;
