import { useTranslation } from "@/i18n/LanguageContext";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";

const DirectContact = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
        {t.contact_direct}
      </h3>
      <p className="font-sans text-sm text-muted-foreground mb-6">
        {t.contact_direct_subtitle}
      </p>

      <div className="space-y-4">
        {/* WhatsApp */}
        <div>
          <a
            href={`https://wa.me/201507040949?text=${encodeURIComponent("Bonjour, je souhaiterais discuter d'une demande personnalisée KCC-EliteDriver.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full bg-[hsl(142,70%,35%)] text-white font-sans text-sm font-medium px-4 py-3 rounded-md hover:opacity-90 transition-opacity duration-200"
          >
            <MessageCircle size={18} />
            {t.contact_whatsapp}
          </a>
          <p className="font-sans text-xs text-muted-foreground mt-1.5 px-1">{t.contact_whatsapp_helper}</p>
        </div>

        {/* Call */}
        <div>
          <a
            href="tel:+33123456789"
            className="flex items-center gap-3 w-full border border-primary text-primary font-sans text-sm font-medium px-4 py-3 rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <Phone size={18} />
            {t.contact_call}
          </a>
          <p className="font-sans text-xs text-muted-foreground mt-1.5 px-1">{t.contact_call_helper}</p>
          <div className="flex items-center gap-1.5 mt-1 px-1">
            <Clock size={12} className="text-muted-foreground" />
            <p className="font-sans text-xs text-muted-foreground">{t.contact_call_hours}</p>
          </div>
          <p className="font-sans text-sm font-medium text-foreground mt-1 px-1">{t.contact_call_number}</p>
        </div>

        {/* Email */}
        <div>
          <a
            href={`mailto:${t.contact_email_direct}`}
            className="flex items-center gap-3 w-full border border-border text-foreground font-sans text-sm font-medium px-4 py-3 rounded-md hover:bg-secondary transition-all duration-200"
          >
            <Mail size={18} />
            {t.contact_email_direct}
          </a>
          <p className="font-sans text-xs text-muted-foreground mt-1.5 px-1">{t.contact_email_direct_helper}</p>
        </div>
      </div>
    </div>
  );
};

export default DirectContact;
