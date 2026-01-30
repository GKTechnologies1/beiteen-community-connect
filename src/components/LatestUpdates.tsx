import { Calendar, Bell, Camera } from "lucide-react";
import { MotionSection } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface LatestUpdatesProps {
  className?: string;
}

export const LatestUpdates = ({ className = "" }: LatestUpdatesProps) => {
  const { t, isRTL } = useLanguage();

  const updates = [
    {
      icon: Calendar,
      textEn: "Next Board Meeting: TBD",
      textAr: "اجتماع المجلس القادم: يحدد لاحقاً",
      type: "event",
    },
    {
      icon: Bell,
      textEn: "Membership renewals now open for 2026",
      textAr: "تجديد العضويات مفتوح الآن لعام 2026",
      type: "announcement",
    },
    {
      icon: Camera,
      textEn: "More gallery photos coming soon!",
      textAr: "المزيد من الصور في المعرض قريباً!",
      type: "update",
    },
  ];

  return (
    <MotionSection className={className}>
      <div className={`bg-card border border-border rounded-lg overflow-hidden ${isRTL ? 'text-right' : ''}`}>
        <div className={`bg-primary/5 px-4 py-2 border-b border-border ${isRTL ? 'flex flex-row-reverse' : ''}`}>
          <h3 className={`font-heading text-sm font-semibold text-foreground flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Bell className="h-4 w-4 text-primary" />
            {t("home.updates.title")}
          </h3>
        </div>
        <div className="divide-y divide-border">
          {updates.map((update, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-3 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <update.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground">
                {isRTL ? update.textAr : update.textEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default LatestUpdates;
