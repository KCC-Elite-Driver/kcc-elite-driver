export type Language = "fr" | "en" | "ar";

export type TranslationKeys = {
  // Nav
  nav_home: string;
  nav_fleet: string;
  nav_services: string;
  nav_about: string;
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

  // Services - additional sections
  services_meetgreet_title: string;
  services_meetgreet_desc: string;
  services_meetgreet_features: string[];
  services_cultural_title: string;
  services_cultural_desc: string;
  services_cultural_pricing: string;
  services_standby_title: string;
  services_standby_desc: string;
  services_standby_format: string;
  services_standby_features: string[];
  services_cancellation_title: string;
  services_cancellation_desc: string;
  services_cancellation_standard: string;
  services_cancellation_meetgreet: string;
  services_airports_title: string;
  services_airports_desc: string;
  services_airports_includes: string;
  services_airports_cai: string;
  services_airports_cdg: string;
  services_airports_ory: string;
  services_why_title: string;
  services_why_discretion: string;
  services_why_discretion_desc: string;
  services_why_expertise: string;
  services_why_expertise_desc: string;
  services_why_excellence: string;
  services_why_excellence_desc: string;

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

  // Booking Passenger step
  booking_step_passenger: string;
  booking_firstname: string;
  booking_lastname: string;
  booking_email: string;
  booking_phone: string;
  booking_company_invoice: string;
  booking_flight_number: string;
  booking_meet_greet: string;
  booking_meet_greet_desc: string;
  booking_cancellation_policy: string;
  booking_payment_card: string;
  booking_payment_cash: string;
  booking_payment_method: string;

  // Fleet extra amenities
  fleet_refreshments: string;
  fleet_disinfection: string;

  // Services dropdown
  services_dropdown_airport: string;
  services_dropdown_hourly: string;
  services_dropdown_event: string;
  services_dropdown_intercity: string;

  // About Page
  about_title: string;
  about_subtitle: string;
  about_story_title: string;
  about_story_p1: string;
  about_story_p2: string;
  about_story_p3: string;
  about_team_title: string;
  about_team_subtitle: string;
  about_team_drivers: string;
  about_team_drivers_desc: string;
  about_team_discretion: string;
  about_team_discretion_desc: string;
  about_team_training: string;
  about_team_training_desc: string;
  about_certifications_title: string;
  about_cert_vtc: string;
  about_cert_vtc_desc: string;
  about_cert_insurance: string;
  about_cert_insurance_desc: string;
  about_cert_safety: string;
  about_cert_safety_desc: string;
  about_cert_iso: string;
  about_cert_iso_desc: string;
  about_cta: string;
  about_cta_desc: string;
  about_values_title: string;
  about_value_discretion: string;
  about_value_discretion_desc: string;
  about_value_excellence: string;
  about_value_excellence_desc: string;
  about_value_integrity: string;
  about_value_integrity_desc: string;
  about_value_anticipation: string;
  about_value_anticipation_desc: string;
};

