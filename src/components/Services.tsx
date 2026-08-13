import { useLang } from '../i18n/LanguageContext'

export function Services() {
  const { t } = useLang()

  const methodologySteps = [
    {
      step: '01',
      title: t('Análisis del Proceso', 'Process Analysis'),
      desc: t('Revisión detallada de los requerimientos de la organización, identificando cuellos de botella y definiendo la arquitectura ideal.', 'In-depth review of business requirements, pinpointing operational bottlenecks, and designing the ideal software architecture.'),
    },
    {
      step: '02',
      title: t('Desarrollo e Integración', 'Development & Integration'),
      desc: t('Construcción iterativa de la solución con código limpio, bases de datos optimizadas e integración con servicios existentes.', 'Iterative software build with scalable architecture, optimized databases, and seamless third-party service integration.'),
    },
    {
      step: '03',
      title: t('Puesta en Marcha y Soporte', 'Deployment & Support'),
      desc: t('Despliegue en producción, inducción para los usuarios y acompañamiento continuo para asegurar un funcionamiento óptimo.', 'Production rollout, user onboarding, and ongoing maintenance to guarantee peak system performance.'),
    },
  ]

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

        {/* Metodología de Trabajo en 3 Pasos (recuperada de old/) */}
        <div
          className="p-8 sm:p-12"
          style={{
            backgroundColor: 'rgba(7,80,86,0.25)',
            border: '1px solid #075056',
            borderRadius: '2px',
          }}
        >
          <div className="mb-8">
            <span
              className="text-xs uppercase tracking-widest block mb-1 font-bold"
              style={{ color: '#FF5B04', fontFamily: 'JetBrains Mono, monospace' }}
            >
              {t('Proceso Estructurado', 'Structured Process')}
            </span>
            <h3
              className="font-black uppercase text-2xl sm:text-4xl"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
            >
              {t('Metodología de Trabajo', 'Work Methodology')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {methodologySteps.map((m, idx) => (
              <div
                key={idx}
                className="p-6 flex flex-col justify-between transition-all duration-200"
                style={{
                  backgroundColor: '#16232A',
                  border: '1px solid rgba(7,80,86,0.5)',
                  borderRadius: '2px',
                }}
              >
                <div>
                  <span
                    className="font-black text-4xl sm:text-5xl block mb-4"
                    style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#FF5B04' }}
                  >
                    {m.step}
                  </span>
                  <h4
                    className="font-bold text-lg sm:text-xl uppercase mb-2"
                    style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0' }}
                  >
                    {m.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed font-medium"
                    style={{ color: 'rgba(228,238,240,0.8)', fontFamily: 'Barlow, sans-serif' }}
                  >
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
