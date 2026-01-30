import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";

const EXCLUDED_ROUTES = ["/membership", "/donations", "/contact"];
const IDLE_TIMEOUT = 7000; // 7 seconds
const SCROLL_BOTTOM_THRESHOLD = 50; // px from bottom

const ScrollHint = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPageScrollable, setIsPageScrollable] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
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

  // Check if user is at bottom of page
  const checkAtBottom = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const atBottom = scrollTop + windowHeight >= docHeight - SCROLL_BOTTOM_THRESHOLD;
    setIsAtBottom(atBottom);
    return atBottom;
  }, []);

  // Hide hint and reset idle timer
  const hideHint = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Scroll to show more content
  const handleClick = () => {
    window.scrollBy({
      top: window.innerHeight * 0.7,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    hideHint();
  };

  useEffect(() => {
    // Reset visibility on route change
    setIsVisible(false);

    // Check scrollability after route change (slight delay for DOM update)
    const timer = setTimeout(() => {
      checkScrollable();
      checkAtBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, checkScrollable, checkAtBottom]);

  useEffect(() => {
    if (isExcludedRoute) return;

    let idleTimer: ReturnType<typeof setTimeout>;

    const resetIdleTimer = () => {
      hideHint();
      clearTimeout(idleTimer);

      // Only set new timer if page is scrollable and not at bottom
      if (checkScrollable() && !checkAtBottom()) {
        idleTimer = setTimeout(() => {
          // Double-check conditions before showing
          if (checkScrollable() && !checkAtBottom()) {
            setIsVisible(true);
          }
        }, IDLE_TIMEOUT);
      }
    };

    const handleScroll = () => {
      checkAtBottom();
      resetIdleTimer();
    };

    const handleInteraction = () => {
      resetIdleTimer();
    };

    // Initial setup
    checkScrollable();
    checkAtBottom();
    resetIdleTimer();

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("resize", () => {
      checkScrollable();
      checkAtBottom();
    }, { passive: true });

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("resize", () => {
        checkScrollable();
        checkAtBottom();
      });
    };
  }, [isExcludedRoute, hideHint, checkScrollable, checkAtBottom]);

  // Don't render if excluded route, not scrollable, or at bottom
  if (isExcludedRoute || !isPageScrollable || isAtBottom) {
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
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 cursor-pointer group"
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
