import { useState, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";
import { Calendar as CalendarIcon, Clock, Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// Lazy-load heavy dependencies only when user interacts
const GooglePlacesAutocomplete = lazy(() => import("@/components/GooglePlacesAutocomplete"));
const CalendarPopover = lazy(() => import("./CalendarPopover"));

const BookingWidget = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"oneway" | "hourly">("oneway");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState<Date>();
  const [dateLabel, setDateLabel] = useState("");
  const [time, setTime] = useState("");
  const [activated, setActivated] = useState(false);

  const activate = useCallback(() => {
    if (!activated) setActivated(true);
  }, [activated]);

  return (
    <div className="w-full max-w-5xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" onClick={activate} onFocus={activate}>
          {/* Pickup */}
          {activated ? (
            <Suspense fallback={<PlaceholderInput icon={<MapPin size={16} className="text-primary" />} text={t.hero_pickup} />}>
              <GooglePlacesAutocomplete
                value={pickup}
                onChange={setPickup}
                placeholder={t.hero_pickup}
                iconColor="text-primary"
              />
            </Suspense>
          ) : (
            <PlaceholderInput icon={<MapPin size={16} className="text-primary" />} text={t.hero_pickup} />
          )}

          {/* Dropoff */}
          {mode === "oneway" && (
            activated ? (
              <Suspense fallback={<PlaceholderInput icon={<MapPin size={16} className="text-muted-foreground" />} text={t.hero_dropoff} />}>
                <GooglePlacesAutocomplete
                  value={dropoff}
                  onChange={setDropoff}
                  placeholder={t.hero_dropoff}
                  iconColor="text-muted-foreground"
                />
              </Suspense>
            ) : (
              <PlaceholderInput icon={<MapPin size={16} className="text-muted-foreground" />} text={t.hero_dropoff} />
            )
          )}

          {/* Date */}
          {activated ? (
            <Suspense fallback={<PlaceholderInput icon={<CalendarIcon size={16} className="text-muted-foreground" />} text={t.hero_date} />}>
              <CalendarPopover
                date={date}
                onSelect={(d, label) => { setDate(d); setDateLabel(label); }}
                placeholder={t.hero_date}
                language={language}
              />
            </Suspense>
          ) : (
            <PlaceholderInput icon={<CalendarIcon size={16} className="text-muted-foreground" />} text={t.hero_date} />
          )}

          {/* Time */}
          <div className="relative w-full">
            <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onFocus={activate}
              className={cn(
                "w-full min-w-0 block appearance-none bg-secondary border border-border rounded-md pl-10 pr-3 py-3.5 h-[50px] text-base font-sans focus:outline-none focus:ring-1 focus:ring-primary [&::-webkit-date-and-time-value]:text-left [&::-webkit-calendar-picker-indicator]:opacity-0",
                time ? "text-foreground" : "text-transparent"
              )}
            />
            {!time && (
              <span className="absolute left-10 top-1/2 -translate-y-1/2 text-muted-foreground text-base font-sans pointer-events-none">
                --:--
              </span>
            )}
          </div>
        </div>

        {/* Search button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              const params = new URLSearchParams();
              if (pickup) params.set("pickup", pickup);
              if (dropoff) params.set("dropoff", dropoff);
              if (date) {
                const y = date.getFullYear();
                const m = String(date.getMonth() + 1).padStart(2, "0");
                const d = String(date.getDate()).padStart(2, "0");
                params.set("date", `${y}-${m}-${d}`);
              }
              if (time) params.set("time", time);

              if (mode === "oneway") {
                params.set("service", "airport");
                if (pickup && dropoff && date && time) {
                  params.set("skipTo", "2");
                } else if (pickup && date && time) {
                  params.set("skipTo", "1");
                }
              } else if (mode === "hourly") {
                params.set("service", "hourly");
                if (pickup && date && time) {
                  params.set("skipTo", "2");
                }
              }

              navigate(`/booking?${params.toString()}`);
            }}
            className="gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 flex items-center gap-2"
          >
            <Search size={16} />
            {t.hero_search}
          </button>
        </div>
      </div>
    </div>
  );
};

/** Lightweight placeholder that matches real input styling */
const PlaceholderInput = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="relative w-full">
    <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
    <div className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3.5 text-base font-sans text-muted-foreground cursor-text">
      {text}
    </div>
  </div>
);

export default BookingWidget;
