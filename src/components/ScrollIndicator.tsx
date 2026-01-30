import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollIndicatorProps {
  targetId: string;
  label?: string;
}

const ScrollIndicator = ({ targetId, label = "Scroll" }: ScrollIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY < 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
          className="hidden lg:flex flex-col items-center gap-2 cursor-pointer group"
          aria-label={`Scroll to ${targetId.replace(/-/g, " ")}`}
        >
          {/* Mouse outline container */}
          <div className="relative w-6 h-10 rounded-full border-2 border-muted-foreground/50 group-hover:border-primary transition-colors duration-300">
            {/* Animated wheel dot */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-1 h-2 bg-muted-foreground/70 group-hover:bg-primary rounded-full"
              initial={{ top: 6, opacity: 1 }}
              animate={
                prefersReducedMotion
                  ? { top: 6, opacity: 1 }
                  : {
                      top: [6, 18],
                      opacity: [1, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }
              }
            />
          </div>

          {/* Scroll label */}
          <span className="text-xs font-medium text-muted-foreground/60 group-hover:text-primary/80 transition-colors duration-300 tracking-wider uppercase">
            {label}
          </span>

          {/* Subtle down arrow animation */}
          <motion.div
            className="flex flex-col items-center -mt-1"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, 4, 0],
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            <div className="w-1.5 h-1.5 border-b-2 border-r-2 border-muted-foreground/40 group-hover:border-primary/60 rotate-45 transition-colors duration-300" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;
