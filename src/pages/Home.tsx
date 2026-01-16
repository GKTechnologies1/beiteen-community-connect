import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, BookOpen, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import logo from "@/assets/beiteen-logo.jpeg";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-olive-light to-background">
        <div className="section-container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Heart className="h-4 w-4" />
                501(c)(3) Nonprofit Organization
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Building Community,{" "}
                <span className="text-primary">Preserving Heritage</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                The Beiteen Association U.S.A. connects families and preserves our rich cultural heritage through charitable programs, educational initiatives, and community events.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" className="btn-primary">
                  <Link to="/mission">
                    Our Mission
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="btn-secondary">
                  <Link to="/contact">Get In Touch</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                <img
                  src={logo}
                  alt="Beiteen Association - Heritage and Community"
                  className="relative rounded-2xl shadow-xl border-4 border-card w-full aspect-square object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              Guided by our commitment to community, culture, and connection.
            </p>
          </div>
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
              <div
                key={value.title}
                className="card-heritage p-6 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Vision for the Next 5 Years
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We are working towards a significant milestone: purchasing a dedicated community property in the St. Louis area. This space will serve as the heart of our community activities.
              </p>
              <ul className="space-y-4">
                {[
                  "Community meetings and gatherings",
                  "Ramadan iftars and Eid celebrations",
                  "Youth programs and cultural education",
                  "Family events and social activities",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 text-center">
              <div className="font-heading text-5xl md:text-6xl font-bold text-primary mb-4">
                5 Year
              </div>
              <div className="font-heading text-2xl text-foreground mb-2">
                Community Property Goal
              </div>
              <p className="text-muted-foreground">
                A permanent home for our community in St. Louis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="section-container text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Whether you're looking to reconnect with your heritage, support our community initiatives, or simply learn more about Beiteen, we welcome you with open arms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/board">Meet Our Board</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
