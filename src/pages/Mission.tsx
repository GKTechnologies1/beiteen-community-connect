import { Heart, Users, Compass, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { MotionSection, MotionCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Mission = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <MotionSection className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Mission
            </h1>
            <p className="text-lg text-muted-foreground">
              Guided by our founding principles and commitment to community.
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <MotionSection variant="scaleIn">
              <MotionCard className="card-heritage p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-3 rounded-full bg-primary/10"
                    whileHover={prefersReducedMotion ? {} : { rotate: 5, scale: 1.1 }}
                  >
                    <Star className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Mission Statement
                  </h2>
                </div>
                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed italic border-l-4 border-primary pl-6">
                  "Rooted in our Articles of Incorporation, the Beiteen Association U.S.A. is a non-profit, non-political, and non-sectarian organization committed to charitable, cultural, educational, and social advancement. We exist to support, uplift, and connect individuals and families through programs and initiatives that foster growth, heritage, and community pride."
                </blockquote>
              </MotionCard>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* Our Why Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <MotionSection className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Why
              </h2>
              <p className="text-muted-foreground">
                The heart behind everything we do.
              </p>
            </MotionSection>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Reconnecting Families",
                  description: "We believe in the power of family bonds. Our programs help families reconnect across generations and distances, strengthening the ties that bind us together.",
                },
                {
                  icon: Users,
                  title: "Multi-Generational Unity",
                  description: "From our elders who carry wisdom to our youth who carry the future, we create spaces where all generations come together to learn, share, and grow.",
                },
                {
                  icon: Compass,
                  title: "Rebuilding Community Ties",
                  description: "Through cultural events, educational programs, and community gatherings, we rebuild and strengthen the connections that make our community thrive.",
                },
              ].map((item, index) => (
                <MotionSection key={item.title} delay={index * 0.1}>
                  <MotionCard className="card-heritage p-6 text-center h-full">
                    <motion.div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      <item.icon className="h-7 w-7" />
                    </motion.div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </MotionCard>
                </MotionSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <MotionSection className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Our Four Pillars
              </h2>
            </MotionSection>
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
                <MotionSection key={pillar.title} delay={index * 0.1}>
                  <motion.div
                    className="flex items-start gap-6 p-6 rounded-lg bg-card border border-border"
                    whileHover={prefersReducedMotion ? {} : { x: 4, boxShadow: "0 4px 20px -5px hsl(30 15% 15% / 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className={`flex-shrink-0 w-12 h-12 rounded-full ${pillar.color} text-primary-foreground flex items-center justify-center font-heading font-bold text-xl`}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    >
                      {index + 1}
                    </motion.div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-muted-foreground">{pillar.description}</p>
                    </div>
                  </motion.div>
                </MotionSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Mission;
