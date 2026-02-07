export interface HouseholdMember {
  id: string;
  fullName: string;
  relationship: string;
  otherRelationship: string;
  dob: Date | undefined;
  isCollegeStudent: boolean;
  collegeFiles: File[];
}

export const RELATIONSHIPS = [
  { value: "husband_wife", en: "Husband/Wife", ar: "زوج/زوجة" },
  { value: "son", en: "Son", ar: "ابن" },
  { value: "daughter", en: "Daughter", ar: "ابنة" },
  { value: "father", en: "Father", ar: "أب" },
  { value: "mother", en: "Mother", ar: "أم" },
  { value: "brother", en: "Brother", ar: "أخ" },
  { value: "sister", en: "Sister", ar: "أخت" },
  { value: "grandfather", en: "Grandfather", ar: "جد" },
  { value: "grandmother", en: "Grandmother", ar: "جدة" },
  { value: "other", en: "Other", ar: "أخرى" },
];

export const createEmptyMember = (): HouseholdMember => ({
  id: crypto.randomUUID(),
  fullName: "",
  relationship: "",
  otherRelationship: "",
  dob: undefined,
  isCollegeStudent: false,
  collegeFiles: [],
});
