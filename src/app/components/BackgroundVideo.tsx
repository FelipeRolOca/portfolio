import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;

    if (lightVideo) lightVideo.pause();
    if (darkVideo) darkVideo.pause();

    // 0.25 = quarter speed — video uses only the first 25% of its duration across the full page scroll
    const speedMultiplier = 0.25;

    // Current interpolated time for each video
    let currentTimeLight = 0;
    let currentTimeDark = 0;
    let targetTimeLight = 0;
    let targetTimeDark = 0;
    let rafId = 0;

    const getScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      return scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;
    };

    const onScroll = () => {
      const progress = getScrollProgress();

      if (lightVideo && lightVideo.duration) {
        targetTimeLight = Math.min(progress * speedMultiplier * lightVideo.duration, lightVideo.duration);
      }
      if (darkVideo && darkVideo.duration) {
        targetTimeDark = Math.min(progress * speedMultiplier * darkVideo.duration, darkVideo.duration);
      }
    };

    // Smooth lerp loop — runs every frame regardless of scroll events
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const LERP_FACTOR = 0.08; // lower = smoother/slower catch-up

    const tick = () => {
      if (lightVideo && lightVideo.readyState >= 1 && lightVideo.duration) {
        currentTimeLight = lerp(currentTimeLight, targetTimeLight, LERP_FACTOR);
        if (Math.abs(currentTimeLight - lightVideo.currentTime) > 0.01) {
          lightVideo.currentTime = currentTimeLight;
        }
      }
      if (darkVideo && darkVideo.readyState >= 1 && darkVideo.duration) {
        currentTimeDark = lerp(currentTimeDark, targetTimeDark, LERP_FACTOR);
        if (Math.abs(currentTimeDark - darkVideo.currentTime) > 0.01) {
          darkVideo.currentTime = currentTimeDark;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    // Init
    onScroll();
    rafId = requestAnimationFrame(tick);

    window.addEventListener('scroll', onScroll, { passive: true });
    if (lightVideo) lightVideo.addEventListener('loadedmetadata', onScroll);
    if (darkVideo) darkVideo.addEventListener('loadedmetadata', onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      if (lightVideo) lightVideo.removeEventListener('loadedmetadata', onScroll);
      if (darkVideo) darkVideo.removeEventListener('loadedmetadata', onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none flex items-center justify-center bg-white dark:bg-black transition-colors duration-1000">
      {/* Light Mode Video */}
      <video
        ref={lightVideoRef}
        src="/SCROLL LIGHT MODE.mp4"
        className="absolute w-full h-full object-contain transition-opacity duration-1000 opacity-100 dark:opacity-0"
        muted
        playsInline
        preload="auto"
      />
      {/* Dark Mode Video */}
      <video
        ref={darkVideoRef}
        src="/SCROLL DARK MODE.mp4"
        className="absolute w-full h-full object-contain transition-opacity duration-1000 opacity-0 dark:opacity-100"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
