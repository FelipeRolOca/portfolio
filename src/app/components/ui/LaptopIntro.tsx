"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Phase = "idle" | "opening" | "lit" | "exiting" | "gone";

export const LaptopIntro = () => {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    // Only show once per session
    if (typeof window !== "undefined" && sessionStorage.getItem("intro_seen")) {
      setPhase("gone");
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("opening"), 350));
    timers.push(setTimeout(() => setPhase("lit"),     1900));
    timers.push(setTimeout(() => setPhase("exiting"), 3800));
    timers.push(setTimeout(() => {
      setPhase("gone");
      sessionStorage.setItem("intro_seen", "1");
    }, 4600));

    return () => timers.forEach(clearTimeout);
  }, []);

  const dismiss = () => {
    if (phase === "gone") return;
    sessionStorage.setItem("intro_seen", "1");
    setPhase("exiting");
    setTimeout(() => setPhase("gone"), 700);
  };

  if (phase === "gone") return null;

  const isOpen = phase === "lit" || phase === "exiting";
  const isLit  = phase === "lit" || phase === "exiting";

  return (
    <AnimatePresence>
      <motion.div
        key="laptop-intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exiting" ? 0 : 1 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        onClick={dismiss}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          cursor: "pointer",
        }}
      >
        {/* Ambient glow behind laptop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLit ? 0.6 : 0.15, scale: isLit ? 1 : 0.85 }}
          transition={{ duration: 1.2 }}
          style={{
            position: "absolute",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(59,130,246,0.45) 0%, rgba(6,182,212,0.2) 40%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        {/* ═══════════════════  3-D LAPTOP  ═══════════════════ */}
        <div
          style={{
            perspective: 1000,
            perspectiveOrigin: "50% 55%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 380,
              transformStyle: "preserve-3d",
              transform: "rotateX(-8deg) rotateY(-6deg)",
            }}
          >
            {/* ── BASE ── */}
            <div
              style={{
                position: "relative",
                width: 380,
                height: 12,
                background: "linear-gradient(180deg, #52525b 0%, #27272a 100%)",
                borderRadius: "0 0 12px 12px",
                boxShadow: "0 40px 100px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.06)",
                zIndex: 2,
              }}
            >
              {/* Notch / hinge line */}
              <div style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 60,
                height: 4,
                background: "rgba(0,0,0,0.5)",
                borderRadius: "0 0 6px 6px",
              }} />
            </div>

            {/* Keyboard top-face illusion */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 0,
                width: 380,
                height: 220,
                background: "linear-gradient(160deg, #1c1c1f 0%, #232327 100%)",
                borderRadius: "4px 4px 0 0",
                transformOrigin: "bottom center",
                transform: "rotateX(90deg)",
                /* sits on the top face of the base */
              }}
            >
              {/* Key rows decoration */}
              {[40, 70, 100, 130].map((top) => (
                <div key={top} style={{
                  position: "absolute",
                  top,
                  left: 30,
                  right: 30,
                  height: 14,
                  display: "flex",
                  gap: 5,
                }}>
                  {Array.from({ length: 13 }).map((_, i) => (
                    <div key={i} style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 3,
                      border: "1px solid rgba(255,255,255,0.04)",
                    }} />
                  ))}
                </div>
              ))}
              {/* Trackpad */}
              <div style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                width: 100,
                height: 60,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.05)",
              }} />
            </div>

            {/* ── LID ── */}
            <motion.div
              style={{
                position: "absolute",
                bottom: 12,
                left: 0,
                width: 380,
                height: 240,
                transformOrigin: "bottom center",
                transformStyle: "preserve-3d",
                zIndex: 3,
              }}
              animate={{ rotateX: isOpen ? -112 : -3 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.28, 1] }}
            >
              {/* Lid outer back face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(160deg, #52525b 0%, #3f3f46 40%, #27272a 100%)",
                  borderRadius: "10px 10px 0 0",
                  backfaceVisibility: "hidden",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* Apple-style logo mark */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.1)", fontFamily: "monospace" }}>{"<>"}</span>
                </div>
              </div>

              {/* Screen (inside of lid — flipped 180° so it faces forward when lid opens) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "10px 10px 0 0",
                  transform: "rotateX(180deg)",
                  backfaceVisibility: "hidden",
                  overflow: "hidden",
                  background: "#000",
                }}
              >
                {/* Screen bezel */}
                <div style={{
                  position: "absolute",
                  inset: 10,
                  borderRadius: 6,
                  overflow: "hidden",
                  background: "#050510",
                  boxShadow: isLit
                    ? "0 0 60px rgba(59,130,246,0.5), inset 0 0 40px rgba(59,130,246,0.08)"
                    : "none",
                  transition: "box-shadow 0.8s ease",
                }}>
                  {/* Screen ambient aurora */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLit ? 1 : 0 }}
                    transition={{ duration: 1 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `
                        radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.35) 0%, transparent 55%),
                        radial-gradient(ellipse at 75% 65%, rgba(6,182,212,0.25) 0%, transparent 50%)
                      `,
                    }}
                  />

                  {/* Scanline texture */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)",
                    pointerEvents: "none",
                  }} />

                  {/* Screen content */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: isLit ? 1 : 0, y: isLit ? 0 : 14 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    {/* Blinking cursor line */}
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "steps(1)" }}
                      style={{
                        fontSize: 10,
                        color: "rgba(6,182,212,0.7)",
                        fontFamily: "'Courier New', monospace",
                        letterSpacing: "0.12em",
                        marginBottom: 4,
                      }}
                    >
                      $ loading portfolio...
                    </motion.div>

                    <span style={{
                      fontSize: 22,
                      fontWeight: 700,
                      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                      background: "linear-gradient(90deg, #60a5fa 0%, #22d3ee 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "-0.02em",
                    }}>
                      Felipe Roldán
                    </span>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      <div style={{ width: 24, height: 1, background: "rgba(96,165,250,0.35)" }} />
                      <span style={{
                        fontSize: 8,
                        letterSpacing: "0.45em",
                        color: "rgba(107,114,128,0.8)",
                        fontFamily: "'Inter', sans-serif",
                        textTransform: "uppercase",
                      }}>
                        portfolio
                      </span>
                      <div style={{ width: 24, height: 1, background: "rgba(96,165,250,0.35)" }} />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Progress bar */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 56,
            width: 140,
            height: 2,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #3b82f6, #22d3ee)",
              borderRadius: 999,
              originX: 0,
            }}
            initial={{ scaleX: 0 }}
            animate={{
              scaleX:
                phase === "idle"    ? 0.04 :
                phase === "opening" ? 0.42 :
                phase === "lit"     ? 0.85 :
                1,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Skip hint */}
        <div style={{
          position: "absolute",
          bottom: 32,
          display: "flex",
          gap: 48,
          alignItems: "center",
        }}>
          <span style={{
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "#3f3f46",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
          }}>
            click anywhere to skip
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
