

# Plan : Mise a jour du tunnel de reservation — Textes optimises

Ce plan aligne tous les textes du tunnel de reservation (Booking) avec le contenu UX Writing fourni, en francais, anglais (British English) et arabe.

---

## 1. Traductions (`src/i18n/translations.ts`)

### Cles existantes a mettre a jour

| Cle | Ancienne valeur FR | Nouvelle valeur FR |
|-----|--------------------|--------------------|
| `booking_subtitle` | "Reservez votre chauffeur en quelques etapes" | "Reservez votre chauffeur en quelques etapes" (identique) |
| `booking_select_service` | "Choisissez votre service" | "Selectionnez votre type de service" |
| `booking_notes_label` | "Notes speciales" | "Demandes particulieres" |
| `booking_notes_placeholder` | "Notes au chauffeur – Demandes particulieres" | "A l'attention de votre chauffeur : siege enfant requis, acces handicape, musique douce, silence, etc." |
| `booking_company_invoice` | "Facture entreprise ?" | "Facturation a titre professionnel" |
| `booking_meet_greet_desc` | "Accueil personnalise a l'arrivee" | "Accueil personnalise a votre arrivee avec detection de votre vol." |
| `booking_cancellation_policy` | texte court | "Annulation flexible sans frais jusqu'a 24 heures avant votre depart. Au-dela, des frais de 50% s'appliquent. Pour les services avec Meet & Greet a l'aeroport, delai d'annulation : 48 heures. Nous comprenons que vos plans peuvent changer ; nous restons justes dans nos conditions." |
| `booking_success` | "Reservation confirmee !" | "Reservation confirmee !" (identique) |
| `booking_success_desc` | "Votre reservation est confirmee. Un email de recapitulatif a ete envoye. Nous vous remercions de votre confiance." | "Merci ! Votre reservation est confirmee. Un email de confirmation contenant tous les details de votre reservation a ete envoye. Nous vous remercions de votre confiance." |
| `booking_confirm` | "Confirmer la reservation" | "Confirmer la reservation" (avec icone check deja en place) |
| `booking_next` | "Suivant" | "Continuer" |
| `booking_prev` | "Precedent" | "Precedent" (identique) |
| `booking_payment_card` | "Carte bancaire" | "Carte bancaire" (identique) |
| `booking_payment_cash` | "Especes au chauffeur" | "Paiement en especes" |
| `booking_summary` | "Recapitulatif" | "Recapitulatif de votre reservation" |

Memes modifications pour EN et AR.

### Nouvelles cles a ajouter au type `TranslationKeys`

```
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
```

### Valeurs FR des nouvelles cles

| Cle | Valeur FR |
|-----|-----------|
| `booking_service_airport_desc` | "Transferts entre les aeroports et vos destinations." |
| `booking_service_hourly_desc` | "Reservez votre chauffeur pour une duree flexible." |
| `booking_service_event_desc` | "Transport pour vos evenements prives ou professionnels." |
| `booking_service_city_desc` | "Trajets longue distance avec confort premium." |
| `booking_select_service_desc` | "Choisissez le service qui correspond a votre besoin." |
| `booking_details_title` | "Details de votre trajet" |
| `booking_details_desc` | "Precisez votre itineraire et vos horaires." |
| `booking_passenger_title` | "Vos informations" |
| `booking_passenger_desc` | "Completez vos coordonnees. Vos donnees restent confidentielles." |
| `booking_vehicle_title` | "Choisissez votre vehicule" |
| `booking_vehicle_desc` | "Selectionnez le vehicule adapte a votre profil et besoins." |
| `booking_summary_desc` | "Verifiez tous les details avant de confirmer." |
| `booking_pickup_field` | "Lieu de prise en charge" |
| `booking_destination_field` | "Destination" |
| `booking_date_field` | "Date de depart" |
| `booking_date_helper` | "Selectionnez la date de votre depart." |
| `booking_time_field` | "Heure de depart" |
| `booking_time_helper` | "Indiquez l'heure exacte de votre prise en charge." |
| `booking_email_helper` | "Nous vous enverrons une confirmation et les details de votre reservation." |
| `booking_phone_helper` | "Numero utilise pour le suivi de votre vol." |
| `booking_notes_helper` | "Decrivez vos demandes speciales. Nos chauffeurs les honorent avec discretion." |
| `booking_flight_helper` | "Nous suivrons votre arrivee en temps reel pour une prise en charge optimale." |
| `booking_meet_greet_helper` | "Nos equipes vous accueilleront discretement et vous accompagneront jusqu'a votre vehicule." |
| `booking_vehicle_helper` | "Tous nos vehicules sont entretenus a des standards premium et confies a des chauffeurs rigoureusement selectionnes." |
| `booking_payment_card_desc` | "Paiement securise avec SSL. Visa, Mastercard, American Express acceptees." |
| `booking_payment_cash_desc` | "Reglez directement aupres de votre chauffeur en devises locales." |
| `booking_payment_card_helper` | "Votre paiement est securise par encryptage SSL 256-bit." |
| `booking_payment_cash_helper` | "Pratique et discret. Tarif fixe sans surprise. Recu fourni." |
| `booking_payment_reassurance` | "Tous les paiements sont traites de maniere confidentielle et conforme aux standards internationaux de securite. Votre vie privee est protegee." |
| `booking_back_home` | "Retour a l'accueil" |

Valeurs EN et AR equivalentes ajoutees egalement.

---

## 2. Interface du tunnel (`src/pages/Booking.tsx`)

### Etape 0 — Selection du service

- Ajouter une description courte sous chaque option de service (utilise les nouvelles cles `booking_service_*_desc`)
- Ajouter un sous-titre descriptif sous le titre de section

### Etape 1 — Details du trajet

- Remplacer le titre par `booking_details_title`
- Ajouter le sous-titre `booking_details_desc`
- Ajouter des labels explicites (`booking_pickup_field`, `booking_date_field`, etc.)
- Ajouter des helper texts sous les champs date et heure

### Etape 2 — Informations passager

- Remplacer le titre par `booking_passenger_title`
- Ajouter le sous-titre `booking_passenger_desc`
- Ajouter des helper texts sous les champs e-mail, telephone, notes, vol et Meet & Greet
- Mettre a jour le placeholder des notes
- Mettre a jour le label de la facture entreprise

### Etape 3 — Selection du vehicule

- Remplacer le titre par `booking_vehicle_title`
- Ajouter le sous-titre `booking_vehicle_desc`
- Ajouter le helper text global sous les options

### Etape 4 — Recapitulatif et paiement

- Mettre a jour le titre avec `booking_summary` (plus complet)
- Ajouter le sous-titre `booking_summary_desc`
- Enrichir les descriptions des options de paiement avec `booking_payment_card_desc` et `booking_payment_cash_desc`
- Ajouter les helper texts sous chaque option de paiement
- Ajouter le message de rassurance global `booking_payment_reassurance`

### Ecran de confirmation

- Enrichir le message de succes avec le texte optimise
- Ajouter un bouton "Retour a l'accueil" (`booking_back_home`)

---

## 3. Traductions arabes

Toutes les nouvelles cles seront traduites en arabe pour maintenir la parite trilingue et la compatibilite RTL.

---

## Resume des fichiers a modifier

| Fichier | Modification |
|---------|-------------|
| `src/i18n/translations.ts` | Mise a jour de ~15 cles existantes + ajout de ~25 nouvelles cles (FR, EN, AR) |
| `src/pages/Booking.tsx` | Ajout de descriptions, labels, helper texts et sous-titres a chaque etape |

