import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.mission": { en: "Mission", ar: "رسالتنا" },
  "nav.board": { en: "Board", ar: "مجلس الإدارة" },
  "nav.bylaws": { en: "Bylaws", ar: "اللوائح" },
  "nav.gallery": { en: "Gallery", ar: "معرض الصور" },
  "nav.membership": { en: "Membership", ar: "العضوية" },
  "nav.donate": { en: "Donate", ar: "تبرع" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  
  // Home page
  "home.hero.title": { en: "Beiteen Association", ar: "جمعية بيتين" },
  "home.hero.subtitle": { en: "U.S.A.", ar: "الولايات المتحدة الأمريكية" },
  "home.hero.tagline": { en: "Building community, preserving heritage.", ar: "بناء المجتمع، والحفاظ على التراث." },
  "home.hero.description": { 
    en: "A 501(c)(3) nonprofit organization committed to charitable, cultural, educational, and social advancement in the St. Louis community.", 
    ar: "منظمة غير ربحية 501(c)(3) ملتزمة بالتقدم الخيري والثقافي والتعليمي والاجتماعي في مجتمع سانت لويس."
  },
  "home.hero.joinBtn": { en: "Become a Member", ar: "انضم إلينا" },
  "home.hero.learnBtn": { en: "Learn More", ar: "اعرف المزيد" },
  
  // What We Do section
  "home.whatWeDo.title": { en: "What We Do", ar: "ماذا نفعل" },
  "home.whatWeDo.subtitle": { 
    en: "Serving our community through meaningful programs and initiatives", 
    ar: "خدمة مجتمعنا من خلال برامج ومبادرات هادفة" 
  },
  "home.whatWeDo.gatherings.title": { en: "Community Gatherings", ar: "التجمعات المجتمعية" },
  "home.whatWeDo.gatherings.desc": { 
    en: "Regular events bringing families together to celebrate our shared heritage and strengthen community bonds.", 
    ar: "فعاليات منتظمة تجمع العائلات للاحتفال بتراثنا المشترك وتعزيز الروابط المجتمعية." 
  },
  "home.whatWeDo.youth.title": { en: "Youth Programs", ar: "برامج الشباب" },
  "home.whatWeDo.youth.desc": { 
    en: "Educational and cultural programs designed to engage and inspire the next generation.", 
    ar: "برامج تعليمية وثقافية مصممة لإشراك وإلهام الجيل القادم." 
  },
  "home.whatWeDo.heritage.title": { en: "Heritage Preservation", ar: "الحفاظ على التراث" },
  "home.whatWeDo.heritage.desc": { 
    en: "Documenting and sharing our history, traditions, and cultural practices for future generations.", 
    ar: "توثيق ومشاركة تاريخنا وتقاليدنا وممارساتنا الثقافية للأجيال القادمة." 
  },
  "home.whatWeDo.support.title": { en: "Family Support", ar: "دعم الأسرة" },
  "home.whatWeDo.support.desc": { 
    en: "Assistance programs for families in need, including emergency support and community resources.", 
    ar: "برامج مساعدة للعائلات المحتاجة، بما في ذلك الدعم الطارئ وموارد المجتمع." 
  },
  
  // How You Can Help section
  "home.help.title": { en: "How You Can Help", ar: "كيف يمكنك المساعدة" },
  "home.help.subtitle": { 
    en: "Join us in building a stronger community", 
    ar: "انضم إلينا في بناء مجتمع أقوى" 
  },
  "home.help.member.title": { en: "Become a Member", ar: "كن عضواً" },
  "home.help.member.desc": { 
    en: "Join our association and be part of our growing community. Members enjoy voting rights and access to all events.", 
    ar: "انضم إلى جمعيتنا وكن جزءاً من مجتمعنا المتنامي. يتمتع الأعضاء بحقوق التصويت والوصول إلى جميع الفعاليات." 
  },
  "home.help.member.btn": { en: "Join Now", ar: "انضم الآن" },
  "home.help.donate.title": { en: "Make a Donation", ar: "تبرع" },
  "home.help.donate.desc": { 
    en: "Your generous donations help fund our programs and support community initiatives.", 
    ar: "تساعد تبرعاتك السخية في تمويل برامجنا ودعم المبادرات المجتمعية." 
  },
  "home.help.donate.btn": { en: "Donate Now", ar: "تبرع الآن" },
  "home.help.volunteer.title": { en: "Volunteer", ar: "تطوع" },
  "home.help.volunteer.desc": { 
    en: "Share your time and talents. We're always looking for dedicated volunteers to help with events and programs.", 
    ar: "شارك وقتك ومواهبك. نحن نبحث دائماً عن متطوعين متفانين للمساعدة في الفعاليات والبرامج." 
  },
  "home.help.volunteer.btn": { en: "Contact Us", ar: "اتصل بنا" },
  
  // Latest Updates
  "home.updates.title": { en: "Latest Updates", ar: "آخر التحديثات" },
  "home.updates.subtitle": { en: "Stay connected with our community", ar: "ابق على تواصل مع مجتمعنا" },
  
  // Footer
  "footer.description": { 
    en: "A 501(c)(3) nonprofit organization committed to charitable, cultural, educational, and social advancement.", 
    ar: "منظمة غير ربحية 501(c)(3) ملتزمة بالتقدم الخيري والثقافي والتعليمي والاجتماعي." 
  },
  "footer.quickLinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.connect": { en: "Connect With Us", ar: "تواصل معنا" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.nonprofit": { 
    en: "A non-profit, non-political, and non-sectarian organization", 
    ar: "منظمة غير ربحية وغير سياسية وغير طائفية" 
  },
  
  // Membership page
  "membership.title": { en: "Membership Sign-Up", ar: "تسجيل العضوية" },
  "membership.subtitle": { 
    en: "Join the Beiteen Association U.S.A. and be part of our vibrant community.", 
    ar: "انضم إلى جمعية بيتين في الولايات المتحدة وكن جزءاً من مجتمعنا النابض بالحياة." 
  },
  "membership.benefits.title": { en: "Membership Benefits", ar: "مزايا العضوية" },
  "membership.benefits.events": { en: "Access to community events and gatherings", ar: "الوصول إلى الفعاليات والتجمعات المجتمعية" },
  "membership.benefits.voting": { en: "Voting rights in association decisions", ar: "حقوق التصويت في قرارات الجمعية" },
  "membership.benefits.newsletter": { en: "Newsletter and community updates", ar: "النشرة الإخبارية وتحديثات المجتمع" },
  "membership.benefits.support": { en: "Support community initiatives", ar: "دعم المبادرات المجتمعية" },
  "membership.zelle.title": { en: "Payment via Zelle", ar: "الدفع عبر Zelle" },
  "membership.zelle.desc": { 
    en: "After submitting this form, you'll receive Zelle payment instructions. We will match your payment to your submission details.", 
    ar: "بعد تقديم هذا النموذج، ستتلقى تعليمات الدفع عبر Zelle. سنطابق دفعتك مع تفاصيل تقديمك." 
  },
  
  // Form fields
  "form.familyName": { en: "Family Name (Last Name)", ar: "اسم العائلة (الاسم الأخير)" },
  "form.firstName": { en: "Head of Household (First Name)", ar: "رب الأسرة (الاسم الأول)" },
  "form.middleName": { en: "Head of Household (Middle Name)", ar: "رب الأسرة (اسم الأب)" },
  "form.dob": { en: "Head of Household Date of Birth", ar: "تاريخ ميلاد رب الأسرة" },
  "form.phone": { en: "Best Contact Number", ar: "أفضل رقم اتصال" },
  "form.email": { en: "Email Address", ar: "عنوان البريد الإلكتروني" },
  "form.streetAddress": { en: "Street Address", ar: "عنوان الشارع" },
  "form.city": { en: "City", ar: "المدينة" },
  "form.state": { en: "State", ar: "الولاية" },
  "form.zipCode": { en: "ZIP Code", ar: "الرمز البريدي" },
  "form.householdMembers": { en: "Household Members (Names + DOBs)", ar: "أفراد الأسرة (الأسماء + تواريخ الميلاد)" },
  "form.householdMembersHelp": { en: "List all family members with their names and dates of birth", ar: "أدرج جميع أفراد العائلة مع أسمائهم وتواريخ ميلادهم" },
  "form.collegeId": { en: "College ID Upload (Optional - for household members ages 18-21)", ar: "تحميل هوية الكلية (اختياري - لأفراد الأسرة من سن 18-21)" },
  "form.collegeIdHelp": { en: "If any household member age 18-21 is a college student, upload a valid college ID. Max 5 files, 10MB each.", ar: "إذا كان أي فرد من أفراد الأسرة بعمر 18-21 طالباً جامعياً، قم بتحميل هوية جامعية صالحة. الحد الأقصى 5 ملفات، 10 ميجابايت لكل منها." },
  "form.zelleContact": { en: "Zelle Account Contact (Phone or Email)", ar: "معلومات الاتصال بحساب Zelle (الهاتف أو البريد الإلكتروني)" },
  "form.zelleContactHelp": { en: "Enter the phone number or email associated with your Zelle account", ar: "أدخل رقم الهاتف أو البريد الإلكتروني المرتبط بحساب Zelle الخاص بك" },
  "form.acknowledgment": { 
    en: "I understand that my membership will be activated after manual verification of payment via Zelle. A member of the team will respond within 2 business days.", 
    ar: "أفهم أن عضويتي سيتم تفعيلها بعد التحقق اليدوي من الدفع عبر Zelle. سيرد أحد أعضاء الفريق خلال يومي عمل." 
  },
  "form.submit": { en: "Submit Membership Form", ar: "إرسال نموذج العضوية" },
  "form.submitting": { en: "Submitting...", ar: "جاري الإرسال..." },
  "form.required": { en: "Required", ar: "مطلوب" },
  "form.selectDate": { en: "Select date of birth", ar: "اختر تاريخ الميلاد" },
  "form.selectState": { en: "Select state", ar: "اختر الولاية" },
  "form.uploadClick": { en: "Click to upload college ID(s)", ar: "انقر لتحميل هوية الكلية" },
  
  // Thank you / Success
  "success.thankYou": { en: "Thank You!", ar: "شكراً لك!" },
  "success.submitted": { en: "Your membership form has been submitted successfully.", ar: "تم تقديم نموذج عضويتك بنجاح." },
  "success.response": { 
    en: "Thank you for your inquiry/submission. A member of our team will respond within 2 business days.", 
    ar: "شكراً لاستفسارك/تقديمك. سيرد أحد أعضاء فريقنا خلال يومي عمل." 
  },
  "success.zelleTitle": { en: "Complete Payment via Zelle", ar: "أكمل الدفع عبر Zelle" },
  "success.zelleSendTo": { en: "Send membership payment via Zelle to:", ar: "أرسل دفعة العضوية عبر Zelle إلى:" },
  "success.zelleNote": { 
    en: "We will match your payment to your submission details. Your membership will be activated after we verify your payment (typically within 2 business days).", 
    ar: "سنطابق دفعتك مع تفاصيل تقديمك. سيتم تفعيل عضويتك بعد التحقق من دفعتك (عادةً خلال يومي عمل)." 
  },
  "success.submitAnother": { en: "Submit Another Membership", ar: "تقديم عضوية أخرى" },
  
  // Donation page
  "donate.title": { en: "Support Our Mission", ar: "ادعم رسالتنا" },
  "donate.subtitle": { 
    en: "Your generous donations help us continue our mission of building community and preserving heritage.", 
    ar: "تساعدنا تبرعاتك السخية على مواصلة مهمتنا في بناء المجتمع والحفاظ على التراث." 
  },
  
  // Contact page
  "contact.title": { en: "Contact Us", ar: "اتصل بنا" },
  "contact.subtitle": { 
    en: "We'd love to hear from you. Reach out with questions, suggestions, or to learn more about getting involved.", 
    ar: "نحب أن نسمع منك. تواصل معنا للأسئلة أو الاقتراحات أو لمعرفة المزيد عن المشاركة." 
  },
  "contact.form.name": { en: "Your Name", ar: "اسمك" },
  "contact.form.email": { en: "Email Address", ar: "عنوان البريد الإلكتروني" },
  "contact.form.phone": { en: "Phone Number", ar: "رقم الهاتف" },
  "contact.form.message": { en: "Your Message", ar: "رسالتك" },
  "contact.form.submit": { en: "Send Message", ar: "إرسال الرسالة" },
  
  // Mission page
  "mission.title": { en: "Our Mission", ar: "رسالتنا" },
  "mission.subtitle": { 
    en: "Building community, preserving heritage, and serving future generations.", 
    ar: "بناء المجتمع، والحفاظ على التراث، وخدمة الأجيال القادمة." 
  },
  
  // Board page
  "board.title": { en: "Board of Directors", ar: "مجلس الإدارة" },
  "board.subtitle": { 
    en: "Meet the dedicated volunteers who lead our organization.", 
    ar: "تعرف على المتطوعين المتفانين الذين يقودون منظمتنا." 
  },
  
  // Bylaws page
  "bylaws.title": { en: "Bylaws", ar: "اللوائح" },
  "bylaws.subtitle": { 
    en: "The governing documents of Beiteen Association U.S.A.", 
    ar: "الوثائق الحاكمة لجمعية بيتين في الولايات المتحدة الأمريكية." 
  },
  "bylaws.toc": { en: "Table of Contents", ar: "جدول المحتويات" },
  "bylaws.download": { en: "Download Document", ar: "تحميل المستند" },
  
  // Gallery page
  "gallery.title": { en: "Gallery", ar: "معرض الصور" },
  "gallery.subtitle": { 
    en: "Moments from our community gatherings, cultural events, and shared experiences.", 
    ar: "لحظات من تجمعاتنا المجتمعية وفعالياتنا الثقافية وتجاربنا المشتركة." 
  },
  "gallery.morePhotos.title": { en: "More Photos Coming Soon", ar: "المزيد من الصور قريباً" },
  "gallery.morePhotos.desc": { 
    en: "We're continuously adding new photos from community events, cultural celebrations, and special moments. Check back soon for updates!", 
    ar: "نضيف باستمرار صوراً جديدة من الفعاليات المجتمعية والاحتفالات الثقافية واللحظات الخاصة. تحقق مرة أخرى قريباً للحصول على التحديثات!" 
  },
  
  // Common
  "common.learnMore": { en: "Learn More", ar: "اعرف المزيد" },
  "common.note": { en: "Note", ar: "ملاحظة" },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("beiteen-language");
      return (saved as Language) || "en";
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("beiteen-language", language);
    // Update document direction for RTL support
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
