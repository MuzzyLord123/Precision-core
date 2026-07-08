import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  style?: React.CSSProperties;
}

const SectionReveal = ({ children, className = "", dark = true, style }: SectionRevealProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className={`relative ${className}`} style={style}>
      {inView && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ backgroundColor: "#CC2936", transformOrigin: "left", zIndex: 2 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionReveal;
