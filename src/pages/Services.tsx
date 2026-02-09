import { useTranslation } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { Plane, Clock, Star, Route, Check, ArrowRight } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import JsonLd from "@/components/JsonLd";

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  index: number;
  ctaLabel: string;
}

const ServiceCard = ({ icon: Icon, title, description, features, index, ctaLabel }: ServiceCardProps) => (
  <ScrollReveal variant="fade-up" delay={index * 0.15}>
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300">
      <div className="p-8">
        <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon size={24} className="text-primary" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">{title}</h3>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check size={16} className="text-primary mt-0.5 shrink-0" />
              <span className="font-sans text-sm text-secondary-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          to="/booking"
          className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200"
        >
          {ctaLabel}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  </ScrollReveal>
);

const Services = () => {
  const { t } = useTranslation();

  const services = [
    { icon: Plane, title: t.services_airport_title, description: t.services_airport_desc, features: t.services_airport_features },
    { icon: Clock, title: t.services_hourly_title, description: t.services_hourly_desc, features: t.services_hourly_features },
    { icon: Star, title: t.services_event_title, description: t.services_event_desc, features: t.services_event_features },
    { icon: Route, title: t.services_city_title, description: t.services_city_desc, features: t.services_city_features },
  ];

  return (
    <div className="pt-16">
      <PageMeta
        title="Nos Services — KCC-EliteDriver"
        description="Transferts aéroport, mise à disposition, événements VIP et intercités. Services de chauffeur privé sur mesure."
        path="/services"
      />
      <JsonLd
        data={{
          "@type": "Service",
          provider: { "@type": "Organization", name: "KCC-EliteDriver" },
          serviceType: "Chauffeur privé",
          areaServed: ["Paris", "Cairo"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services de transport",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Transfert Aéroport" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mise à disposition" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Événements VIP" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Intercités" } },
            ],
          },
        }}
      />
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <ScrollReveal variant="fade-in">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.services_title}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="font-sans text-muted-foreground text-base max-w-2xl mx-auto">
              {t.services_subtitle}
            </p>
          </ScrollReveal>
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
