import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { MotionSection, MotionCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Bylaws = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <MotionSection className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Bylaws
            </h1>
            <p className="text-lg text-muted-foreground">
              The governing rules and regulations of Beiteen Association U.S.A.
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Bylaws Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* Download Section */}
            <MotionSection variant="scaleIn">
              <MotionCard className="card-heritage p-8 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="p-3 rounded-full bg-primary/10"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    >
                      <FileText className="h-8 w-8 text-primary" />
                    </motion.div>
                    <div>
                      <h2 className="font-heading text-xl font-semibold text-foreground">
                        Official Bylaws Document
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Beiteen Association of Saint Louis – Bylaws
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { y: -2 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  >
                    <Button asChild className="btn-primary">
                      <a href="/documents/bylaws.docx" download>
                        <Download className="mr-2 h-4 w-4" />
                        Download Bylaws
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </MotionCard>
            </MotionSection>

            {/* Summary Section */}
            <div className="space-y-8">
              <MotionSection delay={0.1}>
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                  Bylaws Overview
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our bylaws establish the framework for how Beiteen Association U.S.A. operates. 
                  They define membership requirements, voting rights, board responsibilities, 
                  and organizational procedures.
                </p>
              </MotionSection>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Article I - Purpose",
                    description: "The organization is established for charitable, cultural, educational, and social purposes as a non-profit, non-political, and non-sectarian entity.",
                  },
                  {
                    title: "Article II - Membership",
                    description: "Community members and their relatives may become members by meeting specified requirements including membership fees and age requirements.",
                  },
                  {
                    title: "Article IV - Board of Directors",
                    description: "The Board consists of up to seven members including President, Vice President, Secretary, Treasurer, Communications Officer, and two Executive Officers.",
                  },
                  {
                    title: "Article VI - Meetings",
                    description: "Board meetings are held every two months. A majority of Directors constitutes a quorum for conducting official business.",
                  },
                ].map((article, index) => (
                  <MotionSection key={article.title} delay={0.15 + index * 0.08}>
                    <MotionCard className="p-6 bg-muted rounded-lg h-full">
                      <h4 className="font-heading text-lg font-semibold text-foreground mb-3">
                        {article.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {article.description}
                      </p>
                    </MotionCard>
                  </MotionSection>
                ))}
              </div>

              <MotionSection delay={0.5}>
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Note:</strong> For complete details on all articles including voting rights, 
                    board qualifications, financial procedures, and amendment processes, please download 
                    and review the full bylaws document.
                  </p>
                </div>
              </MotionSection>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bylaws;
