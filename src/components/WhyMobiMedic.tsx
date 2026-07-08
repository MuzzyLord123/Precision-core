import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Clock, Award, Zap, Microscope, Heart } from "lucide-react";
import SectionReveal from "./SectionReveal";

const customEase = [0.22, 1, 0.36, 1] as const;

const Counter = ({ target, suffix = "", inView }: { target: number; suffix?: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <>{count}{suffix}</>;
};

const pillars = [
  { icon: Shield, title: "No Fix, No Fee", desc: "If we can't fix it, you pay nothing. No diagnosis charges. No wasted trips. That's our promise.", stat: "100%", statLabel: "risk-free" },
  { icon: Award, title: "12-Month Warranty", desc: "Every repair carries a full 12-month warranty on parts and labour. Complete peace of mind.", stat: "12", statLabel: "months covered" },
  { icon: Zap, title: "Genuine Parts", desc: "We exclusively use genuine and premium-grade components. No cheap alternatives. Ever.", stat: "100%", statLabel: "quality parts" },
  { icon: Clock, title: "Same Day Service", desc: "Most repairs completed same day. Book online and your slot is reserved — no waiting around.", stat: "90%", statLabel: "same day" },
  { icon: Microscope, title: "Board-Level Repair", desc: "We go deeper than most. Micro-soldering, component-level diagnostics, and precision restoration.", stat: "0.1", statLabel: "mm precision" },
  { icon: Heart, title: "Customer-First", desc: "We treat every device like our own. Transparent communication, honest advice, genuine care.", stat: "4.9", statLabel: "star rating" },
];

const WhyMobiMedic = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionReveal className="py-32 md:py-48 relative overflow-hidden" dark={false}>
      <div className="absolute inset-0 bg-light-bg" />
      <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 0%) 0.5px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 md:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1px] bg-primary" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70">Why Us</span>
            </div>
            <h2 className="font-display font-extralight text-[48px] md:text-[76px] lg:text-[96px] leading-[0.9] tracking-[-0.03em] text-light-text">
              The MobiMedic<br /><span className="text-primary/80">difference.</span>
            </h2>
          </div>
          <p className="font-body font-light text-[17px] text-light-secondary max-w-[400px] mt-6 md:mt-0 leading-[1.8]">
            Six pillars that set us apart from every other repair shop. No compromises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.8, ease: customEase }}
                className="group rounded-[24px] p-8 md:p-9 relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                style={{
                  backgroundColor: "hsl(0 0% 100%)",
                  border: "1px solid hsl(0 0% 0% / 0.04)",
                  boxShadow: "0 2px 12px hsl(0 0% 0% / 0.03)",
                }}
              >
                {/* Hover effects */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "0 0 0 1px hsl(var(--primary) / 0.1), 0 20px 60px hsl(var(--primary) / 0.06)" }} />

                {/* Background stat watermark */}
                <div className="absolute -top-4 -right-2 font-display font-extralight text-[100px] leading-none select-none pointer-events-none" style={{ color: "hsl(var(--primary) / 0.03)" }}>
                  {p.stat}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{ backgroundColor: "hsl(var(--primary) / 0.05)", boxShadow: "0 0 0 1px hsl(var(--primary) / 0.08)" }}>
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="font-display text-[28px] font-light text-primary leading-none block">{p.stat}</span>
                    <span className="font-mono text-[9px] text-light-secondary/50 tracking-wide uppercase">{p.statLabel}</span>
                  </div>
                </div>

                <h3 className="font-body text-[18px] font-semibold mb-3 text-light-text relative z-10">{p.title}</h3>
                <p className="font-body text-[14px] font-light leading-[1.8] text-light-secondary relative z-10">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
};

export default WhyMobiMedic;
