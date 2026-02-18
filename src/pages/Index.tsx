import { lazy, Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import PageMeta from "@/components/PageMeta";
import JsonLd from "@/components/JsonLd";

const GlobalAxis = lazy(() => import("@/components/home/GlobalAxis"));
const FleetPreview = lazy(() => import("@/components/home/FleetPreview"));
const ValuesSection = lazy(() => import("@/components/home/ValuesSection"));

const Index = () => {
  return (
    <>
      <PageMeta
        title="Chauffeur Privé de Luxe Cairo & Paris"
        description="Réservez votre chauffeur privé haut de gamme au Caire et à Paris. Transferts aéroport, mise à disposition horaire, événements VIP. Service 24h/24, flotte premium."
        path="/"
      />
      <JsonLd
        data={{
          "@type": "LocalBusiness",
          name: "KCC-EliteDriver",
          telephone: "+33123456789",
          email: "contact@kccelitedriver.com",
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
      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <GlobalAxis />
        <FleetPreview />
        <ValuesSection />
      </Suspense>
    </>
  );
};

export default Index;
