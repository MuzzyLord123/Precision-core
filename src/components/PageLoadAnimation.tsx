import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const customEase = [0.22, 1, 0.36, 1] as const;

const PageLoadAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 800),
      setTimeout(() => setPhase(4), 1400),
      setTimeout(() => onComplete(), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: "hsl(var(--background))", zIndex: 100000 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: customEase }}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)", backgroundSize: "40px 40px" }} />

          {/* Horizontal scan */}
          <motion.div
            className="absolute"
            style={{ height: "1px", top: "50%", left: "50%", translateX: "-50%", background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)" }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: phase >= 1 ? "60vw" : 0, opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.4, ease: customEase }}
          />

          {/* Vertical scan */}
          <motion.div
            className="absolute"
            style={{ width: "1px", left: "50%", top: "50%", translateY: "-50%", background: "linear-gradient(180deg, transparent, hsl(var(--primary) / 0.5), transparent)" }}
            initial={{ height: 0 }}
            animate={{ height: phase >= 1 ? "40vh" : 0 }}
            transition={{ duration: 0.3, ease: customEase, delay: 0.1 }}
          />

          {/* Pulse */}
          {phase >= 2 && (
            <>
              <motion.div
                className="absolute w-3 h-3 rounded-full"
                style={{ top: "50%", left: "50%", translateX: "-50%", translateY: "-50%", backgroundColor: "hsl(var(--primary))" }}
                animate={{ scale: [1, 30, 1], opacity: [1, 0, 0] }}
                transition={{ duration: 0.5, ease: customEase }}
              />
              <motion.div
                className="absolute w-2 h-2 rounded-full"
                style={{ top: "50%", left: "50%", translateX: "-50%", translateY: "-50%", border: "1px solid hsl(var(--primary) / 0.3)" }}
                animate={{ scale: [1, 50], opacity: [0.5, 0] }}
                transition={{ duration: 0.7, ease: customEase, delay: 0.1 }}
              />
            </>
          )}

          {/* MOBI */}
          {phase >= 3 && (
            <motion.span
              className="absolute font-display text-foreground"
              style={{ fontSize: 36, fontWeight: 200, top: "50%", letterSpacing: "0.08em" }}
              initial={{ y: -32, opacity: 0, translateY: "-100%", filter: "blur(8px)" }}
              animate={{ y: -6, opacity: 1, translateY: "-100%", filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: customEase }}
            >
              MOBI
            </motion.span>
          )}

          {/* MEDIC */}
          {phase >= 3 && (
            <motion.span
              className="absolute font-display text-primary"
              style={{ fontSize: 36, fontWeight: 200, top: "50%", letterSpacing: "0.08em" }}
              initial={{ y: 32, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 6, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: customEase }}
            >
              MEDIC
            </motion.span>
          )}

          {/* Tagline */}
          {phase >= 3 && (
            <motion.span
              className="absolute font-mono text-[9px] text-foreground/12 tracking-[0.35em] uppercase"
              style={{ top: "58%" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              Precision Device Repairs
            </motion.span>
          )}

          {/* Corner brackets */}
          {phase >= 1 && (
            <>
              <motion.div className="absolute top-[20%] left-[20%]" initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ duration: 0.3 }}>
                <div className="w-8 h-8 border-l border-t border-foreground/30" />
              </motion.div>
              <motion.div className="absolute top-[20%] right-[20%]" initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ duration: 0.3, delay: 0.05 }}>
                <div className="w-8 h-8 border-r border-t border-foreground/30" />
              </motion.div>
              <motion.div className="absolute bottom-[20%] left-[20%]" initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <div className="w-8 h-8 border-l border-b border-foreground/30" />
              </motion.div>
              <motion.div className="absolute bottom-[20%] right-[20%]" initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ duration: 0.3, delay: 0.15 }}>
                <div className="w-8 h-8 border-r border-b border-foreground/30" />
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoadAnimation;
