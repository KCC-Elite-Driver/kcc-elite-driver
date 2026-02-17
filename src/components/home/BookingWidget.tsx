import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";
import { Calendar as CalendarIcon, Clock, Search } from "lucide-react";
import GooglePlacesAutocomplete from "@/components/GooglePlacesAutocomplete";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { enGB } from "date-fns/locale/en-GB";
import { ar } from "date-fns/locale/ar";
import { cn } from "@/lib/utils";

const dateConfig = {
  fr: { locale: fr, fmt: "dd/MM/yyyy" },
  en: { locale: enGB, fmt: "MM/dd/yyyy" },
  ar: { locale: ar, fmt: "dd/MM/yyyy" },
} as const;

const BookingWidget = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"oneway" | "hourly">("oneway");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");

  const { locale, fmt } = dateConfig[language];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-card/80 backdrop-blur-md border border-border rounded-lg p-6 overflow-hidden">
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
          <GooglePlacesAutocomplete
            value={pickup}
            onChange={setPickup}
            placeholder={t.hero_pickup}
            iconColor="text-primary"
          />
          {mode === "oneway" && (
            <GooglePlacesAutocomplete
              value={dropoff}
              onChange={setDropoff}
              placeholder={t.hero_dropoff}
              iconColor="text-muted-foreground"
            />
          )}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3.5 text-base font-sans text-left relative focus:outline-none focus:ring-1 focus:ring-primary",
                  date ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <CalendarIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                {date ? format(date, fmt, { locale }) : t.hero_date}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={locale}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          <div className="relative w-full">
            <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
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
              if (date) params.set("date", date.toISOString());
              if (time) params.set("time", time);
              params.set("mode", mode);
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
