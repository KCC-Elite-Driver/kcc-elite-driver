export type Language = "fr" | "en" | "ar";

export type TranslationKeys = {
  // Nav
  nav_home: string;
  nav_fleet: string;
  nav_services: string;
  nav_booking: string;
  nav_contact: string;
  nav_reserve: string;

  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_oneway: string;
  hero_hourly: string;
  hero_pickup: string;
  hero_dropoff: string;
  hero_date: string;
  hero_time: string;
  hero_search: string;

  // Global Axis
  axis_title: string;
  axis_subtitle: string;
  axis_cairo: string;
  axis_paris: string;
  axis_international: string;
  axis_cairo_desc: string;
  axis_paris_desc: string;
  axis_international_desc: string;

  // Fleet Preview
  fleet_title: string;
  fleet_subtitle: string;
  fleet_view_all: string;
  fleet_passengers: string;
  fleet_luggage: string;
  fleet_book: string;
  fleet_business: string;
  fleet_business_desc: string;
  fleet_first: string;
  fleet_first_desc: string;
  fleet_van: string;
  fleet_van_desc: string;

  // Fleet Page
  fleet_page_title: string;
  fleet_page_subtitle: string;
  fleet_amenities: string;
  fleet_wifi: string;
  fleet_water: string;
  fleet_chargers: string;
  fleet_press: string;
  fleet_partition: string;
  fleet_conference: string;

  // Values
  values_title: string;
  values_subtitle: string;
  values_discretion: string;
  values_discretion_desc: string;
  values_punctuality: string;
  values_punctuality_desc: string;
  values_multilingual: string;
  values_multilingual_desc: string;

  // Contact
  contact_title: string;
  contact_subtitle: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_message: string;
  contact_service: string;
  contact_service_airport: string;
  contact_service_hourly: string;
  contact_service_event: string;
  contact_service_other: string;
  contact_send: string;
  contact_success: string;
  contact_whatsapp: string;
  contact_call: string;
  contact_map_coming: string;
  contact_direct: string;
  contact_direct_subtitle: string;

  // Footer
  footer_tagline: string;
  footer_navigation: string;
  footer_services_title: string;
  footer_service_airport: string;
  footer_service_hourly: string;
  footer_service_event: string;
  footer_contact_title: string;
  footer_rights: string;
};

