import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import logo from "@/assets/kcc-logo.webp?format=webp&w=160";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="KCC-EliteDriver" className="h-32 w-auto object-contain aspect-square" loading="lazy" decoding="async" width={160} height={160} />
            </Link>
            <p className="text-muted-foreground text-sm font-sans leading-relaxed mb-2">
              {t.footer_tagline}
            </p>
            <p className="text-muted-foreground text-xs font-sans leading-relaxed">
              {t.footer_description}
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
                <Link to="/booking" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  {t.nav_booking}
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
              <li>
                <Link to="/services#airport" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  {t.footer_service_airport}
                </Link>
              </li>
              <li>
                <Link to="/services#hourly" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  {t.footer_service_hourly}
                </Link>
              </li>
              <li>
                <Link to="/services#event" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  {t.footer_service_event}
                </Link>
              </li>
              <li>
                <Link to="/services#intercity" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  {t.footer_service_city}
                </Link>
              </li>
              <li>
                <Link to="/services#cultural" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  {t.footer_service_cultural}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              {t.footer_contact_title}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary flex-shrink-0" />
                <a
                  href="mailto:contact@kcc-elitedriver.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
                >
                  contact@kcc-elitedriver.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary flex-shrink-0" />
                <a
                  href="tel:+33123456789"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={14} className="text-primary flex-shrink-0" />
                <a
                  href="https://wa.me/33123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
                >
                  {t.footer_whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground font-sans">
                  {t.footer_address}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground font-sans">
                  {t.footer_hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal links + copyright */}
        <div className="border-t border-border pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground font-sans">
              © {new Date().getFullYear()} KCC-EliteDriver. {t.footer_rights}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors font-sans">
                {t.footer_privacy_link}
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors font-sans">
                {t.footer_terms_link}
              </Link>
              <Link to="/cancellation-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors font-sans">
                {t.footer_cancellation_link}
              </Link>
              <Link to="/legal" className="text-xs text-muted-foreground hover:text-primary transition-colors font-sans">
                {t.footer_legal_link}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
