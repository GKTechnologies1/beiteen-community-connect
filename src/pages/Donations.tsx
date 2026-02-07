import { useState } from "react";
import { Heart, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { MotionSection, MotionCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { supabase } from "@/integrations/supabase/client";
import zelleQR from "@/assets/zelle-qr.png";
import { FAQ, donationFAQs } from "@/components/FAQ";
import { TransparencyBlock } from "@/components/TransparencyBlock";
import { sendNotificationEmail } from "@/lib/email-notifications";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTitle } from "@/hooks/usePageTitle";

const ZELLE_EMAIL = "beiteenassociation.stl@gmail.com";

const Donations = () => {
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  usePageTitle(t("donate.title"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAnonymous: false,
    donationAmount: "",
    intendedPaymentDate: "",
    message: "",
    acknowledged: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const prefersReducedMotion = useReducedMotion();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.isAnonymous && !formData.email.trim()) {
      newErrors.email = "Email is required for non-anonymous donations";
    } else if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.donationAmount.trim()) {
      newErrors.donationAmount = "Donation amount is required";
    } else {
      const amount = parseFloat(formData.donationAmount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.donationAmount = "Please enter a valid amount";
      } else if (amount > 1000000) {
        newErrors.donationAmount = "Please contact us directly for large donations";
      }
    }

    if (!formData.acknowledged) {
      newErrors.acknowledged = "Please acknowledge the manual verification process";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        name: formData.name.trim() || null,
        email: formData.email.trim() || null,
        is_anonymous: formData.isAnonymous,
        donation_amount: parseFloat(formData.donationAmount),
        intended_payment_date: formData.intendedPaymentDate || null,
        message: formData.message.trim() || null,
        acknowledged: formData.acknowledged,
      };

      const { error } = await supabase.from("donation_submissions").insert(submissionData);

      if (error) throw error;

      // Send email notification (don't block on failure)
      sendNotificationEmail("donation", submissionData).catch(console.error);

      setIsSubmitted(true);
      toast({
        title: t("donate.thankYou"),
        description: t("donate.submitted"),
      });
    } catch (error) {
      console.error("Error submitting donation form:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      isAnonymous: false,
      donationAmount: "",
      intendedPaymentDate: "",
      message: "",
      acknowledged: false,
    });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <MotionSection className={`max-w-3xl mx-auto text-center ${isRTL ? 'text-right' : ''}`}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Heart className="h-8 w-8" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("donate.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("donate.subtitle")}
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Donation Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              {/* Info Section */}
              <MotionSection variant="fadeUp" className="space-y-8">
                <div className={isRTL ? 'text-right' : ''}>
                  <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                    {t("donate.impact.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("donate.impact.desc")}
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t("donate.impact.events")}</span>
                    </li>
                    <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t("donate.impact.youth")}</span>
                    </li>
                    <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t("donate.impact.heritage")}</span>
                    </li>
                    <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t("donate.impact.families")}</span>
                    </li>
                  </ul>
                </div>

                <MotionCard className={`p-6 bg-primary/5 border border-primary/20 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {t("donate.process.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("donate.process.desc")}
                  </p>
                </MotionCard>

                <MotionCard className={`p-6 bg-muted rounded-lg ${isRTL ? 'text-right' : ''}`}>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {t("donate.taxDeductible.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("donate.taxDeductible.desc")}
                  </p>
                </MotionCard>
              </MotionSection>

              {/* Form Section */}
              <MotionSection variant="fadeUp" delay={0.2}>
                <MotionCard disableTilt className="card-heritage p-8">
                  {isSubmitted ? (
                    <motion.div
                      className={`space-y-6 ${isRTL ? 'text-right' : ''}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary ${isRTL ? 'float-right ml-4' : ''}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <Heart className="h-8 w-8" />
                      </motion.div>
                      
                      <div className="clear-both">
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                          {t("donate.thankYou")}
                        </h3>
                        <p className="text-muted-foreground">
                          {t("donate.submitted")}
                        </p>
                      </div>

                      {/* Zelle Payment Details */}
                      <div className="p-6 bg-muted rounded-lg text-center space-y-4">
                        <h4 className="font-heading font-semibold text-foreground">
                          {t("donate.completeViaZelle")}
                        </h4>
                        <img 
                          src={zelleQR} 
                          alt="Zelle QR Code" 
                          className="w-48 h-48 mx-auto border border-border rounded-lg"
                        />
                        <div>
                          <p className="text-sm text-muted-foreground">{t("donate.sendTo")}</p>
                          <p className="font-medium text-foreground">{ZELLE_EMAIL}</p>
                        </div>
                        <div className={`bg-background/50 p-4 rounded ${isRTL ? 'text-right' : 'text-left'}`}>
                          <p className="text-sm text-muted-foreground">
                            <strong>{t("common.amount")}:</strong> ${formData.donationAmount}
                          </p>
                          {formData.intendedPaymentDate && (
                            <p className="text-sm text-muted-foreground">
                              <strong>{t("common.intendedDate")}:</strong> {new Date(formData.intendedPaymentDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {t("donate.verification")}
                        </p>
                      </div>

                      <Button variant="outline" onClick={resetForm} className="w-full">
                        {t("donate.anotherDonation")}
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className={`space-y-6 ${isRTL ? 'text-right' : ''}`}>
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                        <Checkbox
                          id="isAnonymous"
                          checked={formData.isAnonymous}
                          onCheckedChange={(checked) => {
                            setFormData((prev) => ({ 
                              ...prev, 
                              isAnonymous: checked === true,
                              name: checked ? "" : prev.name 
                            }));
                          }}
                        />
                        <Label htmlFor="isAnonymous" className="text-sm font-normal cursor-pointer">
                          {t("donate.anonymous")}
                        </Label>
                      </div>

                      {!formData.isAnonymous && (
                        <div className="space-y-2">
                          <Label htmlFor="name">{t("form.nameOptional")}</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t("contact.form.namePlaceholder")}
                            dir={isRTL ? "rtl" : "ltr"}
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {t("form.email")} {formData.isAnonymous ? `(${t("form.optional")})` : "*"}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={errors.email ? "border-destructive" : ""}
                          dir="ltr"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="donationAmount">{t("donate.amount")} *</Label>
                        <Input
                          id="donationAmount"
                          name="donationAmount"
                          type="number"
                          min="1"
                          step="0.01"
                          value={formData.donationAmount}
                          onChange={handleChange}
                          placeholder="50.00"
                          className={errors.donationAmount ? "border-destructive" : ""}
                          dir="ltr"
                        />
                        {errors.donationAmount && (
                          <p className="text-sm text-destructive">{errors.donationAmount}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="intendedPaymentDate" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Calendar className="h-4 w-4" />
                          {t("donate.paymentDate")}
                        </Label>
                        <Input
                          id="intendedPaymentDate"
                          name="intendedPaymentDate"
                          type="date"
                          value={formData.intendedPaymentDate}
                          onChange={handleChange}
                          dir="ltr"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t("donate.message")}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t("donate.messagePlaceholder")}
                          rows={3}
                          dir={isRTL ? "rtl" : "ltr"}
                        />
                      </div>

                      <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
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
                        <Label htmlFor="acknowledged" className="text-sm font-normal leading-relaxed cursor-pointer">
                          {t("donate.acknowledge")}
                        </Label>
                      </div>
                      {errors.acknowledged && (
                        <p className="text-sm text-destructive -mt-4">{errors.acknowledged}</p>
                      )}

                      <motion.div
                        whileHover={prefersReducedMotion ? {} : { y: -2 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className={`w-full btn-primary ${isRTL ? 'flex-row-reverse' : ''}`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? t("donate.submitting") : t("donate.submit")}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </MotionCard>
              </MotionSection>
            </div>

            {/* Transparency Block */}
            <TransparencyBlock className="mt-12" />

            {/* FAQ Section */}
            <div className="mt-16">
              <FAQ 
                items={donationFAQs} 
                subtitle="Common questions about donating to Beiteen Association"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donations;
