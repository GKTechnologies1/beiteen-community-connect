import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollIndicatorProps {
  targetId: string;
  className?: string;
}

export const ScrollIndicator = ({ targetId, className = "" }: ScrollIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    const handleScroll = () => {
      setIsVisible(window.scrollY < 80);
    };

    checkDesktop();
    handleScroll();

    window.addEventListener("resize", checkDesktop);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkDesktop);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTarget = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isDesktop) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTarget}
          className={`flex flex-col items-center gap-2 cursor-pointer group ${className}`}
          aria-label="Scroll to next section"
        >
          {/* Mouse outline */}
          <div className="relative w-6 h-10 rounded-full border-2 border-primary/60 group-hover:border-primary transition-colors duration-300">
            {/* Animated wheel dot */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
              initial={{ top: 6, opacity: 1 }}
              animate={
                prefersReducedMotion
                  ? { top: 10, opacity: 0.7 }
                  : {
                      top: [6, 20, 6],
                      opacity: [1, 0, 1],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
          </div>
          {/* Scroll label */}
          <span className="text-xs font-medium text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-300 tracking-wider uppercase">
            Scroll
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
