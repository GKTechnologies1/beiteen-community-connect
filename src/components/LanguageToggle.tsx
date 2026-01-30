import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 text-sm font-medium hover:bg-muted"
      aria-label={`Switch to ${language === "en" ? "Arabic" : "English"}`}
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">{language === "en" ? "العربية" : "English"}</span>
      <span className="sm:hidden">{language === "en" ? "AR" : "EN"}</span>
    </Button>
  );
};

export default LanguageToggle;
