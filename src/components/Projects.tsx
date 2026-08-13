import { useState, useEffect } from 'react'
import fondoCuadrado from '@/imports/FONDO_CUADRADO.png'
import { useLang } from '../i18n/LanguageContext'

export function Projects() {
  const { t } = useLang()
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  const RAW_PROJECTS = [
    {
      id: 'jj-asist',
      title: 'JJAsist',
      subtitle: t('Plataforma SaaS de Asistencia', 'SaaS Attendance Platform'),
      description: t(
        'Solución integral para registro de asistencia laboral con fichaje por QR dinámico, validación de ubicación geográfica GPS y sincronización de planillas en Google Sheets.',
        'All-in-one employee attendance SaaS featuring dynamic QR check-in, GPS location validation, and automatic Google Sheets sync.'
      ),
      tech: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
      url: 'https://jj-asist.vercel.app/',
      image: '/jj-asist-logo.png',
      featured: true,
    },
    {
      id: 'jj-servicios',
      title: 'JJ Servicios Empresariales',
      subtitle: t('Sitio Corporativo RRHH', 'HR Corporate Site'),
      description: t(
        'Plataforma institucional para consultora de Recursos Humanos. Presentación clara de servicios, maquetación responsive moderna y optimización SEO.',
        'Institutional platform for HR consulting services. Clean layout, modern responsive design, and search engine optimization.'
      ),
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'SEO'],
      url: 'https://jjserviciosempresarialesrrhh.com/',
      image: '/Rehace_el_logo_202604262015.jpeg',
      featured: false,
    },
    {
      id: 'jj-hire',
      title: 'JJHire',
      subtitle: t('Portal de Postulantes', 'Applicants Portal'),
      description: t(
        'Portal de empleo para candidatos donde pueden cargar su CV, explorar ofertas laborales vigentes y realizar postulaciones en línea.',
        'Candidate job portal allowing applicants to upload CVs, explore open job listings, and submit online applications.'
      ),
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
      url: 'https://jj-hire.vercel.app/',
      image: '/jj-hire-busca-placeholder.png',
      featured: false,
    },
    {
      id: 'jj-busca',
      title: 'JJBusca',
      subtitle: t('Portal de Reclutadores', 'Recruiters Portal'),
      description: t(
        'Sistema administrativo para selectores y reclutadores que facilita la búsqueda de perfiles, filtrado de currículums y gestión de búsquedas.',
        'Administrative dashboard for recruiters enabling profile searches, CV filtering, and candidate pipeline tracking.'
      ),
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel', 'Admin Dashboard'],
      url: 'https://jj-busca.vercel.app/',
      image: '/jj-hire-busca-placeholder.png',
      featured: false,
    },
    {
      id: 'paper-pops',
      title: 'Paper Pops',
      subtitle: t('Proyecto Experimental UI', 'Experimental UI Project'),
      description: t(
        'Aplicación web interactiva construida con React, Vite y Framer Motion para explorar animaciones de alta fidelidad e interfaces dinámicas.',
        'Interactive web app built with React, Vite, and Framer Motion exploring high-fidelity animations and dynamic UI components.'
      ),
      tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      url: 'https://paper-pops.vercel.app/',
      image: '/paper-pops-preview.jpeg',
      featured: false,
    },
  ]

  const ITEMS_PER_PAGE = 4
  const totalReal = RAW_PROJECTS.length
  const totalPages = Math.ceil(totalReal / ITEMS_PER_PAGE)
  const totalSlotsNeeded = totalPages * ITEMS_PER_PAGE
  const addSlotsCount = totalSlotsNeeded - totalReal

  type SlotItem =
    | ({ isAddSlot?: false } & (typeof RAW_PROJECTS)[number])
    | { isAddSlot: true; id: string }

  const ALL_ITEMS: SlotItem[] = [
    ...RAW_PROJECTS.map(p => ({ ...p, isAddSlot: false as const })),
    ...Array.from({ length: addSlotsCount }, (_, idx) => ({
      isAddSlot: true as const,
      id: `add-slot-${idx}`,
    })),
  ]

  // Auto-slide every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages)
    }, 30000)
    return () => clearInterval(timer)
  }, [totalPages])

  const handlePrev = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
  }

  const handleNext = () => {
    setCurrentPage(prev => (prev + 1) % totalPages)
  }

  const currentItems = ALL_ITEMS.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  )

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Title & Page Indicator */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
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

          {/* Desktop Page Indicator */}
          <div className="hidden md:flex items-center gap-4">
            <div
              className="px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded border"
              style={{
                backgroundColor: 'rgba(7,80,86,0.3)',
                borderColor: '#268B95',
                color: '#E4EEF0',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              0{currentPage + 1} / 0{totalPages}
            </div>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: currentPage === idx ? '#FF5B04' : 'rgba(7,80,86,0.6)',
                    transform: currentPage === idx ? 'scale(1.2)' : 'scale(1)',
                  }}
                  title={`Página ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP CAROUSEL WRAPPER WITH SIDE NAV ARROWS */}
        <div className="hidden md:flex relative items-center gap-2 sm:gap-4">
          <button
            onClick={handlePrev}
            className="z-20 p-2.5 sm:p-4 rounded transition-all duration-300 cursor-pointer flex items-center justify-center border flex-shrink-0"
            style={{
              backgroundColor: 'rgba(22,35,42,0.9)',
              borderColor: '#075056',
              color: '#E4EEF0',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#FF5B04'
              e.currentTarget.style.color = '#FF5B04'
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255,91,4,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#075056'
              e.currentTarget.style.color = '#E4EEF0'
              e.currentTarget.style.boxShadow = 'none'
            }}
            title={t('Página anterior', 'Previous page')}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* GRID OF 4 CARDS (2x2 Grid) */}
          <div
            className="flex-1 grid grid-cols-2 gap-px transition-all duration-500"
            style={{
              backgroundColor: 'rgba(7,80,86,0.3)',
              border: '1px solid rgba(7,80,86,0.5)',
            }}
          >
            {currentItems.map((item, i) => {
              if (item.isAddSlot) {
                return (
                  <div
                    key={item.id}
                    onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                    className="relative p-6 sm:p-8 flex flex-col justify-between items-center text-center transition-all duration-300 group cursor-pointer border-2 border-dashed min-h-[340px]"
                    style={{
                      backgroundColor: 'rgba(22,35,42,0.4)',
                      borderColor: 'rgba(7,80,86,0.6)',
                      borderRadius: '2px',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#FF5B04'
                      e.currentTarget.style.backgroundColor = 'rgba(7,80,86,0.2)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(7,80,86,0.6)'
                      e.currentTarget.style.backgroundColor = 'rgba(22,35,42,0.4)'
                    }}
                  >
                    <div
                      className="self-end px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: 'rgba(7,80,86,0.4)',
                        color: '#FF5B04',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '9px',
                        borderRadius: '2px',
                        border: '1px solid rgba(255,91,4,0.3)',
                      }}
                    >
                      {t('DISPONIBLE', 'AVAILABLE SLOT')}
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 my-auto">
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          borderColor: '#FF5B04',
                          color: '#FF5B04',
                          backgroundColor: 'rgba(255,91,4,0.08)',
                          boxShadow: '0 0 20px rgba(255,91,4,0.15)',
                        }}
                      >
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>

                      <div>
                        <h3
                          className="font-black uppercase text-xl sm:text-2xl leading-tight mb-2"
                          style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
                        >
                          {t('Próximo Proyecto', 'Next Project')}
                        </h3>
                        <p
                          className="text-xs sm:text-sm max-w-xs leading-relaxed"
                          style={{ color: 'rgba(228,238,240,0.6)', fontFamily: 'Barlow, sans-serif' }}
                        >
                          {t(
                            '¿Tenés un proceso, idea o sistema que querés desarrollar? Sumemos tu proyecto acá.',
                            'Have a business process, idea, or system to digitize? Let’s feature your project here.'
                          )}
                        </p>
                      </div>
                    </div>

                    <div
                      className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-200 text-center"
                      style={{
                        backgroundColor: 'rgba(7,80,86,0.4)',
                        color: '#E4EEF0',
                        border: '1px dashed rgba(255,91,4,0.5)',
                        fontFamily: 'Barlow Condensed, sans-serif',
                        letterSpacing: '0.1em',
                        borderRadius: '2px',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#FF5B04'
                        e.currentTarget.style.borderColor = '#FF5B04'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(7,80,86,0.4)'
                        e.currentTarget.style.borderColor = 'rgba(255,91,4,0.5)'
                      }}
                    >
                      {t('Consultar por un proyecto →', 'Inquire a project →')}
                    </div>
                  </div>
                )
              }

              const proj = item
              const isHovered = activeProject === i
              const isAnyHovered = activeProject !== null
              const isDimmed = isAnyHovered && !isHovered

              return (
                <div
                  key={proj.id}
                  className={`relative p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-pointer min-h-[340px] ${isHovered
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
                      className="leading-relaxed text-sm font-medium"
                      style={{ color: 'rgba(228,238,240,0.85)', fontFamily: 'Barlow, sans-serif' }}
                    >
                      {proj.description}
                    </p>
                  </div>

                  <div className="mt-6 flex gap-3 pt-4 border-t" style={{ borderColor: 'rgba(7,80,86,0.4)' }}>
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
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={handleNext}
            className="z-20 p-2.5 sm:p-4 rounded transition-all duration-300 cursor-pointer flex items-center justify-center border flex-shrink-0"
            style={{
              backgroundColor: 'rgba(22,35,42,0.9)',
              borderColor: '#075056',
              color: '#E4EEF0',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#FF5B04'
              e.currentTarget.style.color = '#FF5B04'
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255,91,4,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#075056'
              e.currentTarget.style.color = '#E4EEF0'
              e.currentTarget.style.boxShadow = 'none'
            }}
            title={t('Página siguiente', 'Next page')}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* MOBILE STACKED LIST */}
        <div className="flex flex-col gap-8 md:hidden w-full">
          {RAW_PROJECTS.map(proj => (
            <div
              key={proj.id}
              className="relative w-full p-6 sm:p-7 flex flex-col justify-between rounded border border-[#075056]/60 bg-[#16232A] shadow-[0_6px_25px_rgba(0,0,0,0.35)] transition-all duration-200"
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
                  {t('Principal', 'Featured')}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3.5 pr-20">
                  <div className="w-11 h-11 rounded border border-[#FF5B04]/30 p-1.5 bg-[#075056]/20 flex items-center justify-center flex-shrink-0">
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
                      className="font-black uppercase text-xl leading-tight"
                      style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
                    >
                      {proj.title}
                    </h3>
                  </div>
                </div>

                <p
                  className="leading-relaxed text-sm font-medium"
                  style={{ color: 'rgba(228,238,240,0.85)', fontFamily: 'Barlow, sans-serif' }}
                >
                  {proj.description}
                </p>
              </div>

              <div className="mt-6 flex gap-3 pt-4 border-t" style={{ borderColor: 'rgba(7,80,86,0.4)' }}>
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-all duration-200"
                  style={{
                    backgroundColor: '#FF5B04',
                    color: '#E4EEF0',
                    fontFamily: 'Barlow Condensed, sans-serif',
                    borderRadius: '2px',
                    letterSpacing: '0.08em',
                  }}
                >
                  {t('Visitar Sitio →', 'Visit Site →')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
