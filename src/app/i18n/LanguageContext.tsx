import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Language, messages } from "./messages";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof messages.en;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Check local storage
    const saved = localStorage.getItem("language") as Language;
    if (saved === "en" || saved === "es") return saved;

    // 2. Check browser language
    if (typeof window !== "undefined") {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("es")) return "es";
    }

    // 3. Fallback
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    // Sync document attributes when language changes
    document.documentElement.lang = language;
    document.title = messages[language].meta.title;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: messages[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
