import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink, Code2, Database, Globe, Smartphone, QrCode, Cpu } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export type Language = 'en' | 'es';

export interface Translation {
  nav: {
    about: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    description: string;
    cta1: string;
    cta2: string;
  };
  about: {
    title: string;
    description: string;
    age: string;
    education: string;
    location: string;
    englishLevel: string;
    focus: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  experience: {
    title: string;
    subtitle: string;
    present: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    or: string;
  };
  footer: {
    rights: string;
  };
}

const translations: Record<Language, Translation> = {
  es: {
    nav: {
      about: 'Acerca de',
      skills: 'Competencias',
      experience: 'Experiencia',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      greeting: 'Soy',
      name: 'Felipe Roldán Ocampo',
      role: 'Desarrollador Full Stack',
      description: 'Desarrollo soluciones digitales escalables mediante tecnologías modernas y arquitecturas eficientes orientadas al ecosistema empresarial',
      cta1: 'Ver Proyectos',
      cta2: 'Contactar',
    },
    about: {
      title: 'Perfil Profesional',
      description: 'Desarrollador Full Stack especializado en la construcción de sistemas web escalables, automatización de procesos empresariales y soluciones tecnológicas orientadas a la optimización operativa. Experiencia en desarrollo frontend y backend con enfoque en arquitecturas modernas.',
      age: 'Edad',
      education: 'Formación',
      location: 'Ubicación',
      englishLevel: 'Nivel de Inglés',
      focus: 'Área de Especialización',
    },
    skills: {
      title: 'Competencias Técnicas',
      subtitle: 'Tecnologías y herramientas de desarrollo',
    },
    experience: {
      title: 'Trayectoria Profesional',
      subtitle: 'Experiencia y proyectos desarrollados',
      present: 'Actualidad',
    },
    projects: {
      title: 'Proyectos Destacados',
      subtitle: 'Desarrollos y soluciones implementadas',
      viewProject: 'Ver Proyecto',
    },
    contact: {
      title: 'Contacto Profesional',
      subtitle: 'Disponible para colaboraciones y oportunidades',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      or: 'o comuníquese directamente',
    },
    footer: {
      rights: 'Todos los derechos reservados',
    },
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      greeting: 'I am',
      name: 'Felipe Roldán Ocampo',
      role: 'Full Stack Developer',
      description: 'Building scalable digital solutions through modern technologies and efficient architectures focused on enterprise ecosystems',
      cta1: 'View Projects',
      cta2: 'Contact',
    },
    about: {
      title: 'Professional Profile',
      description: 'Full Stack Developer specialized in building scalable web systems, business process automation, and technology solutions focused on operational optimization. Experience in frontend and backend development with emphasis on modern architectures.',
      age: 'Age',
      education: 'Education',
      location: 'Location',
      englishLevel: 'English Level',
      focus: 'Specialization Area',
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'Development technologies and tools',
    },
    experience: {
      title: 'Professional Background',
      subtitle: 'Experience and developed projects',
      present: 'Present',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Developments and implemented solutions',
      viewProject: 'View Project',
    },
    contact: {
      title: 'Professional Contact',
      subtitle: 'Available for collaborations and opportunities',
      name: 'Full Name',
      email: 'Email Address',
      message: 'Message',
      send: 'Send Message',
      or: 'or contact directly',
    },
    footer: {
      rights: 'All rights reserved',
    },
  },
};

export default function App() {
  const [language, setLanguage] = useState<Language>('es');
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar language={language} toggleLanguage={toggleLanguage} t={t.nav} />
      <Hero t={t.hero} />
      <About t={t.about} language={language} />
      <Skills t={t.skills} />
      <Experience t={t.experience} language={language} />
      <Projects t={t.projects} language={language} />
      <Contact t={t.contact} language={language} />
      <Footer t={t.footer} language={language} />
    </div>
  );
}
