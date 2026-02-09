import { useTranslation } from "@/i18n/LanguageContext";
import { Landmark, Building2, Globe } from "lucide-react";

const GlobalAxis = () => {
  const { t } = useTranslation();

  const axes = [
    {
      icon: Landmark,
      title: t.axis_cairo,
      desc: t.axis_cairo_desc,
    },
    {
      icon: Building2,
      title: t.axis_paris,
      desc: t.axis_paris_desc,
    },
    {
      icon: Globe,
      title: t.axis_international,
      desc: t.axis_international_desc,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.axis_title}
          </h2>
          <p className="font-sans text-muted-foreground text-base max-w-xl mx-auto">
            {t.axis_subtitle}
          </p>
        </div>

        {/* Axis cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {axes.map((axis, i) => (
            <div
              key={axis.title}
              className="group relative bg-card border border-border rounded-lg p-8 hover:border-primary/30 transition-all duration-300 opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "forwards" }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <axis.icon size={24} className="text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {axis.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {axis.desc}
              </p>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Connecting line */}
        <div className="hidden md:flex items-center justify-center mt-8 gap-2">
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-primary/30" />
          <div className="w-2 h-2 rounded-full bg-primary/50" />
          <div className="h-px w-32 bg-primary/30" />
          <div className="w-2 h-2 rounded-full bg-primary/50" />
          <div className="h-px w-32 bg-primary/30" />
          <div className="w-2 h-2 rounded-full bg-primary/50" />
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>
    </section>
  );
};

export default GlobalAxis;
