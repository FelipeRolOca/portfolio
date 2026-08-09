import { useState, useEffect, useRef, createContext, useContext } from 'react'
import logo1 from '@/imports/LOGO_1.png'
import logo2 from '@/imports/LOGO_2.png'
import logo3 from '@/imports/LOGO_3.png'
import fondoCuadrado from '@/imports/FONDO_CUADRADO.png'
import fondoLargo from '@/imports/FONDO_LARGO.png'
import fondoVertical from '@/imports/FONDO_RECTANGULO_VERTICAL.png'
import fondoHorizontal from '@/imports/FONDO_RECTANGULO_HORIZONTAL.png'
import elem1 from '@/imports/ELEMENTO_GRAFICO_1.png'
import elem2 from '@/imports/ELEMENTO_GRAFICO_2.png'
import elem3 from '@/imports/ELEMENTO_GRAFICO_3.png'

type Language = 'es' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (l: Language) => void
  t: (es: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: (es) => es,
})

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang')
    return (saved === 'en' || saved === 'es') ? saved : 'es'
  })

  const setLang = (l: Language) => {
    setLangState(l)
    localStorage.setItem('portfolio_lang', l)
  }

  const t = (es: string, en: string) => (lang === 'en' ? en : es)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

function useLang() {
  return useContext(LanguageContext)
}

const NAV_IDS = ['sobre', 'servicios', 'habilidades', 'experiencia', 'proyectos', 'contacto']

