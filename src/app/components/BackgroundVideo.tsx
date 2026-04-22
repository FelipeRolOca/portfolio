import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;

    if (lightVideo) lightVideo.pause();
    if (darkVideo) darkVideo.pause();

    // How much video time to cover across the full page scroll
    // 6.0 = covers 6x the video duration — video ends early but feels ultra-responsive
    const SPEED = 6.0;

    // Per-video target times
    let targetLight = 0;
    let targetDark = 0;
    let rafId: number;
    let playingLight = false;
    let playingDark = false;

    const getTarget = (duration: number): number => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      return Math.min((window.scrollY / maxScroll) * SPEED * duration, duration);
    };

    /**
     * Core update logic — called every rAF frame.
     * Going FORWARD:  play() at a dynamic playbackRate (uses GPU decode pipeline → smooth)
     * Going BACKWARD: direct seek (unavoidable, but backward scroll is rare)
     * On target:      pause and snap precisely
     */
    const updateVideo = (
      video: HTMLVideoElement,
      target: number,
      isPlaying: { value: boolean }
    ) => {
      if (video.readyState < 2 || !video.duration) return;

      const diff = target - video.currentTime;

      if (Math.abs(diff) < 0.05) {
        // ✓ Within ~1.5 frames of target — snap and pause
        if (!video.paused) {
          video.pause();
          video.currentTime = target;
          isPlaying.value = false;
        }
      } else if (diff > 0) {
        // ↓ Need to go forward — use play() at a rate proportional to distance
        // Clamp between 2x and 16x (browser max)
        const rate = Math.min(Math.max(diff * 15, 2), 16);
        video.playbackRate = rate;
        if (video.paused && !isPlaying.value) {
          isPlaying.value = true;
          video.play().catch(() => { isPlaying.value = false; });
        }
      } else {
        // ↑ Going backward — must seek (browser can't play in reverse)
        if (!video.paused) video.pause();
        isPlaying.value = false;
        video.currentTime = target;
      }
    };

    const stateLight = { value: false };
    const stateDark = { value: false };

    const tick = () => {
      if (lightVideo) updateVideo(lightVideo, targetLight, stateLight);
      if (darkVideo) updateVideo(darkVideo, targetDark, stateDark);
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (lightVideo?.duration) targetLight = getTarget(lightVideo.duration);
      if (darkVideo?.duration) targetDark = getTarget(darkVideo.duration);
    };

    // Start rAF loop
    rafId = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Sync targets once metadata is available
    const onMeta = () => onScroll();
    if (lightVideo) lightVideo.addEventListener('loadedmetadata', onMeta);
    if (darkVideo) darkVideo.addEventListener('loadedmetadata', onMeta);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      if (lightVideo) lightVideo.removeEventListener('loadedmetadata', onMeta);
      if (darkVideo) darkVideo.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] flex items-center justify-center bg-white dark:bg-black transition-colors duration-1000">
      <video
        ref={lightVideoRef}
        src="/SCROLL LIGHT MODE 2.mp4"
        className="absolute w-full h-full object-contain opacity-100 dark:opacity-0 transition-opacity duration-1000"
        style={{ willChange: 'contents' }}
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={darkVideoRef}
        src="/SCROLL DARK MODE 2.mp4"
        className="absolute w-full h-full object-contain opacity-0 dark:opacity-100 transition-opacity duration-1000"
        style={{ willChange: 'contents' }}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}

