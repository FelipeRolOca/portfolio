import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
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
    <section id="skills" ref={ref} className="bg-white px-6 py-20 transition-colors duration-1000 dark:bg-gray-900">
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
          <InfiniteCanvas
            className="relative h-[540px] w-full md:h-[620px]"
            cardWidth={250}
            cardHeight={176}
            spacing={24}
            showControls={true}
            showZoom={true}
            showStatus={true}
            showInstructions={true}
          >
            {skills.map((skill) => (
              <Card key={skill.name} className="rounded-[1.35rem] border-[var(--yellow)]/12 p-5">
                <div className="flex h-full flex-col justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--yellow)] to-[var(--yellow-glow)] shadow-[0_10px_24px_rgba(255,220,0,0.24)]">
                      {skill.isLucide ? (
                        <skill.icon className="text-black" size={28} />
                      ) : (
                        <img src={skill.icon} alt={skill.name} className="h-8 w-8 object-contain" />
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
        </motion.div>
      </div>
    </section>
  );
}
