import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Code2, Database, Globe, QrCode, ChevronLeft, ChevronRight, Server } from 'lucide-react';
import type { Translation } from '../App';
import { CardTilt, CardTiltContent } from './ui/CardTilt';

interface SkillsProps {
  t: Translation['skills'];
}

export default function Skills({ t }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentPage, setCurrentPage] = useState(0);

  const skills = [
    {
      name: 'GitHub',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    },
    {
      name: 'Next.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    },
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'Java',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    },
    {
      name: 'SQL',
      icon: Database,
      isLucide: true,
    },
    {
      name: 'Supabase',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    },
    {
      name: 'Vercel',
      icon: Server,
      isLucide: true,
    },
    {
      name: 'HTML',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    },
    {
      name: 'CSS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    },
    {
      name: 'Google Apps Script',
      icon: Code2,
      isLucide: true,
    },
    {
      name: 'QR / Barcode',
      icon: QrCode,
      isLucide: true,
    },
    {
      name: 'GPS',
      icon: Globe,
      isLucide: true,
    },
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(skills.length / itemsPerPage);
  const currentSkills = skills.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="skills" ref={ref} className="py-20 px-6 bg-white">
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
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 md:gap-6"
          >
            {currentSkills.map((skill, index) => (
              <div key={`${currentPage}-${index}`} className="aspect-square">
                <CardTilt
                  className="h-full"
                  tiltMaxAngle={12}
                  scale={1.08}
                >
                  <CardTiltContent className="h-full">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[var(--yellow)] shadow-lg hover:shadow-[0_15px_35px_rgba(255,220,0,0.25)] transition-all group flex flex-col items-center justify-center gap-3 h-full"
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] flex items-center justify-center shadow-md group-hover:shadow-[0_8px_20px_rgba(255,220,0,0.4)] transition-all">
                        {skill.isLucide ? (
                          <skill.icon className="text-black" size={28} />
                        ) : (
                          <img src={skill.icon} alt={skill.name} className="w-8 h-8 md:w-9 md:h-9 object-contain" />
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 text-center text-sm md:text-base">{skill.name}</h3>
                    </motion.div>
                  </CardTiltContent>
                </CardTilt>
              </div>
            ))}
          </motion.div>

          {totalPages > 1 && (
            <>
              <button
                onClick={prevPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-[var(--yellow)] flex items-center justify-center hover:bg-[var(--yellow)] hover:shadow-[0_0_20px_rgba(255,220,0,0.5)] transition-all z-10"
                aria-label="Previous skills"
              >
                <ChevronLeft className="text-gray-900" size={20} />
              </button>

              <button
                onClick={nextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-[var(--yellow)] flex items-center justify-center hover:bg-[var(--yellow)] hover:shadow-[0_0_20px_rgba(255,220,0,0.5)] transition-all z-10"
                aria-label="Next skills"
              >
                <ChevronRight className="text-gray-900" size={20} />
              </button>

              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentPage
                        ? 'bg-[var(--yellow)] w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
