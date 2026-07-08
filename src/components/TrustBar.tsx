import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Shield, Clock, Award, Wrench, MapPin, Star, CheckCircle, Zap, Heart } from "lucide-react";

const items = [
  { icon: Clock, label: "SAME DAY REPAIRS" },
  { icon: Shield, label: "12-MONTH WARRANTY" },
  { icon: CheckCircle, label: "NO FIX NO FEE" },
  { icon: Wrench, label: "GENUINE PARTS" },
  { icon: MapPin, label: "GUILDEN SUTTON" },
  { icon: Star, label: "4.9★ RATED" },
  { icon: Award, label: "2,400+ REPAIRS" },
  { icon: Zap, label: "PRIORITY SERVICE" },
  { icon: Heart, label: "CUSTOMER FIRST" },
  { icon: Clock, label: "SAME DAY REPAIRS" },
  { icon: Shield, label: "12-MONTH WARRANTY" },
  { icon: CheckCircle, label: "NO FIX NO FEE" },
  { icon: Wrench, label: "GENUINE PARTS" },
  { icon: MapPin, label: "GUILDEN SUTTON" },
  { icon: Star, label: "4.9★ RATED" },
  { icon: Award, label: "2,400+ REPAIRS" },
  { icon: Zap, label: "PRIORITY SERVICE" },
  { icon: Heart, label: "CUSTOMER FIRST" },
];

const TrustBar = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={ref} className="relative overflow-hidden py-8" style={{ backgroundColor: "hsl(var(--background))", borderTop: "1px solid hsl(var(--foreground) / 0.03)", borderBottom: "1px solid hsl(var(--foreground) / 0.03)" }}>
      {/* Gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-40 z-10" style={{ background: "linear-gradient(90deg, hsl(var(--background)) 0%, transparent 100%)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-40 z-10" style={{ background: "linear-gradient(270deg, hsl(var(--background)) 0%, transparent 100%)" }} />

      {/* Row 1 */}
      <motion.div className="flex whitespace-nowrap mb-3" style={{ x }}>
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <span key={`a${i}`} className="font-mono text-[10px] tracking-[0.16em] uppercase mx-8 text-foreground/15 flex items-center gap-2.5">
              <Icon className="w-3.5 h-3.5 text-primary/30" strokeWidth={1.5} />
              {item.label}
            </span>
          );
        })}
      </motion.div>

      {/* Row 2 - reverse */}
      <div className="flex animate-scroll-left whitespace-nowrap" style={{ animationDirection: "reverse", animationDuration: "40s" }}>
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <span key={`b${i}`} className="font-mono text-[10px] tracking-[0.16em] uppercase mx-8 text-foreground/8 flex items-center gap-2.5">
              <Icon className="w-3.5 h-3.5 text-primary/15" strokeWidth={1.5} />
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TrustBar;
