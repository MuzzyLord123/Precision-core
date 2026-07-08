import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const customEase = [0.22, 1, 0.36, 1] as const;

const Counter = ({ target, suffix = "", decimal = false, inView }: { target: number; suffix?: string; decimal?: boolean; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 2500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(decimal ? parseFloat((eased * target).toFixed(1)) : Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, decimal]);
  return <>{decimal ? count.toFixed(1) : count.toLocaleString()}{suffix}</>;
};

const stats = [
  { value: 12847, suffix: "+", label: "Devices Repaired", sublabel: "Since 2020" },
  { value: 4.9, suffix: "", label: "Average Rating", sublabel: "2,400+ reviews", decimal: true },
  { value: 98, suffix: "%", label: "Same Day Completion", sublabel: "Walk-in repairs" },
  { value: 45, suffix: "min", label: "Average Repair Time", sublabel: "Screen replacements" },
  { value: 12, suffix: "mo", label: "Warranty Period", sublabel: "Parts & labour" },
  { value: 0, suffix: "£", label: "Diagnosis Fee", sublabel: "Always free", prefix: "£" },
];

const StatsCounter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: "hsl(var(--background))" }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.02) 0%, transparent 50%, hsl(var(--primary) / 0.02) 100%)" }} />
      <div className="absolute inset-0 grain" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.7, ease: customEase }}
              className="text-center"
            >
              <div className="font-display font-extralight text-[44px] md:text-[52px] text-foreground leading-none mb-2">
                {stat.label === "Diagnosis Fee" ? (
                  <span>£0</span>
                ) : (
                  <Counter target={stat.value} suffix={stat.suffix} decimal={stat.decimal} inView={inView} />
                )}
              </div>
              <div className="font-body text-[13px] text-foreground/40 font-medium mb-1">{stat.label}</div>
              <div className="font-mono text-[9px] text-foreground/15 tracking-wide">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
