import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { User, GraduationCap, MapPin, Languages, Target, Calendar } from 'lucide-react';
import type { Translation, Language } from '../App';
import { CardTilt, CardTiltContent } from './ui/CardTilt';

interface AboutProps {
  t: Translation['about'];
  language: Language;
}

export default function About({ t, language }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { icon: Calendar, label: t.age, value: '20' },
    {
      icon: GraduationCap,
      label: t.education,
      value: language === 'es' ? 'Ingeniería en Informática' : 'Computer Engineering'
    },
    { icon: MapPin, label: t.location, value: 'San Pedro, Buenos Aires, Argentina' },
    { icon: Languages, label: t.englishLevel, value: 'B2' },
    {
      icon: Target,
      label: t.focus,
      value: language === 'es' ? 'Sistemas web y automatización' : 'Web systems and automation'
    },
  ];

  return (
    <section id="about" ref={ref} className="py-20 px-6 bg-white">

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)] mx-auto rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12"
        >
          {t.description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="h-full">
              <CardTilt
                className="h-full"
                tiltMaxAngle={10}
                scale={1.05}
              >
                <CardTiltContent className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(255, 220, 0, 0.2)' }}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[var(--yellow)] transition-all group h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(255,220,0,0.4)] transition-shadow">
                        <stat.icon className="text-black" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                        <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </motion.div>
                </CardTiltContent>
              </CardTilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
