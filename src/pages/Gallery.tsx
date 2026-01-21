import Layout from "@/components/layout/Layout";

// Gallery images with AI-generated placeholders
import communityGathering from "@/assets/gallery/community-gathering.jpg";
import boardMeeting from "@/assets/gallery/board-meeting.jpg";
import culturalCelebration from "@/assets/gallery/cultural-celebration.jpg";
import youthProgram from "@/assets/gallery/youth-program.jpg";
import ramadanIftar from "@/assets/gallery/ramadan-iftar.jpg";
import familyEvent from "@/assets/gallery/family-event.jpg";

const galleryImages = [
  {
    id: 1,
    title: "Community Gathering",
    category: "Events",
    image: communityGathering,
    description: "Community members socializing at a local gathering",
  },
  {
    id: 2,
    title: "Board Meeting",
    category: "Organization",
    image: boardMeeting,
    description: "Board members planning and discussing community initiatives",
  },
  {
    id: 3,
    title: "Cultural Celebration",
    category: "Culture",
    image: culturalCelebration,
    description: "Joyful cultural event with traditional decorations",
  },
  {
    id: 4,
    title: "Youth Program",
    category: "Education",
    image: youthProgram,
    description: "Youth participating in educational activities",
  },
  {
    id: 5,
    title: "Ramadan Iftar",
    category: "Events",
    image: ramadanIftar,
    description: "Community iftar gathering with families sharing a meal",
  },
  {
    id: 6,
    title: "Family Event",
    category: "Community",
    image: familyEvent,
    description: "Multigenerational families spending time together",
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
                  className="card-heritage overflow-hidden group hover-lift"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: `slideUp 0.6s ease-out ${index * 100}ms forwards`
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
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
                </div>
              ))}
            </div>

            {/* More Photos Notice */}
            <div className="mt-12 p-8 bg-muted rounded-lg text-center animate-fade-in" style={{ animationDelay: "600ms" }}>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                More Photos Coming Soon
              </h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                We're continuously adding new photos from community events, cultural celebrations, 
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
