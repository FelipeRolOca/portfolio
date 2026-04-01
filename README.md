# Portfolio Motion Notes

Este proyecto sigue funcionando con su stack actual de animaciones.
La skill global `gsap-skills` queda disponible para planear o implementar nuevas animaciones con GSAP sin necesidad de reescribir todo de una vez.

## Como usar `gsap-skills`

Pedirle a Codex cosas como:

- `Usa gsap-skills para proponer una mejora visual sin romper la UI actual`
- `Usa gsap-skills para migrar solo el Hero a GSAP`
- `Usa gsap-skills para agregar scroll reveals a Projects y Skills`
- `Usa gsap-skills para crear hooks reutilizables de animacion`

Objetivo por defecto:

- mantener layout, contenido y comportamiento general
- introducir GSAP de forma incremental
- limpiar bien timelines, listeners y triggers en React
- respetar `prefers-reduced-motion` cuando la animacion no sea esencial

## Donde probar primero en esta pagina

### 1. Hero

Archivo: [src/app/components/Hero.tsx](C:/Users/felip/Desktop/TRABAJO/portafolioFelipe/src/app/components/Hero.tsx)

Buenas pruebas iniciales:

- timeline de entrada para badge, titulo, descripcion y botones
- text reveal por palabras o letras para el rol principal
- parallax mas fino para los blobs de fondo
- entrada de la foto con escala, blur y rotacion minima

Por que conviene:

- es la primera impresion de la pagina
- el cambio se nota mucho y toca una sola seccion
- tiene bajo riesgo si se hace sin cambiar markup

### 2. Projects

Archivo: [src/app/components/Projects.tsx](C:/Users/felip/Desktop/TRABAJO/portafolioFelipe/src/app/components/Projects.tsx)

Buenas pruebas iniciales:

- reveal on scroll mas cinematografico para cada proyecto destacado
- imagen que entra con clip-path o scale al aparecer
- stagger para highlights y badges de tecnologias
- transicion mas premium al abrir detalles de cada proyecto

Por que conviene:

- la seccion ya tiene mucho material visual
- GSAP puede darle mas narrativa sin cambiar contenido

### 3. Skills

Archivo: [src/app/components/Skills.tsx](C:/Users/felip/Desktop/TRABAJO/portafolioFelipe/src/app/components/Skills.tsx)

Buenas pruebas iniciales:

- stagger de cards al entrar en viewport
- barras o indicadores sutiles para cada categoria
- hover magnetico o spotlight mas responsivo
- tooltip expandido con entrada mas suave

Por que conviene:

- las cards se prestan muy bien a animaciones repetibles
- sirve para crear hooks reutilizables

### 4. Contact

Archivo: [src/app/components/Contact.tsx](C:/Users/felip/Desktop/TRABAJO/portafolioFelipe/src/app/components/Contact.tsx)

Buenas pruebas iniciales:

- entrada escalonada de los bloques de contacto
- apertura del menu de telefono con timeline
- CTA del boton submit con microinteraccion mas cuidada
- glow de fondo con movimiento lento continuo

Por que conviene:

- agrega sensacion premium sin distraer
- permite probar microinteracciones utiles para futuros proyectos

## Orden recomendado para experimentar

1. Hero timeline
2. Scroll reveal en Projects
3. Stagger en Skills
4. Microinteracciones en Contact

## Ideas que quedarian bien en esta pagina

- un hero con entrada mas editorial y menos lineal
- proyectos con storytelling al scrollear
- skills con stagger limpio y pequenos acentos de interfaz
- contact con CTA mas vivo pero elegante
- un sistema reusable de hooks como `useHeroReveal`, `useSectionReveal` y `useMagneticHover`

## Que evitar al empezar

- migrar todo el sitio de una sola vez
- mezclar GSAP y varias logicas distintas en la misma seccion sin necesidad
- agregar motion constante que canse o afecte performance
- romper el comportamiento responsive actual
