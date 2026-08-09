import { useState, useEffect, useRef } from 'react'
import logo2 from '@/imports/LOGO_2.png'
import logo3 from '@/imports/LOGO_3.png'
import fondoCuadrado from '@/imports/FONDO_CUADRADO.png'
import fondoLargo from '@/imports/FONDO_LARGO.png'
import elem1 from '@/imports/ELEMENTO_GRAFICO_1.png'
import elem2 from '@/imports/ELEMENTO_GRAFICO_2.png'
import elem3 from '@/imports/ELEMENTO_GRAFICO_3.png'

const NAV_ITEMS = ['Sobre Mí', 'Habilidades', 'Proyectos', 'Contacto']
const NAV_IDS = ['sobre', 'habilidades', 'proyectos', 'contacto']

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
    setActive(id)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(22,35,42,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(7,80,86,0.4)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <img src={logo2} alt="FRO logo" className="h-10 w-10 object-contain" />
          <span
            className="hidden sm:block text-sm font-mono tracking-widest uppercase"
            style={{ color: '#E4EEF0', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.2em' }}
          >
            Felipe Roldan
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              onClick={() => scrollTo(NAV_IDS[i])}
              className="text-sm font-medium uppercase tracking-wider transition-colors duration-200"
              style={{
                fontFamily: 'Barlow, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: active === NAV_IDS[i] ? '#FF5B04' : '#E4EEF0',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FF5B04')}
              onMouseLeave={e => (e.currentTarget.style.color = active === NAV_IDS[i] ? '#FF5B04' : '#E4EEF0')}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contacto')}
            className="px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200"
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
            Hablemos
          </button>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block h-0.5 w-6 transition-all duration-200"
              style={{ backgroundColor: '#E4EEF0' }}
            />
          ))}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(22,35,42,0.98)' }}
        >
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              onClick={() => scrollTo(NAV_IDS[i])}
              className="text-left text-base font-semibold uppercase tracking-wider py-2 border-b"
              style={{ color: '#E4EEF0', borderColor: 'rgba(7,80,86,0.3)', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.1em' }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#16232A' }}
    >
      {/* Cube pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${fondoCuadrado})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '280px',
          opacity: 0.07,
        }}
      />

      {/* Accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: '#FF5B04' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-mono uppercase tracking-widest"
            style={{ backgroundColor: 'rgba(7,80,86,0.3)', color: '#FF5B04', border: '1px solid rgba(255,91,4,0.3)', borderRadius: '2px', fontFamily: 'JetBrains Mono, monospace' }}
          >
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#FF5B04' }} />
            Disponible para proyectos
          </div>

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
            <span style={{ color: '#075056', WebkitTextStroke: '2px #E4EEF0' }}>Roldan</span>
            <br />
            Ocampo
          </h1>

          <p
            className="mb-4 text-lg font-semibold uppercase tracking-widest"
            style={{ color: '#FF5B04', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.25em' }}
          >
            Full Stack Developer · Automatización
          </p>

          <p
            className="mb-10 max-w-lg leading-relaxed"
            style={{ color: 'rgba(228,238,240,0.75)', fontFamily: 'Barlow, sans-serif', fontSize: '1.05rem' }}
          >
            Desarrollo sistemas que automatizan procesos críticos, reducen errores y escalan operaciones.
            Especializado en arquitecturas modernas y flujos de trabajo inteligentes.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 font-bold uppercase tracking-wider transition-all duration-200"
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
              Ver Proyectos
            </button>
            <button
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 font-bold uppercase tracking-wider transition-all duration-200"
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
              Hablemos
            </button>
          </div>

          <div className="mt-14 flex gap-8">
            {[
              { label: 'Años exp.', value: '3+' },
              { label: 'Proyectos', value: '12+' },
              { label: 'Automatizaciones', value: '30+' },
            ].map(stat => (
              <div key={stat.label}>
                <div
                  className="text-4xl font-black uppercase leading-none"
                  style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs uppercase tracking-widest mt-1"
                  style={{ color: '#075056', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center relative">
          <div
            className="absolute inset-0 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #075056 0%, transparent 70%)' }}
          />
          <img
            src={logo3}
            alt="FRO orange logo"
            className="w-72 h-72 object-contain relative z-10"
            style={{ filter: 'drop-shadow(0 0 60px rgba(255,91,4,0.25))' }}
          />
          <div
            className="absolute -right-6 top-1/2 -translate-y-1/2 w-px h-48"
            style={{ backgroundColor: '#075056' }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div
          className="text-xs uppercase tracking-widest"
          style={{ fontFamily: 'JetBrains Mono, monospace', color: '#E4EEF0', fontSize: '10px' }}
        >
          scroll
        </div>
        <div className="w-px h-12 animate-pulse" style={{ backgroundColor: '#FF5B04' }} />
      </div>
    </section>
  )
}

function About() {
  return (
    <section
      id="sobre"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#075056' }}
    >
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5"
        style={{
          backgroundImage: `url(${fondoLargo})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '140px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div
            className="text-xs font-mono uppercase tracking-widest mb-4"
            style={{ color: 'rgba(228,238,240,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            01 — Sobre Mí
          </div>
          <h2
            className="uppercase leading-none mb-8"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#E4EEF0',
            }}
          >
            Construyo el
            <br />
            <span style={{ color: '#16232A' }}>futuro</span> digital
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: 'rgba(228,238,240,0.8)', fontFamily: 'Barlow, sans-serif', fontSize: '1.05rem' }}>
            Soy un desarrollador Full Stack con 20 años y pasión por la automatización de procesos.
            Creo soluciones que transforman flujos manuales en sistemas inteligentes y escalables.
          </p>
          <p className="leading-relaxed" style={{ color: 'rgba(228,238,240,0.8)', fontFamily: 'Barlow, sans-serif', fontSize: '1.05rem' }}>
            Mi enfoque combina arquitectura sólida con experiencia de usuario cuidada,
            entregando productos que resuelven problemas reales con elegancia técnica.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: elem2, label: 'Edad', value: '20', unit: 'años', color: '#16232A' },
            { icon: elem1, label: 'Ubicación', value: 'Colombia', unit: 'LATAM', color: '#16232A' },
            { icon: elem3, label: 'Especialidad', value: 'Automation', unit: 'Full Stack', color: '#FF5B04' },
            { icon: elem2, label: 'Disponibilidad', value: 'Remoto', unit: 'Full-time', color: '#16232A' },
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

const SKILLS = [
  {
    category: 'Full Stack',
    icon: '⬡',
    items: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'FastAPI'],
  },
  {
    category: 'Automatización',
    icon: '⚡',
    items: ['n8n', 'Make (Integromat)', 'Zapier', 'Puppeteer', 'Selenium', 'Playwright'],
  },
  {
    category: 'Bases de Datos',
    icon: '◈',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase'],
  },
  {
    category: 'Herramientas & DevOps',
    icon: '◎',
    items: ['Docker', 'Git', 'GitHub Actions', 'Vercel', 'Linux', 'REST APIs'],
  },
]

function Skills() {
  return (
    <section
      id="habilidades"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#16232A' }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${fondoCuadrado})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          opacity: 0.05,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <div
              className="text-xs font-mono uppercase tracking-widest mb-4"
              style={{ color: 'rgba(228,238,240,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
            >
              02 — Habilidades
            </div>
            <h2
              className="uppercase leading-none"
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#E4EEF0',
              }}
            >
              Stack &{' '}
              <span style={{ color: '#FF5B04' }}>Herramientas</span>
            </h2>
          </div>
          <div
            className="text-sm max-w-xs"
            style={{ color: 'rgba(228,238,240,0.5)', fontFamily: 'Barlow, sans-serif' }}
          >
            Tecnologías que utilizo para construir productos robustos y automatizaciones eficientes.
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

const EXPERIENCE = [
  {
    period: '2024 — Presente',
    role: 'Full Stack Developer & Automation Lead',
    company: 'Freelance',
    description: 'Desarrollo de plataformas web y sistemas de automatización para empresas medianas. Integración de APIs, bots de WhatsApp, y flujos n8n para optimizar operaciones.',
    tags: ['React', 'Node.js', 'n8n', 'WhatsApp API'],
  },
  {
    period: '2023 — 2024',
    role: 'Desarrollador Web Junior',
    company: 'Agencia Digital LATAM',
    description: 'Construcción de landing pages, e-commerce y dashboards administrativos. Implementación de integraciones con pasarelas de pago y CRMs.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
  },
  {
    period: '2022 — 2023',
    role: 'Automatización & Scripts',
    company: 'Proyectos Independientes',
    description: 'Creación de scrapers, bots de automatización y herramientas de productividad para clientes en sectores de retail y servicios.',
    tags: ['Python', 'Selenium', 'Zapier', 'Google Sheets API'],
  },
]

function Experience() {
  return (
    <section
      className="relative py-24"
      style={{ backgroundColor: '#075056' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="text-xs font-mono uppercase tracking-widest mb-4"
          style={{ color: 'rgba(228,238,240,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
        >
          03 — Experiencia
        </div>
        <h2
          className="uppercase leading-none mb-16"
          style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            color: '#E4EEF0',
          }}
        >
          Trayectoria
          <br />
          <span style={{ color: '#16232A' }}>Profesional</span>
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

const PROJECTS = [
  {
    title: 'JJAsist',
    subtitle: 'Plataforma de Asistencia Inteligente',
    description: 'Sistema de gestión y automatización de asistencia con integración a WhatsApp, reportes automáticos y dashboard en tiempo real.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'WhatsApp API', 'n8n'],
    url: '#',
    featured: true,
  },
  {
    title: 'JJ Servicios',
    subtitle: 'Portal de Servicios Empresariales',
    description: 'Plataforma web para gestión de servicios con módulo de cotizaciones automatizadas, seguimiento de órdenes y panel administrativo.',
    tech: ['React', 'FastAPI', 'MySQL', 'Docker', 'Stripe'],
    url: '#',
    featured: false,
  },
  {
    title: 'AutoFlow Engine',
    subtitle: 'Motor de Automatización de Procesos',
    description: 'Framework propio para orquestar flujos de trabajo complejos con webhooks, condiciones dinámicas y logging centralizado.',
    tech: ['Python', 'Redis', 'Playwright', 'PostgreSQL'],
    url: '#',
    featured: false,
  },
  {
    title: 'DataPulse Dashboard',
    subtitle: 'Analytics en Tiempo Real',
    description: 'Dashboard de analíticas con actualización en tiempo real, conexión a múltiples fuentes de datos y alertas configurables.',
    tech: ['React', 'WebSockets', 'Python', 'MongoDB', 'Recharts'],
    url: '#',
    featured: false,
  },
]

function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <section
      id="proyectos"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#16232A' }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${fondoCuadrado})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '240px',
          opacity: 0.04,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <div
              className="text-xs font-mono uppercase tracking-widest mb-4"
              style={{ color: 'rgba(228,238,240,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
            >
              04 — Proyectos
            </div>
            <h2
              className="uppercase leading-none"
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#E4EEF0',
              }}
            >
              Trabajo
              <br />
              <span style={{ color: '#FF5B04' }}>Destacado</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ backgroundColor: 'rgba(7,80,86,0.15)' }}>
          {PROJECTS.map((proj, i) => (
            <div
              key={i}
              className="relative p-8 flex flex-col gap-6 cursor-pointer transition-all duration-300 group"
              style={{
                backgroundColor: activeProject === i ? '#0a1e25' : '#16232A',
              }}
              onMouseEnter={() => setActiveProject(i)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {proj.featured && (
                <div
                  className="absolute top-6 right-6 px-2 py-0.5 text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: '#FF5B04',
                    color: '#E4EEF0',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '9px',
                    borderRadius: '2px',
                  }}
                >
                  Destacado
                </div>
              )}

              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-2"
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

              <p
                className="leading-relaxed flex-1"
                style={{ color: 'rgba(228,238,240,0.7)', fontFamily: 'Barlow, sans-serif', fontSize: '0.95rem' }}
              >
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {proj.tech.map(t => (
                  <span
                    key={t}
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
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-2 border-t" style={{ borderColor: 'rgba(7,80,86,0.3)' }}>
                <button
                  className="flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200"
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
                  Visitar Sitio
                </button>
                <button
                  className="flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#E4EEF0',
                    border: '2px solid rgba(7,80,86,0.6)',
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    borderRadius: '2px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#E4EEF0')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(7,80,86,0.6)')}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
      <div
        className="absolute right-0 top-0 h-full w-1/2 opacity-5"
        style={{
          backgroundImage: `url(${fondoLargo})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div
            className="text-xs font-mono uppercase tracking-widest mb-4"
            style={{ color: 'rgba(228,238,240,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            05 — Contacto
          </div>
          <h2
            className="uppercase leading-none mb-8"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#E4EEF0',
            }}
          >
            Trabajemos
            <br />
            <span style={{ color: '#16232A' }}>Juntos</span>
          </h2>
          <p
            className="leading-relaxed mb-12"
            style={{ color: 'rgba(228,238,240,0.75)', fontFamily: 'Barlow, sans-serif', fontSize: '1.05rem' }}
          >
            ¿Tienes un proyecto en mente? Cuéntame qué necesitas y encontremos la mejor solución.
            Respondo en menos de 24 horas.
          </p>

          <div className="flex flex-col gap-6">
            {[
              { label: 'Email', value: 'feliperoldan@dev.co', icon: '✉' },
              { label: 'Teléfono', value: '+57 300 000 0000', icon: '☎' },
              { label: 'Ubicación', value: 'Colombia — Remoto', icon: '◈' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: 'rgba(22,35,42,0.4)', color: '#FF5B04', borderRadius: '2px' }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    className="text-xs uppercase tracking-widest"
                    style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.5)', fontSize: '10px' }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="font-semibold"
                    style={{ color: '#E4EEF0', fontFamily: 'Barlow, sans-serif' }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.6)', fontSize: '10px' }}
              >
                Nombre
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Tu nombre"
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
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="correo@ejemplo.com"
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
              Asunto
            </label>
            <input
              type="text"
              required
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              placeholder="¿En qué te puedo ayudar?"
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
              Mensaje
            </label>
            <textarea
              required
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Cuéntame sobre tu proyecto..."
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
            {sent ? '✓ Mensaje Enviado' : 'Enviar Mensaje'}
          </button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="py-10 border-t"
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
              Felipe Roldan Ocampo
            </div>
            <div
              className="text-xs uppercase tracking-widest mt-0.5"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.4)', fontSize: '9px' }}
            >
              Full Stack · Automation
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              onClick={() => document.getElementById(NAV_IDS[i])?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs uppercase tracking-wider transition-colors duration-200"
              style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, color: 'rgba(228,238,240,0.4)', letterSpacing: '0.1em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FF5B04')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(228,238,240,0.4)')}
            >
              {item}
            </button>
          ))}
        </div>

        <div
          className="text-xs"
          style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.3)', fontSize: '10px' }}
        >
          © 2025 FRO — Todos los derechos reservados
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div style={{ fontFamily: 'Barlow, sans-serif' }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}
