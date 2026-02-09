import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";
import { Users, Briefcase, ArrowRight } from "lucide-react";

const FleetPreview = () => {
  const { t } = useTranslation();

  const vehicles = [
    {
      name: t.fleet_business,
      desc: t.fleet_business_desc,
      passengers: 3,
      luggage: 2,
      image: "/placeholder.svg",
    },
    {
      name: t.fleet_first,
      desc: t.fleet_first_desc,
      passengers: 3,
      luggage: 3,
      image: "/placeholder.svg",
    },
    {
      name: t.fleet_van,
      desc: t.fleet_van_desc,
      passengers: 7,
      luggage: 7,
      image: "/placeholder.svg",
    },
  ];

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.fleet_title}
          </h2>
          <p className="font-sans text-muted-foreground text-base max-w-xl mx-auto">
            {t.fleet_subtitle}
          </p>
        </div>

        {/* Vehicle cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, i) => (
            <div
              key={vehicle.name}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "forwards" }}
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-secondary flex items-center justify-center overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-24 h-24 opacity-30 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {vehicle.name}
                </h3>
                <p className="font-sans text-sm text-muted-foreground mb-4 leading-relaxed">
                  {vehicle.desc}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users size={14} className="text-primary" />
                    <span className="font-sans">{vehicle.passengers} {t.fleet_passengers}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Briefcase size={14} className="text-primary" />
                    <span className="font-sans">{vehicle.luggage} {t.fleet_luggage}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-primary font-sans text-sm font-medium hover:gap-3 transition-all duration-200"
                >
                  {t.fleet_book}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            to="/fleet"
            className="inline-flex items-center gap-2 border border-primary text-primary font-sans text-sm font-medium px-6 py-3 rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            {t.fleet_view_all}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FleetPreview;
