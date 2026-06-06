import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";
import { Clock, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import GooglePlacesAutocomplete from "@/components/GooglePlacesAutocomplete";
import CalendarPopover from "./CalendarPopover";

const BookingWidget = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"oneway" | "hourly">("oneway");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState<Date>();
  const [dateLabel, setDateLabel] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState<number>(4);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pickup */}
          <GooglePlacesAutocomplete
            value={pickup}
            onChange={setPickup}
            placeholder={t.hero_pickup}
            iconColor="text-primary"
          />

          {/* Dropoff */}
          {mode === "oneway" && (
            <GooglePlacesAutocomplete
              value={dropoff}
              onChange={setDropoff}
              placeholder={t.hero_dropoff}
              iconColor="text-muted-foreground"
            />
          )}

          {/* Hours selector (hourly mode) */}
          {mode === "hourly" && (
            <div className="relative w-full">
              <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
              <select
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className={cn(
                  "w-full min-w-0 block appearance-none bg-secondary border border-border rounded-md pl-10 pr-3 py-3.5 h-[50px] text-base font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                )}
              >
                {[4,5,6,7,8,9,10,11,12].map((h) => (
                  <option key={h} value={h}>{h}h{h === 12 ? " (forfait)" : ""}</option>
                ))}
                <option value={13}>12h+ (sur devis)</option>
              </select>
            </div>
          )}

          {/* Date */}
          <CalendarPopover
            date={date}
            onSelect={(d, label) => { setDate(d); setDateLabel(label); }}
            placeholder={t.hero_date}
            language={language}
          />

          {/* Time: single aesthetic dropdown */}
          <div className="relative w-full">
            <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none" />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={cn(
                "w-full min-w-0 block appearance-none bg-secondary border border-border rounded-md pl-10 pr-9 py-3.5 h-[50px] text-base font-sans tracking-wide focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors hover:border-primary/40",
                time ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <option value="">{t.hero_time}</option>
              {Array.from({ length: 24 * 4 }, (_, i) => {
                const h = String(Math.floor(i / 4)).padStart(2, "0");
                const m = String((i % 4) * 15).padStart(2, "0");
                return `${h}:${m}`;
              }).map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
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
                params.set("hours", String(hours));
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

export default BookingWidget;
