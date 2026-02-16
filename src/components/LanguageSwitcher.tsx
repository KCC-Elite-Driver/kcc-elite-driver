import { useTranslation } from "@/i18n/LanguageContext";
import { type Language } from "@/i18n/translations";

const languages: { code: Language; flag: string }[] = [
  { code: "fr", flag: "🇫🇷" },
  { code: "en", flag: "🇬🇧" },
  { code: "ar", flag: "🇪🇬" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1.5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`text-xl leading-none p-1 rounded transition-all duration-200 ${
            language === lang.code
              ? "ring-2 ring-primary scale-110"
              : "opacity-60 hover:opacity-100 hover:scale-105"
          }`}
          aria-label={lang.code.toUpperCase()}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
