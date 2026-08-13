import { useState } from 'react'
import fondoCuadrado from '@/imports/FONDO_CUADRADO.png'
import { useLang } from '../i18n/LanguageContext'

export function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailUrl = `mailto:felipeoca123@hotmail.com?subject=${encodeURIComponent(
      form.subject || t('Consulta desde Portafolio Web', 'Contact from Portfolio')
    )}&body=${encodeURIComponent(
      `${t('Nombre', 'Name')}: ${form.name}\nEmail: ${form.email}\n\n${t('Mensaje', 'Message')}:\n${form.message}`
    )}`
    window.location.href = mailUrl
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'rgba(22,35,42,0.8)',
    border: '1px solid rgba(7,80,86,0.5)',
    color: '#E4EEF0',
    fontFamily: 'Barlow, sans-serif',
    fontSize: '0.95rem',
    borderRadius: '2px',
    padding: '0.875rem 1rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section
      id="contacto"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#075056' }}
    >
      {/* Right side background overlay using single FONDO_CUADRADO (Desktop only) */}
      <div
        className="hidden md:block absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${fondoCuadrado})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2
            className="uppercase leading-none mb-8"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#E4EEF0',
            }}
          >
            {t('Trabajemos', "Let's Work")}
            <br />
            <span style={{ color: '#16232A' }}>{t('Juntos', 'Together')}</span>
          </h2>
          <p
            className="leading-relaxed mb-12 font-medium"
            style={{ color: 'rgba(228,238,240,0.85)', fontFamily: 'Barlow, sans-serif', fontSize: '1.05rem' }}
          >
            {t(
              '¿Tenés un proyecto en mente o querés digitalizar un proceso en tu empresa? Escribime directamente para analizar la mejor solución.',
              'Have a project in mind or looking to automate a workflow? Contact me directly to discuss the ideal solution.'
            )}
          </p>

          <div className="flex flex-col gap-6">
            {/* Email item card */}
            <div
              className="p-5 sm:p-6 flex items-center gap-5 transition-all duration-300 hover:border-[#FF5B04]/60"
              style={{
                backgroundColor: 'rgba(22,35,42,0.6)',
                border: '1px solid rgba(7,80,86,0.8)',
                borderRadius: '4px',
              }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(7,80,86,0.4)',
                  color: '#FF5B04',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,91,4,0.3)',
                }}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="overflow-hidden">
                <div
                  className="text-xs sm:text-sm uppercase tracking-widest font-bold mb-1"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04' }}
                >
                  Email
                </div>
                <a
                  href="mailto:felipeoca123@hotmail.com?subject=Consulta%20desde%20Portafolio"
                  className="text-base sm:text-xl font-bold font-mono tracking-wide transition-colors duration-200 hover:text-[#FF5B04] block truncate"
                  style={{ color: '#E4EEF0', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  felipeoca123@hotmail.com
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp item card */}
            <div
              className="p-5 sm:p-6 flex flex-col gap-4 transition-all duration-300 hover:border-[#FF5B04]/60"
              style={{
                backgroundColor: 'rgba(22,35,42,0.6)',
                border: '1px solid rgba(7,80,86,0.8)',
                borderRadius: '4px',
              }}
            >
              <div className="flex items-center gap-5">
                <div
                  className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(7,80,86,0.4)',
                    color: '#FF5B04',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,91,4,0.3)',
                  }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div
                    className="text-xs sm:text-sm uppercase tracking-widest font-bold mb-1"
                    style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04' }}
                  >
                    {t('Teléfono / WhatsApp', 'Phone / WhatsApp')}
                  </div>
                  <div
                    className="text-lg sm:text-2xl font-bold font-mono tracking-wider"
                    style={{ color: '#E4EEF0', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    +54 9 3329 523459
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="https://wa.me/5493329523459?text=Hola%20Felipe,%20quisiera%20consultarte%20sobre%20un%20proyecto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  style={{
                    backgroundColor: '#FF5B04',
                    color: '#E4EEF0',
                    fontFamily: 'Barlow Condensed, sans-serif',
                    borderRadius: '3px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D94A00')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF5B04')}
                >
                  <span>WhatsApp</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.396 0 .029 5.367.029 12.003c0 2.114.551 4.175 1.597 5.99L0 24l6.135-1.609a11.943 11.943 0 005.896 1.543h.005c6.635 0 12.001-5.367 12.001-12.003.002-3.204-1.244-6.214-3.509-8.48A11.93 11.93 0 0012.031 0zm0 22.016h-.004a9.934 9.934 0 01-5.064-1.39l-.363-.216-3.762.986.1003-3.666-.237-.378a9.923 9.923 0 01-1.523-5.348c0-5.485 4.463-9.948 9.954-9.948 2.657 0 5.155 1.036 7.034 2.916a9.88 9.88 0 012.912 7.036c0 5.486-4.464 9.948-9.95 9.948z" />
                  </svg>
                </a>
                <a
                  href="tel:+5493329523459"
                  className="py-3 px-5 text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor: 'rgba(22,35,42,0.8)',
                    color: '#E4EEF0',
                    border: '1.5px solid rgba(255,91,4,0.4)',
                    fontFamily: 'Barlow Condensed, sans-serif',
                    borderRadius: '3px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF5B04')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,91,4,0.4)')}
                >
                  <span>Llamar</span>
                  <svg className="w-5 h-5 text-[#FF5B04]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Location item card */}
            <div
              className="p-5 sm:p-6 flex items-center gap-5 transition-all duration-300 hover:border-[#FF5B04]/60"
              style={{
                backgroundColor: 'rgba(22,35,42,0.6)',
                border: '1px solid rgba(7,80,86,0.8)',
                borderRadius: '4px',
              }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(7,80,86,0.4)',
                  color: '#FF5B04',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,91,4,0.3)',
                }}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div
                  className="text-xs sm:text-sm uppercase tracking-widest font-bold mb-1"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF5B04' }}
                >
                  {t('Ubicación', 'Location')}
                </div>
                <div
                  className="text-base sm:text-xl font-bold"
                  style={{ color: '#E4EEF0', fontFamily: 'Barlow, sans-serif' }}
                >
                  San Pedro, Buenos Aires, Argentina
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.6)', fontSize: '10px' }}
              >
                {t('Nombre', 'Name')} *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder={t('Tu nombre y apellido', 'Your full name')}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = '#FF5B04')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(7,80,86,0.5)')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.6)', fontSize: '10px' }}
              >
                Email *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder={t('correo@ejemplo.com', 'email@example.com')}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = '#FF5B04')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(7,80,86,0.5)')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.6)', fontSize: '10px' }}
            >
              {t('Asunto', 'Subject')}
            </label>
            <input
              type="text"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              placeholder={t('¿En qué te puedo ayudar?', 'How can I help you?')}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#FF5B04')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(7,80,86,0.5)')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(228,238,240,0.6)', fontSize: '10px' }}
            >
              {t('Mensaje', 'Message')} *
            </label>
            <textarea
              required
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder={t('Contame sobre tu proyecto, proceso o necesidad...', 'Tell me about your project, process, or needs...')}
              rows={6}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#FF5B04')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(7,80,86,0.5)')}
            />
          </div>

          <button
            type="submit"
            className="py-4 font-bold uppercase tracking-wider text-base transition-all duration-200 mt-2"
            style={{
              backgroundColor: sent ? '#075056' : '#FF5B04',
              color: '#E4EEF0',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 700,
              letterSpacing: '0.1em',
              borderRadius: '2px',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { if (!sent) e.currentTarget.style.backgroundColor = '#D94A00' }}
            onMouseLeave={e => { if (!sent) e.currentTarget.style.backgroundColor = '#FF5B04' }}
          >
            {sent ? t('✓ Mensaje Enviado', '✓ Message Sent') : t('Enviar Mensaje', 'Send Message')}
          </button>
        </form>
      </div>
    </section>
  )
}
