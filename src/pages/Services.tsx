import { useTranslation } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { Plane, Clock, Star, Route, Check, ArrowRight, UserCheck, MapPin, Timer, ShieldCheck, Globe, Award, AlertCircle } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import JsonLd from "@/components/JsonLd";
import cairoPyramidsNight from "@/assets/cairo-pyramids-night.jpg";

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  index: number;
  ctaLabel?: string;
  extra?: string;
}

const ServiceCard = ({ icon: Icon, title, description, features, index, ctaLabel, extra }: ServiceCardProps) => (
  <ScrollReveal variant="fade-up" delay={index * 0.15}>
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 h-full">
      <div className="p-8">
        <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon size={24} className="text-primary" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">{title}</h3>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>
        {extra && (
          <p className="font-sans text-xs text-primary mb-6 font-medium">{extra}</p>
        )}
        <ul className="space-y-3 mb-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check size={16} className="text-primary mt-0.5 shrink-0" />
              <span className="font-sans text-sm text-secondary-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        {ctaLabel && (
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200"
          >
            {ctaLabel}
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  </ScrollReveal>
);

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  extra?: string;
  summaryLines?: string[];
  index: number;
}

const InfoCard = ({ icon: Icon, title, description, extra, summaryLines, index }: InfoCardProps) => (
  <ScrollReveal variant="fade-up" delay={index * 0.15}>
    <div className="group bg-card border border-border rounded-lg p-8 hover:border-primary/30 transition-all duration-300 h-full">
      <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon size={24} className="text-primary" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="font-sans text-sm text-muted-foreground leading-relaxed">{description}</p>
      {extra && (
        <p className="font-sans text-xs text-primary mt-4 font-medium">{extra}</p>
      )}
      {summaryLines && summaryLines.length > 0 && (
        <div className="mt-4 space-y-1">
          {summaryLines.map((line) => (
            <p key={line} className="font-sans text-xs text-secondary-foreground">{line}</p>
          ))}
        </div>
      )}
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

  const additionalServices = [
    { icon: UserCheck, title: t.services_meetgreet_title, description: t.services_meetgreet_desc, features: t.services_meetgreet_features },
    { icon: Timer, title: t.services_standby_title, description: t.services_standby_desc, features: t.services_standby_features, extra: t.services_standby_format, ctaLabel: t.services_cta },
    { icon: MapPin, title: t.services_cultural_title, description: t.services_cultural_desc, extra: t.services_cultural_pricing },
    { icon: AlertCircle, title: t.services_cancellation_title, description: t.services_cancellation_desc, summaryLines: [t.services_cancellation_standard, t.services_cancellation_meetgreet] },
  ];

  const whyUs = [
    { icon: ShieldCheck, title: t.services_why_discretion, desc: t.services_why_discretion_desc },
    { icon: Globe, title: t.services_why_expertise, desc: t.services_why_expertise_desc },
    { icon: Award, title: t.services_why_excellence, desc: t.services_why_excellence_desc },
  ];

  const airports = [t.services_airports_cai, t.services_airports_cdg, t.services_airports_ory];

  return (
    <div className="pt-16">
      <PageMeta
        title="Services Chauffeur Privé — KCC-EliteDriver"
        description="Transferts aéroport CDG, Orly & Le Caire, mise à disposition horaire, événements VIP, intercités. Chauffeur privé sur mesure au Caire et à Paris."
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

      {/* Hero with Cairo Pyramids image */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cairoPyramidsNight}
            alt="Luxury chauffeur service at the Pyramids of Giza"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
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

      {/* Main services grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} ctaLabel={t.services_cta} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional services */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((s, i) => {
              if ('features' in s && s.features) {
                return (
                  <ServiceCard
                    key={s.title}
                    icon={s.icon}
                    title={s.title}
                    description={s.description}
                    features={s.features}
                    extra={s.extra}
                    ctaLabel={'ctaLabel' in s ? s.ctaLabel : undefined}
                    index={i}
                  />
                );
              }
              return (
                <InfoCard
                  key={s.title}
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  extra={'extra' in s ? s.extra : undefined}
                  summaryLines={'summaryLines' in s ? s.summaryLines : undefined}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Airport Transfers */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.services_airports_title}
              </h2>
              <p className="font-sans text-muted-foreground text-sm max-w-xl mx-auto">
                {t.services_airports_desc}
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-2xl mx-auto space-y-4">
            {airports.map((airport, i) => (
              <ScrollReveal key={airport} variant="fade-up" delay={i * 0.1}>
                <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors duration-300">
                  <Plane size={20} className="text-primary shrink-0" />
                  <span className="font-sans text-sm text-foreground">{airport}</span>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal variant="fade-up" delay={0.4}>
              <p className="text-center font-sans text-xs text-muted-foreground mt-6">
                {t.services_airports_includes}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why KCC-EliteDriver */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.services_why_title}
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUs.map((item, i) => (
              <ScrollReveal key={item.title} variant="fade-up" delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <item.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
