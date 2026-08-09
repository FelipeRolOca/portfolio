export function AmbientGlows() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* High-performance GPU Radial Gradients (No heavy CSS blur filters) */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 10% 15%, rgba(7, 80, 86, 0.18) 0%, transparent 45%),
            radial-gradient(circle at 90% 40%, rgba(255, 91, 4, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 15% 70%, rgba(7, 80, 86, 0.15) 0%, transparent 45%),
            radial-gradient(circle at 85% 90%, rgba(7, 80, 86, 0.20) 0%, transparent 45%)
          `,
        }}
      />

      {/* Subtle vertical accent lines */}
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-[#075056]/30 to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-[#FF5B04]/20 to-transparent" />
    </div>
  )
}
