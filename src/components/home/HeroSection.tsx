import { useTranslation } from "@/i18n/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import BookingWidget from "./BookingWidget";
import heroImage from "@/assets/hero-chauffeur-paris.jpg";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury chauffeur service in Paris"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20 text-center">
        {/* Badge */}
        <ScrollReveal variant="fade-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-sans font-medium text-primary uppercase tracking-wider">
              Cairo • Paris • International
            </span>
          </div>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {t.hero_title}
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal variant="fade-up" delay={0.2}>
          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.hero_subtitle}
          </p>
        </ScrollReveal>

        {/* Booking Widget */}
        <ScrollReveal variant="fade-up" delay={0.4}>
          <BookingWidget />
        </ScrollReveal>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
