import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;

    if (lightVideo) {
      lightVideo.pause();
    }
    if (darkVideo) {
      darkVideo.pause();
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;

      if (lightVideo && lightVideo.readyState >= 1 && lightVideo.duration) {
        requestAnimationFrame(() => {
          lightVideo.currentTime = progress * lightVideo.duration;
        });
      }
      
      if (darkVideo && darkVideo.readyState >= 1 && darkVideo.duration) {
        requestAnimationFrame(() => {
          darkVideo.currentTime = progress * darkVideo.duration;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    // In case readyState is 0, add an event listener to update once metadata is loaded
    if (lightVideo) lightVideo.addEventListener('loadedmetadata', handleScroll);
    if (darkVideo) darkVideo.addEventListener('loadedmetadata', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lightVideo) lightVideo.removeEventListener('loadedmetadata', handleScroll);
      if (darkVideo) darkVideo.removeEventListener('loadedmetadata', handleScroll);
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
