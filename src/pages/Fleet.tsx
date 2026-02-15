import { useTranslation } from "@/i18n/LanguageContext";
import { Users, Briefcase, Wifi, Droplets, Plug, Newspaper, DoorOpen, LayoutGrid, ArrowRight, Wine, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import mercedesEClass from "@/assets/mercedes-e-class.jpg";
import mercedesSClass from "@/assets/mercedes-s-class.jpg";
import mercedesVClass from "@/assets/mercedes-v-class.jpg";
import cairoInteriorNight from "@/assets/cairo-interior-night.jpg";
import PageMeta from "@/components/PageMeta";

interface VehicleCardProps {
  name: string;
  description: string;
  passengers: number;
  luggage: number;
  amenities: { icon: React.ElementType; label: string }[];
  image: string;
  index: number;
}

const VehicleCard = ({ name, description, passengers, luggage, amenities, image, index }: VehicleCardProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
    >
      <div className="relative h-56 bg-secondary flex items-center justify-center overflow-hidden">
         <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute top-4 left-4 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
          <span className="text-xs font-sans font-medium text-primary">{name}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">{name}</h3>
        <p className="font-sans text-sm text-muted-foreground mb-6 leading-relaxed">{description}</p>
        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-primary" />
            <span className="font-sans text-sm text-foreground font-medium">{passengers}</span>
            <span className="font-sans text-sm text-muted-foreground">{t.fleet_passengers}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={18} className="text-primary" />
            <span className="font-sans text-sm text-foreground font-medium">{luggage}</span>
            <span className="font-sans text-sm text-muted-foreground">{t.fleet_luggage}</span>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t.fleet_amenities}</h4>
          <div className="grid grid-cols-2 gap-2">
            {amenities.map((amenity) => (
              <div key={amenity.label} className="flex items-center gap-2">
                <amenity.icon size={14} className="text-primary" />
                <span className="font-sans text-sm text-muted-foreground">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
        <Link
          to="/contact"
          className="w-full gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
        >
          {t.fleet_book}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

const Fleet = () => {
  const { t } = useTranslation();

  const vehicles = [
    {
      name: t.fleet_business, description: t.fleet_business_desc, passengers: 3, luggage: 2, image: mercedesEClass,
      amenities: [{ icon: Wifi, label: t.fleet_wifi }, { icon: Droplets, label: t.fleet_water }, { icon: Plug, label: t.fleet_chargers }],
    },
    {
      name: t.fleet_first, description: t.fleet_first_desc, passengers: 3, luggage: 3, image: mercedesSClass,
      amenities: [{ icon: Wifi, label: t.fleet_wifi }, { icon: Droplets, label: t.fleet_water }, { icon: Plug, label: t.fleet_chargers }, { icon: Newspaper, label: t.fleet_press }, { icon: DoorOpen, label: t.fleet_partition }, { icon: Wine, label: t.fleet_refreshments }, { icon: ShieldCheck, label: t.fleet_disinfection }],
    },
    {
      name: t.fleet_van, description: t.fleet_van_desc, passengers: 7, luggage: 7, image: mercedesVClass,
      amenities: [{ icon: Wifi, label: t.fleet_wifi }, { icon: Droplets, label: t.fleet_water }, { icon: Plug, label: t.fleet_chargers }, { icon: LayoutGrid, label: t.fleet_conference }, { icon: Wine, label: t.fleet_refreshments }, { icon: ShieldCheck, label: t.fleet_disinfection }],
    },
  ];

  return (
    <div className="pt-16">
      <PageMeta
        title="Notre Flotte — KCC-EliteDriver"
        description="Découvrez notre flotte de véhicules premium : Mercedes Classe E, S et V. Confort et élégance garantis."
        path="/fleet"
      />
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cairoInteriorNight}
            alt="Luxury Mercedes interior with Cairo city lights"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">{t.fleet_page_title}</h1>
          <p className="font-sans text-muted-foreground text-base max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>{t.fleet_page_subtitle}</p>
        </div>
      </section>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, i) => (
              <VehicleCard key={vehicle.name} {...vehicle} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fleet;
