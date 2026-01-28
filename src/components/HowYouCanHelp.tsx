import { Link } from "react-router-dom";
import { Users, Heart, HandHeart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionSection, MotionCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HowYouCanHelpProps {
  className?: string;
}

const helpOptions = [
  {
    icon: Users,
    title: "Become a Member",
    description: "Join our community with an annual membership and access all events and programs.",
    link: "/membership",
    linkText: "Sign Up",
  },
  {
    icon: Heart,
    title: "Make a Donation",
    description: "Support our mission with a one-time or recurring contribution.",
    link: "/donations",
    linkText: "Donate",
  },
  {
    icon: HandHeart,
    title: "Volunteer",
    description: "Share your time and talents to help with events, mentoring, and more.",
    link: "/contact",
    linkText: "Get Involved",
  },
];

export const HowYouCanHelp = ({ className = "" }: HowYouCanHelpProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={className}>
      <div className="section-container">
        <MotionSection className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            How You Can Help
          </h2>
          <p className="text-muted-foreground">
            There are many ways to support our community and make a difference.
          </p>
        </MotionSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {helpOptions.map((option, index) => (
            <MotionSection key={option.title} delay={index * 0.1}>
              <MotionCard className="card-heritage p-6 h-full flex flex-col">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <option.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {option.description}
                </p>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-accent hover:bg-transparent">
                    <Link to={option.link} className="flex items-center gap-1">
                      {option.linkText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </MotionCard>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowYouCanHelp;
