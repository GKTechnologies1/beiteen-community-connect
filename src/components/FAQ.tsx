import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MotionSection } from "@/components/motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
}

export const FAQ = ({ title = "Frequently Asked Questions", subtitle, items, className = "" }: FAQProps) => {
  return (
    <MotionSection className={className}>
      <div className="max-w-2xl mx-auto">
        {title && (
          <h3 className="font-heading text-2xl font-semibold text-foreground text-center mb-2">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-muted-foreground text-center mb-6">{subtitle}</p>
        )}
        <Accordion type="single" collapsible className="space-y-2">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-4 data-[state=open]:bg-muted/30"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4 text-foreground font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </MotionSection>
  );
};

// Pre-defined FAQ sets for different pages
export const membershipFAQs: FAQItem[] = [
  {
    question: "How does Zelle payment work?",
    answer: "After submitting your membership form, you'll receive our Zelle payment details. Send your membership payment via your bank's Zelle feature to our email address. We'll manually verify your payment and activate your membership within 2 business days.",
  },
  {
    question: "When is my membership activated?",
    answer: "Your membership is activated once we verify your Zelle payment, typically within 2 business days. You'll receive a confirmation email once your membership is active.",
  },
  {
    question: "What if I made a mistake on my form?",
    answer: "If you need to correct information after submitting, please contact us at beiteenassociation.stl@gmail.com with your name and the corrections needed. We'll update your records accordingly.",
  },
  {
    question: "Who qualifies for student membership?",
    answer: "Student membership is available to full-time students aged 18-21 with a valid college ID. You'll need to upload a photo of your student ID during registration.",
  },
];

export const donationFAQs: FAQItem[] = [
  {
    question: "How does Zelle payment work?",
    answer: "After submitting the donation form, you'll see our Zelle QR code and email. Use your bank's Zelle feature to send your donation to beiteenassociation.stl@gmail.com. We'll verify your payment manually.",
  },
  {
    question: "Can I donate anonymously?",
    answer: "Yes! Simply check the 'Make this donation anonymous' box on the form. Your name will not be publicly associated with the donation, though we may still collect an email for receipt purposes.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "Beiteen Association U.S.A. is a registered 501(c)(3) nonprofit organization. Your donation may be tax-deductible to the extent allowed by law. We'll provide a receipt for your records upon request.",
  },
  {
    question: "Who do I contact if I made a mistake?",
    answer: "If you need to correct donation information or have any issues, please contact us at beiteenassociation.stl@gmail.com. We'll help resolve any concerns promptly.",
  },
];

export default FAQ;
