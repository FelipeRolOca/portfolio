import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Language, messages } from './messages'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: typeof messages.es
}

const defaultContextValue: LanguageContextType = {
  language: 'es',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: messages.es,
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fro_language') as Language
        if (saved === 'en' || saved === 'es') return saved
        const browserLang = navigator.language?.toLowerCase() || ''
        if (browserLang.startsWith('es')) return 'es'
      } catch (e) {
        console.warn('Storage not accessible', e)
      }
    }
    return 'es'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('fro_language', lang)
      } catch (e) {
        console.warn('Storage not accessible', e)
      }
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es')
  }

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
      document.title = messages[language]?.meta?.title || 'Felipe Roldán Ocampo'
    }
  }, [language])

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: messages[language] || messages.es,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context || defaultContextValue
}
