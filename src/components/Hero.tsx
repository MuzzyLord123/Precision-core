import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import PriceCheckWidget from "./PriceCheckWidget";
import heroBg from "@/assets/hero-bg.jpg";
import { Shield, Clock, Wrench, Award } from "lucide-react";

const customEase = [0.22, 1, 0.36, 1] as const;

const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{ left: x, top: y, width: size, height: size, backgroundColor: "hsl(var(--primary) / 0.15)" }}
    animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
    transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

// Scramble text effect
const ScrambleText = ({ text, delay: startDelay = 0 }: { text: string; delay?: number }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplay(
          text.split("").map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        iteration += 1 / 2;
        if (iteration >= text.length) clearInterval(interval);
      }, 30);
    }, startDelay * 1000);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, startDelay]);

  return <>{display}</>;
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const trustItems = [
    { icon: Shield, label: "No Fix, No Fee" },
    { icon: Clock, label: "Same Day Service" },
    { icon: Wrench, label: "Genuine Parts" },
    { icon: Award, label: "12-Month Warranty" },
  ];

  const particles = [
    { delay: 0, x: "15%", y: "25%", size: 3 }, { delay: 1.2, x: "78%", y: "18%", size: 2 },
    { delay: 0.6, x: "42%", y: "72%", size: 4 }, { delay: 2.1, x: "88%", y: "55%", size: 2 },
    { delay: 1.8, x: "25%", y: "80%", size: 3 }, { delay: 0.3, x: "62%", y: "35%", size: 2 },
    { delay: 3.0, x: "8%", y: "60%", size: 3 }, { delay: 2.5, x: "55%", y: "90%", size: 2 },
    { delay: 1.5, x: "92%", y: "40%", size: 3 }, { delay: 0.9, x: "35%", y: "15%", size: 2 },
  ];

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center overflow-hidden" style={{ backgroundColor: "hsl(var(--background))" }}>
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20 scale-110" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, hsl(240 6% 3.3% / 0.97) 0%, hsl(240 6% 3.3% / 0.65) 40%, hsl(240 6% 3.3% / 0.9) 100%)" }} />
      </motion.div>

      {/* Layers */}
      <div className="absolute inset-0 grain" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 30% 50%, transparent 0%, hsl(240 6% 3.3% / 0.6) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)", backgroundSize: "100% 4px" }} />

      {/* Particles */}
      {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}

      {/* Ambient glows */}
      <motion.div
        className="absolute top-[15%] left-[5%] w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 50%)", filter: "blur(80px)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 50%)", filter: "blur(60px)" }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ghost device */}
      <motion.div
        className="absolute right-[-3%] top-[8%] w-[240px] h-[480px] rounded-[48px]"
        style={{ border: "1px solid hsl(var(--foreground) / 0.02)" }}
        animate={{ y: [0, -20, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      <motion.div className="container mx-auto px-6 pt-32 pb-24 lg:pt-0 lg:pb-0 relative z-10" style={{ y: contentY, opacity }}>
        <div className="grid lg:grid-cols-[58%_42%] gap-12 lg:gap-16 items-center min-h-screen">
          {/* Left */}
          <div>
            {/* Status badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-8"
              style={{ background: "hsl(var(--primary) / 0.06)", border: "1px solid hsl(var(--primary) / 0.12)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.3, duration: 0.6, ease: customEase }}
            >
              <motion.div className="w-2 h-2 rounded-full bg-success" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="font-mono text-[11px] tracking-[0.08em] text-foreground/50">
                <ScrambleText text="Open Now · Guilden Sutton, Chester" delay={1.5} />
              </span>
            </motion.div>

            {/* Headline with character animation */}
            <h1 className="font-display font-extralight text-[52px] md:text-[80px] lg:text-[120px] leading-[0.88] tracking-[-0.03em] text-foreground mb-8">
              {"Your device.".split("").map((char, i) => (
                <motion.span
                  key={`a${i}`}
                  initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 1.4 + i * 0.02, duration: 0.7, ease: customEase }}
                  className="inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : undefined }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              <span className="relative">
                {"Restored.".split("").map((char, i) => (
                  <motion.span
                    key={`b${i}`}
                    initial={{ opacity: 0, y: 50, filter: "blur(12px)", rotateX: 90 }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
                    transition={{ delay: 1.7 + i * 0.025, duration: 0.7, ease: customEase }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.2))" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2.2, duration: 0.8, ease: customEase }}
                  layoutId="hero-underline"
                />
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              className="font-body font-light text-[18px] md:text-[21px] leading-[1.75] max-w-[540px] mb-12 text-foreground/40"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.7, ease: customEase }}
            >
              Expert repairs for iPhone, Samsung, iPad, MacBook and more. Walk-in welcome. Same-day turnaround. Genuine parts. 12-month warranty on every repair.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.6, ease: customEase }}
            >
              <Link
                to="/book"
                className="group relative overflow-hidden font-body font-semibold text-[15px] rounded-2xl h-[62px] px-12 flex items-center justify-center text-primary-foreground transition-all duration-500"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(355 71% 36%) 100%)", boxShadow: "0 0 0 1px hsl(var(--primary) / 0.3), 0 12px 40px hsl(var(--primary) / 0.25), 0 4px 12px hsl(var(--primary) / 0.15)" }}
                data-cursor="cta"
              >
                <span className="relative z-10">Book a Repair</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <Link
                to="/pricing"
                className="group font-body font-normal text-[15px] text-foreground/40 rounded-2xl h-[62px] px-10 flex items-center justify-center transition-all duration-300 hover:text-foreground/70"
                style={{ border: "1px solid hsl(var(--foreground) / 0.06)", backdropFilter: "blur(12px)", background: "hsl(var(--foreground) / 0.02)" }}
              >
                See Repair Prices
                <motion.span className="ml-2 inline-block" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
              </Link>
            </motion.div>

            {/* Trust pills */}
            <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 0.6 }}>
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full px-4 py-2"
                  style={{ background: "hsl(var(--foreground) / 0.03)", border: "1px solid hsl(var(--foreground) / 0.04)" }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6 + i * 0.08, duration: 0.5, ease: customEase }}
                  whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.15)" }}
                >
                  <item.icon className="w-3.5 h-3.5 text-primary/60" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] text-foreground/25 tracking-wide">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Price Check with 3D tilt */}
          <div className="hidden lg:block">
            <motion.div
              whileHover={{ rotateY: 2, rotateX: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            >
              <PriceCheckWidget />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <span className="font-mono text-[9px] text-foreground/[0.12] tracking-[0.25em] uppercase">Explore</span>
        <motion.div className="w-8 h-14 rounded-full border border-foreground/[0.08] flex items-start justify-center pt-2">
          <motion.div
            className="w-1 h-3 rounded-full bg-primary/50"
            animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
