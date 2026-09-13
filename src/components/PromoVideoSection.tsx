import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'
import logo3 from '@/imports/LOGO_3.png'
import { useLang } from '../i18n/LanguageContext'

export function PromoVideoSection() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [scale, setScale] = useState(0.86)
  const [borderRadius, setBorderRadius] = useState(48)

  // Floating cursor state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Detect mobile vs desktop automatically
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Antigravity Scroll-Driven Smooth Expansion
  useEffect(() => {
    let animationFrameId: number

    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate progress as the section enters and centers in the viewport
      // 0 when top is at windowHeight, 1 when centered (top <= windowHeight * 0.15)
      const start = windowHeight
      const end = windowHeight * 0.15
      const rawProgress = (start - rect.top) / (start - end)
      const progress = Math.min(Math.max(rawProgress, 0), 1)

      // Smooth expansion: 0.86 -> 1.0 (Desktop) / 0.90 -> 1.0 (Mobile)
      const minScale = isMobile ? 0.90 : 0.85
      const currentScale = minScale + progress * (1.0 - minScale)
      const currentRadius = 48 - progress * 20 // 48px -> 28px

      setScale(currentScale)
      setBorderRadius(currentRadius)

      // Auto-play when visible, pause when scrolled away
      if (videoRef.current) {
        if (progress > 0.15 && rect.bottom > 100 && rect.top < windowHeight - 50) {
          if (videoRef.current.paused && !videoRef.current.ended) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
          }
        } else {
          if (!videoRef.current.paused) {
            videoRef.current.pause()
            setIsPlaying(false)
          }
        }
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  // Mouse move for custom interactive Antigravity play cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  // Toggle mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    const next = !videoRef.current.muted
    videoRef.current.muted = next
    setIsMuted(next)
  }

  const videoSrc = isMobile
    ? '/video-vertical-con-sonido.mp4?v=7'
    : '/video-horizontal-con-sonido.mp4?v=7'

  return (
    <section
      ref={sectionRef}
      id="video-promocional"
      className="relative w-full overflow-hidden flex items-center justify-center py-12 md:py-24"
      style={{
        backgroundColor: '#16232A',
      }}
    >
      <div className="relative w-full max-w-[1400px] px-4 sm:px-8 flex justify-center items-center z-10">
        {/* Organic expanding video wrapper (Antigravity portal) */}
        <div
          ref={wrapperRef}
          onClick={togglePlay}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          className={`relative cursor-pointer overflow-hidden transition-transform duration-100 ease-out ${
            isMobile
              ? 'w-full max-w-[420px] aspect-[9/16]'
              : 'w-full aspect-video'
          }`}
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
            boxShadow: `
              0 30px 100px rgba(0, 0, 0, 0.7),
              0 0 70px rgba(7, 80, 86, ${0.15 + (scale - 0.85) * 0.8}),
              0 0 40px rgba(255, 91, 4, ${0.05 + (scale - 0.85) * 0.4})
            `,
            border: '1px solid rgba(255, 255, 255, 0.14)',
            backgroundColor: '#070A0F',
          }}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            key={videoSrc}
            src={videoSrc}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Custom Antigravity Magnetic Floating Pill Cursor (Desktop) */}
          {!isMobile && isHovered && (
            <div
              className="pointer-events-none absolute z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
              }}
            >
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 text-[#16232A] backdrop-blur-md shadow-2xl border border-black/10">
                <img src={logo3} alt="FRO" className="w-4 h-4 object-contain" />
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#FF5B04] fill-[#FF5B04]" />
                    <span className="text-[12px] font-extrabold tracking-wide uppercase">
                      {t('Pausar', 'Pause')}
                    </span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#FF5B04] fill-[#FF5B04]" />
                    <span className="text-[12px] font-extrabold tracking-wide uppercase">
                      {t('Reproducir', 'Play')}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Floating Sound Toggle Button (Bottom Right) */}
          <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-30">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 text-white backdrop-blur-md shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-white/70" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90">
                    {t('Activar Sonido', 'Sound On')}
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#FF5B04] animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#FF5B04]">
                    {t('Sonido Activo', 'Sound Active')}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
