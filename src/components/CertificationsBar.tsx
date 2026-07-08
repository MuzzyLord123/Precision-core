import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Award, BadgeCheck, Fingerprint, Lock, Cpu } from "lucide-react";
import SectionReveal from "./SectionReveal";

const customEase = [0.22, 1, 0.36, 1] as const;

const certs = [
  { icon: Shield, title: "Apple Certified", desc: "Authorised to use genuine Apple components and diagnostic tools" },
  { icon: BadgeCheck, title: "Samsung Partner", desc: "Official Samsung parts supplier with verified repair protocols" },
  { icon: Award, title: "ISO 9001", desc: "Quality management certified — every repair follows strict process standards" },
  { icon: Fingerprint, title: "Data Protection", desc: "ICO registered. Your data never leaves your device during repair" },
  { icon: Lock, title: "Insured & Bonded", desc: "Full professional indemnity insurance on every device we handle" },
  { icon: Cpu, title: "Micro-Soldering", desc: "IPC-certified board-level repair — component-level precision at 0.1mm" },
];

const CertificationsBar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionReveal className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: "hsl(var(--background))" }}>
      <div className="absolute inset-0" style={{ borderTop: "1px solid hsl(var(--foreground) / 0.03)", borderBottom: "1px solid hsl(var(--foreground) / 0.03)" }} />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/50">Certifications & Standards</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {certs.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.7, ease: customEase }}
                className="group text-center p-5 rounded-[20px] transition-all duration-500 hover:-translate-y-1"
                style={{ border: "1px solid hsl(var(--foreground) / 0.04)", background: "hsl(var(--foreground) / 0.02)" }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{ background: "hsl(var(--primary) / 0.05)", border: "1px solid hsl(var(--primary) / 0.08)" }}>
                  <Icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                <h4 className="font-body text-[13px] font-semibold text-foreground/60 mb-1.5">{cert.title}</h4>
                <p className="font-body text-[11px] text-foreground/20 leading-[1.6]">{cert.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
};

export default CertificationsBar;
