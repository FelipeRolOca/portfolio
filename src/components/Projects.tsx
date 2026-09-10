import { useState, useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext'

export function Projects() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800)

  const RAW_PROJECTS = [
    {
      id: 'jj-asist',
      code: 'JJA',
      title: 'JJAsist',
      subtitle: t('Plataforma SaaS de Asistencia', 'SaaS Workforce & Attendance Platform'),
      description: t(
        'Solución integral para registro de asistencia laboral con fichaje por QR dinámico, validación de ubicación geográfica GPS y sincronización de planillas en Google Sheets.',
        'End-to-end workforce management SaaS featuring anti-spoofing dynamic QR check-ins, GPS geofencing verification, and automated Google Sheets sync.'
      ),
      tech: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
      url: 'https://jj-asist.vercel.app/',
      image: '/jj-asist-logo.png',
      featured: true,
    },
    {
      id: 'oscar-cuero',
      code: 'OSC',
      title: 'OSCAR — Puro Cuero',
      subtitle: t('Marroquinería & Generador de Contenido', 'Artisanal Leather E-Commerce & AI Marketing Suite'),
      description: t(
        'E-commerce y catálogo artesanal de marroquinería y calzado con panel administrativo integrado que incluye un generador de contenido (flyers, banners, historias y copies) para automatizar el marketing en redes sociales de los dueños.',
        'Direct-to-consumer artisanal leather e-commerce platform paired with an administrative content engine generating on-brand social media campaigns, banners, and copywriting.'
      ),
      tech: ['React', 'Vite', 'Tailwind CSS', 'Social Content Generator', 'SEO'],
      url: 'https://oscarpurocuero-delta.vercel.app/',
      image: '/OSCAR-01.png',
      featured: true,
    },
    {
      id: 'jj-servicios',
      code: 'JJS',
      title: 'JJ Servicios Empresariales',
      subtitle: t('Sitio Corporativo RRHH', 'Corporate HR Consulting Platform'),
      description: t(
        'Plataforma institucional para consultora de Recursos Humanos. Presentación clara de servicios, maquetación responsive moderna y optimización SEO.',
        'High-conversion corporate presence for human resources consultancy, engineered with responsive performance architecture and technical SEO optimization.'
      ),
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'SEO'],
      url: 'https://jjserviciosempresarialesrrhh.com/',
      image: '/Rehace_el_logo_202604262015.jpeg',
      featured: false,
    },
    {
      id: 'paper-pops',
      code: 'POP',
      title: 'Paper Pops',
      subtitle: t('Tienda Online / E-commerce', 'Online Retail Store & Catalog'),
      description: t(
        'Tienda online y catálogo de Paper Pops. Diseño visual atractivo, navegación fluida de productos y experiencia de compra optimizada.',
        'Digital storefront and interactive catalog featuring optimized buyer journeys, seamless mobile navigation, and modern visual branding.'
      ),
      tech: ['React', 'Vite', 'Tailwind CSS', 'E-commerce'],
      url: 'https://paperpops.vercel.app/',
      image: '/paper-pops-logo.png',
      featured: true,
    },
    {
      id: 'sofia-moya',
      code: 'SOF',
      title: 'Sofia Moya',
      subtitle: t('Portafolio — Diseñadora Gráfica y Digital', 'Graphic & Digital Designer Portfolio'),
      description: t(
        'Portafolio personal de Sofia Moya, diseñadora gráfica y digital especializada en identidad visual, branding y diseño de logos. Diseño y desarrollo completo del sitio.',
        'Bespoke design portfolio engineered for a brand identity specialist, delivering smooth transitions, curated case studies, and editorial-grade typography.'
      ),
      tech: ['React', 'Vite', 'CSS', 'Branding', 'Diseño Gráfico'],
      url: 'https://sofia-moya.vercel.app/',
      image: '/Logo principal_.png',
      featured: false,
    },
    {
      id: 'jj-hire',
      code: 'JJH',
      title: 'JJHire',
      subtitle: t('Portal de Postulantes', 'Talent Acquisition & ATS Dashboard'),
      isBeta: true,
      betaNotice: t(
        'Versión Beta — Diseño estético no terminado / en desarrollo',
        'Beta Release — Active development / UI polish in progress'
      ),
      description: t(
        'Sistema administrativo para selectores y reclutadores que facilita la búsqueda de perfiles, filtrado de currículums y gestión de búsquedas.',
        'Streamlined ATS enabling recruiters to parse resumes, filter candidate profiles, and manage end-to-end hiring pipelines in real time.'
      ),
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
      url: 'https://jj-hire.vercel.app/',
      image: '/jj-hire-busca-placeholder.png',
      featured: false,
    },
    {
      id: 'jj-busca',
      code: 'JJB',
      title: 'JJBusca',
      subtitle: t('Portal de Reclutadores', 'Candidate Career Portal'),
      isBeta: true,
      betaNotice: t(
        'Versión Beta — Diseño estético no terminado / en desarrollo',
        'Beta Release — Active development / UI polish in progress'
      ),
      description: t(
        'Portal de empleo para candidatos donde pueden cargar su CV, explorar ofertas laborales vigentes y realizar postulaciones en línea.',
        'Public-facing job board allowing candidates to explore active openings, upload credentials, and track application statuses seamlessly.'
      ),
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel', 'Admin Dashboard'],
      url: 'https://jj-busca.vercel.app/',
      image: '/jj-hire-busca-placeholder.png',
      featured: false,
    },
  ]

  type ProjectItem =
    | ({ isAddSlot?: false } & (typeof RAW_PROJECTS)[number])
    | { isAddSlot: true; id: string }

  const ALL_CARDS: ProjectItem[] = [
    ...RAW_PROJECTS.map(p => ({ ...p, isAddSlot: false as const })),
    { isAddSlot: true as const, id: 'next-available-project' },
  ]

  const prevWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1200)

  // Track desktop pinned scroll progress and sync on resize
  useEffect(() => {
    let ticking = false

    const updateScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return

      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))
      setScrollProgress(progress)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    const onResize = () => {
      const newWidth = window.innerWidth
      const oldWidth = prevWidthRef.current
      setWindowWidth(newWidth)
      setWindowHeight(window.innerHeight)

      // If crossing mobile/desktop breakpoint (768px), keep user cleanly in #proyectos
      const crossedBreakpoint =
        (oldWidth < 768 && newWidth >= 768) || (oldWidth >= 768 && newWidth < 768)
      prevWidthRef.current = newWidth

      if (crossedBreakpoint) {
        const proyectosEl = document.getElementById('proyectos')
        if (proyectosEl) {
          const rect = proyectosEl.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            proyectosEl.scrollIntoView({ behavior: 'auto' })
          }
        }
      }

      window.requestAnimationFrame(updateScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    updateScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const totalCards = ALL_CARDS.length
  const maxIndex = totalCards - 1
  const activeFloatIndex = scrollProgress * maxIndex
  const currentStep = Math.min(maxIndex, Math.round(activeFloatIndex))

  const scrollToStep = (idx: number) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = window.scrollY + rect.top
    const totalScrollable = rect.height - window.innerHeight
    const targetScroll = sectionTop + (idx / maxIndex) * totalScrollable + 15
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  // DESKTOP MEASUREMENTS & VIEWPORT HEIGHT SENSITIVITY:
  // Dynamically adapts spotlight scale and card sizing so the cards NEVER get clipped
  // on laptops (1366x768, 1080p scaled displays with height < 780px) while looking large on big screens.
  const isDesktop = windowWidth >= 768
  const isWide = windowWidth >= 1200
  const isShortScreen = windowHeight < 780
  const isVeryShortScreen = windowHeight < 680

  const cardWidth = isWide
    ? isShortScreen
      ? 380
      : 410
    : isDesktop
      ? isShortScreen
        ? 345
        : 375
      : Math.min(windowWidth - 32, 380)

  const baseOffset = isWide ? (isShortScreen ? 430 : 475) : isDesktop ? (isShortScreen ? 350 : 380) : 320
  const stepOffset = isWide ? Math.min(180, Math.max(130, Math.floor(windowWidth * 0.11))) : 120
  const spotlightScale = isVeryShortScreen ? 1.08 : isShortScreen ? 1.15 : 1.25
  const dockedScale = isVeryShortScreen ? 0.80 : isShortScreen ? 0.83 : 0.875

  return (
    <div id="proyectos">
      {/* ========================================================================= */}
      {/* 1. DESKTOP VERSION (hidden md:block): Pinned Theatre Stage               */}
      {/*    - Center card expands 1.5x (scale: 1.32 vs 0.88) & shines brightly    */}
      {/*    - Extended shining duration (stays glowing & enlarged much longer)    */}
      {/*    - Docks near center; previous cards displace outward by 50% width     */}
      {/* ========================================================================= */}
      <section
        ref={sectionRef}
        className="hidden md:block relative overflow-x-clip"
        style={{
          backgroundColor: '#16232A',
          height: '560vh', // Extended scroll track for doubled spotlight & shine duration
        }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-14 sm:pt-16 pb-3 sm:pb-5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col flex-1 min-h-0">
            {/* Header Desktop */}
            <div className="flex items-end justify-between mb-2 sm:mb-3 flex-wrap gap-3 border-b border-[#075056]/40 pb-2.5 flex-shrink-0">
              <div>
                <h2
                  className="uppercase leading-none"
                  style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(1.85rem, 3.2vw, 2.9rem)',
                    color: '#E4EEF0',
                  }}
                >
                  {t('Trabajo', 'Featured')}
                  <br />
                  <span style={{ color: '#FF5B04' }}>{t('Destacado', 'Work')}</span>
                </h2>
              </div>

              {/* Desktop Indicator & Jump Dots */}
              <div className="flex items-center gap-4">
                <div
                  className="px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase border"
                  style={{
                    backgroundColor: 'rgba(7,80,86,0.35)',
                    borderColor: '#268B95',
                    color: '#E4EEF0',
                    fontFamily: 'JetBrains Mono, monospace',
                    borderRadius: '2px',
                  }}
                >
                  0{currentStep + 1} / 0{totalCards}
                </div>

                <div
                  className="flex items-center gap-1.5 bg-[#075056]/20 p-1 border border-[#075056]/40"
                  style={{ borderRadius: '2px' }}
                >
                  {ALL_CARDS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToStep(idx)}
                      className="w-2.5 h-2.5 transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: currentStep === idx ? '#FF5B04' : 'rgba(228,238,240,0.25)',
                        transform: currentStep === idx ? 'scale(1.3)' : 'scale(1)',
                        borderRadius: '1px',
                      }}
                      title={`Ver proyecto ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Stage: natural flex-1 centering within exact viewport height */}
            <div className="relative w-full flex-1 flex items-center justify-center min-h-0 overflow-visible">
              {ALL_CARDS.map((item, index) => {
                const isFinalCard = index === maxIndex
                const delta = index - activeFloatIndex

                const isLeftStack = index % 2 === 0

                // Calculate dynamic outward push:
                // Triggers when subsequent card has finished its spotlight (> s + 0.55)
                let pushCount = 0
                for (let s = index + 2; s < maxIndex; s += 2) {
                  if (activeFloatIndex > s + 0.55) {
                    const p = Math.min(1, (activeFloatIndex - (s + 0.55)) / 0.45)
                    pushCount += p
                  }
                }

                let translateX = 0
                let translateY = 0
                let scale = 1.0
                let opacity = 1
                let zIndex = 10
                let isShining = false

                if (isFinalCard) {
                  // Final Card ("Próximo Proyecto"):
                  // Rises into center, expands to spotlight scale (1.32), and REMAINS SHINING IN CENTER!
                  if (delta > 0.85) {
                    return null
                  } else if (delta > 0.2) {
                    const enterT = 1 - (delta - 0.2) / 0.65
                    translateY = (1 - enterT) * 60
                    scale = dockedScale + enterT * (spotlightScale - dockedScale)
                    opacity = Math.max(0, enterT)
                    zIndex = 48
                    if (delta < 0.45) isShining = true
                  } else {
                    translateX = 0
                    translateY = 0
                    scale = spotlightScale
                    opacity = 1
                    zIndex = 50
                    isShining = true
                  }
                } else {
                  // Regular Project Cards:
                  if (delta > 0.85) {
                    return null
                  } else if (delta > 0.25) {
                    // Rising into center from below (or dropping back down when scrolling in reverse)
                    const enterT = 1 - (delta - 0.25) / 0.6
                    translateX = 0
                    translateY = (1 - enterT) * 60
                    scale = dockedScale + enterT * (spotlightScale - dockedScale)
                    opacity = Math.max(0, enterT)
                    zIndex = 40
                  } else if (delta >= -0.55) {
                    // EXTENDED SPOTLIGHT & SHINE (DOUBLED DURATION IN SCROLL):
                    // Stays enlarged (1.32x) and glowing with vibrant box-shadow in center for twice as long!
                    translateX = 0
                    translateY = 0
                    scale = spotlightScale
                    opacity = 1
                    zIndex = 50
                    isShining = true
                  } else {
                    // GLIDING TO STACK (Left or Right) & DISPLACING OUTWARD
                    // Bidirectional exit/entry: seamlessly glides to stack on scroll down, and glides back to center on scroll up!
                    const exitT = Math.min(1, (-delta - 0.55) / 0.45)
                    const sideSign = isLeftStack ? -1 : 1
                    // Docks at baseOffset and displaces outward by pushCount * stepOffset (50% card width)
                    translateX = sideSign * (exitT * baseOffset + pushCount * stepOffset)
                    translateY = 0
                    scale = spotlightScale - exitT * (spotlightScale - dockedScale)

                    // STACK ORDER & VISIBILITY:
                    if (exitT < 1) {
                      zIndex = 42
                    } else {
                      zIndex = Math.max(15, 35 - Math.round(pushCount * 4))
                    }
                    opacity = Math.max(0.85, 1 - pushCount * 0.05)
                    isShining = false
                  }
                }

                return (
                  <div
                    key={item.id}
                    className="absolute transition-all duration-300 ease-out"
                    style={{
                      width: `${cardWidth}px`,
                      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                      opacity,
                      zIndex,
                      willChange: 'transform, opacity',
                    }}
                  >
                    {renderCard(item, index, isShining, t)}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MOBILE VERSION (block md:hidden): Brutalist Fichero & Stacking Deck    */}
      {/*    - Interactive Fichero bar at top with project index buttons (JJA, etc) */}
      {/*    - Cards file away as you scroll; tapping any tab jumps back to it      */}
      {/*    - Last project (Sofia Moya) is 100% visible and unblocked              */}
      {/*    - "Próximo Proyecto" sits cleanly below in normal document flow        */}
      {/* ========================================================================= */}
      <section
        className="block md:hidden relative py-10 px-4"
        style={{ backgroundColor: '#16232A' }}
      >
        <div className="w-full mx-auto max-w-md">
          {/* Header Mobile: Anchored cleanly at top so TRABAJO DESTACADO is visible as title */}
          <div className="sticky top-14 z-30 bg-[#16232A] pt-1 pb-2 mb-2 border-b border-[#075056]/40 flex items-end justify-between">
            <h2
              className="uppercase leading-tight"
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: '1.85rem',
                color: '#E4EEF0',
              }}
            >
              {t('Trabajo', 'Featured')}
              <br />
              <span style={{ color: '#FF5B04' }}>{t('Destacado', 'Work')}</span>
            </h2>

            <div
              className="px-2.5 py-1 text-xs font-mono font-bold tracking-widest uppercase border"
              style={{
                backgroundColor: 'rgba(7,80,86,0.35)',
                borderColor: '#268B95',
                color: '#E4EEF0',
                fontFamily: 'JetBrains Mono, monospace',
                borderRadius: '2px',
              }}
            >
              {RAW_PROJECTS.length} {t('FICHAS', 'PROJECTS')}
            </div>
          </div>

          {/* Vertical Stacking Deck on Mobile: Starts right below header with safe gap for tabs */}
          <div className="relative flex flex-col w-full pt-4">
            {RAW_PROJECTS.map((item, index) => {
              const isLastReal = index === RAW_PROJECTS.length - 1
              // Staggered sticky top below header with full clearance for all tabs
              const stickyTop = 175 + index * 7
              const tabLeft = 12 + index * 34

              return (
                <div
                  id={`mobile-card-${item.id}`}
                  key={item.id}
                  className="sticky w-full"
                  style={{
                    top: `${stickyTop}px`,
                    zIndex: 10 + index,
                    marginBottom: '120px',
                  }}
                >
                  {/* Subtle Protruding Folder Tab ("Pestaña de Fichero") - Purely visual index, touch disabled */}
                  <div
                    className="absolute -top-[23px] z-20 px-2.5 py-0.5 rounded-t-[4px] border-t border-x flex items-center gap-1.5 pointer-events-none select-none shadow-sm"
                    style={{
                      left: `${tabLeft}px`,
                      backgroundColor: '#16232A',
                      borderColor: '#268B95',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B04]" />
                    <span
                      className="text-[11px] font-bold font-mono tracking-wider"
                      style={{ color: '#E4EEF0' }}
                    >
                      {item.code}
                    </span>
                  </div>

                  {/* Real Project Card */}
                  <div className="w-full rounded-[2px] overflow-hidden">
                    {renderCard({ ...item, isAddSlot: false }, index, false, t)}
                  </div>
                </div>
              )
            })}
          </div>

          {/* "Próximo Proyecto" Slot: OUTSIDE the stacking deck, positioned naturally below Sofia Moya */}
          <div className="relative z-10 mt-8 pt-6 border-t-2 border-dashed border-[#075056]/70 w-full pb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-[#FF5B04] uppercase tracking-widest font-bold">
                // {t('¿TENÉS UN NUEVO PROYECTO?', 'HAVE A PROJECT IN MIND?')}
              </span>
              <span className="text-[10px] font-mono text-[#E4EEF0]/60 uppercase border border-[#075056] px-2 py-0.5 rounded-[2px]">
                08 / 08
              </span>
            </div>
            {renderCard(ALL_CARDS[maxIndex], maxIndex, true, t)}
          </div>
        </div>
      </section>
    </div>
  )
}

function renderCard(
  item: any,
  index: number,
  isShining: boolean,
  t: (es: string, en: string) => string
) {
  if (item.isAddSlot) {
    /* "PRÓXIMO PROYECTO" CARD */
    return (
      <div
        onClick={() =>
          document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="w-full relative p-4 sm:p-5 md:p-6 flex flex-col justify-between items-center text-center transition-all duration-300 group cursor-pointer border-2 border-dashed min-h-[340px] sm:min-h-[365px]"
        style={{
          backgroundColor: isShining ? '#102229' : '#16232A',
          borderColor: isShining ? '#FF5B04' : 'rgba(7,80,86,0.6)',
          borderRadius: '2px',
          boxShadow: isShining
            ? '0 0 55px rgba(255,91,4,0.55), 0 0 25px rgba(255,91,4,0.3), 0 16px 45px rgba(0,0,0,0.5)'
            : '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        <div
          className="self-end px-3 py-1 text-xs font-bold uppercase tracking-wider"
          style={{
            backgroundColor: 'rgba(7,80,86,0.4)',
            color: '#FF5B04',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            borderRadius: '2px',
            border: '1px solid rgba(255,91,4,0.4)',
          }}
        >
          {t('DISPONIBLE', 'AVAILABLE FOR HIRE')}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 my-auto">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              borderColor: '#FF5B04',
              color: '#FF5B04',
              backgroundColor: 'rgba(255,91,4,0.1)',
              boxShadow: isShining
                ? '0 0 30px rgba(255,91,4,0.35)'
                : '0 0 20px rgba(255,91,4,0.15)',
            }}
          >
            <svg className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>

          <div>
            <h3
              className="font-black uppercase text-2xl sm:text-3xl leading-tight mb-2"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
            >
              {t('Próximo Proyecto', 'Your Project Here')}
            </h3>
            <p
              className="text-xs sm:text-sm max-w-sm leading-relaxed"
              style={{ color: 'rgba(228,238,240,0.7)', fontFamily: 'Barlow, sans-serif' }}
            >
              {t(
                '¿Tenés un proceso, idea o sistema que querés desarrollar? Sumemos tu proyecto acá y potenciemos tu negocio.',
                'Ready to automate workflows, build custom software, or scale an idea? Let’s partner to bring it to life.'
              )}
            </p>
          </div>
        </div>

        <div
          className="w-full py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 text-center"
          style={{
            backgroundColor: isShining ? '#FF5B04' : 'rgba(7,80,86,0.5)',
            color: '#E4EEF0',
            border: isShining ? '1px solid #FF5B04' : '1px dashed rgba(255,91,4,0.5)',
            fontFamily: 'Barlow Condensed, sans-serif',
            letterSpacing: '0.12em',
            borderRadius: '2px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#FF5B04'
            e.currentTarget.style.borderColor = '#FF5B04'
          }}
          onMouseLeave={e => {
            if (!isShining) {
              e.currentTarget.style.backgroundColor = 'rgba(7,80,86,0.5)'
              e.currentTarget.style.borderColor = 'rgba(255,91,4,0.5)'
            }
          }}
        >
          {t('Consultar por un proyecto →', 'Start a Project →')}
        </div>
      </div>
    )
  }

  /* REAL PROJECT CARD */
  return (
    <div
      className="w-full relative p-4 sm:p-5 md:p-6 flex flex-col justify-between transition-all duration-300 overflow-hidden min-h-[340px] sm:min-h-[365px]"
      style={{
        backgroundColor: isShining ? '#0c1f27' : '#16232A',
        border: isShining ? '2px solid #FF5B04' : '1px solid rgba(7,80,86,0.7)',
        borderRadius: '2px',
        boxShadow: isShining
          ? '0 0 55px rgba(255,91,4,0.55), 0 0 25px rgba(255,91,4,0.3), 0 18px 45px rgba(0,0,0,0.45)'
          : '0 8px 24px rgba(0,0,0,0.35)',
      }}
    >
      {item.featured && (
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
          {t('Principal', 'Featured')}
        </div>
      )}

      {item.isBeta && (
        <div
          className="absolute top-4 right-4 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider z-10 flex items-center gap-1.5"
          style={{
            backgroundColor: 'rgba(234, 179, 8, 0.15)',
            color: '#FACC15',
            border: '1px solid rgba(250, 204, 21, 0.4)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            borderRadius: '2px',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          BETA
        </div>
      )}

      <div className="flex flex-col gap-3 sm:gap-3.5">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg border border-[#FF5B04]/40 p-1.5 sm:p-2 bg-[#075056]/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(255,91,4,0.15)]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain rounded"
            />
          </div>
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-0.5"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04', fontSize: '10px' }}
            >
              {item.subtitle}
            </div>
            <h3
              className="font-black uppercase text-xl sm:text-2xl md:text-3xl leading-tight"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
            >
              {item.title}
            </h3>
          </div>
        </div>

        <p
          className="leading-relaxed text-xs sm:text-sm font-medium"
          style={{ color: 'rgba(228,238,240,0.85)', fontFamily: 'Barlow, sans-serif' }}
        >
          {item.description}
        </p>

        {item.betaNotice && (
          <div
            className="flex items-center gap-2 px-2.5 py-1.5 rounded text-xs"
            style={{
              backgroundColor: 'rgba(234, 179, 8, 0.08)',
              border: '1px dashed rgba(250, 204, 21, 0.35)',
              color: '#FACC15',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              borderRadius: '2px',
            }}
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{item.betaNotice}</span>
          </div>
        )}

        {/* Tech Stack Tags */}
        {item.tech && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {item.tech.map((tTag: string, tIdx: number) => (
              <span
                key={tIdx}
                className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono border"
                style={{
                  backgroundColor: 'rgba(7,80,86,0.25)',
                  borderColor: 'rgba(7,80,86,0.6)',
                  color: 'rgba(228,238,240,0.85)',
                  fontFamily: 'JetBrains Mono, monospace',
                  borderRadius: '2px',
                }}
              >
                {tTag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3.5 sm:mt-4 flex gap-3 pt-3 border-t" style={{ borderColor: 'rgba(7,80,86,0.4)' }}>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 text-center"
          style={{
            backgroundColor: isShining ? '#FF5B04' : 'rgba(7,80,86,0.5)',
            color: '#E4EEF0',
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.1em',
            borderRadius: '2px',
            border: isShining ? '1px solid #FF5B04' : '1px solid rgba(7,80,86,0.6)',
            boxShadow: isShining ? '0 0 20px rgba(255,91,4,0.4)' : 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#FF5B04'
            e.currentTarget.style.borderColor = '#FF5B04'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255,91,4,0.4)'
          }}
          onMouseLeave={e => {
            if (!isShining) {
              e.currentTarget.style.backgroundColor = 'rgba(7,80,86,0.5)'
              e.currentTarget.style.borderColor = 'rgba(7,80,86,0.6)'
              e.currentTarget.style.boxShadow = 'none'
            }
          }}
        >
          {t('Visitar Sitio →', 'Live Demo →')}
        </a>
      </div>
    </div>
  )
}
