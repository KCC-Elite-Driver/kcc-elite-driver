import { useTranslation } from "@/i18n/LanguageContext";
import { type Language } from "@/i18n/translations";

const languages: { code: Language; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang, i) => (
        <span key={lang.code} className="flex items-center gap-1">
          <button
            onClick={() => setLanguage(lang.code)}
            className={`text-sm font-sans transition-colors duration-200 px-1 ${
              language === lang.code
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {lang.label}
          </button>
          {i < languages.length - 1 && (
            <span className="text-muted-foreground/40 text-xs">|</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
