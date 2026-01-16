import { Heart, Users, Compass, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Mission = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Mission
            </h1>
            <p className="text-lg text-muted-foreground">
              Guided by our founding principles and commitment to community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="card-heritage p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Mission Statement
                </h2>
              </div>
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed italic border-l-4 border-primary pl-6">
                "Rooted in our Articles of Incorporation, the Beiteen Association U.S.A. is a non-profit, non-political, and non-sectarian organization committed to charitable, cultural, educational, and social advancement. We exist to support, uplift, and connect individuals and families through programs and initiatives that foster growth, heritage, and community pride."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Our Why Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Why
              </h2>
              <p className="text-muted-foreground">
                The heart behind everything we do.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-heritage p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                  <Heart className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  Reconnecting Families
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We believe in the power of family bonds. Our programs help families reconnect across generations and distances, strengthening the ties that bind us together.
                </p>
              </div>

              <div className="card-heritage p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  Multi-Generational Unity
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  From our elders who carry wisdom to our youth who carry the future, we create spaces where all generations come together to learn, share, and grow.
                </p>
              </div>

              <div className="card-heritage p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                  <Compass className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  Rebuilding Community Ties
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Through cultural events, educational programs, and community gatherings, we rebuild and strengthen the connections that make our community thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Our Four Pillars
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Charitable",
                  description:
                    "We provide assistance and support to community members in need, ensuring no one faces hardship alone.",
                  color: "bg-primary",
                },
                {
                  title: "Cultural",
                  description:
                    "We preserve and celebrate our Palestinian heritage through events, traditions, and educational programs.",
                  color: "bg-accent",
                },
                {
                  title: "Educational",
                  description:
                    "We invest in the education and development of our youth, providing resources and opportunities for growth.",
                  color: "bg-primary",
                },
                {
                  title: "Social",
                  description:
                    "We create meaningful opportunities for families and individuals to connect, celebrate, and support one another.",
                  color: "bg-accent",
                },
              ].map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="flex items-start gap-6 p-6 rounded-lg bg-card border border-border"
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full ${pillar.color} text-primary-foreground flex items-center justify-center font-heading font-bold text-xl`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Mission;
