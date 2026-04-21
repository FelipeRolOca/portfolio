import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Code2, Database, Globe, PanelsTopLeft, QrCode, Server, type LucideIcon } from 'lucide-react';
import type { Translation } from '../App';
import { Card, InfiniteCanvas } from './ui/infinite-canvas';

interface SkillsProps {
  t: Translation['skills'];
}

type SkillItem = {
  name: string;
  detail: string;
  icon: string | LucideIcon;
  isLucide?: boolean;
};

export default function Skills({ t }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    // Add a slight delay for initial render measurement
    setTimeout(updateWidth, 100);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const skills: SkillItem[] = [
    {
      name: 'GitHub',
      detail: 'Control de versiones y colaboracion',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    },
    {
      name: 'Next.js',
      detail: 'Apps y sitios full stack',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    },
    {
      name: 'React',
      detail: 'Interfaces dinamicas y componentes',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'JavaScript',
      detail: 'Logica de producto y frontend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      name: 'Python',
      detail: 'Scripts, automatizacion y backend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'Java',
      detail: 'Base academica y programacion estructurada',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    },
    {
      name: 'SQL',
      detail: 'Datos, consultas y modelado',
      icon: Database,
      isLucide: true,
    },
    {
      name: 'Supabase',
      detail: 'Base de datos y auth',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    },
    {
      name: 'Vercel',
      detail: 'Deploy y hosting moderno',
      icon: Server,
      isLucide: true,
    },
    {
      name: 'WordPress',
      detail: 'Sitios institucionales y gestion de contenido',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
    },
    {
      name: 'Elementor',
      detail: 'Maquetacion visual y landings',
      icon: PanelsTopLeft,
      isLucide: true,
    },
    {
      name: 'Google Apps Script',
      detail: 'Procesos y reportes automatizados',
      icon: Code2,
      isLucide: true,
    },
    {
      name: 'QR / Barcode',
      detail: 'Lectura y validacion operativa',
      icon: QrCode,
      isLucide: true,
    },
    {
      name: 'GPS',
      detail: 'Ubicacion y chequeos en campo',
      icon: Globe,
      isLucide: true,
    },
  ];

  return (
    <section id="skills" ref={ref} className="bg-white px-6 py-12 md:py-20 transition-colors duration-1000 dark:bg-gray-900">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-300 md:text-5xl">
            {t.title}
          </h2>
          <div className="mx-auto mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--yellow)] to-[var(--yellow-glow)]" />
          <p className="text-lg text-gray-600 dark:text-gray-300">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12 }}
        >
          <div className="hidden md:block">
            <InfiniteCanvas
              className="relative h-[320px] w-full md:h-[480px]"
              cardWidth={218}
              cardHeight={150}
              spacing={16}
              showControls={false}
              showZoom={false}
              showStatus={false}
              showInstructions={false}
            >
            {skills.map((skill) => (
              <Card key={skill.name} className="rounded-[1.35rem] border-[var(--yellow)]/12 p-5">
                <div className="flex h-full flex-col justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] shadow-[0_10px_24px_rgba(255,220,0,0.24)]">
                      {skill.isLucide ? (
                        <skill.icon className="text-black" size={28} />
                      ) : (
                        <img src={skill.icon} alt={skill.name} className="h-8 w-8 object-contain" loading="lazy" decoding="async" draggable={false} />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--yellow-dark)]">
                        Skill
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{skill.detail}</p>
                </div>
              </Card>
            ))}
            </InfiniteCanvas>
          </div>

          <div className="mt-12 overflow-hidden -mx-6 px-6 pb-8" ref={carouselRef}>
            <motion.div 
              drag="x"
              dragConstraints={{ right: 0, left: -carouselWidth }}
              dragElastic={0.15}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
              whileTap={{ cursor: "grabbing" }}
              className="flex gap-4 cursor-grab touch-pan-y"
            >
              {skills.map((skill) => (
                <div key={skill.name} className="shrink-0 w-[280px]">
                  <div className="relative group rounded-[1.35rem] border border-[var(--yellow)]/12 p-5 bg-white/92 shadow-[0_14px_34px_rgba(15,23,42,0.1)] dark:bg-[#111315]/94 dark:shadow-[0_14px_40px_rgba(0,0,0,0.28)] h-full overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255,255,255,0.28), rgba(255,220,0,0.16) 18%, transparent 56%)',
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,220,0,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.35),transparent_26%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,220,0,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_24%)]" />
                    
                    <div className="flex h-[130px] flex-col justify-between gap-4 relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] shadow-[0_10px_24px_rgba(255,220,0,0.24)]">
                          {skill.isLucide ? (
                            <skill.icon className="text-black" size={28} />
                          ) : (
                            <img src={skill.icon} alt={skill.name} className="h-8 w-8 object-contain" loading="lazy" decoding="async" draggable={false} />
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--yellow-dark)]">
                            Skill
                          </p>
                          <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{skill.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
