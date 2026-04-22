import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Smartphone, ExternalLink } from 'lucide-react';
import type { Translation, Language } from '../App';

interface ContactProps {
  t: Translation['contact'];
  language: Language;
}

export default function Contact({ t, language }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:felipeoca123@hotmail.com?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', message: '' });
  };

  const phoneOptions = [
    {
      label: language === 'es' ? 'WhatsApp' : 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4 text-[var(--yellow)]" />,
      href: 'https://wa.me/5493329523459'
    },
    {
      label: language === 'es' ? 'Llamar' : 'Call',
      icon: <Phone className="w-4 h-4 text-[var(--yellow)]" />,
      href: 'tel:+5493329523459'
    },
    {
      label: language === 'es' ? 'SMS' : 'Message',
      icon: <Smartphone className="w-4 h-4 text-[var(--yellow)]" />,
      href: 'sms:+5493329523459'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'felipeoca123@hotmail.com',
      href: 'mailto:felipeoca123@hotmail.com',
      type: 'link'
    },
    {
      icon: Phone,
      label: language === 'es' ? 'Teléfono' : 'Phone',
      value: '+54 9 3329 52-3459',
      type: 'phone'
    },
    {
      icon: MapPin,
      label: language === 'es' ? 'Ubicación' : 'Location',
      value: 'San Pedro, Buenos Aires, Argentina',
      href: null,
      type: 'text'
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-12 md:py-20 px-6 no-outline transition-colors duration-1000">

      <div className="max-w-6xl mx-auto relative z-10 bg-white dark:bg-gray-900 rounded-[2rem] p-8 md:p-12 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] mx-auto rounded-full mb-4" />
          <p className="text-gray-800 dark:text-gray-200 text-base md:text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-[var(--yellow)] focus:ring-2 focus:ring-[var(--yellow)]/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-[var(--yellow)] focus:ring-2 focus:ring-[var(--yellow)]/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t.message}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-[var(--yellow)] focus:ring-2 focus:ring-[var(--yellow)]/20 outline-none transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 md:px-8 md:py-4 rounded-lg bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] text-black no-outline font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,220,0,0.5)] hover:scale-[1.02] transition-all"
              >
                {t.send}
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.or}</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="relative"
                  >
                    {info.type === 'phone' ? (
                      <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg border border-black dark:border-black dark:bg-gray-800 hover:border-[var(--yellow)] hover:bg-[var(--yellow)]/5 transition-all">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-4 h-4 md:w-5 md:h-5 text-black" />
                        </div>
                        <button
                          onClick={() => setPhoneMenuOpen(!phoneMenuOpen)}
                          className="flex-1 text-left"
                        >
                          <p className="text-sm text-gray-700 dark:text-gray-400 mb-1">{info.label}</p>
                          <p className="text-gray-900 dark:text-white font-medium hover:text-[var(--yellow-dark)] transition-colors">{info.value}</p>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg border border-black dark:border-black dark:bg-gray-800 hover:border-[var(--yellow)] hover:bg-[var(--yellow)]/5 transition-all">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-4 h-4 md:w-5 md:h-5 text-black" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 dark:text-gray-400 mb-1">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-gray-900 dark:text-white font-medium hover:text-[var(--yellow-dark)] transition-colors break-all"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-gray-900 dark:text-white font-medium">{info.value}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {info.type === 'phone' && (
                      <AnimatePresence>
                        {phoneMenuOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 p-2 bg-white dark:bg-gray-800 border border-[var(--yellow)]/20 rounded-xl flex flex-col gap-1 shadow-lg">
                              {phoneOptions.map((opt, optIdx) => (
                                <a
                                  key={optIdx}
                                  href={opt.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--yellow)]/10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all group/opt"
                                  onClick={() => setPhoneMenuOpen(false)}
                                >
                                  <div className="p-2 bg-[var(--yellow)]/10 rounded-lg group-hover/opt:bg-[var(--yellow)]/20 transition-colors">
                                    {opt.icon}
                                  </div>
                                  <span className="font-medium flex-1">{opt.label}</span>
                                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover/opt:opacity-50 transition-opacity" />
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
