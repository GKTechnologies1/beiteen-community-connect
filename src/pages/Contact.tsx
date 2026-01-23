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

const Contact = () => {
  const { toast } = useToast();
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

    // Simulate form submission - in Phase 2 this would connect to a backend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. A member of our team will respond within 2 business days.",
    });

    setFormData({ name: "", email: "", message: "" });
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
          <MotionSection className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you. Reach out with questions, ideas, or just to connect.
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <MotionSection variant="fadeUp" className="space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                    Get In Touch
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you have questions about our organization, want to get involved, 
                    or simply want to learn more about the Beiteen community, we're here to help.
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-start gap-4"
                    whileHover={prefersReducedMotion ? {} : { x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="p-3 rounded-full bg-primary/10"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      <Mail className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-foreground">Email</h3>
                      <a
                        href="mailto:beiteenassociation.STL@gmail.com"
                        className="text-primary hover:underline"
                      >
                        beiteenassociation.STL@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    whileHover={prefersReducedMotion ? {} : { x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="p-3 rounded-full bg-primary/10"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      <MapPin className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-foreground">Location</h3>
                      <p className="text-muted-foreground">St. Louis, Missouri</p>
                    </div>
                  </motion.div>
                </div>

                <MotionCard className="p-6 bg-muted rounded-lg">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Response Time
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We aim to respond to all inquiries within 2 business days. 
                    For urgent matters, please indicate so in your message.
                  </p>
                </MotionCard>
              </MotionSection>

              {/* Contact Form */}
              <MotionSection variant="fadeUp" delay={0.2}>
                <MotionCard className="card-heritage p-8">
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-8"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="h-8 w-8" />
                      </motion.div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Your message has been sent successfully. A member of our team will 
                        respond within 2 business days.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
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
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          rows={5}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive">{errors.message}</p>
                        )}
                        <p className="text-xs text-muted-foreground text-right">
                          {formData.message.length}/1000
                        </p>
                      </div>

                      <motion.div
                        whileHover={prefersReducedMotion ? {} : { y: -2 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
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
