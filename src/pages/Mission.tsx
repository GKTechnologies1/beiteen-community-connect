import { Heart, Users, Compass, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { MotionSection, MotionCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTitle } from "@/hooks/usePageTitle";

const Mission = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t, isRTL } = useLanguage();
  usePageTitle(t("mission.title"));

  const ourWhy = [
    {
      icon: Heart,
      titleKey: "mission.why.families.title",
      descKey: "mission.why.families.desc",
    },
    {
      icon: Users,
      titleKey: "mission.why.unity.title",
      descKey: "mission.why.unity.desc",
    },
    {
      icon: Compass,
      titleKey: "mission.why.ties.title",
      descKey: "mission.why.ties.desc",
    },
  ];

  const pillars = [
    {
      titleKey: "mission.pillars.charitable.title",
      descKey: "mission.pillars.charitable.desc",
      color: "bg-primary",
    },
    {
      titleKey: "mission.pillars.cultural.title",
      descKey: "mission.pillars.cultural.desc",
      color: "bg-accent",
    },
    {
      titleKey: "mission.pillars.educational.title",
      descKey: "mission.pillars.educational.desc",
      color: "bg-primary",
    },
    {
      titleKey: "mission.pillars.social.title",
      descKey: "mission.pillars.social.desc",
      color: "bg-accent",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <MotionSection className={`max-w-3xl mx-auto text-center ${isRTL ? 'text-right' : ''}`}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("mission.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("mission.subtitle")}
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
                <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <motion.div
                    className="p-3 rounded-full bg-primary/10"
                    whileHover={prefersReducedMotion ? {} : { rotate: 5, scale: 1.1 }}
                  >
                    <Star className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    {t("mission.statement.label")}
                  </h2>
                </div>
                <blockquote className={`text-lg md:text-xl text-foreground leading-relaxed italic border-primary pl-6 ${isRTL ? 'border-r-4 border-l-0 pr-6 pl-0 text-right' : 'border-l-4'}`}>
                  {t("mission.statement.text")}
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
            <MotionSection className={`text-center mb-12 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("mission.why.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("mission.why.subtitle")}
              </p>
            </MotionSection>

            <div className="grid md:grid-cols-3 gap-8">
              {ourWhy.map((item, index) => (
                <MotionSection key={item.titleKey} delay={index * 0.1}>
                  <MotionCard className={`card-heritage p-6 text-center h-full ${isRTL ? 'text-right' : ''}`}>
                    <motion.div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4 ${isRTL ? 'float-right ml-4' : ''}`}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      <item.icon className="h-7 w-7" />
                    </motion.div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3 clear-both">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(item.descKey)}
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
            <MotionSection className={`text-center mb-12 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                {t("mission.pillars.title")}
              </h2>
            </MotionSection>
            <div className="space-y-6">
              {pillars.map((pillar, index) => (
                <MotionSection key={pillar.titleKey} delay={index * 0.1}>
                  <motion.div
                    className={`flex items-start gap-6 p-6 rounded-lg bg-card border border-border ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                    whileHover={prefersReducedMotion ? {} : { x: isRTL ? -4 : 4, boxShadow: "0 4px 20px -5px hsl(30 15% 15% / 0.1)" }}
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
                        {t(pillar.titleKey)}
                      </h3>
                      <p className="text-muted-foreground">{t(pillar.descKey)}</p>
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
