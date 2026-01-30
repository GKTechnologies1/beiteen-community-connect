import { Link } from "react-router-dom";
import { Users, Heart, HandHeart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionSection, MotionCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";

interface HowYouCanHelpProps {
  className?: string;
}

export const HowYouCanHelp = ({ className = "" }: HowYouCanHelpProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { t, isRTL } = useLanguage();

  const helpOptions = [
    {
      icon: Users,
      titleKey: "home.help.member.title",
      descKey: "home.help.member.desc",
      link: "/membership",
      linkTextKey: "home.help.member.btn",
    },
    {
      icon: Heart,
      titleKey: "home.help.donate.title",
      descKey: "home.help.donate.desc",
      link: "/donations",
      linkTextKey: "home.help.donate.btn",
    },
    {
      icon: HandHeart,
      titleKey: "home.help.volunteer.title",
      descKey: "home.help.volunteer.desc",
      link: "/contact",
      linkTextKey: "home.help.volunteer.btn",
    },
  ];

  return (
    <section className={className}>
      <div className="section-container">
        <MotionSection className={`text-center max-w-2xl mx-auto mb-12 ${isRTL ? 'text-right' : ''}`}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("home.help.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("home.help.subtitle")}
          </p>
        </MotionSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {helpOptions.map((option, index) => (
            <MotionSection key={option.titleKey} delay={index * 0.1}>
              <MotionCard className={`card-heritage p-6 h-full flex flex-col ${isRTL ? 'text-right' : ''}`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 ${isRTL ? 'self-end' : ''}`}>
                  <option.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {t(option.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {t(option.descKey)}
                </p>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { x: isRTL ? -4 : 4 }}
                  transition={{ duration: 0.2 }}
                  className={isRTL ? 'self-end' : ''}
                >
                  <Button asChild variant="ghost" className={`p-0 h-auto text-primary hover:text-accent hover:bg-transparent ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Link to={option.link} className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {t(option.linkTextKey)}
                      <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
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
