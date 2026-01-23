import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxHeroProps {
  children: ReactNode;
  className?: string;
  parallaxAmount?: number;
}

export const ParallaxHero = ({
  children,
  className = "",
  parallaxAmount = 0.15,
}: ParallaxHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 100 * parallaxAmount]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReducedMotion ? [1, 1] : [1, 0.8]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, opacity }}
    >
      {children}
    </motion.div>
  );
};
