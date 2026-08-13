import { useState, createContext, useContext, ReactNode } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (l: Language) => void
  t: (es: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => { },
  t: (es) => es,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio_lang')
        return (saved === 'en' || saved === 'es') ? saved : 'es'
      } catch {
        return 'es'
      }
    }
    return 'es'
  })

  const setLang = (l: Language) => {
    setLangState(l)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('portfolio_lang', l)
      } catch {
        // ignore
      }
    }
  }

  const t = (es: string, en: string) => (lang === 'en' ? en : es)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
