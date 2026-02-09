import { useTranslation } from "@/i18n/LanguageContext";
import ContactForm from "@/components/contact/ContactForm";
import DirectContact from "@/components/contact/DirectContact";
import MapPlaceholder from "@/components/contact/MapPlaceholder";
import PageMeta from "@/components/PageMeta";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <PageMeta
        title="Contact — KCC-EliteDriver"
        description="Contactez-nous pour un devis personnalisé. Réponse garantie sous 2 heures."
        path="/contact"
      />
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            {t.contact_title}
          </h1>
          <p className="font-sans text-muted-foreground text-base max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t.contact_subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 md:p-8 opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              <DirectContact />
              <MapPlaceholder />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
