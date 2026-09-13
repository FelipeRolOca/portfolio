# Guía Maestra de Producción y Mantenimiento del Video Promocional FRO

Este documento contiene **todo lo necesario para continuar, actualizar y agregar nuevos proyectos o modificar el video promocional** en el futuro de forma rápida y sencilla.

---

## 📌 1. Ficha Técnica de los Videos

- **Duración total**: 46.00 segundos (1.380 fotogramas a 30 fps en ambos formatos).
- **Formatos Oficiales Actuales (V7 - Textos y Escalas Optimizadas)**:
  - 🖥️ **Horizontal 16:9** (1920x1080 px &bull; Full HD Web & YouTube):
    - 🎬 `public/video-horizontal-con-sonido.mp4` *(16.4 MB &bull; V7 con textos ampliados y logos perimetrales)*
    - 🔇 `public/video-horizontal-sin-sonido.mp4` *(14.7 MB)*
    - 📁 `public/video-horizontal-definitivo.mp4` *(14.7 MB)*
  - 📱 **Vertical 9:16** (1080x1920 px &bull; Full HD TikTok, Reels, Shorts & Mobile Web):
    - 🎬 `public/video-vertical-con-sonido.mp4` *(21.5 MB &bull; V7 con Dual-Device iPad + Laptop e iPhone maximizado)*
    - 🔇 `public/video-vertical-sin-sonido.mp4` *(18.8 MB)*
    - 📁 `public/video-vertical-definitivo.mp4` *(18.8 MB)*
- **Integración Web en Portafolio**:
  - Componente: `src/components/PromoVideoSection.tsx` (efecto Antigravity con scroll interactivo, cursor magnético FRO y fondo fijo `#16232A`).
  - Respaldo previo: `src/App.backup.tsx`.
- **Panel Interactivo de Audición y Comparación**: `public/audio-review.html` *(con reproductor dual para horizontal y vertical)*.

---

## 📐 2. Estructura de Escenas

### A. Versión Horizontal 16:9 (`PublicidadVideos/videos/portfolio-promo/`)
| Escena | Archivo | Segundos | Contenido Visual Clave |
|:---:|---|:---:|---|
| **01** | `01-ecosistema.html` | **0.0s – 5.0s** | Doble impacto tipográfico: **0:00-0:02** *"¿Te falta presencia digital o automatizar procesos?"* &rarr; **0:02-0:04** *"Impulsá Tu Negocio Hoy."* + Constelación de logos tecnológicos orbitando hacia afuera sin solapamiento. |
| **02** | `02-showcase.html` | **5.0s – 23.0s** | iPhone 15 Pro a la izquierda mostrando 3 proyectos con Safari interactivo. Título y tarjetas grandes a la derecha: *"¿En qué te podemos ayudar?"*. |
| **03** | `03-laptop.html` | **23.0s – 36.0s** | MacBook Pro con título limpio *"Proyectos Diseñados para Escalar Tu Negocio"* y carrusel acelerando en 4 etapas hasta el **corte en seco en tu portafolio personal** (30.42s). Cortina FRO final. |
| **04** | `04-cta.html` | **36.0s – 46.0s** | Escudo FRO pulsante, slogan *"Hagámoslo Realidad"*, tarjeta de Código QR escaneable directo a Vercel, y tarjeta de WhatsApp (+54 9 3329 52-3459). |

### B. Versión Vertical 9:16 (`PublicidadVideos/videos/portfolio-promo-vertical/`)
| Escena | Archivo | Segundos | Contenido Visual Clave |
|:---:|---|:---:|---|
| **01** | `01-ecosistema.html` | **0.0s – 5.0s** | Textos centrados (Pregunta arriba + Llamado abajo) con logos distribuidos arriba (y: 200-700) y abajo (y: 1220-1820) para llenar la verticalidad. |
| **02** | `02-showcase.html` | **5.0s – 23.0s** | Título y tarjetas de servicio en la mitad superior (`y: 140-620`) + iPhone 15 Pro de gran escala emergiendo desde abajo con Safari interactivo. |
| **03** | `03-devices.html` | **23.0s – 36.0s** | **Dual Device Sincronizado**: Título arriba + **Tablet (iPad Pro)** en el centro + **MacBook Pro** abajo. Ambos alternan proyectos al mismo ritmo y **aterrizan simultáneamente en tu portafolio** (30.42s). |
| **04** | `04-cta.html` | **36.0s – 46.0s** | Estructura vertical apilada de arriba a abajo: Logo FRO 3D &rarr; *"Hagámoslo Realidad."* &rarr; Subtítulo de autor &rarr; **Tarjeta de WhatsApp Directo** &rarr; **Tarjeta de Código QR Grande**. |

