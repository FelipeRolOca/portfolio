import { useState, useEffect } from 'react'
import { Cookie, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

interface CookieBannerProps {
  onOpenLegal: () => void
}

export function CookieBanner({ onOpenLegal }: CookieBannerProps) {
  const { t } = useLang()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('fro_cookies_accepted')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('fro_cookies_accepted', 'true')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <aside
      aria-label="Aviso de cookies y privacidad"
      className="fixed bottom-20 md:bottom-6 left-3 right-3 sm:left-6 sm:right-auto z-[100] max-w-md p-4 rounded-2xl shadow-2xl transition-all duration-300 animate-in fade-in border touch-manipulation"
      style={{ backgroundColor: '#16232A', borderColor: 'rgba(7,80,86,0.6)', color: '#E4EEF0' }}
    >
      <div className="flex items-start gap-3">
        <div 
          className="p-2 rounded-xl shrink-0 mt-0.5 border"
          style={{ backgroundColor: 'rgba(255,91,4,0.1)', borderColor: 'rgba(255,91,4,0.3)', color: '#FF5B04' }}
        >
          <Cookie size={18} />
        </div>
        <div className="flex-1 text-xs space-y-1" style={{ fontFamily: 'Barlow, sans-serif' }}>
          <p 
            className="font-bold text-sm uppercase tracking-wide"
            style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#FF5B04' }}
          >
            {t('Privacidad & Preferencias', 'Privacy & Preferences')}
          </p>
          <p style={{ color: 'rgba(228,238,240,0.8)' }}>
            {t(
              'Este portafolio utiliza almacenamiento local técnico para recordar preferencias de idioma y rendimiento.',
              'This portfolio uses technical local storage to remember language and performance preferences.'
            )}
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="p-1 transition-colors hover:opacity-100 opacity-60 touch-manipulation cursor-pointer"
          title={t('Cerrar', 'Close')}
          aria-label={t('Cerrar', 'Close')}
        >
          <X size={16} />
        </button>
      </div>

      <div 
        className="mt-3 flex items-center justify-between gap-2 pt-2 border-t"
        style={{ borderColor: 'rgba(7,80,86,0.4)', fontFamily: 'JetBrains Mono, monospace' }}
      >
        <button
          onClick={onOpenLegal}
          className="text-xs transition-colors underline cursor-pointer touch-manipulation"
          style={{ color: '#FF5B04' }}
        >
          {t('Aviso Legal & Privacidad', 'Legal Notice')}
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 sm:py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer touch-manipulation shadow-md"
          style={{ backgroundColor: '#FF5B04', color: '#FFFFFF' }}
        >
          {t('Aceptar', 'Accept')}
        </button>
      </div>
    </aside>
  )
}
