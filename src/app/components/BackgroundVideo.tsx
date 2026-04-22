import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;

    // Pause both — we control playback manually via currentTime
    if (lightVideo) lightVideo.pause();
    if (darkVideo) darkVideo.pause();

    // How much of the video to use across the full page scroll (1.0 = all, 0.5 = half, etc.)
    const SPEED = 0.5;

    // Lerp state — tracks the smooth interpolated time
    let smoothTimeLight = 0;
    let smoothTimeDark = 0;
    let targetTimeLight = 0;
    let targetTimeDark = 0;

    const getScrollProgress = (): number => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      return Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    };

    const onScroll = () => {
      const p = getScrollProgress();
      if (lightVideo?.duration) targetTimeLight = p * SPEED * lightVideo.duration;
      if (darkVideo?.duration) targetTimeDark = p * SPEED * darkVideo.duration;
    };

    // Industry-standard rAF loop: lerp towards target on every frame
    let raf: number;
    const tick = () => {
      const LERP = 0.12; // 0.12 = responsive but smooth; raise for snappier, lower for silkier

      if (lightVideo && lightVideo.readyState >= 2 && lightVideo.duration) {
        smoothTimeLight += (targetTimeLight - smoothTimeLight) * LERP;
        lightVideo.currentTime = smoothTimeLight;
      }

      if (darkVideo && darkVideo.readyState >= 2 && darkVideo.duration) {
        smoothTimeDark += (targetTimeDark - smoothTimeDark) * LERP;
        darkVideo.currentTime = smoothTimeDark;
      }

      raf = requestAnimationFrame(tick);
    };

    // Start loop immediately
    raf = requestAnimationFrame(tick);

    // Update targets on scroll (passive for performance)
    window.addEventListener('scroll', onScroll, { passive: true });

    // Re-sync when metadata arrives (covers the race condition on load)
    const syncOnLoad = () => onScroll();
    if (lightVideo) lightVideo.addEventListener('loadedmetadata', syncOnLoad);
    if (darkVideo) darkVideo.addEventListener('loadedmetadata', syncOnLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      if (lightVideo) lightVideo.removeEventListener('loadedmetadata', syncOnLoad);
      if (darkVideo) darkVideo.removeEventListener('loadedmetadata', syncOnLoad);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] flex items-center justify-center bg-white dark:bg-black transition-colors duration-1000">
      <video
        ref={lightVideoRef}
        src="/SCROLL LIGHT MODE.mp4"
        className="absolute w-full h-full object-contain opacity-100 dark:opacity-0 transition-opacity duration-1000"
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={darkVideoRef}
        src="/SCROLL DARK MODE.mp4"
        className="absolute w-full h-full object-contain opacity-0 dark:opacity-100 transition-opacity duration-1000"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
