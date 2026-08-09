import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, PhoneCall } from 'lucide-react'
import { toast } from 'sonner'
import { useLanguage } from '../i18n/LanguageContext'

export function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor, completa todos los campos requeridos.')
      return
    }

    const mailtoSubject = encodeURIComponent(
      `[Portfolio] ${formData.subject || 'Consulta de Proyecto'} - ${formData.name}`
    )
    const mailtoBody = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    )

    toast.success(t.contact?.toastSuccess || '¡Redirigiendo a tu correo!')

    window.open(
      `mailto:felipeoca123@hotmail.com?subject=${mailtoSubject}&body=${mailtoBody}`,
      '_blank'
    )
  }

  return (
    <section id="contact" className="relative py-36 lg:py-52 overflow-hidden bg-[#0e171e]">
      <div className="container-fro relative z-10">
        <div className="section-label">{t.contact?.sectionLabel}</div>
        <h2 className="section-title mb-6">
          <span>{t.contact?.title1}</span> <br className="hidden sm:block" />
          <span className="accent">{t.contact?.title2}</span>
        </h2>
        <p className="font-['Barlow'] text-lg sm:text-xl text-[#E4EEF0]/85 max-w-2xl mb-20 leading-relaxed">
          {t.contact?.leadText}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct channels (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Email Card */}
            <a
              href="mailto:felipeoca123@hotmail.com"
              className="card-fro p-8 sm:p-10 flex items-center gap-5 group block"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#075056] border border-[#FF5B04]/40 flex items-center justify-center text-[#FF5B04] group-hover:scale-110 group-hover:border-[#FF5B04] transition-all shrink-0 shadow-[0_0_15px_rgba(7,80,86,0.4)]">
                <Mail className="w-7 h-7" />
              </div>
              <div className="overflow-hidden">
                <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#FF5B04] block mb-1 font-semibold">
                  {t.contact?.emailLabel}
                </span>
                <span className="font-['Barlow'] font-bold text-lg sm:text-xl text-[#E4EEF0] group-hover:text-[#FF5B04] transition-colors break-all">
                  felipeoca123@hotmail.com
                </span>
              </div>
            </a>

            {/* Phone & Direct WhatsApp Card */}
            <div className="card-fro p-8 sm:p-10 space-y-7">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-[#075056] border border-[#FF5B04]/40 flex items-center justify-center text-[#FF5B04] shrink-0 shadow-[0_0_15px_rgba(7,80,86,0.4)]">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#FF5B04] block mb-1 font-semibold">
                    {t.contact?.phoneLabel}
                  </span>
                  <span className="font-['Barlow'] font-bold text-lg sm:text-xl text-[#E4EEF0]">
                    +54 9 3329 523459
                  </span>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-5 border-t border-[#075056]/50">
                <a
                  href="https://wa.me/5493329523459"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !py-3 !px-5 !text-sm flex-1 text-center"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span>{t.contact?.whatsappOption}</span>
                </a>
                <a
                  href="tel:+5493329523459"
                  className="btn-secondary !py-3 !px-5 !text-sm flex-1 text-center"
                >
                  <PhoneCall className="w-4 h-4 mr-1 text-[#FF5B04]" />
                  <span>{t.contact?.callOption}</span>
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="card-fro p-8 sm:p-10 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#075056] border border-[#FF5B04]/40 flex items-center justify-center text-[#FF5B04] shrink-0 shadow-[0_0_15px_rgba(7,80,86,0.4)]">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#FF5B04] block mb-1 font-semibold">
                  {t.contact?.locationLabel}
                </span>
                <span className="font-['Barlow'] font-bold text-lg sm:text-xl text-[#E4EEF0]">
                  {t.contact?.locationValue}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (Cols 6-12) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="card-fro p-10 sm:p-12 lg:p-14 space-y-7"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                  <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#E4EEF0]/80 block mb-2.5 font-medium">
                    {t.contact?.nameField} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact?.namePlaceholder}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#E4EEF0]/80 block mb-2.5 font-medium">
                    {t.contact?.emailField} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact?.emailPlaceholder}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#E4EEF0]/80 block mb-2.5 font-medium">
                  {t.contact?.subjectField}
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t.contact?.subjectPlaceholder}
                  className="input-field"
                />
              </div>

              <div>
                <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#E4EEF0]/80 block mb-2.5 font-medium">
                  {t.contact?.messageField} *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact?.messagePlaceholder}
                  className="input-field resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full cursor-pointer !py-4">
                <span>{t.contact?.sendBtn}</span>
                <Send className="w-5 h-5 ml-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
