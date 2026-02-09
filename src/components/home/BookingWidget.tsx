import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageContext";
import { Calendar, Clock, Search } from "lucide-react";
import LocationAutocomplete from "@/components/LocationAutocomplete";

const BookingWidget = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"oneway" | "hourly">("oneway");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card/80 backdrop-blur-md border border-border rounded-lg p-6">
        {/* Toggle */}
        <div className="flex gap-1 bg-secondary rounded-md p-1 mb-6 w-fit">
          <button
            onClick={() => setMode("oneway")}
            className={`px-4 py-2 rounded text-sm font-sans font-medium transition-all duration-200 ${
              mode === "oneway"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.hero_oneway}
          </button>
          <button
            onClick={() => setMode("hourly")}
            className={`px-4 py-2 rounded text-sm font-sans font-medium transition-all duration-200 ${
              mode === "hourly"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.hero_hourly}
          </button>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <LocationAutocomplete
            value={pickup}
            onChange={setPickup}
            placeholder={t.hero_pickup}
            iconColor="text-primary"
          />
          {mode === "oneway" && (
            <LocationAutocomplete
              value={dropoff}
              onChange={setDropoff}
              placeholder={t.hero_dropoff}
              iconColor="text-muted-foreground"
            />
          )}
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="date"
              placeholder={t.hero_date}
              className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="time"
              placeholder={t.hero_time}
              className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Search button */}
        <div className="mt-4 flex justify-end">
          <button className="gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 flex items-center gap-2">
            <Search size={16} />
            {t.hero_search}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
