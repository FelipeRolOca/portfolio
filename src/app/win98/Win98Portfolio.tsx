import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Window } from './components/Window';
import { DesktopIcon } from './components/DesktopIcon';
import { Taskbar } from './components/Taskbar';
import { AboutContent } from './components/AboutContent';
import { SkillsContent } from './components/SkillsContent';
import { ExperienceContent } from './components/ExperienceContent';
import { ProjectsContent } from './components/ProjectsContent';
import { ContactContent } from './components/ContactContent';
import { Win98CursorLayer } from './components/Win98CursorLayer';
import {
  UserIcon,
  CodeIcon,
  BriefcaseIcon,
  FolderIcon,
  MailIcon,
} from './components/PixelIcons';

type WindowType = 'about' | 'skills' | 'experience' | 'projects' | 'contact' | 'welcome';

function DesktopContent() {
  const { t } = useLanguage();
  const [openWindows, setOpenWindows] = useState<WindowType[]>(['welcome']);
  const [windowPositions, setWindowPositions] = useState<Record<WindowType, { x: number; y: number }>>({} as Record<WindowType, { x: number; y: number }>);
  const [selectedIcon, setSelectedIcon] = useState<WindowType | null>(null);
  const [iconPositions, setIconPositions] = useState<Record<WindowType, { x: number; y: number }>>({
    welcome: { x: 20, y: 20 },
    about: { x: 20, y: 120 },
    skills: { x: 20, y: 220 },
    experience: { x: 20, y: 320 },
    projects: { x: 20, y: 420 },
    contact: { x: 20, y: 520 },
  } as Record<WindowType, { x: number; y: number }>);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (windowType: WindowType) => {
    if (!openWindows.includes(windowType)) {
      // Set initial centered position for the window
      const sizes: Record<WindowType, { width: number; height: number }> = {
        welcome: { width: 500, height: 420 },
        about: { width: 700, height: 600 },
        skills: { width: 800, height: 650 },
        experience: { width: 700, height: 600 },
        projects: { width: 750, height: 650 },
        contact: { width: 650, height: 600 },
      };
      const size = sizes[windowType];
      const position = {
        x: window.innerWidth / 2 - size.width / 2,
        y: window.innerHeight / 2 - size.height / 2,
      };
      setWindowPositions(prev => ({ ...prev, [windowType]: position }));
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
    };
    return titles[type];
  };

  const desktopIcons = [
    {
      id: 'welcome' as WindowType,
      icon: <UserIcon />,
      label: t('Welcome', 'Bienvenido'),
    },
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

      {/* Desktop icons - draggable */}
      <div 
        className="absolute inset-0 p-4 pb-12"
        onClick={() => setSelectedIcon(null)}
      >
        {desktopIcons.map((icon) => (
          <div key={icon.id} onClick={(e) => e.stopPropagation()}>
            <DesktopIcon
              icon={icon.icon}
              label={icon.label}
              onDoubleClick={() => openWindow(icon.id)}
              position={iconPositions[icon.id]}
              onPositionChange={(pos) => setIconPositions(prev => ({ ...prev, [icon.id]: pos }))}
              isSelected={selectedIcon === icon.id}
              onSelect={() => setSelectedIcon(icon.id)}
            />
          </div>
        ))}
      </div>

      {/* Windows 98 cursors */}
      <Win98CursorLayer />

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
              position={windowPositions['welcome']}
              onPositionChange={(pos) => setWindowPositions(prev => ({ ...prev, welcome: pos }))}
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
                    className="px-4 py-2 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-r-[#dfdfdf] active:border-b-[#404040] text-sm font-bold"
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
                  ðŸ’¡ {t('Double-click desktop icons to explore', 'Haz doble clic en los iconos del escritorio para explorar')}
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
              position={windowPositions['about']}
              onPositionChange={(pos) => setWindowPositions(prev => ({ ...prev, about: pos }))}
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
              position={windowPositions['skills']}
              onPositionChange={(pos) => setWindowPositions(prev => ({ ...prev, skills: pos }))}
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
              position={windowPositions['experience']}
              onPositionChange={(pos) => setWindowPositions(prev => ({ ...prev, experience: pos }))}
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
              position={windowPositions['projects']}
              onPositionChange={(pos) => setWindowPositions(prev => ({ ...prev, projects: pos }))}
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
              position={windowPositions['contact']}
              onPositionChange={(pos) => setWindowPositions(prev => ({ ...prev, contact: pos }))}
              defaultSize={{ width: 650, height: 600 }}
            >
              <ContactContent />
            </Window>
          </motion.div>
        )}
      </AnimatePresence>

      <Taskbar openWindows={openWindows.map(getWindowTitle)} time={time} />
    </div>
  );
}

export function Win98Portfolio() {
  return (
    <LanguageProvider>
      <DesktopContent />
    </LanguageProvider>
  );
}
