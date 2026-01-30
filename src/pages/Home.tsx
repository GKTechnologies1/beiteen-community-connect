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
import ScrollIndicator from "@/components/ScrollIndicator";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t, isRTL } = useLanguage();

  const coreValues = [
    {
      icon: Heart,
      titleKey: "home.values.charitable.title",
      descKey: "home.values.charitable.desc",
    },
    {
      icon: BookOpen,
      titleKey: "home.values.educational.title",
      descKey: "home.values.educational.desc",
    },
    {
      icon: Users,
      titleKey: "home.values.cultural.title",
      descKey: "home.values.cultural.desc",
    },
    {
      icon: HomeIcon,
      titleKey: "home.values.social.title",
      descKey: "home.values.social.desc",
    },
  ];

  const whoWeServe = [
    {
      icon: Users,
      titleKey: "home.serve.families.title",
      descKey: "home.serve.families.desc",
    },
    {
      icon: BookOpen,
      titleKey: "home.serve.youth.title",
      descKey: "home.serve.youth.desc",
    },
    {
      icon: Heart,
      titleKey: "home.serve.elders.title",
      descKey: "home.serve.elders.desc",
    },
    {
      icon: Globe,
      titleKey: "home.serve.community.title",
      descKey: "home.serve.community.desc",
    },
  ];

  const whatWeDo = [
    {
      icon: Calendar,
      titleKey: "home.whatWeDo.gatherings.title",
      descKey: "home.whatWeDo.gatherings.desc",
    },
    {
      icon: BookOpen,
      titleKey: "home.whatWeDo.education.title",
      descKey: "home.whatWeDo.education.desc",
    },
    {
      icon: Heart,
      titleKey: "home.whatWeDo.humanitarian.title",
      descKey: "home.whatWeDo.humanitarian.desc",
    },
    {
      icon: Globe,
      titleKey: "home.whatWeDo.preservation.title",
      descKey: "home.whatWeDo.preservation.desc",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-olive-light to-background">
        <ParallaxHero className="section-container py-16 md:py-24">
          <div className={`grid md:grid-cols-2 gap-12 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <MotionSection variant="fadeUp" staggerChildren staggerDelay={0.1}>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <Heart className="h-4 w-4" />
                {t("home.badge")}
              </motion.div>
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className={`font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mt-6 ${isRTL ? 'text-right' : ''}`}
              >
                {t("home.hero.title1")}{" "}
                <span className="text-primary">{t("home.hero.title2")}</span>
              </motion.h1>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className={`text-lg text-muted-foreground leading-relaxed max-w-xl mt-6 ${isRTL ? 'text-right' : ''}`}
              >
                {t("home.hero.description")}
              </motion.p>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className={`flex flex-wrap gap-4 pt-2 mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Button asChild size="lg" className="btn-primary">
                    <Link to="/mission">
                      {t("home.hero.missionBtn")}
                      <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Button asChild variant="outline" size="lg" className="btn-secondary">
                    <Link to="/contact">{t("home.hero.contactBtn")}</Link>
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
        
        {/* Scroll Indicator - Desktop only */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ScrollIndicator targetId="core-values" label={t("common.scroll")} />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* Values Section */}
      <section id="core-values" className="py-16 md:py-24 bg-background scroll-mt-20">
        <div className="section-container">
          <MotionSection className={`text-center max-w-2xl mx-auto mb-12 ${isRTL ? 'text-right' : ''}`}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("home.values.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("home.values.subtitle")}
            </p>
          </MotionSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <MotionSection key={value.titleKey} delay={index * 0.1}>
                <MotionCard className={`card-heritage p-6 text-center h-full ${isRTL ? 'text-right' : ''}`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 ${isRTL ? 'float-right ml-4' : ''}`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2 clear-both">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t(value.descKey)}</p>
                </MotionCard>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="section-container">
          <MotionSection className={`text-center max-w-2xl mx-auto mb-12 ${isRTL ? 'text-right' : ''}`}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("home.serve.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("home.serve.subtitle")}
            </p>
          </MotionSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoWeServe.map((item, index) => (
              <MotionSection key={item.titleKey} delay={index * 0.1}>
                <MotionCard className={`card-heritage p-6 text-center h-full ${isRTL ? 'text-right' : ''}`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4 ${isRTL ? 'float-right ml-4' : ''}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2 clear-both">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                </MotionCard>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className={`grid md:grid-cols-2 gap-12 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <MotionSection variant="fadeUp">
              <h2 className={`font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 ${isRTL ? 'text-right' : ''}`}>
                {t("home.whatWeDo.title")}
              </h2>
              <p className={`text-muted-foreground leading-relaxed mb-8 ${isRTL ? 'text-right' : ''}`}>
                {t("home.whatWeDo.subtitle")}
              </p>
              <div className="grid gap-4">
                {whatWeDo.map((item, index) => (
                  <motion.div
                    key={item.titleKey}
                    className={`flex items-start gap-4 p-4 bg-muted/50 rounded-lg ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">{t(item.titleKey)}</h3>
                      <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </MotionSection>
            <MotionSection variant="scaleIn" delay={0.2}>
              <motion.div
                className={`bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 text-center ${isRTL ? 'text-right' : ''}`}
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
                  {t("home.whatWeDo.goal")}
                </motion.div>
                <div className="font-heading text-2xl text-foreground mb-2">
                  {t("home.whatWeDo.goalTitle")}
                </div>
                <p className="text-muted-foreground">
                  {t("home.whatWeDo.goalDesc")}
                </p>
              </motion.div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* Commitment to Transparency Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="section-container">
          <div className={`max-w-3xl mx-auto text-center ${isRTL ? 'text-right' : ''}`}>
            <MotionSection>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 ${isRTL ? 'float-right ml-6' : ''}`}>
                <Shield className="h-8 w-8" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 clear-both">
                {t("home.transparency.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t("home.transparency.desc")}
              </p>
              <div className={`flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Button asChild variant="outline" size="lg">
                    <Link to="/bylaws">{t("home.transparency.bylawsBtn")}</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Button asChild variant="outline" size="lg">
                    <Link to="/board">{t("home.transparency.boardBtn")}</Link>
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
            <div className={`grid md:grid-cols-2 gap-8 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4 ${isRTL ? 'float-right ml-4' : ''}`}>
                  <HandHeart className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 clear-both">
                  {t("home.volunteer.title")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("home.volunteer.desc")}
                </p>
              </div>
              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'md:justify-start' : 'md:justify-end'}`}>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <Button asChild size="lg" className="btn-primary">
                    <Link to="/contact">
                      {t("home.volunteer.btn")}
                      <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
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
        <MotionSection className={`section-container text-center ${isRTL ? 'text-right' : ''}`}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {t("home.join.title")}
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            {t("home.join.desc")}
          </p>
          <div className={`flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <motion.div
              whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-medium h-12 px-8">
                <Link to="/membership">{t("home.join.memberBtn")}</Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Button asChild size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-medium h-12 px-8">
                <Link to="/donations">{t("home.join.donateBtn")}</Link>
              </Button>
            </motion.div>
          </div>
        </MotionSection>
      </section>
    </Layout>
  );
};

export default Home;
