import { useLang } from '../i18n/LanguageContext'

export function Experience() {
  const { t } = useLang()

  const EXPERIENCE = [
    {
      period: t('2026 — Presente', '2026 — Present'),
      role: t('Desarrollador Full Stack', 'Full Stack Developer'),
      company: t('JJAsist (Proyecto Freelance / SaaS)', 'JJAsist (Freelance SaaS Project)'),
      description: t(
        'Desarrollé una plataforma integral SaaS para el control de asistencia y registro de jornadas laborales. Implementa identificación mediante QR dinámico, validación de ubicación geográfica por GPS y un panel administrativo para gestión de empleados, sucursales y sincronización de reportes.',
        'Developed a comprehensive SaaS platform for employee attendance and shift tracking. Features dynamic QR identification, GPS geolocation validation, and an administrative dashboard for managing staff, branch locations, and automated reporting sync.'
      ),
      tags: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
    },
    {
      period: t('2025 — Presente', '2025 — Present'),
      role: t('Desarrollador Web Freelance', 'Freelance Web Developer'),
      company: 'JJ Servicios Empresariales',
      description: t(
        'Diseño y desarrollo de la infraestructura web corporativa para una consultora de Recursos Humanos. Optimización de SEO, maquetación adaptativa responsive y estructuración clara del catálogo de servicios para la captación de clientes.',
        'Designed and built the corporate web infrastructure for an HR consulting firm. Optimized search engine visibility (SEO), implemented fully responsive layouts, and structured service offerings to drive corporate client inquiries.'
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
                    style={{ color: 'rgba(228,238,240,0.85)', fontFamily: 'Barlow, sans-serif', fontSize: '0.95rem' }}
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
