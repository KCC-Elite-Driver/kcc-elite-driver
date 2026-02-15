import { useTranslation } from "@/i18n/LanguageContext";
import PageMeta from "@/components/PageMeta";
import { Shield } from "lucide-react";

const Privacy = () => {
  const { t } = useTranslation();

  const sections = [
    { title: "", content: t.privacy_intro },
    { title: t.privacy_data_collected_title, content: t.privacy_data_collected },
    { title: t.privacy_usage_title, content: t.privacy_usage },
    { title: t.privacy_sharing_title, content: t.privacy_sharing },
    { title: t.privacy_rights_title, content: t.privacy_rights },
    { title: t.privacy_security_title, content: t.privacy_security },
    { title: "", content: t.privacy_contact },
  ];

  return (
    <>
      <PageMeta title={`${t.privacy_title} — KCC-EliteDriver`} description={t.privacy_intro} path="/privacy" />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Shield size={28} className="text-primary" />
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{t.privacy_title}</h1>
          </div>
          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i}>
                {section.title && (
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">{section.title}</h2>
                )}
                <p className="text-muted-foreground font-sans leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
