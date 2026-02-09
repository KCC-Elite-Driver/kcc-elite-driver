import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";
import { Mail, Phone } from "lucide-react";
import logo from "@/assets/kcc-logo.webp";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="KCC-EliteDriver" className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm font-sans leading-relaxed">
              {t.footer_tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              {t.footer_navigation}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  {t.nav_home}
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  {t.nav_fleet}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  {t.nav_about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  {t.nav_contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              {t.footer_services_title}
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground font-sans">{t.footer_service_airport}</li>
              <li className="text-sm text-muted-foreground font-sans">{t.footer_service_hourly}</li>
              <li className="text-sm text-muted-foreground font-sans">{t.footer_service_event}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              {t.footer_contact_title}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary" />
                <a
                  href="mailto:contact@kcc-elitedriver.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
                >
                  contact@kcc-elitedriver.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />
                <a
                  href="tel:+33123456789"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground font-sans">
            © {new Date().getFullYear()} KCC-EliteDriver. {t.footer_rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
