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

  // Services Page
  services_title: string;
  services_subtitle: string;
  services_airport_title: string;
  services_airport_desc: string;
  services_airport_features: string[];
  services_hourly_title: string;
  services_hourly_desc: string;
  services_hourly_features: string[];
  services_event_title: string;
  services_event_desc: string;
  services_event_features: string[];
  services_city_title: string;
  services_city_desc: string;
  services_city_features: string[];
  services_cta: string;
  services_learn_more: string;

  // Booking Page
  booking_title: string;
  booking_subtitle: string;
  booking_step_service: string;
  booking_step_details: string;
  booking_step_vehicle: string;
  booking_step_confirm: string;
  booking_select_service: string;
  booking_next: string;
  booking_prev: string;
  booking_passengers_label: string;
  booking_luggage_label: string;
  booking_notes_label: string;
  booking_notes_placeholder: string;
  booking_select_vehicle: string;
  booking_summary: string;
  booking_service_label: string;
  booking_date_label: string;
  booking_time_label: string;
  booking_pickup_label: string;
  booking_dropoff_label: string;
  booking_vehicle_label: string;
  booking_confirm: string;
  booking_success: string;
  booking_success_desc: string;
  booking_new: string;
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

    // Services Page
    services_title: "Nos Services",
    services_subtitle: "Des prestations sur mesure pour chaque besoin",
    services_airport_title: "Transfert Aéroport",
    services_airport_desc: "Accueil personnalisé avec panneau nominatif, suivi des vols en temps réel et assistance bagages. Disponible dans tous les aéroports du Caire et de Paris.",
    services_airport_features: ["Accueil avec panneau nominatif", "Suivi des vols en temps réel", "Assistance bagages", "Temps d'attente gratuit"],
    services_hourly_title: "Mise à Disposition",
    services_hourly_desc: "Votre chauffeur reste à votre entière disposition pendant la durée souhaitée. Idéal pour les journées de rendez-vous ou les visites touristiques.",
    services_hourly_features: ["Chauffeur dédié", "Itinéraire flexible", "Durée modulable", "Disponible 24h/24"],
    services_event_title: "Événement VIP",
    services_event_desc: "Organisation complète du transport pour vos événements d'entreprise, mariages, galas et soirées privées. Coordination multi-véhicules possible.",
    services_event_features: ["Coordination multi-véhicules", "Planification sur mesure", "Accueil des invités", "Service de conciergerie"],
    services_city_title: "Intercités & Longue Distance",
    services_city_desc: "Voyagez confortablement entre les villes avec notre service de transfert longue distance. Le Caire – Alexandrie, Paris – Lyon, et bien plus.",
    services_city_features: ["Tarification transparente", "Arrêts intermédiaires possibles", "Confort premium garanti", "Chauffeur expérimenté"],
    services_cta: "Réserver ce service",
    services_learn_more: "En savoir plus",

    // Booking Page
    booking_title: "Réservation",
    booking_subtitle: "Réservez votre chauffeur en quelques étapes",
    booking_step_service: "Service",
    booking_step_details: "Détails",
    booking_step_vehicle: "Véhicule",
    booking_step_confirm: "Confirmation",
    booking_select_service: "Choisissez votre service",
    booking_next: "Suivant",
    booking_prev: "Précédent",
    booking_passengers_label: "Nombre de passagers",
    booking_luggage_label: "Nombre de bagages",
    booking_notes_label: "Notes spéciales",
    booking_notes_placeholder: "Numéro de vol, instructions particulières...",
    booking_select_vehicle: "Choisissez votre véhicule",
    booking_summary: "Récapitulatif",
    booking_service_label: "Service",
    booking_date_label: "Date",
    booking_time_label: "Heure",
    booking_pickup_label: "Prise en charge",
    booking_dropoff_label: "Destination",
    booking_vehicle_label: "Véhicule",
    booking_confirm: "Confirmer la réservation",
    booking_success: "Réservation confirmée !",
    booking_success_desc: "Nous vous contacterons sous peu avec les détails de votre chauffeur.",
    booking_new: "Nouvelle réservation",
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

    // Services Page
    services_title: "Our Services",
    services_subtitle: "Bespoke services tailored to your every need",
    services_airport_title: "Airport Transfer",
    services_airport_desc: "Personalised meet & greet with name board, real-time flight tracking and luggage assistance. Available at all Cairo and Paris airports.",
    services_airport_features: ["Meet & greet with name board", "Real-time flight tracking", "Luggage assistance", "Free waiting time"],
    services_hourly_title: "Hourly Disposal",
    services_hourly_desc: "Your chauffeur remains at your complete disposal for the desired duration. Ideal for a day of meetings or sightseeing.",
    services_hourly_features: ["Dedicated chauffeur", "Flexible itinerary", "Adjustable duration", "Available 24/7"],
    services_event_title: "VIP Events",
    services_event_desc: "Complete transport organisation for your corporate events, weddings, galas and private parties. Multi-vehicle coordination available.",
    services_event_features: ["Multi-vehicle coordination", "Bespoke planning", "Guest welcome", "Concierge service"],
    services_city_title: "Intercity & Long Distance",
    services_city_desc: "Travel comfortably between cities with our long-distance transfer service. Cairo – Alexandria, Paris – Lyon, and much more.",
    services_city_features: ["Transparent pricing", "Intermediate stops possible", "Premium comfort guaranteed", "Experienced chauffeur"],
    services_cta: "Book this service",
    services_learn_more: "Learn more",

    // Booking Page
    booking_title: "Booking",
    booking_subtitle: "Book your chauffeur in a few simple steps",
    booking_step_service: "Service",
    booking_step_details: "Details",
    booking_step_vehicle: "Vehicle",
    booking_step_confirm: "Confirmation",
    booking_select_service: "Choose your service",
    booking_next: "Next",
    booking_prev: "Back",
    booking_passengers_label: "Number of passengers",
    booking_luggage_label: "Number of luggage",
    booking_notes_label: "Special notes",
    booking_notes_placeholder: "Flight number, special instructions...",
    booking_select_vehicle: "Choose your vehicle",
    booking_summary: "Summary",
    booking_service_label: "Service",
    booking_date_label: "Date",
    booking_time_label: "Time",
    booking_pickup_label: "Pickup",
    booking_dropoff_label: "Destination",
    booking_vehicle_label: "Vehicle",
    booking_confirm: "Confirm booking",
    booking_success: "Booking confirmed!",
    booking_success_desc: "We will contact you shortly with your chauffeur details.",
    booking_new: "New booking",
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

    // Services Page
    services_title: "خدماتنا",
    services_subtitle: "خدمات مصممة خصيصاً لكل احتياجاتك",
    services_airport_title: "نقل من المطار",
    services_airport_desc: "استقبال شخصي بلوحة اسم، تتبع الرحلات في الوقت الفعلي ومساعدة في الأمتعة. متوفر في جميع مطارات القاهرة وباريس.",
    services_airport_features: ["استقبال بلوحة اسم", "تتبع الرحلات مباشرة", "مساعدة في الأمتعة", "وقت انتظار مجاني"],
    services_hourly_title: "حجز بالساعة",
    services_hourly_desc: "سائقك يبقى تحت تصرفك بالكامل طوال المدة المطلوبة. مثالي ليوم من الاجتماعات أو الجولات السياحية.",
    services_hourly_features: ["سائق مخصص", "مسار مرن", "مدة قابلة للتعديل", "متوفر 24/7"],
    services_event_title: "أحداث VIP",
    services_event_desc: "تنظيم كامل للنقل في مناسباتك الخاصة والمؤسسية، حفلات الزفاف والسهرات الخاصة. تنسيق متعدد المركبات ممكن.",
    services_event_features: ["تنسيق متعدد المركبات", "تخطيط مخصص", "استقبال الضيوف", "خدمة كونسيرج"],
    services_city_title: "بين المدن والمسافات الطويلة",
    services_city_desc: "سافر براحة بين المدن مع خدمة النقل لمسافات طويلة. القاهرة – الإسكندرية، باريس – ليون، وأكثر.",
    services_city_features: ["تسعير شفاف", "توقفات وسيطة ممكنة", "راحة فاخرة مضمونة", "سائق متمرس"],
    services_cta: "حجز هذه الخدمة",
    services_learn_more: "اعرف المزيد",

    // Booking Page
    booking_title: "الحجز",
    booking_subtitle: "احجز سائقك في خطوات بسيطة",
    booking_step_service: "الخدمة",
    booking_step_details: "التفاصيل",
    booking_step_vehicle: "المركبة",
    booking_step_confirm: "التأكيد",
    booking_select_service: "اختر خدمتك",
    booking_next: "التالي",
    booking_prev: "السابق",
    booking_passengers_label: "عدد الركاب",
    booking_luggage_label: "عدد الحقائب",
    booking_notes_label: "ملاحظات خاصة",
    booking_notes_placeholder: "رقم الرحلة، تعليمات خاصة...",
    booking_select_vehicle: "اختر مركبتك",
    booking_summary: "الملخص",
    booking_service_label: "الخدمة",
    booking_date_label: "التاريخ",
    booking_time_label: "الوقت",
    booking_pickup_label: "نقطة الانطلاق",
    booking_dropoff_label: "الوجهة",
    booking_vehicle_label: "المركبة",
    booking_confirm: "تأكيد الحجز",
    booking_success: "تم تأكيد الحجز!",
    booking_success_desc: "سنتواصل معك قريباً بتفاصيل سائقك.",
    booking_new: "حجز جديد",
  },
};
