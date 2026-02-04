import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface DOBPickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  error?: boolean;
  minYear?: number;
  maxYear?: number;
}

const months = [
  { value: "0", en: "January", ar: "يناير" },
  { value: "1", en: "February", ar: "فبراير" },
  { value: "2", en: "March", ar: "مارس" },
  { value: "3", en: "April", ar: "أبريل" },
  { value: "4", en: "May", ar: "مايو" },
  { value: "5", en: "June", ar: "يونيو" },
  { value: "6", en: "July", ar: "يوليو" },
  { value: "7", en: "August", ar: "أغسطس" },
  { value: "8", en: "September", ar: "سبتمبر" },
  { value: "9", en: "October", ar: "أكتوبر" },
  { value: "10", en: "November", ar: "نوفمبر" },
  { value: "11", en: "December", ar: "ديسمبر" },
];

export const DOBPicker = ({
  value,
  onChange,
  error = false,
  minYear = 1920,
  maxYear = new Date().getFullYear(),
}: DOBPickerProps) => {
  const { language, isRTL } = useLanguage();

  const selectedMonth = value ? value.getMonth().toString() : "";
  const selectedDay = value ? value.getDate().toString() : "";
  const selectedYear = value ? value.getFullYear().toString() : "";

  // Generate years array (descending order for easy scrolling to older years)
  const years = useMemo(() => {
    const yearsArr: string[] = [];
    for (let y = maxYear; y >= minYear; y--) {
      yearsArr.push(y.toString());
    }
    return yearsArr;
  }, [minYear, maxYear]);

  // Generate days based on selected month and year
  const days = useMemo(() => {
    const daysArr: string[] = [];
    let maxDays = 31;

    if (selectedMonth && selectedYear) {
      const month = parseInt(selectedMonth);
      const year = parseInt(selectedYear);
      maxDays = new Date(year, month + 1, 0).getDate();
    } else if (selectedMonth) {
      // Default to common month lengths if year not selected
      const month = parseInt(selectedMonth);
      if (month === 1) maxDays = 29; // Feb
      else if ([3, 5, 8, 10].includes(month)) maxDays = 30;
    }

    for (let d = 1; d <= maxDays; d++) {
      daysArr.push(d.toString());
    }
    return daysArr;
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (month: string) => {
    if (selectedYear && selectedDay) {
      const maxDays = new Date(parseInt(selectedYear), parseInt(month) + 1, 0).getDate();
      const day = Math.min(parseInt(selectedDay), maxDays);
      onChange(new Date(parseInt(selectedYear), parseInt(month), day));
    } else if (selectedYear) {
      onChange(new Date(parseInt(selectedYear), parseInt(month), 1));
    } else {
      // Store partial date in a temporary way
      const tempYear = 2000;
      onChange(new Date(tempYear, parseInt(month), parseInt(selectedDay) || 1));
    }
  };

  const handleDayChange = (day: string) => {
    if (selectedYear && selectedMonth) {
      onChange(new Date(parseInt(selectedYear), parseInt(selectedMonth), parseInt(day)));
    } else if (selectedMonth) {
      const tempYear = 2000;
      onChange(new Date(tempYear, parseInt(selectedMonth), parseInt(day)));
    }
  };

  const handleYearChange = (year: string) => {
    if (selectedMonth) {
      const maxDays = new Date(parseInt(year), parseInt(selectedMonth) + 1, 0).getDate();
      const day = selectedDay ? Math.min(parseInt(selectedDay), maxDays) : 1;
      onChange(new Date(parseInt(year), parseInt(selectedMonth), day));
    } else {
      onChange(new Date(parseInt(year), 0, parseInt(selectedDay) || 1));
    }
  };

  const errorClass = error ? "border-destructive" : "";
  const baseSelectClass = "focus:ring-0 focus:ring-offset-0 touch-manipulation";

  return (
    <div className={`grid grid-cols-3 gap-2 ${isRTL ? "direction-rtl" : ""}`}>
      {/* Month */}
      <Select value={selectedMonth} onValueChange={handleMonthChange}>
        <SelectTrigger className={`${errorClass} ${baseSelectClass}`}>
          <SelectValue placeholder={language === "ar" ? "الشهر" : "Month"} />
        </SelectTrigger>
        <SelectContent 
          className="bg-background z-50 max-h-[280px] overflow-y-auto"
          position="popper"
          sideOffset={4}
        >
          {months.map((month) => (
            <SelectItem 
              key={month.value} 
              value={month.value}
              className="cursor-pointer py-2.5"
            >
              {language === "ar" ? month.ar : month.en}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Day */}
      <Select value={selectedDay} onValueChange={handleDayChange}>
        <SelectTrigger className={`${errorClass} ${baseSelectClass}`}>
          <SelectValue placeholder={language === "ar" ? "اليوم" : "Day"} />
        </SelectTrigger>
        <SelectContent 
          className="bg-background z-50 max-h-[280px] overflow-y-auto"
          position="popper"
          sideOffset={4}
        >
          {days.map((day) => (
            <SelectItem 
              key={day} 
              value={day}
              className="cursor-pointer py-2.5"
            >
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year - Most important for DOB, easy to scroll to older years */}
      <Select value={selectedYear} onValueChange={handleYearChange}>
        <SelectTrigger className={`${errorClass} ${baseSelectClass}`}>
          <SelectValue placeholder={language === "ar" ? "السنة" : "Year"} />
        </SelectTrigger>
        <SelectContent 
          className="bg-background z-50 max-h-[280px] overflow-y-auto"
          position="popper"
          sideOffset={4}
        >
          {years.map((year) => (
            <SelectItem 
              key={year} 
              value={year}
              className="cursor-pointer py-2.5"
            >
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DOBPicker;
