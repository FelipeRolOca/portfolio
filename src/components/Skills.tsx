import fondoHorizontal from '@/imports/FONDO_RECTANGULO_HORIZONTAL.png'
import { useLang } from '../i18n/LanguageContext'

export function Skills() {
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
      items: ['Google Apps Script', 'REST APIs', 'QR Dinámico', 'Validación GPS', 'Webhooks', 'Node.js'],
      note: t('Automatización de reportes, flujos administrativos, sincronización de servicios y validaciones de campo.', 'Automated reporting, admin workflows, third-party service sync, and field validations.'),
    },
    {
      category: t('Ingeniería y Despliegue', 'Engineering & Deployment'),
      icon: '◎',
      items: ['Git / GitHub', 'Vercel', 'Algoritmos & Estructuras', 'Diseño de Sistemas', 'Java', 'Python'],
      note: t('Fundamentos sólidos de la carrera de Ingeniería Informática y herramientas de entrega continua.', 'Core engineering fundamentals, systems design, and daily workflow toolchain.'),
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
            className="text-sm sm:text-base max-w-md font-semibold leading-relaxed"
            style={{ color: '#E4EEF0', fontFamily: 'Barlow, sans-serif' }}
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
                    className="flex items-center gap-3 text-sm font-medium"
                    style={{ color: 'rgba(228,238,240,0.75)', fontFamily: 'Barlow, sans-serif' }}
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
