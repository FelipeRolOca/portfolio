# Guía de Referencia e Identidad Visual — Felipe Roldán Ocampo (FRO)

Este documento centraliza todas las especificaciones de diseño, identidad visual, paleta cromática, reglas de negocio y catálogo de assets para el nuevo portafolio web de **Felipe Roldán Ocampo (FRO)**.

---

## 1. Distribución y Sistema de Color (Color Distribution)

La interfaz y el sistema de diseño deben seguir **estrictamente** las proporciones porcentuales definidas en la guía de identidad visual:

| Porcentaje | Nombre del Color | Hex Code | Uso y Aplicación Estricta |
| :--- | :--- | :--- | :--- |
| **40%** | **Secondary Accent (Deep Sea Green)** | `#075056` | Fondos de secciones principales, tarjetas contenedoras, elementos de diseño secundarios, bordes sutiles y divisiones estructurales. |
| **30%** | **Primary Background (Mirage)** | `#16232A` | Lienzo principal del tema oscuro, sección Hero, fondo global de la página (`body`), áreas de fondo de máxima profundidad. |
| **20%** | **Typography / Neutral (Wild Sand)** | `#E4EEF0` | Texto principal del cuerpo, títulos, descripciones de secciones, tipografía clara, íconos pasivos y texto de alta legibilidad. |
| **10%** | **Call-to-Action Accent (Blaze Orange)** | `#FF5B04` | **Uso exclusivo y reservado**: Botones primarios (CTAs), estados activos, micro-interacciones destacadas e íconos críticos. **NO SOBREUTILIZAR**. |

### Variables CSS Tokens
```css
:root {
  /* Core Brand Palette */
  --bg-primary: #16232A;       /* 30% Mirage */
  --bg-secondary: #075056;     /* 40% Deep Sea Green */
  --text-neutral: #E4EEF0;     /* 20% Wild Sand */
  --accent-cta: #FF5B04;       /* 10% Blaze Orange */
  
  /* Derived Tokens for UI */
  --bg-surface: #0b383c;
  --bg-surface-elevated: #0f464b;
  --border-subtle: rgba(228, 238, 240, 0.12);
  --border-active: #FF5B04;
  --text-muted: rgba(228, 238, 240, 0.7);
  --text-dimmed: rgba(228, 238, 240, 0.45);
}
```

---

## 2. Identidad de Marca y Naming

- **Nombre Profesional**: Felipe Roldán Ocampo
- **Acrónimo / Logomarca**: FRO
- **Concepto Visual**: Cubo isométrico 3D con caras tipográficas e iconográficas tecnológicas (F, R, botón de encendido / nodo de conexión / huella digital).
- **Tipografía de Marca**: Tipografía geométrica redondeada bold / display para encabezados y sans-serif moderna de alta legibilidad (Inter / Outfit / Plus Jakarta Sans) para cuerpo de texto.

---

## 3. Catálogo de Recursos Gráficos y Assets (`public/`)

### Identidad Visual y Logotipos
- `/public/Foto Perfil definitiva.png`: Fotografía de perfil oficial de Felipe Roldán Ocampo para Hero y sección Sobre Mí.
- `/public/FRO-20260808T183313Z-1-001/FRO/IDENTIDAD VISUAL.png`: Póster de identidad visual con paleta y proporciones.
- `/public/FRO-20260808T183313Z-1-001/FRO/LOGO 1.png`: Isotipo de cubo FRO sobre fondo Deep Sea Green `#075056`.
- `/public/FRO-20260808T183313Z-1-001/FRO/LOGO 2.png`: Isotipo de cubo FRO sobre fondo Mirage `#16232A`.
- `/public/FRO-20260808T183313Z-1-001/FRO/LOGO 3.png`: Isotipo de cubo FRO sobre fondo Blaze Orange `#FF5B04`.
- `/public/FRO-20260808T183313Z-1-001/FRO/LOGO NOMBRE 2.png`: Tipografía de bloque "FELIPE ROLDAN OCAMPO" (Wild Sand sobre Mirage).
- `/public/FRO-20260808T183313Z-1-001/FRO/LOGO NOMBRE 3.png`: Tipografía de bloque "FELIPE ROLDAN OCAMPO" (Mirage sobre Wild Sand).

### Elementos Gráficos Isométricos
- `/public/FRO-20260808T183313Z-1-001/FRO/ELEMENTO GRAFICO 1.png`: Cubo isométrico con huella digital.
- `/public/FRO-20260808T183313Z-1-001/FRO/ELEMENTO GRAFICO 2.png`: Cubo isométrico con botón de encendido.
- `/public/FRO-20260808T183313Z-1-001/FRO/ELEMENTO GRAFICO 3.png`: Cubo isométrico con nodo de red / compartir.

### Fondos y Patrones
- `/public/FRO-20260808T183313Z-1-001/FRO/FONDO LARGO.png`: Patrón continuo de cubos isométricos para fondos verticales y banners.
- `/public/FRO-20260808T183313Z-1-001/FRO/FONDO CUADRADO.png`: Patrón cuadrado para tarjetas o secciones destacadas.
- `/public/FRO-20260808T183313Z-1-001/FRO/FONDO RECTANGULO HORIZONTAL.png`: Banner horizontal decorativo.
- `/public/FRO-20260808T183313Z-1-001/FRO/FONDO RECTANGULO VERTICAL.png`: Banner lateral o de fondo.

### Imágenes de Proyectos
- `/public/jj-asist-logo.png`: Logo JJ Asist.
- `/public/jj-hire-busca-placeholder.png`: Mockup / preview JJ Hire.
- `/public/paper-pops-preview.jpeg`: Preview de Paper Pops.

---

## 4. Reglas Estrictas de Desarrollo y Negocio

1. **Prohibición de `alert()` Nativos**:
   - NUNCA usar `window.alert()`, `confirm()` ni `prompt()`.
   - Utilizar únicamente componentes UI accesibles (modales Radix/Shadcn, toasts con `sonner` o micro-notificaciones estilizadas).

2. **Regla Estricta sobre Funcionalidades / Copy**:
   - **NUNCA** mencionar que ninguna aplicación utiliza "Biometría" o "Reconocimiento Facial" (ni en textos de publicidad, ni en código, ni en el portafolio/landing).
   - Los fichajes y autenticaciones se describen únicamente a través de **GPS y Código QR Dinámico**.

3. **Limpieza de Código Figma**:
   - Eliminar dependencias innecesarias o archivos autogenerados de Figma (como plugins residuales, SVGs redundantes embebidos en Base64 sucio, clases CSS de exportación genérica no semánticas).
   - Convertir componentes en código limpio, modular, tipado y estructurado con Tailwind / Vanilla CSS siguiendo el sistema de diseño de FRO.
   - Reemplazar cualquier texto genérico o "Lorem Ipsum" por la información real y profesional de Felipe Roldán Ocampo.

4. **Fotografía de Perfil**:
   - Integrar `Foto Perfil definitiva.png` de manera destacada y pulida (con recorte circular/estilizado y aura o borde de acento en `#FF5B04` o `#075056`).
