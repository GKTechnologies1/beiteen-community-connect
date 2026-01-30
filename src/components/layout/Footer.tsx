import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/beiteen-logo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, isRTL } = useLanguage();

  const quickLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.mission"), href: "/mission" },
    { name: t("nav.board"), href: "/board" },
    { name: t("nav.bylaws"), href: "/bylaws" },
    { name: t("nav.gallery"), href: "/gallery" },
    { name: t("nav.membership"), href: "/membership" },
    { name: t("nav.donate"), href: "/donations" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <img
                src={logo}
                alt="Beiteen Association Logo"
                className="h-12 w-12 rounded-full object-cover border-2 border-primary/30"
              />
              <div className={isRTL ? 'text-right' : ''}>
                <p className="font-heading text-lg font-semibold">Beiteen Association</p>
                <p className="text-xs text-primary-foreground/70">U.S.A.</p>
              </div>
            </div>
            <p className={`text-sm text-primary-foreground/80 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links - 2x4 Grid */}
          <div>
            <h3 className={`font-heading text-lg font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t("footer.quickLinks")}
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.href} className={isRTL ? 'text-right' : ''}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className={`font-heading text-lg font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t("footer.connect")}
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:beiteenassociation.STL@gmail.com"
                className={`flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
              >
                <Mail className="h-4 w-4" />
                beiteenassociation.STL@gmail.com
              </a>
              <div className={`flex items-center gap-2 text-sm text-primary-foreground/70 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <MapPin className="h-4 w-4" />
                St. Louis, Missouri
              </div>
            </div>

            {/* Social Media */}
            <div className={`flex gap-4 mt-6 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} Beiteen Association U.S.A. {t("footer.rights")}
          </p>
          <p className="text-xs text-primary-foreground/40 mt-1">
            {t("footer.nonprofit")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
