import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Phone } from "lucide-react";

const EmergencyBanner = () => (
  <motion.div
    className="relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, hsl(var(--background)) 50%, hsl(var(--primary) / 0.05) 100%)",
      borderTop: "1px solid hsl(var(--primary) / 0.1)",
      borderBottom: "1px solid hsl(var(--primary) / 0.1)",
    }}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {/* Animated scan line */}
    <motion.div
      className="absolute top-0 left-0 right-0 h-[1px]"
      style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)" }}
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />

    <div className="container mx-auto px-6 py-8 md:py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.15)" }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </motion.div>
          <div>
            <h3 className="font-body text-[16px] font-semibold text-foreground/80">Emergency Repair?</h3>
            <p className="font-body text-[13px] text-foreground/30">Smashed screen? Water damage? We offer priority same-day emergency repairs.</p>
          </div>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link
            to="/book"
            className="group font-body text-[13px] font-semibold text-primary-foreground rounded-xl h-[44px] px-6 flex items-center gap-2 transition-all"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(355 71% 36%))" }}
          >
            Priority Booking <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="tel:+441234567890"
            className="font-body text-[13px] text-foreground/30 rounded-xl h-[44px] px-5 flex items-center gap-2 transition-colors hover:text-foreground/50"
            style={{ border: "1px solid hsl(var(--foreground) / 0.06)" }}
          >
            <Phone className="w-3.5 h-3.5" /> Call Now
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

export default EmergencyBanner;
