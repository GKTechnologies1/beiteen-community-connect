import { useState, useRef } from "react";
import { Users, CheckCircle, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const ZELLE_EMAIL = "beiteenassociation.stl@gmail.com";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;

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
  householdMembers: string;
  zelleContact: string;
  acknowledged: boolean;
}

const Membership = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    householdMembers: "",
    zelleContact: "",
    acknowledged: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const prefersReducedMotion = useReducedMotion();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Family Name
    if (!formData.familyName.trim()) {
      newErrors.familyName = "Family name is required / اسم العائلة مطلوب";
    } else if (formData.familyName.length > 100) {
      newErrors.familyName = "Name must be less than 100 characters";
    }

    // Head of Household First Name
    if (!formData.headFirstName.trim()) {
      newErrors.headFirstName = "First name is required / الاسم الأول مطلوب";
    }

    // Head of Household Middle Name
    if (!formData.headMiddleName.trim()) {
      newErrors.headMiddleName = "Middle name is required / اسم الأب مطلوب";
    }

    // Date of Birth
    if (!formData.headDob) {
      newErrors.headDob = "Date of birth is required / تاريخ الميلاد مطلوب";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required / رقم الهاتف مطلوب";
    } else if (!isValidUSPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid US phone number";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required / البريد الإلكتروني مطلوب";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Street Address
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required / العنوان مطلوب";
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city = "City is required / المدينة مطلوبة";
    }

    // State
    if (!formData.state) {
      newErrors.state = "State is required / الولاية مطلوبة";
    }

    // Zip Code
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required / الرمز البريدي مطلوب";
    } else if (!isValidZipCode(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)";
    }

    // Household Members
    if (!formData.householdMembers.trim()) {
      newErrors.householdMembers = "Please list household members / يرجى إدراج أفراد الأسرة";
    }

    // Zelle Contact
    if (!formData.zelleContact.trim()) {
      newErrors.zelleContact = "Zelle contact is required / معلومات الاتصال مطلوبة";
    } else if (!isValidZelleContact(formData.zelleContact)) {
      newErrors.zelleContact = "Please enter a valid email or phone number for Zelle";
    }

    // Acknowledgment
    if (!formData.acknowledged) {
      newErrors.acknowledged = "Please acknowledge the payment process";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Validate file count
    if (files.length + selectedFiles.length > MAX_FILES) {
      toast({
        title: "Too many files",
        description: `You can upload a maximum of ${MAX_FILES} files.`,
        variant: "destructive",
      });
      return;
    }

    // Validate file sizes
    const validFiles = selectedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 10MB limit.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `college-ids/${fileName}`;

      const { error } = await supabase.storage
        .from('membership-documents')
        .upload(filePath, file);

      if (error) {
        console.error('Error uploading file:', error);
        throw new Error(`Failed to upload ${file.name}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('membership-documents')
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload files first
      let collegeIdUrls: string[] = [];
      if (files.length > 0) {
        collegeIdUrls = await uploadFiles();
      }

      const submissionData = {
        full_name: `${formData.headFirstName} ${formData.headMiddleName} ${formData.familyName}`.trim(),
        family_name: formData.familyName.trim(),
        head_first_name: formData.headFirstName.trim(),
        head_middle_name: formData.headMiddleName.trim(),
        head_dob: formData.headDob?.toISOString().split('T')[0],
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        street_address: formData.streetAddress.trim(),
        city: formData.city.trim(),
        state: formData.state,
        zip_code: formData.zipCode.trim(),
        household_members: formData.householdMembers.trim(),
        household_notes: formData.householdMembers.trim(),
        college_id_urls: collegeIdUrls.length > 0 ? collegeIdUrls : null,
        zelle_contact: formData.zelleContact.trim(),
        membership_type: "household",
        acknowledged: formData.acknowledged,
      };

      const { error } = await supabase.from("membership_submissions").insert(submissionData);

      if (error) throw error;

      // Send email notification (don't block on failure)
      sendNotificationEmail("membership", submissionData).catch(console.error);

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
      householdMembers: "",
      zelleContact: "",
      acknowledged: false,
    });
    setFiles([]);
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
              Membership Sign-Up
            </h1>
            <h2 className="font-heading text-2xl md:text-3xl text-primary mb-4" dir="rtl">
              تسجيل العضوية
            </h2>
            <p className="text-lg text-muted-foreground">
              Join the Beiteen Association U.S.A. and be part of our vibrant community.
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Membership Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            {isSubmitted ? (
              <MotionSection>
                <MotionCard className="card-heritage p-8 md:p-12">
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
                        Thank You!
                      </h3>
                      <p className="text-lg text-muted-foreground mb-2">
                        Your membership form has been submitted successfully.
                      </p>
                      <p className="text-muted-foreground">
                        Thank you for your inquiry/submission. A member of our team will respond within 2 business days.
                      </p>
                    </div>

                    {/* Zelle Payment Details */}
                    <div className="p-8 bg-muted rounded-xl space-y-6">
                      <h4 className="font-heading text-xl font-semibold text-foreground">
                        Complete Payment via Zelle
                      </h4>
                      <img 
                        src={zelleQR} 
                        alt="Zelle QR Code" 
                        className="w-56 h-56 mx-auto border border-border rounded-lg shadow-sm"
                      />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Send membership payment via Zelle to:</p>
                        <p className="text-lg font-medium text-foreground">{ZELLE_EMAIL}</p>
                      </div>
                      <p className="text-sm text-muted-foreground bg-primary/5 p-4 rounded-lg">
                        <strong>Note:</strong> We will match your payment to your submission details. 
                        Your membership will be activated after we verify your payment (typically within 2 business days).
                      </p>
                    </div>

                    <Button variant="outline" onClick={resetForm} className="w-full max-w-xs">
                      Submit Another Membership
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
                      Membership Benefits
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Access to community events and gatherings</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Voting rights in association decisions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Newsletter and community updates</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Support community initiatives</span>
                      </li>
                    </ul>
                  </MotionCard>

                  <MotionCard className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      Payment via Zelle
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      After submitting this form, you'll receive Zelle payment instructions. 
                      We will match your payment to your submission details.
                    </p>
                  </MotionCard>
                </MotionSection>

                {/* Form Section */}
                <MotionSection variant="fadeUp" delay={0.2} className="lg:col-span-3">
                  <MotionCard className="card-heritage p-6 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Family Name */}
                      <div className="space-y-2">
                        <Label htmlFor="familyName">
                          Family Name (Last Name) / اسم العائلة (اسم الأخير) *
                        </Label>
                        <Input
                          id="familyName"
                          name="familyName"
                          value={formData.familyName}
                          onChange={handleChange}
                          placeholder="Enter family name"
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
                            Head of Household (First Name) / رب الأسرة (الاسم الأول) *
                          </Label>
                          <Input
                            id="headFirstName"
                            name="headFirstName"
                            value={formData.headFirstName}
                            onChange={handleChange}
                            placeholder="First name"
                            className={errors.headFirstName ? "border-destructive" : ""}
                          />
                          {errors.headFirstName && (
                            <p className="text-sm text-destructive">{errors.headFirstName}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="headMiddleName">
                            Head of Household (Middle Name) / رب الأسرة (اسم الأب) *
                          </Label>
                          <Input
                            id="headMiddleName"
                            name="headMiddleName"
                            value={formData.headMiddleName}
                            onChange={handleChange}
                            placeholder="Middle name"
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
                          Head of Household Date of Birth / تاريخ ميلاد رب الأسرة *
                        </Label>
                        <DOBPicker
                          value={formData.headDob}
                          onChange={(date) => {
                            setFormData(prev => ({ ...prev, headDob: date }));
                            if (errors.headDob) {
                              setErrors(prev => ({ ...prev, headDob: "" }));
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
                            Best Contact Number / أفضل رقم اتصال *
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
                            Email Address / عنوان البريد الإلكتروني *
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
                          Street Address / عنوان الشارع *
                        </Label>
                        <Input
                          id="streetAddress"
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleChange}
                          placeholder="123 Main Street"
                          className={errors.streetAddress ? "border-destructive" : ""}
                        />
                        {errors.streetAddress && (
                          <p className="text-sm text-destructive">{errors.streetAddress}</p>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">
                            City / مدينة *
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className={errors.city ? "border-destructive" : ""}
                          />
                          {errors.city && (
                            <p className="text-sm text-destructive">{errors.city}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">
                            State / ولاية *
                          </Label>
                          <Select
                            value={formData.state}
                            onValueChange={(value) => {
                              setFormData(prev => ({ ...prev, state: value }));
                              if (errors.state) {
                                setErrors(prev => ({ ...prev, state: "" }));
                              }
                            }}
                          >
                            <SelectTrigger className={errors.state ? "border-destructive" : ""}>
                              <SelectValue placeholder="Select state" />
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
                            ZIP Code / الرمز البريدي *
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

                      {/* Household Members */}
                      <div className="space-y-2">
                        <Label htmlFor="householdMembers">
                          Household Members (Names + DOBs) / يرجى إدراج جميع أفراد العائلة *
                        </Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          List all family members with their names and dates of birth
                        </p>
                        <Textarea
                          id="householdMembers"
                          name="householdMembers"
                          value={formData.householdMembers}
                          onChange={handleChange}
                          placeholder="Example:&#10;Ahmad Khalil - 01/15/1985&#10;Sarah Khalil - 03/22/1988&#10;Omar Khalil - 07/10/2015"
                          rows={5}
                          className={errors.householdMembers ? "border-destructive" : ""}
                        />
                        {errors.householdMembers && (
                          <p className="text-sm text-destructive">{errors.householdMembers}</p>
                        )}
                      </div>

                      {/* College ID Upload */}
                      <div className="space-y-2">
                        <Label>
                          College ID Upload (Optional - for household members ages 18-21)
                        </Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          If any household member age 18-21 is a college student, upload a valid college ID. 
                          Max 5 files, 10MB each.
                        </p>
                        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,.pdf"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            id="college-id-upload"
                          />
                          <label
                            htmlFor="college-id-upload"
                            className="cursor-pointer flex flex-col items-center gap-2"
                          >
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Click to upload college ID(s)
                            </span>
                          </label>
                        </div>
                        {files.length > 0 && (
                          <ul className="mt-2 space-y-2">
                            {files.map((file, index) => (
                              <li key={index} className="flex items-center justify-between bg-muted px-3 py-2 rounded-md text-sm">
                                <span className="truncate">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-destructive hover:text-destructive/80 ml-2"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Zelle Contact */}
                      <div className="space-y-2">
                        <Label htmlFor="zelleContact">
                          Zelle Account Contact (Phone or Email) / لإتمام عملية الدفع *
                        </Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          Enter the phone number or email associated with your Zelle account to receive a payment request
                        </p>
                        <Input
                          id="zelleContact"
                          name="zelleContact"
                          value={formData.zelleContact}
                          onChange={handleChange}
                          placeholder="Email or phone number"
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
                        <Label htmlFor="acknowledged" className="text-sm font-normal leading-relaxed cursor-pointer">
                          I understand that my membership will be activated after manual verification of payment via Zelle. 
                          A member of the team will respond within 2 business days.
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
                          {isSubmitting ? "Submitting..." : "Submit Membership Form"}
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
                subtitle="Common questions about joining Beiteen Association"
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Membership;
