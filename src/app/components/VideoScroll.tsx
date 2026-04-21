import { useScroll, useTransform, motion } from 'motion/react';
import { useRef, useEffect } from 'react';

export default function VideoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is paused and metadata is loaded
    video.pause();
    
    // We want to smoothly interpolate to the target time to prevent harsh jumping
    let currentVideoTime = 0;
    let targetVideoTime = 0;
    let animationFrameId: number;

    const smoothScrub = () => {
      if (video.duration) {
        // LERP for smooth scrubbing effect
        currentVideoTime += (targetVideoTime - currentVideoTime) * 0.1;
        
        // Only update if difference is noticeable
        if (Math.abs(currentVideoTime - video.currentTime) > 0.01) {
          video.currentTime = currentVideoTime;
        }
      }
      animationFrameId = requestAnimationFrame(smoothScrub);
    };

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (video.duration) {
        targetVideoTime = latest * video.duration;
      }
    });

    animationFrameId = requestAnimationFrame(smoothScrub);

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollYProgress]);

  // Smooth opacity and scale animations for entering and leaving the section
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-white dark:hidden">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white">
        <motion.div 
          style={{ opacity, scale }} 
          className="absolute inset-0 w-full h-full"
        >
          <video 
            ref={videoRef}
            src="/Keyboard_disassembling_for_202604212029.mp4" 
            className="w-full h-full object-cover"
            muted 
            playsInline
            preload="auto"
          />
          {/* Subtle premium overlays to blend the video smoothly into the white background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-80 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(255,255,255,0.9)_100%)] pointer-events-none" />
        </motion.div>

        {/* Floating text to make it look even more premium */}
        <motion.div 
          style={{ opacity }}
          className="absolute z-10 pointer-events-none flex flex-col items-center justify-center text-center px-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4 drop-shadow-sm">
            Atención al Detalle
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl">
            Construyendo soluciones desde cero, pieza por pieza.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
