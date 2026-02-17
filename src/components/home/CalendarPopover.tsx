import { Calendar as CalendarIcon } from "lucide-react";
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

interface CalendarPopoverProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined, label: string) => void;
  placeholder: string;
  language: "fr" | "en" | "ar";
}

const CalendarPopover = ({ date, onSelect, placeholder, language }: CalendarPopoverProps) => {
  const { locale, fmt } = dateConfig[language];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3.5 text-base font-sans text-left relative focus:outline-none focus:ring-1 focus:ring-primary",
            date ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <CalendarIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          {date ? format(date, fmt, { locale }) : placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => onSelect(d, d ? format(d, fmt, { locale }) : "")}
          locale={locale}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarPopover;
