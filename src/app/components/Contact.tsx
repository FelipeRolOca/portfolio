import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, ExternalLink, MessageCircle, Smartphone } from "lucide-react";
import { useState } from "react";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextReveal } from "./ui/TextReveal";
import { Magnetic } from "./ui/Magnetic";
import { useCanHover } from "./ui/use-can-hover";
import { useLanguage } from "../i18n/LanguageContext";

const infoColumnVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      staggerChildren: 0.12,
    },
  },
};

const infoItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const formColumnVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.12 } },
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const canHover = useCanHover();

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

  const floatingBadges = [
    {
      label: language === "es" ? "Respuesta rapida" : "Quick replies",
      className: "left-6 top-8 hidden md:flex"
    },
    {
      label: "WhatsApp",
      className: "right-6 top-24 hidden lg:flex"
    },
    {
      label: t.contact.sendBtn,
      className: "left-10 bottom-10 hidden md:flex"
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
      <motion.div
        animate={{ x: [0, -24, 0], y: [0, -18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, 22, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-72 h-72 bg-blue-500/8 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">{t.contact.sectionSubtitle}</h2>
          <TextReveal text={t.contact.sectionTitle} className="text-3xl md:text-4xl font-bold text-white justify-center" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={infoColumnVariants}
            className="space-y-8"
          >
            <motion.div variants={infoItemVariants}>
              <h4 className="text-2xl font-bold text-white mb-4">{t.contact.title}</h4>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                {t.contact.subtitle}
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <motion.div key={idx} variants={infoItemVariants} className="relative">
                  {info.type === "phone" ? (
                    <Magnetic strength={0.1}>
                      <SpotlightCard className="relative overflow-visible">
                        <button
                          onClick={() => setPhoneMenuOpen(!phoneMenuOpen)}
                          className="w-full flex items-center gap-6 p-4 rounded-2xl transition-all group relative z-10"
                        >
                          <motion.div
                            animate={phoneMenuOpen ? { rotate: [0, -10, 0], scale: [1, 1.08, 1] } : { rotate: 0, scale: 1 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className="p-4 bg-zinc-950 rounded-xl shadow-inner"
                          >
                            {info.icon}
                          </motion.div>
                          <div className="text-left">
                            <h5 className="text-sm font-medium text-zinc-500 mb-1">{info.title}</h5>
                            <p className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{info.value}</p>
                          </div>
                        </button>

                        {canHover && (
                          <AnimatePresence>
                            {phoneMenuOpen && (
                              <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                  hidden: { opacity: 0 },
                                  visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.05, delayChildren: 0.04 }
                                  }
                                }}
                                className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
                              >
                                {phoneOptions.map((opt, optIdx) => (
                                  <motion.a
                                    key={optIdx}
                                    href={opt.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setPhoneMenuOpen(false)}
                                    variants={{
                                      hidden: { opacity: 0, x: -24, y: 0, scale: 0.85 },
                                      visible: {
                                        opacity: 1,
                                        x: 0,
                                        y: [-8, 0],
                                        scale: 1,
                                        transition: { type: "spring", stiffness: 260, damping: 18 }
                                      }
                                    }}
                                    className="pointer-events-auto absolute right-4 flex items-center gap-3 rounded-full border border-zinc-700 bg-zinc-950/95 px-4 py-3 text-sm font-bold text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-lg"
                                    style={{ top: `${14 + optIdx * 68}px` }}
                                  >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900">
                                      {opt.icon}
                                    </span>
                                    {opt.label}
                                  </motion.a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}

                        <AnimatePresence initial={false}>
                          {phoneMenuOpen && !canHover && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 p-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex flex-col gap-1 mx-2 mb-4">
                                {phoneOptions.map((opt, optIdx) => (
                                  <motion.a
                                    key={optIdx}
                                    href={opt.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all group/opt"
                                    onClick={() => setPhoneMenuOpen(false)}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: optIdx * 0.05 }}
                                  >
                                    <div className="p-2 bg-zinc-950 rounded-lg group-hover/opt:scale-110 transition-transform">
                                      {opt.icon}
                                    </div>
                                    <span className="font-bold flex-1">{opt.label}</span>
                                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover/opt:opacity-50" />
                                  </motion.a>
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
                </motion.div>
              ))}
            </div>

            <motion.div variants={infoItemVariants} className="pt-6 border-t border-zinc-800">
              <h5 className="text-sm font-medium text-zinc-500 mb-4">{t.contact.liveProjects}</h5>
              <div className="space-y-3">
                {liveLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="group flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                  >
                    <motion.span whileHover={{ x: 3, y: -2 }} transition={{ type: "spring", stiffness: 250, damping: 14 }}>
                      <ExternalLink className="w-4 h-4" />
                    </motion.span>
                    {link.title}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={formColumnVariants}
            className="relative"
          >
            {floatingBadges.map((badge, idx) => (
              <motion.div
                key={badge.label}
                animate={{ y: [0, -10, 0], rotate: [0, idx % 2 === 0 ? 2 : -2, 0] }}
                transition={{ duration: 5 + idx, repeat: Infinity, ease: "easeInOut" }}
                className={`pointer-events-none absolute z-20 items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-950/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl ${badge.className}`}
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                {badge.label}
              </motion.div>
            ))}

            <SpotlightCard className="p-8 rounded-3xl relative z-10 overflow-visible">
              <motion.div
                animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.03, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl"
              />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="space-y-2">
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
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="space-y-2">
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
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-2">
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
                </motion.div>

                <Magnetic>
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [0.94, 1.08, 0.94], opacity: [0.15, 0.28, 0.15] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      className="pointer-events-none absolute inset-0 rounded-xl bg-cyan-500/30 blur-2xl"
                    />
                    <button
                      type="submit"
                      className="relative w-full overflow-hidden py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/25"
                    >
                      <motion.span
                        animate={{ x: ["-130%", "130%"] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-24deg]"
                      />
                      <span className="relative z-10">{t.contact.sendBtn}</span>
                      <motion.span
                        whileHover={{ x: 3, y: -3 }}
                        transition={{ type: "spring", stiffness: 280, damping: 14 }}
                        className="relative z-10"
                      >
                        <Send className="w-5 h-5" />
                      </motion.span>
                    </button>
                  </div>
                </Magnetic>
              </form>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
