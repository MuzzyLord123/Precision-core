import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [hoverState, setHoverState] = useState<"default" | "link" | "cta">("default");
  const [isTouch, setIsTouch] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 145, damping: 19, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 145, damping: 19, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("a, button, [data-cursor='cta'], [data-cursor='link'], input, textarea, select");
      if (!el) { setHoverState("default"); return; }
      if (el.matches("[data-cursor='cta']") || el.matches("button.cta-primary")) {
        setHoverState("cta");
      } else {
        setHoverState("link");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  const dotSize = hoverState === "link" ? 0 : hoverState === "cta" ? 8 : 6;
  const ringSize = hoverState === "link" ? 58 : hoverState === "cta" ? 52 : 38;
  const dotColor = hoverState === "cta" ? "#fff" : "#CC2936";
  const ringBorder = hoverState === "link" ? "rgba(204,41,54,0.85)" : hoverState === "cta" ? "rgba(255,255,255,0.6)" : "rgba(204,41,54,0.50)";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99999,
        }}
        animate={{ width: dotSize, height: dotSize, backgroundColor: dotColor }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          border: `1.5px solid ${ringBorder}`,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99998,
          backgroundColor: hoverState === "link" ? "rgba(204,41,54,0.06)" : "transparent",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: ringBorder,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;
