import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactContent() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('Message sent! (Demo mode)', '¡Mensaje enviado! (Modo demo)'));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t('Email', 'Correo'),
      value: 'felipeoca123@hotmail.com',
      href: 'mailto:felipeoca123@hotmail.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: t('Phone', 'Teléfono'),
      value: '+54 9 3329 523459',
      href: 'tel:+5493329523459',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t('Location', 'Ubicación'),
      value: 'San Pedro, Buenos Aires, Argentina',
      href: null,
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="border-2 border-[#808080] border-t-white border-l-white bg-white p-3"
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-[#000080] border-2 border-white border-r-[#808080] border-b-[#808080] flex items-center justify-center text-white">
                {info.icon}
              </div>
              <div className="text-xs font-bold text-[#000080]">{info.label}</div>
              {info.href ? (
                <a
                  href={info.href}
                  className="text-xs text-blue-600 underline hover:text-blue-800 break-all"
                >
                  {info.value}
                </a>
              ) : (
                <div className="text-xs text-gray-800 break-words">{info.value}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 border-[#808080] border-t-white border-l-white bg-white">
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
          <h3 className="text-white font-bold text-sm">
            {t('Send a Message', 'Enviar un Mensaje')}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-bold mb-1">
              {t('Name', 'Nombre')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-2 py-1 border-2 border-t-[#808080] border-l-[#808080] border-r-[#dfdfdf] border-b-[#dfdfdf] focus:outline-none text-sm bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">
              {t('Email', 'Correo')}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-2 py-1 border-2 border-t-[#808080] border-l-[#808080] border-r-[#dfdfdf] border-b-[#dfdfdf] focus:outline-none text-sm bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">
              {t('Message', 'Mensaje')}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-2 py-1 border-2 border-t-[#808080] border-l-[#808080] border-r-[#dfdfdf] border-b-[#dfdfdf] focus:outline-none text-sm resize-none bg-white"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] flex items-center gap-2 text-sm font-bold"
          >
            <Send className="w-4 h-4" />
            {t('Send', 'Enviar')}
          </button>
        </form>
      </div>
    </div>
  );
}
