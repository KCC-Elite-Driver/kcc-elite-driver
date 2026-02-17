import HeroSection from "@/components/home/HeroSection";
import GlobalAxis from "@/components/home/GlobalAxis";
import FleetPreview from "@/components/home/FleetPreview";
import ValuesSection from "@/components/home/ValuesSection";
import PageMeta from "@/components/PageMeta";
import JsonLd from "@/components/JsonLd";

const Index = () => {
  return (
    <>
      <PageMeta
        title="KCC-EliteDriver — Chauffeur Privé de Luxe Cairo & Paris"
        description="Réservez votre chauffeur privé haut de gamme au Caire et à Paris. Transferts aéroport, mise à disposition horaire, événements VIP. Service 24h/24, flotte premium."
        path="/"
      />
      <JsonLd
        data={{
          "@type": "LocalBusiness",
          name: "KCC-EliteDriver",
          telephone: "+33123456789",
          email: "contact@kcc-elitedriver.com",
          url: "https://kcc-elitedriver.com",
          description: "Service de chauffeur privé haut de gamme au Caire et à Paris",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Paris",
            addressCountry: "FR",
          },
          areaServed: ["Paris", "Cairo"],
        }}
      />
      <HeroSection />
      <GlobalAxis />
      <FleetPreview />
      <ValuesSection />
    </>
  );
};

export default Index;
