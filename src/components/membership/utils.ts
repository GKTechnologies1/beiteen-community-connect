import { HouseholdMember } from "./types";

export const calculateAge = (dob: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export const getFeeCategory = (
  age: number,
  isCollegeStudent: boolean
): { labelEn: string; labelAr: string; fee: number } => {
  if (age >= 21 && !isCollegeStudent) {
    return {
      labelEn: "21+ (Not in College) – $100",
      labelAr: "21+ (ليس في الجامعة) – 100$",
      fee: 100,
    };
  }
  if (age >= 18 && age <= 20 && isCollegeStudent) {
    return {
      labelEn: "College Student (18–21) – $50",
      labelAr: "طالب جامعي (18-21) – 50$",
      fee: 50,
    };
  }
  return { labelEn: "Included in household", labelAr: "مشمول في الأسرة", fee: 0 };
};

export interface FeeBreakdown {
  householdBase: number;
  adult21Plus: number;
  collegeStudents: number;
  total: number;
  adult21PlusCount: number;
  collegeStudentCount: number;
}

export const calculateTotalFee = (members: HouseholdMember[]): FeeBreakdown => {
  const householdBase = 200;
  let adult21Plus = 0;
  let collegeStudents = 0;
  let adult21PlusCount = 0;
  let collegeStudentCount = 0;

  for (const member of members) {
    if (!member.dob) continue;
    const age = calculateAge(member.dob);
    const category = getFeeCategory(age, member.isCollegeStudent);
    if (category.fee === 100) {
      adult21Plus += 100;
      adult21PlusCount++;
    } else if (category.fee === 50) {
      collegeStudents += 50;
      collegeStudentCount++;
    }
  }

  return {
    householdBase,
    adult21Plus,
    collegeStudents,
    total: householdBase + adult21Plus + collegeStudents,
    adult21PlusCount,
    collegeStudentCount,
  };
};

export const serializeMembersForDB = (members: HouseholdMember[]): string => {
  return members
    .map((m) => {
      const age = m.dob ? calculateAge(m.dob) : "N/A";
      const rel = m.relationship === "other" ? m.otherRelationship : m.relationship;
      const dobStr = m.dob
        ? `${m.dob.getMonth() + 1}/${m.dob.getDate()}/${m.dob.getFullYear()}`
        : "N/A";
      const college = m.isCollegeStudent ? "Yes" : "No";
      return `${m.fullName} | ${rel} | DOB: ${dobStr} | Age: ${age} | College: ${college}`;
    })
    .join("\n");
};

export const serializeMembersForEmail = (
  members: HouseholdMember[],
  fileUrlMap: Record<string, string[]>
): Array<{
  name: string;
  relationship: string;
  dob: string;
  age: number | string;
  isCollegeStudent: boolean;
  feeCategory: string;
  fee: number;
  fileUrls: string[];
}> => {
  return members.map((m) => {
    const age = m.dob ? calculateAge(m.dob) : "N/A";
    const rel = m.relationship === "other" ? m.otherRelationship : m.relationship;
    const dobStr = m.dob
      ? `${m.dob.getMonth() + 1}/${m.dob.getDate()}/${m.dob.getFullYear()}`
      : "N/A";
    const category =
      typeof age === "number"
        ? getFeeCategory(age, m.isCollegeStudent)
        : { labelEn: "N/A", fee: 0 };

    return {
      name: m.fullName,
      relationship: rel,
      dob: dobStr,
      age,
      isCollegeStudent: m.isCollegeStudent,
      feeCategory: category.labelEn,
      fee: category.fee,
      fileUrls: fileUrlMap[m.id] || [],
    };
  });
};
