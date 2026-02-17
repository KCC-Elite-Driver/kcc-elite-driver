import { useTranslation } from "@/i18n/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Lock, Star, Scale, Lightbulb } from "lucide-react";
import cairoDetailGlove from "@/assets/cairo-detail-glove.jpg?format=webp&w=1920";

const ValuesSection = () => {
  const { t } = useTranslation();

  const values = [
    { icon: Lock, title: t.values_discretion, desc: t.values_discretion_desc },
    { icon: Star, title: t.values_punctuality, desc: t.values_punctuality_desc },
    { icon: Scale, title: t.values_multilingual, desc: t.values_multilingual_desc },
    { icon: Lightbulb, title: t.values_anticipation, desc: t.values_anticipation_desc },
  ];

  return (
    <section className="py-24 bg-background">
      {/* Cinematic banner */}
      <ScrollReveal variant="fade-in">
        <div className="relative h-64 md:h-80 overflow-hidden mb-16">
          <img
            src={cairoDetailGlove}
            alt="White-gloved chauffeur opening car door with Pyramids in background"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width={1920}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      </ScrollReveal>

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} variant="fade-up" delay={i * 0.15}>
              <div className="bg-card border border-border rounded-lg p-6 text-center h-full flex flex-col items-center">
                <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                  <value.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
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
