import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import JsonLd from "./JsonLd";

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
            email: "contact@kcc-elitedriver.com",
            contactType: "customer service",
          },
        }}
      />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
