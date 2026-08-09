import { ArrowRight, MessageSquareCode } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Hero() {
  const { t } = useLanguage()

  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-36 sm:pt-48 lg:pt-56 pb-32 lg:pb-44 overflow-hidden"
    >
      {/* Low-Intensity Seamless FRO Pattern Overlay */}
      <div className="fro-bg-pattern" />

      <div className="container-fro relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Main Copy (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#075056]/50 border border-[#075056] mb-8 backdrop-blur-md shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5B04] animate-pulse-glow" />
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#E4EEF0] font-semibold">
                {t.hero.badge}
              </span>
            </div>

            {/* Name / Heading */}
            <h1 className="font-['Barlow_Condensed'] font-black uppercase tracking-tight text-[#E4EEF0] text-5xl sm:text-7xl lg:text-8xl leading-[0.92] mb-8">
              <span className="block text-[#E4EEF0]">{t.hero.nameFirst}</span>
              <span className="block text-[#FF5B04]">{t.hero.nameMiddle}</span>
              <span className="block text-[#E4EEF0]">{t.hero.nameLast}</span>
            </h1>

            {/* Role & Specialty (Spacious Pill Badge with Generous Padding) */}
            <div className="inline-flex items-center px-8 py-3 sm:px-10 sm:py-3.5 rounded-full bg-[#075056]/70 border border-[#FF5B04]/50 mb-10 backdrop-blur-md shadow-[0_0_25px_rgba(7,80,86,0.35)]">
              <p className="font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold text-[#E4EEF0] uppercase tracking-wider leading-none">
                {t.hero.specialty}
              </p>
            </div>

            {/* Value Proposition */}
            <p className="font-['Barlow'] text-lg sm:text-xl text-[#E4EEF0]/85 max-w-2xl leading-relaxed mb-12">
              {t.hero.valueProp}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full sm:w-auto">
              <button
                onClick={() => handleScroll('#projects')}
                className="btn-primary"
              >
                <span>{t.hero.projectsBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleScroll('#contact')}
                className="btn-secondary"
              >
                <MessageSquareCode className="w-5 h-5 text-[#FF5B04]" />
                <span>{t.hero.contactBtn}</span>
              </button>
            </div>
          </div>

          {/* Circular Profile Visual (Col 8-12) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Floating Rounded 3D Badges */}
              <div className="absolute -top-6 -left-6 w-16 h-16 sm:w-20 sm:h-20 z-20 pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
                <img
                  src="/FRO/ELEMENTO_GRAFICO_1.png"
                  alt="Isometric Cube"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 sm:w-20 sm:h-20 z-20 pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
                <img
                  src="/FRO/ELEMENTO_GRAFICO_2.png"
                  alt="Isometric Cube"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>

              {/* Circular Avatar with Glowing Ring */}
              <div className="avatar-circle-wrapper w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="avatar-circle-inner">
                  <img
                    src="/Foto Perfil definitiva.png"
                    alt="Felipe Roldán Ocampo"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
