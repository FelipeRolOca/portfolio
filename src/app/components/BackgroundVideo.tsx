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
      // Light Video
      if (lightVideo && lightVideo.duration) {
        targetTime = scrollYProgress.get() * lightVideo.duration;
        lightVideo.currentTime += (targetTime - lightVideo.currentTime) * 0.1;
      }
      
      // Dark Video
      if (darkVideo && darkVideo.duration) {
        targetTime = scrollYProgress.get() * darkVideo.duration;
        darkVideo.currentTime += (targetTime - darkVideo.currentTime) * 0.1;
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
