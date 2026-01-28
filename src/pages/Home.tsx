import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, BookOpen, Home as HomeIcon, Globe, Calendar, Shield, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import logo from "@/assets/beiteen-logo.jpeg";
import { MotionSection, MotionCard, ParallaxHero } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LatestUpdates } from "@/components/LatestUpdates";
import { HowYouCanHelp } from "@/components/HowYouCanHelp";

const Home = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-olive-light to-background">
        <ParallaxHero className="section-container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <MotionSection variant="fadeUp" staggerChildren staggerDelay={0.1}>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                <Heart className="h-4 w-4" />
                501(c)(3) Nonprofit Organization
              </motion.div>
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mt-6"
              >
                Building Community,{" "}
                <span className="text-primary">Preserving Heritage</span>
              </motion.h1>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="text-lg text-muted-foreground leading-relaxed max-w-xl mt-6"
              >
                The Beiteen Association U.S.A. connects families and preserves our rich cultural heritage through charitable programs, educational initiatives, and community events.
              </motion.p>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-wrap gap-4 pt-2 mt-6"
              >
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Button asChild size="lg" className="btn-primary">
                    <Link to="/mission">
                      Our Mission
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Button asChild variant="outline" size="lg" className="btn-secondary">
                    <Link to="/contact">Get In Touch</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </MotionSection>
            <MotionSection variant="scaleIn" delay={0.2}>
              <div className="relative mx-auto max-w-md">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl opacity-60"
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.02, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <img
                  src={logo}
                  alt="Beiteen Association - Heritage and Community"
                  className="relative rounded-2xl shadow-xl border-4 border-card w-full aspect-square object-cover"
                />
              </div>
            </MotionSection>
          </div>
        </ParallaxHero>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <MotionSection className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              Guided by our commitment to community, culture, and connection.
            </p>
          </MotionSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Charitable",
                description: "Supporting those in need within our community through various assistance programs.",
              },
              {
                icon: BookOpen,
                title: "Educational",
                description: "Fostering learning and growth through scholarships and educational initiatives.",
              },
              {
                icon: Users,
                title: "Cultural",
                description: "Preserving and celebrating our rich Palestinian heritage and traditions.",
              },
              {
                icon: HomeIcon,
                title: "Social",
                description: "Building strong connections through gatherings, events, and family support.",
              },
            ].map((value, index) => (
              <MotionSection key={value.title} delay={index * 0.1}>
                <MotionCard className="card-heritage p-6 text-center h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </MotionCard>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="section-container">
          <MotionSection className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who We Serve
            </h2>
            <p className="text-muted-foreground">
              Our community extends across generations and geography, united by shared heritage.
            </p>
          </MotionSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Families of Beiteen",
                description: "Descendants and relatives of the village of Beiteen, connecting our extended family.",
              },
              {
                icon: BookOpen,
                title: "Youth & Future Generations",
                description: "Young people learning about their heritage and building connections for the future.",
              },
              {
                icon: Heart,
                title: "Elders & Heritage Keepers",
                description: "Those who preserve our stories, traditions, and cultural knowledge.",
              },
              {
                icon: Globe,
                title: "Community Near & Far",
                description: "Members locally in St. Louis and connected globally through our shared roots.",
              },
            ].map((item, index) => (
              <MotionSection key={item.title} delay={index * 0.1}>
                <MotionCard className="card-heritage p-6 text-center h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </MotionCard>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <MotionSection variant="fadeUp">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                What We Do
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Through our programs and initiatives, we strengthen bonds within our community while giving back to those in need.
              </p>
              <div className="grid gap-4">
                {[
                  {
                    icon: Calendar,
                    title: "Community Gatherings & Cultural Events",
                    description: "Regular events including Ramadan iftars, Eid celebrations, and family gatherings.",
                  },
                  {
                    icon: BookOpen,
                    title: "Educational & Youth Programs",
                    description: "Supporting scholarships and educational opportunities for young community members.",
                  },
                  {
                    icon: Heart,
                    title: "Humanitarian Initiatives",
                    description: "Charitable programs supporting families in need locally and abroad.",
                  },
                  {
                    icon: Globe,
                    title: "Cultural Preservation",
                    description: "Documenting and celebrating our Palestinian heritage and traditions.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </MotionSection>
            <MotionSection variant="scaleIn" delay={0.2}>
              <motion.div
                className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 text-center"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="font-heading text-5xl md:text-6xl font-bold text-primary mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  5 Year
                </motion.div>
                <div className="font-heading text-2xl text-foreground mb-2">
                  Community Property Goal
                </div>
                <p className="text-muted-foreground">
                  A permanent home for our community in St. Louis
                </p>
              </motion.div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* Commitment to Transparency Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <MotionSection>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Commitment to Transparency
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                The Beiteen Association U.S.A. operates with the highest standards of ethical governance. 
                Our bylaws are publicly available, and we are committed to responsible stewardship of all 
                contributions. We believe in community accountability and maintain open communication 
                with our members about how resources are used to serve our mission.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Button asChild variant="outline" size="lg">
                    <Link to="/bylaws">View Our Bylaws</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Button asChild variant="outline" size="lg">
                    <Link to="/board">Meet Our Board</Link>
                  </Button>
                </motion.div>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* How You Can Help Section */}
      <HowYouCanHelp className="py-16 md:py-24 bg-background" />

      {/* Latest Updates Strip */}
      <section className="py-12 bg-muted/30">
        <div className="section-container">
          <div className="max-w-lg mx-auto">
            <LatestUpdates />
          </div>
        </div>
      </section>

      {/* Volunteer CTA Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="section-container">
          <MotionCard className="card-heritage p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                  <HandHeart className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Volunteer With Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Looking for ways to contribute beyond financial support? We welcome volunteers who can help 
                  with event planning, youth mentoring, cultural programming, and more. Your time and talents 
                  make a real difference in our community.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Button asChild size="lg" className="btn-primary">
                    <Link to="/contact">
                      Get Involved
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </MotionCard>
        </div>
      </section>

      {/* Main CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <MotionSection className="section-container text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Whether you're looking to reconnect with your heritage, support our community initiatives, or simply learn more about Beiteen, we welcome you with open arms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-medium">
                <Link to="/membership">Become a Member</Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-medium"
              >
                <Link to="/donations">Support Our Mission</Link>
              </Button>
            </motion.div>
          </div>
        </MotionSection>
      </section>
    </Layout>
  );
};

export default Home;
