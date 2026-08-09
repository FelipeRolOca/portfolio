import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-16 lg:py-20 bg-[#0e171e] border-t border-[#075056]/60 overflow-hidden">
      <div className="container-fro relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#075056]/40">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#075056] border border-[#FF5B04]/50 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(255,91,4,0.2)]">
              <img
                src="/FRO/LOGO_2.png"
                alt="FRO Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div>
              <span className="font-['Barlow_Condensed'] font-black text-xl uppercase tracking-tight text-[#E4EEF0] block leading-tight">
                {t.footer?.brandName || 'Felipe Roldán Ocampo'}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#FF5B04]">
                {t.footer?.brandSubtitle || 'Full Stack Developer · Automatización de Procesos'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <a
              href="#about"
              className="font-['Barlow'] font-semibold text-sm uppercase tracking-wider text-[#E4EEF0]/70 hover:text-[#FF5B04] transition-colors"
            >
              {t.navbar?.about}
            </a>
            <a
              href="#services"
              className="font-['Barlow'] font-semibold text-sm uppercase tracking-wider text-[#E4EEF0]/70 hover:text-[#FF5B04] transition-colors"
            >
              {t.navbar?.services}
            </a>
            <a
              href="#skills"
              className="font-['Barlow'] font-semibold text-sm uppercase tracking-wider text-[#E4EEF0]/70 hover:text-[#FF5B04] transition-colors"
            >
              {t.navbar?.skills}
            </a>
            <a
              href="#experience"
              className="font-['Barlow'] font-semibold text-sm uppercase tracking-wider text-[#E4EEF0]/70 hover:text-[#FF5B04] transition-colors"
            >
              {t.navbar?.experience}
            </a>
            <a
              href="#projects"
              className="font-['Barlow'] font-semibold text-sm uppercase tracking-wider text-[#E4EEF0]/70 hover:text-[#FF5B04] transition-colors"
            >
              {t.navbar?.projects}
            </a>
            <a
              href="#contact"
              className="font-['Barlow'] font-semibold text-sm uppercase tracking-wider text-[#E4EEF0]/70 hover:text-[#FF5B04] transition-colors"
            >
              {t.navbar?.contact}
            </a>
          </nav>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-[#075056] border border-[#075056] hover:border-[#FF5B04] hover:bg-[#FF5B04] text-[#E4EEF0] flex items-center justify-center transition-all shadow-[0_4px_15px_rgba(0,0,0,0.4)] cursor-pointer"
            aria-label="Volver arriba"
            title="Volver arriba"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E4EEF0]/60 font-['Barlow']">
          <p>© {new Date().getFullYear()} Felipe Roldán Ocampo. {t.footer?.rightsReserved || 'Todos los derechos reservados.'}</p>
          <p className="font-['JetBrains_Mono'] uppercase tracking-wider text-[#E4EEF0]/50">
            Full Stack & Process Automation
          </p>
        </div>
      </div>
    </footer>
  )
}
