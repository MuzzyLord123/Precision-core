import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import SectionReveal from "./SectionReveal";

const customEase = [0.22, 1, 0.36, 1] as const;

const MapSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionReveal className="py-32 md:py-48 relative overflow-hidden" dark={false}>
      <div className="absolute inset-0 bg-light-bg" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: customEase }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1px] bg-primary" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70">Find Us</span>
            </div>
            <h2 className="font-display font-extralight text-[48px] md:text-[76px] leading-[0.9] tracking-[-0.03em] text-light-text mb-8">
              Visit our<br /><span className="text-primary/80">workshop.</span>
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--primary) / 0.05)", border: "1px solid hsl(var(--primary) / 0.08)" }}>
                  <MapPin className="w-5 h-5 text-primary/60" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-body text-[15px] font-semibold text-light-text mb-1">Address</h4>
                  <p className="font-body text-[14px] text-light-secondary leading-[1.6]">Guilden Sutton<br />Chester, CH3</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--primary) / 0.05)", border: "1px solid hsl(var(--primary) / 0.08)" }}>
                  <Clock className="w-5 h-5 text-primary/60" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-body text-[15px] font-semibold text-light-text mb-1">Opening Hours</h4>
                  <p className="font-body text-[14px] text-light-secondary leading-[1.6]">Mon–Fri: 9am–6pm<br />Sat: 10am–4pm<br />Sun: Closed</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--primary) / 0.05)", border: "1px solid hsl(var(--primary) / 0.08)" }}>
                  <Phone className="w-5 h-5 text-primary/60" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-body text-[15px] font-semibold text-light-text mb-1">Contact</h4>
                  <p className="font-body text-[14px] text-light-secondary leading-[1.6]">01234 567 890<br />hello@mobimedic.co.uk</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                to="/contact"
                className="group font-body text-[14px] font-semibold text-primary-foreground rounded-xl h-[50px] px-8 flex items-center gap-2"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(355 71% 36%))" }}
              >
                Get Directions <Navigation className="w-4 h-4" />
              </Link>
              <Link
                to="/book"
                className="font-body text-[14px] text-light-secondary rounded-xl h-[50px] px-6 flex items-center"
                style={{ border: "1px solid hsl(0 0% 0% / 0.08)" }}
              >
                Book a Visit
              </Link>
            </div>
          </motion.div>

          {/* Right - Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: customEase, delay: 0.2 }}
            className="relative rounded-[28px] overflow-hidden"
            style={{ height: "clamp(350px, 45vw, 500px)", border: "1px solid hsl(0 0% 0% / 0.06)" }}
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(240 6% 92%) 0%, hsl(240 6% 96%) 100%)" }}>
              {/* Stylized map visualization */}
              <svg className="w-full h-full opacity-20" viewBox="0 0 400 400">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-light-secondary/30" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#grid)" />
                {/* Roads */}
                <path d="M0 200 Q100 180 200 200 T400 200" stroke="currentColor" strokeWidth="3" fill="none" className="text-light-secondary/40" />
                <path d="M200 0 Q180 100 200 200 T200 400" stroke="currentColor" strokeWidth="3" fill="none" className="text-light-secondary/40" />
                <path d="M50 100 Q150 120 250 80 T400 120" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-light-secondary/20" />
                <path d="M100 300 Q200 280 300 320 T400 300" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-light-secondary/20" />
              </svg>

              {/* Pin */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(355 71% 36%))", boxShadow: "0 4px 20px hsl(var(--primary) / 0.4)" }}>
                    <MapPin className="w-5 h-5 text-white" strokeWidth={2} fill="white" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{ background: "hsl(var(--primary))" }} />
                </div>
              </motion.div>

              {/* Pulse rings */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
                style={{ border: "2px solid hsl(var(--primary) / 0.2)" }}
                animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
                style={{ border: "2px solid hsl(var(--primary) / 0.2)" }}
                animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              />
            </div>

            {/* Label */}
            <div className="absolute bottom-5 left-5 right-5 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid hsl(0 0% 0% / 0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--primary) / 0.1)" }}>
                  <MapPin className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-body text-[13px] font-semibold text-light-text">MobiMedic Workshop</span>
                  <span className="font-mono text-[10px] text-light-secondary block">Guilden Sutton, Chester CH3</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
};

export default MapSection;
