import { useState, useCallback, useRef, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { MotionSection } from "@/components/motion";
import { motion } from "framer-motion";

// Real gallery images
import beiteen1991 from "@/assets/gallery/beiteen-1991.png";
import beiteenHistoric from "@/assets/gallery/beiteen-historic.png";
// Placeholder images for categories without real photos yet
import communityGathering from "@/assets/gallery/community-gathering.jpg";
import boardMeeting from "@/assets/gallery/board-meeting.jpg";
import culturalCelebration from "@/assets/gallery/cultural-celebration.jpg";
import youthProgram from "@/assets/gallery/youth-program.jpg";

const galleryImages = [
  {
    id: 1,
    title: "Beiteen Association 1991",
    category: "Heritage",
    image: beiteen1991,
    description: "Historic photo from our community's early days in 1991",
  },
  {
    id: 2,
    title: "Our History",
    category: "Heritage",
    image: beiteenHistoric,
    description: "Celebrating our roots and the journey of our community",
  },
  {
    id: 3,
    title: "Community Gathering",
    category: "Events",
    image: communityGathering,
    description: "Community members coming together for a local gathering",
  },
  {
    id: 4,
    title: "Board Meeting",
    category: "Organization",
    image: boardMeeting,
    description: "Board members planning and discussing community initiatives",
  },
  {
    id: 5,
    title: "Cultural Celebration",
    category: "Culture",
    image: culturalCelebration,
    description: "Joyful cultural event with traditional decorations",
  },
  {
    id: 6,
    title: "Youth Program",
    category: "Education",
    image: youthProgram,
    description: "Youth participating in educational activities",
  },
];

// Optimized lazy-loading image component using IntersectionObserver
const LazyImage = ({ 
  src, 
  alt, 
  className 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px", threshold: 0.01 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      ref={imgRef}
      className="relative w-full h-full overflow-hidden bg-muted"
    >
      {/* Solid skeleton placeholder - no blur */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 animate-pulse" />
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

const Gallery = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <MotionSection className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Gallery
            </h1>
            <p className="text-lg text-muted-foreground">
              Moments from our community gatherings, cultural events, and shared experiences.
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <MotionSection key={image.id} delay={index * 0.05}>
                  <motion.div 
                    className="bg-card border border-border rounded-lg overflow-hidden group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Fixed aspect ratio container to prevent layout shift */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <LazyImage
                        src={image.image}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded mb-2">
                        {image.category}
                      </span>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {image.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {image.description}
                      </p>
                    </div>
                  </motion.div>
                </MotionSection>
              ))}
            </div>

            {/* More Photos Notice */}
            <MotionSection delay={0.3} className="mt-12">
              <div className="p-8 bg-muted rounded-lg text-center">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  More Photos Coming Soon
                </h3>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  We're continuously adding new photos from community events, cultural celebrations, 
                  and special moments. Check back soon for updates!
                </p>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
