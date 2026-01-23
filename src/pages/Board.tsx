import { User } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { MotionSection, MotionCard } from "@/components/motion";

const boardMembers = [
  { name: "Iyas Fares", title: "President" },
  { name: "Neveen Ayesh", title: "Vice President" },
  { name: "Mohamad Abdeljabbar", title: "Treasurer" },
  { name: "Ahlam Abdeljabbar", title: "Secretary" },
  { name: "Lulu Hamdan", title: "Communications & PR" },
  { name: "Haithem Abdeljabbar", title: "Advisor" },
  { name: "Monir Jarabaa", title: "Advisor" },
];

const Board = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <MotionSection className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Board of Directors
            </h1>
            <p className="text-lg text-muted-foreground">
              Dedicated leaders serving our community with integrity and commitment.
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
                  <MotionCard className="card-heritage p-6 text-center group h-full">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4 group-hover:bg-primary/10 transition-colors">
                      <User className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">{member.title}</p>
                  </MotionCard>
                </MotionSection>
              ))}
            </div>

            {/* Note */}
            <MotionSection delay={0.5} className="mt-12">
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-muted-foreground">
                  Our board members volunteer their time and expertise to serve the Beiteen community. 
                  Directors receive no compensation for their service.
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
            <MotionSection className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Board Governance
              </h2>
            </MotionSection>
            <div className="grid md:grid-cols-2 gap-6">
              <MotionSection delay={0.1}>
                <MotionCard className="bg-card rounded-lg p-6 border border-border h-full">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    Term of Service
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Directors are elected at the annual meeting and serve two-year terms. 
                    Directors may serve no more than two consecutive terms.
                  </p>
                </MotionCard>
              </MotionSection>
              <MotionSection delay={0.2}>
                <MotionCard className="bg-card rounded-lg p-6 border border-border h-full">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    Meetings
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Board meetings are held every two months at a time and place determined 
                    by the Board. A majority of Directors constitutes a quorum.
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
