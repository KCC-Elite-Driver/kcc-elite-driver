import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./Header";

const Footer = lazy(() => import("./Footer"));
import JsonLd from "./JsonLd";

const WhatsAppFloatingButton = lazy(() => import("./WhatsAppFloatingButton"));

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd
        data={{
          "@type": "Organization",
          name: "KCC-EliteDriver",
          url: "https://kcc-elitedriver.com",
          description: "Service de chauffeur privé haut de gamme au Caire et à Paris",
          areaServed: ["Paris", "Cairo"],
          serviceType: "Chauffeur Service",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+33123456789",
            email: "contact@kccelitedriver.com",
            contactType: "customer service",
          },
        }}
      />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Suspense fallback={<div className="min-h-[200px] bg-background" />}>
        <Footer />
        <WhatsAppFloatingButton />
      </Suspense>
    </div>
  );
};

export default Layout;
