import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Search, CheckCircle, Settings, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionReveal from "./SectionReveal";

const customEase = [0.22, 1, 0.36, 1] as const;

const steps = [
  { num: 1, title: "DROP OFF OR BOOK", desc: "Walk in any time or book online — same-day slots available. No appointment necessary for quick fixes.", icon: MapPin, accent: "Reserve your slot in under 60 seconds" },
  { num: 2, title: "FREE DIAGNOSIS", desc: "We inspect your device thoroughly and confirm the exact repair needed. No hidden costs, no surprises.", icon: Search, accent: "Transparent pricing upfront" },
  { num: 3, title: "YOUR APPROVAL", desc: "We confirm the price, turnaround time, and parts quality. You approve before we begin any work.", icon: CheckCircle, accent: "You stay in control" },
  { num: 4, title: "EXPERT REPAIR", desc: "Precision repair by our certified technicians using genuine and premium-grade components only.", icon: Settings, accent: "Board-level micro-soldering" },
  { num: 5, title: "COLLECT & GO", desc: "Fully tested, professionally cleaned, and ready. Every repair carries our 12-month warranty.", icon: Package, accent: "Quality guaranteed" },
];

const RepairProcess = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <SectionReveal className="py-32 md:py-48 relative overflow-hidden" dark={false}>
      <div className="absolute inset-0 bg-light-bg" />
      <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 0%) 0.5px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        <div className="text-center mb-20 md:mb-24" ref={ref}>
          <motion.div
            className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="w-10 h-[1px] bg-primary" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, ease: customEase }} style={{ transformOrigin: "right" }} />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70">The Process</span>
            <motion.div className="w-10 h-[1px] bg-primary" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, ease: customEase }} style={{ transformOrigin: "left" }} />
          </motion.div>
          <motion.h2
            className="font-display font-extralight text-[48px] md:text-[76px] leading-[0.9] tracking-[-0.03em] text-light-text mb-5"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: customEase, delay: 0.1 }}
          >
            How your repair works.
          </motion.h2>
          <motion.p
            className="font-body font-light text-[17px] text-light-secondary max-w-[500px] mx-auto leading-[1.8]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: customEase, delay: 0.2 }}
          >
            Five simple steps from broken to brilliant. No guesswork, no hidden fees.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Scroll-linked connecting line */}
          <div className="hidden md:block absolute top-[72px] left-[10%] right-[10%] h-[1px]" style={{ background: "hsl(var(--primary) / 0.06)" }}>
            <motion.div className="h-full" style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.1))", scaleX: lineScale, transformOrigin: "left" }} />
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-5">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.8, ease: customEase }}
                  className="relative text-center group"
                >
                  <div className="relative mx-auto mb-8">
                    <motion.div
                      className="w-[72px] h-[72px] rounded-full mx-auto flex items-center justify-center relative z-10 transition-all duration-500 group-hover:scale-110"
                      style={{
                        background: "hsl(0 0% 100%)",
                        border: "2px solid hsl(var(--primary) / 0.12)",
                        boxShadow: "0 4px 20px hsl(0 0% 0% / 0.04), 0 0 0 6px hsl(var(--primary) / 0.03)",
                      }}
                      whileHover={{ boxShadow: "0 4px 20px hsl(var(--primary) / 0.1), 0 0 0 6px hsl(var(--primary) / 0.08)" }}
                    >
                      <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 rounded-full mx-auto"
                      style={{ width: 72, height: 72, border: "1px solid hsl(var(--primary) / 0.1)" }}
                      animate={inView ? { scale: [1, 1.5], opacity: [0.5, 0] } : {}}
                      transition={{ delay: 0.5 + i * 0.15, duration: 1.5, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full mx-auto"
                      style={{ width: 72, height: 72, border: "1px solid hsl(var(--primary) / 0.05)" }}
                      animate={inView ? { scale: [1, 2], opacity: [0.3, 0] } : {}}
                      transition={{ delay: 0.7 + i * 0.15, duration: 1.5, ease: "easeOut" }}
                    />
                  </div>

                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 font-display font-extralight text-[100px] leading-none select-none pointer-events-none" style={{ color: "hsl(var(--primary) / 0.03)" }}>
                    {step.num}
                  </div>

                  <h3 className="font-mono text-[11px] font-semibold tracking-[0.12em] mb-3 text-light-text">{step.title}</h3>
                  <p className="font-body text-[13px] font-light leading-[1.7] text-light-secondary mb-3">{step.desc}</p>
                  <span className="font-mono text-[9px] text-primary/50 tracking-wide uppercase">{step.accent}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: customEase }}
        >
          <Link
            to="/book"
            className="group inline-flex items-center gap-2 font-body text-[14px] font-semibold text-primary-foreground rounded-xl h-[50px] px-8"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(355 71% 36%))" }}
          >
            Start Your Repair <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </SectionReveal>
  );
};

export default RepairProcess;
