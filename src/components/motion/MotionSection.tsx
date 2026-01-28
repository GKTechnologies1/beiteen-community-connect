import { motion, useInView, Variants } from "framer-motion";
import { forwardRef, useRef, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "fadeUp" | "fadeIn" | "scaleIn";
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  },
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const MotionSection = forwardRef<HTMLDivElement, MotionSectionProps>(
  (
    {
      children,
      className = "",
      variant = "fadeUp",
      delay = 0,
      staggerChildren = false,
      staggerDelay = 0.08,
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const prefersReducedMotion = useReducedMotion();

    const selectedVariants = prefersReducedMotion ? reducedVariants : variants[variant];

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={selectedVariants}
        transition={{
          duration: prefersReducedMotion ? 0.2 : 0.5,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
          ...(staggerChildren && {
            staggerChildren: staggerDelay,
          }),
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);

MotionSection.displayName = "MotionSection";

// Child component for staggered animations
interface MotionItemProps {
  children: ReactNode;
  className?: string;
}

export const MotionItem = ({ children, className = "" }: MotionItemProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? reducedVariants : variants.fadeUp}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
