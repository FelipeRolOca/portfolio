import logo1 from '@/imports/LOGO_1.png'
import fondoLargo from '@/imports/FONDO_LARGO.png'
import elem2 from '@/imports/ELEMENTO_GRAFICO_2.png'
import elem3 from '@/imports/ELEMENTO_GRAFICO_3.png'
import { useLang } from '../i18n/LanguageContext'

export function About() {
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
              'Como estudiante avanzado de Ingeniería Informática y desarrollador, me enfoco en entender a fondo el flujo operativo de cada cliente para diseñar software útil, seguro y fácil de mantener.',
              'As an advanced Software Engineering student and developer, I focus on deeply understanding each client’s operational workflow to build useful, secure, and maintainable software.'
            )}
          </p>
          <p className="leading-relaxed font-medium" style={{ color: '#F0F6F7', fontFamily: 'Barlow, sans-serif', fontSize: '1.05rem' }}>
            {t(
              'Mi objetivo es conectar los procesos del negocio con tecnología moderna: centralizando bases de datos, eliminando la carga de trabajo repetitiva y permitiendo tomar decisiones basadas en información clara.',
              'My objective is to bridge business workflows with modern technology: centralizing databases, eliminating repetitive manual workloads, and enabling data-driven decisions.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: elem2, label: t('Educación', 'Education'), value: t('Ing. Informática', 'Software Eng.'), unit: t('Estudiante', 'Student'), color: '#16232A' },
            { icon: elem2, label: t('Edad', 'Age'), value: t('21 Años', '21 Years Old'), unit: '2004', color: '#16232A' },
            { icon: elem3, label: t('Inglés', 'English'), value: t('Nivel B2', 'B2 Upper-Int.'), unit: 'B2', color: '#FF5B04' },
            { icon: elem2, label: t('Ubicación', 'Location'), value: 'Argentina', unit: 'San Pedro, BA', color: '#16232A' },
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
