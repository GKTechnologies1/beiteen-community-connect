import { DollarSign, Users, GraduationCap, Home, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MotionCard } from "@/components/motion";

export const MembershipFees = () => {
  const { language, isRTL } = useLanguage();

  const fees = [
    {
      icon: Home,
      labelEn: "Household Base Fee",
      labelAr: "رسوم الأسرة الأساسية",
      amount: "$200",
      descEn: "Per household",
      descAr: "لكل أسرة",
    },
    {
      icon: Users,
      labelEn: "Additional Family Member (21+ / Not in College)",
      labelAr: "فرد عائلة إضافي (21+ / ليس في الجامعة)",
      amount: "$100",
      descEn: "Each family member aged 21+ and NOT enrolled in college",
      descAr: "كل فرد من أفراد العائلة بعمر 21+ وغير مسجل في الجامعة",
    },
    {
      icon: GraduationCap,
      labelEn: "College Student (18-21)",
      labelAr: "طالب جامعي (18-21)",
      amount: "$50",
      descEn: "Each family member aged 18–21 AND currently enrolled in college (valid student ID required)",
      descAr: "كل فرد من أفراد العائلة بعمر 18-21 ومسجل حالياً في الجامعة (يتطلب هوية طالب صالحة)",
    },
  ];

  const examples = [
    {
      titleEn: "Example 1",
      titleAr: "مثال 1",
      descEn: "Man and wife have 4 children under the age of 21. Two of the children are in college.",
      descAr: "رجل وزوجته لديهم 4 أطفال دون سن 21. اثنان من الأطفال في الجامعة.",
      calculationEn: "Household ($200) + 2 College Students ($50 × 2) = $300",
      calculationAr: "الأسرة ($200) + 2 طلاب جامعيين ($50 × 2) = $300",
      totalEn: "Total: $300",
      totalAr: "المجموع: $300",
    },
    {
      titleEn: "Example 2",
      titleAr: "مثال 2",
      descEn: "Man and wife have two children. One child is 23 years old (not in college) and the other is 19 (in college).",
      descAr: "رجل وزوجته لديهم طفلان. أحدهم عمره 23 عاماً (ليس في الجامعة) والآخر 19 عاماً (في الجامعة).",
      calculationEn: "Household ($200) + Adult 21+ ($100) + College Student ($50) = $350",
      calculationAr: "الأسرة ($200) + بالغ 21+ ($100) + طالب جامعي ($50) = $350",
      totalEn: "Total: $350",
      totalAr: "المجموع: $350",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Membership Fees Section */}
      <MotionCard className="card-heritage p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-primary/10">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-foreground">
              {language === "ar" ? "رسوم العضوية" : "Membership Fees"}
            </h3>
            <p className="text-sm text-muted-foreground" dir={isRTL ? "rtl" : "ltr"}>
              {language === "ar" ? "هيكل رسوم العضوية السنوية" : "Annual membership fee structure"}
            </p>
          </div>
        </div>

        {/* Fee Cards */}
        <div className="grid gap-4 mb-6">
          {fees.map((fee, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border"
              dir={isRTL ? "rtl" : "ltr"}
            >
              <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <fee.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-medium text-foreground">
                    {language === "ar" ? fee.labelAr : fee.labelEn}
                  </h4>
                  <span className="text-lg font-bold text-primary">{fee.amount}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "ar" ? fee.descAr : fee.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Important Note */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20" dir={isRTL ? "rtl" : "ltr"}>
          <p className="text-sm text-foreground">
            {language === "ar" ? (
              <>
                <strong>ملاحظة:</strong> تكتمل عضويتك بعد إجراء الدفع عبر Zelle.
                سيتم إرسال بريد إلكتروني للتأكيد بعد تقديم هذا النموذج.
              </>
            ) : (
              <>
                <strong>Note:</strong> Your membership is complete after payment is made via Zelle.
                A confirmation email will be sent after this form is submitted.
              </>
            )}
          </p>
        </div>
      </MotionCard>

      {/* Examples Section */}
      <MotionCard className="p-6 md:p-8 bg-accent/30 border-2 border-accent rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-primary/10">
            <Info className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-foreground">
            {language === "ar" ? "أمثلة على حساب الرسوم" : "Fee Calculation Examples"}
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {examples.map((example, index) => (
            <div
              key={index}
              className="p-5 rounded-lg bg-background border border-border shadow-sm"
              dir={isRTL ? "rtl" : "ltr"}
            >
              <h4 className="font-semibold text-foreground mb-3 text-lg">
                {language === "ar" ? example.titleAr : example.titleEn}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {language === "ar" ? example.descAr : example.descEn}
              </p>
              <div className="p-3 rounded-md bg-muted/50 mb-3">
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? example.calculationAr : example.calculationEn}
                </p>
              </div>
              <p className="text-lg font-bold text-primary">
                {language === "ar" ? example.totalAr : example.totalEn}
              </p>
            </div>
          ))}
        </div>
      </MotionCard>
    </div>
  );
};

export default MembershipFees;
