import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, Battery, Zap, Camera, Droplets, HardDrive, Keyboard, Monitor, Sparkles, ArrowUpRight } from "lucide-react";
import SectionReveal from "./SectionReveal";

const customEase = [0.22, 1, 0.36, 1] as const;

const services = [
  { icon: Smartphone, title: "Screen Replacement", desc: "Cracked, shattered, or unresponsive displays restored with OLED, LCD, and genuine panel options.", devices: "iPhone · Samsung · iPad · Laptops", price: "£49", href: "/repairs/screen-replacement" },
  { icon: Battery, title: "Battery Replacement", desc: "Degraded, swollen, or fast-draining batteries replaced with OEM and premium-grade cells.", devices: "iPhone · Samsung · MacBook · Laptops", price: "£39", href: "/repairs/battery-replacement" },
  { icon: Zap, title: "Charging Port Repair", desc: "Not charging, loose connection, bent pins — Lightning, USB-C, and MagSafe port repairs.", devices: "All devices", price: "£35", href: "/repairs/charging-port" },
  { icon: Camera, title: "Camera Repair", desc: "Front or rear camera replacement for cracked lens, autofocus failure, and blurry images.", devices: "iPhone · Samsung · iPad", price: "£59", href: "/repairs/camera-repair" },
  { icon: Droplets, title: "Water Damage Recovery", desc: "Ultrasonic cleaning, board-level repair, corrosion removal, and component restoration.", devices: "All devices", price: "£49", href: "/repairs/water-damage" },
  { icon: HardDrive, title: "Data Recovery", desc: "Professional recovery from deleted files, failed drives, and physically damaged devices.", devices: "All devices", price: "£59", href: "/repairs/data-recovery" },
  { icon: Keyboard, title: "Keyboard & Trackpad", desc: "Key replacement, full keyboard swap, trackpad issues, butterfly and scissor mechanism fixes.", devices: "MacBook · Laptops", price: "£69", href: "/repairs/keyboard-repair" },
  { icon: Monitor, title: "Software & Diagnostics", desc: "iOS/Android repairs, virus removal, factory reset, OS reinstall, and speed optimisation.", devices: "All devices", price: "£29", href: "/repairs/software-diagnostics" },
  { icon: Sparkles, title: "Full Restoration", desc: "Complete professional clean — battery, screen, ports. Full health check inside and out.", devices: "Premium service", price: "£99", href: "/repairs/full-restoration" },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: customEase, delay: index * 0.05 }}
    >
      <Link
        to={service.href}
        className="group relative block rounded-[24px] p-8 md:p-9 transition-all duration-500 hover:-translate-y-3"
        style={{
          backgroundColor: "hsl(0 0% 100%)",
          border: "1px solid hsl(0 0% 0% / 0.04)",
          boxShadow: "0 1px 3px hsl(0 0% 0% / 0.02), 0 12px 40px hsl(0 0% 0% / 0.04)",
        }}
      >
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "0 0 0 1px hsl(var(--primary) / 0.15), 0 20px 60px hsl(var(--primary) / 0.08)" }} />
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-600" />

        {/* Arrow reveal */}
        <div className="absolute top-6 right-6 w-9 h-9 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400" style={{ backgroundColor: "hsl(var(--primary) / 0.06)" }}>
          <ArrowUpRight className="w-4 h-4 text-primary" strokeWidth={1.5} />
        </div>

        {/* Icon with pulse on hover */}
        <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110" style={{ backgroundColor: "hsl(var(--primary) / 0.05)", boxShadow: "0 0 0 1px hsl(var(--primary) / 0.08)" }}>
          <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
            style={{ border: "1px solid hsl(var(--primary) / 0.2)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <h3 className="font-body text-[18px] font-semibold mb-2.5 text-light-text">{service.title}</h3>
        <p className="font-body text-[14px] font-light leading-[1.8] mb-5 text-light-secondary">{service.desc}</p>
        <p className="font-mono text-[10px] tracking-[0.08em] mb-5 text-light-secondary/60 uppercase">{service.devices}</p>

        <div className="flex items-center justify-between pt-5" style={{ borderTop: "1px solid hsl(0 0% 0% / 0.04)" }}>
          <span className="font-mono text-[14px] font-medium text-primary px-3.5 py-1.5 rounded-full" style={{ backgroundColor: "hsl(var(--primary) / 0.05)" }}>
            From {service.price}
          </span>
          <span className="font-body text-[13px] text-primary/60 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
            Learn More →
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <SectionReveal className="py-32 md:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-light-bg" />
      <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 0%) 0.5px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 md:mb-24">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: customEase }}
            >
              <motion.div className="w-10 h-[1px] bg-primary" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: customEase }} style={{ transformOrigin: "left" }} />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70">Our Services</span>
            </motion.div>
            <motion.h2
              className="font-display font-extralight text-[48px] md:text-[76px] lg:text-[96px] leading-[0.9] tracking-[-0.03em] text-light-text"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: customEase, delay: 0.1 }}
            >
              Every repair.<br />
              <span className="text-primary/80">Every device.</span>
            </motion.h2>
          </div>
          <motion.div
            className="mt-8 md:mt-0 max-w-[440px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: customEase, delay: 0.2 }}
          >
            <p className="font-body font-light text-[17px] leading-[1.8] text-light-secondary mb-6">
              From cracked screens to water damage, battery replacements to full restorations — MobiMedic handles it all with precision and care.
            </p>
            <Link to="/repairs" className="inline-flex items-center gap-2 font-body text-[14px] text-primary hover:gap-3 transition-all duration-300">
              View All Services <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
};

export default ServicesSection;
