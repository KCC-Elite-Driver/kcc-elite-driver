import { useTranslation } from "@/i18n/LanguageContext";
import ContactForm from "@/components/contact/ContactForm";
import DirectContact from "@/components/contact/DirectContact";
import MapPlaceholder from "@/components/contact/MapPlaceholder";
import PageMeta from "@/components/PageMeta";
import JsonLd from "@/components/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@/assets/contact-airport-chauffeur.jpg";

const Contact = () => {
  const { t } = useTranslation();

  const faqItems = [
    { q: t.contact_faq_q1, a: t.contact_faq_a1 },
    { q: t.contact_faq_q2, a: t.contact_faq_a2 },
    { q: t.contact_faq_q3, a: t.contact_faq_a3 },
    { q: t.contact_faq_q4, a: t.contact_faq_a4 },
    { q: t.contact_faq_q5, a: t.contact_faq_a5 },
  ];

  return (
    <div className="pt-16">
      <PageMeta
        title="Contact — KCC-EliteDriver | Devis Gratuit 24h/24"
        description="Contactez KCC-EliteDriver pour un devis gratuit. Réponse garantie sous 2h. WhatsApp, téléphone ou formulaire. Chauffeur privé Cairo & Paris."
        path="/contact"
      />
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: faqItems.map(item => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Chauffeur in airport arrivals hall" className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            {t.contact_title}
          </h1>
          <p className="font-sans text-muted-foreground text-base max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t.contact_subtitle}
          </p>
          <p className="font-sans text-sm text-muted-foreground mt-2 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.contact_description}
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

      {/* FAQ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-10 opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
            {t.contact_faq_title}
          </h2>
          <Accordion type="single" collapsible className="opacity-0 animate-fade-in" style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-sans text-sm text-foreground text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Contact;
