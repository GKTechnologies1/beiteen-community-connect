import { Shield, CheckCircle } from "lucide-react";
import { MotionCard } from "@/components/motion";

interface TransparencyBlockProps {
  className?: string;
}

export const TransparencyBlock = ({ className = "" }: TransparencyBlockProps) => {
  return (
    <MotionCard className={`p-6 bg-muted/50 border border-border rounded-lg ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
            Our Commitment to Transparency
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Funds are tracked by the Treasurer and reviewed by the Board</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Donation receipts available upon request</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>We verify all Zelle payments manually to match submissions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Annual financial reports presented to membership</span>
            </li>
          </ul>
        </div>
      </div>
    </MotionCard>
  );
};

export default TransparencyBlock;
