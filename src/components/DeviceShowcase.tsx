import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, Tablet, Laptop, Monitor, Watch, Headphones, Gamepad2, ArrowUpRight } from "lucide-react";
import SectionReveal from "./SectionReveal";
import devicesShowcase from "@/assets/devices-showcase.jpg";

const customEase = [0.22, 1, 0.36, 1] as const;

const devices = [
  { name: "iPhone", repairs: 8, icon: Smartphone, href: "/devices/iphone", popular: true },
  { name: "Samsung Galaxy", repairs: 7, icon: Smartphone, href: "/devices/samsung", popular: true },
  { name: "iPad", repairs: 6, icon: Tablet, href: "/devices/ipad" },
  { name: "MacBook", repairs: 7, icon: Laptop, href: "/devices/macbook", popular: true },
  { name: "Windows Laptop", repairs: 6, icon: Laptop, href: "/devices/laptop" },
  { name: "iMac", repairs: 5, icon: Monitor, href: "/devices/imac" },
  { name: "Apple Watch", repairs: 4, icon: Watch, href: "/devices/apple-watch" },
  { name: "AirPods", repairs: 3, icon: Headphones, href: "/devices/airpods" },
  { name: "Gaming Consoles", repairs: 5, icon: Gamepad2, href: "/devices/gaming-consoles" },
];

const Counter = ({ target, inView }: { target: number; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <>{count}</>;
};

const DeviceShowcase = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionReveal className="relative overflow-hidden" style={{ backgroundColor: "hsl(var(--background))" }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={devicesShowcase} alt="" className="w-full h-full object-cover opacity-8" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.6) 50%, hsl(var(--background)) 100%)" }} />
      </div>
      <div className="absolute inset-0 grain" />

      <div className="container mx-auto px-6 py-32 md:py-48 relative z-10">
        <div className="text-center mb-20 md:mb-24">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-[1px] bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70">Device Expertise</span>
            <div className="w-10 h-[1px] bg-primary" />
          </div>
          <h2 className="font-display font-extralight text-[48px] md:text-[76px] lg:text-[96px] leading-[0.9] text-foreground tracking-[-0.03em] mb-5">
            We repair <span className="text-primary/80">everything.</span>
          </h2>
          <p className="font-body font-light text-[17px] text-foreground/35 max-w-[500px] mx-auto leading-[1.8]">
            From the latest flagship to the beloved classic. Every brand, every model.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {devices.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.8, ease: customEase }}
              >
                <Link
                  to={d.href}
                  className="group relative block rounded-[24px] p-7 md:p-8 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--foreground) / 0.04) 0%, hsl(var(--foreground) / 0.01) 100%)",
                    border: "1px solid hsl(var(--foreground) / 0.06)",
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "inset 0 1px 0 hsl(var(--foreground) / 0.06), 0 0 40px hsl(var(--primary) / 0.06)" }} />
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                  {d.popular && (
                    <span className="absolute top-4 right-4 font-mono text-[8px] text-primary/60 tracking-[0.15em] uppercase px-2 py-1 rounded-full" style={{ backgroundColor: "hsl(var(--primary) / 0.06)" }}>
                      Popular
                    </span>
                  )}

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{ backgroundColor: "hsl(var(--foreground) / 0.04)", border: "1px solid hsl(var(--foreground) / 0.06)" }}>
                      <Icon className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="font-body text-[17px] font-semibold text-foreground/90 mb-2">{d.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-[13px] text-primary">
                      <Counter target={d.repairs} inView={inView} />
                    </span>
                    <span className="font-mono text-[12px] text-foreground/25">repair types</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-foreground/20 group-hover:text-primary/60 transition-colors duration-300">
                    <span className="font-body text-[12px]">View repairs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
};

export default DeviceShowcase;
