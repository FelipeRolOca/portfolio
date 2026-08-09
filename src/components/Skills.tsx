import { useLanguage } from '../i18n/LanguageContext'

export function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="relative py-36 lg:py-52 overflow-hidden bg-[#0e171e]">
      <div className="container-fro relative z-10">
        <div className="section-label">{t.skills?.sectionLabel}</div>
        <h2 className="section-title mb-6">
          <span>{t.skills?.title1}</span> <br className="hidden sm:block" />
          <span className="accent">{t.skills?.title2}</span>
        </h2>
        <p className="font-['Barlow'] text-lg sm:text-xl text-[#E4EEF0]/85 max-w-2xl mb-20 leading-relaxed">
          {t.skills?.subtitle}
        </p>

        {/* 4 Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {(t.skills?.groups || []).map((cat) => (
            <div
              key={cat.category}
              className="card-fro p-10 lg:p-12 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#075056] border border-[#FF5B04]/40 flex items-center justify-center text-[#FF5B04] font-bold text-xl shadow-[0_0_15px_rgba(7,80,86,0.4)]">
                    {cat.icon}
                  </div>
                  <h3 className="font-['Barlow_Condensed'] font-black uppercase text-2xl sm:text-3xl text-[#E4EEF0] group-hover:text-[#FF5B04] transition-colors">
                    {cat.category}
                  </h3>
                </div>
                <p className="font-['Barlow'] text-base text-[#E4EEF0]/75 mb-8 italic">
                  "{cat.note}"
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-3.5">
                  {cat.items.map((skill) => (
                    <span key={skill} className="tag text-xs sm:text-sm !py-2 !px-4">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
