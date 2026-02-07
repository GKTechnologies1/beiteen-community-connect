import { DollarSign, Home, Users, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { HouseholdMember } from "./types";
import { calculateTotalFee } from "./utils";

interface FeeSummaryProps {
  members: HouseholdMember[];
}

export const FeeSummary = ({ members }: FeeSummaryProps) => {
  const { language } = useLanguage();
  const fee = calculateTotalFee(members);

  return (
    <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-primary" />
        <h4 className="font-heading text-lg font-semibold text-foreground">
          {language === "ar" ? "رسوم العضوية المقدرة" : "Estimated Membership Fee"}
        </h4>
      </div>

      <div className="space-y-3">
        {/* Household Base */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span>{language === "ar" ? "رسوم الأسرة الأساسية" : "Household Base"}</span>
          </div>
          <span className="font-medium">${fee.householdBase}</span>
        </div>

        {/* 21+ members */}
        {fee.adult21PlusCount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {language === "ar"
                  ? `إضافي 21+ (ليس في الجامعة): ${fee.adult21PlusCount} × $100`
                  : `Additional 21+ (Not in College): ${fee.adult21PlusCount} × $100`}
              </span>
            </div>
            <span className="font-medium">${fee.adult21Plus}</span>
          </div>
        )}

        {/* College students */}
        {fee.collegeStudentCount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span>
                {language === "ar"
                  ? `طلاب جامعيون (18-21): ${fee.collegeStudentCount} × $50`
                  : `College Students (18–21): ${fee.collegeStudentCount} × $50`}
              </span>
            </div>
            <span className="font-medium">${fee.collegeStudents}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-primary/20 pt-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">
              {language === "ar" ? "إجمالي الرسوم المقدرة" : "Total Estimated Fee"}
            </span>
            <span className="text-xl font-bold text-primary">${fee.total}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground bg-background/50 p-3 rounded-lg">
        {language === "ar"
          ? "يتم تأكيد العضوية النهائية بعد إجراء الدفع عبر Zelle والتحقق منه يدوياً."
          : "Final membership is confirmed after payment is made via Zelle and manually verified."}
      </p>
    </div>
  );
};
