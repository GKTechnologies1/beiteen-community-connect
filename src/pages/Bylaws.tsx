import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Bylaws = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Bylaws
            </h1>
            <p className="text-lg text-muted-foreground">
              The governing rules and regulations of Beiteen Association U.S.A.
            </p>
          </div>
        </div>
      </section>

      {/* Bylaws Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* Download Section */}
            <div className="card-heritage p-8 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-semibold text-foreground">
                      Official Bylaws Document
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Beiteen Association of Saint Louis – Bylaws
                    </p>
                  </div>
                </div>
                <Button asChild className="btn-primary">
                  <a href="/documents/bylaws.docx" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Bylaws
                  </a>
                </Button>
              </div>
            </div>

            {/* Summary Section */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                  Bylaws Overview
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our bylaws establish the framework for how Beiteen Association U.S.A. operates. 
                  They define membership requirements, voting rights, board responsibilities, 
                  and organizational procedures.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-muted rounded-lg">
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-3">
                    Article I - Purpose
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    The organization is established for charitable, cultural, educational, 
                    and social purposes as a non-profit, non-political, and non-sectarian entity.
                  </p>
                </div>

                <div className="p-6 bg-muted rounded-lg">
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-3">
                    Article II - Membership
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Community members and their relatives may become members by meeting 
                    specified requirements including membership fees and age requirements.
                  </p>
                </div>

                <div className="p-6 bg-muted rounded-lg">
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-3">
                    Article IV - Board of Directors
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    The Board consists of up to seven members including President, Vice President, 
                    Secretary, Treasurer, Communications Officer, and two Executive Officers.
                  </p>
                </div>

                <div className="p-6 bg-muted rounded-lg">
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-3">
                    Article VI - Meetings
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Board meetings are held every two months. A majority of Directors 
                    constitutes a quorum for conducting official business.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> For complete details on all articles including voting rights, 
                  board qualifications, financial procedures, and amendment processes, please download 
                  and review the full bylaws document.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bylaws;
