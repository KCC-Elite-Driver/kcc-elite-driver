import { useTranslation } from "@/i18n/LanguageContext";
import PageMeta from "@/components/PageMeta";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const CancellationPolicy = () => {
  const { t } = useTranslation();

  const categories = [
    { title: t.cancellation_standard_title, content: t.cancellation_standard },
    { title: t.cancellation_meetgreet_title, content: t.cancellation_meetgreet },
    { title: t.cancellation_vip_title, content: t.cancellation_vip },
  ];

  return (
    <>
      <PageMeta title={`${t.cancellation_title} — KCC-EliteDriver`} description={t.cancellation_standard} path="/cancellation-policy" />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-10">{t.cancellation_title}</h1>

          <div className="space-y-8">
            {categories.map((cat, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  {i === 0 && <CheckCircle size={20} className="text-green-500" />}
                  {i === 1 && <AlertTriangle size={20} className="text-yellow-500" />}
                  {i === 2 && <XCircle size={20} className="text-red-500" />}
                  <h2 className="font-serif text-lg font-semibold text-foreground">{cat.title}</h2>
                </div>
                <p className="text-muted-foreground font-sans leading-relaxed">{cat.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-3">{t.cancellation_how_title}</h2>
              <p className="text-muted-foreground font-sans leading-relaxed">{t.cancellation_how}</p>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-3">{t.cancellation_refund_title}</h2>
              <p className="text-muted-foreground font-sans leading-relaxed">{t.cancellation_refund}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CancellationPolicy;
