import { useState } from 'react'
import { ExternalLink, ChevronDown, ChevronUp, Layers } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Projects() {
  const { t } = useLanguage()
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null)

  const toggleExpand = (title: string) => {
    setExpandedTitle(expandedTitle === title ? null : title)
  }

  return (
    <section id="projects" className="relative py-36 lg:py-52 overflow-hidden bg-[#111d24]">
      <div className="container-fro relative z-10">
        <div className="section-label">{t.projects?.sectionLabel}</div>
        <h2 className="section-title mb-20">
          <span>{t.projects?.title1}</span> <br className="hidden sm:block" />
          <span className="accent">{t.projects?.title2}</span>
        </h2>

        {/* Vertical Stack Projects (1 Column - Stacked One Under Another) */}
        <div className="flex flex-col gap-16 lg:gap-24 max-w-5xl mx-auto">
          {(t.projects?.items || []).map((proj) => {
            const isExpanded = expandedTitle === proj.title
            const imgSrc = proj.image || '/jj-asist-logo.png'

            return (
              <div
                key={proj.title}
                className="card-fro !p-0 overflow-hidden flex flex-col justify-between group hover:border-[#FF5B04] shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              >
                <div>
                  {/* Full Edge-to-Edge Cover Banner (No black side bars) */}
                  <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[420px] bg-[#0a1117] overflow-hidden border-b border-[#075056]/60">
                    <img
                      src={imgSrc}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16232A] via-[#16232A]/30 to-transparent opacity-85 pointer-events-none" />

                    {/* Category Tag Overlay */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="inline-block px-5 py-2.5 rounded-full bg-[#16232A]/90 border border-[#075056] font-['JetBrains_Mono'] text-xs sm:text-sm uppercase tracking-wider text-[#FF5B04] font-semibold backdrop-blur-md shadow-md">
                        {proj.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content with Generous Internal Padding */}
                  <div className="p-8 sm:p-12 lg:p-14">
                    <div className="mb-6">
                      <h3 className="font-['Barlow_Condensed'] font-black uppercase text-3xl sm:text-5xl lg:text-6xl text-[#E4EEF0] group-hover:text-[#FF5B04] transition-colors leading-tight">
                        {proj.title}
                      </h3>
                      <p className="font-['JetBrains_Mono'] text-xs sm:text-base uppercase tracking-wide text-[#FF5B04] mt-2 font-semibold">
                        {proj.subtitle}
                      </p>
                    </div>

                    <p className="font-['Barlow'] text-base sm:text-xl text-[#E4EEF0]/85 leading-relaxed mb-8">
                      {proj.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {proj.tech.map((tag) => (
                        <span key={tag} className="tag text-xs sm:text-sm !py-2 !px-4">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Case Study Accordion */}
                    <div className="border-t border-[#075056]/50 pt-6">
                      <button
                        onClick={() => toggleExpand(proj.title)}
                        className="flex items-center justify-between w-full text-left font-['JetBrains_Mono'] text-xs sm:text-sm uppercase tracking-wider text-[#E4EEF0]/80 hover:text-[#FF5B04] transition-colors py-2 cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5 font-semibold">
                          <Layers className="w-4 h-4 text-[#FF5B04]" />
                          <span>
                            {isExpanded ? t.projects?.hideDetails : t.projects?.showDetails}
                          </span>
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-[#FF5B04]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#FF5B04]" />
                        )}
                      </button>

                      {isExpanded && proj.meta && (
                        <div className="mt-6 pt-6 border-t border-[#075056]/30 space-y-6 font-['Barlow'] text-base sm:text-lg text-[#E4EEF0]/80 animate-in fade-in duration-200">
                          <div>
                            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#FF5B04] block mb-1 font-semibold">
                              {t.projects?.roleLabel}:
                            </span>
                            <p className="text-[#E4EEF0] font-medium">{proj.meta.role}</p>
                          </div>
                          <div>
                            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#FF5B04] block mb-1 font-semibold">
                              {t.projects?.problemLabel}:
                            </span>
                            <p>{proj.meta.problem}</p>
                          </div>
                          <div>
                            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#FF5B04] block mb-1 font-semibold">
                              {t.projects?.valueLabel}:
                            </span>
                            <p>{proj.meta.value}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-8 sm:p-12 lg:p-14 pt-0 flex flex-wrap items-center justify-between gap-5 border-t border-[#075056]/40 mt-4">
                  {proj.portals && proj.portals.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                      {proj.portals.map((portal) => (
                        <a
                          key={portal.name}
                          href={portal.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary !py-3.5 !px-7 !text-base flex-1 sm:flex-initial text-center"
                        >
                          <span>{portal.name}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !py-3.5 !px-8 !text-base w-full sm:w-auto text-center"
                    >
                      <span>{t.projects?.visitWebsite}</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
