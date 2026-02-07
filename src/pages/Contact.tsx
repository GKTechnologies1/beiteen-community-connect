import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { MotionSection, MotionCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { SocialLinks } from "@/components/SocialLinks";
import { sendNotificationEmail } from "@/lib/email-notifications";
import { usePageTitle } from "@/hooks/usePageTitle";

const Contact = () => {
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  usePageTitle(t("contact.title"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const prefersReducedMotion = useReducedMotion();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
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
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      const { error } = await supabase.from("contact_submissions").insert(submissionData);

      if (error) throw error;

      // Send email notification (don't block on failure)
      sendNotificationEmail("contact", submissionData).catch(console.error);

      setIsSubmitted(true);
      toast({
        title: t("contact.thankYou"),
        description: t("contact.submitted"),
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Submission Error",
        description: "There was an error sending your message. Please try again.",
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-olive-light to-background py-16 md:py-24">
        <div className="section-container">
          <MotionSection className={`max-w-3xl mx-auto text-center ${isRTL ? 'text-right' : ''}`}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("contact.subtitle")}
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              {/* Contact Info */}
              <MotionSection variant="fadeUp" className="space-y-8">
                <div className={isRTL ? 'text-right' : ''}>
                  <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                    {t("contact.getInTouch")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("contact.getInTouch.desc")}
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.div
                    className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                    whileHover={prefersReducedMotion ? {} : { x: isRTL ? -4 : 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="p-3 rounded-full bg-primary/10"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      <Mail className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-foreground">{t("contact.email")}</h3>
                      <a
                        href="mailto:beiteenassociation.STL@gmail.com"
                        className="text-primary hover:underline"
                      >
                        beiteenassociation.STL@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                    whileHover={prefersReducedMotion ? {} : { x: isRTL ? -4 : 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="p-3 rounded-full bg-primary/10"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      <MapPin className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-foreground">{t("contact.location")}</h3>
                      <p className="text-muted-foreground">St. Louis, Missouri</p>
                    </div>
                  </motion.div>
                </div>

                {/* Social Media Links */}
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className="font-medium text-foreground mb-3">{t("footer.connect")}</h3>
                  <SocialLinks variant="primary" className={isRTL ? 'justify-end' : ''} />
                </div>

                <MotionCard className={`p-6 bg-muted rounded-lg ${isRTL ? 'text-right' : ''}`}>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {t("contact.responseTime.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("contact.responseTime.desc")}
                  </p>
                </MotionCard>
              </MotionSection>

              {/* Contact Form */}
              <MotionSection variant="fadeUp" delay={0.2}>
                <MotionCard disableTilt className="card-heritage p-8">
                  {isSubmitted ? (
                    <motion.div
                      className={`text-center py-8 ${isRTL ? 'text-right' : ''}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 ${isRTL ? 'float-right ml-4' : ''}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="h-8 w-8" />
                      </motion.div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2 clear-both">
                        {t("contact.thankYou")}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {t("contact.submitted")}
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        {t("contact.sendAnother")}
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className={`space-y-6 ${isRTL ? 'text-right' : ''}`}>
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.form.name")}</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t("contact.form.namePlaceholder")}
                          className={errors.name ? "border-destructive" : ""}
                          dir={isRTL ? "rtl" : "ltr"}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.form.email")}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t("contact.form.emailPlaceholder")}
                          className={errors.email ? "border-destructive" : ""}
                          dir="ltr"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t("contact.form.message")}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t("contact.form.messagePlaceholder")}
                          rows={5}
                          className={errors.message ? "border-destructive" : ""}
                          dir={isRTL ? "rtl" : "ltr"}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive">{errors.message}</p>
                        )}
                        <p className={`text-xs text-muted-foreground ${isRTL ? 'text-left' : 'text-right'}`}>
                          {formData.message.length}/1000
                        </p>
                      </div>

                      <motion.div
                        whileHover={prefersReducedMotion ? {} : { y: -2 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className={`w-full btn-primary ${isRTL ? 'flex-row-reverse' : ''}`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            t("contact.form.sending")
                          ) : (
                            <>
                              <Send className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              {t("contact.form.submit")}
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </MotionCard>
              </MotionSection>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
