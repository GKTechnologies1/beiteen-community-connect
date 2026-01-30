import { User } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { MotionSection, MotionCard } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Board = () => {
  const { t, isRTL } = useLanguage();

  const boardMembers = [
    { name: "Iyas Fares", titleKey: "board.roles.president" },
    { name: "Neveen Ayesh", titleKey: "board.roles.vp" },
    { name: "Mohamad Abdeljabbar", titleKey: "board.roles.treasurer" },
    { name: "Ahlam Abdeljabbar", titleKey: "board.roles.secretary" },
    { name: "Lulu Hamdan", titleKey: "board.roles.communications" },
    { name: "Haithem Abdeljabbar", titleKey: "board.roles.advisor" },
    { name: "Monir Jarabaa", titleKey: "board.roles.advisor" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <MotionSection className={`max-w-3xl mx-auto text-center ${isRTL ? 'text-right' : ''}`}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("board.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("board.subtitle")}
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Board Members Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {boardMembers.map((member, index) => (
                <MotionSection key={member.name} delay={index * 0.08}>
                  <MotionCard className={`card-heritage p-6 text-center group h-full ${isRTL ? 'text-right' : ''}`}>
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4 group-hover:bg-primary/10 transition-colors ${isRTL ? 'float-right ml-4' : ''}`}>
                      <User className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-1 clear-both">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">{t(member.titleKey)}</p>
                  </MotionCard>
                </MotionSection>
              ))}
            </div>

            {/* Note */}
            <MotionSection delay={0.5} className="mt-12">
              <div className={`p-6 bg-muted rounded-lg text-center ${isRTL ? 'text-right' : ''}`}>
                <p className="text-muted-foreground">
                  {t("board.note")}
                </p>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* Board Info */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <MotionSection className={`text-center mb-8 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                {t("board.governance.title")}
              </h2>
            </MotionSection>
            <div className="grid md:grid-cols-2 gap-6">
              <MotionSection delay={0.1}>
                <MotionCard className={`bg-card rounded-lg p-6 border border-border h-full ${isRTL ? 'text-right' : ''}`}>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    {t("board.governance.term.title")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("board.governance.term.desc")}
                  </p>
                </MotionCard>
              </MotionSection>
              <MotionSection delay={0.2}>
                <MotionCard className={`bg-card rounded-lg p-6 border border-border h-full ${isRTL ? 'text-right' : ''}`}>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    {t("board.governance.meetings.title")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("board.governance.meetings.desc")}
                  </p>
                </MotionCard>
              </MotionSection>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Board;
