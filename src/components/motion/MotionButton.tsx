import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MotionButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        className={className}
        whileHover={prefersReducedMotion ? {} : { y: -2, boxShadow: "0 4px 12px -2px hsl(30 15% 15% / 0.12)" }}
        whileTap={prefersReducedMotion ? {} : { y: 0, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

MotionButton.displayName = "MotionButton";
