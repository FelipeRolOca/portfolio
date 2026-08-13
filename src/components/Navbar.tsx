import { useState, useEffect, useRef } from 'react'
import logo2 from '@/imports/LOGO_2.png'
import { useLang } from '../i18n/LanguageContext'

const NAV_IDS = ['sobre', 'servicios', 'habilidades', 'experiencia', 'proyectos', 'contacto']

export function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  })

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const NAV_ITEMS = [
    t('Sobre Mí', 'About Me'),
    t('Soluciones', 'Solutions'),
    t('Tecnologías', 'Tech Stack'),
    t('Experiencia', 'Experience'),
    t('Proyectos', 'Projects'),
    t('Contacto', 'Contact'),
  ]

  const updatePill = (activeId: string) => {
    const idx = NAV_IDS.indexOf(activeId)
    if (idx !== -1 && itemRefs.current[idx]) {
      const el = itemRefs.current[idx]!
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
      })
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }))
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = ['hero', 'sobre', 'servicios', 'habilidades', 'experiencia', 'proyectos', 'contacto']
      const scrollPosition = window.scrollY + 250

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActive(sectionId)
            updatePill(sectionId)
            break
          }
        }
      }
    }

    const handleResize = () => {
      updatePill(active)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    updatePill(active)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [active, lang])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    updatePill(id)
  }

  return (
    <>
      {/* Top Header Bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(22,35,42,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(7,80,86,0.4)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Brand Logo & Name + Mobile Language Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setActive('hero')
                updatePill('hero')
              }}
              className={`flex items-center gap-3 px-3 py-1.5 rounded transition-all duration-300 cursor-pointer ${active === 'hero'
                  ? 'bg-[#075056]/30 border border-[#268B95] shadow-[0_0_15px_rgba(38,139,149,0.35)]'
                  : 'hover:bg-[#075056]/20 border border-transparent'
                }`}
            >
              <img src={logo2} alt="FRO logo" className="h-9 w-9 object-contain" />
              <div className="flex items-center gap-2">
                <span
                  className="text-xs sm:text-sm font-mono tracking-widest uppercase font-bold"
                  style={{ color: '#E4EEF0', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.15em' }}
                >
                  Felipe Roldán Ocampo
                </span>
                {active === 'hero' && (
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: '#FF5B04' }}
                    title={t('Inicio Activo', 'Home Active')}
                  />
                )}
              </div>
            </button>

            {/* Mobile Language Switcher */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="md:hidden px-2.5 py-1 text-[11px] font-mono font-bold text-[#E4EEF0] bg-[#075056]/80 border border-[#268B95] rounded flex items-center gap-1.5 cursor-pointer"
              title="Cambiar idioma / Switch language"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10z" />
              </svg>
              <span className={lang === 'es' ? 'text-[#FF5B04]' : 'text-white/60'}>ES</span>
              <span>/</span>
              <span className={lang === 'en' ? 'text-[#FF5B04]' : 'text-white/60'}>EN</span>
            </button>
          </div>

          {/* Desktop Navigation Links with Dynamic Sliding Indicator Rectangle */}
          <nav className="hidden md:flex items-center gap-1 relative p-1 rounded border border-[#075056]/40 bg-[#16232A]/50">
            {/* Dynamic sliding cyan indicator rectangle */}
            <div
              className="absolute h-8 rounded transition-all duration-300 ease-out pointer-events-none z-0"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`,
                opacity: pillStyle.opacity,
                backgroundColor: 'rgba(7,80,86,0.6)',
                border: '1px solid #268B95',
                boxShadow: '0 0 12px rgba(38,139,149,0.4)',
              }}
            />

            {NAV_ITEMS.map((item, i) => (
              <button
                key={item}
                ref={el => (itemRefs.current[i] = el)}
                onClick={() => scrollTo(NAV_IDS[i])}
                className="relative z-10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                style={{
                  fontFamily: 'Barlow, sans-serif',
                  letterSpacing: '0.12em',
                  color: active === NAV_IDS[i] ? '#E4EEF0' : 'rgba(228,238,240,0.7)',
                }}
              >
                {item}
              </button>
            ))}

            <button
              onClick={() => window.open('https://wa.me/5493329523459?text=Hola%20Felipe,%20vi%20tu%20portafolio%20y%20quisiera%20contactarte.', '_blank')}
              className="relative z-10 ml-2 px-5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: '#FF5B04',
                color: '#E4EEF0',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.1em',
                borderRadius: '2px',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D94A00')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF5B04')}
            >
              {t('Hablemos', "Let's Talk")}
            </button>

            {/* Desktop Language Switcher Toggle */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="relative z-10 ml-2 px-2.5 py-1.5 text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              style={{
                backgroundColor: 'rgba(7,80,86,0.6)',
                color: '#E4EEF0',
                border: '1px solid #268B95',
                borderRadius: '2px',
              }}
              title="Cambiar idioma / Switch language"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10z" />
              </svg>
              <span className={lang === 'es' ? 'text-[#FF5B04]' : 'text-white/50'}>ES</span>
              <span>/</span>
              <span className={lang === 'en' ? 'text-[#FF5B04]' : 'text-white/50'}>EN</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Ergonomic Floating Bottom Navigation Bar for Mobile */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-2 flex justify-around items-center transition-all duration-300"
        style={{
          backgroundColor: 'rgba(22,35,42,0.97)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,91,4,0.3)',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.5)',
        }}
      >
        {[
          {
            id: 'sobre',
            label: t('Sobre Mí', 'About'),
            svg: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            ),
          },
          {
            id: 'servicios',
            label: t('Soluciones', 'Solutions'),
            svg: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            ),
          },
          {
            id: 'proyectos',
            label: t('Proyectos', 'Projects'),
            svg: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ),
          },
          {
            id: 'contacto',
            label: t('Contacto', 'Contact'),
            svg: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ),
          },
        ].map(item => {
          const isActive = active === item.id

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center justify-center py-1 px-3 rounded transition-all duration-200 cursor-pointer"
              style={{
                color: isActive ? '#FF5B04' : 'rgba(228,238,240,0.7)',
              }}
            >
              <div
                className={`transition-transform duration-200 ${isActive ? 'scale-110 text-[#FF5B04]' : 'scale-100'
                  }`}
              >
                {item.svg}
              </div>
              <span
                className="text-[10px] uppercase tracking-wider font-bold mt-0.5"
                style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  color: isActive ? '#FF5B04' : 'rgba(228,238,240,0.7)',
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <span
                  className="w-1 h-1 rounded-full mt-0.5 animate-pulse"
                  style={{ backgroundColor: '#FF5B04' }}
                />
              )}
            </button>
          )
        })}
      </nav>
    </>
  )
}
