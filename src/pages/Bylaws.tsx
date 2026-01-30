import Layout from "@/components/layout/Layout";
import { MotionSection } from "@/components/motion";

// Full bylaws content structure
const bylawsContent = [
  {
    id: "article-1",
    title: "Article I – Purpose",
    content: `The Beiteen Association U.S.A. (hereinafter "Association") is a non-profit, non-political, and non-sectarian organization established exclusively for charitable, cultural, educational, and social purposes within the meaning of Section 501(c)(3) of the Internal Revenue Code.

The Association shall operate to:
• Foster unity and community spirit among families of Beiteen heritage
• Preserve and promote Palestinian cultural traditions and values
• Support educational initiatives and scholarships for community members
• Provide charitable assistance to families in need
• Organize cultural events and community gatherings`,
  },
  {
    id: "article-2",
    title: "Article II – Membership",
    content: `Section 1. Eligibility
Membership in the Association is open to:
a) Descendants of the village of Beiteen
b) Spouses of descendants
c) Any person who shares the goals and values of the Association and is approved by the Board

Section 2. Membership Types
a) Family Membership: Available to households, covering all family members
b) Individual Membership: Available to single adults
c) Student Membership: Available to full-time students aged 18-21 with valid college ID

Section 3. Membership Fees
Annual membership fees shall be determined by the Board of Directors and communicated to members. Fees are due at the beginning of each calendar year.

Section 4. Rights and Privileges
Members in good standing shall have the right to:
a) Vote in Association elections and matters
b) Attend all Association meetings and events
c) Receive Association communications and updates
d) Participate in Association programs and activities`,
  },
  {
    id: "article-3",
    title: "Article III – Officers",
    content: `Section 1. Officers
The officers of the Association shall be:
a) President
b) Vice President
c) Secretary
d) Treasurer
e) Communications Officer
f) Two (2) Executive Officers

Section 2. Qualifications
To serve as an officer, a person must:
a) Be a member in good standing for at least one (1) year
b) Be at least twenty-one (21) years of age
c) Demonstrate commitment to the Association's mission

Section 3. Term of Office
Officers shall serve a term of two (2) years and may be re-elected for consecutive terms.`,
  },
  {
    id: "article-4",
    title: "Article IV – Board of Directors",
    content: `Section 1. Composition
The Board of Directors shall consist of all elected officers, up to seven (7) members total.

Section 2. Powers and Duties
The Board shall:
a) Manage the affairs and property of the Association
b) Approve annual budgets and major expenditures
c) Establish policies and procedures
d) Appoint committees as needed
e) Fill vacancies on the Board until the next election

Section 3. Meetings
a) The Board shall meet at least once every two (2) months
b) Special meetings may be called by the President or by a majority of Board members
c) A majority of Board members constitutes a quorum

Section 4. Voting
Each Board member shall have one vote. Decisions are made by majority vote of members present at a properly called meeting.`,
  },
  {
    id: "article-5",
    title: "Article V – Elections",
    content: `Section 1. Election Schedule
Elections for officers shall be held during the annual general membership meeting.

Section 2. Nominations
a) A Nominating Committee shall be appointed by the President at least sixty (60) days before the election
b) Nominations from the floor shall be accepted at the election meeting
c) Candidates must consent to their nomination

Section 3. Voting Procedure
a) Voting shall be by secret ballot
b) A plurality of votes cast shall elect
c) In case of a tie, a runoff election shall be held`,
  },
  {
    id: "article-6",
    title: "Article VI – Meetings",
    content: `Section 1. Annual Meeting
The annual general membership meeting shall be held within the first quarter of each calendar year at a time and place determined by the Board.

Section 2. Special Meetings
Special membership meetings may be called by:
a) The President
b) A majority of the Board of Directors
c) Written petition of at least twenty percent (20%) of members in good standing

Section 3. Notice
Written notice of all membership meetings shall be provided at least fourteen (14) days in advance, stating the time, place, and purpose of the meeting.

Section 4. Quorum
A quorum for membership meetings shall consist of the members present.`,
  },
  {
    id: "article-7",
    title: "Article VII – Financial Matters",
    content: `Section 1. Fiscal Year
The fiscal year of the Association shall be the calendar year.

Section 2. Financial Oversight
a) The Treasurer shall maintain accurate financial records
b) An annual financial report shall be presented to the membership
c) The Board may authorize an independent review or audit as needed

Section 3. Expenditures
a) Routine expenditures within the approved budget may be authorized by the Treasurer
b) Major expenditures exceeding amounts set by the Board require Board approval
c) All financial transactions shall be documented appropriately

Section 4. Dissolution
Upon dissolution of the Association, any remaining assets shall be distributed to one or more organizations with similar purposes that qualify as tax-exempt under Section 501(c)(3).`,
  },
  {
    id: "article-8",
    title: "Article VIII – Amendments",
    content: `Section 1. Proposal
Amendments to these Bylaws may be proposed by:
a) The Board of Directors
b) Written petition of at least ten percent (10%) of members in good standing

Section 2. Notice
Proposed amendments must be distributed to all members at least thirty (30) days before the meeting at which they will be considered.

Section 3. Adoption
Amendments shall be adopted by a two-thirds (2/3) vote of members present at a properly called meeting where a quorum is present.

Section 4. Effective Date
Amendments shall take effect immediately upon adoption unless otherwise specified.`,
  },
];

const Bylaws = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
            {/* Table of Contents */}
            <MotionSection variant="scaleIn">
              <div className="bg-card border border-border rounded-lg p-6 mb-12">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Table of Contents
                </h2>
                <nav className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                  {bylawsContent.map((article, index) => (
                    <button
                      key={article.id}
                      onClick={() => scrollToSection(article.id)}
                      className="text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 hover:pl-2 duration-200"
                    >
                      {index + 1}. {article.title.replace("Article ", "").replace(" – ", ": ")}
                    </button>
                  ))}
                </nav>
              </div>
            </MotionSection>

            {/* Bylaws Articles - All Expanded */}
            <div className="space-y-8">
              {bylawsContent.map((article, index) => (
                <MotionSection key={article.id} delay={index * 0.05}>
                  <article
                    id={article.id}
                    className="bg-card border border-border rounded-lg p-6 md:p-8 scroll-mt-24"
                  >
                    <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-4 pb-3 border-b border-border">
                      {article.title}
                    </h2>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-[15px] md:text-base">
                      {article.content}
                    </div>
                  </article>
                </MotionSection>
              ))}
            </div>

            {/* Footer Note */}
            <MotionSection delay={0.5} className="mt-10">
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg text-center">
                <p className="text-sm text-foreground">
                  <strong>Last Updated:</strong> These bylaws were adopted by the membership 
                  and are subject to amendment as described in Article VIII.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Questions about our bylaws? <a href="/contact" className="text-primary hover:underline">Contact us</a>
                </p>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bylaws;
