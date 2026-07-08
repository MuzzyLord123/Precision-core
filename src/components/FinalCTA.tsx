import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Phone, Sparkles } from "lucide-react";
import SectionReveal from "./SectionReveal";
import repairDetail from "@/assets/repair-detail.jpg";
import { useRef } from "react";

const customEase = [0.22, 1, 0.36, 1] as const;

const FinalCTA = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <SectionReveal className="relative overflow-hidden" style={{ backgroundColor: "hsl(var(--background))" }}>
      <div className="absolute inset-0">
        <img src={repairDetail} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, hsl(var(--background) / 0.97) 0%, hsl(var(--background) / 0.75) 50%, hsl(var(--background) / 0.97) 100%)" }} />
      </div>
      <div className="absolute inset-0 grain" />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, hsl(var(--primary) / 0.08) 0%, transparent 50%)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] rounded-full"
        style={{ background: "radial-gradient(ellipse, hsl(var(--primary) / 0.04) 0%, transparent 50%)", filter: "blur(40px)" }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div ref={ref} className="container mx-auto px-6 py-32 md:py-48 relative z-10 text-center">
        <motion.div style={{ scale }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: customEase }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-[1px] bg-primary" />
              <Sparkles className="w-4 h-4 text-primary/50" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70">Get Started</span>
              <Sparkles className="w-4 h-4 text-primary/50" />
              <div className="w-10 h-[1px] bg-primary" />
            </div>

            <motion.h2
              className="font-display font-extralight text-[48px] md:text-[76px] lg:text-[104px] text-foreground mb-6 tracking-[-0.03em] leading-[0.9]"
              style={{ y: textY }}
            >
              Ready to fix<br />your <span className="text-primary/80">device?</span>
            </motion.h2>
            <p className="font-body font-light text-[18px] text-foreground/30 mb-14 max-w-[480px] mx-auto leading-[1.8]">
              Drop in or book your repair online in under 2 minutes. Free diagnosis on every repair.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <Link
                to="/book"
                className="group relative overflow-hidden font-body font-semibold text-[15px] rounded-2xl h-[62px] px-14 flex items-center justify-center gap-2 text-primary-foreground transition-all duration-500"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(355 71% 36%) 100%)", boxShadow: "0 0 0 1px hsl(var(--primary) / 0.3), 0 12px 40px hsl(var(--primary) / 0.3), 0 4px 12px hsl(var(--primary) / 0.15)" }}
                data-cursor="cta"
              >
                <span className="relative z-10">Book a Repair</span>
                <ArrowUpRight className="w-4 h-4 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <a
                href="tel:+441234567890"
                className="group font-body text-[15px] text-foreground/35 rounded-2xl h-[62px] px-10 flex items-center justify-center gap-2 transition-all duration-300 hover:text-foreground/60"
                style={{ border: "1px solid hsl(var(--foreground) / 0.06)", backdropFilter: "blur(12px)", background: "hsl(var(--foreground) / 0.02)" }}
              >
                <Phone className="w-4 h-4" /> Call Us Now
              </a>
            </div>

            {/* Animated badges */}
            <div className="flex flex-wrap justify-center gap-4">
              {["Walk-ins welcome", "Guilden Sutton, Chester", "Open Mon–Sat", "Free diagnosis"].map((item, i) => (
                <motion.span
                  key={item}
                  className="font-mono text-[10px] text-foreground/15 tracking-wide px-4 py-2 rounded-full"
                  style={{ border: "1px solid hsl(var(--foreground) / 0.04)" }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  whileHover={{ borderColor: "hsl(var(--primary) / 0.15)", color: "hsl(var(--foreground) / 0.3)" }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionReveal>
  );
};

export default FinalCTA;
