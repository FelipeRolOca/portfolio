import { motion, useInView } from 'motion/react';
import { useMemo, useRef } from 'react';
import { Briefcase, Calendar, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import type { Translation, Language } from '../App';

interface ExperienceProps {
  t: Translation['experience'];
  language: Language;
}

export default function Experience({ t, language }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const copy = useMemo(
    () => ({
      stats:
        language === 'es'
          ? [
              { label: 'Experiencias reales', value: '3' },
              { label: 'En produccion desde', value: '2025' },
              { label: 'Foco actual', value: 'Producto + automatizacion' },
            ]
          : [
              { label: 'Real engagements', value: '3' },
              { label: 'Shipping since', value: '2025' },
              { label: 'Current focus', value: 'Product + automation' },
            ],
      highlightsLabel: language === 'es' ? 'Puntos clave' : 'Highlights',
      stackLabel: language === 'es' ? 'Stack y herramientas' : 'Stack and tools',
      impactLabel: language === 'es' ? 'Resultado' : 'Outcome',
    }),
    [language]
  );

  const experiences = [
    {
      role: language === 'es' ? 'Desarrollador Frontend Freelance' : 'Freelance Frontend Developer',
      company: 'Paper Pops',
      date: language === 'es' ? '2026 - Presente' : '2026 - Present',
      location: language === 'es' ? 'Remoto' : 'Remote',
      summary:
        language === 'es'
          ? 'Tienda online para productos creativos con foco en catalogo visual, experiencia de compra clara y una base escalable para seguir lanzando productos.'
          : 'Online shop for creative products focused on visual merchandising, a clear purchase flow, and a scalable storefront for new launches.',
      impact:
        language === 'es'
          ? 'Se paso de una presencia simple a una experiencia e-commerce mas cuidada, preparada para mostrar catalogo, gestionar pagos y crecer con nuevas colecciones.'
          : 'Moved from a simple presence to a more polished e-commerce experience ready to showcase products, process payments, and grow with new collections.',
      stack: ['React', 'JavaScript', 'Stripe', 'Firebase', 'Responsive UI'],
      achievements:
        language === 'es'
          ? [
              'Diseno de una tienda visual con jerarquia clara para productos destacados',
              'Flujo de compra mas directo con integracion de pagos y mejor navegacion',
              'Ajustes responsive para que el catalogo se vea bien en mobile y desktop',
              'Base preparada para sumar nuevas colecciones y contenido comercial',
            ]
          : [
              'Built a visual storefront with clearer hierarchy for featured products',
              'Simplified the purchase flow with payments integration and better navigation',
              'Responsive polish so the catalog works well on mobile and desktop',
              'Prepared the foundation for new collections and future marketing content',
            ],
    },
    {
      role: language === 'es' ? 'Desarrollador Full Stack' : 'Full Stack Developer',
      company: language === 'es' ? 'JJAsist (Proyecto Freelance)' : 'JJAsist (Freelance Project)',
      date: language === 'es' ? '2026 - Presente' : '2026 - Present',
      location: language === 'es' ? 'Remoto' : 'Remote',
      summary:
        language === 'es'
          ? 'Sistema de asistencia y operacion en campo con lectura de QR, validacion GPS y panel administrativo para seguimiento diario.'
          : 'Attendance and field-operations platform with QR scans, GPS validation, and an admin workspace for daily oversight.',
      impact:
        language === 'es'
          ? 'Se transformo un flujo manual de control horario en una herramienta digital con reportes y validaciones automaticas.'
          : 'Turned a manual attendance workflow into a digital tool with automated validation and reporting.',
      stack: ['Next.js', 'React', 'Supabase', 'Google Apps Script', 'Vercel', 'GPS / QR'],
      achievements:
        language === 'es'
          ? [
              'Lectura de QR y codigo de barras para fichadas mas rapidas',
              'Validacion GPS para reforzar el control de ubicacion',
              'Panel administrativo para empleados, reportes y configuraciones',
              'Automatizacion de reportes y sincronizacion operativa',
            ]
          : [
              'QR and barcode scanning for faster check-ins',
              'GPS validation to strengthen location control',
              'Admin workspace for employees, reports, and settings',
              'Automated reporting and operational sync flows',
            ],
    },
    {
      role: language === 'es' ? 'Desarrollador Web Freelance' : 'Freelance Web Developer',
      company: 'JJ Servicios Empresariales',
      date: language === 'es' ? '2025 - Presente' : '2025 - Present',
      location: language === 'es' ? 'Remoto' : 'Remote',
      summary:
        language === 'es'
          ? 'Sitio institucional para consultora de RRHH con WordPress y Elementor, orientado a claridad comercial, captacion de consultas y presencia digital.'
          : 'Corporate website for an HR consultancy built with WordPress and Elementor, focused on clarity, lead capture, and stronger digital presence.',
      impact:
        language === 'es'
          ? 'Se entrego una presencia web mas profesional, responsive y mejor organizada para presentar servicios y generar contactos.'
          : 'Delivered a more professional, responsive web presence to present services clearly and generate inquiries.',
      stack: ['WordPress', 'Elementor', 'SEO On-Page', 'Responsive Design'],
      achievements:
        language === 'es'
          ? [
              'Maquetacion visual en Elementor con estructura comercial clara',
              'Optimizacion SEO on-page y jerarquia de contenidos',
              'Formularios de contacto, version mobile y ajustes de rendimiento',
            ]
          : [
              'Visual layout in Elementor with clearer commercial structure',
              'Improved on-page SEO and content hierarchy',
              'Contact forms, mobile polish, and performance adjustments',
            ],
    },
  ];

  return (
    <section id="experience" ref={ref} className="px-6 py-12 md:py-20 transition-colors duration-1000">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-black dark:text-white md:text-5xl">
            {t.title}
          </h2>
          <div className="mx-auto mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)]" />
          <p className="text-lg text-black dark:text-white">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mb-8 md:mb-12 grid gap-3 md:gap-4 md:grid-cols-3"
        >
          {copy.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.5rem] border border-[var(--yellow)]/16 bg-white/88 p-4 md:p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#111317]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--yellow-dark)]">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        <div className="relative pl-6 md:pl-12">
          <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[var(--yellow)] via-[var(--yellow)]/50 to-transparent md:left-4" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.article
                key={exp.company}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                className="relative"
              >
                <div className="absolute -left-10 md:-left-[2.45rem] top-8 z-10 flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full border border-[var(--yellow)]/20 bg-white shadow-[0_10px_26px_rgba(255,220,0,0.15)] dark:bg-[#111317]">
                  <Sparkles size={16} className="text-[var(--yellow-dark)]" />
                </div>

                <div className="overflow-hidden rounded-[1.8rem] border border-[var(--yellow)]/16 bg-white/92 shadow-[0_20px_55px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-[#111317] dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
                  <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="border-b border-[var(--yellow)]/12 bg-[linear-gradient(180deg,rgba(255,220,0,0.08),transparent_100%)] p-6 dark:border-white/8 lg:border-b-0 lg:border-r">
                      <div className="mb-5 flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] shadow-[0_10px_24px_rgba(255,220,0,0.2)]">
                          <Briefcase className="text-black" size={22} />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                          <p className="mt-1 text-base font-semibold text-[var(--yellow-dark)]">{exp.company}</p>
                        </div>
                      </div>

                      <div className="mb-5 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-2">
                          <Calendar size={15} />
                          {exp.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin size={15} />
                          {exp.location}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{exp.summary}</p>

                      <div className="mt-6 rounded-[1.25rem] border border-[var(--yellow)]/14 bg-white/70 p-4 dark:bg-white/4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--yellow-dark)]">{copy.impactLabel}</p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{exp.impact}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--yellow-dark)]">{copy.highlightsLabel}</p>
                        <div className="mt-4 space-y-3">
                          {exp.achievements.map((achievement) => (
                            <div key={achievement} className="flex items-start gap-3">
                              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--yellow-dark)]" />
                              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{achievement}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-7 border-t border-gray-200/80 pt-5 dark:border-white/8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--yellow-dark)]">{copy.stackLabel}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.stack.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-[var(--yellow)]/18 bg-[var(--yellow)]/10 px-3 py-1 text-sm font-medium text-[var(--yellow-dark)]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
