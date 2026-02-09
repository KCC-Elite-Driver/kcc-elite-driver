import { useTranslation } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { Plane, Clock, Star, Route, Check, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  index: number;
  ctaLabel: string;
}

const ServiceCard = ({ icon: Icon, title, description, features, index, ctaLabel }: ServiceCardProps) => (
  <div
    className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 opacity-0 animate-fade-in"
    style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
  >
    <div className="p-8">
      {/* Icon */}
      <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon size={24} className="text-primary" />
      </div>

      {/* Title */}
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">{title}</h3>

      {/* Description */}
      <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={16} className="text-primary mt-0.5 shrink-0" />
            <span className="font-sans text-sm text-secondary-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/booking"
        className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200"
      >
        {ctaLabel}
        <ArrowRight size={14} />
      </Link>
    </div>
  </div>
);

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Plane,
      title: t.services_airport_title,
      description: t.services_airport_desc,
      features: t.services_airport_features,
    },
    {
      icon: Clock,
      title: t.services_hourly_title,
      description: t.services_hourly_desc,
      features: t.services_hourly_features,
    },
    {
      icon: Star,
      title: t.services_event_title,
      description: t.services_event_desc,
      features: t.services_event_features,
    },
    {
      icon: Route,
      title: t.services_city_title,
      description: t.services_city_desc,
      features: t.services_city_features,
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            {t.services_title}
          </h1>
          <p
            className="font-sans text-muted-foreground text-base max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {t.services_subtitle}
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} ctaLabel={t.services_cta} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
