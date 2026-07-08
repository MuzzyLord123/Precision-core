import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Shield, ArrowUpRight, Sparkles } from "lucide-react";
import SectionReveal from "./SectionReveal";

const customEase = [0.22, 1, 0.36, 1] as const;

const cards = [
  { device: "iPhone 15 Pro Max", repair: "Screen Replacement", price: "229", time: "45 mins", tag: "Most Popular", featured: false },
  { device: "MacBook Pro 14\"", repair: "Battery Replacement", price: "189", time: "2–3 hours", tag: "Premium", featured: true },
  { device: "Samsung Galaxy S24 Ultra", repair: "Screen Replacement", price: "199", time: "60 mins", tag: "Trending", featured: false },
];

const PricingTeaser = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionReveal className="py-32 md:py-48 grain relative overflow-hidden" style={{ backgroundColor: "hsl(var(--background))" }}>
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse, hsl(var(--primary) / 0.05) 0%, transparent 50%)", filter: "blur(80px)" }} />

      <div className="container mx-auto px-6 relative z-10 text-center" ref={ref}>
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-10 h-[1px] bg-primary" />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70">Pricing</span>
          <div className="w-10 h-[1px] bg-primary" />
        </div>
        <h2 className="font-display font-extralight text-[48px] md:text-[76px] lg:text-[96px] text-foreground mb-5 tracking-[-0.03em] leading-[0.9]">
          Transparent <span className="text-primary/80">pricing.</span>
        </h2>
        <p className="font-body font-light text-[17px] text-foreground/30 mb-20 md:mb-24 max-w-[500px] mx-auto leading-[1.8]">
          We believe in showing you the price before you walk through the door. No hidden fees. No surprises.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((c, i) => (
            <motion.div
              key={c.device}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.9, ease: customEase }}
              className={`group rounded-[28px] p-9 text-left relative overflow-hidden transition-all duration-500 hover:-translate-y-3 ${c.featured ? "md:-translate-y-4" : ""}`}
              style={{
                background: c.featured
                  ? "linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, hsl(var(--foreground) / 0.03) 100%)"
                  : "linear-gradient(135deg, hsl(var(--foreground) / 0.05) 0%, hsl(var(--foreground) / 0.015) 100%)",
                border: c.featured
                  ? "1px solid hsl(var(--primary) / 0.15)"
                  : "1px solid hsl(var(--foreground) / 0.06)",
                boxShadow: c.featured
                  ? "0 0 0 1px hsl(var(--primary) / 0.08), 0 20px 60px hsl(var(--primary) / 0.1)"
                  : "0 12px 40px hsl(0 0% 0% / 0.2)",
              }}
            >
              {/* Featured badge */}
              {c.featured && (
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)" }} />
              )}

              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[9px] text-primary/60 tracking-[0.15em] uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ backgroundColor: "hsl(var(--primary) / 0.06)" }}>
                  {c.featured && <Sparkles className="w-3 h-3" />}
                  {c.tag}
                </span>
              </div>

              <span className="font-body text-[18px] font-semibold text-foreground block mb-1">{c.device}</span>
              <span className="font-mono text-[12px] text-foreground/30">{c.repair}</span>

              <div className="flex items-end gap-1.5 mt-8 mb-2">
                <span className="font-mono text-[16px] text-foreground/25 pb-2">£</span>
                <span className="font-display text-[64px] text-primary font-light leading-none">{c.price}</span>
              </div>

              <div className="flex gap-5 mt-4 mb-8">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-foreground/20" strokeWidth={1.5} />
                  <span className="font-mono text-[11px] text-foreground/30">{c.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-foreground/20" strokeWidth={1.5} />
                  <span className="font-mono text-[11px] text-foreground/20">12mo warranty</span>
                </div>
              </div>

              <Link
                to="/book"
                className="w-full rounded-xl h-[50px] flex items-center justify-center gap-2 font-body text-[14px] font-medium transition-all duration-400 group/btn relative overflow-hidden"
                style={c.featured
                  ? { background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(355 71% 36%) 100%)", color: "hsl(var(--primary-foreground))", boxShadow: "0 8px 24px hsl(var(--primary) / 0.2)" }
                  : { border: "1px solid hsl(var(--primary) / 0.25)", color: "hsl(var(--primary))" }
                }
              >
                <span className="relative z-10">Book Now</span>
                <ArrowUpRight className="w-4 h-4 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              </Link>
            </motion.div>
          ))}
        </div>

        <Link to="/pricing" className="inline-flex items-center gap-2 mt-14 font-body text-[14px] text-primary/60 hover:text-primary transition-colors duration-300 hover:gap-3">
          View complete pricing guide <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionReveal>
  );
};

export default PricingTeaser;
