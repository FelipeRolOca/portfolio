/**
 * Pixel transition effect for switching between UI modes.
 * Sequence: pixelate → blur → (switch callback) → sharpen
 * Duration: ~400ms total
 *
 * Usage:
 *   const cleanup = pixelTransition(document.body, () => setMode('modern'));
 *   // later: cleanup() if needed
 */

export interface PixelTransitionOptions {
  /** Total duration in ms (default: 400) */
  duration?: number;
  /** Pixelation scale factor — higher = more pixelated (default: 8) */
  pixelScale?: number;
  /** Blur amount in px during mid-transition (default: 6) */
  blurAmount?: number;
}

export function pixelTransition(
  container: HTMLElement,
  onSwitch: () => void,
  options: PixelTransitionOptions = {}
): () => void {
  const {
    duration = 400,
    pixelScale = 8,
    blurAmount = 6,
  } = options;

  let cancelled = false;

  const phaseDuration = duration / 4;

  // Phase 1: Pixelate
  container.style.imageRendering = 'pixelated';
  container.style.transform = `scale(${(100 / pixelScale) / 100})`;
  container.style.transition = `transform ${phaseDuration}ms ease-in`;

  // Force reflow
  void container.offsetHeight;

  setTimeout(() => {
    if (cancelled) return;

    // Phase 2: Blur
    container.style.filter = `blur(${blurAmount}px)`;
    container.style.transition = `filter ${phaseDuration}ms ease-in`;

    setTimeout(() => {
      if (cancelled) return;

      // Switch content at the blur peak
      onSwitch();

      // Phase 3: Sharpen (remove blur)
      container.style.filter = 'blur(0px)';
      container.style.transition = `filter ${phaseDuration}ms ease-out`;

      setTimeout(() => {
        if (cancelled) return;

        // Phase 4: Depixelate (restore scale)
        container.style.transform = 'scale(1)';
        container.style.transition = `transform ${phaseDuration}ms ease-out`;

        setTimeout(() => {
          if (cancelled) return;
          // Cleanup
          container.style.imageRendering = '';
          container.style.transform = '';
          container.style.filter = '';
          container.style.transition = '';
        }, phaseDuration);
      }, phaseDuration);
    }, phaseDuration);
  }, phaseDuration);

  // Return cleanup function
  return () => {
    cancelled = true;
    container.style.imageRendering = '';
    container.style.transform = '';
    container.style.filter = '';
    container.style.transition = '';
  };
}
