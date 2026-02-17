import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { ShieldCheck, Award, GraduationCap, FileCheck, ArrowRight, Users, Eye, BookOpen, Lock, Star, Scale, Lightbulb } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import heroImage from "@/assets/about-chauffeur-detail.jpg?format=webp&w=1920";

const About = () => {
  const { t } = useTranslation();

  const teamValues = [
    { icon: Users, title: t.about_team_drivers, desc: t.about_team_drivers_desc },
    { icon: Eye, title: t.about_team_discretion, desc: t.about_team_discretion_desc },
    { icon: BookOpen, title: t.about_team_training, desc: t.about_team_training_desc },
  ];

  const certifications = [
    { icon: FileCheck, title: t.about_cert_vtc, desc: t.about_cert_vtc_desc },
    { icon: ShieldCheck, title: t.about_cert_insurance, desc: t.about_cert_insurance_desc },
    { icon: GraduationCap, title: t.about_cert_safety, desc: t.about_cert_safety_desc },
    { icon: Award, title: t.about_cert_iso, desc: t.about_cert_iso_desc },
  ];

  const coreValues = [
    { icon: Lock, title: t.about_value_discretion, desc: t.about_value_discretion_desc },
    { icon: Star, title: t.about_value_excellence, desc: t.about_value_excellence_desc },
    { icon: Scale, title: t.about_value_integrity, desc: t.about_value_integrity_desc },
    { icon: Lightbulb, title: t.about_value_anticipation, desc: t.about_value_anticipation_desc },
  ];

  return (
    <div className="pt-16">
      <PageMeta
        title="À propos — KCC-EliteDriver | Notre Histoire"
        description="Découvrez KCC-EliteDriver : chauffeurs certifiés VTC, flotte premium, service bilingue entre Le Caire et Paris. Excellence et discrétion depuis 2018."
        path="/about"
      />
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Chauffeur adjusting cufflink near luxury vehicle" className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <ScrollReveal variant="fade-in">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.about_title}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="font-sans text-muted-foreground text-base max-w-2xl mx-auto">
              {t.about_subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <ScrollReveal variant="fade-up">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              {t.about_story_title}
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.15}>
            <div className="space-y-6">
              <p className="font-sans text-muted-foreground text-base leading-relaxed">
                {t.about_story_p1}
              </p>
              <p className="font-sans text-muted-foreground text-base leading-relaxed">
                {t.about_story_p2}
              </p>
              <p className="font-sans text-muted-foreground text-base leading-relaxed">
                {t.about_story_p3}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team values */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.about_team_title}
              </h2>
              <p className="font-sans text-muted-foreground text-base max-w-xl mx-auto">
                {t.about_team_subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamValues.map((item, i) => (
              <ScrollReveal key={item.title} variant="fade-up" delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <item.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.about_certifications_title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.title} variant="scale-in" delay={i * 0.1}>
                <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <cert.icon size={22} className="text-primary" />
                  </div>
                  <h4 className="font-serif text-base font-semibold text-foreground mb-2">
                    {cert.title}
                  </h4>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.about_values_title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, i) => (
              <ScrollReveal key={value.title} variant="scale-in" delay={i * 0.1}>
                <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon size={22} className="text-primary" />
                  </div>
                  <h4 className="font-serif text-base font-semibold text-foreground mb-2">
                    {value.title}
                  </h4>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <ScrollReveal variant="fade-up">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t.about_cta}
            </h2>
            <p className="font-sans text-muted-foreground text-base max-w-xl mx-auto mb-6">
              {t.about_cta_desc}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity duration-200"
            >
              {t.nav_contact}
              <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