function Navbar() {
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
              className={`flex items-center gap-3 px-3 py-1.5 rounded transition-all duration-300 cursor-pointer ${
                active === 'hero'
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
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
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
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span className={lang === 'es' ? 'text-[#FF5B04]' : 'text-white/50'}>ES</span>
              <span>/</span>
              <span className={lang === 'en' ? 'text-[#FF5B04]' : 'text-white/50'}>EN</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Ergonomic Floating Bottom Navigation Bar for Mobile (4 clean items) */}
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
                className={`transition-transform duration-200 ${
                  isActive ? 'scale-110 text-[#FF5B04]' : 'scale-100'
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

function Hero() {
  const { t } = useLang()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#16232A' }}
    >
      {/* Background pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${fondoVertical})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <h1
            className="uppercase leading-none mb-6"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              color: '#E4EEF0',
              letterSpacing: '-0.01em',
            }}
          >
            Felipe
            <br />
            <span style={{ color: '#075056', WebkitTextStroke: '2px #E4EEF0' }}>Roldán</span>
            <br />
            Ocampo
          </h1>

          <p
            className="mb-4 text-lg font-semibold uppercase tracking-widest"
            style={{ color: '#FF5B04', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.25em' }}
          >
            {t('Full Stack Developer · Automatización de Procesos', 'Full Stack Developer · Process Automation')}
          </p>

          <p
            className="mb-10 max-w-lg leading-relaxed font-medium"
            style={{ color: '#F0F6F7', fontFamily: 'Barlow, sans-serif', fontSize: '1.05rem' }}
          >
            {t(
              'Desarrollo aplicaciones web, sistemas internos y automatizaciones que ayudan a empresas a reducir tareas manuales, centralizar información y mejorar sus procesos.',
              'I develop web applications, internal systems, and process automations that help businesses reduce manual work, centralize data, and optimize operations.'
            )}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: '#FF5B04',
                color: '#E4EEF0',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '0.1em',
                borderRadius: '2px',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D94A00')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF5B04')}
            >
              {t('Ver Proyectos', 'View Projects')}
            </button>
            <button
              onClick={() => window.open('https://wa.me/5493329523459?text=Hola%20Felipe,%20vi%20tu%20portafolio%20y%20quisiera%20contactarte.', '_blank')}
              className="px-8 py-3.5 font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: 'transparent',
                color: '#E4EEF0',
                border: '2px solid #075056',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '0.1em',
                borderRadius: '2px',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#E4EEF0'; e.currentTarget.style.color = '#E4EEF0' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#075056'; e.currentTarget.style.color = '#E4EEF0' }}
            >
              {t('Hablemos', "Let's Talk")}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center relative mt-10 lg:mt-0">
          <div className="relative group cursor-pointer">
            {/* Top-left decorative logo3 */}
            <img
              src={logo3}
              alt="FRO logo 3"
              className="absolute -top-2 -left-2 w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full z-20 pointer-events-none transition-transform duration-500 group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 0 16px rgba(255,91,4,0.75))' }}
            />

            {/* Bottom-right decorative logo1 */}
            <img
              src={logo1}
              alt="FRO logo 1"
              className="absolute -bottom-2 -right-2 w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full z-20 pointer-events-none transition-transform duration-500 group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 0 16px rgba(255,91,4,0.75))' }}
            />

            {/* Circular Profile Image (Visible on BOTH mobile and desktop) */}
            <div
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden transition-all duration-500 group-hover:scale-105"
              style={{
                boxShadow: '0 0 35px rgba(255,91,4,0.35), 0 0 70px rgba(7,80,86,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 75px rgba(255,91,4,0.7), 0 0 100px rgba(255,91,4,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 35px rgba(255,91,4,0.35), 0 0 70px rgba(7,80,86,0.3)'
              }}
            >
              <img
                src="/Foto Perfil definitiva.png"
                alt="Felipe Roldán Ocampo"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const { t } = useLang()

  return (
    <section
      id="sobre"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#075056' }}
    >
      {/* Short solid color accent bar at section junction */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#FF5B04] rounded-b-full z-10" />

      {/* Brand logo1 decoration in About section */}
      <div className="absolute right-6 top-6 opacity-20 pointer-events-none hidden md:block">
        <img src={logo1} alt="FRO logo 1" className="w-20 h-20 object-contain" />
      </div>
      {/* Single close-up FONDO_LARGO gliding smoothly from top to bottom and back */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden pointer-events-none opacity-15 hidden md:block">
        <img
          src={fondoLargo}
          alt=""
          className="w-full min-h-[140%] object-cover animate-slow-float"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2
            className="uppercase leading-none mb-8"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#E4EEF0',
            }}
          >
            {t('Transformo necesidades', 'Transforming business needs')}
            <br />
            <span style={{ color: '#16232A' }}>{t('en soluciones digitales', 'into digital solutions')}</span>
          </h2>
          <p className="leading-relaxed mb-6 font-medium" style={{ color: '#F0F6F7', fontFamily: 'Barlow, sans-serif', fontSize: '1.05rem' }}>
            {t(
              'Soy desarrollador Full Stack y estudiante de Ingeniería Informática. Me especializo en transformar necesidades de negocio en soluciones digitales concretas: desde sitios web y aplicaciones hasta sistemas internos y automatizaciones.',
              'I am a Full Stack Developer and Software Engineering student. I specialize in turning business needs into concrete digital solutions: from websites and apps to internal systems and workflow automations.'
            )}
          </p>
          <p className="leading-relaxed font-medium" style={{ color: '#F0F6F7', fontFamily: 'Barlow, sans-serif', fontSize: '1.05rem' }}>
            {t(
              'Mi enfoque no se limita a desarrollar una interfaz. Analizo el proceso que existe detrás de una necesidad, identifico tareas que pueden optimizarse y construyo herramientas que permiten centralizar información, reducir trabajo manual y mejorar la operación.',
              'My approach goes beyond building a user interface. I analyze the underlying process behind a business need, identify bottleneck tasks, and build custom tools to centralize data and reduce manual overhead.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: elem2, label: t('Educación', 'Education'), value: t('Ing. Informática', 'Software Eng.'), unit: t('Estudiante', 'Student'), color: '#16232A' },
            { icon: elem2, label: t('Ubicación', 'Location'), value: 'Argentina', unit: 'San Pedro, BA', color: '#16232A' },
            { icon: elem3, label: t('Inglés', 'English'), value: t('Nivel B2', 'B2 Upper-Int.'), unit: 'B2', color: '#FF5B04' },
            { icon: elem2, label: t('Especialidad', 'Specialty'), value: 'Full Stack', unit: t('Automatización', 'Automation'), color: '#16232A' },
          ].map((card, i) => (
            <div
              key={i}
              className="p-6 flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: card.color,
                borderRadius: '2px',
                border: card.color === '#FF5B04' ? 'none' : '1px solid rgba(228,238,240,0.1)',
              }}
            >
              <img src={card.icon} alt="" className="w-10 h-10 object-contain" />
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    color: card.color === '#FF5B04' ? 'rgba(228,238,240,0.7)' : 'rgba(228,238,240,0.5)',
                    fontSize: '10px',
                  }}
                >
                  {card.label}
                </div>
                <div
                  className="font-black uppercase leading-none"
                  style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '1.6rem',
                    color: '#E4EEF0',
                  }}
                >
                  {card.value}
                </div>
                <div
                  className="text-xs uppercase tracking-wider mt-1"
                  style={{
                    fontFamily: 'Barlow, sans-serif',
                    color: card.color === '#FF5B04' ? 'rgba(228,238,240,0.8)' : '#FF5B04',
                    fontWeight: 600,
                  }}
                >
                  {card.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  const { t } = useLang()

  return (
    <section
      id="servicios"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#16232A' }}
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <h2
          className="uppercase leading-none mb-6"
          style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            color: '#E4EEF0',
          }}
        >
          {t('Soluciones que puedo', 'Solutions I can')}
          <br />
          <span style={{ color: '#FF5B04' }}>{t('desarrollar', 'build for you')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              title: t('Sitios web', 'Websites'),
              desc: t('Sitios corporativos, landing pages, portfolios y plataformas adaptadas a las necesidades de cada proyecto.', 'Corporate sites, landing pages, portfolios, and web platforms tailored to your business needs.'),
            },
            {
              title: t('Aplicaciones web', 'Web Applications'),
              desc: t('Sistemas con autenticación, paneles administrativos, bases de datos y lógica de negocio a medida.', 'Custom web apps with authentication, admin dashboards, databases, and tailored business logic.'),
            },
            {
              title: t('Automatización de procesos', 'Process Automation'),
              desc: t('Automatización de tareas repetitivas, generación de reportes, procesamiento de información e integraciones.', 'Automation of repetitive tasks, automated report generation, data processing, and API integrations.'),
            },
            {
              title: t('Sistemas a medida', 'Custom Systems'),
              desc: t('Soluciones diseñadas alrededor de operaciones específicas, desde la gestión de datos hasta el control operativo.', 'Tailored software built around specific operations, from data management to operational control.'),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-7 flex flex-col transition-all duration-300 hover:border-[#FF5B04]/50 hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(7,80,86,0.3)',
                border: '1px solid rgba(7,80,86,0.6)',
                borderRadius: '2px',
              }}
            >
              <h3
                className="font-bold text-xl sm:text-2xl uppercase mb-3 tracking-wide"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed font-medium"
                style={{ color: '#F0F6F7', fontFamily: 'Barlow, sans-serif' }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className="p-8 sm:p-10"
          style={{
            backgroundColor: 'rgba(7,80,86,0.25)',
            border: '1px solid #075056',
            borderRadius: '2px',
          }}
        >
          <h3
            className="font-black uppercase text-xl sm:text-3xl mb-2"
            style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
          >
            {t('¿Tenés un proceso que todavía hacés manualmente?', 'Do you have a process still done manually?')}
          </h3>
          <p
            className="text-sm sm:text-base mb-6"
            style={{ color: '#FF5B04', fontFamily: 'JetBrains Mono, monospace' }}
          >
            {t('Puedo ayudarte a digitalizar procesos y acelerar tareas como:', 'I can help you digitize processes and speed up workflows such as:')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              t('Carga y organización de información', 'Data entry and information management'),
              t('Generación automática de reportes', 'Automated PDF/Sheet report generation'),
              t('Gestión de empleados o clientes', 'Employee or client management portals'),
              t('Control de asistencia con GPS y QR', 'Attendance tracking with GPS & QR'),
              t('Formularios y recepción de datos', 'Data collection and web form intake'),
              t('Procesos que requieren validaciones', 'Processes requiring custom validations'),
              t('Integración entre distintas herramientas', 'Integrations between third-party tools'),
              t('Paneles para visualizar métricas clave', 'Dashboards for key business metrics'),
              t('Sitios web y plataformas corporativas', 'Corporate websites & web platforms'),
            ].map((prob, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 text-sm font-medium"
                style={{
                  backgroundColor: '#16232A',
                  color: '#E4EEF0',
                  border: '1px solid rgba(7,80,86,0.4)',
                  fontFamily: 'Barlow, sans-serif',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FF5B04' }} />
                {prob}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const { t } = useLang()

  const SKILLS = [
    {
      category: t('Desarrollo Frontend', 'Frontend Development'),
      icon: '⬡',
      items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3 / Tailwind'],
      note: t('Aplicaciones web responsivas, plataformas corporativas y paneles interactivos con lógica moderna.', 'Responsive web apps, corporate platforms, and interactive dashboards with modern architecture.'),
    },
    {
      category: t('Backend y Bases de Datos', 'Backend & Databases'),
      icon: '◈',
      items: ['SQL', 'PostgreSQL', 'Supabase', 'MongoDB', 'Neo4j', 'Oracle'],
      note: t('Diseño de esquemas, consultas optimizadas y gestión de información estructurada y no estructurada.', 'Schema design, query optimization, and structured/unstructured data management.'),
    },
    {
      category: t('Automatización e Integración', 'Automation & Integration'),
      icon: '⬢',
      items: ['Google Apps Script', 'REST APIs', 'QR / Códigos de barras', 'Validación GPS', 'Webhooks', 'Node.js'],
      note: t('Automatización de reportes, flujos administrativos, sincronización de servicios y validaciones de campo.', 'Automated reporting, admin workflows, third-party service sync, and field validations.'),
    },
    {
      category: t('Herramientas y Despliegue', 'Tools & Deployment'),
      icon: '◎',
      items: ['Git / GitHub', 'Vercel', 'VS Code', 'Vite', 'WordPress', 'Linux'],
      note: t('Parte de mi flujo de trabajo diario para desarrollo ágil, control de versiones y entrega continua.', 'My daily workflow stack for agile development, version control, and continuous deployment.'),
    },
  ]

  return (
    <section
      id="habilidades"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#16232A' }}
    >
      {/* Horizontal background pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${fondoHorizontal})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.07,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <h2
              className="uppercase leading-none"
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#E4EEF0',
              }}
            >
              {t('Tecnologías y', 'Tech Stack &')}{' '}
              <span style={{ color: '#FF5B04' }}>{t('herramientas', 'Tools')}</span>
            </h2>
          </div>
          <div
            className="text-sm max-w-xs"
            style={{ color: 'rgba(228,238,240,0.5)', fontFamily: 'Barlow, sans-serif' }}
          >
            {t(
              'Tecnologías que utilizo para desarrollar aplicaciones, sistemas y automatizaciones orientadas a resolver necesidades reales.',
              'Technologies and frameworks I use to build scalable web applications, custom systems, and process automations.'
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: 'rgba(7,80,86,0.2)' }}>
          {SKILLS.map((group, gi) => (
            <div
              key={gi}
              className="p-8 transition-all duration-300 group"
              style={{ backgroundColor: '#16232A' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0a1e25')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#16232A')}
            >
              <div
                className="text-3xl mb-2"
                style={{ color: '#075056' }}
              >
                {group.icon}
              </div>
              <h3
                className="uppercase font-black mb-6 text-lg"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0', letterSpacing: '0.05em' }}
              >
                {group.category}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.items.map(skill => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: 'rgba(228,238,240,0.7)', fontFamily: 'Barlow, sans-serif' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#FF5B04' }}
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const { t } = useLang()

  const EXPERIENCE = [
    {
      period: t('2026 — Presente', '2026 — Present'),
      role: t('Desarrollador Full Stack', 'Full Stack Developer'),
      company: t('JJAsist (Proyecto Freelance / SaaS)', 'JJAsist (Freelance SaaS Project)'),
      description: t(
        'Sistema de asistencia y control horario con identificación mediante QR, validación geográfica y registro centralizado de operaciones. Resultado: Transformé un proceso manual de asistencia en una plataforma web centralizada, con validación de ubicación, gestión administrativa y automatización de reportes.',
        'Attendance and time tracking system featuring dynamic QR identification, GPS geographic validation, and centralized operation logs. Result: Transformed a manual attendance process into a centralized web platform with location validation, admin panel, and automated reporting.'
      ),
      tags: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
    },
    {
      period: t('2025 — Presente', '2025 — Present'),
      role: t('Desarrollador Web Freelance', 'Freelance Web Developer'),
      company: 'JJ Servicios Empresariales',
      description: t(
        'Desarrollo de una presencia digital profesional para una consultora de Recursos Humanos, orientada a mejorar su presentación online, facilitar el contacto con potenciales clientes y estructurar sus servicios de forma clara. Resultado: Desarrollé un sitio corporativo orientado a presentar los servicios de forma clara.',
        'Development of a professional digital presence for an HR consulting firm, aimed at strengthening online brand identity, driving client leads, and structuring services clearly. Result: Built a modern corporate site presenting services clearly and driving client inquiries.'
      ),
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'SEO'],
    },
  ]

  return (
    <section
      id="experiencia"
      className="relative py-24"
      style={{ backgroundColor: '#075056' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="uppercase leading-none mb-16"
          style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            color: '#E4EEF0',
          }}
        >
          {t('Trayectoria', 'Professional')}
          <br />
          <span style={{ color: '#16232A' }}>{t('Profesional', 'Experience')}</span>
        </h2>

        <div className="relative">
          <div
            className="absolute left-4 top-0 bottom-0 w-px"
            style={{ backgroundColor: 'rgba(22,35,42,0.4)' }}
          />

          <div className="flex flex-col gap-0">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className="relative pl-12 pb-12 group"
              >
                <div
                  className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 transition-colors duration-200"
                  style={{
                    backgroundColor: '#075056',
                    borderColor: '#FF5B04',
                    transform: 'translateX(-50%)',
                    left: '16px',
                  }}
                />

                <div
                  className="p-8 transition-transform duration-200 group-hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'rgba(22,35,42,0.5)',
                    borderRadius: '2px',
                    border: '1px solid rgba(22,35,42,0.3)',
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div
                        className="text-xs uppercase tracking-widest mb-2"
                        style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04', fontSize: '11px' }}
                      >
                        {exp.period}
                      </div>
                      <h3
                        className="font-black uppercase text-xl leading-tight"
                        style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
                      >
                        {exp.role}
                      </h3>
                      <div
                        className="text-sm font-semibold mt-1"
                        style={{ color: 'rgba(228,238,240,0.5)', fontFamily: 'Barlow, sans-serif' }}
                      >
                        {exp.company}
                      </div>
                    </div>
                  </div>
                  <p
                    className="leading-relaxed mb-6"
                    style={{ color: 'rgba(228,238,240,0.75)', fontFamily: 'Barlow, sans-serif', fontSize: '0.95rem' }}
                  >
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs uppercase tracking-wider font-semibold"
                        style={{
                          backgroundColor: 'rgba(7,80,86,0.4)',
                          color: '#E4EEF0',
                          fontFamily: 'JetBrains Mono, monospace',
                          borderRadius: '2px',
                          fontSize: '10px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



function Projects() {
  const { t } = useLang()
  const [activeProject, setActiveProject] = useState<number | null>(null)

  const PROJECTS = [
    {
      title: 'JJAsist',
      subtitle: t('Proyecto Principal / SaaS', 'Main Project / SaaS'),
      description: t(
        'Sistema de asistencia y control horario con identificación mediante QR dinámico, validación geográfica GPS y registro centralizado de operaciones. Automatización de reportes con Google Apps Script.',
        'Attendance and time tracking system with dynamic QR identification, GPS geolocation validation, and centralized operation logs. Automated reporting via Google Apps Script.'
      ),
      tech: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
      url: 'https://jj-asist.vercel.app/',
      image: '/jj-asist-logo.png',
      featured: true,
    },
    {
      title: 'JJ Servicios Empresariales',
      subtitle: t('Desarrollo Web / Cliente Real', 'Web Dev / Real Client'),
      description: t(
        'Sitio corporativo orientado a presentar los servicios de forma clara, optimizar el posicionamiento SEO y facilitar el contacto directo con potenciales clientes corporativos.',
        'Corporate website designed to showcase HR services clearly, optimize SEO ranking, and facilitate direct contact with potential corporate clients.'
      ),
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'SEO'],
      url: 'https://jjserviciosempresarialesrrhh.com/',
      image: '/Rehace_el_logo_202604262015.jpeg',
      featured: false,
    },
    {
      title: 'JJHire & JJBusca',
      subtitle: t('Plataforma en Desarrollo / Beta', 'Platform in Development / Beta'),
      description: t(
        'Plataforma de contratación compuesta por dos portales complementarios: JJHire (para postulantes) y JJBusca (para administradores) para consultar y gestionar búsquedas laborales.',
        'Hiring platform composed of two complementary portals: JJHire (for applicants) and JJBusca (for admins) to browse and manage job listings.'
      ),
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
      url: 'https://jj-hire.vercel.app/',
      secondaryUrl: 'https://jj-busca.vercel.app/',
      image: '/jj-hire-busca-placeholder.png',
      featured: false,
    },
    {
      title: 'Paper Pops',
      subtitle: t('Proyecto Experimental / Frontend', 'Experimental / Frontend Project'),
      description: t(
        'Aplicación web completa construida con React, Vite y Motion. Explora animaciones e interfaces interactivas avanzadas.',
        'Full web application built with React, Vite, and Motion. Explores advanced animations and interactive UI patterns.'
      ),
      tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      url: 'https://paper-pops.vercel.app/',
      image: '/paper-pops-preview.jpeg',
      featured: false,
    },
  ]

  return (
    <section
      id="proyectos"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#16232A' }}
    >
      {/* Single FONDO_CUADRADO image gliding back and forth (Desktop only) */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <img
          src={fondoCuadrado}
          alt=""
          className="w-full min-h-[130%] object-cover animate-slow-float"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h2
              className="uppercase leading-none"
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#E4EEF0',
              }}
            >
              {t('Trabajo', 'Featured')}
              <br />
              <span style={{ color: '#FF5B04' }}>{t('Destacado', 'Work')}</span>
            </h2>
          </div>
        </div>

        {/* DESKTOP 2X2 GRID (Static attached grid with subtle glow on active card & dimmed inactive) */}
        <div
          className="hidden lg:grid grid-cols-2 gap-px"
          style={{
            backgroundColor: 'rgba(7,80,86,0.3)',
            border: '1px solid rgba(7,80,86,0.5)',
          }}
        >
          {PROJECTS.map((proj, i) => {
            const isHovered = activeProject === i
            const isAnyHovered = activeProject !== null
            const isDimmed = isAnyHovered && !isHovered

            return (
              <div
                key={i}
                className={`relative p-8 flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-pointer ${
                  isHovered
                    ? 'bg-[#0c1f27] border-2 border-[#FF5B04] shadow-[0_15px_40px_rgba(255,91,4,0.3)] z-10'
                    : isDimmed
                    ? 'bg-[#121c21] opacity-50 border border-transparent'
                    : 'bg-[#16232A] border border-transparent hover:bg-[#0a1e25]'
                }`}
                onMouseEnter={() => setActiveProject(i)}
                onMouseLeave={() => setActiveProject(null)}
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName !== 'A' && (e.target as HTMLElement).tagName !== 'BUTTON') {
                    window.open(proj.url, '_blank')
                  }
                }}
              >
                {proj.featured && (
                  <div
                    className="absolute top-6 right-6 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider z-10"
                    style={{
                      backgroundColor: '#FF5B04',
                      color: '#E4EEF0',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '9px',
                      borderRadius: '2px',
                    }}
                  >
                    {t('Principal', 'Featured')}
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {/* Subtle emblem logo header */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded border border-[#FF5B04]/30 p-1.5 bg-[#075056]/20 flex items-center justify-center flex-shrink-0">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                    <div>
                      <div
                        className="text-xs uppercase tracking-widest"
                        style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04', fontSize: '10px' }}
                      >
                        {proj.subtitle}
                      </div>
                      <h3
                        className="font-black uppercase text-2xl leading-tight"
                        style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
                      >
                        {proj.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className="leading-relaxed text-sm"
                    style={{ color: 'rgba(228,238,240,0.8)', fontFamily: 'Barlow, sans-serif' }}
                  >
                    {proj.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs uppercase tracking-wider"
                        style={{
                          backgroundColor: 'rgba(7,80,86,0.3)',
                          color: 'rgba(228,238,240,0.7)',
                          fontFamily: 'JetBrains Mono, monospace',
                          borderRadius: '2px',
                          fontSize: '10px',
                          border: '1px solid rgba(7,80,86,0.4)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-3 border-t" style={{ borderColor: 'rgba(7,80,86,0.4)' }}>
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 text-center"
                      style={{
                        backgroundColor: isHovered ? '#FF5B04' : 'rgba(7,80,86,0.5)',
                        color: '#E4EEF0',
                        fontFamily: 'Barlow Condensed, sans-serif',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        borderRadius: '2px',
                        border: isHovered ? '1px solid #FF5B04' : '1px solid rgba(7,80,86,0.6)',
                      }}
                    >
                      {t('Visitar Sitio →', 'Visit Site →')}
                    </a>
                    {proj.secondaryUrl && (
                      <a
                        href={proj.secondaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-200 text-center"
                        style={{
                          backgroundColor: 'transparent',
                          color: '#E4EEF0',
                          fontFamily: 'Barlow Condensed, sans-serif',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          borderRadius: '2px',
                          border: '1px solid #075056',
                        }}
                      >
                        JJBusca →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* MOBILE STATIC CARDS (Clean, Fixed, No Complex Animations) */}
        <div className="grid grid-cols-1 gap-6 lg:hidden">
          {PROJECTS.map((proj, i) => (
            <div
              key={i}
              className="relative p-6 flex flex-col justify-between rounded border border-[#075056]/50 bg-[#16232A]"
            >
              {proj.featured && (
                <div
                  className="absolute top-4 right-4 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider z-10"
                  style={{
                    backgroundColor: '#FF5B04',
                    color: '#E4EEF0',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '9px',
                    borderRadius: '2px',
                  }}
                >
                  Principal
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded border border-[#FF5B04]/30 p-1 bg-[#075056]/20 flex items-center justify-center flex-shrink-0">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest"
                      style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04', fontSize: '9px' }}
                    >
                      {proj.subtitle}
                    </div>
                    <h3
                      className="font-black uppercase text-xl leading-tight"
                      style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
                    >
                      {proj.title}
                    </h3>
                  </div>
                </div>

                <p
                  className="leading-relaxed text-sm"
                  style={{ color: 'rgba(228,238,240,0.8)', fontFamily: 'Barlow, sans-serif' }}
                >
                  {proj.description}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs uppercase tracking-wider"
                      style={{
                        backgroundColor: 'rgba(7,80,86,0.3)',
                        color: 'rgba(228,238,240,0.7)',
                        fontFamily: 'JetBrains Mono, monospace',
                        borderRadius: '2px',
                        fontSize: '9px',
                        border: '1px solid rgba(7,80,86,0.4)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-3 border-t" style={{ borderColor: 'rgba(7,80,86,0.4)' }}>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider text-center"
                    style={{
                      backgroundColor: '#FF5B04',
                      color: '#E4EEF0',
                      fontFamily: 'Barlow Condensed, sans-serif',
                      borderRadius: '2px',
                    }}
                  >
                    {t('Visitar Sitio →', 'Visit Site →')}
                  </a>
                  {proj.secondaryUrl && (
                    <a
                      href={proj.secondaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-center"
                      style={{
                        backgroundColor: 'transparent',
                        color: '#E4EEF0',
                        fontFamily: 'Barlow Condensed, sans-serif',
                        borderRadius: '2px',
                        border: '1px solid #075056',
                      }}
                    >
                      JJBusca →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailUrl = `mailto:felipeoca123@hotmail.com?subject=${encodeURIComponent(
      form.subject || t('Contacto desde Portafolio Web', 'Contact from Portfolio')
    )}&body=${encodeURIComponent(
      `${t('Nombre', 'Name')}: ${form.name}\nEmail: ${form.email}\n\n${t('Mensaje', 'Message')}:\n${form.message}`
    )}`
    window.location.href = mailUrl
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'rgba(22,35,42,0.8)',
    border: '1px solid rgba(7,80,86,0.5)',
    color: '#E4EEF0',
    fontFamily: 'Barlow, sans-serif',
    fontSize: '0.95rem',
    borderRadius: '2px',
    padding: '0.875rem 1rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section
      id="contacto"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#075056' }}
    >
      {/* Right side background overlay using single FONDO_CUADRADO (Desktop only for pure solid color on mobile) */}
      <div
        className="hidden md:block absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${fondoCuadrado})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2
            className="uppercase leading-none mb-8"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#E4EEF0',
            }}
          >
            {t('Trabajemos', "Let's Work")}
            <br />
            <span style={{ color: '#16232A' }}>{t('Juntos', 'Together')}</span>
          </h2>
          <p
            className="leading-relaxed mb-12"
            style={{ color: 'rgba(228,238,240,0.75)', fontFamily: 'Barlow, sans-serif', fontSize: '1.05rem' }}
          >
            {t(
              'Puedo ayudarte a convertir una idea, necesidad o proceso manual en una solución digital: desde un sitio web profesional hasta una aplicación, sistema interno o automatización diseñada para tu negocio.',
              'I can help you turn an idea, need, or manual process into a digital solution: from a professional website to an application, internal system, or custom automation for your business.'
            )}
          </p>

          <div className="flex flex-col gap-6">
            {/* Email item card */}
            <div
              className="p-5 sm:p-6 flex items-center gap-5 transition-all duration-300 hover:border-[#FF5B04]/60"
              style={{
                backgroundColor: 'rgba(22,35,42,0.6)',
                border: '1px solid rgba(7,80,86,0.8)',
                borderRadius: '4px',
              }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(7,80,86,0.4)',
                  color: '#FF5B04',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,91,4,0.3)',
                }}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="overflow-hidden">
                <div
                  className="text-xs sm:text-sm uppercase tracking-widest font-bold mb-1"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04' }}
                >
                  Email
                </div>
                <a
                  href="mailto:felipeoca123@hotmail.com?subject=Consulta%20desde%20Portafolio"
                  className="text-base sm:text-xl font-bold font-mono tracking-wide transition-colors duration-200 hover:text-[#FF5B04] block truncate"
                  style={{ color: '#E4EEF0', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  felipeoca123@hotmail.com
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp item card with large action buttons */}
            <div
              className="p-5 sm:p-6 flex flex-col gap-4 transition-all duration-300 hover:border-[#FF5B04]/60"
              style={{
                backgroundColor: 'rgba(22,35,42,0.6)',
                border: '1px solid rgba(7,80,86,0.8)',
                borderRadius: '4px',
              }}
            >
              <div className="flex items-center gap-5">
                <div
                  className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(7,80,86,0.4)',
                    color: '#FF5B04',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,91,4,0.3)',
                  }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div
                    className="text-xs sm:text-sm uppercase tracking-widest font-bold mb-1"
                    style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04' }}
                  >
                    {t('Teléfono / WhatsApp', 'Phone / WhatsApp')}
                  </div>
                  <div
                    className="text-lg sm:text-2xl font-bold font-mono tracking-wider"
                    style={{ color: '#E4EEF0', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    +54 9 3329 523459
                  </div>
                </div>
              </div>

              {/* Large, touch-friendly CTA buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="https://wa.me/5493329523459?text=Hola%20Felipe,%20quisiera%20consultarte%20sobre%20un%20proyecto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  style={{
                    backgroundColor: '#FF5B04',
                    color: '#E4EEF0',
                    fontFamily: 'Barlow Condensed, sans-serif',
                    borderRadius: '3px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D94A00')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF5B04')}
                >
                  <span>WhatsApp</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.396 0 .029 5.367.029 12.003c0 2.114.551 4.175 1.597 5.99L0 24l6.135-1.609a11.943 11.943 0 005.896 1.543h.005c6.635 0 12.001-5.367 12.001-12.003.002-3.204-1.244-6.214-3.509-8.48A11.93 11.93 0 0012.031 0zm0 22.016h-.004a9.934 9.934 0 01-5.064-1.39l-.363-.216-3.762.986.1003-3.666-.237-.378a9.923 9.923 0 01-1.523-5.348c0-5.485 4.463-9.948 9.954-9.948 2.657 0 5.155 1.036 7.034 2.916a9.88 9.88 0 012.912 7.036c0 5.486-4.464 9.948-9.95 9.948z" />
                  </svg>
                </a>
                <a
                  href="tel:+5493329523459"
                  className="py-3 px-5 text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor: 'rgba(22,35,42,0.8)',
                    color: '#E4EEF0',
                    border: '1.5px solid rgba(255,91,4,0.4)',
                    fontFamily: 'Barlow Condensed, sans-serif',
                    borderRadius: '3px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF5B04')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,91,4,0.4)')}
                >
                  <span>Llamar</span>
                  <svg className="w-5 h-5 text-[#FF5B04]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Location item card */}
            <div
              className="p-5 sm:p-6 flex items-center gap-5 transition-all duration-300 hover:border-[#FF5B04]/60"
              style={{
                backgroundColor: 'rgba(22,35,42,0.6)',
                border: '1px solid rgba(7,80,86,0.8)',
                borderRadius: '4px',
              }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(7,80,86,0.4)',
                  color: '#FF5B04',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,91,4,0.3)',
                }}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div
                  className="text-xs sm:text-sm uppercase tracking-widest font-bold mb-1"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04' }}
                >
                  {t('Ubicación', 'Location')}
                </div>
                <div
                  className="text-base sm:text-xl font-bold"
                  style={{ color: '#E4EEF0', fontFamily: 'Barlow, sans-serif' }}
                >
                  San Pedro, Buenos Aires, Argentina
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.6)', fontSize: '10px' }}
              >
                {t('Nombre', 'Name')} *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder={t('Tu nombre y apellido', 'Your full name')}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = '#FF5B04')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(7,80,86,0.5)')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.6)', fontSize: '10px' }}
              >
                Email *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder={t('correo@ejemplo.com', 'email@example.com')}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = '#FF5B04')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(7,80,86,0.5)')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.6)', fontSize: '10px' }}
            >
              {t('Asunto', 'Subject')}
            </label>
            <input
              type="text"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              placeholder={t('¿En qué te puedo ayudar?', 'How can I help you?')}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#FF5B04')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(7,80,86,0.5)')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.6)', fontSize: '10px' }}
            >
              {t('Mensaje', 'Message')} *
            </label>
            <textarea
              required
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder={t('Contame sobre tu proyecto, proceso o necesidad...', 'Tell me about your project, process, or needs...')}
              rows={6}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#FF5B04')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(7,80,86,0.5)')}
            />
          </div>

          <button
            type="submit"
            className="py-4 font-bold uppercase tracking-wider text-base transition-all duration-200 mt-2"
            style={{
              backgroundColor: sent ? '#075056' : '#FF5B04',
              color: '#E4EEF0',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 700,
              letterSpacing: '0.1em',
              borderRadius: '2px',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { if (!sent) e.currentTarget.style.backgroundColor = '#D94A00' }}
            onMouseLeave={e => { if (!sent) e.currentTarget.style.backgroundColor = '#FF5B04' }}
          >
            {sent ? t('✓ Mensaje Enviado', '✓ Message Sent') : t('Enviar Mensaje', 'Send Message')}
          </button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useLang()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="py-8 sm:py-12 border-t"
      style={{ backgroundColor: '#16232A', borderColor: 'rgba(7,80,86,0.3)' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo2} alt="FRO logo" className="h-8 w-8 object-contain" />
          <div>
            <div
              className="font-black uppercase text-sm leading-none"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0', letterSpacing: '0.05em' }}
            >
              Felipe Roldán Ocampo
            </div>
            <div
              className="text-xs uppercase tracking-widest mt-0.5"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04', fontSize: '9px' }}
            >
              {t('Full Stack Developer · Automatización de Procesos', 'Full Stack Developer · Process Automation')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div
            className="text-xs text-center sm:text-right"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.4)', fontSize: '10px' }}
          >
            © {new Date().getFullYear()} Felipe Roldán Ocampo. {t('Todos los derechos reservados.', 'All rights reserved.')}
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: 'rgba(7,80,86,0.4)',
              color: '#E4EEF0',
              border: '1px solid rgba(7,80,86,0.6)',
              fontFamily: 'JetBrains Mono, monospace',
              borderRadius: '2px',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF5B04')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(7,80,86,0.6)')}
            title="Volver arriba"
          >
            ↑ {t('Arriba', 'Top')}
          </button>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <div style={{ fontFamily: 'Barlow, sans-serif' }} className="pb-16 md:pb-0">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  )
}
