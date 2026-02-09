import { useRef } from "react";
import { X, Upload, UserPlus, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DOBPicker } from "@/components/DOBPicker";
import { HouseholdMember, RELATIONSHIPS } from "./types";
import { calculateAge, getFeeCategory } from "./utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES_PER_MEMBER = 5;

interface HouseholdMemberRowProps {
  member: HouseholdMember;
  index: number;
  onChange: (id: string, updates: Partial<HouseholdMember>) => void;
  onRemove: (id: string) => void;
  errors: Record<string, string>;
  canRemove: boolean;
}

export const HouseholdMemberRow = ({
  member,
  index,
  onChange,
  onRemove,
  errors,
  canRemove,
}: HouseholdMemberRowProps) => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const age = member.dob ? calculateAge(member.dob) : null;
  const isSpouse = member.relationship === "husband_wife";
  const showCollegeToggle = age !== null && age >= 18 && age <= 20 && !isSpouse;
  const feeCategory = age !== null ? getFeeCategory(age, member.isCollegeStudent, member.relationship) : null;

  const errorPrefix = `member_${member.id}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (member.collegeFiles.length + selectedFiles.length > MAX_FILES_PER_MEMBER) {
      toast({
        title: language === "ar" ? "عدد كبير من الملفات" : "Too many files",
        description:
          language === "ar"
            ? `الحد الأقصى ${MAX_FILES_PER_MEMBER} ملفات لكل فرد.`
            : `Maximum ${MAX_FILES_PER_MEMBER} files per member.`,
        variant: "destructive",
      });
      return;
    }

    const validFiles = selectedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: language === "ar" ? "الملف كبير جداً" : "File too large",
          description: `${file.name} ${language === "ar" ? "يتجاوز حد 10 ميجابايت." : "exceeds the 10MB limit."}`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    onChange(member.id, { collegeFiles: [...member.collegeFiles, ...validFiles] });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (fileIndex: number) => {
    onChange(member.id, {
      collegeFiles: member.collegeFiles.filter((_, i) => i !== fileIndex),
    });
  };

  return (
    <div className="relative p-5 rounded-xl border border-border bg-muted/30 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {language === "ar" ? `فرد العائلة ${index + 1}` : `Family Member ${index + 1}`}
          </span>
        </div>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(member.id)}
            className="text-destructive hover:text-destructive/80 h-8 px-2"
          >
            <X className="h-4 w-4" />
            <span className="text-xs ml-1">{language === "ar" ? "إزالة" : "Remove"}</span>
          </Button>
        )}
      </div>

      {/* Full Name + Relationship */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm">
            {language === "ar" ? "الاسم الكامل" : "Full Name"} *
          </Label>
          <Input
            value={member.fullName}
            onChange={(e) => onChange(member.id, { fullName: e.target.value })}
            placeholder={language === "ar" ? "الاسم الكامل" : "Full name"}
            className={errors[`${errorPrefix}_fullName`] ? "border-destructive" : ""}
          />
          {errors[`${errorPrefix}_fullName`] && (
            <p className="text-xs text-destructive">{errors[`${errorPrefix}_fullName`]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm">
            {language === "ar" ? "صلة القرابة" : "Relationship"} *
          </Label>
          <Select
            value={member.relationship}
            onValueChange={(val) => {
              const updates: Partial<HouseholdMember> = { relationship: val };
              if (val !== "other") updates.otherRelationship = "";
              // If spouse selected, reset college student status since spouse is always included
              if (val === "husband_wife") {
                updates.isCollegeStudent = false;
                updates.collegeFiles = [];
              }
              onChange(member.id, updates);
            }}
          >
            <SelectTrigger
              className={`${errors[`${errorPrefix}_relationship`] ? "border-destructive" : ""} touch-manipulation`}
            >
              <SelectValue
                placeholder={language === "ar" ? "اختر صلة القرابة" : "Select relationship"}
              />
            </SelectTrigger>
            <SelectContent className="bg-background z-50 max-h-[280px] overflow-y-auto" position="popper" sideOffset={4}>
              {RELATIONSHIPS.map((rel) => (
                <SelectItem key={rel.value} value={rel.value} className="cursor-pointer py-2.5">
                  {language === "ar" ? rel.ar : rel.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors[`${errorPrefix}_relationship`] && (
            <p className="text-xs text-destructive">{errors[`${errorPrefix}_relationship`]}</p>
          )}
        </div>
      </div>

      {/* Other relationship text input */}
      {member.relationship === "other" && (
        <div className="space-y-1.5">
          <Label className="text-sm">
            {language === "ar" ? "حدد صلة القرابة" : "Specify relationship"} *
          </Label>
          <Input
            value={member.otherRelationship}
            onChange={(e) => onChange(member.id, { otherRelationship: e.target.value })}
            placeholder={language === "ar" ? "حدد صلة القرابة" : "Specify relationship"}
            className={errors[`${errorPrefix}_otherRelationship`] ? "border-destructive" : ""}
          />
          {errors[`${errorPrefix}_otherRelationship`] && (
            <p className="text-xs text-destructive">
              {errors[`${errorPrefix}_otherRelationship`]}
            </p>
          )}
        </div>
      )}

      {/* DOB + Age + Fee Category */}
      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <div className="space-y-1.5 sm:col-span-2">
          <Label className="text-sm">
            {language === "ar" ? "تاريخ الميلاد" : "Date of Birth"} *
          </Label>
          <DOBPicker
            value={member.dob}
            onChange={(date) => {
              const updates: Partial<HouseholdMember> = { dob: date };
              // Reset college student if age changes outside 18-20
              if (date) {
                const newAge = calculateAge(date);
                if (newAge < 18 || newAge > 20) {
                  updates.isCollegeStudent = false;
                  updates.collegeFiles = [];
                }
              }
              onChange(member.id, updates);
            }}
            error={!!errors[`${errorPrefix}_dob`]}
            minYear={1920}
            maxYear={new Date().getFullYear()}
          />
          {errors[`${errorPrefix}_dob`] && (
            <p className="text-xs text-destructive">{errors[`${errorPrefix}_dob`]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">
            {language === "ar" ? "العمر" : "Age"}
          </Label>
          <div className="h-10 flex items-center px-3 rounded-md border border-input bg-muted/50 text-sm">
            {age !== null ? (
              <span className="font-medium">{age}</span>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </div>
        </div>
      </div>

      {/* Fee Category Display */}
      {feeCategory && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">
            {language === "ar" ? "فئة الرسوم:" : "Fee category:"}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              feeCategory.fee > 0
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {language === "ar" ? feeCategory.labelAr : feeCategory.labelEn}
          </span>
        </div>
      )}

      {/* College Student Toggle */}
      {showCollegeToggle && (
        <div className="p-4 rounded-lg bg-accent/20 border border-accent/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium cursor-pointer">
                {language === "ar" ? "طالب جامعي؟" : "College Student?"}
              </Label>
            </div>
            <Switch
              checked={member.isCollegeStudent}
              onCheckedChange={(checked) => {
                onChange(member.id, {
                  isCollegeStudent: checked,
                  collegeFiles: checked ? member.collegeFiles : [],
                });
              }}
            />
          </div>

          {/* College ID Upload */}
          {member.isCollegeStudent && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                {language === "ar"
                  ? "يرجى تحميل هوية طالب صالحة للحصول على سعر الطالب ($50 بدلاً من $100)."
                  : "Please upload a valid student ID to qualify for the student rate ($50 instead of $100)."}
              </p>

              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center bg-background">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id={`college-id-${member.id}`}
                />
                <label
                  htmlFor={`college-id-${member.id}`}
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">
                    {language === "ar" ? "انقر لتحميل هوية الكلية" : "Click to upload college ID"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {language === "ar"
                      ? "الحد الأقصى 5 ملفات، 10 ميجابايت لكل ملف"
                      : "Max 5 files, 10MB each • Images or PDF"}
                  </span>
                </label>
              </div>

              {member.collegeFiles.length > 0 && (
                <ul className="space-y-1.5">
                  {member.collegeFiles.map((file, fi) => (
                    <li
                      key={fi}
                      className="flex items-center justify-between bg-muted px-3 py-2 rounded-lg text-xs"
                    >
                      <span className="truncate font-medium">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(fi)}
                        className="text-destructive hover:text-destructive/80 ml-2 p-0.5"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {errors[`${errorPrefix}_collegeFiles`] && (
                <p className="text-xs text-destructive">
                  {errors[`${errorPrefix}_collegeFiles`]}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
