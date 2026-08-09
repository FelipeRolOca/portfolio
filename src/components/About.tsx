import { GraduationCap, MapPin, Languages, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function About() {
  const { t } = useLanguage()

  const quickFacts = [
    {
      label: t.quickFacts?.education?.label || 'Educación',
      value: t.quickFacts?.education?.value || 'Ing. Informática',
      detail: t.quickFacts?.education?.unit || 'Estudiante',
      icon: GraduationCap,
    },
    {
      label: t.quickFacts?.location?.label || 'Ubicación',
      value: t.quickFacts?.location?.value || 'Argentina',
      detail: t.quickFacts?.location?.unit || 'San Pedro, BA',
      icon: MapPin,
    },
    {
      label: t.quickFacts?.english?.label || 'Inglés',
      value: t.quickFacts?.english?.value || 'Nivel B2',
      detail: t.quickFacts?.english?.unit || 'Intermedio Avanzado',
      icon: Languages,
    },
    {
      label: t.quickFacts?.specialty?.label || 'Especialidad',
      value: t.quickFacts?.specialty?.value || 'Full Stack',
      detail: t.quickFacts?.specialty?.unit || 'Automatización',
      icon: Sparkles,
    },
  ]

  return (
    <section id="about" className="relative py-36 lg:py-52 overflow-hidden bg-[#121d23]">
      <div className="container-fro relative z-10">
        <div className="section-label">{t.about?.sectionLabel}</div>
        <h2 className="section-title mb-20">
          <span>{t.about?.title1}</span> <br className="hidden sm:block" />
          <span className="accent">{t.about?.title2}</span>
        </h2>

        {/* Bio + Quick Facts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-28 lg:mb-36">
          {/* Bio Story (Cols 1-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="card-fro p-10 sm:p-12 border-l-4 border-l-[#FF5B04]">
              <p className="font-['Barlow'] text-lg sm:text-xl text-[#E4EEF0] font-medium leading-relaxed mb-8">
                {t.about?.p1}
              </p>
              <p className="font-['Barlow'] text-base sm:text-lg text-[#E4EEF0]/80 leading-relaxed">
                {t.about?.p2}
              </p>
            </div>
          </div>

          {/* Quick Facts Grid (Cols 7-12) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {quickFacts.map((fact) => {
              const Icon = fact.icon
              return (
                <div
                  key={fact.label}
                  className="card-fro p-8 sm:p-10 flex flex-col justify-between group hover:border-[#FF5B04]"
                >
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#075056] border border-[#FF5B04]/40 flex items-center justify-center text-[#FF5B04] group-hover:scale-110 group-hover:border-[#FF5B04] transition-all shadow-[0_0_15px_rgba(7,80,86,0.4)]">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  <div>
                    <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-[#FF5B04] block mb-1.5 font-semibold">
                      {fact.label}
                    </span>
                    <h4 className="font-['Barlow_Condensed'] font-bold text-2xl sm:text-3xl text-[#E4EEF0] uppercase leading-tight mb-1.5">
                      {fact.value}
                    </h4>
                    <p className="font-['Barlow'] text-sm sm:text-base text-[#E4EEF0]/70">
                      {fact.detail}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Methodology / How I Work */}
        <div className="pt-20 border-t border-[#075056]/50">
          <div className="mb-16 text-center lg:text-left">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#FF5B04] block mb-3 font-semibold">
              {t.about?.howIWorkLabel || 'Metodología'}
            </span>
            <h3 className="font-['Barlow_Condensed'] font-black uppercase text-3xl sm:text-5xl text-[#E4EEF0]">
              {t.about?.howIWorkTitle || 'Cómo Trabajo'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {(t.about?.steps || []).map((step, idx) => (
              <div
                key={step.title}
                className="card-fro p-10 lg:p-12 flex flex-col justify-between group hover:border-[#FF5B04]"
              >
                <div>
                  <span className="font-['Barlow_Condensed'] font-black text-5xl sm:text-6xl text-[#FF5B04]/70 group-hover:text-[#FF5B04] transition-colors block mb-6">
                    {`0${idx + 1}`}
                  </span>
                  <h4 className="font-['Barlow_Condensed'] font-bold text-2xl sm:text-3xl uppercase text-[#E4EEF0] mb-4">
                    {step.title}
                  </h4>
                  <p className="font-['Barlow'] text-base sm:text-lg text-[#E4EEF0]/80 leading-relaxed">
                    {step.desc}
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
