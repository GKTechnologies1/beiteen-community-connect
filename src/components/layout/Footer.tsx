import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle, Mail, MapPin } from "lucide-react";
import logo from "@/assets/beiteen-logo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Beiteen Association Logo"
                className="h-12 w-12 rounded-full object-cover border-2 border-primary/30"
              />
              <div>
                <p className="font-heading text-lg font-semibold">Beiteen Association</p>
                <p className="text-xs text-primary-foreground/70">U.S.A.</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              A 501(c)(3) nonprofit organization committed to charitable, cultural, educational, and social advancement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Mission", href: "/mission" },
                { name: "Board", href: "/board" },
                { name: "Bylaws", href: "/bylaws" },
                { name: "Gallery", href: "/gallery" },
                { name: "Membership", href: "/membership" },
                { name: "Donate", href: "/donations" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
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
            <h3 className="font-heading text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-3">
              <a
                href="mailto:beiteenassociation.STL@gmail.com"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                beiteenassociation.STL@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4" />
                St. Louis, Missouri
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 mt-6">
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
            © {currentYear} Beiteen Association U.S.A. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/40 mt-1">
            A non-profit, non-political, and non-sectarian organization
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
