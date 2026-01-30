import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SocialLinksProps {
  className?: string;
  iconSize?: "sm" | "md" | "lg";
  variant?: "default" | "primary";
}

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/share/1CFWHPMtoJ/",
  instagram: "https://www.instagram.com/beiteenassociation_stl_?igsh=MTZnYzNldWVmbjA5aQ==",
  whatsapp: "https://chat.whatsapp.com/H2eBYlivUw32PnZivmvlse?mode=gi_t",
};

export const SocialLinks = ({
  className = "",
  iconSize = "md",
  variant = "default",
}: SocialLinksProps) => {
  const { isRTL } = useLanguage();

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const containerClasses = {
    default: "p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-foreground",
    primary: "p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary",
  };

  return (
    <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""} ${className}`}>
      <a
        href={SOCIAL_LINKS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={containerClasses[variant]}
        aria-label="Facebook"
      >
        <Facebook className={sizeClasses[iconSize]} />
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={containerClasses[variant]}
        aria-label="Instagram"
      >
        <Instagram className={sizeClasses[iconSize]} />
      </a>
      <a
        href={SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={containerClasses[variant]}
        aria-label="WhatsApp"
      >
        <MessageCircle className={sizeClasses[iconSize]} />
      </a>
    </div>
  );
};

export default SocialLinks;
