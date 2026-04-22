import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { UIModeProvider } from './contexts/UIModeContext';
import { Window } from './components/Window';
import { DesktopIcon } from './components/DesktopIcon';
import { Taskbar } from './components/Taskbar';
import { AboutContent } from './components/AboutContent';
import { SkillsContent } from './components/SkillsContent';
import { ExperienceContent } from './components/ExperienceContent';
import { ProjectsContent } from './components/ProjectsContent';
import { ContactContent } from './components/ContactContent';
import { ResumeContent } from './components/ResumeContent';
import { CustomCursor } from './components/CustomCursor';
import {
  UserIcon,
  CodeIcon,
  BriefcaseIcon,
  FolderIcon,
  MailIcon,
  FileIcon,
} from './components/PixelIcons';

type WindowType = 'about' | 'skills' | 'experience' | 'projects' | 'contact' | 'resume' | 'welcome';

function DesktopContent() {
  const { t } = useLanguage();
  const [openWindows, setOpenWindows] = useState<WindowType[]>(['welcome']);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (windowType: WindowType) => {
    if (!openWindows.includes(windowType)) {
      setOpenWindows([...openWindows, windowType]);
    }
  };

  const closeWindow = (windowType: WindowType) => {
    setOpenWindows(openWindows.filter((w) => w !== windowType));
  };

  const getWindowTitle = (type: WindowType): string => {
    const titles = {
      welcome: t('Welcome', 'Bienvenido'),
      about: t('About Me', 'Sobre Mí'),
      skills: t('Skills', 'Habilidades'),
      experience: t('Experience', 'Experiencia'),
      projects: t('Projects', 'Proyectos'),
      contact: t('Contact', 'Contacto'),
      resume: t('Resume', 'CV'),
    };
    return titles[type];
  };

  const desktopIcons = [
    {
      id: 'about' as WindowType,
      icon: <UserIcon />,
      label: t('About Me', 'Sobre Mí'),
    },
    {
      id: 'skills' as WindowType,
      icon: <CodeIcon />,
      label: t('Skills', 'Habilidades'),
    },
    {
      id: 'experience' as WindowType,
      icon: <BriefcaseIcon />,
      label: t('Experience', 'Experiencia'),
    },
    {
      id: 'projects' as WindowType,
      icon: <FolderIcon />,
      label: t('Projects', 'Proyectos'),
    },
    {
      id: 'contact' as WindowType,
      icon: <MailIcon />,
      label: t('Contact', 'Contacto'),
    },
    {
      id: 'resume' as WindowType,
      icon: <FileIcon />,
      label: t('Resume', 'CV'),
    },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Windows 98 style wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(0, 180, 180, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(0, 100, 150, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #008080 0%, #006666 50%, #004444 100%)
          `,
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Desktop icons grid */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-4 p-4 pb-12 content-start">
        {desktopIcons.map((icon) => (
          <div key={icon.id}>
            <DesktopIcon
              icon={icon.icon}
              label={icon.label}
              onDoubleClick={() => openWindow(icon.id)}
            />
          </div>
        ))}
      </div>

      {/* Custom cursor */}
      <CustomCursor />

      <AnimatePresence mode="popLayout">
        {openWindows.includes('welcome') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <Window
              title={getWindowTitle('welcome')}
              onClose={() => closeWindow('welcome')}
              defaultPosition={{ x: window.innerWidth / 2 - 250, y: window.innerHeight / 2 - 200 }}
              defaultSize={{ width: 500, height: 420 }}
            >
              <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] flex items-center justify-center">
                    <div className="scale-150">
                      <UserIcon />
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#000080] mb-2 tracking-tight">
                    {t('Hi, I\'m Felipe.', 'Hola, soy Felipe.')}
                  </h1>
                  <p className="text-sm text-gray-800 max-w-xs leading-relaxed">
                    {t(
                      'Full Stack Developer and Computer Engineering Student',
                      'Desarrollador Full Stack y Estudiante de Ingeniería Informática'
                    )}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => openWindow('projects')}
                    className="px-4 py-2 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] text-sm font-bold"
                  >
                    {t('View Projects', 'Ver Proyectos')}
                  </button>
                  <button
                    onClick={() => openWindow('contact')}
                    className="px-4 py-2 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] text-sm font-bold"
                  >
                    {t('Contact Me', 'Contáctame')}
                  </button>
                </div>
                <div className="bg-[#ffffcc] border border-[#808080] p-2 text-xs text-gray-800">
                  💡 {t('Double-click desktop icons to explore', 'Haz doble clic en los iconos del escritorio para explorar')}
                </div>
              </div>
            </Window>
          </motion.div>
        )}

        {openWindows.includes('about') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
          >
            <Window
              title={getWindowTitle('about')}
              onClose={() => closeWindow('about')}
              defaultPosition={{ x: 150, y: 100 }}
              defaultSize={{ width: 700, height: 600 }}
            >
              <AboutContent />
            </Window>
          </motion.div>
        )}

        {openWindows.includes('skills') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
          >
            <Window
              title={getWindowTitle('skills')}
              onClose={() => closeWindow('skills')}
              defaultPosition={{ x: 200, y: 120 }}
              defaultSize={{ width: 800, height: 650 }}
            >
              <SkillsContent />
            </Window>
          </motion.div>
        )}

        {openWindows.includes('experience') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
          >
            <Window
              title={getWindowTitle('experience')}
              onClose={() => closeWindow('experience')}
              defaultPosition={{ x: 250, y: 140 }}
              defaultSize={{ width: 700, height: 600 }}
            >
              <ExperienceContent />
            </Window>
          </motion.div>
        )}

        {openWindows.includes('projects') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
          >
            <Window
              title={getWindowTitle('projects')}
              onClose={() => closeWindow('projects')}
              defaultPosition={{ x: 180, y: 110 }}
              defaultSize={{ width: 750, height: 650 }}
            >
              <ProjectsContent />
            </Window>
          </motion.div>
        )}

        {openWindows.includes('contact') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
          >
            <Window
              title={getWindowTitle('contact')}
              onClose={() => closeWindow('contact')}
              defaultPosition={{ x: 220, y: 130 }}
              defaultSize={{ width: 650, height: 600 }}
            >
              <ContactContent />
            </Window>
          </motion.div>
        )}

        {openWindows.includes('resume') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
          >
            <Window
              title={getWindowTitle('resume')}
              onClose={() => closeWindow('resume')}
              defaultPosition={{ x: 270, y: 150 }}
              defaultSize={{ width: 600, height: 550 }}
            >
              <ResumeContent />
            </Window>
          </motion.div>
        )}
      </AnimatePresence>

      <Taskbar openWindows={openWindows.map(getWindowTitle)} time={time} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <UIModeProvider>
        <DesktopContent />
      </UIModeProvider>
    </LanguageProvider>
  );
}