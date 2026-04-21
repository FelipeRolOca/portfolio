import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import type { Translation, Language } from '../App';

interface ExperienceProps {
  t: Translation['experience'];
  language: Language;
}

export default function Experience({ t, language }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const experiences = [
    {
      role: language === 'es' ? 'Desarrollador Full Stack' : 'Full Stack Developer',
      company: 'JJ Servicios Empresariales',
      date: language === 'es' ? '2023 - Actualidad' : '2023 - Present',
      location: language === 'es' ? 'Argentina' : 'Argentina',
      summary: language === 'es'
        ? 'Desarrollo de soluciones tecnológicas integrales para optimización de procesos empresariales'
        : 'Development of comprehensive technology solutions for business process optimization',
      achievements: language === 'es'
        ? [
            'Desarrollo de la plataforma JJAsist para gestión empresarial integral',
            'Implementación de sistemas de validación geoespacial y códigos QR',
            'Construcción de arquitecturas escalables con Next.js y Supabase',
            'Automatización de procesos mediante Google Apps Script',
          ]
        : [
            'Development of JJAsist platform for comprehensive business management',
            'Implementation of geospatial validation and QR code systems',
            'Building scalable architectures with Next.js and Supabase',
            'Process automation through Google Apps Script',
          ],
    },
    {
      role: language === 'es' ? 'Desarrollador Frontend' : 'Frontend Developer',
      company: 'Paper Pops',
      date: '2022 - 2023',
      location: language === 'es' ? 'Remoto' : 'Remote',
      summary: language === 'es'
        ? 'Desarrollo de plataformas de comercio electrónico y experiencias web interactivas'
        : 'Development of e-commerce platforms and interactive web experiences',
      achievements: language === 'es'
        ? [
            'Desarrollo de plataforma e-commerce responsiva con React',
            'Optimización de rendimiento y experiencia de usuario',
            'Integración de sistemas de pago y gestión de inventario',
            'Implementación de diseños con precisión técnica',
          ]
        : [
            'Development of responsive e-commerce platform with React',
            'Performance optimization and user experience enhancement',
            'Integration of payment systems and inventory management',
            'Implementation of designs with technical precision',
          ],
    },
  ];

  return (
    <section id="experience" ref={ref} className="py-20 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[var(--yellow)]/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] mx-auto rounded-full mb-4" />
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--yellow)] to-[var(--yellow-glow)] transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1" />

                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[var(--yellow)] rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 z-10" />

                <motion.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(255, 220, 0, 0.2)',
                  }}
                  className="flex-1 bg-white rounded-xl p-6 border border-gray-200 hover:border-[var(--yellow)] transition-all ml-8 md:ml-0"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] flex items-center justify-center flex-shrink-0">
                      <Briefcase className="text-black" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.role}</h3>
                      <p className="text-lg text-[var(--yellow-dark)] font-semibold mb-2">{exp.company}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{exp.summary}</p>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="text-[var(--yellow-dark)] flex-shrink-0 mt-0.5" size={16} />
                        <p className="text-sm text-gray-600">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
