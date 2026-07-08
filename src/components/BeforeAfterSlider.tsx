import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "./SectionReveal";

const customEase = [0.22, 1, 0.36, 1] as const;

const cases = [
  {
    title: "iPhone 15 Pro Max",
    repair: "Screen Replacement",
    time: "45 minutes",
    beforeDesc: "Severely shattered display with touch failure across 60% of the screen. Multiple impact points and hairline fractures.",
    afterDesc: "Factory-grade OLED panel installed. Full touch responsiveness restored. True Tone and 120Hz ProMotion verified.",
    gradient: "from-red-900/30 to-transparent",
    afterGradient: "from-emerald-900/30 to-transparent",
  },
  {
    title: "MacBook Pro 16\"",
    repair: "Water Damage Recovery",
    time: "Same day",
    beforeDesc: "Coffee spill caused complete system failure. Corrosion across logic board, keyboard, and trackpad. Wouldn't power on.",
    afterDesc: "Ultrasonic board cleaning, 14 component replacements via micro-soldering. Full functionality restored with zero data loss.",
    gradient: "from-red-900/30 to-transparent",
    afterGradient: "from-emerald-900/30 to-transparent",
  },
  {
    title: "Samsung Galaxy S24 Ultra",
    repair: "Battery + Port Repair",
    time: "60 minutes",
    beforeDesc: "Battery swollen and expanding case. Charging port intermittent — only worked at specific angles. 23% health remaining.",
    afterDesc: "Premium-grade battery installed at 100% health. New USB-C port with fast-charge verification. Sealed and tested.",
    gradient: "from-red-900/30 to-transparent",
    afterGradient: "from-emerald-900/30 to-transparent",
  },
];

const BeforeAfterSlider = () => {
  const [active, setActive] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current || !isDragging.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <SectionReveal className="py-32 md:py-48 relative overflow-hidden" style={{ backgroundColor: "hsl(var(--background))" }}>
      <div className="absolute inset-0 grain" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 md:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1px] bg-primary" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70">Case Studies</span>
            </div>
            <h2 className="font-display font-extralight text-[48px] md:text-[76px] lg:text-[96px] leading-[0.9] tracking-[-0.03em] text-foreground">
              Before &<br /><span className="text-primary/80">after.</span>
            </h2>
          </div>
          <p className="font-body font-light text-[17px] text-foreground/30 max-w-[400px] mt-6 md:mt-0 leading-[1.8]">
            Real repairs. Real results. Drag the slider to reveal the transformation.
          </p>
        </div>

        {/* Case selector tabs */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {cases.map((c, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setSliderPos(50); }}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 font-body text-[13px] transition-all duration-300 ${
                active === i
                  ? "text-primary-foreground"
                  : "text-foreground/30 hover:text-foreground/50"
              }`}
              style={active === i
                ? { background: "linear-gradient(135deg, hsl(var(--primary)), hsl(355 71% 36%))", boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)" }
                : { border: "1px solid hsl(var(--foreground) / 0.06)", background: "hsl(var(--foreground) / 0.02)" }
              }
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Interactive slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: customEase }}
        >
          <div
            ref={sliderRef}
            className="relative rounded-[28px] overflow-hidden cursor-col-resize select-none"
            style={{
              height: "clamp(300px, 50vw, 520px)",
              border: "1px solid hsl(var(--foreground) / 0.06)",
            }}
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onMouseMove={(e) => handleMove(e.clientX)}
            onTouchStart={() => { isDragging.current = true; }}
            onTouchEnd={() => { isDragging.current = false; }}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          >
            {/* "After" layer (full width behind) */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(150 40% 8%) 0%, hsl(var(--background)) 100%)" }}>
              <div className="absolute top-6 right-6 px-4 py-2 rounded-full font-mono text-[10px] tracking-[0.15em] uppercase" style={{ background: "hsl(150 60% 40% / 0.15)", color: "hsl(150 60% 55%)", border: "1px solid hsl(150 60% 40% / 0.2)" }}>
                ✓ After
              </div>
              <div className="max-w-md px-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: "hsl(150 60% 40% / 0.1)", border: "1px solid hsl(150 60% 40% / 0.15)" }}>
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="font-display text-[28px] font-light text-foreground mb-3">{cases[active].title}</h3>
                <p className="font-body text-[14px] text-foreground/40 leading-[1.8] mb-4">{cases[active].afterDesc}</p>
                <span className="font-mono text-[11px] text-emerald-400/60">Completed in {cases[active].time}</span>
              </div>
            </div>

            {/* "Before" layer (clipped) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(355 50% 8%) 0%, hsl(var(--background)) 100%)",
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            >
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full font-mono text-[10px] tracking-[0.15em] uppercase" style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.2)" }}>
                ✗ Before
              </div>
              <div className="max-w-md px-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.15)" }}>
                  <span className="text-2xl">✗</span>
                </div>
                <h3 className="font-display text-[28px] font-light text-foreground mb-3">{cases[active].title}</h3>
                <p className="font-body text-[14px] text-foreground/40 leading-[1.8] mb-4">{cases[active].beforeDesc}</p>
                <span className="font-mono text-[11px] text-primary/60">{cases[active].repair} needed</span>
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 w-[3px] z-20"
              style={{ left: `${sliderPos}%`, background: "hsl(var(--primary))", boxShadow: "0 0 20px hsl(var(--primary) / 0.4)" }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "hsl(var(--primary))", boxShadow: "0 0 30px hsl(var(--primary) / 0.5), 0 4px 12px rgba(0,0,0,0.3)" }}
              >
                <span className="text-primary-foreground text-[14px] font-bold select-none">⇔</span>
              </div>
            </div>
          </div>

          {/* Repair info bar */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {[cases[active].repair, cases[active].time, "12-Month Warranty", "Genuine Parts"].map((item) => (
              <span key={item} className="font-mono text-[10px] text-foreground/15 tracking-wide px-4 py-2 rounded-full" style={{ border: "1px solid hsl(var(--foreground) / 0.04)" }}>
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  );
};

export default BeforeAfterSlider;
