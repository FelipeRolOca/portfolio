export type Language = 'es' | 'en'

export const messages = {
  es: {
    meta: {
      title: 'Felipe Roldán Ocampo | Desarrollador Full Stack & Automatización',
      description:
        'Desarrollador Full Stack y estudiante de Ingeniería Informática especializado en soluciones web, sistemas internos y automatización de procesos para empresas.',
    },
    navbar: {
      about: 'Sobre Mí',
      services: 'Servicios',
      skills: 'Habilidades',
      experience: 'Experiencia',
      projects: 'Proyectos',
      contact: 'Contacto',
      cta: 'Hablemos',
      toggleLang: 'English',
      toggleLangShort: 'EN',
    },
    hero: {
      badge: 'Disponible para oportunidades laborales y proyectos',
      nameFirst: 'Felipe',
      nameMiddle: 'Roldán',
      nameLast: 'Ocampo',
      specialty: 'Full Stack Developer · Automatización de Procesos',
      valueProp:
        'Desarrollo aplicaciones web, sistemas internos y automatizaciones que ayudan a empresas a reducir tareas manuales, centralizar información y mejorar sus procesos.',
      projectsBtn: 'Ver Proyectos',
      contactBtn: 'Hablemos',
      stats: {
        projects: '6+',
        projectsLabel: 'Proyectos',
        clients: '3+',
        clientsLabel: 'Clientes',
        automations: '10+',
        automationsLabel: 'Automatizaciones',
      },
    },
    quickFacts: {
      title: 'Datos Clave',
      education: {
        label: 'Educación',
        value: 'Ing. Informática',
        unit: 'Estudiante',
      },
      location: {
        label: 'Ubicación',
        value: 'Argentina',
        unit: 'San Pedro, BA',
      },
      english: {
        label: 'Inglés',
        value: 'Nivel B2',
        unit: 'B2',
      },
      specialty: {
        label: 'Especialidad',
        value: 'Full Stack',
        unit: 'Automatización',
      },
    },
    pillars: [
      {
        title: 'Desarrollo Web',
        description:
          'Sitios corporativos, plataformas y aplicaciones web modernas, responsivas y optimizadas para resultados comerciales.',
      },
      {
        title: 'Sistemas y Automatización',
        description:
          'Automatización de tareas repetitivas, procesos internos, reportes e integraciones fluidas entre herramientas.',
      },
      {
        title: 'Datos e Integraciones',
        description:
          'Bases de datos, APIs, validaciones, sincronización en tiempo real y paneles administrativos para decisiones informadas.',
      },
    ],
    about: {
      sectionLabel: '01 — Sobre Mí',
      title1: 'Transformo necesidades',
      title2: 'en soluciones digitales',
      p1: 'Soy desarrollador Full Stack y estudiante de Ingeniería Informática. Me especializo en transformar necesidades de negocio en soluciones digitales concretas: desde sitios web y aplicaciones hasta sistemas internos y automatizaciones.',
      p2: 'Mi enfoque no se limita a desarrollar una interfaz. Analizo el proceso que existe detrás de una necesidad, identifico tareas que pueden optimizarse y construyo herramientas que permiten centralizar información, reducir trabajo manual y mejorar la operación.',
      howIWorkLabel: 'Metodología',
      howIWorkTitle: 'Cómo Trabajo',
      steps: [
        {
          title: '1. Entender el problema',
          desc: 'Antes de desarrollar, busco entender qué necesita realmente la persona o empresa y cómo funciona actualmente su proceso.',
        },
        {
          title: '2. Construir la solución',
          desc: 'Diseño y desarrollo aplicaciones, sitios, sistemas y automatizaciones adaptadas a cada necesidad concreta.',
        },
        {
          title: '3. Implementar y optimizar',
          desc: 'Desarrollo la solución, pruebo su funcionamiento y la preparo para que pueda mantenerse y evolucionar a medida que cambien las necesidades del proyecto.',
        },
      ],
      problemSolvingTitle: 'Resolución de problemas',
      problemSolvingDesc:
        'Me interesa entender cómo funciona un proceso y encontrar formas de simplificarlo mediante software y automatización.',
    },
    services: {
      sectionLabel: '02 — Soluciones Digitales',
      title1: 'Soluciones que puedo',
      title2: 'desarrollar',
      items: [
        {
          title: 'Sitios web',
          desc: 'Sitios corporativos, landing pages, portfolios y plataformas adaptadas a las necesidades de cada proyecto.',
        },
        {
          title: 'Aplicaciones web',
          desc: 'Sistemas con autenticación, paneles administrativos, bases de datos y lógica de negocio a medida.',
        },
        {
          title: 'Automatización de procesos',
          desc: 'Automatización de tareas repetitivas, generación de reportes, procesamiento de información e integraciones.',
        },
        {
          title: 'Sistemas a medida',
          desc: 'Soluciones diseñadas alrededor de operaciones específicas, desde la gestión de datos hasta el control operativo.',
        },
      ],
      problemsTitle1: '¿Tenés un proceso que todavía',
      problemsTitle2: 'hacés manualmente?',
      problemsSubtitle: 'Puedo ayudarte a digitalizar procesos y acelerar tareas como:',
      problems: [
        'Carga y organización de información',
        'Generación automática de reportes',
        'Gestión de empleados o clientes',
        'Control de asistencia con GPS y QR',
        'Formularios y recepción de datos',
        'Procesos que requieren validaciones',
        'Integración entre distintas herramientas',
        'Paneles para visualizar métricas clave',
        'Sitios web y plataformas corporativas',
      ],
    },
    skills: {
      sectionLabel: '03 — Tecnologías',
      title1: 'Tecnologías y',
      title2: 'herramientas',
      subtitle:
        'Tecnologías que utilizo para desarrollar aplicaciones, sistemas y automatizaciones orientadas a resolver necesidades reales.',
      howIUseLabel: 'Cómo utilizo esto',
      groups: [
        {
          category: 'Desarrollo Frontend',
          icon: '⬡',
          items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3 / Tailwind'],
          note: 'Aplicaciones web responsivas, plataformas corporativas y paneles interactivos con lógica moderna.',
        },
        {
          category: 'Backend y Bases de Datos',
          icon: '◈',
          items: ['SQL', 'PostgreSQL', 'Supabase', 'MongoDB', 'Neo4j', 'Oracle'],
          note: 'Diseño de esquemas, consultas optimizadas y gestión de información estructurada y no estructurada.',
        },
        {
          category: 'Automatización e Integración',
          icon: '⚡',
          items: [
            'Google Apps Script',
            'REST APIs',
            'QR / Códigos de barras',
            'Validación GPS',
            'Webhooks',
            'Node.js',
          ],
          note: 'Automatización de reportes, flujos administrativos, sincronización de servicios y validaciones de campo.',
        },
        {
          category: 'Herramientas y Despliegue',
          icon: '◎',
          items: ['Git / GitHub', 'Vercel', 'VS Code', 'Vite', 'WordPress', 'Linux'],
          note: 'Parte de mi flujo de trabajo diario para desarrollo ágil, control de versiones y entrega continua.',
        },
      ],
    },
    experience: {
      sectionLabel: '04 — Experiencia',
      title1: 'Trayectoria',
      title2: 'Profesional',
      outcomeLabel: 'Resultado',
      items: [
        {
          period: '2026 — Presente',
          role: 'Desarrollador Full Stack',
          company: 'JJAsist (Proyecto Freelance / SaaS)',
          description:
            'Sistema de asistencia y control horario con identificación mediante QR, validación geográfica y registro centralizado de operaciones.',
          bullets: [
            'Desarrollo full stack con Next.js, Supabase y Vercel',
            'Implementación de validación de ubicación precisa mediante coordenadas GPS',
            'Integración de lectura de códigos QR dinámicos y códigos de barras',
            'Panel administrativo para gestionar empleados, reportes y configuraciones',
            'Automatización de reportes y sincronización mediante Google Apps Script',
            'Integración entre diferentes servicios para digitalizar procesos',
          ],
          tags: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
          outcome:
            'Transformé un proceso manual de asistencia en una plataforma web centralizada, con validación de ubicación, gestión administrativa y automatización de reportes.',
        },
        {
          period: '2025 — Presente',
          role: 'Desarrollador Web Freelance',
          company: 'JJ Servicios Empresariales',
          description:
            'Desarrollo de una presencia digital profesional para una consultora de Recursos Humanos, orientada a mejorar su presentación online, facilitar el contacto con potenciales clientes y estructurar sus servicios de forma clara.',
          bullets: [
            'Desarrollo de sitio web responsive utilizando tecnologías web modernas',
            'Arquitectura de información y organización de servicios corporativos',
            'Optimización para motores de búsqueda (SEO) y alto rendimiento',
            'Formularios de contacto y catálogo interactivo de servicios',
          ],
          tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'SEO'],
          outcome:
            'Desarrollé un sitio corporativo orientado a presentar los servicios de forma clara y facilitar el contacto con potenciales clientes.',
        },
      ],
    },
    projects: {
      sectionLabel: '05 — Proyectos',
      title1: 'Trabajo',
      title2: 'Destacado',
      visitWebsite: 'Visitar Sitio',
      visitPortal: 'Visitar Portal',
      showDetails: 'Ver detalles',
      hideDetails: 'Ocultar detalles',
      roleLabel: 'Rol',
      problemLabel: 'Problema Resuelto',
      valueLabel: 'Por Qué Importa',
      associatedPortals: 'Portales Asociados',
      badgePrincipal: 'Principal',
      badgeBeta: 'Fase Beta',
      items: [
        {
          title: 'JJAsist',
          category: 'Proyecto Principal / SaaS',
          subtitle: 'Plataforma de Asistencia y Control Horario',
          description:
            'Sistema de asistencia y control horario con identificación mediante QR dinámico, validación geográfica GPS y registro centralizado de operaciones. Automatización de reportes con Google Apps Script.',
          tech: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
          url: 'https://jj-asist.vercel.app/',
          featured: true,
          image: '/jj-asist-logo.png',
          meta: {
            role: 'Desarrollador Full Stack',
            problem:
              'Controlar la asistencia de forma confiable con validación de ubicación GPS y reducir tiempos de reporte manual.',
            value:
              'Transforma un proceso manual en una plataforma centralizada en tiempo real.',
          },
        },
        {
          title: 'JJ Servicios Empresariales',
          category: 'Desarrollo Web / Cliente Real',
          subtitle: 'Portal Corporativo de Recursos Humanos',
          description:
            'Sitio corporativo orientado a presentar los servicios de forma clara, optimizar el posicionamiento SEO y facilitar el contacto directo con potenciales clientes corporativos.',
          tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'SEO'],
          url: 'https://jjserviciosempresarialesrrhh.com/',
          featured: false,
          image: '/Rehace_el_logo_202604262015.jpeg',
          meta: {
            role: 'Desarrollador Web',
            problem:
              'Presentar servicios profesionales de forma clara y accesible para clientes corporativos potenciales.',
            value:
              'Facilita el contacto con potenciales clientes a través de una presencia profesional.',
          },
        },
        {
          title: 'JJHire & JJBusca',
          category: 'Plataforma en Desarrollo / Beta',
          subtitle: 'Sistema Dual de Contratación y Gestión de Talento',
          description:
            'Plataforma de contratación compuesta por dos portales complementarios: JJHire (para postulantes) y JJBusca (para administradores) para consultar y gestionar búsquedas laborales.',
          tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
          url: '',
          featured: false,
          image: '/jj-hire-busca-placeholder.png',
          meta: {
            role: 'Desarrollador Full Stack',
            problem:
              'Facilitar el envío de CV para postulantes y agilizar las búsquedas administrativas de perfiles.',
            value:
              'Conecta la postulación pública con el panel administrativo de gestión de talento.',
          },
          portals: [
            {
              name: 'JJHire',
              url: 'https://jj-hire.vercel.app/',
              desc: 'Portal público para que los postulantes envíen su CV y apliquen a búsquedas laborales.',
              isBeta: true,
            },
            {
              name: 'JJBusca',
              url: 'https://jj-busca.vercel.app/',
              desc: 'Portal administrativo para que reclutadores y administradores busquen y gestionen los currículums recibidos.',
              isBeta: true,
            },
          ],
        },
        {
          title: 'Paper Pops',
          category: 'Proyecto Experimental / Frontend',
          subtitle: 'Frontend Creativo e Interactivo',
          description:
            'Aplicación web completa construida con React, Vite y Motion. Explora animaciones e interfaces interactivas avanzadas.',
          tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
          url: 'https://paper-pops.vercel.app/',
          featured: false,
          image: '/paper-pops-preview.jpeg',
          meta: {
            role: 'Frontend Developer',
            problem: 'Mostrar una identidad digital creativa a través de animaciones e interacción.',
            value:
              'Refleja capacidad frontend y dirección visual pulida.',
          },
        },
      ],
    },
    contact: {
      sectionLabel: '06 — Contacto',
      title1: 'Trabajemos',
      title2: 'Juntos',
      leadBold:
        '¿Tenés una idea, un proceso que querés mejorar o una tarea que todavía hacés manualmente?',
      leadText:
        'Puedo ayudarte a convertir una idea, necesidad o proceso manual en una solución digital: desde un sitio web profesional hasta una aplicación, sistema interno o automatización diseñada para tu negocio.',
      emailLabel: 'Email',
      phoneLabel: 'Teléfono / WhatsApp',
      locationLabel: 'Ubicación',
      locationValue: 'San Pedro, Buenos Aires, Argentina',
      nameField: 'Nombre',
      namePlaceholder: 'Tu nombre y apellido',
      emailField: 'Email',
      emailPlaceholder: 'correo@ejemplo.com',
      subjectField: 'Asunto',
      subjectPlaceholder: '¿En qué te puedo ayudar?',
      messageField: 'Mensaje',
      messagePlaceholder: 'Contame sobre tu proyecto, proceso o necesidad...',
      sendBtn: 'Enviar Mensaje',
      toastSuccess: '¡Redirigiendo a tu cliente de email!',
      whatsappOption: 'WhatsApp Directo',
      callOption: 'Llamar por teléfono',
      smsOption: 'Enviar SMS',
    },
    footer: {
      brandName: 'Felipe Roldán Ocampo',
      brandSubtitle: 'Full Stack Developer · Automatización de Procesos',
      rightsReserved: 'Todos los derechos reservados.',
    },
  },
  en: {
    meta: {
      title: 'Felipe Roldán Ocampo | Full Stack Developer & Automation',
      description:
        'Full Stack Developer and Computer Engineering student specializing in web solutions, internal systems, and business process automation.',
    },
    navbar: {
      about: 'About',
      services: 'Services',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      cta: "Let's Talk",
      toggleLang: 'Español',
      toggleLangShort: 'ES',
    },
    hero: {
      badge: 'Available for opportunities & projects',
      nameFirst: 'Felipe',
      nameMiddle: 'Roldán',
      nameLast: 'Ocampo',
      specialty: 'Full Stack Developer · Process Automation',
      valueProp:
        'I build web applications, internal systems, and automations that help businesses reduce manual tasks, centralize information, and streamline operations.',
      projectsBtn: 'View Projects',
      contactBtn: "Let's Talk",
      stats: {
        projects: '6+',
        projectsLabel: 'Projects',
        clients: '3+',
        clientsLabel: 'Clients',
        automations: '10+',
        automationsLabel: 'Automations',
      },
    },
    quickFacts: {
      title: 'Quick Facts',
      education: {
        label: 'Education',
        value: 'Computer Eng.',
        unit: 'Student',
      },
      location: {
        label: 'Location',
        value: 'Argentina',
        unit: 'San Pedro, BA',
      },
      english: {
        label: 'English',
        value: 'Level B2',
        unit: 'B2',
      },
      specialty: {
        label: 'Specialty',
        value: 'Full Stack',
        unit: 'Automation',
      },
    },
    pillars: [
      {
        title: 'Web Development',
        description:
          'Corporate websites, platforms, and modern, responsive web applications optimized for business outcomes.',
      },
      {
        title: 'Systems & Automation',
        description:
          'Automation of repetitive tasks, internal workflows, reports, and seamless tool integrations.',
      },
      {
        title: 'Data & Integrations',
        description:
          'Databases, APIs, validations, real-time sync, and admin panels for informed business decisions.',
      },
    ],
    about: {
      sectionLabel: '01 — About Me',
      title1: 'Transforming needs',
      title2: 'into digital solutions',
      p1: 'I am a Full Stack Developer and Computer Engineering student specializing in turning business needs into concrete digital solutions: from websites to internal tools and process automation.',
      p2: 'My focus goes beyond code. I analyze underlying business processes, identify optimization opportunities, and build tools that centralize data and reduce manual overhead.',
      howIWorkLabel: 'Methodology',
      howIWorkTitle: 'How I Work',
      steps: [
        {
          title: '1. Understand the problem',
          desc: 'Before writing code, I thoroughly analyze the underlying business process and actual operational needs.',
        },
        {
          title: '2. Build the solution',
          desc: 'I design and build web apps, internal tools, and automations tailored to specific business requirements.',
        },
        {
          title: '3. Implement and optimize',
          desc: 'I deploy the solution, test operations, and ensure it is ready to scale and evolve as business needs grow.',
        },
      ],
      problemSolvingTitle: 'Problem Solving',
      problemSolvingDesc:
        'I focus on understanding operational workflows and streamlining them through software and automation.',
    },
    services: {
      sectionLabel: '02 — Digital Solutions',
      title1: 'Digital Solutions',
      title2: 'I Can Build',
      items: [
        {
          title: 'Websites',
          desc: 'Corporate websites, landing pages, portfolios, and web platforms tailored to business needs.',
        },
        {
          title: 'Web Applications',
          desc: 'Custom systems with authentication, admin dashboards, databases, and tailored business logic.',
        },
        {
          title: 'Process Automation',
          desc: 'Automation of repetitive tasks, automated reporting, data processing, and tool integrations.',
        },
        {
          title: 'Custom Systems',
          desc: 'Tailored software built around specific operational workflows, from data management to field controls.',
        },
      ],
      problemsTitle1: 'Do you have a process still',
      problemsTitle2: 'handled manually?',
      problemsSubtitle: 'I can help you digitize processes and streamline tasks like:',
      problems: [
        'Data entry & information management',
        'Automated report generation',
        'Employee or client management',
        'Attendance tracking with GPS & QR',
        'Forms & data intake systems',
        'Multi-step validation workflows',
        'Third-party tool integrations',
        'Key metric visualization dashboards',
        'Corporate websites & web platforms',
      ],
    },
    skills: {
      sectionLabel: '03 — Tech Stack',
      title1: 'Technologies &',
      title2: 'Tools',
      subtitle:
        'Technologies I use to build applications, systems, and automations designed to solve real business needs.',
      howIUseLabel: 'How I use this',
      groups: [
        {
          category: 'Frontend Development',
          icon: '⬡',
          items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3 / Tailwind'],
          note: 'Responsive web applications, corporate platforms, and interactive dashboards.',
        },
        {
          category: 'Backend & Databases',
          icon: '◈',
          items: ['SQL', 'PostgreSQL', 'Supabase', 'MongoDB', 'Neo4j', 'Oracle'],
          note: 'Schema design, query optimization, and structured data management.',
        },
        {
          category: 'Automation & Integration',
          icon: '⚡',
          items: [
            'Google Apps Script',
            'REST APIs',
            'QR / Barcode Scanning',
            'GPS Validation',
            'Webhooks',
            'Node.js',
          ],
          note: 'Report automation, administrative workflows, and field validations.',
        },
        {
          category: 'Tools & Deployment',
          icon: '◎',
          items: ['Git / GitHub', 'Vercel', 'VS Code', 'Vite', 'WordPress', 'Linux'],
          note: 'Daily developer workflow for agile delivery and continuous integration.',
        },
      ],
    },
    experience: {
      sectionLabel: '04 — Experience',
      title1: 'Professional',
      title2: 'Track Record',
      outcomeLabel: 'Outcome',
      items: [
        {
          period: '2026 — Present',
          role: 'Full Stack Developer',
          company: 'JJAsist (Freelance / SaaS Project)',
          description:
            'Attendance & time-tracking web system with QR verification, GPS geo-validation, and centralized management dashboards.',
          bullets: [
            'Full stack development with Next.js, Supabase, and Vercel',
            'GPS coordinate location validation for field clock-ins',
            'Dynamic QR & barcode scanning integration',
            'Admin dashboard for employee management and reporting',
            'Automated reports via Google Apps Script',
          ],
          tags: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
          outcome:
            'Transformed a manual attendance process into a centralized web platform with location validation and automated reporting.',
        },
        {
          period: '2025 — Present',
          role: 'Freelance Web Developer',
          company: 'JJ Servicios Empresariales',
          description:
            'Developed a professional digital presence for an HR consultancy, focused on presenting services clearly and facilitating contact with corporate clients.',
          bullets: [
            'Responsive website built with modern React frameworks',
            'Information architecture & service catalog structuring',
            'SEO optimization & high performance',
            'Contact forms & interactive catalog',
          ],
          tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'SEO'],
          outcome:
            'Built a corporate website designed to clearly present HR services and facilitate client inquiries.',
        },
      ],
    },
    projects: {
      sectionLabel: '05 — Projects',
      title1: 'Featured',
      title2: 'Work',
      visitWebsite: 'Visit Website',
      visitPortal: 'Visit Portal',
      showDetails: 'View details',
      hideDetails: 'Hide details',
      roleLabel: 'Role',
      problemLabel: 'Problem Solved',
      valueLabel: 'Why It Matters',
      associatedPortals: 'Associated Portals',
      badgePrincipal: 'Featured',
      badgeBeta: 'Beta Phase',
      items: [
        {
          title: 'JJAsist',
          category: 'Main Project / SaaS',
          subtitle: 'Attendance & Time-Tracking System',
          description:
            'Time-tracking web platform with dynamic QR code verification, GPS location validation, and admin reporting dashboard.',
          tech: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
          url: 'https://jj-asist.vercel.app/',
          featured: true,
          image: '/jj-asist-logo.png',
          meta: {
            role: 'Full Stack Developer',
            problem:
              'Track field staff attendance with GPS location validation and eliminate manual timecard entry.',
            value:
              'Replaces manual workflows with a real-time centralized web platform.',
          },
        },
        {
          title: 'JJ Servicios Empresariales',
          category: 'Web Development / Client Work',
          subtitle: 'HR Consultancy Corporate Portal',
          description:
            'Corporate portal built for an HR consultancy to present services clearly, optimize SEO, and handle client inquiries.',
          tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'SEO'],
          url: 'https://jjserviciosempresarialesrrhh.com/',
          featured: false,
          image: '/Rehace_el_logo_202604262015.jpeg',
          meta: {
            role: 'Web Developer',
            problem:
              'Present corporate HR services clearly and establish a professional online inquiries channel.',
            value:
              'Facilitates corporate lead intake through a structured digital presence.',
          },
        },
        {
          title: 'JJHire & JJBusca',
          category: 'In Development / Beta',
          subtitle: 'Recruitment & Talent Management Platform',
          description:
            'Two-part hiring platform: JJHire (public portal for candidates to submit CVs) and JJBusca (admin portal for recruiters to search and manage applications).',
          tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
          url: '',
          featured: false,
          image: '/jj-hire-busca-placeholder.png',
          meta: {
            role: 'Full Stack Developer',
            problem:
              'Streamline public CV submissions for candidates and expedite candidate searches for recruiters.',
            value:
              'Connects public candidate applications directly to an admin talent management system.',
          },
          portals: [
            {
              name: 'JJHire',
              url: 'https://jj-hire.vercel.app/',
              desc: 'Public portal for candidates to submit CVs and apply for job openings.',
              isBeta: true,
            },
            {
              name: 'JJBusca',
              url: 'https://jj-busca.vercel.app/',
              desc: 'Admin portal enabling recruiters to query and manage candidate CVs.',
              isBeta: true,
            },
          ],
        },
        {
          title: 'Paper Pops',
          category: 'Experimental / Frontend Project',
          subtitle: 'Creative & Interactive Frontend',
          description:
            'Full web application built with React, Vite, and Motion exploring advanced UI interactions and animations.',
          tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
          url: 'https://paper-pops.vercel.app/',
          featured: false,
          image: '/paper-pops-preview.jpeg',
          meta: {
            role: 'Frontend Developer',
            problem: 'Demonstrate creative digital branding through interactive UI animations.',
            value:
              'Highlights UI design capability and polished visual direction.',
          },
        },
      ],
    },
    contact: {
      sectionLabel: '06 — Contact',
      title1: "Let's Work",
      title2: 'Together',
      leadBold:
        'Do you have an operational process or workflow that is still handled manually?',
      leadText:
        'I can help turn your idea, requirement, or manual workflow into a digital solution: from a professional corporate website to a web app, internal tool, or custom automation.',
      emailLabel: 'Email',
      phoneLabel: 'Phone / WhatsApp',
      locationLabel: 'Location',
      locationValue: 'San Pedro, Buenos Aires, Argentina',
      nameField: 'Name',
      namePlaceholder: 'Your full name',
      emailField: 'Email',
      emailPlaceholder: 'email@example.com',
      subjectField: 'Subject',
      subjectPlaceholder: 'How can I help you?',
      messageField: 'Message',
      messagePlaceholder: 'Tell me about your project, process, or goals...',
      sendBtn: 'Send Message',
      toastSuccess: 'Redirecting to your email client!',
      whatsappOption: 'Direct WhatsApp',
      callOption: 'Call via Phone',
      smsOption: 'Send SMS',
    },
    footer: {
      brandName: 'Felipe Roldán Ocampo',
      brandSubtitle: 'Full Stack Developer · Process Automation',
      rightsReserved: 'All rights reserved.',
    },
  },
}
