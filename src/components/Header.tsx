import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/kcc-logo.webp";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const serviceItems = [
    { label: t.services_dropdown_airport, anchor: "#airport" },
    { label: t.services_dropdown_hourly, anchor: "#hourly" },
    { label: t.services_dropdown_event, anchor: "#event" },
    { label: t.services_dropdown_city, anchor: "#intercity" },
    { label: t.services_dropdown_cultural, anchor: "#cultural" },
  ];

  const navLinks = [
    { label: t.nav_home, path: "/" },
    { label: t.nav_fleet, path: "/fleet" },
    { label: t.nav_services, path: "/services", dropdown: true },
    { label: t.nav_about, path: "/about" },
    { label: t.nav_booking, path: "/booking" },
    { label: t.nav_contact, path: "/contact" },
  ];

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 200);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt={t.hero_title} className="h-20 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.path}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={link.path}
                    className={`text-sm font-sans font-medium transition-colors duration-200 flex items-center gap-1 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                  </Link>
                  {servicesOpen && (
                    <div className="absolute top-full start-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl z-50 py-2 animate-fade-in">
                      {serviceItems.map((item) => (
                        <Link
                          key={item.anchor + item.label}
                          to={`/services${item.anchor}`}
                          onClick={() => setServicesOpen(false)}
                          className="block px-4 py-2.5 text-sm font-sans text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-border my-1" />
                      <Link
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="block px-4 py-2.5 text-sm font-sans font-semibold text-primary hover:bg-secondary transition-colors duration-150"
                      >
                        {t.services_dropdown_view_all}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
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
              )
            )}
          </nav>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-6">
            <LanguageSwitcher />
            <Link
              to="/booking"
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
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.path}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`text-lg font-sans font-medium transition-colors duration-200 flex items-center gap-2 w-full ${
                        location.pathname === link.path
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="mt-2 ms-4 flex flex-col gap-3">
                        {serviceItems.map((item) => (
                          <Link
                            key={item.anchor + item.label}
                            to={`/services${item.anchor}`}
                            onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                            className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                        <div className="border-t border-border my-1" />
                        <Link
                          to="/services"
                          onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                          className="text-sm font-sans font-semibold text-primary hover:text-foreground transition-colors"
                        >
                          {t.services_dropdown_view_all}
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
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
                )
              )}
              <div className="pt-4 border-t border-border">
                <LanguageSwitcher />
              </div>
              <Link
                to="/booking"
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
