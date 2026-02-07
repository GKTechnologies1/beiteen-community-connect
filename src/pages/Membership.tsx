import { useState, useRef } from "react";
import { Users, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { MotionSection, MotionCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { supabase } from "@/integrations/supabase/client";
import zelleQR from "@/assets/zelle-qr.png";
import { US_STATES } from "@/lib/us-states";
import { isValidEmail, isValidUSPhone, isValidZelleContact, isValidZipCode } from "@/lib/validation";
import { FAQ, membershipFAQs } from "@/components/FAQ";
import { DOBPicker } from "@/components/DOBPicker";
import { sendNotificationEmail } from "@/lib/email-notifications";
import { MembershipFees } from "@/components/MembershipFees";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import { HouseholdMember, createEmptyMember } from "@/components/membership/types";
import { HouseholdMemberRow } from "@/components/membership/HouseholdMemberRow";
import { FeeSummary } from "@/components/membership/FeeSummary";
import {
  calculateTotalFee,
  serializeMembersForDB,
  serializeMembersForEmail,
} from "@/components/membership/utils";

const ZELLE_EMAIL = "beiteenassociation.stl@gmail.com";

interface FormData {
  familyName: string;
  headFirstName: string;
  headMiddleName: string;
  headDob: Date | undefined;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  zelleContact: string;
  acknowledged: boolean;
}

const Membership = () => {
  const { toast } = useToast();
  const { language, isRTL } = useLanguage();
  usePageTitle(language === "ar" ? "تسجيل العضوية" : "Membership");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [members, setMembers] = useState<HouseholdMember[]>([createEmptyMember()]);

  const [formData, setFormData] = useState<FormData>({
    familyName: "",
    headFirstName: "",
    headMiddleName: "",
    headDob: undefined,
    phone: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    zelleContact: "",
    acknowledged: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const prefersReducedMotion = useReducedMotion();

  // -- Member management --
  const addMember = () => {
    setMembers((prev) => [...prev, createEmptyMember()]);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMember = (id: string, updates: Partial<HouseholdMember>) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
    // Clear member-specific errors
    const errorPrefix = `member_${id}`;
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        if (key.startsWith(errorPrefix)) delete next[key];
      });
      return next;
    });
  };

  // -- Validation --
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.familyName.trim()) {
      newErrors.familyName = language === "ar" ? "اسم العائلة مطلوب" : "Family name is required";
    } else if (formData.familyName.length > 100) {
      newErrors.familyName = "Name must be less than 100 characters";
    }

    if (!formData.headFirstName.trim()) {
      newErrors.headFirstName = language === "ar" ? "الاسم الأول مطلوب" : "First name is required";
    }

    if (!formData.headMiddleName.trim()) {
      newErrors.headMiddleName = language === "ar" ? "اسم الأب مطلوب" : "Middle name is required";
    }

    if (!formData.headDob) {
      newErrors.headDob = language === "ar" ? "تاريخ الميلاد مطلوب" : "Date of birth is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = language === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required";
    } else if (!isValidUSPhone(formData.phone)) {
      newErrors.phone = language === "ar" ? "يرجى إدخال رقم هاتف أمريكي صالح" : "Please enter a valid US phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = language === "ar" ? "يرجى إدخال بريد إلكتروني صالح" : "Please enter a valid email address";
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = language === "ar" ? "العنوان مطلوب" : "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = language === "ar" ? "المدينة مطلوبة" : "City is required";
    }

    if (!formData.state) {
      newErrors.state = language === "ar" ? "الولاية مطلوبة" : "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = language === "ar" ? "الرمز البريدي مطلوب" : "ZIP code is required";
    } else if (!isValidZipCode(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)";
    }

    if (!formData.zelleContact.trim()) {
      newErrors.zelleContact = language === "ar" ? "معلومات الاتصال مطلوبة" : "Zelle contact is required";
    } else if (!isValidZelleContact(formData.zelleContact)) {
      newErrors.zelleContact = "Please enter a valid email or phone number for Zelle";
    }

    if (!formData.acknowledged) {
      newErrors.acknowledged = language === "ar" ? "يرجى الموافقة على عملية الدفع" : "Please acknowledge the payment process";
    }

    // Validate each household member
    for (const member of members) {
      const prefix = `member_${member.id}`;

      if (!member.fullName.trim()) {
        newErrors[`${prefix}_fullName`] = language === "ar" ? "الاسم الكامل مطلوب" : "Full name is required";
      }

      if (!member.relationship) {
        newErrors[`${prefix}_relationship`] = language === "ar" ? "صلة القرابة مطلوبة" : "Relationship is required";
      }

      if (member.relationship === "other" && !member.otherRelationship.trim()) {
        newErrors[`${prefix}_otherRelationship`] = language === "ar" ? "يرجى تحديد صلة القرابة" : "Please specify the relationship";
      }

      if (!member.dob) {
        newErrors[`${prefix}_dob`] = language === "ar" ? "تاريخ الميلاد مطلوب" : "Date of birth is required";
      }

      if (member.isCollegeStudent && member.collegeFiles.length === 0) {
        newErrors[`${prefix}_collegeFiles`] = language === "ar"
          ? "يرجى تحميل هوية طالب صالحة"
          : "Please upload a valid student ID";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -- File upload --
  const uploadAllFiles = async (): Promise<Record<string, string[]>> => {
    const fileUrlMap: Record<string, string[]> = {};

    for (const member of members) {
      if (member.collegeFiles.length === 0) continue;
      const urls: string[] = [];

      for (const file of member.collegeFiles) {
        const fileExt = file.name.split(".").pop();
        const safeName = member.fullName.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 30);
        const fileName = `${safeName}_${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `college-ids/${fileName}`;

        const { error } = await supabase.storage
          .from("membership-documents")
          .upload(filePath, file);

        if (error) {
          console.error("Error uploading file:", error);
          throw new Error(`Failed to upload ${file.name}`);
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("membership-documents").getPublicUrl(filePath);
        urls.push(publicUrl);
      }

      fileUrlMap[member.id] = urls;
    }

    return fileUrlMap;
  };

  // -- Submit --
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: language === "ar" ? "يرجى تصحيح الأخطاء" : "Please fix the errors",
        description: language === "ar" ? "بعض الحقول المطلوبة مفقودة أو غير صالحة." : "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload all college ID files
      const fileUrlMap = await uploadAllFiles();
      const allUrls = Object.values(fileUrlMap).flat();

      // Prepare structured member data for email
      const membersForEmail = serializeMembersForEmail(members, fileUrlMap);
      const feeBreakdown = calculateTotalFee(members);

      const submissionData = {
        full_name: `${formData.headFirstName} ${formData.headMiddleName} ${formData.familyName}`.trim(),
        family_name: formData.familyName.trim(),
        head_first_name: formData.headFirstName.trim(),
        head_middle_name: formData.headMiddleName.trim(),
        head_dob: formData.headDob?.toISOString().split("T")[0],
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        street_address: formData.streetAddress.trim(),
        city: formData.city.trim(),
        state: formData.state,
        zip_code: formData.zipCode.trim(),
        household_members: serializeMembersForDB(members),
        household_notes: JSON.stringify({
          members: membersForEmail,
          fee: feeBreakdown,
        }),
        college_id_urls: allUrls.length > 0 ? allUrls : null,
        zelle_contact: formData.zelleContact.trim(),
        membership_type: "household",
        acknowledged: formData.acknowledged,
      };

      const { error } = await supabase.from("membership_submissions").insert(submissionData);
      if (error) throw error;

      // Send email notification with structured member data
      sendNotificationEmail("membership", {
        ...submissionData,
        household_members_data: JSON.stringify(membersForEmail),
        estimated_total_fee: feeBreakdown.total,
        fee_breakdown: JSON.stringify(feeBreakdown),
      }).catch(console.error);

      setIsSubmitted(true);
      toast({
        title: language === "ar" ? "تم تقديم نموذج العضوية!" : "Membership Form Submitted!",
        description: language === "ar"
          ? "يرجى إكمال الدفع عبر Zelle باستخدام التفاصيل أدناه."
          : "Please complete your payment via Zelle using the details below.",
      });
    } catch (error) {
      console.error("Error submitting membership form:", error);
      toast({
        title: language === "ar" ? "خطأ في الإرسال" : "Submission Error",
        description: language === "ar"
          ? "حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى."
          : "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const resetForm = () => {
    setFormData({
      familyName: "",
      headFirstName: "",
      headMiddleName: "",
      headDob: undefined,
      phone: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      zelleContact: "",
      acknowledged: false,
    });
    setMembers([createEmptyMember()]);
    setIsSubmitted(false);
    setErrors({});
  };

  const feeBreakdown = calculateTotalFee(members);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <MotionSection className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              {language === "ar" ? "تسجيل العضوية" : "Membership Sign-Up"}
            </h1>
            {language !== "ar" && (
              <h2 className="font-heading text-2xl md:text-3xl text-primary mb-4" dir="rtl">
                تسجيل العضوية
              </h2>
            )}
            <p className="text-lg text-muted-foreground">
              {language === "ar"
                ? "انضم إلى جمعية بيتين في الولايات المتحدة وكن جزءاً من مجتمعنا النابض بالحياة."
                : "Join the Beiteen Association U.S.A. and be part of our vibrant community."}
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Membership Fees Section - Above Form */}
      {!isSubmitted && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <MembershipFees />
            </div>
          </div>
        </section>
      )}

      {/* Membership Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            {isSubmitted ? (
              <MotionSection>
                <MotionCard disableTilt className="card-heritage p-8 md:p-12">
                  <motion.div
                    className="space-y-8 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="h-10 w-10" />
                    </motion.div>

                    <div>
                      <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                        {language === "ar" ? "شكراً لك!" : "Thank You!"}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-2">
                        {language === "ar"
                          ? "تم تقديم نموذج عضويتك بنجاح."
                          : "Your membership form has been submitted successfully."}
                      </p>
                      <p className="text-muted-foreground">
                        {language === "ar"
                          ? "شكراً لاستفسارك/تقديمك. سيرد أحد أعضاء فريقنا خلال يومي عمل."
                          : "Thank you for your inquiry/submission. A member of our team will respond within 2 business days."}
                      </p>
                    </div>

                    {/* Estimated Fee */}
                    <div className="p-4 bg-primary/5 rounded-lg inline-block">
                      <p className="text-sm text-muted-foreground mb-1">
                        {language === "ar" ? "إجمالي الرسوم المقدرة" : "Estimated Total Fee"}
                      </p>
                      <p className="text-2xl font-bold text-primary">${feeBreakdown.total}</p>
                    </div>

                    {/* Zelle Payment Details */}
                    <div className="p-8 bg-muted rounded-xl space-y-6">
                      <h4 className="font-heading text-xl font-semibold text-foreground">
                        {language === "ar" ? "أكمل الدفع عبر Zelle" : "Complete Payment via Zelle"}
                      </h4>
                      <img
                        src={zelleQR}
                        alt="Zelle QR Code"
                        className="w-56 h-56 mx-auto border border-border rounded-lg shadow-sm"
                      />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {language === "ar"
                            ? "أرسل دفعة العضوية عبر Zelle إلى:"
                            : "Send membership payment via Zelle to:"}
                        </p>
                        <p className="text-lg font-medium text-foreground">{ZELLE_EMAIL}</p>
                      </div>
                      <p className="text-sm text-muted-foreground bg-primary/5 p-4 rounded-lg">
                        <strong>{language === "ar" ? "ملاحظة:" : "Note:"}</strong>{" "}
                        {language === "ar"
                          ? "سنطابق دفعتك مع تفاصيل تقديمك. سيتم تفعيل عضويتك بعد التحقق من دفعتك (عادةً خلال يومي عمل)."
                          : "We will match your payment to your submission details. Your membership will be activated after we verify your payment (typically within 2 business days)."}
                      </p>
                    </div>

                    <Button variant="outline" onClick={resetForm} className="w-full max-w-xs">
                      {language === "ar" ? "تقديم عضوية أخرى" : "Submit Another Membership"}
                    </Button>
                  </motion.div>
                </MotionCard>
              </MotionSection>
            ) : (
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Info Sidebar */}
                <MotionSection variant="fadeUp" className="lg:col-span-1 space-y-6">
                  <MotionCard className="card-heritage p-6">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                      {language === "ar" ? "مزايا العضوية" : "Membership Benefits"}
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>
                          {language === "ar"
                            ? "الوصول إلى الفعاليات والتجمعات المجتمعية"
                            : "Access to community events and gatherings"}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>
                          {language === "ar"
                            ? "حقوق التصويت في قرارات الجمعية"
                            : "Voting rights in association decisions"}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>
                          {language === "ar"
                            ? "النشرة الإخبارية وتحديثات المجتمع"
                            : "Newsletter and community updates"}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>
                          {language === "ar" ? "دعم المبادرات المجتمعية" : "Support community initiatives"}
                        </span>
                      </li>
                    </ul>
                  </MotionCard>

                  <MotionCard className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {language === "ar" ? "الدفع عبر Zelle" : "Payment via Zelle"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar"
                        ? "بعد تقديم هذا النموذج، ستتلقى تعليمات الدفع عبر Zelle. سنطابق دفعتك مع تفاصيل تقديمك."
                        : "After submitting this form, you'll receive Zelle payment instructions. We will match your payment to your submission details."}
                    </p>
                  </MotionCard>
                </MotionSection>

                {/* Form Section */}
                <MotionSection variant="fadeUp" delay={0.2} className="lg:col-span-3">
                  <MotionCard disableTilt className="card-heritage p-6 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Family Name */}
                      <div className="space-y-2">
                        <Label htmlFor="familyName">
                          {language === "ar"
                            ? "اسم العائلة (اسم الأخير) *"
                            : "Family Name (Last Name) / اسم العائلة (اسم الأخير) *"}
                        </Label>
                        <Input
                          id="familyName"
                          name="familyName"
                          value={formData.familyName}
                          onChange={handleChange}
                          placeholder={language === "ar" ? "أدخل اسم العائلة" : "Enter family name"}
                          className={errors.familyName ? "border-destructive" : ""}
                        />
                        {errors.familyName && (
                          <p className="text-sm text-destructive">{errors.familyName}</p>
                        )}
                      </div>

                      {/* Head of Household Names */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="headFirstName">
                            {language === "ar"
                              ? "رب الأسرة (الاسم الأول) *"
                              : "Head of Household (First Name) / رب الأسرة (الاسم الأول) *"}
                          </Label>
                          <Input
                            id="headFirstName"
                            name="headFirstName"
                            value={formData.headFirstName}
                            onChange={handleChange}
                            placeholder={language === "ar" ? "الاسم الأول" : "First name"}
                            className={errors.headFirstName ? "border-destructive" : ""}
                          />
                          {errors.headFirstName && (
                            <p className="text-sm text-destructive">{errors.headFirstName}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="headMiddleName">
                            {language === "ar"
                              ? "رب الأسرة (اسم الأب) *"
                              : "Head of Household (Middle Name) / رب الأسرة (اسم الأب) *"}
                          </Label>
                          <Input
                            id="headMiddleName"
                            name="headMiddleName"
                            value={formData.headMiddleName}
                            onChange={handleChange}
                            placeholder={language === "ar" ? "اسم الأب" : "Middle name"}
                            className={errors.headMiddleName ? "border-destructive" : ""}
                          />
                          {errors.headMiddleName && (
                            <p className="text-sm text-destructive">{errors.headMiddleName}</p>
                          )}
                        </div>
                      </div>

                      {/* Date of Birth */}
                      <div className="space-y-2">
                        <Label>
                          {language === "ar"
                            ? "تاريخ ميلاد رب الأسرة *"
                            : "Head of Household Date of Birth / تاريخ ميلاد رب الأسرة *"}
                        </Label>
                        <DOBPicker
                          value={formData.headDob}
                          onChange={(date) => {
                            setFormData((prev) => ({ ...prev, headDob: date }));
                            if (errors.headDob) {
                              setErrors((prev) => ({ ...prev, headDob: "" }));
                            }
                          }}
                          error={!!errors.headDob}
                          minYear={1920}
                          maxYear={new Date().getFullYear()}
                        />
                        {errors.headDob && (
                          <p className="text-sm text-destructive">{errors.headDob}</p>
                        )}
                      </div>

                      {/* Contact Information */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            {language === "ar"
                              ? "أفضل رقم اتصال *"
                              : "Best Contact Number / أفضل رقم اتصال *"}
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                            className={errors.phone ? "border-destructive" : ""}
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            {language === "ar"
                              ? "عنوان البريد الإلكتروني *"
                              : "Email Address / عنوان البريد الإلكتروني *"}
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <Label htmlFor="streetAddress">
                          {language === "ar" ? "عنوان الشارع *" : "Street Address / عنوان الشارع *"}
                        </Label>
                        <Input
                          id="streetAddress"
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleChange}
                          placeholder={language === "ar" ? "123 الشارع الرئيسي" : "123 Main Street"}
                          className={errors.streetAddress ? "border-destructive" : ""}
                        />
                        {errors.streetAddress && (
                          <p className="text-sm text-destructive">{errors.streetAddress}</p>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">
                            {language === "ar" ? "المدينة *" : "City / مدينة *"}
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder={language === "ar" ? "المدينة" : "City"}
                            className={errors.city ? "border-destructive" : ""}
                          />
                          {errors.city && (
                            <p className="text-sm text-destructive">{errors.city}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">
                            {language === "ar" ? "الولاية *" : "State / ولاية *"}
                          </Label>
                          <Select
                            value={formData.state}
                            onValueChange={(value) => {
                              setFormData((prev) => ({ ...prev, state: value }));
                              if (errors.state) {
                                setErrors((prev) => ({ ...prev, state: "" }));
                              }
                            }}
                          >
                            <SelectTrigger className={errors.state ? "border-destructive" : ""}>
                              <SelectValue
                                placeholder={language === "ar" ? "اختر الولاية" : "Select state"}
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-background">
                              {US_STATES.map((state) => (
                                <SelectItem key={state.value} value={state.value}>
                                  {state.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.state && (
                            <p className="text-sm text-destructive">{errors.state}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">
                            {language === "ar" ? "الرمز البريدي *" : "ZIP Code / الرمز البريدي *"}
                          </Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            placeholder="12345"
                            className={errors.zipCode ? "border-destructive" : ""}
                          />
                          {errors.zipCode && (
                            <p className="text-sm text-destructive">{errors.zipCode}</p>
                          )}
                        </div>
                      </div>

                      {/* ===== HOUSEHOLD MEMBERS SECTION ===== */}
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-heading text-lg font-semibold text-foreground">
                              {language === "ar" ? "أفراد الأسرة" : "Household Members"}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {language === "ar"
                                ? "أضف جميع أفراد العائلة الإضافيين (بخلاف رب الأسرة)"
                                : "Add all additional family members (besides Head of Household)"}
                            </p>
                          </div>
                        </div>

                        {/* Member Rows */}
                        <div className="space-y-4">
                          {members.map((member, index) => (
                            <HouseholdMemberRow
                              key={member.id}
                              member={member}
                              index={index}
                              onChange={updateMember}
                              onRemove={removeMember}
                              errors={errors}
                              canRemove={members.length > 1}
                            />
                          ))}
                        </div>

                        {/* Add Member Button */}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addMember}
                          className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          {language === "ar" ? "+ إضافة فرد من العائلة" : "+ Add Family Member"}
                        </Button>

                        {/* Fee Summary */}
                        <FeeSummary members={members} />
                      </div>

                      {/* Zelle Contact */}
                      <div className="space-y-2">
                        <Label htmlFor="zelleContact">
                          {language === "ar"
                            ? "معلومات الاتصال بحساب Zelle (الهاتف أو البريد الإلكتروني) *"
                            : "Zelle Account Contact (Phone or Email) / لإتمام عملية الدفع *"}
                        </Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          {language === "ar"
                            ? "أدخل رقم الهاتف أو البريد الإلكتروني المرتبط بحساب Zelle الخاص بك"
                            : "Enter the phone number or email associated with your Zelle account to receive a payment request"}
                        </p>
                        <Input
                          id="zelleContact"
                          name="zelleContact"
                          value={formData.zelleContact}
                          onChange={handleChange}
                          placeholder={language === "ar" ? "البريد الإلكتروني أو رقم الهاتف" : "Email or phone number"}
                          className={errors.zelleContact ? "border-destructive" : ""}
                        />
                        {errors.zelleContact && (
                          <p className="text-sm text-destructive">{errors.zelleContact}</p>
                        )}
                      </div>

                      {/* Acknowledgment */}
                      <div className="flex items-start space-x-3 pt-4">
                        <Checkbox
                          id="acknowledged"
                          checked={formData.acknowledged}
                          onCheckedChange={(checked) => {
                            setFormData((prev) => ({ ...prev, acknowledged: checked === true }));
                            if (errors.acknowledged) {
                              setErrors((prev) => ({ ...prev, acknowledged: "" }));
                            }
                          }}
                          className={errors.acknowledged ? "border-destructive" : ""}
                        />
                        <Label
                          htmlFor="acknowledged"
                          className="text-sm font-normal leading-relaxed cursor-pointer"
                        >
                          {language === "ar"
                            ? "أفهم أن عضويتي سيتم تفعيلها بعد التحقق اليدوي من الدفع عبر Zelle. سيرد أحد أعضاء الفريق خلال يومي عمل."
                            : "I understand that my membership will be activated after manual verification of payment via Zelle. A member of the team will respond within 2 business days."}
                        </Label>
                      </div>
                      {errors.acknowledged && (
                        <p className="text-sm text-destructive -mt-4">{errors.acknowledged}</p>
                      )}

                      <motion.div
                        whileHover={prefersReducedMotion ? {} : { y: -2 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                        className="pt-4"
                      >
                        <Button
                          type="submit"
                          className="w-full btn-primary py-6 text-lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? language === "ar"
                              ? "جاري الإرسال..."
                              : "Submitting..."
                            : language === "ar"
                              ? "إرسال نموذج العضوية"
                              : "Submit Membership Form"}
                        </Button>
                      </motion.div>
                    </form>
                  </MotionCard>
                </MotionSection>
              </div>
            )}
          </div>

          {/* FAQ Section */}
          {!isSubmitted && (
            <div className="mt-16">
              <FAQ
                items={membershipFAQs}
                subtitle={
                  language === "ar"
                    ? "أسئلة شائعة حول الانضمام إلى جمعية بيتين"
                    : "Common questions about joining Beiteen Association"
                }
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Membership;
