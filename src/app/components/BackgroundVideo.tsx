import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;

    if (lightVideo) lightVideo.pause();
    if (darkVideo) darkVideo.pause();

    // Portion of video duration to use across the full page scroll
    // 0.5 = use first half of the video
    const SPEED = 0.5;

    let targetTime = 0;
    let ticking = false;

    const getTargetTime = (duration: number): number => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
      return Math.min(progress * SPEED * duration, duration);
    };

    const applyTime = () => {
      if (lightVideo && lightVideo.readyState >= 1 && lightVideo.duration) {
        lightVideo.currentTime = getTargetTime(lightVideo.duration);
      }
      if (darkVideo && darkVideo.readyState >= 1 && darkVideo.duration) {
        darkVideo.currentTime = getTargetTime(darkVideo.duration);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyTime);
      }
    };

    // Sync once immediately on mount
    requestAnimationFrame(applyTime);

    window.addEventListener('scroll', onScroll, { passive: true });

    // Re-sync once metadata is available (race condition fix)
    const onMeta = () => requestAnimationFrame(applyTime);
    if (lightVideo) lightVideo.addEventListener('loadedmetadata', onMeta);
    if (darkVideo) darkVideo.addEventListener('loadedmetadata', onMeta);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (lightVideo) lightVideo.removeEventListener('loadedmetadata', onMeta);
      if (darkVideo) darkVideo.removeEventListener('loadedmetadata', onMeta);
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
