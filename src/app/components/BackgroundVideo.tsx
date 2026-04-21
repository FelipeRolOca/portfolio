import { useScroll } from 'motion/react';
import { useRef, useEffect } from 'react';

export default function BackgroundVideo() {
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;

    if (lightVideo) lightVideo.pause();
    if (darkVideo) darkVideo.pause();

    let animationFrameId: number;
    let targetTime = 0;

    const renderLoop = () => {
      const scrollProgress = scrollYProgress.get();
      
      // Light Video
      if (lightVideo && lightVideo.readyState >= 1) { // 1 = HAVE_METADATA
        targetTime = scrollProgress * lightVideo.duration;
        const diff = targetTime - lightVideo.currentTime;
        // Only update if difference is noticeable to avoid micro-thrashing the decoder
        if (Math.abs(diff) > 0.05) {
          lightVideo.currentTime += diff * 0.1;
        }
      }
      
      // Dark Video
      if (darkVideo && darkVideo.readyState >= 1) {
        targetTime = scrollProgress * darkVideo.duration;
        const diff = targetTime - darkVideo.currentTime;
        if (Math.abs(diff) > 0.05) {
          darkVideo.currentTime += diff * 0.1;
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none overflow-hidden">
      {/* Light Mode Video */}
      <video
        ref={lightVideoRef}
        src="/SCROLL LIGHT MODE.mp4"
        className="w-full h-full object-cover dark:hidden"
        muted
        playsInline
        preload="auto"
      />
      {/* Dark Mode Video */}
      <video
        ref={darkVideoRef}
        src="/SCROLL DARK MODE.mp4"
        className="w-full h-full object-cover hidden dark:block"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
