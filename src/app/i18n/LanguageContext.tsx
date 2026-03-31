import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Language, messages } from "./messages";
import { motion, AnimatePresence } from "motion/react";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof messages.en;
  isChanging: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isChanging, setIsChanging] = useState(false);
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      if (saved === "en" || saved === "es") return saved;
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("es")) return "es";
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    setIsChanging(true);
    setTimeout(() => {
      setLanguageState(lang);
      localStorage.setItem("language", lang);
      setTimeout(() => setIsChanging(false), 300);
    }, 400);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = messages[language].meta.title;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: messages[language],
    isChanging,
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className="relative min-h-screen">
        <div 
          className="transition-opacity duration-500" 
          style={{ opacity: isChanging ? 0 : 1 }}
        >
          {children}
        </div>
        
        <AnimatePresence>
          {isChanging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center"
            >
              <div className="relative">
                <div className="w-12 h-12 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin" />
                <div className="absolute inset-0 blur-xl bg-blue-500/20 rounded-full animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
