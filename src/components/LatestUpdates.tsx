import { Calendar, Bell, Camera } from "lucide-react";
import { MotionSection } from "@/components/motion";

const updates = [
  {
    icon: Calendar,
    text: "Next Board Meeting: TBD",
    type: "event",
  },
  {
    icon: Bell,
    text: "Membership renewals now open for 2026",
    type: "announcement",
  },
  {
    icon: Camera,
    text: "More gallery photos coming soon!",
    type: "update",
  },
];

interface LatestUpdatesProps {
  className?: string;
}

export const LatestUpdates = ({ className = "" }: LatestUpdatesProps) => {
  return (
    <MotionSection className={className}>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-primary/5 px-4 py-2 border-b border-border">
          <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Latest Updates
          </h3>
        </div>
        <div className="divide-y divide-border">
          {updates.map((update, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-3 text-sm"
            >
              <update.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground">{update.text}</span>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default LatestUpdates;
