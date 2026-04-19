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
  fleet_suv: string;
  fleet_suv_desc: string;

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
  values_anticipation: string;
  values_anticipation_desc: string;

  // Contact
  contact_title: string;
  contact_subtitle: string;
  contact_description: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_message: string;
  contact_service: string;
  contact_service_airport: string;
  contact_service_hourly: string;
  contact_service_event: string;
  contact_service_other: string;
  contact_service_city: string;
  contact_service_tours: string;
  contact_send: string;
  contact_success: string;
  contact_whatsapp: string;
  contact_call: string;
  contact_map_coming: string;
  contact_direct: string;
  contact_direct_subtitle: string;
  contact_form_title: string;
  contact_form_desc: string;
  contact_name_placeholder: string;
  contact_email_placeholder: string;
  contact_email_helper: string;
  contact_phone_placeholder: string;
  contact_phone_helper: string;
  contact_service_placeholder: string;
  contact_service_helper: string;
  contact_message_placeholder: string;
  contact_message_helper: string;
  contact_privacy_checkbox: string;
  contact_privacy_desc: string;
  contact_submit_helper: string;
  contact_success_title: string;
  contact_email_direct: string;
  contact_email_direct_helper: string;
  contact_whatsapp_helper: string;
  contact_call_helper: string;
  contact_call_number: string;
  contact_call_hours: string;
  contact_faq_title: string;
  contact_faq_q1: string;
  contact_faq_a1: string;
  contact_faq_q2: string;
  contact_faq_a2: string;
  contact_faq_q3: string;
  contact_faq_a3: string;
  contact_faq_q4: string;
  contact_faq_a4: string;
  contact_faq_q5: string;
  contact_faq_a5: string;

  // Footer
  footer_tagline: string;
  footer_description: string;
  footer_navigation: string;
  footer_services_title: string;
  footer_service_airport: string;
  footer_service_hourly: string;
  footer_service_event: string;
  footer_service_city: string;
  footer_service_cultural: string;
  footer_contact_title: string;
  footer_whatsapp: string;
  footer_address: string;
  footer_hours: string;
  footer_rights: string;
  footer_privacy_link: string;
  footer_terms_link: string;
  footer_cancellation_link: string;
  footer_legal_link: string;

  // Header - services dropdown enriched
  services_dropdown_city: string;
  services_dropdown_cultural: string;
  services_dropdown_view_all: string;

  // Legal pages
  privacy_title: string;
  privacy_intro: string;
  privacy_data_collected_title: string;
  privacy_data_collected: string;
  privacy_usage_title: string;
  privacy_usage: string;
  privacy_sharing_title: string;
  privacy_sharing: string;
  privacy_rights_title: string;
  privacy_rights: string;
  privacy_security_title: string;
  privacy_security: string;
  privacy_contact: string;

  terms_title: string;
  terms_acceptance: string;
  terms_eligibility: string;
  terms_booking: string;
  terms_behaviour: string;
  terms_liability: string;
  terms_ip: string;
  terms_modification: string;

  cancellation_title: string;
  cancellation_standard_title: string;
  cancellation_standard: string;
  cancellation_meetgreet_title: string;
  cancellation_meetgreet: string;
  cancellation_vip_title: string;
  cancellation_vip: string;
  cancellation_how_title: string;
  cancellation_how: string;
  cancellation_refund_title: string;
  cancellation_refund: string;

  legal_title: string;
  legal_company: string;
  legal_hosting: string;
  legal_ip: string;

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
  booking_distance: string;
  booking_duration: string;
  booking_estimate: string;
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
  booking_hours_label: string;
  booking_hours_helper: string;
  booking_hours_more: string;
  booking_quote_only: string;
  booking_quote_whatsapp_cta: string;
  booking_quote_whatsapp_prefix: string;
  booking_sphinx_surcharge: string;
  booking_price_label: string;

  // Booking - service descriptions (step 1)
  booking_service_airport_desc: string;
  booking_service_hourly_desc: string;
  booking_service_event_desc: string;
  booking_service_city_desc: string;

  // Booking - step subtitles
  booking_select_service_desc: string;
  booking_details_title: string;
  booking_details_desc: string;
  booking_passenger_title: string;
  booking_passenger_desc: string;
  booking_vehicle_title: string;
  booking_vehicle_desc: string;
  booking_summary_desc: string;

  // Booking - field labels & helpers
  booking_pickup_field: string;
  booking_destination_field: string;
  booking_date_field: string;
  booking_date_helper: string;
  booking_time_field: string;
  booking_time_helper: string;
  booking_email_helper: string;
  booking_phone_helper: string;
  booking_notes_helper: string;
  booking_flight_helper: string;
  booking_meet_greet_helper: string;
  booking_vehicle_helper: string;

  // Booking - payment helpers
  booking_payment_card_desc: string;
  booking_payment_cash_desc: string;
  booking_payment_card_helper: string;
  booking_payment_cash_helper: string;
  booking_payment_reassurance: string;

  // Booking - confirmation screen extras
  booking_back_home: string;

  // Booking - confirmation page details
  booking_confirmation_details_title: string;
  booking_confirmation_number: string;
  booking_confirmation_email_label: string;
  booking_confirmation_support: string;
  booking_confirmation_status: string;
  booking_confirmation_status_confirmed: string;
  booking_confirmation_details_helper: string;
  booking_next_steps_title: string;
  booking_next_step_1: string;
  booking_next_step_2: string;
  booking_next_step_3: string;
  booking_next_step_4: string;
  booking_cancellation_reminder: string;

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

  // Auth & shared
  auth_email: string;
  auth_password: string;
  auth_password_confirm: string;
  auth_login: string;
  auth_login_loading: string;
  auth_signup: string;
  auth_signup_loading: string;
  auth_logout: string;
  auth_no_account: string;
  auth_has_account: string;
  auth_verify_email: string;
  auth_verify_email_desc: string;
  auth_back_login: string;
  auth_password_min: string;
  auth_password_mismatch: string;

  // Header auth
  header_my_space: string;
  header_login: string;

  // Admin
  admin_title: string;
  admin_login_title: string;
  admin_login_desc: string;
  admin_dashboard: string;
  admin_bookings: string;
  admin_providers: string;
  admin_drivers: string;
  admin_all: string;
  admin_pending: string;
  admin_confirmed: string;
  admin_completed: string;
  admin_cancelled: string;
  admin_no_bookings: string;
  admin_client: string;
  admin_service: string;
  admin_date: string;
  admin_route: string;
  admin_status: string;
  admin_driver: string;
  admin_actions: string;
  admin_edit: string;
  admin_close: string;
  admin_unassigned: string;
  admin_add: string;
  admin_save: string;
  admin_create: string;
  admin_edit_label: string;
  admin_new_provider: string;
  admin_edit_provider: string;
  admin_delete_provider_confirm: string;
  admin_no_providers: string;
  admin_new_driver: string;
  admin_edit_driver: string;
  admin_delete_driver_confirm: string;
  admin_no_drivers: string;
  admin_provider_label: string;
  admin_select: string;
  admin_firstname: string;
  admin_lastname: string;
  admin_phone: string;
  admin_email_label: string;
  admin_name: string;

  // Client
  client_my_bookings: string;
  client_new_booking: string;
  client_no_bookings: string;
  client_book_now: string;
  client_details: string;
  client_rebook: string;
  client_booking_detail: string;
  client_back_bookings: string;
  client_modify: string;
  client_cancel_booking: string;
  client_cancel_confirm: string;
  client_cancel_yes: string;
  client_cancel_no: string;
  client_save: string;
  client_cancel_edit: string;
  client_login_title: string;
  client_login_desc: string;
  client_register_title: string;
  client_register_desc: string;

  // Booking status
  status_pending: string;
  status_confirmed: string;
  status_completed: string;
  status_cancelled: string;

  // Booking detail fields
  field_service: string;
  field_pickup: string;
  field_dropoff: string;
  field_date: string;
  field_time: string;
  field_vehicle: string;
  field_passengers: string;
  field_luggage: string;
  field_flight: string;
  field_notes: string;
  booking_submitting: string;
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
    fleet_suv: "SUV Prestige",
    fleet_suv_desc: "Soueast S07 ou équivalent. Technologie premium et espace généreux pour vos déplacements exigeants. Équipé de WiFi très haut débit, climatisation multi-zones, rafraîchissements premium et presse française et internationale à bord.",

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
    values_anticipation: "Anticipation",
    values_anticipation_desc: "Chaque détail est prévu à l'avance. Itinéraires optimisés, alternatives préparées, besoins anticipés avant même d'être exprimés.",

    contact_title: "Contactez-nous",
    contact_subtitle: "Pour une demande sur mesure, un devis personnalisé ou des questions sur nos services.",
    contact_description: "Notre équipe est disponible pour vous servir. Réponse garantie sous 2 heures.",
    contact_name: "Nom complet",
    contact_email: "Adresse e-mail",
    contact_phone: "Téléphone",
    contact_message: "Votre message",
    contact_service: "Type de service",
    contact_service_airport: "Transfer Aéroport",
    contact_service_hourly: "Mise à Disposition Horaire",
    contact_service_event: "Événement VIP",
    contact_service_other: "Autre demande",
    contact_service_city: "Intercités & Longue Distance",
    contact_service_tours: "Circuits Touristiques Privés",
    contact_send: "Envoyer mon message",
    contact_success: "Votre message a été envoyé avec succès. Notre équipe vous répondra sous peu à l'adresse email fournie.",
    contact_whatsapp: "Discuter sur WhatsApp",
    contact_call: "Appeler maintenant",
    contact_map_coming: "Google Maps — Bientôt disponible",
    contact_direct: "Contact direct",
    contact_direct_subtitle: "Réponse garantie sous 2 heures (Lun-Ven 8h-20h / Sam-Dim 9h-18h)",
    contact_form_title: "Envoyez-nous un message",
    contact_form_desc: "Complétez ce formulaire. Nous vous répondrons rapidement.",
    contact_name_placeholder: "Jean Dupont",
    contact_email_placeholder: "jean.dupont@example.com",
    contact_email_helper: "Nous vous répondrons à cette adresse.",
    contact_phone_placeholder: "+33 6 XX XX XX XX",
    contact_phone_helper: "Pour vous contacter directement si nécessaire.",
    contact_service_placeholder: "Sélectionnez un service",
    contact_service_helper: "Cela nous aide à diriger votre message au bon service.",
    contact_message_placeholder: "Décrivez votre demande : type de service, dates, besoins spécifiques, préférences...",
    contact_message_helper: "Plus vous nous donnez de détails, plus nous pourrons personnaliser notre réponse.",
    contact_privacy_checkbox: "J'accepte que mes données soient traitées pour répondre à ma demande",
    contact_privacy_desc: "Vos données personnelles seront traitées conformément à notre Politique de confidentialité.",
    contact_submit_helper: "Nos équipes répondent généralement sous 2 heures pendant les heures de bureau.",
    contact_success_title: "Merci !",
    contact_email_direct: "contact@kccelitedriver.com",
    contact_email_direct_helper: "Réponse garantie sous 2 heures.",
    contact_whatsapp_helper: "Chat instantané. Disponible 24h/24, réponse rapide.",
    contact_call_helper: "Parlez directement à un agent. Gratuit depuis la France.",
    contact_call_number: "+33 1 23 45 67 89",
    contact_call_hours: "Lun-Ven 08:00-20:00 / Sam-Dim 09:00-18:00 (CET)",
    contact_faq_title: "Questions fréquemment posées",
    contact_faq_q1: "Quel est votre délai de réponse ?",
    contact_faq_a1: "Nous garantissons une réponse sous 2 heures pendant les heures de bureau (lun-ven 8h-20h, sam-dim 9h-18h).",
    contact_faq_q2: "Puis-je modifier ma réservation ?",
    contact_faq_a2: "Oui. Annulation gratuite jusqu'à 24h avant le départ (48h pour Meet & Greet à l'aéroport).",
    contact_faq_q3: "Proposez-vous des services pour les groupes ?",
    contact_faq_a3: "Absolument. Notre Van Prestige accueille jusqu'à 7 passagers. Pour les délégations plus importantes, nous coordonnons plusieurs véhicules.",
    contact_faq_q4: "Comment sont traitées mes données personnelles ?",
    contact_faq_a4: "Vos données sont traitées de manière confidentielle conformément à nos standards de sécurité les plus stricts.",
    contact_faq_q5: "Acceptez-vous les paiements en espèces ?",
    contact_faq_a5: "Oui, réglez en espèces directement auprès du chauffeur. Tarif fixe, pas de surprise. Reçu fourni.",

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
    booking_distance: "Distance",
    booking_duration: "Durée",
    booking_estimate: "Estimation",
    booking_select_service: "Sélectionnez votre type de service",
    booking_next: "Continuer",
    booking_prev: "Précédent",
    booking_passengers_label: "Nombre de passagers",
    booking_luggage_label: "Nombre de bagages",
    booking_notes_label: "Demandes particulières",
    booking_notes_placeholder: "À l'attention de votre chauffeur : siège enfant requis, accès handicapé, musique douce, silence, etc.",
    booking_select_vehicle: "Choisissez votre véhicule",
    booking_summary: "Récapitulatif de votre réservation",
    booking_service_label: "Service",
    booking_date_label: "Date",
    booking_time_label: "Heure",
    booking_pickup_label: "Prise en charge",
    booking_dropoff_label: "Destination",
    booking_vehicle_label: "Véhicule",
    booking_confirm: "Confirmer la réservation",
    booking_success: "Réservation confirmée !",
    booking_success_desc: "Merci ! Votre réservation est confirmée. Un email de confirmation contenant tous les détails de votre réservation a été envoyé. Nous vous remercions de votre confiance.",
    booking_new: "Nouvelle réservation",

    booking_step_passenger: "Passager",
    booking_firstname: "Prénom",
    booking_lastname: "Nom",
    booking_email: "Adresse e-mail",
    booking_phone: "Téléphone",
    booking_company_invoice: "Facturation à titre professionnel",
    booking_flight_number: "Numéro de vol / train",
    booking_meet_greet: "Meet & Greet",
    booking_meet_greet_desc: "Accueil personnalisé à votre arrivée avec détection de votre vol.",
    booking_cancellation_policy: "Annulation flexible sans frais jusqu'à 24 heures avant votre départ. Au-delà, des frais de 50% s'appliquent. Pour les services avec Meet & Greet à l'aéroport, délai d'annulation : 48 heures. Nous comprenons que vos plans peuvent changer ; nous restons justes dans nos conditions.",
    booking_payment_card: "Carte bancaire",
    booking_payment_cash: "Paiement en espèces",
    booking_payment_method: "Mode de paiement",
    booking_hours_label: "Durée (heures)",
    booking_hours_helper: "Minimum 4 heures. Forfait à 12 heures. Au-delà, sur devis.",
    booking_hours_more: "12h+ (sur devis)",
    booking_quote_only: "Sur devis",
    booking_quote_whatsapp_cta: "Demander un devis sur WhatsApp",
    booking_quote_whatsapp_prefix: "Demande de devis",
    booking_sphinx_surcharge: "Supplément Aéroport du Sphinx",
    booking_price_label: "Prix trajet",

    // Booking - service descriptions
    booking_service_airport_desc: "Transferts entre les aéroports et vos destinations.",
    booking_service_hourly_desc: "Réservez votre chauffeur pour une durée flexible.",
    booking_service_event_desc: "Transport pour vos événements privés ou professionnels.",
    booking_service_city_desc: "Trajets longue distance avec confort premium.",

    // Booking - step subtitles
    booking_select_service_desc: "Choisissez le service qui correspond à votre besoin.",
    booking_details_title: "Détails de votre trajet",
    booking_details_desc: "Précisez votre itinéraire et vos horaires.",
    booking_passenger_title: "Vos informations",
    booking_passenger_desc: "Complétez vos coordonnées. Vos données restent confidentielles.",
    booking_vehicle_title: "Choisissez votre véhicule",
    booking_vehicle_desc: "Sélectionnez le véhicule adapté à votre profil et besoins.",
    booking_summary_desc: "Vérifiez tous les détails avant de confirmer.",

    // Booking - field labels & helpers
    booking_pickup_field: "Lieu de prise en charge",
    booking_destination_field: "Destination",
    booking_date_field: "Date de départ",
    booking_date_helper: "Sélectionnez la date de votre départ.",
    booking_time_field: "Heure de départ",
    booking_time_helper: "Indiquez l'heure exacte de votre prise en charge.",
    booking_email_helper: "Nous vous enverrons une confirmation et les détails de votre réservation.",
    booking_phone_helper: "Numéro utilisé pour le suivi de votre vol.",
    booking_notes_helper: "Décrivez vos demandes spéciales. Nos chauffeurs les honorent avec discrétion.",
    booking_flight_helper: "Nous suivrons votre arrivée en temps réel pour une prise en charge optimale.",
    booking_meet_greet_helper: "Nos équipes vous accueilleront discrètement et vous accompagneront jusqu'à votre véhicule.",
    booking_vehicle_helper: "Tous nos véhicules sont entretenus à des standards premium et confiés à des chauffeurs rigoureusement sélectionnés.",

    // Booking - payment helpers
    booking_payment_card_desc: "Paiement sécurisé avec SSL. Visa, Mastercard, American Express acceptées.",
    booking_payment_cash_desc: "Réglez directement auprès de votre chauffeur en devises locales.",
    booking_payment_card_helper: "Votre paiement est sécurisé par encryptage SSL 256-bit.",
    booking_payment_cash_helper: "Pratique et discret. Tarif fixe sans surprise. Reçu fourni.",
    booking_payment_reassurance: "Tous les paiements sont traités de manière confidentielle et conforme aux standards internationaux de sécurité. Votre vie privée est protégée.",

    // Booking - confirmation extras
    booking_back_home: "Retour à l'accueil",

    // Booking - confirmation page details
    booking_confirmation_details_title: "Vos informations de réservation",
    booking_confirmation_number: "Numéro de réservation",
    booking_confirmation_email_label: "Email de confirmation",
    booking_confirmation_support: "Support 24/7",
    booking_confirmation_status: "Statut",
    booking_confirmation_status_confirmed: "Confirmée",
    booking_confirmation_details_helper: "Conservez ce numéro pour toute modification ou question concernant votre réservation.",
    booking_next_steps_title: "Ce qui se passe ensuite",
    booking_next_step_1: "Un email de confirmation contenant tous les détails a été envoyé.",
    booking_next_step_2: "Votre chauffeur vous sera assigné 24 heures avant votre départ.",
    booking_next_step_3: "Vous recevrez ses coordonnées et une photo professionnelle.",
    booking_next_step_4: "Notre équipe est disponible 24h/24 pour toute question.",
    booking_cancellation_reminder: "Rappel : Annulation gratuite jusqu'à 24h avant le départ. Au-delà, des frais de 50% s'appliquent. Pour les services avec Meet & Greet à l'aéroport, délai d'annulation : 48h.",

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

    fleet_refreshments: "Rafraîchissements premium",
    fleet_disinfection: "Protocole de désinfection",
    services_dropdown_airport: "Transfert Aéroport",
    services_dropdown_hourly: "Mise à disposition",
    services_dropdown_event: "Événement VIP",
    services_dropdown_intercity: "Intercités",
    services_dropdown_city: "Intercités & Longue Distance",
    services_dropdown_cultural: "Circuits Touristiques Privés",
    services_dropdown_view_all: "Voir tous les services",

    footer_description: "Service de chauffeur privé haut de gamme entre Le Caire et Paris. Discrétion, ponctualité, excellence.",
    footer_service_city: "Intercités & Longue Distance",
    footer_service_cultural: "Circuits Touristiques Privés",
    footer_whatsapp: "Chat WhatsApp",
    footer_address: "Paris, France | Cairo, Egypt",
    footer_hours: "Lun-Ven 08:00-20:00 / Sam-Dim 09:00-18:00 (CET)",
    footer_privacy_link: "Politique de confidentialité",
    footer_terms_link: "Conditions d'utilisation",
    footer_cancellation_link: "Politique d'annulation",
    footer_legal_link: "Mentions légales",

    privacy_title: "Politique de Confidentialité",
    privacy_intro: "Chez KCC-EliteDriver, votre vie privée est notre priorité absolue. Cette politique décrit comment nous collectons, utilisons et protégeons vos données personnelles.",
    privacy_data_collected_title: "Données collectées",
    privacy_data_collected: "Informations personnelles (nom, email, téléphone), données de réservation (date, horaires, lieux), données de paiement (traitées par processeur sécurisé), données de localisation (GPS en temps réel, avec consentement).",
    privacy_usage_title: "Utilisation des données",
    privacy_usage: "Traitement de votre réservation, communication avec vous (confirmations, mises à jour), amélioration de nos services, respect des obligations légales.",
    privacy_sharing_title: "Partage des données",
    privacy_sharing: "Partagées UNIQUEMENT avec le chauffeur assigné (pour localisation en temps réel). Jamais vendues à des tiers. Conformité RGPD stricte.",
    privacy_rights_title: "Droits de l'utilisateur",
    privacy_rights: "Droit d'accès à vos données, droit de rectification, droit à l'oubli, droit à la portabilité.",
    privacy_security_title: "Sécurité",
    privacy_security: "Encryptage SSL 256-bit, serveurs sécurisés (compliance RGPD), politique d'accès restreint.",
    privacy_contact: "Questions sur nos pratiques de confidentialité ? contact@kccelitedriver.com",

    terms_title: "Conditions d'Utilisation",
    terms_acceptance: "L'utilisation du site et services implique acceptation de ces conditions.",
    terms_eligibility: "Vous devez être majeur (18+), responsable de vos comptes/paiements, et respecter toutes les lois applicables.",
    terms_booking: "Tarifs fixes, pas de surprise. Paiement avant ou après la course (selon option). Carte bancaire ou espèces acceptés.",
    terms_behaviour: "Vous acceptez de traiter nos chauffeurs avec respect et dignité, de ne pas utiliser le service de manière abusive, et de ne pas divulguer les coordonnées du chauffeur.",
    terms_liability: "KCC-EliteDriver n'est pas responsable des retards dus au trafic ou conditions météo, incidents causés par le passager, perte ou dommage de bagages (sauf négligence).",
    terms_ip: "Contenu du site : © KCC-EliteDriver. Pas de reproduction sans permission.",
    terms_modification: "Nous pouvons modifier ces conditions à tout moment. Notification via email.",

    cancellation_title: "Politique d'Annulation Flexible",
    cancellation_standard_title: "Services Standard",
    cancellation_standard: "Annulation gratuite jusqu'à 24h avant le départ. Au-delà : frais de 50% sur le montant total. Modification gratuite jusqu'à 24h avant.",
    cancellation_meetgreet_title: "Avec Meet & Greet Aéroport",
    cancellation_meetgreet: "Annulation gratuite jusqu'à 48h avant. Entre 24h et 48h : frais de 50%. Moins de 24h : frais de 100% (absence sans notification).",
    cancellation_vip_title: "Événements VIP",
    cancellation_vip: "Annulation gratuite jusqu'à 7 jours avant. Entre 3 et 7 jours : frais de 25%. Entre 1 et 3 jours : frais de 50%. Moins de 24h : frais de 100%.",
    cancellation_how_title: "Comment annuler",
    cancellation_how: "Connectez-vous à votre compte, allez à « Mes réservations », cliquez « Annuler » sur la réservation. Confirmation immédiate ou contactez le support.",
    cancellation_refund_title: "Remboursement",
    cancellation_refund: "Traité sous 5-7 jours ouvrables, vers le mode de paiement original.",

    legal_title: "Mentions Légales",
    legal_company: "KCC-EliteDriver — Service de chauffeur privé haut de gamme. Siège social : Paris, France. Email : contact@kccelitedriver.com. Téléphone : +33 1 23 45 67 89.",
    legal_hosting: "Site hébergé par Lovable (lovable.dev). Hébergement sécurisé conforme aux normes européennes.",
    legal_ip: "L'ensemble du contenu de ce site (textes, images, logos, design) est la propriété exclusive de KCC-EliteDriver. Toute reproduction sans autorisation est interdite.",

    // Auth
    auth_email: "Email",
    auth_password: "Mot de passe",
    auth_password_confirm: "Confirmer le mot de passe",
    auth_login: "Se connecter",
    auth_login_loading: "Connexion...",
    auth_signup: "S'inscrire",
    auth_signup_loading: "Inscription...",
    auth_logout: "Déconnexion",
    auth_no_account: "Pas encore de compte ?",
    auth_has_account: "Déjà un compte ?",
    auth_verify_email: "Vérifiez votre email",
    auth_verify_email_desc: "Un lien de confirmation a été envoyé à",
    auth_back_login: "Retour à la connexion",
    auth_password_min: "Le mot de passe doit contenir au moins 6 caractères",
    auth_password_mismatch: "Les mots de passe ne correspondent pas",

    header_my_space: "Mon espace",
    header_login: "Connexion",

    // Admin
    admin_title: "KCC Admin",
    admin_login_title: "Administration",
    admin_login_desc: "Connectez-vous pour accéder au panneau admin",
    admin_dashboard: "Tableau de bord",
    admin_bookings: "Réservations",
    admin_providers: "Prestataires",
    admin_drivers: "Chauffeurs",
    admin_all: "Toutes",
    admin_pending: "En attente",
    admin_confirmed: "Confirmée",
    admin_completed: "Terminée",
    admin_cancelled: "Annulée",
    admin_no_bookings: "Aucune réservation",
    admin_client: "Client",
    admin_service: "Service",
    admin_date: "Date",
    admin_route: "Trajet",
    admin_status: "Statut",
    admin_driver: "Chauffeur",
    admin_actions: "Actions",
    admin_edit: "Modifier",
    admin_close: "Fermer",
    admin_unassigned: "Non assigné",
    admin_add: "Ajouter",
    admin_save: "Enregistrer",
    admin_create: "Créer",
    admin_edit_label: "Modifier",
    admin_new_provider: "Nouveau prestataire",
    admin_edit_provider: "Modifier prestataire",
    admin_delete_provider_confirm: "Supprimer ce prestataire et tous ses chauffeurs ?",
    admin_no_providers: "Aucun prestataire. Ajoutez-en un pour commencer.",
    admin_new_driver: "Nouveau chauffeur",
    admin_edit_driver: "Modifier chauffeur",
    admin_delete_driver_confirm: "Supprimer ce chauffeur ?",
    admin_no_drivers: "Aucun chauffeur. Ajoutez d'abord un prestataire, puis un chauffeur.",
    admin_provider_label: "Prestataire",
    admin_select: "Sélectionner...",
    admin_firstname: "Prénom",
    admin_lastname: "Nom",
    admin_phone: "Téléphone",
    admin_email_label: "Email",
    admin_name: "Nom",

    // Client
    client_my_bookings: "Mes réservations",
    client_new_booking: "Nouvelle",
    client_no_bookings: "Aucune réservation pour le moment",
    client_book_now: "Réserver maintenant",
    client_details: "Détails",
    client_rebook: "Réserver à nouveau",
    client_booking_detail: "Détail de la réservation",
    client_back_bookings: "Retour aux réservations",
    client_modify: "Modifier",
    client_cancel_booking: "Annuler cette réservation",
    client_cancel_confirm: "Confirmer l'annulation ?",
    client_cancel_yes: "Oui, annuler",
    client_cancel_no: "Non",
    client_save: "Enregistrer",
    client_cancel_edit: "Annuler",
    client_login_title: "Mon espace",
    client_login_desc: "Connectez-vous pour gérer vos réservations",
    client_register_title: "Créer un compte",
    client_register_desc: "Inscrivez-vous pour gérer vos réservations",

    status_pending: "En attente",
    status_confirmed: "Confirmée",
    status_completed: "Terminée",
    status_cancelled: "Annulée",

    field_service: "Service",
    field_pickup: "Prise en charge",
    field_dropoff: "Destination",
    field_date: "Date",
    field_time: "Heure",
    field_vehicle: "Véhicule",
    field_passengers: "Passagers",
    field_luggage: "Bagages",
    field_flight: "Vol",
    field_notes: "Notes",
    booking_submitting: "Envoi...",
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
    fleet_suv: "SUV Prestige",
    fleet_suv_desc: "Soueast S07 or equivalent. Premium technology and generous space for your demanding journeys. Equipped with ultra-high-speed WiFi, multi-zone climate control, premium refreshments and French and international press on board.",

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
    values_anticipation: "Anticipation",
    values_anticipation_desc: "Every detail is planned ahead. Optimised routes, prepared alternatives, needs anticipated before they are even expressed.",

    contact_title: "Get in Touch",
    contact_subtitle: "For bespoke requests, personalised quotes, or questions about our services.",
    contact_description: "Our team is here to serve you. Response guaranteed within 2 hours.",
    contact_name: "Full name",
    contact_email: "Email address",
    contact_phone: "Phone number",
    contact_message: "Your message",
    contact_service: "Service type",
    contact_service_airport: "Airport Transfer",
    contact_service_hourly: "Hourly Standby",
    contact_service_event: "VIP Event",
    contact_service_other: "Other inquiry",
    contact_service_city: "Inter-City & Long-Distance",
    contact_service_tours: "Private Cultural Tours",
    contact_send: "Send my Message",
    contact_success: "Your message has been sent successfully. Our team will respond shortly to the email address provided.",
    contact_whatsapp: "Chat on WhatsApp",
    contact_call: "Call Now",
    contact_map_coming: "Google Maps — Coming Soon",
    contact_direct: "Direct Contact",
    contact_direct_subtitle: "Response guaranteed within 2 hours (Mon-Fri 8am-8pm / Sat-Sun 9am-6pm)",
    contact_form_title: "Send us a Message",
    contact_form_desc: "Complete this form. We'll respond promptly.",
    contact_name_placeholder: "John Smith",
    contact_email_placeholder: "john.smith@example.com",
    contact_email_helper: "We'll reply to this address.",
    contact_phone_placeholder: "+33 6 XX XX XX XX",
    contact_phone_helper: "For direct contact if needed.",
    contact_service_placeholder: "Select a service",
    contact_service_helper: "This helps us route your message to the right department.",
    contact_message_placeholder: "Describe your request: service type, dates, specific needs, preferences...",
    contact_message_helper: "The more details you provide, the better we can personalise our response.",
    contact_privacy_checkbox: "I agree my data is processed to respond to my inquiry",
    contact_privacy_desc: "Your personal data will be processed in accordance with our Privacy Policy.",
    contact_submit_helper: "Our team typically responds within 2 hours during business hours.",
    contact_success_title: "Thank You!",
    contact_email_direct: "contact@kccelitedriver.com",
    contact_email_direct_helper: "Response guaranteed within 2 hours.",
    contact_whatsapp_helper: "Instant chat. Available 24/7, quick response.",
    contact_call_helper: "Speak to an agent directly. Free from France.",
    contact_call_number: "+33 1 23 45 67 89",
    contact_call_hours: "Mon-Fri 08:00-20:00 / Sat-Sun 09:00-18:00 (CET)",
    contact_faq_title: "Frequently Asked Questions",
    contact_faq_q1: "What is your response time?",
    contact_faq_a1: "We guarantee a response within 2 hours during business hours (Mon-Fri 8am-8pm, Sat-Sun 9am-6pm).",
    contact_faq_q2: "Can I modify my booking?",
    contact_faq_a2: "Yes. Free cancellation up to 24 hours before departure (48 hours for airport Meet & Greet).",
    contact_faq_q3: "Do you offer services for groups?",
    contact_faq_a3: "Absolutely. Our Van Prestige can accommodate up to 7 passengers. For larger delegations, we coordinate multiple vehicles.",
    contact_faq_q4: "How is my personal data handled?",
    contact_faq_a4: "Your data is processed confidentially in accordance with our strictest security standards.",
    contact_faq_q5: "Do you accept cash payments?",
    contact_faq_a5: "Yes, you can pay in cash directly to the driver. Fixed pricing, no surprises. Receipt provided.",

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
    booking_subtitle: "Reserve your driver in just a few steps",
    booking_step_service: "Service",
    booking_step_details: "Details",
    booking_step_vehicle: "Vehicle",
    booking_step_confirm: "Confirmation",
    booking_distance: "Distance",
    booking_duration: "Duration",
    booking_estimate: "Estimate",
    booking_select_service: "Select your service type",
    booking_next: "Continue",
    booking_prev: "Previous",
    booking_passengers_label: "Number of passengers",
    booking_luggage_label: "Number of luggage",
    booking_notes_label: "Special requests",
    booking_notes_placeholder: "For your driver: child seat required, wheelchair access, soft music, silence, etc.",
    booking_select_vehicle: "Select Your Vehicle",
    booking_summary: "Booking Summary",
    booking_service_label: "Service",
    booking_date_label: "Date",
    booking_time_label: "Time",
    booking_pickup_label: "Pick-up",
    booking_dropoff_label: "Destination",
    booking_vehicle_label: "Vehicle",
    booking_confirm: "Confirm Booking",
    booking_success: "Booking Confirmed!",
    booking_success_desc: "Thank you! Your booking is confirmed. A confirmation email containing all your booking details has been sent. We appreciate your trust.",
    booking_new: "New booking",

    booking_step_passenger: "Passenger",
    booking_firstname: "First name",
    booking_lastname: "Last name",
    booking_email: "Email address",
    booking_phone: "Phone number",
    booking_company_invoice: "Professional billing",
    booking_flight_number: "Flight / train number",
    booking_meet_greet: "Meet & Greet",
    booking_meet_greet_desc: "Personalised welcome upon arrival with flight tracking.",
    booking_cancellation_policy: "Free cancellation up to 24 hours before departure. Beyond this, a 50% charge applies. For airport Meet & Greet services, 48 hours' notice required. We understand plans change; our terms remain fair.",
    booking_payment_card: "Credit Card",
    booking_payment_cash: "Cash Payment",
    booking_payment_method: "Payment Method",
    booking_hours_label: "Duration (hours)",
    booking_hours_helper: "Minimum 4 hours. 12-hour package. Beyond that, on request.",
    booking_hours_more: "12h+ (on request)",
    booking_quote_only: "Quote on request",
    booking_quote_whatsapp_cta: "Request a quote on WhatsApp",
    booking_quote_whatsapp_prefix: "Quote request",
    booking_sphinx_surcharge: "Sphinx Airport surcharge",
    booking_price_label: "Trip price",

    // Booking - service descriptions
    booking_service_airport_desc: "Transfers between airports and your destinations.",
    booking_service_hourly_desc: "Reserve your driver for flexible duration.",
    booking_service_event_desc: "Transportation for your private or corporate events.",
    booking_service_city_desc: "Long-distance journeys with premium comfort.",

    // Booking - step subtitles
    booking_select_service_desc: "Choose the service that best suits your needs.",
    booking_details_title: "Journey Details",
    booking_details_desc: "Specify your itinerary and schedule.",
    booking_passenger_title: "Your Information",
    booking_passenger_desc: "Complete your details. Your information remains confidential.",
    booking_vehicle_title: "Select Your Vehicle",
    booking_vehicle_desc: "Choose the vehicle best suited to your needs.",
    booking_summary_desc: "Verify all details before confirming your reservation.",

    // Booking - field labels & helpers
    booking_pickup_field: "Pick-up location",
    booking_destination_field: "Destination",
    booking_date_field: "Departure date",
    booking_date_helper: "Select your departure date.",
    booking_time_field: "Departure time",
    booking_time_helper: "Indicate your exact pick-up time.",
    booking_email_helper: "We'll send you a confirmation and booking details.",
    booking_phone_helper: "Number used for flight tracking and driver contact.",
    booking_notes_helper: "Describe any special requirements. Our drivers honour them with complete discretion.",
    booking_flight_helper: "We'll track your arrival in real-time for seamless pick-up.",
    booking_meet_greet_helper: "Our team will welcome you discreetly and guide you to your vehicle.",
    booking_vehicle_helper: "All our vehicles are maintained to premium standards and entrusted to rigorously vetted drivers.",

    // Booking - payment helpers
    booking_payment_card_desc: "Secure payment with SSL. Visa, Mastercard, American Express accepted.",
    booking_payment_cash_desc: "Pay your driver directly in local currency.",
    booking_payment_card_helper: "Your payment is protected by 256-bit SSL encryption.",
    booking_payment_cash_helper: "Convenient and discreet. Fixed transparent pricing. Receipt provided.",
    booking_payment_reassurance: "All payments are processed confidentially and comply with international security standards. Your privacy is protected.",

    // Booking - confirmation extras
    booking_back_home: "Back to home",

    // Booking - confirmation page details
    booking_confirmation_details_title: "Your booking information",
    booking_confirmation_number: "Booking number",
    booking_confirmation_email_label: "Confirmation email",
    booking_confirmation_support: "24/7 Support",
    booking_confirmation_status: "Status",
    booking_confirmation_status_confirmed: "Confirmed",
    booking_confirmation_details_helper: "Keep this number for any modifications or questions about your booking.",
    booking_next_steps_title: "What happens next",
    booking_next_step_1: "Confirmation email with all details has been sent.",
    booking_next_step_2: "Your driver will be assigned 24 hours before departure.",
    booking_next_step_3: "You'll receive their contact details and professional photo.",
    booking_next_step_4: "Our team is available 24/7 for any questions.",
    booking_cancellation_reminder: "Reminder: Free cancellation up to 24 hours before departure. Beyond this, a 50% charge applies. For airport Meet & Greet services, 48 hours' notice required.",

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

    fleet_refreshments: "Premium refreshments",
    fleet_disinfection: "Disinfection protocol",
    services_dropdown_airport: "Airport Transfer",
    services_dropdown_hourly: "Hourly Standby",
    services_dropdown_event: "VIP Events",
    services_dropdown_intercity: "Intercity",
    services_dropdown_city: "Inter-City & Long-Distance",
    services_dropdown_cultural: "Private Cultural Tours",
    services_dropdown_view_all: "View All Services",

    footer_description: "Premium private driver service between Cairo and Paris. Discretion, punctuality, excellence.",
    footer_service_city: "Inter-City & Long-Distance",
    footer_service_cultural: "Private Cultural Tours",
    footer_whatsapp: "Chat on WhatsApp",
    footer_address: "Paris, France | Cairo, Egypt",
    footer_hours: "Mon-Fri 08:00-20:00 / Sat-Sun 09:00-18:00 (CET)",
    footer_privacy_link: "Privacy Policy",
    footer_terms_link: "Terms of Use",
    footer_cancellation_link: "Cancellation Policy",
    footer_legal_link: "Legal Notice",

    privacy_title: "Privacy Policy",
    privacy_intro: "At KCC-EliteDriver, your privacy is our absolute priority. This policy describes how we collect, use and protect your personal data.",
    privacy_data_collected_title: "Data Collected",
    privacy_data_collected: "Personal information (name, email, phone), booking data (date, time, locations), payment data (processed by secure processor), location data (GPS real-time, with consent).",
    privacy_usage_title: "Data Usage",
    privacy_usage: "Processing your booking, communication with you (confirmations, updates), service improvement, legal compliance.",
    privacy_sharing_title: "Data Sharing",
    privacy_sharing: "Shared ONLY with assigned driver (for real-time tracking). Never sold to third parties. Strict GDPR compliance.",
    privacy_rights_title: "User Rights",
    privacy_rights: "Right to access your data, right to rectification, right to be forgotten, right to data portability.",
    privacy_security_title: "Security",
    privacy_security: "256-bit SSL encryption, secure servers (GDPR compliance), restricted access policy.",
    privacy_contact: "Questions about our privacy practices? contact@kccelitedriver.com",

    terms_title: "Terms of Use",
    terms_acceptance: "Use of the website and services implies acceptance of these terms.",
    terms_eligibility: "You must be of legal age (18+), responsible for your accounts/payments, and comply with all applicable laws.",
    terms_booking: "Fixed pricing, no surprises. Payment before or after journey (depending on option). Credit card or cash accepted.",
    terms_behaviour: "You agree to treat our drivers with respect and dignity, not abuse the service, and not divulge driver contact details.",
    terms_liability: "KCC-EliteDriver is not responsible for delays due to traffic or weather, incidents caused by passenger, loss or damage to luggage (except negligence).",
    terms_ip: "Website content: © KCC-EliteDriver. No reproduction without permission.",
    terms_modification: "We may modify these terms at any time. Notification via email.",

    cancellation_title: "Flexible Cancellation Policy",
    cancellation_standard_title: "Standard Services",
    cancellation_standard: "Free cancellation up to 24 hours before departure. Beyond 24h: 50% charge applies. Free modification up to 24 hours before.",
    cancellation_meetgreet_title: "With Airport Meet & Greet",
    cancellation_meetgreet: "Free cancellation up to 48 hours before. Between 24h and 48h: 50% charge. Less than 24h: 100% charge (no-show without notice).",
    cancellation_vip_title: "VIP Events",
    cancellation_vip: "Free cancellation up to 7 days before. Between 3 and 7 days: 25% charge. Between 1 and 3 days: 50% charge. Less than 24h: 100% charge.",
    cancellation_how_title: "How to Cancel",
    cancellation_how: "Log in to your account, go to 'My Bookings', click 'Cancel' on the booking. Immediate confirmation or contact support.",
    cancellation_refund_title: "Refunds",
    cancellation_refund: "Processed within 5-7 business days, to original payment method.",

    legal_title: "Legal Notice",
    legal_company: "KCC-EliteDriver — Premium private driver service. Registered office: Paris, France. Email: contact@kccelitedriver.com. Phone: +33 1 23 45 67 89.",
    legal_hosting: "Website hosted by Lovable (lovable.dev). Secure hosting compliant with European standards.",
    legal_ip: "All content on this website (texts, images, logos, design) is the exclusive property of KCC-EliteDriver. Reproduction without authorisation is prohibited.",

    auth_email: "Email",
    auth_password: "Password",
    auth_password_confirm: "Confirm password",
    auth_login: "Sign in",
    auth_login_loading: "Signing in...",
    auth_signup: "Sign up",
    auth_signup_loading: "Signing up...",
    auth_logout: "Sign out",
    auth_no_account: "Don't have an account?",
    auth_has_account: "Already have an account?",
    auth_verify_email: "Check your email",
    auth_verify_email_desc: "A confirmation link has been sent to",
    auth_back_login: "Back to sign in",
    auth_password_min: "Password must be at least 6 characters",
    auth_password_mismatch: "Passwords do not match",

    header_my_space: "My account",
    header_login: "Sign in",

    admin_title: "KCC Admin",
    admin_login_title: "Administration",
    admin_login_desc: "Sign in to access the admin panel",
    admin_dashboard: "Dashboard",
    admin_bookings: "Bookings",
    admin_providers: "Providers",
    admin_drivers: "Drivers",
    admin_all: "All",
    admin_pending: "Pending",
    admin_confirmed: "Confirmed",
    admin_completed: "Completed",
    admin_cancelled: "Cancelled",
    admin_no_bookings: "No bookings",
    admin_client: "Client",
    admin_service: "Service",
    admin_date: "Date",
    admin_route: "Route",
    admin_status: "Status",
    admin_driver: "Driver",
    admin_actions: "Actions",
    admin_edit: "Edit",
    admin_close: "Close",
    admin_unassigned: "Unassigned",
    admin_add: "Add",
    admin_save: "Save",
    admin_create: "Create",
    admin_edit_label: "Edit",
    admin_new_provider: "New provider",
    admin_edit_provider: "Edit provider",
    admin_delete_provider_confirm: "Delete this provider and all its drivers?",
    admin_no_providers: "No providers yet. Add one to get started.",
    admin_new_driver: "New driver",
    admin_edit_driver: "Edit driver",
    admin_delete_driver_confirm: "Delete this driver?",
    admin_no_drivers: "No drivers yet. Add a provider first, then a driver.",
    admin_provider_label: "Provider",
    admin_select: "Select...",
    admin_firstname: "First name",
    admin_lastname: "Last name",
    admin_phone: "Phone",
    admin_email_label: "Email",
    admin_name: "Name",

    client_my_bookings: "My bookings",
    client_new_booking: "New",
    client_no_bookings: "No bookings yet",
    client_book_now: "Book now",
    client_details: "Details",
    client_rebook: "Book again",
    client_booking_detail: "Booking details",
    client_back_bookings: "Back to bookings",
    client_modify: "Edit",
    client_cancel_booking: "Cancel this booking",
    client_cancel_confirm: "Confirm cancellation?",
    client_cancel_yes: "Yes, cancel",
    client_cancel_no: "No",
    client_save: "Save",
    client_cancel_edit: "Cancel",
    client_login_title: "My account",
    client_login_desc: "Sign in to manage your bookings",
    client_register_title: "Create an account",
    client_register_desc: "Sign up to manage your bookings",

    status_pending: "Pending",
    status_confirmed: "Confirmed",
    status_completed: "Completed",
    status_cancelled: "Cancelled",

    field_service: "Service",
    field_pickup: "Pick-up",
    field_dropoff: "Destination",
    field_date: "Date",
    field_time: "Time",
    field_vehicle: "Vehicle",
    field_passengers: "Passengers",
    field_luggage: "Luggage",
    field_flight: "Flight",
    field_notes: "Notes",
    booking_submitting: "Submitting...",
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
    fleet_suv: "SUV بريستيج",
    fleet_suv_desc: "سوايست S07 أو ما يعادلها. تقنية فاخرة ومساحة سخية لرحلاتكم المتطلبة. مجهزة بواي فاي فائق السرعة، تكييف متعدد المناطق، مرطبات فاخرة وصحافة فرنسية ودولية على متنها.",

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
    values_anticipation: "الاستباق",
    values_anticipation_desc: "كل تفصيل مُخطط مسبقاً. مسارات محسّنة، بدائل جاهزة، احتياجات متوقعة قبل التعبير عنها.",

    contact_title: "اتصل بنا",
    contact_subtitle: "لطلب مخصص، عرض سعر شخصي أو أسئلة حول خدماتنا.",
    contact_description: "فريقنا متاح لخدمتك. رد مضمون خلال ساعتين.",
    contact_name: "الاسم الكامل",
    contact_email: "البريد الإلكتروني",
    contact_phone: "الهاتف",
    contact_message: "رسالتك",
    contact_service: "نوع الخدمة",
    contact_service_airport: "نقل من المطار",
    contact_service_hourly: "حجز بالساعة",
    contact_service_event: "حدث VIP",
    contact_service_other: "طلب آخر",
    contact_service_city: "بين المدن والمسافات الطويلة",
    contact_service_tours: "جولات ثقافية خاصة",
    contact_send: "إرسال رسالتي",
    contact_success: "تم إرسال رسالتك بنجاح. سيرد فريقنا قريباً على البريد الإلكتروني المقدم.",
    contact_whatsapp: "الدردشة على واتساب",
    contact_call: "اتصل الآن",
    contact_map_coming: "خرائط جوجل — قريباً",
    contact_direct: "تواصل مباشر",
    contact_direct_subtitle: "رد مضمون خلال ساعتين (الإثنين-الجمعة 8ص-8م / السبت-الأحد 9ص-6م)",
    contact_form_title: "أرسل لنا رسالة",
    contact_form_desc: "أكمل هذا النموذج. سنرد عليك بسرعة.",
    contact_name_placeholder: "أحمد محمد",
    contact_email_placeholder: "ahmed@example.com",
    contact_email_helper: "سنرد على هذا العنوان.",
    contact_phone_placeholder: "+33 6 XX XX XX XX",
    contact_phone_helper: "للتواصل معك مباشرة إذا لزم الأمر.",
    contact_service_placeholder: "اختر خدمة",
    contact_service_helper: "هذا يساعدنا في توجيه رسالتك للقسم المناسب.",
    contact_message_placeholder: "صف طلبك: نوع الخدمة، التواريخ، الاحتياجات الخاصة، التفضيلات...",
    contact_message_helper: "كلما قدمت تفاصيل أكثر، كلما استطعنا تخصيص ردنا بشكل أفضل.",
    contact_privacy_checkbox: "أوافق على معالجة بياناتي للرد على استفساري",
    contact_privacy_desc: "سيتم معالجة بياناتك الشخصية وفقاً لسياسة الخصوصية الخاصة بنا.",
    contact_submit_helper: "يرد فريقنا عادة خلال ساعتين خلال ساعات العمل.",
    contact_success_title: "شكراً لك!",
    contact_email_direct: "contact@kccelitedriver.com",
    contact_email_direct_helper: "رد مضمون خلال ساعتين.",
    contact_whatsapp_helper: "دردشة فورية. متاح 24/7، رد سريع.",
    contact_call_helper: "تحدث مع وكيل مباشرة. مجاني من فرنسا.",
    contact_call_number: "+33 1 23 45 67 89",
    contact_call_hours: "الإثنين-الجمعة 08:00-20:00 / السبت-الأحد 09:00-18:00 (CET)",
    contact_faq_title: "الأسئلة المتكررة",
    contact_faq_q1: "ما هو وقت الرد لديكم؟",
    contact_faq_a1: "نضمن رداً خلال ساعتين خلال ساعات العمل (الإثنين-الجمعة 8ص-8م، السبت-الأحد 9ص-6م).",
    contact_faq_q2: "هل يمكنني تعديل حجزي؟",
    contact_faq_a2: "نعم. إلغاء مجاني حتى 24 ساعة قبل المغادرة (48 ساعة للاستقبال الشخصي في المطار).",
    contact_faq_q3: "هل تقدمون خدمات للمجموعات؟",
    contact_faq_a3: "بالتأكيد. فان بريستيج يتسع لـ 7 ركاب. للوفود الأكبر، ننسق عدة مركبات.",
    contact_faq_q4: "كيف تُعالج بياناتي الشخصية؟",
    contact_faq_a4: "تُعالج بياناتك بسرية تامة وفقاً لأعلى معايير الأمان لدينا.",
    contact_faq_q5: "هل تقبلون الدفع النقدي؟",
    contact_faq_a5: "نعم، يمكنك الدفع نقداً مباشرة للسائق. تسعير ثابت بلا مفاجآت. إيصال مقدم.",

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
    booking_subtitle: "احجز سائقك الخاص في بضع خطوات",
    booking_step_service: "الخدمة",
    booking_step_details: "التفاصيل",
    booking_step_vehicle: "المركبة",
    booking_step_confirm: "التأكيد",
    booking_distance: "المسافة",
    booking_duration: "المدة",
    booking_estimate: "التقدير",
    booking_select_service: "اختر نوع الخدمة",
    booking_next: "متابعة",
    booking_prev: "السابق",
    booking_passengers_label: "عدد الركاب",
    booking_luggage_label: "عدد الحقائب",
    booking_notes_label: "طلبات خاصة",
    booking_notes_placeholder: "لسائقك: مقعد أطفال مطلوب، وصول لذوي الاحتياجات الخاصة، موسيقى هادئة، صمت، إلخ.",
    booking_select_vehicle: "اختر مركبتك",
    booking_summary: "ملخص حجزك",
    booking_service_label: "الخدمة",
    booking_date_label: "التاريخ",
    booking_time_label: "الوقت",
    booking_pickup_label: "نقطة الانطلاق",
    booking_dropoff_label: "الوجهة",
    booking_vehicle_label: "المركبة",
    booking_confirm: "تأكيد الحجز",
    booking_success: "تم تأكيد الحجز!",
    booking_success_desc: "شكراً لك! حجزك مؤكد. تم إرسال بريد إلكتروني بالتأكيد يحتوي على جميع تفاصيل حجزك. نشكرك على ثقتك.",
    booking_new: "حجز جديد",

    booking_step_passenger: "الراكب",
    booking_firstname: "الاسم الأول",
    booking_lastname: "اسم العائلة",
    booking_email: "البريد الإلكتروني",
    booking_phone: "رقم الهاتف",
    booking_company_invoice: "فوترة مهنية",
    booking_flight_number: "رقم الرحلة / القطار",
    booking_meet_greet: "استقبال شخصي",
    booking_meet_greet_desc: "استقبال شخصي عند وصولك مع تتبع رحلتك.",
    booking_cancellation_policy: "إلغاء مجاني حتى 24 ساعة قبل موعد المغادرة. بعد ذلك، تُطبق رسوم 50%. لخدمات الاستقبال الشخصي في المطار، مهلة الإلغاء 48 ساعة. نتفهم أن خططك قد تتغير؛ شروطنا تبقى عادلة.",
    booking_payment_card: "بطاقة ائتمان",
    booking_payment_cash: "الدفع نقداً",
    booking_payment_method: "طريقة الدفع",
    booking_hours_label: "المدة (ساعات)",
    booking_hours_helper: "٤ ساعات كحد أدنى. باقة ١٢ ساعة. بعد ذلك بعرض سعر.",
    booking_hours_more: "أكثر من ١٢ ساعة (بعرض سعر)",
    booking_quote_only: "بعرض سعر",
    booking_quote_whatsapp_cta: "اطلب عرض سعر عبر واتساب",
    booking_quote_whatsapp_prefix: "طلب عرض سعر",
    booking_sphinx_surcharge: "رسوم إضافية لمطار سفنكس",
    booking_price_label: "سعر الرحلة",

    // Booking - service descriptions
    booking_service_airport_desc: "تنقلات بين المطارات ووجهاتك.",
    booking_service_hourly_desc: "احجز سائقك لمدة مرنة.",
    booking_service_event_desc: "نقل لمناسباتك الخاصة أو المهنية.",
    booking_service_city_desc: "رحلات طويلة المسافة براحة فاخرة.",

    // Booking - step subtitles
    booking_select_service_desc: "اختر الخدمة التي تناسب احتياجاتك.",
    booking_details_title: "تفاصيل رحلتك",
    booking_details_desc: "حدد مسارك ومواعيدك.",
    booking_passenger_title: "معلوماتك",
    booking_passenger_desc: "أكمل بياناتك. معلوماتك تبقى سرية.",
    booking_vehicle_title: "اختر مركبتك",
    booking_vehicle_desc: "اختر المركبة المناسبة لاحتياجاتك.",
    booking_summary_desc: "تحقق من جميع التفاصيل قبل التأكيد.",

    // Booking - field labels & helpers
    booking_pickup_field: "مكان الانطلاق",
    booking_destination_field: "الوجهة",
    booking_date_field: "تاريخ المغادرة",
    booking_date_helper: "اختر تاريخ مغادرتك.",
    booking_time_field: "وقت المغادرة",
    booking_time_helper: "حدد الوقت الدقيق لاستلامك.",
    booking_email_helper: "سنرسل لك تأكيداً وتفاصيل حجزك.",
    booking_phone_helper: "رقم يُستخدم لتتبع رحلتك والتواصل مع السائق.",
    booking_notes_helper: "صف طلباتك الخاصة. سائقونا يلبونها بسرية تامة.",
    booking_flight_helper: "سنتتبع وصولك في الوقت الفعلي لاستقبال سلس.",
    booking_meet_greet_helper: "فريقنا سيستقبلك بتحفظ ويرافقك إلى مركبتك.",
    booking_vehicle_helper: "جميع مركباتنا مُصانة بمعايير فاخرة ومُوكلة لسائقين مختارين بصرامة.",

    // Booking - payment helpers
    booking_payment_card_desc: "دفع آمن بتشفير SSL. فيزا، ماستركارد، أمريكان إكسبريس مقبولة.",
    booking_payment_cash_desc: "ادفع لسائقك مباشرة بالعملة المحلية.",
    booking_payment_card_helper: "دفعتك محمية بتشفير SSL 256-bit.",
    booking_payment_cash_helper: "عملي وسري. تسعير ثابت بلا مفاجآت. إيصال مقدم.",
    booking_payment_reassurance: "جميع المدفوعات تتم بسرية تامة وفقاً للمعايير الدولية للأمان. خصوصيتك محمية.",

    // Booking - confirmation extras
    booking_back_home: "العودة للرئيسية",

    // Booking - confirmation page details
    booking_confirmation_details_title: "معلومات حجزك",
    booking_confirmation_number: "رقم الحجز",
    booking_confirmation_email_label: "بريد التأكيد",
    booking_confirmation_support: "دعم 24/7",
    booking_confirmation_status: "الحالة",
    booking_confirmation_status_confirmed: "مؤكد",
    booking_confirmation_details_helper: "احتفظ بهذا الرقم لأي تعديل أو استفسار بخصوص حجزك.",
    booking_next_steps_title: "ما الذي يحدث بعد ذلك",
    booking_next_step_1: "تم إرسال بريد تأكيد يحتوي على جميع التفاصيل.",
    booking_next_step_2: "سيتم تعيين سائقك قبل 24 ساعة من موعد المغادرة.",
    booking_next_step_3: "ستتلقى بيانات الاتصال به وصورته المهنية.",
    booking_next_step_4: "فريقنا متاح على مدار الساعة لأي استفسار.",
    booking_cancellation_reminder: "تذكير: إلغاء مجاني حتى 24 ساعة قبل المغادرة. بعد ذلك، تُطبق رسوم 50%. لخدمات الاستقبال الشخصي في المطار، مهلة الإلغاء 48 ساعة.",

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

    fleet_refreshments: "مرطبات فاخرة",
    fleet_disinfection: "بروتوكول التعقيم",
    services_dropdown_airport: "نقل من المطار",
    services_dropdown_hourly: "حجز بالساعة",
    services_dropdown_event: "أحداث VIP",
    services_dropdown_intercity: "بين المدن",
    services_dropdown_city: "بين المدن والمسافات الطويلة",
    services_dropdown_cultural: "جولات ثقافية خاصة",
    services_dropdown_view_all: "عرض جميع الخدمات",

    footer_description: "خدمة سائق خاص فاخرة بين القاهرة وباريس. سرية، دقة، تميّز.",
    footer_service_city: "بين المدن والمسافات الطويلة",
    footer_service_cultural: "جولات ثقافية خاصة",
    footer_whatsapp: "دردشة واتساب",
    footer_address: "باريس، فرنسا | القاهرة، مصر",
    footer_hours: "الإثنين-الجمعة 08:00-20:00 / السبت-الأحد 09:00-18:00 (CET)",
    footer_privacy_link: "سياسة الخصوصية",
    footer_terms_link: "شروط الاستخدام",
    footer_cancellation_link: "سياسة الإلغاء",
    footer_legal_link: "الإشعار القانوني",

    privacy_title: "سياسة الخصوصية",
    privacy_intro: "في KCC-EliteDriver، خصوصيتك هي أولويتنا المطلقة. تصف هذه السياسة كيف نجمع ونستخدم ونحمي بياناتك الشخصية.",
    privacy_data_collected_title: "البيانات المجمعة",
    privacy_data_collected: "معلومات شخصية (الاسم، البريد الإلكتروني، الهاتف)، بيانات الحجز (التاريخ، الأوقات، الأماكن)، بيانات الدفع (تُعالج بمعالج آمن)، بيانات الموقع (GPS في الوقت الفعلي، بموافقة).",
    privacy_usage_title: "استخدام البيانات",
    privacy_usage: "معالجة حجزك، التواصل معك (تأكيدات، تحديثات)، تحسين خدماتنا، الامتثال القانوني.",
    privacy_sharing_title: "مشاركة البيانات",
    privacy_sharing: "تُشارك فقط مع السائق المعيّن (للتتبع في الوقت الفعلي). لا تُباع أبداً لأطراف ثالثة. امتثال صارم لـ GDPR.",
    privacy_rights_title: "حقوق المستخدم",
    privacy_rights: "حق الوصول إلى بياناتك، حق التصحيح، حق النسيان، حق نقل البيانات.",
    privacy_security_title: "الأمان",
    privacy_security: "تشفير SSL 256-bit، خوادم آمنة (امتثال GDPR)، سياسة وصول مقيدة.",
    privacy_contact: "أسئلة حول ممارسات الخصوصية لدينا؟ contact@kccelitedriver.com",

    terms_title: "شروط الاستخدام",
    terms_acceptance: "استخدام الموقع والخدمات يعني قبول هذه الشروط.",
    terms_eligibility: "يجب أن تكون بالغاً (18+)، مسؤولاً عن حساباتك/مدفوعاتك، وملتزماً بجميع القوانين المعمول بها.",
    terms_booking: "تسعير ثابت بلا مفاجآت. الدفع قبل أو بعد الرحلة (حسب الخيار). بطاقة ائتمان أو نقداً مقبولة.",
    terms_behaviour: "توافق على معاملة سائقينا باحترام وكرامة، وعدم إساءة استخدام الخدمة، وعدم إفشاء بيانات اتصال السائق.",
    terms_liability: "KCC-EliteDriver ليست مسؤولة عن التأخيرات بسبب حركة المرور أو الطقس، الحوادث التي يسببها الراكب، فقدان أو تلف الأمتعة (باستثناء الإهمال).",
    terms_ip: "محتوى الموقع: © KCC-EliteDriver. لا يُسمح بالاستنساخ بدون إذن.",
    terms_modification: "يمكننا تعديل هذه الشروط في أي وقت. الإشعار عبر البريد الإلكتروني.",

    cancellation_title: "سياسة إلغاء مرنة",
    cancellation_standard_title: "الخدمات القياسية",
    cancellation_standard: "إلغاء مجاني حتى 24 ساعة قبل المغادرة. بعد 24 ساعة: رسوم 50%. تعديل مجاني حتى 24 ساعة قبل.",
    cancellation_meetgreet_title: "مع الاستقبال الشخصي في المطار",
    cancellation_meetgreet: "إلغاء مجاني حتى 48 ساعة قبل. بين 24 و48 ساعة: رسوم 50%. أقل من 24 ساعة: رسوم 100% (عدم حضور بدون إشعار).",
    cancellation_vip_title: "أحداث VIP",
    cancellation_vip: "إلغاء مجاني حتى 7 أيام قبل. بين 3 و7 أيام: رسوم 25%. بين 1 و3 أيام: رسوم 50%. أقل من 24 ساعة: رسوم 100%.",
    cancellation_how_title: "كيفية الإلغاء",
    cancellation_how: "سجّل الدخول إلى حسابك، اذهب إلى «حجوزاتي»، انقر «إلغاء» على الحجز. تأكيد فوري أو اتصل بالدعم.",
    cancellation_refund_title: "الاسترداد",
    cancellation_refund: "يُعالج خلال 5-7 أيام عمل، إلى طريقة الدفع الأصلية.",

    legal_title: "الإشعار القانوني",
    legal_company: "KCC-EliteDriver — خدمة سائق خاص فاخرة. المقر الرئيسي: باريس، فرنسا. البريد الإلكتروني: contact@kccelitedriver.com. الهاتف: +33 1 23 45 67 89.",
    legal_hosting: "الموقع مستضاف بواسطة Lovable (lovable.dev). استضافة آمنة متوافقة مع المعايير الأوروبية.",
    legal_ip: "جميع محتويات هذا الموقع (نصوص، صور، شعارات، تصميم) هي ملكية حصرية لـ KCC-EliteDriver. يُحظر الاستنساخ بدون إذن.",

    auth_email: "البريد الإلكتروني",
    auth_password: "كلمة المرور",
    auth_password_confirm: "تأكيد كلمة المرور",
    auth_login: "تسجيل الدخول",
    auth_login_loading: "جارٍ الدخول...",
    auth_signup: "إنشاء حساب",
    auth_signup_loading: "جارٍ التسجيل...",
    auth_logout: "تسجيل الخروج",
    auth_no_account: "ليس لديك حساب؟",
    auth_has_account: "لديك حساب بالفعل؟",
    auth_verify_email: "تحقق من بريدك الإلكتروني",
    auth_verify_email_desc: "تم إرسال رابط التأكيد إلى",
    auth_back_login: "العودة لتسجيل الدخول",
    auth_password_min: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل",
    auth_password_mismatch: "كلمتا المرور غير متطابقتين",

    header_my_space: "حسابي",
    header_login: "تسجيل الدخول",

    admin_title: "إدارة KCC",
    admin_login_title: "الإدارة",
    admin_login_desc: "سجّل الدخول للوصول إلى لوحة الإدارة",
    admin_dashboard: "لوحة التحكم",
    admin_bookings: "الحجوزات",
    admin_providers: "مقدمو الخدمات",
    admin_drivers: "السائقون",
    admin_all: "الكل",
    admin_pending: "قيد الانتظار",
    admin_confirmed: "مؤكدة",
    admin_completed: "مكتملة",
    admin_cancelled: "ملغاة",
    admin_no_bookings: "لا توجد حجوزات",
    admin_client: "العميل",
    admin_service: "الخدمة",
    admin_date: "التاريخ",
    admin_route: "المسار",
    admin_status: "الحالة",
    admin_driver: "السائق",
    admin_actions: "الإجراءات",
    admin_edit: "تعديل",
    admin_close: "إغلاق",
    admin_unassigned: "غير معيّن",
    admin_add: "إضافة",
    admin_save: "حفظ",
    admin_create: "إنشاء",
    admin_edit_label: "تعديل",
    admin_new_provider: "مقدم خدمة جديد",
    admin_edit_provider: "تعديل مقدم الخدمة",
    admin_delete_provider_confirm: "حذف مقدم الخدمة وجميع سائقيه؟",
    admin_no_providers: "لا يوجد مقدمو خدمات. أضف واحداً للبدء.",
    admin_new_driver: "سائق جديد",
    admin_edit_driver: "تعديل السائق",
    admin_delete_driver_confirm: "حذف هذا السائق؟",
    admin_no_drivers: "لا يوجد سائقون. أضف مقدم خدمة أولاً، ثم سائقاً.",
    admin_provider_label: "مقدم الخدمة",
    admin_select: "اختر...",
    admin_firstname: "الاسم الأول",
    admin_lastname: "اسم العائلة",
    admin_phone: "الهاتف",
    admin_email_label: "البريد الإلكتروني",
    admin_name: "الاسم",

    client_my_bookings: "حجوزاتي",
    client_new_booking: "جديد",
    client_no_bookings: "لا توجد حجوزات حالياً",
    client_book_now: "احجز الآن",
    client_details: "التفاصيل",
    client_rebook: "احجز مرة أخرى",
    client_booking_detail: "تفاصيل الحجز",
    client_back_bookings: "العودة إلى الحجوزات",
    client_modify: "تعديل",
    client_cancel_booking: "إلغاء هذا الحجز",
    client_cancel_confirm: "تأكيد الإلغاء؟",
    client_cancel_yes: "نعم، إلغاء",
    client_cancel_no: "لا",
    client_save: "حفظ",
    client_cancel_edit: "إلغاء",
    client_login_title: "حسابي",
    client_login_desc: "سجّل الدخول لإدارة حجوزاتك",
    client_register_title: "إنشاء حساب",
    client_register_desc: "سجّل لإدارة حجوزاتك",

    status_pending: "قيد الانتظار",
    status_confirmed: "مؤكدة",
    status_completed: "مكتملة",
    status_cancelled: "ملغاة",

    field_service: "الخدمة",
    field_pickup: "مكان الانطلاق",
    field_dropoff: "الوجهة",
    field_date: "التاريخ",
    field_time: "الوقت",
    field_vehicle: "المركبة",
    field_passengers: "الركاب",
    field_luggage: "الأمتعة",
    field_flight: "الرحلة",
    field_notes: "ملاحظات",
    booking_submitting: "جارٍ الإرسال...",
  },
};
