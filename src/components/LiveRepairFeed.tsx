import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Activity, Clock, CheckCircle2, Wrench, Zap } from "lucide-react";
import SectionReveal from "./SectionReveal";

const customEase = [0.22, 1, 0.36, 1] as const;

const repairFeed = [
  { device: "iPhone 15 Pro Max", repair: "Screen Replacement", status: "complete", tech: "A. Morris", time: "12 mins ago" },
  { device: "MacBook Air M2", repair: "Battery Replacement", status: "in-progress", tech: "J. Chen", time: "Now" },
  { device: "Samsung Galaxy S24", repair: "Charging Port", status: "in-progress", tech: "A. Morris", time: "Now" },
  { device: "iPad Pro 12.9\"", repair: "Screen Replacement", status: "diagnosis", tech: "J. Chen", time: "5 mins ago" },
  { device: "iPhone 14 Pro", repair: "Camera Repair", status: "complete", tech: "A. Morris", time: "28 mins ago" },
  { device: "MacBook Pro 16\"", repair: "Keyboard Repair", status: "in-progress", tech: "J. Chen", time: "Now" },
  { device: "iPhone 13", repair: "Battery Replacement", status: "complete", tech: "A. Morris", time: "42 mins ago" },
  { device: "Samsung Galaxy A54", repair: "Screen Replacement", status: "diagnosis", tech: "J. Chen", time: "8 mins ago" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof Activity }> = {
  complete: { label: "COMPLETE", color: "hsl(150 60% 45%)", bg: "hsl(150 60% 45% / 0.1)", icon: CheckCircle2 },
  "in-progress": { label: "REPAIRING", color: "hsl(var(--primary))", bg: "hsl(var(--primary) / 0.1)", icon: Wrench },
  diagnosis: { label: "DIAGNOSIS", color: "hsl(45 90% 55%)", bg: "hsl(45 90% 55% / 0.1)", icon: Zap },
};

const LiveRepairFeed = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [pulse, setPulse] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionReveal className="py-32 md:py-48 grain relative overflow-hidden" style={{ backgroundColor: "hsl(var(--background))" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 70% 30%, hsl(var(--primary) / 0.03) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1px] bg-primary" />
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "hsl(150 60% 45%)" }}
                  animate={{ opacity: pulse ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70">Live Workshop</span>
              </div>
            </div>
            <h2 className="font-display font-extralight text-[48px] md:text-[76px] lg:text-[96px] leading-[0.9] tracking-[-0.03em] text-foreground">
              Happening<br /><span className="text-primary/80">right now.</span>
            </h2>
          </div>
          <p className="font-body font-light text-[17px] text-foreground/30 max-w-[380px] mt-6 md:mt-0 leading-[1.8]">
            Watch repairs flow through our workshop in real time. Transparency is how we build trust.
          </p>
        </div>

        {/* Feed */}
        <div className="rounded-[24px] overflow-hidden" style={{ border: "1px solid hsl(var(--foreground) / 0.06)", background: "linear-gradient(135deg, hsl(var(--foreground) / 0.03) 0%, hsl(var(--foreground) / 0.01) 100%)" }}>
          {/* Header */}
          <div className="px-6 md:px-8 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid hsl(var(--foreground) / 0.04)" }}>
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-primary/50" strokeWidth={1.5} />
              <span className="font-mono text-[11px] text-foreground/30 tracking-wide">REPAIR FEED</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-success" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="font-mono text-[10px] text-success/60">LIVE</span>
            </div>
          </div>

          {/* Rows */}
          <AnimatePresence>
            {repairFeed.slice(0, visibleCount).map((item, i) => {
              const config = statusConfig[item.status];
              const StatusIcon = config.icon;
              return (
                <motion.div
                  key={`${item.device}-${item.repair}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: customEase }}
                  className="px-6 md:px-8 py-5 flex items-center justify-between gap-4 group hover:bg-foreground/[0.01] transition-colors"
                  style={{ borderBottom: "1px solid hsl(var(--foreground) / 0.03)" }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: config.bg }}>
                      <StatusIcon className="w-4 h-4" style={{ color: config.color }} strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-body text-[14px] font-medium text-foreground/70 block truncate">{item.device}</span>
                      <span className="font-mono text-[11px] text-foreground/20">{item.repair}</span>
                    </div>
                  </div>
                  <div className="hidden md:block text-right flex-shrink-0">
                    <span className="font-mono text-[10px] text-foreground/15 block">Tech: {item.tech}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-mono text-[9px] tracking-[0.12em] px-3 py-1.5 rounded-full" style={{ background: config.bg, color: config.color }}>
                      {config.label}
                    </span>
                    <div className="flex items-center gap-1 text-foreground/15">
                      <Clock className="w-3 h-3" strokeWidth={1.5} />
                      <span className="font-mono text-[10px]">{item.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Show more */}
          {visibleCount < repairFeed.length && (
            <button
              onClick={() => setVisibleCount(repairFeed.length)}
              className="w-full px-8 py-4 font-mono text-[11px] text-primary/50 hover:text-primary transition-colors tracking-wide"
            >
              Show {repairFeed.length - visibleCount} more repairs ↓
            </button>
          )}
        </div>
      </div>
    </SectionReveal>
  );
};

export default LiveRepairFeed;
