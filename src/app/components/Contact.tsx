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
  ];

  const locationMapHref = "https://www.google.com/maps?q=-33.6999,-59.6896";
  const locationCoordinates = "33.6999° S / 59.6896° W";
  const locationEyebrow = language === "es" ? "Base de trabajo" : "Work base";
  const locationDescription =
    language === "es"
      ? "Trabajo desde San Pedro, Buenos Aires, con disponibilidad para colaborar de forma remota y coordinar reuniones puntuales cuando el proyecto lo pide."
      : "I work from San Pedro, Buenos Aires, with availability for remote collaboration and occasional in-person meetings when the project calls for it.";
  const locationMapLabel = language === "es" ? "Abrir en Google Maps" : "Open in Google Maps";
  const locationMapAlt =
    language === "es"
      ? "Mapa neon de Buenos Aires utilizado como apoyo visual de la ubicación del portfolio"
      : "Neon Buenos Aires map used as the portfolio location visual";
  const locationTag = language === "es" ? "Disponible remoto" : "Remote-friendly";
  const locationCardNote =
    language === "es"
      ? "Referencia visual de mi ubicación dentro de la provincia."
      : "Visual reference for where I'm based within the province.";
  const locationCardEyebrow = language === "es" ? "Vista cartográfica" : "Cartographic view";

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
    <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden isolate">

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
                    <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 shadow-xl">
                      <button 
                        type="button"
                        onClick={() => setPhoneMenuOpen(!phoneMenuOpen)}
                        className="w-full flex items-center gap-6 rounded-2xl transition-all group relative z-10"
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
                    </div>
                  ) : (
                    <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 shadow-xl">
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="flex items-center gap-6 rounded-2xl transition-all group relative z-10"
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
                        <div className="flex items-center gap-6 rounded-2xl transition-all group relative z-10">
                          <div className="p-4 bg-zinc-950 rounded-xl group-hover:scale-110 transition-transform shadow-inner">
                            {info.icon}
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-zinc-500 mb-1">{info.title}</h5>
                            <p className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{info.value}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <SpotlightCard
              className="overflow-hidden rounded-[2rem] border-zinc-800/90 bg-zinc-900/50"
              spotlightColor="rgba(34, 211, 238, 0.14)"
            >
              <div className="flex flex-col">
                <div className="flex flex-col gap-5 p-5 sm:p-6">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 shadow-inner ring-1 ring-white/5">
                        <MapPin className="w-6 h-6 text-emerald-400" />
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                          {locationEyebrow}
                        </p>
                        <h5 className="text-xl font-bold text-white sm:text-2xl">
                          {t.contact.locationValue}
                        </h5>
                        <p className="max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                          {locationDescription}
                        </p>
                      </div>
                    </div>

                    <Magnetic strength={0.2}>
                      <a
                        href={locationMapHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:text-cyan-100"
                      >
                        {locationMapLabel}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Magnetic>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs font-medium">
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-cyan-200">
                      {locationTag}
                    </span>
                    <span className="rounded-full border border-zinc-700 bg-zinc-950/70 px-3 py-1.5 text-zinc-300">
                      {locationCoordinates}
                    </span>
                  </div>
                </div>

                <a
                  href={locationMapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block border-t border-zinc-800/80"
                >
                  <div className="relative h-72 overflow-hidden sm:h-80">
                    <img
                      src="/buenos_aires_neon_20260409_233022.png"
                      alt={locationMapAlt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-[center_34%] opacity-75 transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/10 via-zinc-950/15 to-zinc-950/85" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_78%_32%,rgba(168,85,247,0.14),transparent_30%)]" />

                    <div className="absolute left-5 top-5 flex items-center gap-3 rounded-full border border-white/10 bg-zinc-950/65 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-100 backdrop-blur-md">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/70" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
                      </span>
                      {t.contact.location}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <div className="flex items-end justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-950/55 p-4 backdrop-blur-md">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                            {locationCardEyebrow}
                          </p>
                          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-200">
                            {locationCardNote}
                          </p>
                        </div>

                        <div className="shrink-0 rounded-full border border-cyan-400/25 bg-cyan-400/10 p-3 text-cyan-200 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </SpotlightCard>

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
            <SpotlightCard className="p-8 rounded-3xl relative z-10">
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
              </form>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