export const translations: Record<Language, TranslationKeys> = {
  fr: {
    nav_home: "Accueil",
    nav_fleet: "Flotte",
    nav_services: "Services",
    nav_booking: "Réservation",
    nav_contact: "Contact",
    nav_reserve: "Réserver",

    hero_title: "L'excellence à chaque kilomètre",
    hero_subtitle: "Service de chauffeur privé haut de gamme au Caire et à Paris. Discrétion, ponctualité et élégance pour chaque trajet.",
    hero_oneway: "Transfert",
    hero_hourly: "Mise à disposition",
    hero_pickup: "Lieu de prise en charge",
    hero_dropoff: "Destination",
    hero_date: "Date",
    hero_time: "Heure",
    hero_search: "Rechercher",

    axis_title: "Votre chauffeur, partout",
    axis_subtitle: "Un service d'exception entre Le Caire, Paris et au-delà",
    axis_cairo: "Le Caire",
    axis_paris: "Paris",
    axis_international: "International",
    axis_cairo_desc: "Transferts aéroport, circuits touristiques et déplacements d'affaires dans la capitale égyptienne.",
    axis_paris_desc: "Navettes aéroport, événements et mise à disposition dans la Ville Lumière.",
    axis_international_desc: "Coordination de trajets longue distance et services sur mesure à travers le monde.",

    fleet_title: "Notre Flotte",
    fleet_subtitle: "Des véhicules d'exception pour chaque occasion",
    fleet_view_all: "Voir toute la flotte",
    fleet_passengers: "passagers",
    fleet_luggage: "bagages",
    fleet_book: "Réserver",
    fleet_business: "Business",
    fleet_business_desc: "Mercedes Classe E ou équivalent. Confort et élégance pour vos déplacements professionnels.",
    fleet_first: "First Class",
    fleet_first_desc: "Mercedes Classe S ou équivalent. Le summum du luxe pour une expérience inoubliable.",
    fleet_van: "Van VIP",
    fleet_van_desc: "Mercedes Classe V ou équivalent. Espace et confort pour vos groupes et familles.",

    fleet_page_title: "Notre Flotte",
    fleet_page_subtitle: "Chaque véhicule est soigneusement sélectionné et entretenu pour garantir votre confort et votre sécurité.",
    fleet_amenities: "Équipements",
    fleet_wifi: "Wi-Fi haut débit",
    fleet_water: "Eau minérale",
    fleet_chargers: "Chargeurs USB",
    fleet_press: "Presse du jour",
    fleet_partition: "Séparation chauffeur",
    fleet_conference: "Espace conférence",

    values_title: "Nos Engagements",
    values_subtitle: "Les piliers de notre excellence",
    values_discretion: "Discrétion",
    values_discretion_desc: "Confidentialité absolue. Vos trajets et vos conversations restent privés.",
    values_punctuality: "Ponctualité",
    values_punctuality_desc: "Suivi des vols en temps réel. Votre chauffeur est toujours à l'heure.",
    values_multilingual: "Multilingue",
    values_multilingual_desc: "Chauffeurs parlant français, anglais et arabe pour un service sans barrière.",

    contact_title: "Contactez-nous",
    contact_subtitle: "Pour une demande sur mesure ou un devis personnalisé",
    contact_name: "Nom complet",
    contact_email: "Adresse e-mail",
    contact_phone: "Téléphone",
    contact_message: "Votre message",
    contact_service: "Type de service",
    contact_service_airport: "Transfert aéroport",
    contact_service_hourly: "Mise à disposition",
    contact_service_event: "Événement VIP",
    contact_service_other: "Autre",
    contact_send: "Envoyer",
    contact_success: "Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
    contact_whatsapp: "WhatsApp",
    contact_call: "Appeler",
    contact_map_coming: "Google Maps — Bientôt disponible",
    contact_direct: "Contact direct",
    contact_direct_subtitle: "Réponse garantie sous 2 heures",

    footer_tagline: "L'excellence à chaque kilomètre",
    footer_navigation: "Navigation",
    footer_services_title: "Services",
    footer_service_airport: "Transfert aéroport",
    footer_service_hourly: "Mise à disposition",
    footer_service_event: "Événement VIP",
    footer_contact_title: "Contact",
    footer_rights: "Tous droits réservés.",
  },

  en: {
    nav_home: "Home",
    nav_fleet: "Fleet",
    nav_services: "Services",
    nav_booking: "Booking",
    nav_contact: "Contact",
    nav_reserve: "Book Now",

    hero_title: "Excellence at every mile",
    hero_subtitle: "Premium private chauffeur service in Cairo and Paris. Discretion, punctuality and elegance for every journey.",
    hero_oneway: "One-way",
    hero_hourly: "Hourly",
    hero_pickup: "Pickup location",
    hero_dropoff: "Destination",
    hero_date: "Date",
    hero_time: "Time",
    hero_search: "Search",

    axis_title: "Your chauffeur, everywhere",
    axis_subtitle: "Exceptional service between Cairo, Paris and beyond",
    axis_cairo: "Cairo",
    axis_paris: "Paris",
    axis_international: "International",
    axis_cairo_desc: "Airport transfers, sightseeing tours and business travel in the Egyptian capital.",
    axis_paris_desc: "Airport shuttles, events and hourly hire in the City of Light.",
    axis_international_desc: "Long-distance coordination and bespoke services worldwide.",

    fleet_title: "Our Fleet",
    fleet_subtitle: "Exceptional vehicles for every occasion",
    fleet_view_all: "View full fleet",
    fleet_passengers: "passengers",
    fleet_luggage: "luggage",
    fleet_book: "Book Now",
    fleet_business: "Business",
    fleet_business_desc: "Mercedes E-Class or equivalent. Comfort and elegance for your professional journeys.",
    fleet_first: "First Class",
    fleet_first_desc: "Mercedes S-Class or equivalent. The pinnacle of luxury for an unforgettable experience.",
    fleet_van: "VIP Van",
    fleet_van_desc: "Mercedes V-Class or equivalent. Space and comfort for your groups and families.",

    fleet_page_title: "Our Fleet",
    fleet_page_subtitle: "Each vehicle is carefully selected and maintained to ensure your comfort and safety.",
    fleet_amenities: "Amenities",
    fleet_wifi: "High-speed Wi-Fi",
    fleet_water: "Mineral water",
    fleet_chargers: "USB chargers",
    fleet_press: "Daily press",
    fleet_partition: "Driver partition",
    fleet_conference: "Conference space",

    values_title: "Our Commitments",
    values_subtitle: "The pillars of our excellence",
    values_discretion: "Discretion",
    values_discretion_desc: "Absolute confidentiality. Your journeys and conversations remain private.",
    values_punctuality: "Punctuality",
    values_punctuality_desc: "Real-time flight tracking. Your chauffeur is always on time.",
    values_multilingual: "Multilingual",
    values_multilingual_desc: "Drivers speaking French, English and Arabic for a seamless service.",

    contact_title: "Contact Us",
    contact_subtitle: "For a bespoke request or a personalised quote",
    contact_name: "Full name",
    contact_email: "Email address",
    contact_phone: "Phone",
    contact_message: "Your message",
    contact_service: "Service type",
    contact_service_airport: "Airport transfer",
    contact_service_hourly: "Hourly hire",
    contact_service_event: "VIP Event",
    contact_service_other: "Other",
    contact_send: "Send",
    contact_success: "Message sent successfully. We will reply as soon as possible.",
    contact_whatsapp: "WhatsApp",
    contact_call: "Call",
    contact_map_coming: "Google Maps — Coming Soon",
    contact_direct: "Direct contact",
    contact_direct_subtitle: "Guaranteed response within 2 hours",

    footer_tagline: "Excellence at every mile",
    footer_navigation: "Navigation",
    footer_services_title: "Services",
    footer_service_airport: "Airport transfer",
    footer_service_hourly: "Hourly hire",
    footer_service_event: "VIP Event",
    footer_contact_title: "Contact",
    footer_rights: "All rights reserved.",
  },

  ar: {
    nav_home: "الرئيسية",
    nav_fleet: "الأسطول",
    nav_services: "الخدمات",
    nav_booking: "الحجز",
    nav_contact: "اتصل بنا",
    nav_reserve: "احجز الآن",

    hero_title: "التميّز في كل كيلومتر",
    hero_subtitle: "خدمة سائق خاص فاخرة في القاهرة وباريس. سرية ودقة وأناقة في كل رحلة.",
    hero_oneway: "رحلة واحدة",
    hero_hourly: "بالساعة",
    hero_pickup: "مكان الانطلاق",
    hero_dropoff: "الوجهة",
    hero_date: "التاريخ",
    hero_time: "الوقت",
    hero_search: "بحث",

    axis_title: "سائقك، في كل مكان",
    axis_subtitle: "خدمة استثنائية بين القاهرة وباريس وأبعد",
    axis_cairo: "القاهرة",
    axis_paris: "باريس",
    axis_international: "دولي",
    axis_cairo_desc: "نقل من المطار، جولات سياحية وتنقلات أعمال في العاصمة المصرية.",
    axis_paris_desc: "نقل من المطار، مناسبات وحجز بالساعة في مدينة النور.",
    axis_international_desc: "تنسيق رحلات طويلة وخدمات مخصصة حول العالم.",

    fleet_title: "أسطولنا",
    fleet_subtitle: "مركبات استثنائية لكل مناسبة",
    fleet_view_all: "عرض الأسطول بالكامل",
    fleet_passengers: "ركاب",
    fleet_luggage: "حقائب",
    fleet_book: "احجز الآن",
    fleet_business: "بزنس",
    fleet_business_desc: "مرسيدس الفئة E أو ما يعادلها. راحة وأناقة لتنقلاتك المهنية.",
    fleet_first: "الدرجة الأولى",
    fleet_first_desc: "مرسيدس الفئة S أو ما يعادلها. قمة الفخامة لتجربة لا تُنسى.",
    fleet_van: "فان VIP",
    fleet_van_desc: "مرسيدس الفئة V أو ما يعادلها. مساحة وراحة لمجموعاتك وعائلتك.",

    fleet_page_title: "أسطولنا",
    fleet_page_subtitle: "كل مركبة يتم اختيارها وصيانتها بعناية لضمان راحتك وسلامتك.",
    fleet_amenities: "التجهيزات",
    fleet_wifi: "واي فاي عالي السرعة",
    fleet_water: "مياه معدنية",
    fleet_chargers: "شواحن USB",
    fleet_press: "صحف اليوم",
    fleet_partition: "فاصل السائق",
    fleet_conference: "مساحة اجتماعات",

    values_title: "التزاماتنا",
    values_subtitle: "ركائز تميّزنا",
    values_discretion: "السرية",
    values_discretion_desc: "سرية مطلقة. رحلاتك ومحادثاتك تبقى خاصة.",
    values_punctuality: "الدقة",
    values_punctuality_desc: "تتبع الرحلات في الوقت الفعلي. سائقك دائماً في الموعد.",
    values_multilingual: "متعدد اللغات",
    values_multilingual_desc: "سائقون يتحدثون الفرنسية والإنجليزية والعربية لخدمة بلا حدود.",

    contact_title: "اتصل بنا",
    contact_subtitle: "لطلب مخصص أو عرض سعر شخصي",
    contact_name: "الاسم الكامل",
    contact_email: "البريد الإلكتروني",
    contact_phone: "الهاتف",
    contact_message: "رسالتك",
    contact_service: "نوع الخدمة",
    contact_service_airport: "نقل من المطار",
    contact_service_hourly: "حجز بالساعة",
    contact_service_event: "حدث VIP",
    contact_service_other: "أخرى",
    contact_send: "إرسال",
    contact_success: "تم إرسال الرسالة بنجاح. سنرد عليك في أقرب وقت ممكن.",
    contact_whatsapp: "واتساب",
    contact_call: "اتصل",
    contact_map_coming: "خرائط جوجل — قريباً",
    contact_direct: "تواصل مباشر",
    contact_direct_subtitle: "رد مضمون خلال ساعتين",

    footer_tagline: "التميّز في كل كيلومتر",
    footer_navigation: "التنقل",
    footer_services_title: "الخدمات",
    footer_service_airport: "نقل من المطار",
    footer_service_hourly: "حجز بالساعة",
    footer_service_event: "حدث VIP",
    footer_contact_title: "اتصل بنا",
    footer_rights: "جميع الحقوق محفوظة.",
  },
};
