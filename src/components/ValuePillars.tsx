import { Globe, Cpu, Database } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function ValuePillars() {
  const { t } = useLanguage()

  const icons = [Globe, Cpu, Database]

  return (
    <section className="relative py-32 lg:py-48 overflow-hidden bg-[#16232A]">
      <div className="container-fro relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {t.pillars.map((pillar, i) => {
            const Icon = icons[i]
            return (
              <div
                key={pillar.title}
                className="card-fro p-10 lg:p-12 flex flex-col items-start text-left group hover:border-[#FF5B04]"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#075056] border border-[#FF5B04]/40 flex items-center justify-center mb-8 text-[#FF5B04] group-hover:scale-110 group-hover:border-[#FF5B04] transition-all shadow-[0_0_20px_rgba(7,80,86,0.4)]">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-['Barlow_Condensed'] font-black uppercase text-2xl sm:text-3xl text-[#E4EEF0] group-hover:text-[#FF5B04] transition-colors mb-4 tracking-wide">
                  {pillar.title}
                </h3>
                <p className="font-['Barlow'] text-base sm:text-lg text-[#E4EEF0]/85 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
