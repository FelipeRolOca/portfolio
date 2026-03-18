import { motion } from "motion/react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { BorderBeam } from "./ui/BorderBeam";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "JJAsist (Freelance Project)",
    period: "2026 - Present",
    location: "Remote",
    description: "Developed a comprehensive employee attendance tracking system with real-time QR and barcode scanning, GPS location validation, and a powerful admin dashboard.",
    bullets: [
      "Built with Next.js, Supabase, and Vercel for scalable deployment",
      "Integrated Google Apps Script for automated reporting and data sync",
      "Implemented QR/barcode scanning and GPS validation for accurate attendance",
      "Created admin panel for managing employees, reports, and system settings"
    ]
  },
  {
    role: "Freelance Web Developer",
    company: "JJ Servicios Empresariales",
    period: "2025 - Present",
    location: "Remote",
    description: "Designed and developed a professional business website for an HR services company, focusing on modern UI/UX and SEO optimization.",
    bullets: [
      "Built responsive website using modern web technologies",
      "Optimized for search engines and performance",
      "Implemented contact forms and business service showcases"
    ]
  },
  {
    role: "Administrative Assistant",
    company: "Corporate Services",
    period: "2025 - 2026",
    location: "Office",
    description: "Managed data entry, organized employee payroll, and streamlined internal communication processes.",
    bullets: [
      "Developed automated scripts to reduce manual data handling time",
      "Managed employee payroll and administrative documentation",
      "Improved internal communication and data organization workflows"
    ]
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">My Journey</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Work Experience</h3>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line timeline */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-zinc-800 transform md:-translate-x-1/2" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2 }}
              className={`relative flex items-start mb-12 last:mb-0 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              {/* Center Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-zinc-950 transform -translate-x-1/2 mt-1.5 md:mt-0 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

              {/* Content Box */}
              <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${idx % 2 === 0 ? "md:pr-14 md:text-right" : "md:pl-14 md:text-left"
                }`}>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors shadow-lg shadow-black/20 relative overflow-hidden group">
                  <BorderBeam size={150} duration={10} delay={idx * 0.5} />
                  <h4 className="text-xl font-bold text-white mb-2">{exp.role}</h4>
                  <div className={`flex flex-wrap items-center gap-4 mb-4 text-sm text-zinc-400 ${idx % 2 === 0 ? "md:justify-end" : "md:justify-start"
                    }`}>
                    <span className="flex items-center gap-1 font-medium text-blue-400">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-sm sm:text-base mb-4">
                    {exp.description}
                  </p>
                  <ul className={`space-y-2 ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className={`text-zinc-500 text-sm flex items-start gap-2 ${idx % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""
                        }`}>
                        <span className="text-cyan-400 mt-1.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
