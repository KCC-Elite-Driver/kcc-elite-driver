import { useTranslation } from "@/i18n/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { ShieldCheck, Clock, Languages } from "lucide-react";

const ValuesSection = () => {
  const { t } = useTranslation();

  const values = [
    { icon: ShieldCheck, title: t.values_discretion, desc: t.values_discretion_desc },
    { icon: Clock, title: t.values_punctuality, desc: t.values_punctuality_desc },
    { icon: Languages, title: t.values_multilingual, desc: t.values_multilingual_desc },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.values_title}
            </h2>
            <p className="font-sans text-muted-foreground text-base max-w-xl mx-auto">
              {t.values_subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} variant="fade-up" delay={i * 0.15}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {value.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
