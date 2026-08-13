import { useLang } from '../i18n/LanguageContext'

export function Services() {
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

        {/* Casos Reales y Digitalización de Procesos */}
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
            className="text-sm sm:text-base mb-6 font-semibold"
            style={{ color: '#FF5B04', fontFamily: 'JetBrains Mono, monospace' }}
          >
            {t('Puedo ayudarte a digitalizar procesos y acelerar tareas como:', 'I can help you digitize processes and speed up workflows such as:')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              t('Carga y organización de información', 'Data entry and information management'),
              t('Generación automática de reportes', 'Automated PDF/Sheet report generation'),
              t('Gestión de empleados o clientes', 'Employee or client management portals'),
              t('Control de asistencia con GPS y QR dinámico', 'Attendance tracking with GPS & dynamic QR'),
              t('Formularios y recepción de datos', 'Data collection and web form intake'),
              t('Procesos que requieren validaciones a medida', 'Processes requiring custom business validations'),
              t('Integración entre distintas herramientas', 'Integrations between third-party tools'),
              t('Paneles para visualizar métricas clave', 'Dashboards for key business metrics'),
              t('Sitios web y plataformas corporativas', 'Corporate websites & web platforms'),
            ].map((prob, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 text-sm font-semibold rounded transition-colors"
                style={{
                  backgroundColor: '#16232A',
                  color: '#E4EEF0',
                  border: '1px solid rgba(7,80,86,0.5)',
                  fontFamily: 'Barlow, sans-serif',
                }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#FF5B04' }} />
                {prob}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
