import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  tiltDegrees?: number;
  scale?: number;
  disableTilt?: boolean;
}

export const MotionCard = ({
  children,
  className = "",
  tiltDegrees = 3,
  scale = 1.02,
  disableTilt = false,
}: MotionCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltDegrees, -tiltDegrees]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltDegrees, tiltDegrees]), springConfig);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || disableTilt || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Simplified version for reduced motion, mobile, or form cards (no tilt)
  if (prefersReducedMotion || disableTilt) {
    return (
      <motion.div
        className={className}
        whileHover={{ scale: disableTilt ? 1.01 : 1.01 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      whileHover={{ scale, boxShadow: "0 10px 40px -10px hsl(30 15% 15% / 0.15)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};
