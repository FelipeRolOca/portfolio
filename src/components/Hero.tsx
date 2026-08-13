import logo1 from '@/imports/LOGO_1.png'
import logo3 from '@/imports/LOGO_3.png'
import fondoVertical from '@/imports/FONDO_RECTANGULO_VERTICAL.png'
import { useLang } from '../i18n/LanguageContext'

export function Hero() {
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
