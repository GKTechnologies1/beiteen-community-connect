import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";

const EXCLUDED_ROUTES = ["/membership", "/donations", "/contact"];
const IDLE_TIMEOUT = 6000; // 6 seconds (5-10 range)
const NEAR_TOP_THRESHOLD = 100; // Consider "near top" if within 100px of top

const ScrollHint = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPageScrollable, setIsPageScrollable] = useState(false);
  const [isNearTop, setIsNearTop] = useState(true);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  // Check if current route is excluded
  const isExcludedRoute = EXCLUDED_ROUTES.includes(location.pathname);

  // Check if page is scrollable
  const checkScrollable = useCallback(() => {
    const scrollable = document.documentElement.scrollHeight > window.innerHeight;
    setIsPageScrollable(scrollable);
    return scrollable;
  }, []);

  // Check if user is near the top of the page
  const checkNearTop = useCallback(() => {
    const scrollTop = window.scrollY;
    const nearTop = scrollTop <= NEAR_TOP_THRESHOLD;
    setIsNearTop(nearTop);
    return nearTop;
  }, []);

  // Hide hint immediately
  const hideHint = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Clear any existing idle timer
  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  // Start idle timer to show hint
  const startIdleTimer = useCallback(() => {
    clearIdleTimer();

    // Only start timer if conditions are met
    if (!checkScrollable() || !checkNearTop()) return;

    idleTimerRef.current = setTimeout(() => {
      // Double-check conditions before showing
      if (checkScrollable() && checkNearTop()) {
        setIsVisible(true);
      }
    }, IDLE_TIMEOUT);
  }, [checkScrollable, checkNearTop, clearIdleTimer]);

  // Scroll to show more content
  const handleClick = () => {
    window.scrollBy({
      top: window.innerHeight * 0.7,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    hideHint();
  };

  // Reset on route change
  useEffect(() => {
    setIsVisible(false);
    clearIdleTimer();

    // Check scrollability after route change (slight delay for DOM update)
    const timer = setTimeout(() => {
      checkScrollable();
      checkNearTop();
      if (!isExcludedRoute) {
        startIdleTimer();
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      clearIdleTimer();
    };
  }, [location.pathname, checkScrollable, checkNearTop, startIdleTimer, clearIdleTimer, isExcludedRoute]);

  // Main effect for scroll and interaction handling
  useEffect(() => {
    if (isExcludedRoute) return;

    const handleScroll = () => {
      const nearTop = checkNearTop();
      
      // Hide immediately on any scroll
      hideHint();
      clearIdleTimer();

      // If user scrolled back to top, start idle timer again
      if (nearTop && checkScrollable()) {
        startIdleTimer();
      }
    };

    const handleInteraction = () => {
      // On interaction, reset timer but don't hide (only scroll hides)
      if (checkNearTop() && checkScrollable()) {
        clearIdleTimer();
        startIdleTimer();
      }
    };

    const handleResize = () => {
      checkScrollable();
      checkNearTop();
      if (checkNearTop() && checkScrollable()) {
        startIdleTimer();
      }
    };

    // Initial setup
    checkScrollable();
    checkNearTop();
    startIdleTimer();

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearIdleTimer();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("resize", handleResize);
    };
  }, [isExcludedRoute, hideHint, checkScrollable, checkNearTop, startIdleTimer, clearIdleTimer]);

  // Don't render if excluded route, not scrollable, or not near top
  if (isExcludedRoute || !isPageScrollable || !isNearTop) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={handleClick}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 cursor-pointer group"
          aria-label="Scroll down for more content"
        >
          {/* Mouse outline container */}
          <div className="relative w-7 h-11 rounded-full border-2 border-foreground/30 group-hover:border-primary transition-colors duration-300 bg-background/80">
            {/* Animated wheel dot */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-2.5 bg-foreground/50 group-hover:bg-primary rounded-full"
              initial={{ top: 6, opacity: 1 }}
              animate={
                prefersReducedMotion
                  ? { top: 6, opacity: 1 }
                  : {
                      top: [6, 20],
                      opacity: [1, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: 1.3,
                      repeat: Infinity,
                      ease: "easeOut",
                    }
              }
            />
          </div>

          {/* Scroll label */}
          <span className="text-[10px] font-medium text-foreground/40 group-hover:text-primary/70 transition-colors duration-300 tracking-widest uppercase">
            {t("common.more")}
          </span>

          {/* Subtle pulse ring - only on non-reduced motion */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute -inset-3 rounded-full border border-foreground/10"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollHint;
