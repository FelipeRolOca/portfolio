/**
 * Pixel transition effect for switching between UI modes.
 * Creates a grid of pixels that fade out one by one, then switches, then fades in one by one.
 * Sequence: create pixel grid → fade out pixels → switch → fade in pixels → remove grid
 * Duration: ~1200ms total
 *
 * Usage:
 *   const cleanup = pixelTransition(() => setMode('modern'));
 *   // later: cleanup() if needed
 */

export interface PixelTransitionOptions {
  /** Total duration in ms (default: 1200) */
  duration?: number;
  /** Pixel size in px (default: 20) */
  pixelSize?: number;
  /** Color for loading state (default: #000000) */
  loadingColor?: string;
}

export function pixelTransition(
  onSwitch: () => void,
  options: PixelTransitionOptions = {}
): () => void {
  const {
    duration = 1200,
    pixelSize = 20,
    loadingColor = '#000000',
  } = options;

  let cancelled = false;

  // Create overlay container
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    pointer-events: none;
  `;
  document.body.appendChild(overlay);

  // Calculate grid dimensions
  const cols = Math.ceil(window.innerWidth / pixelSize);
  const rows = Math.ceil(window.innerHeight / pixelSize);
  const totalPixels = cols * rows;

  // Create pixel grid
  const pixels: HTMLElement[] = [];
  for (let i = 0; i < totalPixels; i++) {
    const pixel = document.createElement('div');
    const col = i % cols;
    const row = Math.floor(i / cols);
    pixel.style.cssText = `
      position: absolute;
      left: ${col * pixelSize}px;
      top: ${row * pixelSize}px;
      width: ${pixelSize}px;
      height: ${pixelSize}px;
      background: transparent;
      opacity: 0;
      transition: opacity 50ms ease-in-out;
    `;
    overlay.appendChild(pixel);
    pixels.push(pixel);
  }

  // Shuffle pixels for random effect
  const shuffledIndices = Array.from({ length: totalPixels }, (_, i) => i);
  for (let i = shuffledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
  }

  const fadeOutDuration = duration / 3;
  const loadingDuration = duration / 3;
  const fadeInDuration = duration / 3;
  const pixelDelay = fadeOutDuration / totalPixels;

  // Phase 1: Fade out pixels one by one
  shuffledIndices.forEach((index, i) => {
    setTimeout(() => {
      if (cancelled) return;
      pixels[index].style.background = loadingColor;
      pixels[index].style.opacity = '1';
    }, i * pixelDelay);
  });

  // Phase 2: Wait for loading state
  setTimeout(() => {
    if (cancelled) {
      cleanup();
      return;
    }

    // Switch content
    onSwitch();

    // Phase 3: Fade in pixels one by one (revealing new content)
    shuffledIndices.forEach((index, i) => {
      setTimeout(() => {
        if (cancelled) return;
        pixels[index].style.opacity = '0';
      }, i * pixelDelay);
    });

    // Cleanup after all animations
    setTimeout(() => {
      if (cancelled) return;
      cleanup();
    }, fadeInDuration);
  }, fadeOutDuration + loadingDuration);

  function cleanup() {
    cancelled = true;
    overlay.remove();
  }

  return cleanup;
}
