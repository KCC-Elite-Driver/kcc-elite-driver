import { lazy, Suspense } from "react";
import { useTranslation } from "@/i18n/LanguageContext";
import heroImage from "@/assets/hero-chauffeur-paris.jpg?format=webp&w=1920&q=75";
import heroImageMobile from "@/assets/hero-chauffeur-paris.jpg?format=webp&w=600&q=70";

const LazyBookingWidget = lazy(() => import("./BookingWidget"));

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background image — no animation wrapper to avoid layout reflow */}
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 640px)" srcSet={heroImageMobile} type="image/webp" />
          <img
            src={heroImage}
            alt="Luxury chauffeur service in Paris"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            width={1920}
            height={1080}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-sans font-medium text-primary uppercase tracking-wider">
            Cairo • Paris • International
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          {t.hero_title}
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.hero_subtitle}
        </p>

        {/* Booking Widget — lazy loaded, no animation to avoid reflow */}
        <Suspense fallback={<div className="h-[200px]" />}>
          <LazyBookingWidget />
        </Suspense>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
