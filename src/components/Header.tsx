import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav_home, path: "/" },
    { label: t.nav_fleet, path: "/fleet" },
    { label: t.nav_services, path: "/services" },
    { label: t.nav_booking, path: "/booking" },
    { label: t.nav_contact, path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold tracking-wide text-foreground">
              KCC<span className="text-primary">-</span>EliteDriver
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-sans font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-6">
            <LanguageSwitcher />
            <Link
              to="/contact"
              className="gradient-gold text-primary-foreground font-sans text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition-opacity duration-200"
            >
              {t.nav_reserve}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-card border-l border-border animate-slide-in-right">
            <div className="flex flex-col pt-20 px-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg font-sans font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <LanguageSwitcher />
              </div>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="gradient-gold text-primary-foreground font-sans text-sm font-semibold px-5 py-3 rounded-md text-center hover:opacity-90 transition-opacity duration-200"
              >
                {t.nav_reserve}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
