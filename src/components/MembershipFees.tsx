import { useState } from "react";
import { DollarSign, Users, GraduationCap, Home, Info, Minus, Plus, Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MotionCard } from "@/components/motion";
import { Button } from "@/components/ui/button";

export const MembershipFees = () => {
  const { language, isRTL } = useLanguage();
  const [adult21PlusCount, setAdult21PlusCount] = useState(0);
  const [collegeStudentCount, setCollegeStudentCount] = useState(0);

  const householdBase = 200;
  const adult21PlusTotal = adult21PlusCount * 100;
  const collegeStudentTotal = collegeStudentCount * 50;
  const totalDue = householdBase + adult21PlusTotal + collegeStudentTotal;

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
                <strong>ملاحظة:</strong> تكتمل العضوية بعد استلام الدفع عبر Zelle.
              </>
            ) : (
              <>
                <strong>Note:</strong> Membership is complete after payment is received via Zelle.
              </>
            )}
          </p>
        </div>
      </MotionCard>

      {/* Fee Calculator */}
      <MotionCard className="card-heritage p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-primary/10">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-foreground">
              {language === "ar" ? "حاسبة رسوم العضوية" : "Membership Fee Calculator"}
            </h3>
            <p className="text-sm text-muted-foreground" dir={isRTL ? "rtl" : "ltr"}>
              {language === "ar"
                ? "احسب رسوم عضويتك المقدرة"
                : "Estimate your membership fee before filling out the form"}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Household Base (always included) */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border" dir={isRTL ? "rtl" : "ltr"}>
            <div className="flex items-center gap-3">
              <Home className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm">
                  {language === "ar" ? "رسوم الأسرة الأساسية" : "Household Base Fee"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "مشمولة دائماً" : "Always included"}
                </p>
              </div>
            </div>
            <span className="font-bold text-primary text-lg">$200</span>
          </div>

          {/* 21+ Member Stepper */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border" dir={isRTL ? "rtl" : "ltr"}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Users className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-foreground text-sm">
                  {language === "ar"
                    ? "أفراد إضافيون 21+ (ليس في الجامعة)"
                    : "# of additional members 21+ (not in college)"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "$100 لكل فرد" : "$100 each"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setAdult21PlusCount((c) => Math.max(0, c - 1))}
                disabled={adult21PlusCount === 0}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="w-8 text-center font-bold text-foreground text-lg">{adult21PlusCount}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setAdult21PlusCount((c) => c + 1)}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* College Student Stepper */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border" dir={isRTL ? "rtl" : "ltr"}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <GraduationCap className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-foreground text-sm">
                  {language === "ar"
                    ? "طلاب جامعيون (18-21)"
                    : "# of college students (18–21)"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "$50 لكل طالب (يتطلب هوية طالب)" : "$50 each (valid student ID required)"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setCollegeStudentCount((c) => Math.max(0, c - 1))}
                disabled={collegeStudentCount === 0}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="w-8 text-center font-bold text-foreground text-lg">{collegeStudentCount}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setCollegeStudentCount((c) => c + 1)}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Live Total */}
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
            <div className="space-y-2">
              {adult21PlusCount > 0 && (
                <div className="flex justify-between text-sm" dir={isRTL ? "rtl" : "ltr"}>
                  <span className="text-muted-foreground">
                    {language === "ar"
                      ? `أفراد 21+ (ليس في الجامعة): ${adult21PlusCount} × $100`
                      : `Additional 21+ (Not in College): ${adult21PlusCount} × $100`}
                  </span>
                  <span className="font-medium text-foreground">${adult21PlusTotal}</span>
                </div>
              )}
              {collegeStudentCount > 0 && (
                <div className="flex justify-between text-sm" dir={isRTL ? "rtl" : "ltr"}>
                  <span className="text-muted-foreground">
                    {language === "ar"
                      ? `طلاب جامعيون: ${collegeStudentCount} × $50`
                      : `College Students: ${collegeStudentCount} × $50`}
                  </span>
                  <span className="font-medium text-foreground">${collegeStudentTotal}</span>
                </div>
              )}
              <div className="flex justify-between text-sm" dir={isRTL ? "rtl" : "ltr"}>
                <span className="text-muted-foreground">
                  {language === "ar" ? "رسوم الأسرة الأساسية" : "Household Base"}
                </span>
                <span className="font-medium text-foreground">${householdBase}</span>
              </div>
              <div className="border-t border-primary/20 pt-3 mt-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground text-base">
                    {language === "ar" ? "إجمالي المبلغ المستحق" : "Total Due"}
                  </span>
                  <span className="text-2xl font-bold text-primary">${totalDue}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground bg-background/50 p-3 rounded-lg" dir={isRTL ? "rtl" : "ltr"}>
            {language === "ar"
              ? "تكتمل العضوية بعد استلام الدفع عبر Zelle."
              : "Membership is complete after payment is received via Zelle."}
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