---

## 🎵 3. Arquitectura y Cronograma Sonoro

Toda la banda sonora está calibrada en `public/audio/`:

0. **0.0s – 2.5s (`intro_hook.wav`)**: Hook sonoro cautivador inicial: riser veloz de tensión, punch digital nítido en 110Hz con armónicos de marca al lanzar la pregunta, y acento de confirmación a los 2.05s para *"Impulsá tu negocio hoy"*.
1. **0.0s – 23.0s (`bg_music.wav` / `full_music_bed.wav`)**: Beat moderno y dinámico que cubre la intro, iPhone y Paperpops sin cortes ni baches.
2. **23.0s – 30.42s (`laptop_swaps.wav`)**: Tonada rítmica con toques y pops sincronizados exactamente en cada cambio de proyecto en la laptop, acelerando al ritmo visual.
3. **30.42s (`bright_cut_portfolio.wav`)**: Corte instantáneo de música y golpe luminoso/cristalino de alta gama al aterrizar tu portafolio personal (sin bajos oscuros).
4. **31.4s – 45.4s (`outro_music.wav`)**: Música cálida y moderna que sostiene la lectura del portafolio y acompaña la cortina, FRO, QR y WhatsApp.
5. **45.4s (`brand_signature_outro.wav`)**: Remate sonoro icónico de dos notas armónicas que sella el final del video.

---

## 🛠 4. Cómo Agregar un Nuevo Proyecto en el Futuro

Cuando tengas un nuevo proyecto para sumar a la laptop:

### Paso 1: Guardar la captura de pantalla
Guarda la imagen (resolución recomendada: 1920x1080 o superior) en:
- `c:\Users\felip\Desktop\TRABAJO\portafolioFelipe\public\Hero paginas\[nombre_nuevo].png`
- Y cópiala a: `C:\Users\felip\Desktop\TRABAJO\PublicidadVideos\videos\portfolio-promo\capture\assets\heroes\`

### Paso 2: Declarar la imagen en `03-laptop.html`
En `PublicidadVideos/videos/portfolio-promo/compositions/frames/03-laptop.html`:
```html
<img id="img-nuevo" class="hero-slide" src="capture/assets/heroes/[nombre_nuevo].png" alt="Nuevo Proyecto" />
```

### Paso 3: Agregar la iteración en GSAP
Dentro del bloque `<script>` de `03-laptop.html`, agrega el cambio de opacidad en el segundo que desees de la aceleración:
```javascript
tl.set(imgAnterior, { opacity: 0 }, segundo);
tl.set(imgNuevo, { opacity: 1 }, segundo);
```

### Paso 4: Re-renderizar el video visual
Ejecuta en terminal:
```bash
node "C:\Users\felip\.gemini\antigravity-ide\brain\14193b49-4e27-442f-a1f7-02e0b14f1986\scratch\render_video.js"
```
*(Tarda ~1 minuto y 40 segundos en renderizar los 1.380 fotogramas Full HD a 30fps).*

### Paso 5: Re-acoplar el audio sincronizado
Ejecuta:
```bash
node "C:\Users\felip\.gemini\antigravity-ide\brain\14193b49-4e27-442f-a1f7-02e0b14f1986\scratch\mix_audio_v5.js"
```
*(Tarda ~3 segundos y deja listos `video-horizontal-con-sonido.mp4` y `video-horizontal-sin-sonido.mp4` en `public/`).*

---

## 📂 5. Directorios y Rutas Clave

- **Proyecto web**: `c:\Users\felip\Desktop\TRABAJO\portafolioFelipe`
- **Imágenes originales del Hero**: `public/Hero paginas/`
  - `oscarnuevo.png`
  - `JJasistNuevo.png`
  - `paperpopsnuevo.png`
  - `jjhire.png`
  - `JJbuscaNuevo.png`
  - `portafolio personakl.png`
- **Librería de Audio SFX & Música**: `public/audio/`
- **Motor de Video Hyperframes**: `C:\Users\felip\Desktop\TRABAJO\PublicidadVideos\videos\portfolio-promo`
- **Scripts de Automatización**:
  - Renderizado: `scratch/render_video.js`
  - Mezcla de Audio: `scratch/mix_audio_v5.js`
  - Generador de Tonadas: `scratch/build_audio_v5.js`
  - Servidor de Audición: `scratch/server.js`

---

> [!NOTE]
> **Regla de Marca Permanente**: Nunca mencionar en textos ni locuciones que la app utiliza biometría o reconocimiento facial. El sistema de fichaje se realiza exclusivamente por GPS y Código QR Dinámico.
