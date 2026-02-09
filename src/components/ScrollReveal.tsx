import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealVariant = "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

const variantMap: Record<RevealVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
};

const ScrollReveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className,
}: ScrollRevealProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      variants={variantMap[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
