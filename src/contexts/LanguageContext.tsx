// Language Context for i18n support - EN/AR with full site translation
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Complete translation dictionary - ALL site content
const translations: Record<string, Record<Language, string>> = {
  // =====================
  // NAVIGATION
  // =====================
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.mission": { en: "Mission", ar: "رسالتنا" },
  "nav.board": { en: "Board", ar: "مجلس الإدارة" },
  "nav.bylaws": { en: "Bylaws", ar: "اللوائح" },
  "nav.gallery": { en: "Gallery", ar: "معرض الصور" },
  "nav.membership": { en: "Membership", ar: "العضوية" },
  "nav.donate": { en: "Donate", ar: "تبرع" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },

  // =====================
  // HOME PAGE
  // =====================
  "home.badge": { en: "501(c)(3) Nonprofit Organization", ar: "منظمة غير ربحية 501(c)(3)" },
  "home.hero.title1": { en: "Building Community,", ar: "بناء المجتمع،" },
  "home.hero.title2": { en: "Preserving Heritage", ar: "الحفاظ على التراث" },
  "home.hero.description": { 
    en: "The Beiteen Association U.S.A. connects families and preserves our rich cultural heritage through charitable programs, educational initiatives, and community events.", 
    ar: "تربط جمعية بيتين في الولايات المتحدة العائلات وتحافظ على تراثنا الثقافي الغني من خلال البرامج الخيرية والمبادرات التعليمية والفعاليات المجتمعية."
  },
  "home.hero.missionBtn": { en: "Our Mission", ar: "رسالتنا" },
  "home.hero.contactBtn": { en: "Get In Touch", ar: "تواصل معنا" },
  
  // Core Values
  "home.values.title": { en: "Our Core Values", ar: "قيمنا الأساسية" },
  "home.values.subtitle": { en: "Guided by our commitment to community, culture, and connection.", ar: "بتوجيه من التزامنا تجاه المجتمع والثقافة والتواصل." },
  "home.values.charitable.title": { en: "Charitable", ar: "خيري" },
  "home.values.charitable.desc": { en: "Supporting those in need within our community through various assistance programs.", ar: "دعم المحتاجين في مجتمعنا من خلال برامج مساعدة متنوعة." },
  "home.values.educational.title": { en: "Educational", ar: "تعليمي" },
  "home.values.educational.desc": { en: "Fostering learning and growth through scholarships and educational initiatives.", ar: "تعزيز التعلم والنمو من خلال المنح الدراسية والمبادرات التعليمية." },
  "home.values.cultural.title": { en: "Cultural", ar: "ثقافي" },
  "home.values.cultural.desc": { en: "Preserving and celebrating our rich Palestinian heritage and traditions.", ar: "الحفاظ على تراثنا الفلسطيني الغني وتقاليدنا والاحتفاء بها." },
  "home.values.social.title": { en: "Social", ar: "اجتماعي" },
  "home.values.social.desc": { en: "Building strong connections through gatherings, events, and family support.", ar: "بناء روابط قوية من خلال التجمعات والفعاليات ودعم الأسرة." },

  // Who We Serve
  "home.serve.title": { en: "Who We Serve", ar: "من نخدم" },
  "home.serve.subtitle": { en: "Our community extends across generations and geography, united by shared heritage.", ar: "يمتد مجتمعنا عبر الأجيال والجغرافيا، متحدين بتراث مشترك." },
  "home.serve.families.title": { en: "Families of Beiteen", ar: "عائلات بيتين" },
  "home.serve.families.desc": { en: "Descendants and relatives of the village of Beiteen, connecting our extended family.", ar: "أحفاد وأقارب قرية بيتين، نربط عائلتنا الممتدة." },
  "home.serve.youth.title": { en: "Youth & Future Generations", ar: "الشباب والأجيال القادمة" },
  "home.serve.youth.desc": { en: "Young people learning about their heritage and building connections for the future.", ar: "الشباب الذين يتعلمون عن تراثهم ويبنون روابط للمستقبل." },
  "home.serve.elders.title": { en: "Elders & Heritage Keepers", ar: "كبار السن وحراس التراث" },
  "home.serve.elders.desc": { en: "Those who preserve our stories, traditions, and cultural knowledge.", ar: "أولئك الذين يحافظون على قصصنا وتقاليدنا ومعرفتنا الثقافية." },
  "home.serve.community.title": { en: "Community Near & Far", ar: "المجتمع قريباً وبعيداً" },
  "home.serve.community.desc": { en: "Members locally in St. Louis and connected globally through our shared roots.", ar: "الأعضاء محلياً في سانت لويس ومتصلون عالمياً من خلال جذورنا المشتركة." },

  // What We Do
  "home.whatWeDo.title": { en: "What We Do", ar: "ماذا نفعل" },
  "home.whatWeDo.subtitle": { en: "Through our programs and initiatives, we strengthen bonds within our community while giving back to those in need.", ar: "من خلال برامجنا ومبادراتنا، نعزز الروابط داخل مجتمعنا مع رد الجميل للمحتاجين." },
  "home.whatWeDo.gatherings.title": { en: "Community Gatherings & Cultural Events", ar: "التجمعات المجتمعية والفعاليات الثقافية" },
  "home.whatWeDo.gatherings.desc": { en: "Regular events including Ramadan iftars, Eid celebrations, and family gatherings.", ar: "فعاليات منتظمة تشمل إفطارات رمضان واحتفالات العيد والتجمعات العائلية." },
  "home.whatWeDo.education.title": { en: "Educational & Youth Programs", ar: "البرامج التعليمية والشبابية" },
  "home.whatWeDo.education.desc": { en: "Supporting scholarships and educational opportunities for young community members.", ar: "دعم المنح الدراسية والفرص التعليمية لأعضاء المجتمع الشباب." },
  "home.whatWeDo.humanitarian.title": { en: "Humanitarian Initiatives", ar: "المبادرات الإنسانية" },
  "home.whatWeDo.humanitarian.desc": { en: "Charitable programs supporting families in need locally and abroad.", ar: "برامج خيرية تدعم العائلات المحتاجة محلياً وخارجياً." },
  "home.whatWeDo.preservation.title": { en: "Cultural Preservation", ar: "الحفاظ على الثقافة" },
  "home.whatWeDo.preservation.desc": { en: "Documenting and celebrating our Palestinian heritage and traditions.", ar: "توثيق والاحتفاء بتراثنا وتقاليدنا الفلسطينية." },
  "home.whatWeDo.goal": { en: "5 Year", ar: "5 سنوات" },
  "home.whatWeDo.goalTitle": { en: "Community Property Goal", ar: "هدف الملكية المجتمعية" },
  "home.whatWeDo.goalDesc": { en: "A permanent home for our community in St. Louis", ar: "مقر دائم لمجتمعنا في سانت لويس" },

  // Transparency
  "home.transparency.title": { en: "Our Commitment to Transparency", ar: "التزامنا بالشفافية" },
  "home.transparency.desc": { en: "The Beiteen Association U.S.A. operates with the highest standards of ethical governance. Our bylaws are publicly available, and we are committed to responsible stewardship of all contributions. We believe in community accountability and maintain open communication with our members about how resources are used to serve our mission.", ar: "تعمل جمعية بيتين في الولايات المتحدة بأعلى معايير الحوكمة الأخلاقية. لوائحنا متاحة للعامة، ونحن ملتزمون بالإشراف المسؤول على جميع المساهمات. نؤمن بمساءلة المجتمع ونحافظ على التواصل المفتوح مع أعضائنا حول كيفية استخدام الموارد لخدمة رسالتنا." },
  "home.transparency.bylawsBtn": { en: "View Our Bylaws", ar: "عرض لوائحنا" },
  "home.transparency.boardBtn": { en: "Meet Our Board", ar: "تعرف على مجلس إدارتنا" },

  // How You Can Help
  "home.help.title": { en: "How You Can Help", ar: "كيف يمكنك المساعدة" },
  "home.help.subtitle": { en: "Join us in building a stronger community", ar: "انضم إلينا في بناء مجتمع أقوى" },
  "home.help.member.title": { en: "Become a Member", ar: "كن عضواً" },
  "home.help.member.desc": { en: "Join our association and be part of our growing community. Members enjoy voting rights and access to all events.", ar: "انضم إلى جمعيتنا وكن جزءاً من مجتمعنا المتنامي. يتمتع الأعضاء بحقوق التصويت والوصول إلى جميع الفعاليات." },
  "home.help.member.btn": { en: "Join Now", ar: "انضم الآن" },
  "home.help.donate.title": { en: "Make a Donation", ar: "قدم تبرعاً" },
  "home.help.donate.desc": { en: "Your generous donations help fund our programs and support community initiatives.", ar: "تساعد تبرعاتك السخية في تمويل برامجنا ودعم المبادرات المجتمعية." },
  "home.help.donate.btn": { en: "Donate Now", ar: "تبرع الآن" },
  "home.help.volunteer.title": { en: "Volunteer", ar: "تطوع" },
  "home.help.volunteer.desc": { en: "Share your time and talents. We're always looking for dedicated volunteers to help with events and programs.", ar: "شارك وقتك ومواهبك. نحن نبحث دائماً عن متطوعين متفانين للمساعدة في الفعاليات والبرامج." },
  "home.help.volunteer.btn": { en: "Contact Us", ar: "اتصل بنا" },

  // Volunteer CTA
  "home.volunteer.title": { en: "Volunteer With Us", ar: "تطوع معنا" },
  "home.volunteer.desc": { en: "Looking for ways to contribute beyond financial support? We welcome volunteers who can help with event planning, youth mentoring, cultural programming, and more. Your time and talents make a real difference in our community.", ar: "تبحث عن طرق للمساهمة بما يتجاوز الدعم المالي؟ نرحب بالمتطوعين الذين يمكنهم المساعدة في تخطيط الفعاليات وإرشاد الشباب والبرمجة الثقافية وغيرها. وقتك ومواهبك تحدث فرقاً حقيقياً في مجتمعنا." },
  "home.volunteer.btn": { en: "Get Involved", ar: "شارك معنا" },

  // Join CTA
  "home.join.title": { en: "Join Our Community", ar: "انضم إلى مجتمعنا" },
  "home.join.desc": { en: "Whether you're looking to reconnect with your heritage, support our community initiatives, or simply learn more about Beiteen, we welcome you with open arms.", ar: "سواء كنت تتطلع إلى إعادة التواصل مع تراثك أو دعم مبادراتنا المجتمعية أو مجرد معرفة المزيد عن بيتين، نرحب بك بأذرع مفتوحة." },
  "home.join.memberBtn": { en: "Become a Member", ar: "كن عضواً" },
  "home.join.donateBtn": { en: "Support Our Mission", ar: "ادعم رسالتنا" },

  // Latest Updates
  "home.updates.title": { en: "Latest Updates", ar: "آخر التحديثات" },
  "home.updates.subtitle": { en: "Stay connected with our community", ar: "ابق على تواصل مع مجتمعنا" },

  // =====================
  // MISSION PAGE
  // =====================
  "mission.title": { en: "Our Mission", ar: "رسالتنا" },
  "mission.subtitle": { en: "Guided by our founding principles and commitment to community.", ar: "بتوجيه من مبادئنا التأسيسية والتزامنا تجاه المجتمع." },
  "mission.statement.label": { en: "Mission Statement", ar: "بيان الرسالة" },
  "mission.statement.text": { en: "\"Rooted in our Articles of Incorporation, the Beiteen Association U.S.A. is a non-profit, non-political, and non-sectarian organization committed to charitable, cultural, educational, and social advancement. We exist to support, uplift, and connect individuals and families through programs and initiatives that foster growth, heritage, and community pride.\"", ar: "\"متجذرة في عقد تأسيسنا، جمعية بيتين في الولايات المتحدة هي منظمة غير ربحية وغير سياسية وغير طائفية ملتزمة بالتقدم الخيري والثقافي والتعليمي والاجتماعي. نحن موجودون لدعم ورفع وربط الأفراد والعائلات من خلال برامج ومبادرات تعزز النمو والتراث وفخر المجتمع.\"" },
  "mission.why.title": { en: "Our Why", ar: "لماذا نحن" },
  "mission.why.subtitle": { en: "The heart behind everything we do.", ar: "القلب وراء كل ما نفعله." },
  "mission.why.families.title": { en: "Reconnecting Families", ar: "إعادة ربط العائلات" },
  "mission.why.families.desc": { en: "We believe in the power of family bonds. Our programs help families reconnect across generations and distances, strengthening the ties that bind us together.", ar: "نؤمن بقوة الروابط العائلية. تساعد برامجنا العائلات على إعادة التواصل عبر الأجيال والمسافات، مما يعزز الروابط التي تجمعنا معاً." },
  "mission.why.unity.title": { en: "Multi-Generational Unity", ar: "وحدة متعددة الأجيال" },
  "mission.why.unity.desc": { en: "From our elders who carry wisdom to our youth who carry the future, we create spaces where all generations come together to learn, share, and grow.", ar: "من كبار السن الذين يحملون الحكمة إلى شبابنا الذين يحملون المستقبل، نخلق مساحات حيث تجتمع جميع الأجيال للتعلم والمشاركة والنمو." },
  "mission.why.ties.title": { en: "Rebuilding Community Ties", ar: "إعادة بناء روابط المجتمع" },
  "mission.why.ties.desc": { en: "Through cultural events, educational programs, and community gatherings, we rebuild and strengthen the connections that make our community thrive.", ar: "من خلال الفعاليات الثقافية والبرامج التعليمية والتجمعات المجتمعية، نعيد بناء ونعزز الروابط التي تجعل مجتمعنا يزدهر." },
  "mission.pillars.title": { en: "Our Four Pillars", ar: "ركائزنا الأربع" },
  "mission.pillars.charitable.title": { en: "Charitable", ar: "خيري" },
  "mission.pillars.charitable.desc": { en: "We provide assistance and support to community members in need, ensuring no one faces hardship alone.", ar: "نقدم المساعدة والدعم لأفراد المجتمع المحتاجين، ونضمن ألا يواجه أحد الصعوبات وحده." },
  "mission.pillars.cultural.title": { en: "Cultural", ar: "ثقافي" },
  "mission.pillars.cultural.desc": { en: "We preserve and celebrate our Palestinian heritage through events, traditions, and educational programs.", ar: "نحافظ على تراثنا الفلسطيني ونحتفي به من خلال الفعاليات والتقاليد والبرامج التعليمية." },
  "mission.pillars.educational.title": { en: "Educational", ar: "تعليمي" },
  "mission.pillars.educational.desc": { en: "We invest in the education and development of our youth, providing resources and opportunities for growth.", ar: "نستثمر في تعليم وتطوير شبابنا، ونوفر الموارد والفرص للنمو." },
  "mission.pillars.social.title": { en: "Social", ar: "اجتماعي" },
  "mission.pillars.social.desc": { en: "We create meaningful opportunities for families and individuals to connect, celebrate, and support one another.", ar: "نخلق فرصاً هادفة للعائلات والأفراد للتواصل والاحتفال ودعم بعضهم البعض." },

  // =====================
  // BOARD PAGE
  // =====================
  "board.title": { en: "Board of Directors", ar: "مجلس الإدارة" },
  "board.subtitle": { en: "Dedicated leaders serving our community with integrity and commitment.", ar: "قادة متفانون يخدمون مجتمعنا بنزاهة والتزام." },
  "board.note": { en: "Our board members volunteer their time and expertise to serve the Beiteen community. Directors receive no compensation for their service.", ar: "يتطوع أعضاء مجلس إدارتنا بوقتهم وخبراتهم لخدمة مجتمع بيتين. لا يتلقى المديرون أي تعويض عن خدمتهم." },
  "board.governance.title": { en: "Board Governance", ar: "حوكمة المجلس" },
  "board.governance.term.title": { en: "Term of Service", ar: "مدة الخدمة" },
  "board.governance.term.desc": { en: "Directors are elected at the annual meeting and serve two-year terms. Directors may serve no more than two consecutive terms.", ar: "يُنتخب المديرون في الاجتماع السنوي ويخدمون لفترات مدتها سنتان. لا يجوز للمديرين الخدمة لأكثر من فترتين متتاليتين." },
  "board.governance.meetings.title": { en: "Meetings", ar: "الاجتماعات" },
  "board.governance.meetings.desc": { en: "Board meetings are held every two months at a time and place determined by the Board. A majority of Directors constitutes a quorum.", ar: "تُعقد اجتماعات المجلس كل شهرين في الوقت والمكان الذي يحدده المجلس. تشكل أغلبية المديرين النصاب القانوني." },
  "board.roles.president": { en: "President", ar: "الرئيس" },
  "board.roles.vp": { en: "Vice President", ar: "نائب الرئيس" },
  "board.roles.treasurer": { en: "Treasurer", ar: "أمين الصندوق" },
  "board.roles.secretary": { en: "Secretary", ar: "السكرتير" },
  "board.roles.communications": { en: "Communications & PR", ar: "الاتصالات والعلاقات العامة" },
  "board.roles.advisor": { en: "Advisor", ar: "مستشار" },

  // =====================
  // GALLERY PAGE
  // =====================
  "gallery.title": { en: "Gallery", ar: "معرض الصور" },
  "gallery.subtitle": { en: "Moments from our community gatherings, cultural events, and shared experiences.", ar: "لحظات من تجمعاتنا المجتمعية وفعالياتنا الثقافية وتجاربنا المشتركة." },
  "gallery.morePhotos.title": { en: "More Photos Coming Soon", ar: "المزيد من الصور قريباً" },
  "gallery.morePhotos.desc": { en: "We're continuously adding new photos from community events, cultural celebrations, and special moments. Check back soon for updates!", ar: "نضيف باستمرار صوراً جديدة من الفعاليات المجتمعية والاحتفالات الثقافية واللحظات الخاصة. تحقق مرة أخرى قريباً للحصول على التحديثات!" },
  "gallery.categories.heritage": { en: "Heritage", ar: "التراث" },
  "gallery.categories.events": { en: "Events", ar: "الفعاليات" },
  "gallery.categories.organization": { en: "Organization", ar: "المنظمة" },
  "gallery.categories.culture": { en: "Culture", ar: "الثقافة" },
  "gallery.categories.education": { en: "Education", ar: "التعليم" },

  // =====================
  // BYLAWS PAGE
  // =====================
  "bylaws.title": { en: "Bylaws", ar: "اللوائح" },
  "bylaws.subtitle": { en: "The governing rules and regulations of Beiteen Association U.S.A.", ar: "القواعد واللوائح الحاكمة لجمعية بيتين في الولايات المتحدة الأمريكية." },
  "bylaws.toc": { en: "Table of Contents", ar: "جدول المحتويات" },
  "bylaws.lastUpdated": { en: "Last Updated:", ar: "آخر تحديث:" },
  "bylaws.lastUpdatedNote": { en: "These bylaws were adopted by the membership and are subject to amendment as described in Article VIII.", ar: "تم اعتماد هذه اللوائح من قبل الأعضاء وهي قابلة للتعديل كما هو موضح في المادة الثامنة." },
  "bylaws.questions": { en: "Questions about our bylaws?", ar: "أسئلة حول لوائحنا؟" },
  "bylaws.contactUs": { en: "Contact us", ar: "اتصل بنا" },

  // =====================
  // MEMBERSHIP PAGE
  // =====================
  "membership.title": { en: "Membership Sign-Up", ar: "تسجيل العضوية" },
  "membership.subtitle": { en: "Join the Beiteen Association U.S.A. and be part of our vibrant community.", ar: "انضم إلى جمعية بيتين في الولايات المتحدة وكن جزءاً من مجتمعنا النابض بالحياة." },
  "membership.selectType": { en: "Select Membership Type", ar: "اختر نوع العضوية" },
  "membership.benefits.title": { en: "Membership Benefits", ar: "مزايا العضوية" },
  "membership.benefits.events": { en: "Access to community events and gatherings", ar: "الوصول إلى الفعاليات والتجمعات المجتمعية" },
  "membership.benefits.voting": { en: "Voting rights in association decisions", ar: "حقوق التصويت في قرارات الجمعية" },
  "membership.benefits.newsletter": { en: "Newsletter and community updates", ar: "النشرة الإخبارية وتحديثات المجتمع" },
  "membership.benefits.support": { en: "Support community initiatives", ar: "دعم المبادرات المجتمعية" },
  "membership.zelle.title": { en: "Payment via Zelle", ar: "الدفع عبر Zelle" },
  "membership.zelle.desc": { en: "After submitting this form, you'll receive Zelle payment instructions. We will match your payment to your submission details.", ar: "بعد تقديم هذا النموذج، ستتلقى تعليمات الدفع عبر Zelle. سنطابق دفعتك مع تفاصيل تقديمك." },
  "membership.family.title": { en: "Family", ar: "عائلي" },
  "membership.family.price": { en: "$100/year", ar: "100$/سنة" },
  "membership.family.desc": { en: "For households with multiple family members", ar: "للأسر التي تضم عدة أفراد" },
  "membership.individual.title": { en: "Individual", ar: "فردي" },
  "membership.individual.price": { en: "$50/year", ar: "50$/سنة" },
  "membership.individual.desc": { en: "For single adults", ar: "للبالغين العازبين" },
  "membership.student.title": { en: "Student", ar: "طالب" },
  "membership.student.price": { en: "$25/year", ar: "25$/سنة" },
  "membership.student.desc": { en: "For full-time students ages 18-21", ar: "للطلاب بدوام كامل من سن 18-21" },

  // =====================
  // DONATIONS PAGE
  // =====================
  "donate.title": { en: "Make a Donation", ar: "قدم تبرعاً" },
  "donate.subtitle": { en: "Your generosity helps us continue our mission of preserving heritage and supporting our community.", ar: "سخاؤك يساعدنا على مواصلة رسالتنا في الحفاظ على التراث ودعم مجتمعنا." },
  "donate.impact.title": { en: "Your Impact", ar: "تأثيرك" },
  "donate.impact.desc": { en: "Every donation, no matter the size, makes a meaningful difference in our community. Your contribution supports:", ar: "كل تبرع، بغض النظر عن حجمه، يحدث فرقاً ذا معنى في مجتمعنا. مساهمتك تدعم:" },
  "donate.impact.events": { en: "Community events and cultural celebrations", ar: "الفعاليات المجتمعية والاحتفالات الثقافية" },
  "donate.impact.youth": { en: "Youth educational programs", ar: "البرامج التعليمية للشباب" },
  "donate.impact.heritage": { en: "Heritage preservation initiatives", ar: "مبادرات الحفاظ على التراث" },
  "donate.impact.families": { en: "Support for families in need", ar: "دعم العائلات المحتاجة" },
  "donate.process.title": { en: "Donation Process", ar: "عملية التبرع" },
  "donate.process.desc": { en: "After submitting this form, you'll see our Zelle payment details. We'll send you a confirmation once we verify your donation (typically within 2 business days).", ar: "بعد تقديم هذا النموذج، سترى تفاصيل الدفع عبر Zelle. سنرسل لك تأكيداً بمجرد التحقق من تبرعك (عادةً خلال يومي عمل)." },
  "donate.taxDeductible.title": { en: "Tax Deductible", ar: "قابل للخصم الضريبي" },
  "donate.taxDeductible.desc": { en: "Beiteen Association U.S.A. is a registered 501(c)(3) nonprofit organization. Your donation may be tax-deductible. A receipt will be provided for your records.", ar: "جمعية بيتين في الولايات المتحدة هي منظمة غير ربحية مسجلة 501(c)(3). قد يكون تبرعك قابلاً للخصم الضريبي. سيتم توفير إيصال لسجلاتك." },
  "donate.anonymous": { en: "Make this donation anonymous", ar: "اجعل هذا التبرع مجهول الهوية" },
  "donate.amount": { en: "Donation Amount ($)", ar: "مبلغ التبرع ($)" },
  "donate.paymentDate": { en: "Intended Payment Date (Optional)", ar: "تاريخ الدفع المقصود (اختياري)" },
  "donate.message": { en: "Message (Optional)", ar: "رسالة (اختياري)" },
  "donate.messagePlaceholder": { en: "Any message you'd like to include with your donation", ar: "أي رسالة تود إضافتها مع تبرعك" },
  "donate.acknowledge": { en: "I understand this donation will be verified manually after I send payment via Zelle.", ar: "أفهم أن هذا التبرع سيتم التحقق منه يدوياً بعد إرسال الدفع عبر Zelle." },
  "donate.submit": { en: "Submit Donation Form", ar: "إرسال نموذج التبرع" },
  "donate.submitting": { en: "Submitting...", ar: "جاري الإرسال..." },
  "donate.thankYou": { en: "Thank You for Your Generosity!", ar: "شكراً لسخائك!" },
  "donate.submitted": { en: "Your donation form has been submitted. Please complete your donation via Zelle using the details below.", ar: "تم تقديم نموذج تبرعك. يرجى إكمال تبرعك عبر Zelle باستخدام التفاصيل أدناه." },
  "donate.completeViaZelle": { en: "Complete Donation via Zelle", ar: "أكمل التبرع عبر Zelle" },
  "donate.sendTo": { en: "Or send to:", ar: "أو أرسل إلى:" },
  "donate.verification": { en: "We'll send you a confirmation once we verify your donation (typically within 2 business days).", ar: "سنرسل لك تأكيداً بمجرد التحقق من تبرعك (عادةً خلال يومي عمل)." },
  "donate.anotherDonation": { en: "Make Another Donation", ar: "قدم تبرعاً آخر" },

  // =====================
  // CONTACT PAGE
  // =====================
  "contact.title": { en: "Contact Us", ar: "اتصل بنا" },
  "contact.subtitle": { en: "We'd love to hear from you. Reach out with questions, ideas, or just to connect.", ar: "نحب أن نسمع منك. تواصل معنا للأسئلة أو الأفكار أو مجرد التواصل." },
  "contact.getInTouch": { en: "Get In Touch", ar: "تواصل معنا" },
  "contact.getInTouch.desc": { en: "Whether you have questions about our organization, want to get involved, or simply want to learn more about the Beiteen community, we're here to help.", ar: "سواء كانت لديك أسئلة حول منظمتنا أو تريد المشاركة أو مجرد معرفة المزيد عن مجتمع بيتين، نحن هنا للمساعدة." },
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.location": { en: "Location", ar: "الموقع" },
  "contact.responseTime.title": { en: "Response Time", ar: "وقت الاستجابة" },
  "contact.responseTime.desc": { en: "We aim to respond to all inquiries within 2 business days. For urgent matters, please indicate so in your message.", ar: "نهدف للرد على جميع الاستفسارات خلال يومي عمل. للأمور العاجلة، يرجى الإشارة إلى ذلك في رسالتك." },
  "contact.form.name": { en: "Name", ar: "الاسم" },
  "contact.form.namePlaceholder": { en: "Your full name", ar: "اسمك الكامل" },
  "contact.form.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.form.emailPlaceholder": { en: "your@email.com", ar: "بريدك@email.com" },
  "contact.form.message": { en: "Message", ar: "الرسالة" },
  "contact.form.messagePlaceholder": { en: "How can we help you?", ar: "كيف يمكننا مساعدتك؟" },
  "contact.form.submit": { en: "Send Message", ar: "إرسال الرسالة" },
  "contact.form.sending": { en: "Sending...", ar: "جاري الإرسال..." },
  "contact.thankYou": { en: "Thank You!", ar: "شكراً لك!" },
  "contact.submitted": { en: "Your message has been sent successfully. A member of our team will respond within 2 business days.", ar: "تم إرسال رسالتك بنجاح. سيرد أحد أعضاء فريقنا خلال يومي عمل." },
  "contact.sendAnother": { en: "Send Another Message", ar: "أرسل رسالة أخرى" },

  // =====================
  // FORM FIELDS (shared)
  // =====================
  "form.familyName": { en: "Family Name (Last Name)", ar: "اسم العائلة (الاسم الأخير)" },
  "form.firstName": { en: "Head of Household (First Name)", ar: "رب الأسرة (الاسم الأول)" },
  "form.middleName": { en: "Head of Household (Middle Name)", ar: "رب الأسرة (اسم الأب)" },
  "form.dob": { en: "Head of Household Date of Birth", ar: "تاريخ ميلاد رب الأسرة" },
  "form.phone": { en: "Best Contact Number", ar: "أفضل رقم اتصال" },
  "form.email": { en: "Email Address", ar: "عنوان البريد الإلكتروني" },
  "form.name": { en: "Name", ar: "الاسم" },
  "form.nameOptional": { en: "Name (Optional)", ar: "الاسم (اختياري)" },
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
  "form.acknowledgment": { en: "I understand that my membership will be activated after manual verification of payment via Zelle. A member of the team will respond within 2 business days.", ar: "أفهم أن عضويتي سيتم تفعيلها بعد التحقق اليدوي من الدفع عبر Zelle. سيرد أحد أعضاء الفريق خلال يومي عمل." },
  "form.submit": { en: "Submit Membership Form", ar: "إرسال نموذج العضوية" },
  "form.submitting": { en: "Submitting...", ar: "جاري الإرسال..." },
  "form.required": { en: "Required", ar: "مطلوب" },
  "form.optional": { en: "Optional", ar: "اختياري" },
  "form.selectDate": { en: "Select date of birth", ar: "اختر تاريخ الميلاد" },
  "form.selectState": { en: "Select state", ar: "اختر الولاية" },
  "form.uploadClick": { en: "Click to upload college ID(s)", ar: "انقر لتحميل هوية الكلية" },

  // =====================
  // SUCCESS MESSAGES
  // =====================
  "success.thankYou": { en: "Thank You!", ar: "شكراً لك!" },
  "success.submitted": { en: "Your membership form has been submitted successfully.", ar: "تم تقديم نموذج عضويتك بنجاح." },
  "success.response": { en: "Thank you for your inquiry/submission. A member of our team will respond within 2 business days.", ar: "شكراً لاستفسارك/تقديمك. سيرد أحد أعضاء فريقنا خلال يومي عمل." },
  "success.zelleTitle": { en: "Complete Payment via Zelle", ar: "أكمل الدفع عبر Zelle" },
  "success.zelleSendTo": { en: "Send membership payment via Zelle to:", ar: "أرسل دفعة العضوية عبر Zelle إلى:" },
  "success.zelleNote": { en: "We will match your payment to your submission details. Your membership will be activated after we verify your payment (typically within 2 business days).", ar: "سنطابق دفعتك مع تفاصيل تقديمك. سيتم تفعيل عضويتك بعد التحقق من دفعتك (عادةً خلال يومي عمل)." },
  "success.submitAnother": { en: "Submit Another Membership", ar: "تقديم عضوية أخرى" },

  // =====================
  // FOOTER
  // =====================
  "footer.description": { en: "A 501(c)(3) nonprofit organization committed to charitable, cultural, educational, and social advancement.", ar: "منظمة غير ربحية 501(c)(3) ملتزمة بالتقدم الخيري والثقافي والتعليمي والاجتماعي." },
  "footer.quickLinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.connect": { en: "Connect With Us", ar: "تواصل معنا" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.nonprofit": { en: "A non-profit, non-political, and non-sectarian organization", ar: "منظمة غير ربحية وغير سياسية وغير طائفية" },

  // =====================
  // COMMON
  // =====================
  "common.learnMore": { en: "Learn More", ar: "اعرف المزيد" },
  "common.note": { en: "Note", ar: "ملاحظة" },
  "common.amount": { en: "Amount", ar: "المبلغ" },
  "common.intendedDate": { en: "Intended Date", ar: "التاريخ المقصود" },
  "common.scroll": { en: "Scroll", ar: "مرر" },
  "common.more": { en: "More", ar: "المزيد" },
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
