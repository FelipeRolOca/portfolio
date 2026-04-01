import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, ExternalLink, MessageCircle, Smartphone } from "lucide-react";
import { useState } from "react";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextReveal } from "./ui/TextReveal";
import { Magnetic } from "./ui/Magnetic";
import { useLanguage } from "../i18n/LanguageContext";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const [mailCoverStarted, setMailCoverStarted] = useState(false);
  const [mailCoverLifted, setMailCoverLifted] = useState(false);
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

  const handleFormViewportEnter = () => {
    if (mailCoverStarted) return;
    setMailCoverStarted(true);
    window.setTimeout(() => {
      setMailCoverLifted(true);
    }, 2900);
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
            onViewportEnter={handleFormViewportEnter}
          >
            <SpotlightCard className="p-8 rounded-3xl relative z-10 overflow-hidden">
              <AnimatePresence>
                {!mailCoverLifted && (
                  <motion.div
                    initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                    animate={
                      mailCoverStarted
                        ? {
                            x: [0, 0, 10, 42, 132, 240],
                            y: [0, 8, 18, -10, -86, -168],
                            rotate: [0, -1.5, -2.5, 2, 10, 18],
                            scaleX: [1, 1.01, 1.015, 1.01, 0.98, 0.9],
                            scaleY: [1, 0.995, 0.99, 0.98, 0.94, 0.88],
                            opacity: [1, 1, 1, 0.98, 0.86, 0],
                          }
                        : {
                            x: 0,
                            y: 0,
                            rotate: 0,
                            scaleX: 1,
                            scaleY: 1,
                            opacity: 1,
                          }
                    }
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.9, times: [0, 0.18, 0.36, 0.58, 0.82, 1], ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute inset-0 z-30 origin-bottom-left will-change-transform"
                  >
                    <motion.div
                      animate={
                        mailCoverStarted
                          ? {
                              borderRadius: [
                                "28px",
                                "28px 28px 34px 34px / 28px 28px 56px 48px",
                                "30px 26px 40px 44px / 26px 28px 78px 64px",
                                "26px 18px 54px 42px / 24px 18px 110px 70px",
                                "22px 14px 60px 32px / 20px 14px 132px 54px",
                              ]
                            }
                          : { borderRadius: "28px" }
                      }
                      transition={{ duration: 2.75, times: [0, 0.25, 0.55, 0.8, 1], ease: "easeInOut" }}
                      className="relative h-full w-full overflow-hidden border border-white/20 bg-[#dfe8f7]"
                      style={{
                        backgroundImage: [
                          "radial-gradient(circle at 14% 14%, rgba(255,255,255,0.98), transparent 18%)",
                          "radial-gradient(circle at 74% 20%, rgba(216,233,255,0.74), transparent 24%)",
                          "radial-gradient(circle at 60% 82%, rgba(143,181,228,0.22), transparent 34%)",
                          "linear-gradient(164deg, rgba(255,255,255,0.98) 0%, rgba(241,246,255,0.97) 20%, rgba(220,231,248,0.95) 48%, rgba(194,211,232,0.94) 74%, rgba(175,198,224,0.96) 100%)",
                        ].join(", "),
                        boxShadow: "inset 0 2px 0 rgba(255,255,255,0.88), inset 0 -22px 40px rgba(104, 132, 172, 0.20), inset 14px -18px 28px rgba(255,255,255,0.28), 0 26px 55px rgba(0,0,0,0.24)",
                      }}
                    >
                      <motion.div
                        animate={
                          mailCoverStarted
                            ? { y: [0, 4, 16, 30, 54], scaleY: [1, 1.02, 1.05, 1.08, 1.1] }
                            : { y: 0, scaleY: 1 }
                        }
                        transition={{ duration: 2.4, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeInOut" }}
                        className="absolute inset-x-[4%] bottom-[-14%] h-[38%] rounded-[46%] bg-[radial-gradient(circle_at_50%_18%,rgba(120,150,184,0.30),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(116,140,170,0.28))] blur-xl"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(104deg,transparent_0%,rgba(255,255,255,0.20)_10%,transparent_20%,transparent_39%,rgba(147,175,205,0.22)_52%,transparent_66%,rgba(255,255,255,0.18)_76%,transparent_92%)] opacity-80" />
                      <div className="absolute left-[8%] top-[15%] h-[118%] w-px -rotate-[8deg] bg-white/30 blur-[1px]" />
                      <div className="absolute left-[28%] top-[-2%] h-[124%] w-px rotate-[4deg] bg-slate-300/20 blur-[1px]" />
                      <div className="absolute right-[24%] top-[-4%] h-[128%] w-px rotate-[11deg] bg-blue-100/24 blur-[1px]" />
                      <div className="absolute inset-x-[12%] top-[18%] h-8 rounded-full bg-white/18 blur-2xl" />
                      <div className="absolute inset-x-[18%] top-[42%] h-10 rounded-full bg-slate-100/14 blur-2xl" />
                      <div className="absolute inset-x-[22%] bottom-[12%] h-16 rounded-full bg-slate-500/12 blur-3xl" />
                      <div className="absolute -left-6 bottom-[-14%] h-40 w-48 rounded-full bg-white/24 blur-3xl" />
                      <div className="absolute right-0 top-10 h-24 w-24 rounded-full border border-white/18 bg-white/8 blur-[2px]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,transparent_0%,transparent_55%,rgba(94,124,165,0.12)_100%)]" />
                      <div className="absolute inset-x-0 bottom-[17%] h-px bg-slate-500/20 blur-[1px]" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="relative w-full overflow-hidden py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/25"
                  >
                    <motion.span
                      aria-hidden="true"
                      initial={{ x: "-140%", opacity: 0 }}
                      whileHover={{ x: "140%", opacity: 1 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-22deg]"
                    />
                    <span className="relative z-10">{t.contact.sendBtn}</span>
                    <motion.span
                      className="relative z-10"
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
