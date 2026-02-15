import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { translations, type Language, type TranslationKeys } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const defaultContext: LanguageContextType = {
  language: "fr",
  setLanguage: () => {},
  t: translations.fr,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("fr");

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  return useContext(LanguageContext);
};
