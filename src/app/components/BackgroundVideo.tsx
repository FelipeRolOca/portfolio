import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;

    // We must ensure the videos are paused so they don't play normally
    if (lightVideo) lightVideo.pause();
    if (darkVideo) darkVideo.pause();

    let animationFrameId: number;

    const handleScroll = () => {
      // Calculate scroll progress manually to ensure 100% accuracy
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Prevent division by zero
      const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;

      // Update Light Video
      if (lightVideo && lightVideo.readyState >= 1 && lightVideo.duration) {
        const targetTime = progress * lightVideo.duration;
        // Direct assignment is often more reliable for scrubbing than Lerp on some browsers
        lightVideo.currentTime = targetTime;
      }
      
      // Update Dark Video
      if (darkVideo && darkVideo.readyState >= 1 && darkVideo.duration) {
        const targetTime = progress * darkVideo.duration;
        darkVideo.currentTime = targetTime;
      }
    };

    // Smooth render loop instead of firing directly on scroll event
    const renderLoop = () => {
      handleScroll();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-1000">
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
