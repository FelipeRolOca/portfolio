import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;

    // Pause — we drive currentTime manually
    if (lightVideo) lightVideo.pause();
    if (darkVideo) darkVideo.pause();

    // SPEED = 2.0: video finishes at ~50% of scroll — very responsive, user doesn't mind early end
    const SPEED = 2.0;

    let ticking = false;

    const getTime = (duration: number): number => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      return Math.min(progress * SPEED * duration, duration);
    };

    const applyTime = () => {
      // readyState 2 = HAVE_CURRENT_DATA: enough data to render the current frame
      if (lightVideo && lightVideo.readyState >= 2) {
        lightVideo.currentTime = getTime(lightVideo.duration);
      }
      if (darkVideo && darkVideo.readyState >= 2) {
        darkVideo.currentTime = getTime(darkVideo.duration);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyTime);
      }
    };

    // Warmup: apply time immediately once metadata + first frame is ready
    const warmup = (video: HTMLVideoElement) => {
      const apply = () => requestAnimationFrame(applyTime);
      video.addEventListener('canplay', apply, { once: true });
      video.addEventListener('loadeddata', apply, { once: true });
      // Force browser to buffer the video aggressively
      video.load();
    };

    if (lightVideo) warmup(lightVideo);
    if (darkVideo) warmup(darkVideo);

    // Also apply on metadata in case canplay fires before listener
    const onMeta = () => requestAnimationFrame(applyTime);
    if (lightVideo) lightVideo.addEventListener('loadedmetadata', onMeta);
    if (darkVideo) darkVideo.addEventListener('loadedmetadata', onMeta);

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial position
    requestAnimationFrame(applyTime);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (lightVideo) lightVideo.removeEventListener('loadedmetadata', onMeta);
      if (darkVideo) darkVideo.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] flex items-center justify-center bg-white dark:bg-black transition-colors duration-1000">
      {/* will-change: transform hints the GPU to promote these to their own compositor layer */}
      <video
        ref={lightVideoRef}
        src="/SCROLL LIGHT MODE.mp4"
        className="absolute w-full h-full object-contain opacity-100 dark:opacity-0 transition-opacity duration-1000"
        style={{ willChange: 'contents' }}
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={darkVideoRef}
        src="/SCROLL DARK MODE.mp4"
        className="absolute w-full h-full object-contain opacity-0 dark:opacity-100 transition-opacity duration-1000"
        style={{ willChange: 'contents' }}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
