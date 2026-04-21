import { useScroll } from 'motion/react';
import { useRef, useEffect } from 'react';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    let animationFrameId: number;
    let targetTime = 0;

    const renderLoop = () => {
      if (video.duration) {
        targetTime = scrollYProgress.get() * video.duration;
        // Smooth interpolation for the scrub
        video.currentTime += (targetTime - video.currentTime) * 0.1;
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none dark:hidden overflow-hidden">
      <video
        ref={videoRef}
        src="/Keyboard_disassembling_for_202604212029.mp4"
        className="w-full h-full object-cover opacity-50"
        muted
        playsInline
        preload="auto"
      />
      {/* Overlay to ensure the video stays subtle and text is readable */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />
    </div>
  );
}
