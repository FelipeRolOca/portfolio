import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;

    if (!lightVideo || !darkVideo) return;

    // Pause both videos
    lightVideo.pause();
    darkVideo.pause();

    // Force the browser to start loading — critical for large files
    lightVideo.load();
    darkVideo.load();

    // How much video time to cover across the full page scroll
    // 3.0 = covers 3x the video duration — half the previous speed
    const SPEED = 3.0;

    let targetLight = 0;
    let targetDark = 0;
    let rafId: number;

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
      // readyState >= 1 means metadata loaded (duration available); >= 2 means current frame ready.
      // We use >= 1 here so the seek starts as soon as duration is known, even before
      // the full first frame is decoded — the browser will decode on demand.
      if (video.readyState < 1 || !video.duration) return;

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
          video.play().catch((err) => {
            console.warn('[BackgroundVideo] play() blocked:', err);
            isPlaying.value = false;
          });
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
      updateVideo(lightVideo, targetLight, stateLight);
      updateVideo(darkVideo, targetDark, stateDark);
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (lightVideo.duration) targetLight = getTarget(lightVideo.duration);
      if (darkVideo.duration) targetDark = getTarget(darkVideo.duration);
    };

    // Triggered when metadata (duration, dimensions) is available
    const onMeta = () => onScroll();

    // Triggered when the browser confirms the video can actually play
    const onCanPlay = () => onScroll();

    // Log codec / network errors so they're visible in DevTools
    const onError = (e: Event) => {
      const vid = e.currentTarget as HTMLVideoElement;
      const err = vid.error;
      console.error('[BackgroundVideo] Failed to load video:', {
        src: vid.currentSrc,
        errorCode: err?.code,
        errorMessage: err?.message,
      });
    };

    // Start rAF loop
    rafId = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });

    lightVideo.addEventListener('loadedmetadata', onMeta);
    darkVideo.addEventListener('loadedmetadata', onMeta);
    lightVideo.addEventListener('canplay', onCanPlay);
    darkVideo.addEventListener('canplay', onCanPlay);
    lightVideo.addEventListener('error', onError);
    darkVideo.addEventListener('error', onError);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      lightVideo.removeEventListener('loadedmetadata', onMeta);
      darkVideo.removeEventListener('loadedmetadata', onMeta);
      lightVideo.removeEventListener('canplay', onCanPlay);
      darkVideo.removeEventListener('canplay', onCanPlay);
      lightVideo.removeEventListener('error', onError);
      darkVideo.removeEventListener('error', onError);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] flex items-center justify-center bg-white dark:bg-black transition-colors duration-1000">
      <video
        ref={lightVideoRef}
        src="/SCROLL LIGHT MODE 3.mp4"
        className="absolute w-full h-full object-cover opacity-100 dark:opacity-0 transition-opacity duration-1000"
        style={{ willChange: 'contents' }}
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={darkVideoRef}
        src="/SCROLL DARK MODE 3.mp4"
        className="absolute w-full h-full object-cover opacity-0 dark:opacity-100 transition-opacity duration-1000"
        style={{ willChange: 'contents' }}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
