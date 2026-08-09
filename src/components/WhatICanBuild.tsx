import { Globe, LayoutGrid, Zap, Sliders, CheckCircle2, ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function WhatICanBuild() {
  const { t } = useLanguage()

  const serviceIcons = [Globe, LayoutGrid, Zap, Sliders]

  return (
    <section id="services" className="relative py-36 lg:py-52 overflow-hidden bg-[#16232A]">
      <div className="container-fro relative z-10">
        <div className="section-label">{t.services?.sectionLabel}</div>
        <h2 className="section-title mb-6">
          <span>{t.services?.title1}</span> <br className="hidden sm:block" />
          <span className="accent">{t.services?.title2}</span>
        </h2>
        <p className="font-['Barlow'] text-lg sm:text-xl text-[#E4EEF0]/85 max-w-2xl mb-20 leading-relaxed">
          {t.services?.problemsSubtitle}
        </p>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-28 lg:mb-40">
          {(t.services?.items || []).map((srv, idx) => {
            const Icon = serviceIcons[idx % serviceIcons.length]
            return (
              <div
                key={srv.title}
                className="card-fro p-9 sm:p-10 flex flex-col justify-between group hover:border-[#FF5B04]"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#075056] border border-[#FF5B04]/40 flex items-center justify-center text-[#FF5B04] mb-8 group-hover:scale-110 group-hover:border-[#FF5B04] transition-all shadow-[0_0_20px_rgba(7,80,86,0.4)]">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Barlow_Condensed'] font-bold text-2xl sm:text-3xl uppercase text-[#E4EEF0] group-hover:text-[#FF5B04] transition-colors mb-4 leading-tight">
                    {srv.title}
                  </h3>
                  <p className="font-['Barlow'] text-base text-[#E4EEF0]/80 leading-relaxed mb-8">
                    {srv.desc}
                  </p>
                </div>
                <div className="pt-5 border-t border-[#075056]/40">
                  <a
                    href="#contact"
                    className="font-['JetBrains_Mono'] text-xs text-[#FF5B04] font-semibold uppercase tracking-wider flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                  >
                    <span>{t.navbar?.cta || 'Consultar'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Problem-Solving Highlight Box with Generous Separation & Internal Padding */}
        <div className="card-fro p-10 sm:p-14 lg:p-16 border-2 border-[#075056] bg-[#075056]/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="max-w-3xl mb-12">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#FF5B04] block mb-3 font-semibold">
              {t.services?.problemsTitle1} {t.services?.problemsTitle2}
            </span>
            <h3 className="font-['Barlow_Condensed'] font-black uppercase text-3xl sm:text-5xl text-[#E4EEF0] leading-none">
              {t.services?.problemsSubtitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {(t.services?.problems || []).map((problem) => (
              <div
                key={problem}
                className="flex items-start gap-4.5 p-6 rounded-2xl bg-[#16232A]/85 border border-[#075056]/70 backdrop-blur-md shadow-sm"
              >
                <CheckCircle2 className="w-6 h-6 text-[#FF5B04] shrink-0 mt-0.5" />
                <span className="font-['Barlow'] text-base sm:text-lg text-[#E4EEF0] font-medium leading-snug">
                  {problem}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
