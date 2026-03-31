import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { BorderBeam } from "./ui/BorderBeam";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextReveal } from "./ui/TextReveal";
import { Parallax } from "./ui/Parallax";
import { useLanguage } from "../i18n/LanguageContext";

export function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const experiences = [
    {
      role: t.experience.job1Role,
      company: t.experience.job1Company,
      period: t.experience.job1Period,
      location: t.experience.job1Location,
      description: t.experience.job1Desc,
      bullets: t.experience.job1Bullets,
      details: {
        responsibilities: t.experience.job1Resp,
        tools: ["Next.js", "Supabase", "Vercel", "Google Apps Script"],
        outcome: t.experience.job1Outcome
      }
    },
    {
      role: t.experience.job2Role,
      company: t.experience.job2Company,
      period: t.experience.job2Period,
      location: t.experience.job2Location,
      description: t.experience.job2Desc,
      bullets: t.experience.job2Bullets,
      details: {
        responsibilities: t.experience.job2Resp,
        tools: ["WordPress", "Elementor", "SEO"],
        outcome: t.experience.job2Outcome
      }
    },
    {
      role: t.experience.job3Role,
      company: t.experience.job3Company,
      period: t.experience.job3Period,
      location: t.experience.job3Location,
      description: t.experience.job3Desc,
      bullets: t.experience.job3Bullets,
      details: {
        responsibilities: t.experience.job3Resp,
        tools: ["Administrative platforms", "Digital documentation"],
        outcome: t.experience.job3Outcome
      }
    },
  ];

  return (
    <section id="experience" className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <Parallax offset={120} className="absolute top-1/3 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none">
        <div className="w-full h-full" />
      </Parallax>
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-20 relative z-20">
          <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">{t.experience.sectionSubtitle}</h2>
          <TextReveal text={t.experience.sectionTitle} className="text-3xl md:text-4xl font-bold text-white justify-center" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line timeline */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-zinc-800 transform md:-translate-x-1/2" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2 }}
              className={`relative flex items-start mb-12 last:mb-0 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              {/* Center Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-zinc-950 transform -translate-x-1/2 mt-1.5 md:mt-0 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

              {/* Content Box */}
              <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${idx % 2 === 0 ? "md:pr-14 md:text-right" : "md:pl-14 md:text-left"
                }`}>
                <SpotlightCard 
                  className="overflow-visible group relative"
                  innerClassName="p-6"
                >
                  <BorderBeam size={250} duration={10} delay={idx * 0.5} borderWidth={6} offset={-15} />
                  <h4 className="text-xl font-bold text-white mb-2">{exp.role}</h4>
                  <p className="text-sm font-medium text-blue-400/90 mb-3">{exp.company}</p>
                  <div className={`flex flex-wrap items-center gap-4 mb-4 text-sm text-zinc-400 ${idx % 2 === 0 ? "md:justify-end" : "md:justify-start"
                    }`}>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">{exp.description}</p>

                  <div className={`mt-4 flex flex-wrap gap-2 ${idx % 2 === 0 ? "md:justify-end" : "md:justify-start"
                    }`}>
                    {exp.bullets.map((bullet, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-xs font-medium text-blue-300"
                      >
                        {bullet}
                      </span>
                    ))}
                  </div>

                  <div className={`mt-5 ${idx % 2 === 0 ? "md:flex md:justify-end" : "md:flex md:justify-start"}`}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {openIndex === idx ? t.experience.hideDetails : t.experience.viewDetails}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4 sm:p-5 space-y-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-2">{t.experience.keyResp}</p>
                            <div className="flex flex-wrap gap-2">
                              {exp.details.responsibilities.map((item, detailIdx) => (
                                <span
                                  key={detailIdx}
                                  className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-2">{t.experience.toolsUsed}</p>
                            <div className="flex flex-wrap gap-2">
                              {exp.details.tools.map((tool, toolIdx) => (
                                <span
                                  key={toolIdx}
                                  className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-2">{t.experience.practicalOutcome}</p>
                            <p className="text-sm text-zinc-300 leading-relaxed">{exp.details.outcome}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SpotlightCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
