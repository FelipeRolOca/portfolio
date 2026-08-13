import logo2 from '@/imports/LOGO_2.png'
import { useLang } from '../i18n/LanguageContext'

export function Footer() {
  const { t } = useLang()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="py-8 sm:py-12 border-t"
      style={{ backgroundColor: '#16232A', borderColor: 'rgba(7,80,86,0.3)' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo2} alt="FRO logo" className="h-8 w-8 object-contain" />
          <div>
            <div
              className="font-black uppercase text-sm leading-none"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E4EEF0', letterSpacing: '0.05em' }}
            >
              Felipe Roldán Ocampo
            </div>
            <div
              className="text-xs uppercase tracking-widest mt-0.5"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04', fontSize: '9px' }}
            >
              {t('Full Stack Developer · Automatización de Procesos', 'Full Stack Developer · Process Automation')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div
            className="text-xs text-center sm:text-right"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.4)', fontSize: '10px' }}
          >
            © {new Date().getFullYear()} Felipe Roldán Ocampo. {t('Todos los derechos reservados.', 'All rights reserved.')}
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: 'rgba(7,80,86,0.4)',
              color: '#E4EEF0',
              border: '1px solid rgba(7,80,86,0.6)',
              fontFamily: 'JetBrains Mono, monospace',
              borderRadius: '2px',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF5B04')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(7,80,86,0.6)')}
            title="Volver arriba"
          >
            ↑ {t('Arriba', 'Top')}
          </button>
        </div>
      </div>
    </footer>
  )
}
