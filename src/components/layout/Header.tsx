import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/beiteen-logo.jpeg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, isRTL } = useLanguage();

  const navigation = [
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
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className={`section-container flex items-center justify-between py-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Logo */}
        <Link to="/" className={`flex items-center gap-3 group ${isRTL ? 'flex-row-reverse' : ''}`}>
          <img
            src={logo}
            alt="Beiteen Association U.S.A. Logo"
            className="h-14 w-14 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/50 transition-colors"
          />
          <div className="hidden sm:block">
            <p className="font-heading text-lg font-semibold text-foreground">
              Beiteen Association
            </p>
            <p className="text-xs text-muted-foreground">U.S.A.</p>
          </div>
        </Link>

        {/* Desktop Navigation + Language Toggle */}
        <div className={`hidden md:flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className={`${isRTL ? 'mr-2' : 'ml-2'} border-l border-border pl-2`}>
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile menu button + Language Toggle */}
        <div className={`md:hidden flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <LanguageToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="section-container py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${isRTL ? 'text-right' : 'text-left'} ${
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
