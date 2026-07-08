import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionReveal from "./SectionReveal";

const customEase = [0.22, 1, 0.36, 1] as const;

const reviews = [
  { quote: "Absolutely fantastic service. My iPhone was back in my hands within the hour, screen perfect. It's like it never happened.", name: "Sarah Thompson", device: "iPhone 15 Pro Max", repair: "Screen Replacement", time: "45 mins" },
  { quote: "MobiMedic saved my MacBook after a devastating coffee spill. Professional, transparent, and genuinely caring. Can't recommend them enough.", name: "James Richardson", device: "MacBook Air M2", repair: "Water Damage Recovery", time: "Same day" },
  { quote: "Best repair experience I've ever had. The price was upfront, the repair was fast, and the warranty gives real peace of mind. Outstanding.", name: "Emma Watson", device: "Samsung Galaxy S24 Ultra", repair: "Screen Replacement", time: "60 mins" },
  { quote: "They recovered data from my water-damaged phone that two other repair shops said was completely impossible. Absolutely incredible work.", name: "David Mitchell", device: "iPhone 14 Pro", repair: "Data Recovery", time: "24 hours" },
  { quote: "Walked in with a cracked iPad, walked out 40 minutes later with it looking brand new. Superb quality and customer service.", name: "Lucy Patterson", device: "iPad Pro 12.9\"", repair: "Screen Replacement", time: "40 mins" },
  { quote: "My MacBook keyboard was completely unresponsive. They replaced it with genuine parts and it feels better than new. Remarkable.", name: "Tom Bradley", device: "MacBook Pro 16\"", repair: "Keyboard Repair", time: "3 hours" },
];

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

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const [featured, setFeatured] = useState(0);

  // Auto-rotate featured review
  useEffect(() => {
    const interval = setInterval(() => setFeatured((f) => (f + 1) % reviews.length), 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionReveal className="py-32 md:py-48 grain relative overflow-hidden" style={{ backgroundColor: "hsl(var(--background))" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, hsl(var(--background) / 0.6) 100%)" }} />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-[1px] bg-primary" />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70">Reviews</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <h2 className="font-display font-extralight text-[48px] md:text-[76px] lg:text-[96px] text-foreground tracking-[-0.03em] leading-[0.9]">
            Trusted by<br /><span className="text-primary/80">thousands.</span>
          </h2>
          <p className="font-body font-light text-[17px] text-foreground/30 max-w-[380px] mt-6 md:mt-0 leading-[1.8]">
            Don't take our word for it — hear from the device owners we've helped.
          </p>
        </div>

        {/* Featured review - large */}
        <div className="mb-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={featured}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: customEase }}
              className="rounded-[28px] p-10 md:p-14 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.06) 0%, hsl(var(--foreground) / 0.02) 100%)", border: "1px solid hsl(var(--primary) / 0.1)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)" }} />
              <Quote className="w-12 h-12 text-primary/10 mb-6" strokeWidth={1} />
              <p className="font-display font-light text-[24px] md:text-[32px] text-foreground/70 leading-[1.4] mb-8 max-w-4xl">
                "{reviews[featured].quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.05))", border: "1px solid hsl(var(--primary) / 0.15)" }}>
                  <span className="font-display text-[18px] text-primary">{reviews[featured].name[0]}</span>
                </div>
                <div>
                  <span className="font-body text-[16px] font-medium text-foreground/80 block">{reviews[featured].name}</span>
                  <span className="font-mono text-[11px] text-foreground/25">{reviews[featured].device} · {reviews[featured].repair} · {reviews[featured].time}</span>
                </div>
                <div className="flex gap-1 ml-auto">
                  {Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 text-primary fill-primary" strokeWidth={0} />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <div className="flex gap-2 mt-4 justify-end">
            <button onClick={() => setFeatured((f) => (f - 1 + reviews.length) % reviews.length)} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ border: "1px solid hsl(var(--foreground) / 0.06)" }}>
              <ChevronLeft className="w-4 h-4 text-foreground/30" />
            </button>
            <button onClick={() => setFeatured((f) => (f + 1) % reviews.length)} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ border: "1px solid hsl(var(--foreground) / 0.06)" }}>
              <ChevronRight className="w-4 h-4 text-foreground/30" />
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 justify-center mt-4">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setFeatured(i)} className="relative w-8 h-1 rounded-full overflow-hidden" style={{ background: "hsl(var(--foreground) / 0.06)" }}>
                {featured === i && (
                  <motion.div className="absolute inset-0 bg-primary rounded-full" layoutId="review-dot" transition={{ type: "spring", stiffness: 300, damping: 25 }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Small review cards grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.filter((_, i) => i !== featured).slice(0, 3).map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.8, ease: customEase }}
              className="group rounded-[20px] p-7 relative overflow-hidden transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              style={{ background: "hsl(var(--foreground) / 0.03)", border: "1px solid hsl(var(--foreground) / 0.05)" }}
              onClick={() => setFeatured(reviews.indexOf(r))}
            >
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, j) => <Star key={j} className="w-3 h-3 text-primary fill-primary" strokeWidth={0} />)}
              </div>
              <p className="font-body text-[13px] text-foreground/40 leading-[1.7] mb-5 line-clamp-3">"{r.quote}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--primary) / 0.1)" }}>
                  <span className="font-mono text-[10px] text-primary">{r.name[0]}</span>
                </div>
                <div>
                  <span className="font-body text-[12px] font-medium text-foreground/50 block">{r.name}</span>
                  <span className="font-mono text-[9px] text-foreground/15">{r.device}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <div ref={statsRef} className="mt-20 md:mt-24 rounded-[24px] p-10 md:p-12 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16" style={{ background: "linear-gradient(135deg, hsl(var(--foreground) / 0.04) 0%, hsl(var(--foreground) / 0.015) 100%)", border: "1px solid hsl(var(--foreground) / 0.06)" }}>
          <div className="text-center">
            <div className="font-display font-extralight text-[72px] md:text-[88px] text-foreground leading-none">
              {statsInView ? "4.9" : "0.0"}
            </div>
            <div className="flex gap-1 justify-center mt-2">
              {Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 text-primary fill-primary" strokeWidth={0} />)}
            </div>
          </div>
          <div className="w-[1px] h-16 hidden md:block" style={{ background: "linear-gradient(180deg, transparent, hsl(var(--primary) / 0.2), transparent)" }} />
          <div className="text-center md:text-left">
            <div className="font-display text-[36px] font-light text-foreground leading-none mb-1">
              <Counter target={2400} suffix="+" inView={statsInView} />
            </div>
            <span className="font-mono text-[11px] text-foreground/25 tracking-wide">Verified Reviews</span>
          </div>
          <div className="w-[1px] h-16 hidden md:block" style={{ background: "linear-gradient(180deg, transparent, hsl(var(--primary) / 0.2), transparent)" }} />
          <div className="text-center md:text-left">
            <div className="font-display text-[36px] font-light text-foreground leading-none mb-1">
              <Counter target={98} suffix="%" inView={statsInView} />
            </div>
            <span className="font-mono text-[11px] text-foreground/25 tracking-wide">Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
};

export default Testimonials;
