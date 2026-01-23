import { motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MotionImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export const MotionImage = ({
  src,
  alt,
  className = "",
  containerClassName = "",
}: MotionImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`overflow-hidden ${containerClassName}`}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={className}
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.05 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease: "easeOut" }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </motion.div>
  );
};
