import { useState } from "react";
import { Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { MotionSection, MotionCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { supabase } from "@/integrations/supabase/client";
import zelleQR from "@/assets/zelle-qr.png";

const ZELLE_EMAIL = "beiteenassociation.stl@gmail.com";

const Membership = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    membershipType: "individual" as "individual" | "household",
    householdNotes: "",
    acknowledged: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const prefersReducedMotion = useReducedMotion();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length > 100) {
      newErrors.fullName = "Name must be less than 100 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && formData.phone.length > 20) {
      newErrors.phone = "Phone number is too long";
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
      const { error } = await supabase.from("membership_submissions").insert({
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        membership_type: formData.membershipType,
        household_notes: formData.householdNotes.trim() || null,
        acknowledged: formData.acknowledged,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Membership Form Submitted!",
        description: "Please complete your payment via Zelle using the details below.",
      });
    } catch (error) {
      console.error("Error submitting membership form:", error);
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
      fullName: "",
      email: "",
      phone: "",
      membershipType: "individual",
      householdNotes: "",
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
          <MotionSection className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Become a Member
            </h1>
            <p className="text-lg text-muted-foreground">
              Join the Beiteen Association U.S.A. and be part of our vibrant community.
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Membership Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Info Section */}
              <MotionSection variant="fadeUp" className="space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                    Membership Benefits
                  </h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Access to community events and gatherings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Voting rights in association decisions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Newsletter and community updates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Support community initiatives and programs</span>
                    </li>
                  </ul>
                </div>

                <MotionCard className="p-6 bg-muted rounded-lg">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Membership Types
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Individual:</strong> Single person membership</p>
                    <p><strong>Household:</strong> Covers all family members at one address</p>
                  </div>
                </MotionCard>

                <MotionCard className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Payment Process
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    After submitting this form, you'll see our Zelle payment details. 
                    Your membership will be activated after we verify your payment (typically within 2 business days).
                  </p>
                </MotionCard>
              </MotionSection>

              {/* Form Section */}
              <MotionSection variant="fadeUp" delay={0.2}>
                <MotionCard className="card-heritage p-8">
                  {isSubmitted ? (
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="h-8 w-8" />
                      </motion.div>
                      
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                          Thank You!
                        </h3>
                        <p className="text-muted-foreground">
                          Your membership form has been submitted. Please complete your payment via Zelle using the details below.
                        </p>
                      </div>

                      {/* Zelle Payment Details */}
                      <div className="p-6 bg-muted rounded-lg text-center space-y-4">
                        <h4 className="font-heading font-semibold text-foreground">
                          Complete Payment via Zelle
                        </h4>
                        <img 
                          src={zelleQR} 
                          alt="Zelle QR Code" 
                          className="w-48 h-48 mx-auto border border-border rounded-lg"
                        />
                        <div>
                          <p className="text-sm text-muted-foreground">Or send to:</p>
                          <p className="font-medium text-foreground">{ZELLE_EMAIL}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Your membership will be activated after we verify your payment (typically within 2 business days).
                        </p>
                      </div>

                      <Button variant="outline" onClick={resetForm} className="w-full">
                        Submit Another Membership
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={errors.fullName ? "border-destructive" : ""}
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">{errors.fullName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
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

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
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

                      <div className="space-y-3">
                        <Label>Membership Type *</Label>
                        <RadioGroup
                          value={formData.membershipType}
                          onValueChange={(value: "individual" | "household") =>
                            setFormData((prev) => ({ ...prev, membershipType: value }))
                          }
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="individual" id="individual" />
                            <Label htmlFor="individual" className="font-normal cursor-pointer">
                              Individual Membership
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="household" id="household" />
                            <Label htmlFor="household" className="font-normal cursor-pointer">
                              Household Membership
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {formData.membershipType === "household" && (
                        <div className="space-y-2">
                          <Label htmlFor="householdNotes">Household Members (Optional)</Label>
                          <Textarea
                            id="householdNotes"
                            name="householdNotes"
                            value={formData.householdNotes}
                            onChange={handleChange}
                            placeholder="List family members to be included in household membership"
                            rows={3}
                          />
                        </div>
                      )}

                      <div className="flex items-start space-x-2">
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
                          I understand that my membership will be activated after manual verification of payment.
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
                          className="w-full btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Membership Form"}
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

export default Membership;
