import { Calendar, Building2, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="relative py-36 lg:py-52 overflow-hidden bg-[#16232A]">
      <div className="container-fro relative z-10">
        <div className="section-label">{t.experience?.sectionLabel}</div>
        <h2 className="section-title mb-20">
          <span>{t.experience?.title1}</span> <br className="hidden sm:block" />
          <span className="accent">{t.experience?.title2}</span>
        </h2>

        {/* Experience Timeline Cards */}
        <div className="space-y-12 max-w-5xl">
          {(t.experience?.items || []).map((item) => (
            <div
              key={item.company}
              className="card-fro p-10 sm:p-12 lg:p-14 group hover:border-[#FF5B04]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-[#075056]/50">
                <div>
                  <h3 className="font-['Barlow_Condensed'] font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-[#E4EEF0] group-hover:text-[#FF5B04] transition-colors leading-tight">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-2.5 mt-2 text-[#E4EEF0]/85 font-medium text-base sm:text-lg">
                    <Building2 className="w-5 h-5 text-[#FF5B04]" />
                    <span>{item.company}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#075056]/40 border border-[#075056] font-['JetBrains_Mono'] text-xs sm:text-sm text-[#E4EEF0] self-start sm:self-auto shadow-sm">
                  <Calendar className="w-4 h-4 text-[#FF5B04]" />
                  <span>{item.period}</span>
                </div>
              </div>

              <p className="font-['Barlow'] text-lg sm:text-xl text-[#E4EEF0]/90 leading-relaxed mb-8 font-medium">
                {item.description}
              </p>

              {/* Achievements / Bullets */}
              <div className="space-y-4 mb-10">
                {item.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[#FF5B04] shrink-0 mt-1" />
                    <span className="font-['Barlow'] text-base sm:text-lg text-[#E4EEF0]/85">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Practical Outcome Box */}
              {item.outcome && (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#075056]/30 border border-[#075056] mb-8">
                  <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#FF5B04] font-semibold block mb-2">
                    {t.experience?.outcomeLabel || 'Resultado Práctico'}:
                  </span>
                  <p className="font-['Barlow'] text-base sm:text-lg text-[#E4EEF0] leading-relaxed">
                    {item.outcome}
                  </p>
                </div>
              )}

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-[#075056]/40">
                {item.tags.map((tech) => (
                  <span key={tech} className="tag text-xs sm:text-sm !py-1.5 !px-3.5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
