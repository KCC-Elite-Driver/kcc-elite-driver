import { useTranslation } from "@/i18n/LanguageContext";
import PageMeta from "@/components/PageMeta";
import { Scale } from "lucide-react";

const Legal = () => {
  const { t } = useTranslation();

  const sections = [
    { content: t.legal_company },
    { content: t.legal_hosting },
    { content: t.legal_ip },
  ];

  return (
    <>
      <PageMeta title={`${t.legal_title} — KCC-EliteDriver`} description={t.legal_company} path="/legal" />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Scale size={28} className="text-primary" />
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{t.legal_title}</h1>
          </div>
          <div className="space-y-6">
            {sections.map((section, i) => (
              <div key={i} className="border-l-2 border-primary/20 pl-4">
                <p className="text-muted-foreground font-sans leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Legal;
