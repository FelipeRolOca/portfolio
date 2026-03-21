import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";
import { FloatingParticles } from "./ui/FloatingParticles";
import { useState } from "react";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextReveal } from "./ui/TextReveal";
import { Magnetic } from "./ui/Magnetic";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-blue-400" />,
      title: "Email",
      value: "felipeoca123@hotmail.com",
      link: "mailto:felipeoca123@hotmail.com"
    },
    {
      icon: <Phone className="w-6 h-6 text-cyan-400" />,
      title: "Phone",
      value: "+54 9 3329 523459",
      link: "tel:+5493329523459"
    },
    {
      icon: <MapPin className="w-6 h-6 text-emerald-400" />,
      title: "Location",
      value: "San Pedro, Buenos Aires, Argentina",
      link: ""
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
      <FloatingParticles />
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">Get In Touch</h2>
          <TextReveal text="Let's Work Together" className="text-3xl md:text-4xl font-bold text-white justify-center" />
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
              <h4 className="text-2xl font-bold text-white mb-4">Ready for new opportunities.</h4>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                I'm currently looking for trainee or junior roles in IT to grow professionally. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <Magnetic key={idx} strength={0.2}>
                  <SpotlightCard data-particle-target>
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
                  </SpotlightCard>
                </Magnetic>
              ))}
            </div>

            {/* Live Links */}
            <div className="pt-6 border-t border-zinc-800">
              <h5 className="text-sm font-medium text-zinc-500 mb-4">Live Projects</h5>
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
            <SpotlightCard data-particle-target className="p-8 rounded-3xl relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-400">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-400">Your Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <Magnetic>
                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/25"
                  >
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </Magnetic>
              </form>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
