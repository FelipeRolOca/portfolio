import { X, ShieldCheck } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

interface LegalNoticeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LegalNoticeModal({ isOpen, onClose }: LegalNoticeModalProps) {
  const { t } = useLang()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border"
        style={{ backgroundColor: '#16232A', borderColor: 'rgba(7,80,86,0.6)', color: '#E4EEF0' }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b"
          style={{ backgroundColor: '#0F191E', borderColor: 'rgba(7,80,86,0.4)' }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl border"
              style={{ backgroundColor: 'rgba(255,91,4,0.1)', borderColor: 'rgba(255,91,4,0.3)', color: '#FF5B04' }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 
                className="text-lg font-black uppercase tracking-wider"
                style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
              >
                {t('Aviso Legal & Privacidad', 'Legal Notice & Privacy')}
              </h2>
              <p 
                className="text-xs"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.5)' }}
              >
                Felipe Roldán Ocampo · Portfolio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors"
            style={{ backgroundColor: 'rgba(7,80,86,0.3)', color: '#E4EEF0' }}
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto p-6 text-xs sm:text-sm space-y-5 leading-relaxed"
          style={{ fontFamily: 'Barlow, sans-serif' }}
        >
          <section className="space-y-2">
            <h3 
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: '#FF5B04', fontFamily: 'JetBrains Mono, monospace' }}
            >
              1. {t('Propiedad Intelectual y Descargo Marcario', 'Intellectual Property & Trademark Disclaimer')}
            </h3>
            <p className="text-gray-300">
              {t(
                'Todas las marcas comerciales, logotipos, nombres de empresas y proyectos exhibidos en este portafolio (incluyendo JJAsist, JJ Servicios Empresariales, JJBusca, JJHire, Sofía Moya y Paper Pops) pertenecen a sus respectivos titulares y se presentan exclusivamente con fines demostrativos de autoría, diseño de interfaces y desarrollo de software.',
                'All trademarks, logos, company names, and project assets displayed in this portfolio (including JJAsist, JJ Servicios Empresariales, JJBusca, JJHire, Sofía Moya, and Paper Pops) belong to their respective owners and are presented solely for demonstrative purposes of software authorship, UI design, and development.'
              )}
            </p>
          </section>

          <section className="space-y-2">
            <h3 
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: '#FF5B04', fontFamily: 'JetBrains Mono, monospace' }}
            >
              2. {t('Tratamiento de Datos Personales (Ley N° 25.326)', 'Personal Data Protection (Law No. 25,326)')}
            </h3>
            <p className="text-gray-300">
              {t(
                'Los datos provistos voluntariamente a través de los canales directos de contacto (correo electrónico o WhatsApp) se tratan con estricta confidencialidad y con el único fin de responder consultas profesionales, propuestas laborales o cotizaciones de proyectos.',
                'Personal information provided voluntarily via direct contact channels (email or WhatsApp) is treated with strict confidentiality solely to respond to professional inquiries, job proposals, or project quotes.'
              )}
            </p>
            <div 
              className="p-3 rounded-lg border text-xs"
              style={{ backgroundColor: '#0F191E', borderColor: 'rgba(7,80,86,0.4)', color: 'rgba(228,238,240,0.7)', fontFamily: 'JetBrains Mono, monospace' }}
            >
              <em>"La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales."</em>
            </div>
          </section>

          <section className="space-y-2">
            <h3 
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: '#FF5B04', fontFamily: 'JetBrains Mono, monospace' }}
            >
              3. {t('Cookies y Almacenamiento Local', 'Cookies & Local Storage')}
            </h3>
            <p className="text-gray-300">
              {t(
                'Este sitio utiliza almacenamiento local exclusivo para recordar preferencias técnicas del usuario (idioma seleccionado y consentimiento de cookies). No se emplean cookies de seguimiento publicitario de terceros.',
                'This website only uses local storage to remember technical preferences (selected language and cookie notice consent). No third-party advertising tracking cookies are used.'
              )}
            </p>
          </section>
        </div>

        {/* Footer */}
        <div 
          className="p-4 border-t flex justify-end"
          style={{ backgroundColor: '#0F191E', borderColor: 'rgba(7,80,86,0.4)' }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 font-bold uppercase tracking-wider text-xs rounded transition-colors"
            style={{ backgroundColor: '#FF5B04', color: '#FFFFFF', fontFamily: 'JetBrains Mono, monospace' }}
          >
            {t('Entendido', 'Got it')}
          </button>
        </div>
      </div>
    </div>
  )
}
