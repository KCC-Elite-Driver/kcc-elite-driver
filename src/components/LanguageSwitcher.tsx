import { Globe } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { type Language } from "@/i18n/translations";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import frFlag from "@/assets/flags/fr.svg";
import gbFlag from "@/assets/flags/gb.svg";
import egFlag from "@/assets/flags/eg.svg";

const languages: { code: Language; flag: string; name: string }[] = [
  { code: "en", flag: gbFlag, name: "English" },
  { code: "fr", flag: frFlag, name: "Français" },
  { code: "ar", flag: egFlag, name: "العربية" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 text-sm font-sans font-medium text-muted-foreground hover:text-foreground transition-colors outline-none">
          <Globe size={16} />
          <span className="uppercase">{language}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border min-w-[160px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2.5 cursor-pointer ${
              language === lang.code ? "text-primary" : ""
            }`}
          >
            <img src={lang.flag} alt="" className="w-5 h-4 rounded-sm object-cover" />
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
