import { useTranslation } from "@/i18n/LanguageContext";
import { MessageCircle, Phone } from "lucide-react";

const DirectContact = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
        {t.contact_direct}
      </h3>
      <p className="font-sans text-sm text-muted-foreground mb-6">
        {t.contact_direct_subtitle}
      </p>

      <div className="space-y-3">
        <a
          href={`https://wa.me/33123456789?text=${encodeURIComponent("Bonjour, je souhaite réserver un chauffeur privé.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full bg-[hsl(142,70%,35%)] text-white font-sans text-sm font-medium px-4 py-3 rounded-md hover:opacity-90 transition-opacity duration-200"
        >
          <MessageCircle size={18} />
          {t.contact_whatsapp}
        </a>

        <a
          href="tel:+33123456789"
          className="flex items-center gap-3 w-full border border-primary text-primary font-sans text-sm font-medium px-4 py-3 rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-200"
        >
          <Phone size={18} />
          {t.contact_call}
        </a>
      </div>
    </div>
  );
};

export default DirectContact;
