import { useState, useEffect } from 'react'
import { Menu, X, Languages, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Navbar() {
  const { t, language, toggleLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: t.navbar.about, href: '#about' },
    { name: t.navbar.services, href: '#services' },
    { name: t.navbar.skills, href: '#skills' },
    { name: t.navbar.experience, href: '#experience' },
    { name: t.navbar.projects, href: '#projects' },
    { name: t.navbar.contact, href: '#contact' },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#16232A]/95 backdrop-blur-md border-b border-[#075056]/60 shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
          : 'bg-[#16232A]/85 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-[#075056]/30 sm:border-transparent'
      }`}
    >
      <div className="container-fro">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Identity */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B04]"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-[#075056] border border-[#FF5B04]/50 flex items-center justify-center p-1 sm:p-1.5 shadow-[0_0_15px_rgba(255,91,4,0.2)] transition-all group-hover:scale-105 group-hover:border-[#FF5B04] shrink-0">
              <img
                src="/FRO/LOGO_2.png"
                alt="FRO Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-['Barlow_Condensed'] font-black text-base sm:text-xl tracking-tight text-[#E4EEF0] group-hover:text-[#FF5B04] transition-colors leading-none uppercase truncate max-w-[170px] sm:max-w-none">
                Felipe Roldán Ocampo
              </span>
              <span className="font-['JetBrains_Mono'] text-[9px] sm:text-[10px] uppercase tracking-wider text-[#FF5B04] mt-0.5">
                Full Stack & Automation
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className="font-['Barlow'] font-semibold text-sm uppercase tracking-wider text-[#E4EEF0]/80 hover:text-[#FF5B04] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions: Language Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[#075056] bg-[#16232A]/80 hover:bg-[#075056]/30 hover:border-[#FF5B04] text-[#E4EEF0] text-xs font-['JetBrains_Mono'] uppercase tracking-wider transition-all cursor-pointer"
              title="Cambiar idioma / Switch language"
            >
              <Languages className="w-3.5 h-3.5 text-[#FF5B04]" />
              <span className="font-bold">{language === 'es' ? 'EN' : 'ES'}</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#contact')
              }}
              className="btn-primary !py-2 !px-4 !text-sm"
            >
              <span>{t.navbar.cta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Actions (Language Switcher + Hamburger) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-[#075056] bg-[#075056]/40 text-[#E4EEF0] text-xs font-['JetBrains_Mono'] uppercase font-bold active:scale-95 transition-transform"
              aria-label="Toggle language"
            >
              <Languages className="w-3.5 h-3.5 text-[#FF5B04]" />
              <span>{language === 'es' ? 'EN' : 'ES'}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded bg-[#075056]/30 border border-[#075056]/50 text-[#E4EEF0] hover:text-[#FF5B04] transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Solid Background */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bg-[#16232A] border-b-2 border-[#FF5B04] px-6 py-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className="font-['Barlow_Condensed'] text-2xl font-bold uppercase tracking-wider text-[#E4EEF0] hover:text-[#FF5B04] transition-colors py-2 border-b border-[#075056]/40"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('#contact')
                }}
                className="btn-primary w-full text-center"
              >
                {t.navbar.cta}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
