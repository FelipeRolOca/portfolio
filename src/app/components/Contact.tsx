import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, ExternalLink, MessageCircle, Smartphone } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextReveal } from "./ui/TextReveal";
import { Magnetic } from "./ui/Magnetic";
import { useLanguage } from "../i18n/LanguageContext";

const ContactClothReveal = lazy(() =>
  import("./contact/ContactClothReveal").then((module) => ({
    default: module.ContactClothReveal,
  })),
);

function ContactClothFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit] border border-white/18"
      style={{
        backgroundImage: [
          "radial-gradient(circle at 16% 16%, rgba(255,255,255,0.48), transparent 14%)",
          "linear-gradient(160deg, rgba(219,232,247,0.98) 0%, rgba(191,211,233,0.97) 30%, rgba(155,184,215,0.98) 66%, rgba(121,153,193,1) 100%)",
        ].join(", "),
        boxShadow: "inset 0 2px 0 rgba(255,255,255,0.55), inset 0 -26px 34px rgba(57,93,137,0.20), 0 24px 36px rgba(0,0,0,0.18)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(106deg,transparent_0%,rgba(255,255,255,0.16)_12%,transparent_22%,transparent_36%,rgba(84,117,161,0.16)_50%,transparent_62%,rgba(255,255,255,0.14)_74%,transparent_92%)]" />
      <div className="absolute left-[10%] top-[-4%] h-[118%] w-px -rotate-[10deg] bg-white/28" />
      <div className="absolute left-[32%] top-[-4%] h-[118%] w-px rotate-[4deg] bg-sky-100/18" />
      <div className="absolute right-[22%] top-[-6%] h-[122%] w-px rotate-[12deg] bg-blue-100/24" />
      <div className="absolute inset-x-[10%] top-[18%] h-10 rounded-full bg-white/16 blur-2xl" />
      <div className="absolute inset-x-[16%] top-[46%] h-12 rounded-full bg-blue-100/10 blur-2xl" />
      <div className="absolute inset-x-[18%] bottom-[8%] h-[4.5rem] rounded-full bg-slate-900/10 blur-3xl" />
    </div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-blue-400" />,
      title: t.contact.email,
      value: "felipeoca123@hotmail.com",
      link: "mailto:felipeoca123@hotmail.com"
    },
    {
      type: "phone",
      icon: <Phone className="w-6 h-6 text-cyan-400" />,
      title: t.contact.phone,
      value: "+54 9 3329 523459",
    },
    {
      icon: <MapPin className="w-6 h-6 text-emerald-400" />,
      title: t.contact.location,
      value: t.contact.locationValue,
    }
  ];

  const phoneOptions = [
    { 
      label: language === "es" ? "WhatsApp" : "WhatsApp", 
      icon: <MessageCircle className="w-4 h-4 text-emerald-400" />,
      href: "https://wa.me/5493329523459"
    },
    { 
      label: language === "es" ? "Llamar" : "Call", 
      icon: <Phone className="w-4 h-4 text-cyan-400" />,
      href: "tel:+5493329523459"
    },
    { 
      label: language === "es" ? "SMS" : "Message", 
      icon: <Smartphone className="w-4 h-4 text-orange-400" />,
      href: "sms:+5493329523459"
    }
  ];

  const liveLinks = [
    {
      title: "JJAsist - Live",
      url: "https://v0-pwa-ux-ui-design.vercel.app/"
    },
    {
      title: "JJ Servicios Empresariales - Live",
      url: "https://jjserviciosempresarialesrrhh.com/"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:felipeoca123@hotmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">{t.contact.sectionSubtitle}</h2>
          <TextReveal text={t.contact.sectionTitle} className="text-3xl md:text-4xl font-bold text-white justify-center" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">{t.contact.title}</h4>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="relative">
                  {info.type === "phone" ? (
                    <Magnetic strength={0.1}>
                      <SpotlightCard className="relative">
                        <button 
                          onClick={() => setPhoneMenuOpen(!phoneMenuOpen)}
                          className="w-full flex items-center gap-6 p-4 rounded-2xl transition-all group relative z-10"
                        >
                          <div className="p-4 bg-zinc-950 rounded-xl group-hover:scale-110 transition-transform shadow-inner">
                            {info.icon}
                          </div>
                          <div className="text-left">
                            <h5 className="text-sm font-medium text-zinc-500 mb-1">{info.title}</h5>
                            <p className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{info.value}</p>
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {phoneMenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 p-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex flex-col gap-1 mx-2 mb-4">
                                {phoneOptions.map((opt, optIdx) => (
                                  <a
                                    key={optIdx}
                                    href={opt.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all group/opt"
                                    onClick={() => setPhoneMenuOpen(false)}
                                  >
                                    <div className="p-2 bg-zinc-950 rounded-lg group-hover/opt:scale-110 transition-transform">
                                      {opt.icon}
                                    </div>
                                    <span className="font-bold flex-1">{opt.label}</span>
                                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover/opt:opacity-50" />
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </SpotlightCard>
                    </Magnetic>
                  ) : (
                    <Magnetic strength={0.2}>
                      <SpotlightCard>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="flex items-center gap-6 p-4 rounded-2xl transition-all group relative z-10"
                          >
                            <div className="p-4 bg-zinc-950 rounded-xl group-hover:scale-110 transition-transform shadow-inner">
                              {info.icon}
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-zinc-500 mb-1">{info.title}</h5>
                              <p className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{info.value}</p>
                            </div>
                          </a>
                        ) : (
                          <div className="flex items-center gap-6 p-4 rounded-2xl transition-all group relative z-10">
                            <div className="p-4 bg-zinc-950 rounded-xl group-hover:scale-110 transition-transform shadow-inner">
                              {info.icon}
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-zinc-500 mb-1">{info.title}</h5>
                              <p className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{info.value}</p>
                            </div>
                          </div>
                        )}
                      </SpotlightCard>
                    </Magnetic>
                  )}
                </div>
              ))}
            </div>

            {/* Live Links */}
            <div className="pt-6 border-t border-zinc-800">
              <h5 className="text-sm font-medium text-zinc-500 mb-4">{t.contact.liveProjects}</h5>
              <div className="space-y-3">
                {liveLinks.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SpotlightCard className="p-8 rounded-3xl relative z-10 overflow-hidden">
              <Suspense fallback={<ContactClothFallback />}>
                <ContactClothReveal />
              </Suspense>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-400">{t.contact.nameLabel}</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-400">{t.contact.emailLabel}</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-400">{t.contact.messageLabel}</label>
                  <textarea 
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>

                <Magnetic>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/25"
                  >
                    <span>{t.contact.sendBtn}</span>
                    <motion.span
                      whileHover={{ x: 4, y: -2 }}
                      transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.span>
                  </motion.button>
                </Magnetic>
              </form>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
