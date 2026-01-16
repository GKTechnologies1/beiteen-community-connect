import { Image as ImageIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";

// Placeholder images for gallery - these would be replaced with actual community images
const galleryImages = [
  {
    id: 1,
    title: "Community Gathering",
    category: "Events",
    placeholder: true,
  },
  {
    id: 2,
    title: "Board Meeting",
    category: "Organization",
    placeholder: true,
  },
  {
    id: 3,
    title: "Cultural Celebration",
    category: "Culture",
    placeholder: true,
  },
  {
    id: 4,
    title: "Youth Program",
    category: "Education",
    placeholder: true,
  },
  {
    id: 5,
    title: "Ramadan Iftar",
    category: "Events",
    placeholder: true,
  },
  {
    id: 6,
    title: "Family Event",
    category: "Community",
    placeholder: true,
  },
];

const Gallery = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Gallery
            </h1>
            <p className="text-lg text-muted-foreground">
              Moments from our community gatherings, cultural events, and shared experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="card-heritage overflow-hidden group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                    <div className="text-center p-6">
                      <ImageIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Image Coming Soon
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded mb-2">
                      {image.category}
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {image.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Coming Soon Notice */}
            <div className="mt-12 p-8 bg-muted rounded-lg text-center">
              <ImageIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                More Photos Coming Soon
              </h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                We're building our gallery with photos from community events, cultural celebrations, 
                and special moments. Check back soon for updates!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