export const translations: Record<Language, TranslationKeys> = { // v3
  fr: {
    nav_home: "Accueil",
    nav_fleet: "Flotte",
    nav_services: "Services",
    nav_about: "À propos",
    nav_booking: "Réservation",
    nav_contact: "Contact",
    nav_reserve: "Réserver",

    hero_title: "L'excellence à chaque kilomètre",
    hero_subtitle: "Une continuité de service sans compromis. Discrétion absolue, ponctualité garantie, sérénité à chaque déplacement important.",
    hero_oneway: "Transfert",
    hero_hourly: "Mise à disposition",
    hero_pickup: "Lieu de prise en charge",
    hero_dropoff: "Destination",
    hero_date: "Date",
    hero_time: "Heure",
    hero_search: "Rechercher",

    axis_title: "De part et d'autre du monde",
    axis_subtitle: "Une présence locale, une excellence internationale",
    axis_cairo: "Le Caire",
    axis_paris: "Paris",
    axis_international: "International",
    axis_cairo_desc: "Transferts aéroport, circuits culturels privés et déplacements d'affaires. Maîtrise éprouvée de la capitale égyptienne et de ses enjeux spécifiques.",
    axis_paris_desc: "Transferts aéroport, mise à disposition horaire, événements privés. Expertise affirmée de la Ville Lumière et de ses codes internationaux.",
    axis_international_desc: "Trajets longue distance coordonnés, connexions aériennes et services sur mesure. À l'écoute de vos besoins où que vous soyez.",

    fleet_title: "Notre Flotte",
    fleet_subtitle: "Sélectionnés avec soin pour chaque contexte",
    fleet_view_all: "Voir toute la flotte",
    fleet_passengers: "passagers",
    fleet_luggage: "bagages",
    fleet_book: "Réserver",
    fleet_business: "Business",
    fleet_business_desc: "Mercedes Classe E ou équivalent. Confort discret et connectivité complète pour vos déplacements professionnels. Équipée de WiFi très haut débit, climatisation intelligente, rafraîchissements premium et presse française et internationale à bord.",
    fleet_first: "First Class",
    fleet_first_desc: "Mercedes Classe S ou équivalent. L'excellence absolue pour vos moments les plus sensibles. Votre bureau mobile privé : WiFi très haut débit, climatisation zoning, espaces de travail intégrés, rafraîchissements haut de gamme, lecture sélectionnée.",
    fleet_van: "Van Prestige",
    fleet_van_desc: "Mercedes Classe V ou équivalent. Espace sans compromis pour délégations officielles et événements privés. Équipée de WiFi très haut débit, climatisation zoning, bar intégré, divertissement discret et configuration modulable selon vos besoins.",

    fleet_page_title: "Notre Flotte",
    fleet_page_subtitle: "Sélectionnés avec soin pour chaque contexte",
    fleet_amenities: "Équipements",
    fleet_wifi: "Wi-Fi très haut débit",
    fleet_water: "Eau minérale",
    fleet_chargers: "Chargeurs USB",
    fleet_press: "Presse française et internationale",
    fleet_partition: "Séparation chauffeur",
    fleet_conference: "Espace conférence",

    values_title: "Nos Engagements",
    values_subtitle: "Ce qui nous définit",
    values_discretion: "Discrétion",
    values_discretion_desc: "Confidentialité absolue. Vos trajets, vos horaires, vos conversations restent strictement privés. C'est notre priorité première.",
    values_punctuality: "Ponctualité",
    values_punctuality_desc: "Anticipation constante. Suivi des vols en temps réel, gestion des aléas, arrivée toujours en avance. Jamais d'attente, jamais de retard.",
    values_multilingual: "Multilingue",
    values_multilingual_desc: "Chauffeurs francophones, anglophones et arabophones. Fluidité totale dans chaque échange, compréhension des nuances culturelles de chaque marché.",

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

    services_title: "Nos Services",
    services_subtitle: "Services adaptés à chaque situation, chaque moment",
    services_airport_title: "Transfert Aéroport",
    services_airport_desc: "Accueil discret avec panneau nominatif, suivi en temps réel de votre vol, assistance bagages jusqu'à votre véhicule. Temps d'attente gratuit, services complets inclus.",
    services_airport_features: ["Accueil avec panneau nominatif", "Suivi des vols en temps réel", "Assistance bagages", "Temps d'attente gratuit"],
    services_hourly_title: "Mise à Disposition Horaire",
    services_hourly_desc: "Réservez votre véhicule et chauffeur pour la journée, la demi-journée ou pour une durée spécifique. Flexibilité totale : arrêts multiples, changement de programme, disponibilité garantie. Idéal pour vos tournées d'affaires ou événements.",
    services_hourly_features: ["Chauffeur dédié", "Itinéraire flexible", "Durée modulable", "Disponible 24h/24"],
    services_event_title: "Événement VIP",
    services_event_desc: "Organisation complète du transport pour vos événements d'entreprise, mariages, galas et soirées privées. Coordination multi-véhicules, planification discrète, service de conciergerie intégré.",
    services_event_features: ["Coordination multi-véhicules", "Planification sur mesure", "Accueil des invités", "Service de conciergerie"],
    services_city_title: "Intercités & Longue Distance",
    services_city_desc: "Trajets longue distance coordonnés en tout confort : Le Caire – Alexandrie, Paris – Lyon et au-delà. Tarification transparente, arrêts intermédiaires possibles, chauffeur expérimenté, confort premium garanti.",
    services_city_features: ["Tarification transparente", "Arrêts intermédiaires possibles", "Confort premium garanti", "Chauffeur expérimenté"],
    services_cta: "Réserver ce service",
    services_learn_more: "En savoir plus",

    // Services - additional sections
    services_meetgreet_title: "Accueil Personnalisé aux Aéroports",
    services_meetgreet_desc: "Nos équipes vous accueillent à votre arrivée avec discrétion. Détection de votre vol, assistance avec vos bagages, chemin clair jusqu'à votre véhicule. Un service qui commence avant même votre départ de l'aéroport.",
    services_meetgreet_features: ["Détection automatique de votre arrivée", "Assistance complète avec bagages", "Chemin dédié jusqu'au véhicule", "Support pour vos besoins spéciaux"],
    services_cultural_title: "Circuits Touristiques Privés",
    services_cultural_desc: "Au-delà du transport, nous proposons une découverte culturelle et patrimoine sur mesure : visite privée des sites historiques du Caire, musées avec accès privilégié, balades dans le Paris historique. Disponible pour une demi-journée ou journée complète.",
    services_cultural_pricing: "Sur demande",
    services_standby_title: "Mise à Disposition Horaire",
    services_standby_desc: "Réservez votre véhicule et chauffeur pour la journée, la demi-journée ou pour une durée spécifique. Flexibilité totale : arrêts multiples, changement de programme, disponibilité garantie. Idéal pour vos tournées d'affaires ou événements.",
    services_standby_format: "Demi-journée (4h) | Journée (8h) | Sur mesure",
    services_standby_features: ["Chauffeur dédié et attentif", "Itinéraire flexible et adaptable", "Durée modulable selon vos besoins", "Disponible 24h/24"],
    services_cancellation_title: "Politique d'Annulation Flexible",
    services_cancellation_desc: "Annulation gratuite jusqu'à 24 heures avant votre départ. Au-delà, une participation de 50% au montant total s'applique. Pour les réservations avec Meet & Greet à l'aéroport, délai d'annulation : 48 heures. Nous comprenons que vos plans peuvent changer ; nous restons justes dans nos conditions.",
    services_cancellation_standard: "Standard : Gratuit jusqu'à 24h avant | 50% au-delà",
    services_cancellation_meetgreet: "Avec Meet & Greet : Gratuit jusqu'à 48h avant | 50% au-delà",
    services_airports_title: "Transferts Aéroports",
    services_airports_desc: "Tous les transferts incluent : suivi de vol, assistance bagages, tarif fixe sans surprise, véhicule climatisé.",
    services_airports_includes: "Suivi de vol • Assistance bagages • Tarif fixe • Véhicule climatisé",
    services_airports_cai: "Le Caire (CAI) – Aéroport International du Caire",
    services_airports_cdg: "Paris (CDG) – Aéroport Paris-Charles de Gaulle",
    services_airports_ory: "Paris (ORY) – Aéroport Paris-Orly",
    services_why_title: "Pourquoi KCC-EliteDriver ?",
    services_why_discretion: "Discrétion & Sécurité",
    services_why_discretion_desc: "Votre vie privée est inviolable. Confidentialité absolue, protocoles de sécurité renforcés, équipes formées aux enjeux diplomatiques et de haut niveau.",
    services_why_expertise: "Expertise Internationale",
    services_why_expertise_desc: "Maîtrise éprouvée du Caire et de Paris. Compréhension des marchés locaux, connaissance des routes, anticipation des enjeux culturels et logistiques.",
    services_why_excellence: "Excellence Opérationnelle",
    services_why_excellence_desc: "Flotte récente (moins de 3 ans), chauffeurs polyglottes et hautement sélectionnés, ponctualité garantie, service 24/7, suivi temps réel.",

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
    booking_notes_placeholder: "Notes au chauffeur – Demandes particulières",
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
    booking_success_desc: "Votre réservation est confirmée. Un email de récapitulatif a été envoyé. Nous vous remercions de votre confiance.",
    booking_new: "Nouvelle réservation",

    // About
    about_title: "À propos de KCC-EliteDriver",
    about_subtitle: "L'histoire d'une excellence née entre Le Caire et Paris",
    about_story_title: "Notre Histoire",
    about_story_p1: "KCC-EliteDriver est née d'une vision simple mais ambitieuse : créer un pont d'excellence entre Le Caire et Paris. Fondée par un entrepreneur biculturel, notre entreprise incarne le meilleur des deux mondes — l'hospitalité légendaire du Moyen-Orient et l'élégance raffinée de la capitale française.",
    about_story_p2: "Depuis nos débuts, nous avons bâti notre réputation sur un principe inébranlable : chaque client mérite une expérience de transport qui transcende les simples attentes. Qu'il s'agisse d'un dirigeant d'entreprise en déplacement au Caire, d'une famille en voyage à Paris, ou d'un diplomate nécessitant un service discret et sécurisé, nous adaptons notre excellence à chaque situation.",
    about_story_p3: "Aujourd'hui, KCC-EliteDriver est reconnue comme une référence dans le transport privé d'excellence, avec un réseau de chauffeurs rigoureusement sélectionnés et une flotte de véhicules haut de gamme entretenus selon les standards les plus exigeants.",
    about_team_title: "Notre Équipe",
    about_team_subtitle: "Des professionnels d'exception au service de votre confort",
    about_team_drivers: "Chauffeurs expérimentés",
    about_team_drivers_desc: "Chaque chauffeur est rigoureusement sélectionné pour son professionnalisme, sa connaissance approfondie des itinéraires du Caire et de Paris, et sa maîtrise parfaite du français, de l'anglais et de l'arabe. Expérience, discrétion et excellence : notre standard.",
    about_team_discretion: "Protocole de discrétion",
    about_team_discretion_desc: "Nos chauffeurs sont formés aux plus hauts standards de confidentialité et de sécurité, garantissant la sérénité totale de nos clients les plus exigeants. Votre vie privée est notre priorité absolue.",
    about_team_training: "Formation continue",
    about_team_training_desc: "Programme de formation régulier incluant conduite défensive avancée, protocoles VIP, protocoles de sécurité renforcés, premiers secours et connaissance complète des véhicules de dernière génération.",
    about_certifications_title: "Certifications & Agréments",
    about_cert_vtc: "VTC Agréé",
    about_cert_vtc_desc: "Licence professionnelle de transport de personnes délivrée par les autorités compétentes. Conformité totale avec la réglementation en vigueur en France et en Égypte.",
    about_cert_insurance: "Assurance Premium",
    about_cert_insurance_desc: "Couverture d'assurance complète tous risques pour chaque trajet : passagers, bagages et véhicule inclus. Protection maximale pour votre tranquillité d'esprit.",
    about_cert_safety: "Formation Sécurité Renforcée",
    about_cert_safety_desc: "Chauffeurs certifiés en conduite défensive avancée et protocoles de sécurité de haut niveau. Entraînement régulier pour répondre aux normes internationales les plus strictes.",
    about_cert_iso: "Standards ISO",
    about_cert_iso_desc: "Processus qualité alignés sur les normes internationales ISO de service premium. Audit et amélioration continue pour garantir l'excellence opérationnelle.",
    about_cta: "Commençons votre voyage d'excellence",
    about_cta_desc: "Découvrez comment KCC-EliteDriver peut transformer vos déplacements.",
    about_values_title: "Nos Valeurs",
    about_value_discretion: "Discrétion",
    about_value_discretion_desc: "Confidentialité absolue. Vos trajets, vos horaires, vos rencontres : tout reste privé.",
    about_value_excellence: "Excellence",
    about_value_excellence_desc: "Nous ne nous contentons jamais du \"bon\". L'excellence est notre standard minimum.",
    about_value_integrity: "Intégrité",
    about_value_integrity_desc: "Transparence totale, tarification honnête, services sans détour.",
    about_value_anticipation: "Anticipation",
    about_value_anticipation_desc: "Nous prévoyons vos besoins avant que vous les exprimiez.",

    booking_step_passenger: "Passager",
    booking_firstname: "Prénom",
    booking_lastname: "Nom",
    booking_email: "Adresse e-mail",
    booking_phone: "Téléphone",
    booking_company_invoice: "Facture entreprise ?",
    booking_flight_number: "Numéro de vol / train",
    booking_meet_greet: "Meet & Greet",
    booking_meet_greet_desc: "Accueil personnalisé à l'arrivée",
    booking_cancellation_policy: "Annulation flexible sans frais jusqu'à 24h avant le départ. Au-delà, des frais de 50% s'appliquent.",
    booking_payment_card: "Carte bancaire",
    booking_payment_cash: "Espèces au chauffeur",
    booking_payment_method: "Mode de paiement",
    fleet_refreshments: "Rafraîchissements premium",
    fleet_disinfection: "Protocole de désinfection",
    services_dropdown_airport: "Transfert Aéroport",
    services_dropdown_hourly: "Mise à disposition",
    services_dropdown_event: "Événement VIP",
    services_dropdown_intercity: "Intercités",
  },

  en: {
    nav_home: "Home",
    nav_fleet: "Fleet",
    nav_services: "Services",
    nav_about: "About",
    nav_booking: "Booking",
    nav_contact: "Contact",
    nav_reserve: "Book Now",

    hero_title: "Excellence at every milestone",
    hero_subtitle: "Seamless service across continents. Complete discretion, punctuality guaranteed, peace of mind with every journey.",
    hero_oneway: "Transfer",
    hero_hourly: "Standby",
    hero_pickup: "Pick-up location",
    hero_dropoff: "Destination",
    hero_date: "Date",
    hero_time: "Time",
    hero_search: "Search",

    axis_title: "Across the globe",
    axis_subtitle: "Local presence, international excellence",
    axis_cairo: "Cairo",
    axis_paris: "Paris",
    axis_international: "International",
    axis_cairo_desc: "Airport transfers, private cultural circuits and business travel. Proven expertise in Egypt's capital and its unique requirements.",
    axis_paris_desc: "Airport transfers, hourly standby, private events. Deep knowledge of the City of Light and its international standards.",
    axis_international_desc: "Long-distance journeys, seamless connections and bespoke services. Attentive to your needs, wherever your travels take you.",

    fleet_title: "Our Fleet",
    fleet_subtitle: "Carefully selected for every occasion",
    fleet_view_all: "View full fleet",
    fleet_passengers: "passengers",
    fleet_luggage: "luggage",
    fleet_book: "Book now",
    fleet_business: "Business",
    fleet_business_desc: "Mercedes-Benz E-Class or equivalent. Discreet comfort and complete connectivity for your professional journeys. Fitted with ultra-high-speed WiFi, intelligent climate control, premium refreshments and international press on board.",
    fleet_first: "First Class",
    fleet_first_desc: "Mercedes-Benz S-Class or equivalent. Absolute excellence for your most important moments. Your private mobile office: ultra-high-speed WiFi, multi-zone climate control, integrated workspace, premium refreshments, curated reading materials.",
    fleet_van: "Van Prestige",
    fleet_van_desc: "Mercedes-Benz V-Class or equivalent. Uncompromised space for official delegations and private events. Fitted with ultra-high-speed WiFi, multi-zone climate control, integrated bar, subtle entertainment and modular seating for your specific needs.",

    fleet_page_title: "Our Fleet",
    fleet_page_subtitle: "Carefully selected for every occasion",
    fleet_amenities: "Amenities",
    fleet_wifi: "Ultra-high-speed Wi-Fi",
    fleet_water: "Mineral water",
    fleet_chargers: "USB chargers",
    fleet_press: "International press",
    fleet_partition: "Driver partition",
    fleet_conference: "Conference space",

    values_title: "Our Commitments",
    values_subtitle: "What defines us",
    values_discretion: "Discretion",
    values_discretion_desc: "Absolute confidentiality. Your journeys, your schedules, your conversations remain strictly private. This is our foremost priority.",
    values_punctuality: "Punctuality",
    values_punctuality_desc: "Constant anticipation. Real-time flight monitoring, proactive management, always arriving ahead of schedule. No waiting, never delayed.",
    values_multilingual: "Multilingual",
    values_multilingual_desc: "French-speaking, English-speaking and Arabic-speaking drivers. Seamless communication in every exchange, cultural understanding across all markets.",

    contact_title: "Contact Us",
    contact_subtitle: "For a bespoke request or a personalised quote",
    contact_name: "Full name",
    contact_email: "Email address",
    contact_phone: "Phone",
    contact_message: "Your message",
    contact_service: "Service type",
    contact_service_airport: "Airport transfer",
    contact_service_hourly: "Hourly standby",
    contact_service_event: "VIP Event",
    contact_service_other: "Other",
    contact_send: "Send",
    contact_success: "Message sent successfully. We will reply as soon as possible.",
    contact_whatsapp: "WhatsApp",
    contact_call: "Call",
    contact_map_coming: "Google Maps — Coming Soon",
    contact_direct: "Direct contact",
    contact_direct_subtitle: "Guaranteed response within 2 hours",

    footer_tagline: "Excellence at every milestone",
    footer_navigation: "Navigation",
    footer_services_title: "Services",
    footer_service_airport: "Airport transfer",
    footer_service_hourly: "Hourly standby",
    footer_service_event: "VIP Event",
    footer_contact_title: "Contact",
    footer_rights: "All rights reserved.",

    services_title: "Our Services",
    services_subtitle: "Services tailored to every situation, every moment",
    services_airport_title: "Airport Transfer",
    services_airport_desc: "Discreet welcome with name placard, real-time flight tracking, luggage assistance to your vehicle. Complimentary waiting time, full services included.",
    services_airport_features: ["Name placard welcome", "Real-time flight tracking", "Luggage assistance", "Complimentary waiting time"],
    services_hourly_title: "Hourly Standby Service",
    services_hourly_desc: "Reserve your vehicle and driver for the day, half-day, or custom duration. Total flexibility: multiple stops, programme changes, guaranteed availability. Perfect for business rounds and events.",
    services_hourly_features: ["Dedicated driver", "Flexible routing", "Customisable duration", "Available 24/7"],
    services_event_title: "VIP Events",
    services_event_desc: "Complete transport coordination for your corporate events, weddings, galas and private celebrations. Multi-vehicle coordination, discreet planning, integrated concierge service.",
    services_event_features: ["Multi-vehicle coordination", "Bespoke planning", "Guest welcome services", "Concierge support"],
    services_city_title: "Inter-City & Long-Distance",
    services_city_desc: "Long-distance journeys in complete comfort: Cairo – Alexandria, Paris – Lyon and beyond. Transparent pricing, intermediate stops available, experienced driver, premium comfort guaranteed.",
    services_city_features: ["Transparent pricing", "Intermediate stops available", "Premium comfort guaranteed", "Experienced driver"],
    services_cta: "Book this service",
    services_learn_more: "Learn more",

    // Services - additional sections
    services_meetgreet_title: "Personalised Airport Welcome",
    services_meetgreet_desc: "Our teams welcome you on arrival with discreet professionalism. Flight detection, complete luggage assistance, clear direction to your vehicle. A service that begins the moment you land.",
    services_meetgreet_features: ["Automatic flight arrival detection", "Complete luggage assistance", "Dedicated path to vehicle", "Support for special requests"],
    services_cultural_title: "Private Cultural Tours",
    services_cultural_desc: "Beyond transportation, we offer bespoke cultural and heritage experiences: private tours of Cairo's historical sites, museums with privileged access, guided discoveries of historic Paris. Available for half-day or full-day arrangements.",
    services_cultural_pricing: "Upon request",
    services_standby_title: "Hourly Standby Service",
    services_standby_desc: "Reserve your vehicle and driver for the day, half-day or custom duration. Total flexibility: multiple stops, programme changes, guaranteed availability. Perfect for business rounds and events.",
    services_standby_format: "Half-day (4 hours) | Full day (8 hours) | Bespoke arrangement",
    services_standby_features: ["Dedicated and attentive driver", "Flexible and adaptable routing", "Customisable duration", "Available 24/7"],
    services_cancellation_title: "Flexible Cancellation Policy",
    services_cancellation_desc: "Free cancellation up to 24 hours before departure. Beyond this, a 50% charge applies to the total booking. For airport Meet & Greet services, cancellation notice must be given 48 hours in advance. We understand that plans change; our terms remain fair.",
    services_cancellation_standard: "Standard: Free up to 24 hours before | 50% thereafter",
    services_cancellation_meetgreet: "With Meet & Greet: Free up to 48 hours before | 50% thereafter",
    services_airports_title: "Airport Transfers",
    services_airports_desc: "All transfers include: flight tracking, luggage assistance, fixed transparent pricing, climate-controlled vehicle.",
    services_airports_includes: "Flight tracking • Luggage assistance • Fixed pricing • Climate-controlled vehicle",
    services_airports_cai: "Cairo (CAI) – Cairo International Airport",
    services_airports_cdg: "Paris (CDG) – Paris Charles de Gaulle Airport",
    services_airports_ory: "Paris (ORY) – Paris Orly Airport",
    services_why_title: "Why KCC-EliteDriver?",
    services_why_discretion: "Discretion & Security",
    services_why_discretion_desc: "Your privacy is sacred. Absolute confidentiality, reinforced security protocols, teams trained in diplomatic and high-level requirements.",
    services_why_expertise: "International Expertise",
    services_why_expertise_desc: "Proven mastery of Cairo and Paris. Understanding of local markets, route knowledge, anticipation of cultural and logistical challenges.",
    services_why_excellence: "Operational Excellence",
    services_why_excellence_desc: "Modern fleet (under 3 years old), multilingual and carefully vetted drivers, guaranteed punctuality, 24/7 service, real-time tracking.",

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
    booking_notes_placeholder: "Notes for driver – Special requests",
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
    booking_success_desc: "Your booking is confirmed. A summary email has been sent. Thank you for your trust.",
    booking_new: "New booking",

    // About
    about_title: "About KCC-EliteDriver",
    about_subtitle: "The story of excellence born between Cairo and Paris",
    about_story_title: "Our Story",
    about_story_p1: "KCC-EliteDriver was born from a simple yet ambitious vision: to create a bridge of excellence between Cairo and Paris. Founded by a bicultural entrepreneur, our company embodies the very best of both worlds — the legendary hospitality of the Middle East and the refined elegance of the French capital.",
    about_story_p2: "Since our inception, we have built our reputation on an unwavering principle: every client deserves a transportation experience that transcends expectations. Whether a corporate executive on business in Cairo, a family travelling in Paris, or a diplomat requiring discreet and secure service, we tailor our excellence to every situation.",
    about_story_p3: "Today, KCC-EliteDriver stands as a benchmark in premium private transportation, with a network of rigorously vetted drivers and a fleet of high-end vehicles maintained to the most exacting standards.",
    about_team_title: "Our Team",
    about_team_subtitle: "Excellence professionals at your service",
    about_team_drivers: "Experienced Drivers",
    about_team_drivers_desc: "Every driver is rigorously vetted for professionalism, deep knowledge of Cairo and Paris routes, and fluent command of French, English and Arabic. Experience, discretion and excellence: our standard.",
    about_team_discretion: "Discretion Protocol",
    about_team_discretion_desc: "Our drivers are trained to the highest standards of confidentiality and security, ensuring complete peace of mind for our most discerning clients. Your privacy is our absolute priority.",
    about_team_training: "Continuous Training",
    about_team_training_desc: "Ongoing training programme including advanced defensive driving, VIP protocols, enhanced security procedures, first aid and comprehensive knowledge of latest-generation vehicles.",
    about_certifications_title: "Certifications & Agreements",
    about_cert_vtc: "VTC Licensed",
    about_cert_vtc_desc: "Professional passenger transportation licence issued by competent authorities. Full compliance with current regulations in France and Egypt.",
    about_cert_insurance: "Premium Insurance",
    about_cert_insurance_desc: "Comprehensive all-risks insurance coverage for every journey: passengers, luggage and vehicle included. Maximum protection for your complete peace of mind.",
    about_cert_safety: "Enhanced Security Training",
    about_cert_safety_desc: "Drivers certified in advanced defensive driving and high-level security protocols. Regular training to meet the strictest international standards.",
    about_cert_iso: "ISO Standards",
    about_cert_iso_desc: "Quality processes aligned with international ISO standards for premium service. Continuous audit and improvement to guarantee operational excellence.",
    about_cta: "Begin Your Journey of Excellence",
    about_cta_desc: "Discover how KCC-EliteDriver can transform your travels.",
    about_values_title: "Our Values",
    about_value_discretion: "Discretion",
    about_value_discretion_desc: "Absolute confidentiality. Your journeys, schedules, meetings: everything remains private.",
    about_value_excellence: "Excellence",
    about_value_excellence_desc: "We never settle for \"good\". Excellence is our minimum standard.",
    about_value_integrity: "Integrity",
    about_value_integrity_desc: "Complete transparency, honest pricing, straightforward service.",
    about_value_anticipation: "Anticipation",
    about_value_anticipation_desc: "We anticipate your needs before you express them.",

    booking_step_passenger: "Passenger",
    booking_firstname: "First name",
    booking_lastname: "Last name",
    booking_email: "Email address",
    booking_phone: "Phone number",
    booking_company_invoice: "Company invoice?",
    booking_flight_number: "Flight / train number",
    booking_meet_greet: "Meet & Greet",
    booking_meet_greet_desc: "Personalised airport welcome on arrival",
    booking_cancellation_policy: "Free cancellation up to 24 hours before departure. Beyond this, a 50% charge applies.",
    booking_payment_card: "Credit card",
    booking_payment_cash: "Cash to driver",
    booking_payment_method: "Payment method",
    fleet_refreshments: "Premium refreshments",
    fleet_disinfection: "Disinfection protocol",
    services_dropdown_airport: "Airport Transfer",
    services_dropdown_hourly: "Hourly Standby",
    services_dropdown_event: "VIP Events",
    services_dropdown_intercity: "Intercity",
  },

  ar: {
    nav_home: "الرئيسية",
    nav_fleet: "الأسطول",
    nav_services: "الخدمات",
    nav_about: "من نحن",
    nav_booking: "الحجز",
    nav_contact: "اتصل بنا",
    nav_reserve: "احجز الآن",

    hero_title: "التميّز في كل كيلومتر",
    hero_subtitle: "استمرارية خدمة بلا تنازل. سرية مطلقة، دقة مضمونة، طمأنينة في كل تنقل مهم.",
    hero_oneway: "رحلة واحدة",
    hero_hourly: "بالساعة",
    hero_pickup: "مكان الانطلاق",
    hero_dropoff: "الوجهة",
    hero_date: "التاريخ",
    hero_time: "الوقت",
    hero_search: "بحث",

    axis_title: "عبر العالم",
    axis_subtitle: "حضور محلي، تميّز دولي",
    axis_cairo: "القاهرة",
    axis_paris: "باريس",
    axis_international: "دولي",
    axis_cairo_desc: "نقل من المطار، جولات ثقافية خاصة وتنقلات أعمال. خبرة مثبتة في العاصمة المصرية ومتطلباتها الفريدة.",
    axis_paris_desc: "نقل من المطار، حجز بالساعة، مناسبات خاصة. معرفة عميقة بمدينة النور ومعاييرها الدولية.",
    axis_international_desc: "رحلات طويلة المسافة، اتصالات سلسة وخدمات مخصصة. منتبهون لاحتياجاتك أينما كنت.",

    fleet_title: "أسطولنا",
    fleet_subtitle: "مختارة بعناية لكل سياق",
    fleet_view_all: "عرض الأسطول بالكامل",
    fleet_passengers: "ركاب",
    fleet_luggage: "حقائب",
    fleet_book: "احجز الآن",
    fleet_business: "بزنس",
    fleet_business_desc: "مرسيدس الفئة E أو ما يعادلها. راحة متحفظة واتصال كامل لتنقلاتك المهنية. مجهزة بواي فاي فائق السرعة، تكييف ذكي، مرطبات فاخرة وصحافة فرنسية ودولية على متنها.",
    fleet_first: "الدرجة الأولى",
    fleet_first_desc: "مرسيدس الفئة S أو ما يعادلها. التميّز المطلق لأهم لحظاتك. مكتبك المتنقل الخاص: واي فاي فائق السرعة، تكييف متعدد المناطق، مساحات عمل مدمجة، مرطبات فاخرة، قراءة مختارة.",
    fleet_van: "فان بريستيج",
    fleet_van_desc: "مرسيدس الفئة V أو ما يعادلها. مساحة بلا تنازل للوفود الرسمية والمناسبات الخاصة. مجهزة بواي فاي فائق السرعة، تكييف متعدد المناطق، بار مدمج، ترفيه راقٍ وتكوين قابل للتعديل حسب احتياجاتك.",

    fleet_page_title: "أسطولنا",
    fleet_page_subtitle: "مختارة بعناية لكل سياق",
    fleet_amenities: "التجهيزات",
    fleet_wifi: "واي فاي فائق السرعة",
    fleet_water: "مياه معدنية",
    fleet_chargers: "شواحن USB",
    fleet_press: "صحافة فرنسية ودولية",
    fleet_partition: "فاصل السائق",
    fleet_conference: "مساحة اجتماعات",

    values_title: "التزاماتنا",
    values_subtitle: "ما يُعرّفنا",
    values_discretion: "السرية",
    values_discretion_desc: "سرية مطلقة. رحلاتك، مواعيدك، محادثاتك تبقى خاصة تماماً. هذه أولويتنا الأولى.",
    values_punctuality: "الدقة",
    values_punctuality_desc: "استباق مستمر. تتبع الرحلات في الوقت الفعلي، إدارة الطوارئ، وصول دائماً قبل الموعد. لا انتظار، لا تأخير أبداً.",
    values_multilingual: "متعدد اللغات",
    values_multilingual_desc: "سائقون يتحدثون الفرنسية والإنجليزية والعربية. سلاسة تامة في كل تواصل، فهم للفروق الثقافية في كل سوق.",

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

    services_title: "خدماتنا",
    services_subtitle: "خدمات مُصممة لكل موقف، كل لحظة",
    services_airport_title: "نقل من المطار",
    services_airport_desc: "استقبال راقٍ بلوحة اسم، تتبع رحلتك في الوقت الفعلي، مساعدة في الأمتعة حتى مركبتك. وقت انتظار مجاني، خدمات شاملة.",
    services_airport_features: ["استقبال بلوحة اسم", "تتبع الرحلات مباشرة", "مساعدة في الأمتعة", "وقت انتظار مجاني"],
    services_hourly_title: "حجز بالساعة",
    services_hourly_desc: "احجز مركبتك وسائقك ليوم كامل أو نصف يوم أو مدة محددة. مرونة تامة: توقفات متعددة، تغيير البرنامج، توفر مضمون. مثالي لجولات الأعمال والمناسبات.",
    services_hourly_features: ["سائق مخصص", "مسار مرن", "مدة قابلة للتعديل", "متوفر 24/7"],
    services_event_title: "أحداث VIP",
    services_event_desc: "تنظيم كامل للنقل في مناسباتك المؤسسية، حفلات الزفاف، الحفلات الراقية والسهرات الخاصة. تنسيق متعدد المركبات، تخطيط متحفظ، خدمة كونسيرج مدمجة.",
    services_event_features: ["تنسيق متعدد المركبات", "تخطيط مخصص", "استقبال الضيوف", "خدمة كونسيرج"],
    services_city_title: "بين المدن والمسافات الطويلة",
    services_city_desc: "رحلات طويلة المسافة بكل راحة: القاهرة – الإسكندرية، باريس – ليون وما بعدها. تسعير شفاف، توقفات وسيطة ممكنة، سائق متمرس، راحة فاخرة مضمونة.",
    services_city_features: ["تسعير شفاف", "توقفات وسيطة ممكنة", "راحة فاخرة مضمونة", "سائق متمرس"],
    services_cta: "حجز هذه الخدمة",
    services_learn_more: "اعرف المزيد",

    // Services - additional sections
    services_meetgreet_title: "استقبال شخصي في المطارات",
    services_meetgreet_desc: "فرقنا تستقبلك عند وصولك بتحفظ مهني. تتبع رحلتك، مساعدة في الأمتعة، توجيه سلس إلى مركبتك. خدمة تبدأ لحظة هبوطك.",
    services_meetgreet_features: ["كشف تلقائي لوصولك", "مساعدة كاملة في الأمتعة", "مسار مخصص إلى المركبة", "دعم لاحتياجاتك الخاصة"],
    services_cultural_title: "جولات ثقافية خاصة",
    services_cultural_desc: "أبعد من النقل، نقدم تجارب ثقافية وتراثية مخصصة: جولات خاصة في المواقع التاريخية بالقاهرة، متاحف بدخول مميز، اكتشافات في باريس التاريخية. متوفرة لنصف يوم أو يوم كامل.",
    services_cultural_pricing: "عند الطلب",
    services_standby_title: "حجز بالساعة",
    services_standby_desc: "احجز مركبتك وسائقك ليوم كامل أو نصف يوم أو مدة محددة. مرونة تامة: توقفات متعددة، تغيير البرنامج، توفر مضمون. مثالي لجولات الأعمال والمناسبات.",
    services_standby_format: "نصف يوم (٤ ساعات) | يوم كامل (٨ ساعات) | حسب الطلب",
    services_standby_features: ["سائق مخصص ومنتبه", "مسار مرن وقابل للتعديل", "مدة قابلة للتعديل حسب احتياجاتك", "متوفر 24/7"],
    services_cancellation_title: "سياسة إلغاء مرنة",
    services_cancellation_desc: "إلغاء مجاني حتى 24 ساعة قبل الموعد. بعد ذلك، تُطبق رسوم 50% من المبلغ الإجمالي. لحجوزات الاستقبال الشخصي في المطار، مهلة الإلغاء 48 ساعة. نتفهم أن خططك قد تتغير؛ شروطنا تبقى عادلة.",
    services_cancellation_standard: "قياسي: مجاني حتى 24 ساعة قبل | 50% بعد ذلك",
    services_cancellation_meetgreet: "مع الاستقبال الشخصي: مجاني حتى 48 ساعة قبل | 50% بعد ذلك",
    services_airports_title: "نقل المطارات",
    services_airports_desc: "جميع التنقلات تشمل: تتبع الرحلة، مساعدة في الأمتعة، تسعير ثابت بلا مفاجآت، مركبة مكيفة.",
    services_airports_includes: "تتبع الرحلة • مساعدة الأمتعة • تسعير ثابت • مركبة مكيفة",
    services_airports_cai: "القاهرة (CAI) – مطار القاهرة الدولي",
    services_airports_cdg: "باريس (CDG) – مطار باريس شارل ديغول",
    services_airports_ory: "باريس (ORY) – مطار باريس أورلي",
    services_why_title: "لماذا KCC-EliteDriver؟",
    services_why_discretion: "السرية والأمان",
    services_why_discretion_desc: "خصوصيتك مقدسة. سرية مطلقة، بروتوكولات أمان معززة، فرق مدربة على المتطلبات الدبلوماسية والرفيعة المستوى.",
    services_why_expertise: "خبرة دولية",
    services_why_expertise_desc: "إتقان مثبت للقاهرة وباريس. فهم الأسواق المحلية، معرفة الطرق، استباق التحديات الثقافية واللوجستية.",
    services_why_excellence: "تميّز تشغيلي",
    services_why_excellence_desc: "أسطول حديث (أقل من 3 سنوات)، سائقون متعددو اللغات ومختارون بعناية، دقة مضمونة، خدمة 24/7، تتبع في الوقت الفعلي.",

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
    booking_notes_placeholder: "ملاحظات للسائق – طلبات خاصة",
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
    booking_success_desc: "حجزك مؤكد. تم إرسال بريد إلكتروني بالملخص. نشكرك على ثقتك.",
    booking_new: "حجز جديد",

    // About
    about_title: "عن KCC-EliteDriver",
    about_subtitle: "قصة تميّز وُلدت بين القاهرة وباريس",
    about_story_title: "قصتنا",
    about_story_p1: "وُلدت KCC-EliteDriver من رؤية بسيطة لكن طموحة: إنشاء جسر من التميّز بين القاهرة وباريس. أسسها رائد أعمال ثنائي الثقافة، وتجسّد شركتنا أفضل ما في العالمين — الضيافة الأسطورية للشرق الأوسط والأناقة الراقية للعاصمة الفرنسية.",
    about_story_p2: "منذ بداياتنا، بنينا سمعتنا على مبدأ لا يتزعزع: كل عميل يستحق تجربة نقل تتجاوز مجرد التوقعات. سواء كان مديراً تنفيذياً في رحلة عمل بالقاهرة، أو عائلة في سفر إلى باريس، أو دبلوماسياً يحتاج خدمة سرية وآمنة، نكيّف تميّزنا مع كل موقف.",
    about_story_p3: "اليوم، تُعدّ KCC-EliteDriver مرجعاً في النقل الخاص المتميّز، مع شبكة من السائقين المختارين بصرامة وأسطول من المركبات الفاخرة المُصانة وفق أعلى المعايير وأكثرها تطلباً.",
    about_team_title: "فريقنا",
    about_team_subtitle: "محترفون استثنائيون في خدمة راحتك",
    about_team_drivers: "سائقون متمرسون",
    about_team_drivers_desc: "يتم اختيار كل سائق بصرامة لاحترافيته ومعرفته العميقة بمسارات القاهرة وباريس وإتقانه التام للفرنسية والإنجليزية والعربية. الخبرة والسرية والتميّز: معيارنا.",
    about_team_discretion: "بروتوكول السرية",
    about_team_discretion_desc: "سائقونا مدربون على أعلى معايير السرية والأمان، مما يضمن الطمأنينة الكاملة لعملائنا الأكثر تطلباً. خصوصيتك أولويتنا المطلقة.",
    about_team_training: "تدريب مستمر",
    about_team_training_desc: "برنامج تدريب منتظم يشمل القيادة الدفاعية المتقدمة، بروتوكولات VIP، بروتوكولات أمان معززة، إسعافات أولية ومعرفة شاملة بأحدث المركبات.",
    about_certifications_title: "الشهادات والاعتمادات",
    about_cert_vtc: "VTC معتمد",
    about_cert_vtc_desc: "رخصة نقل ركاب مهنية صادرة عن الجهات المختصة. التزام كامل بالتنظيمات المعمول بها في فرنسا ومصر.",
    about_cert_insurance: "تأمين متميز",
    about_cert_insurance_desc: "تغطية تأمين شاملة لكل رحلة: الركاب والأمتعة والمركبة مشمولة. أقصى حماية لراحة بالك.",
    about_cert_safety: "تدريب أمني معزز",
    about_cert_safety_desc: "سائقون معتمدون في القيادة الدفاعية المتقدمة وبروتوكولات الأمان الرفيعة. تدريب منتظم لتلبية أشد المعايير الدولية صرامة.",
    about_cert_iso: "معايير ISO",
    about_cert_iso_desc: "عمليات جودة متوافقة مع معايير ISO الدولية للخدمة المتميزة. مراجعة وتحسين مستمر لضمان التميّز التشغيلي.",
    about_cta: "لنبدأ رحلة التميّز معاً",
    about_cta_desc: "اكتشف كيف يمكن لـ KCC-EliteDriver أن تحوّل تنقلاتك.",
    about_values_title: "قيمنا",
    about_value_discretion: "السرية",
    about_value_discretion_desc: "سرية مطلقة. رحلاتك، مواعيدك، لقاءاتك: كل شيء يبقى خاصاً.",
    about_value_excellence: "التميّز",
    about_value_excellence_desc: "لا نكتفي أبداً بـ \"الجيد\". التميّز هو معيارنا الأدنى.",
    about_value_integrity: "النزاهة",
    about_value_integrity_desc: "شفافية كاملة، تسعير صادق، خدمات بلا التفاف.",
    about_value_anticipation: "الاستباق",
    about_value_anticipation_desc: "نتوقع احتياجاتك قبل أن تعبّر عنها.",

    booking_step_passenger: "الراكب",
    booking_firstname: "الاسم الأول",
    booking_lastname: "اسم العائلة",
    booking_email: "البريد الإلكتروني",
    booking_phone: "رقم الهاتف",
    booking_company_invoice: "فاتورة شركة؟",
    booking_flight_number: "رقم الرحلة / القطار",
    booking_meet_greet: "استقبال شخصي",
    booking_meet_greet_desc: "استقبال شخصي عند الوصول",
    booking_cancellation_policy: "إلغاء مجاني حتى 24 ساعة قبل الموعد. بعد ذلك، تُطبق رسوم 50%.",
    booking_payment_card: "بطاقة ائتمان",
    booking_payment_cash: "نقداً للسائق",
    booking_payment_method: "طريقة الدفع",
    fleet_refreshments: "مرطبات فاخرة",
    fleet_disinfection: "بروتوكول التعقيم",
    services_dropdown_airport: "نقل من المطار",
    services_dropdown_hourly: "حجز بالساعة",
    services_dropdown_event: "أحداث VIP",
    services_dropdown_intercity: "بين المدن",
  },
};
