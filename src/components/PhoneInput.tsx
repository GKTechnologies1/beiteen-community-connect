import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

/**
 * Formats a raw digit string into US phone display format: (XXX) XXX-XXXX
 */
const formatToDisplay = (digits: string): string => {
  const clean = digits.replace(/\D/g, "");
  // Strip leading "1" for display purposes
  const national = clean.startsWith("1") && clean.length > 10 ? clean.slice(1) : clean;
  
  if (national.length === 0) return "";
  if (national.length <= 3) return `(${national}`;
  if (national.length <= 6) return `(${national.slice(0, 3)}) ${national.slice(3)}`;
  return `(${national.slice(0, 3)}) ${national.slice(3, 6)}-${national.slice(6, 10)}`;
};

/**
 * US phone input with auto-formatting and +1 country code prefix.
 * Stores the raw digit string (without +1) and formats on display.
 */
export const PhoneInput = ({ value, onChange, error, id, name, className }: PhoneInputProps) => {
  const { language } = useLanguage();
  const [displayValue, setDisplayValue] = useState(() => formatToDisplay(value));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // Extract only digits
      let digits = raw.replace(/\D/g, "");
      // Strip leading "1" if user typed it
      if (digits.startsWith("1") && digits.length > 10) {
        digits = digits.slice(1);
      }
      // Cap at 10 digits
      digits = digits.slice(0, 10);
      
      const formatted = formatToDisplay(digits);
      setDisplayValue(formatted);
      onChange(digits);
    },
    [onChange]
  );

  return (
    <div className="flex">
      <div className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground select-none min-w-[52px]">
        🇺🇸 +1
      </div>
      <Input
        id={id}
        name={name}
        type="tel"
        value={displayValue}
        onChange={handleChange}
        placeholder={language === "ar" ? "(555) 123-4567" : "(555) 123-4567"}
        className={`rounded-l-none ${error ? "border-destructive" : ""} ${className || ""}`}
        dir="ltr"
      />
    </div>
  );
};
