export interface ProjectDefinition {
  id: string
  code: string
  title: string
  subtitle: { es: string; en: string }
  description: { es: string; en: string }
  tech: string[]
  url: string
  image: string
  featured: boolean
  isBeta?: boolean
  betaNotice?: { es: string; en: string }
}

export const PROJECTS_DATA: ProjectDefinition[] = [
  {
    id: 'jj-asist',
    code: 'JJA',
    title: 'JJAsist',
    subtitle: {
      es: 'Plataforma SaaS de Asistencia',
      en: 'SaaS Workforce & Attendance Platform',
    },
    description: {
      es: 'Solución integral para registro de asistencia laboral con fichaje por QR dinámico, validación de ubicación geográfica GPS y sincronización de planillas en Google Sheets.',
      en: 'End-to-end workforce management SaaS featuring anti-spoofing dynamic QR check-ins, GPS geofencing verification, and automated Google Sheets sync.',
    },
    tech: ['Next.js', 'Supabase', 'Vercel', 'Google Apps Script', 'Tailwind CSS'],
    url: 'https://jj-asist.vercel.app/',
    image: '/02-proyecto-jjasist.png',
    featured: true,
  },
  {
    id: 'deportivo-sport',
    code: 'DSP',
    title: 'Deportivo Sport',
    subtitle: {
      es: 'Tienda Online & Catálogo Deportivo',
      en: 'Athletic Wear E-Commerce & Catalog',
    },
    description: {
      es: 'Tienda online y catálogo interactivo de indumentaria deportiva y urbana con selector dinámico de talles y colores, derivación directa de pedidos a WhatsApp y panel administrativo.',
      en: 'Interactive athletic and streetwear e-commerce platform featuring real-time size and color selectors, instant WhatsApp order routing, and inventory management.',
    },
    tech: ['React', 'Vite', 'Tailwind CSS', 'E-commerce', 'WhatsApp API'],
    url: 'https://deportivosport.vercel.app/',
    image: '/13-proyecto-deportivosport.png',
    featured: true,
  },
  {
    id: 'oscar-cuero',
    code: 'OSC',
    title: 'OSCAR — Puro Cuero',
    subtitle: {
      es: 'Marroquinería & Generador de Contenido',
      en: 'Artisanal Leather E-Commerce & AI Marketing Suite',
    },
    description: {
      es: 'E-commerce y catálogo artesanal de marroquinería y calzado con panel administrativo integrado que incluye un generador de contenido (flyers, banners, historias y copies) para automatizar el marketing en redes sociales de los dueños.',
      en: 'Direct-to-consumer artisanal leather e-commerce platform paired with an administrative content engine generating on-brand social media campaigns, banners, and copywriting.',
    },
    tech: ['React', 'Vite', 'Tailwind CSS', 'Social Content Generator', 'SEO'],
    url: 'https://oscarpurocuero-delta.vercel.app/',
    image: '/03-proyecto-oscar.png',
    featured: true,
  },
  {
    id: 'jj-servicios',
    code: 'JJS',
    title: 'JJ Servicios Empresariales',
    subtitle: {
      es: 'Sitio Corporativo RRHH',
      en: 'Corporate HR Consulting Platform',
    },
    description: {
      es: 'Plataforma institucional para consultora de Recursos Humanos. Presentación clara de servicios, maquetación responsive moderna y optimización SEO.',
      en: 'High-conversion corporate presence for human resources consultancy, engineered with responsive performance architecture and technical SEO optimization.',
    },
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'SEO'],
    url: 'https://jjserviciosempresarialesrrhh.com/',
    image: '/04-proyecto-jjservicios.jpg',
    featured: false,
  },
  {
    id: 'paper-pops',
    code: 'POP',
    title: 'Paper Pops',
    subtitle: {
      es: 'Tienda Online / E-commerce',
      en: 'Online Retail Store & Catalog',
    },
    description: {
      es: 'Tienda online y catálogo de Paper Pops. Diseño visual atractivo, navegación fluida de productos y experiencia de compra optimizada.',
      en: 'Digital storefront and interactive catalog featuring optimized buyer journeys, seamless mobile navigation, and modern visual branding.',
    },
    tech: ['React', 'Vite', 'Tailwind CSS', 'E-commerce'],
    url: 'https://paperpops.vercel.app/',
    image: '/05-proyecto-paperpops.png',
    featured: true,
  },
  {
    id: 'sofia-moya',
    code: 'SOF',
    title: 'Sofia Moya',
    subtitle: {
      es: 'Portafolio — Diseñadora Gráfica y Digital',
      en: 'Graphic & Digital Designer Portfolio',
    },
    description: {
      es: 'Portafolio personal de Sofia Moya, diseñadora gráfica y digital especializada en identidad visual, branding y diseño de logos. Diseño y desarrollo completo del sitio.',
      en: 'Bespoke design portfolio engineered for a brand identity specialist, delivering smooth transitions, curated case studies, and editorial-grade typography.',
    },
    tech: ['React', 'Vite', 'CSS', 'Branding', 'Diseño Gráfico'],
    url: 'https://sofia-moya.vercel.app/',
    image: '/06-proyecto-sofiamoya.png',
    featured: false,
  },
  {
    id: 'jj-hire',
    code: 'JJH',
    title: 'JJHire',
    subtitle: {
      es: 'Portal de Postulantes',
      en: 'Talent Acquisition & ATS Dashboard',
    },
    isBeta: true,
    betaNotice: {
      es: 'Versión Beta — Diseño estético no terminado / en desarrollo',
      en: 'Beta Release — Active development / UI polish in progress',
    },
    description: {
      es: 'Sistema administrativo para selectores y reclutadores que facilita la búsqueda de perfiles, filtrado de currículums y gestión de búsquedas.',
      en: 'Streamlined ATS enabling recruiters to parse resumes, filter candidate profiles, and manage end-to-end hiring pipelines in real time.',
    },
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    url: 'https://jj-hire.vercel.app/',
    image: '/07-proyecto-placeholder.png',
    featured: false,
  },
  {
    id: 'jj-busca',
    code: 'JJB',
    title: 'JJBusca',
    subtitle: {
      es: 'Portal de Reclutadores',
      en: 'Candidate Career Portal',
    },
    isBeta: true,
    betaNotice: {
      es: 'Versión Beta — Diseño estético no terminado / en desarrollo',
      en: 'Beta Release — Active development / UI polish in progress',
    },
    description: {
      es: 'Portal de empleo para candidatos donde pueden cargar su CV, explorar ofertas laborales vigentes y realizar postulaciones en línea.',
      en: 'Public-facing job board allowing candidates to explore active openings, upload credentials, and track application statuses seamlessly.',
    },
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel', 'Admin Dashboard'],
    url: 'https://jj-busca.vercel.app/',
    image: '/07-proyecto-placeholder.png',
    featured: false,
  },
]
