import { useTranslation } from "@/i18n/LanguageContext";
import PageMeta from "@/components/PageMeta";
import { FileText } from "lucide-react";

const Terms = () => {
  const { t } = useTranslation();

  const sections = [
    { title: "", content: t.terms_acceptance },
    { title: "", content: t.terms_eligibility },
    { title: "", content: t.terms_booking },
    { title: "", content: t.terms_behaviour },
    { title: "", content: t.terms_liability },
    { title: "", content: t.terms_ip },
    { title: "", content: t.terms_modification },
  ];

  return (
    <>
      <PageMeta title={`${t.terms_title} — KCC-EliteDriver`} description={t.terms_acceptance} path="/terms" />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <FileText size={28} className="text-primary" />
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{t.terms_title}</h1>
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

export default Terms;
