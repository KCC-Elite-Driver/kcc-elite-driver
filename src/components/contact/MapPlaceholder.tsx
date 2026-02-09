import { useTranslation } from "@/i18n/LanguageContext";
import { MapPin } from "lucide-react";

const MapPlaceholder = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px]">
      <MapPin size={32} className="text-primary mb-3 opacity-50" />
      <p className="font-sans text-sm text-muted-foreground">
        {t.contact_map_coming}
      </p>
    </div>
  );
};

export default MapPlaceholder;
