

# Plan : Mise a jour des textes optimises — Page Services

Ce plan aligne les textes de la page Services avec le contenu optimise fourni.

---

## 1. Mise a jour des traductions (`src/i18n/translations.ts`)

### Textes a modifier (FR)

| Cle | Valeur actuelle | Nouvelle valeur |
|-----|----------------|-----------------|
| `services_subtitle` | "Des prestations sur mesure pour chaque besoin" | "Services adaptes a chaque situation, chaque moment" |
| `services_airport_desc` | "Accueil personnalise avec panneau nominatif..." | "Accueil discret avec panneau nominatif, suivi en temps reel de votre vol, assistance bagages jusqu'a votre vehicule. Temps d'attente gratuit, services complets inclus." |
| `services_hourly_title` | "Mise a Disposition" | "Mise a Disposition Horaire" |
| `services_hourly_desc` | "Votre chauffeur reste a votre entiere disposition..." | "Reservez votre vehicule et chauffeur pour la journee, la demi-journee ou pour une duree specifique. Flexibilite totale : arrets multiples, changement de programme, disponibilite garantie. Ideal pour vos tournees d'affaires ou evenements." |
| `services_event_desc` | "Organisation complete du transport... Coordination multi-vehicules possible." | "Organisation complete du transport pour vos evenements d'entreprise, mariages, galas et soirees privees. Coordination multi-vehicules, planification discrete, service de conciergerie integre." |
| `services_city_desc` | "Voyagez confortablement entre les villes..." | "Trajets longue distance coordonnes en tout confort : Le Caire - Alexandrie, Paris - Lyon et au-dela. Tarification transparente, arrets intermediaires possibles, chauffeur experimente, confort premium garanti." |

### Textes a modifier (EN)

| Cle | Nouvelle valeur EN |
|-----|-------------------|
| `services_subtitle` | "Services tailored to every situation, every moment" |
| `services_airport_desc` | "Discreet welcome with name placard, real-time flight tracking, luggage assistance to your vehicle. Complimentary waiting time, full services included." |
| `services_airport_features` | ["Name placard welcome", "Real-time flight tracking", "Luggage assistance", "Complimentary waiting time"] |
| `services_hourly_title` | "Hourly Standby Service" |
| `services_hourly_desc` | "Reserve your vehicle and driver for the day, half-day, or custom duration. Total flexibility: multiple stops, programme changes, guaranteed availability. Perfect for business rounds and events." |
| `services_event_desc` | "Complete transport coordination for your corporate events, weddings, galas and private celebrations. Multi-vehicle coordination, discreet planning, integrated concierge service." |
| `services_event_features` | ["Multi-vehicle coordination", "Bespoke planning", "Guest welcome services", "Concierge support"] |
| `services_city_title` | "Inter-City & Long-Distance" |
| `services_city_desc` | "Long-distance journeys in complete comfort: Cairo - Alexandria, Paris - Lyon and beyond. Transparent pricing, intermediate stops available, experienced driver, premium comfort guaranteed." |
| `services_city_features` | ["Transparent pricing", "Intermediate stops available", "Premium comfort guaranteed", "Experienced driver"] |

### Nouvelles cles a ajouter (pour les listes de fonctionnalites des services additionnels)

Les services 5-8 (Meet & Greet, Cultural, Standby, Cancellation) ont besoin de listes de fonctionnalites pour s'aligner avec le design des services principaux.

```
services_meetgreet_features: string[];
services_cultural_availability: string;  // remplace cultural_pricing
services_standby_features: string[];
services_cancellation_standard: string;
services_cancellation_meetgreet: string;
```

Valeurs FR :
- `services_meetgreet_features`: ["Detection automatique de votre arrivee", "Assistance complete avec bagages", "Chemin dedie jusqu'au vehicule", "Support pour vos besoins speciaux"]
- `services_standby_features`: ["Chauffeur dedie et attentif", "Itineraire flexible et adaptable", "Duree modulable selon vos besoins", "Disponible 24h/24"]
- `services_cancellation_standard`: "Standard : Gratuit jusqu'a 24h avant | 50% au-dela"
- `services_cancellation_meetgreet`: "Avec Meet & Greet : Gratuit jusqu'a 48h avant | 50% au-dela"

Valeurs EN et AR equivalentes ajoutees egalement.

---

## 2. Restructuration de la page Services (`src/pages/Services.tsx`)

### Changement principal : Services 5-8 deviennent des cartes completes

Les 4 services additionnels (Meet & Greet, Circuits Culturels, Standby, Annulation) passent de `SimpleCard` (sans checklist) a `ServiceCard` ou un format similaire avec listes de fonctionnalites.

- **Meet & Greet** : Affiche les 4 features + pas de bouton CTA (service inclus)
- **Circuits Culturels** : Affiche la description + mention "Sur demande" + pas de CTA
- **Standby** : Affiche les 4 features + format (4h/8h/Sur mesure) + CTA
- **Annulation** : Affiche la description + resume (Standard / Meet & Greet)

### Modification du composant

Creer une variante de `ServiceCard` ou adapter `SimpleCard` pour accepter optionnellement une liste de features et un texte "extra" (format, disponibilite).

---

## 3. Traductions arabes

Toutes les cles modifiees et nouvelles seront traduites en arabe pour maintenir la parite trilingue.

---

## Resume des fichiers a modifier

| Fichier | Modification |
|---------|-------------|
| `src/i18n/translations.ts` | Mise a jour de ~12 cles existantes + ajout de ~5 nouvelles cles (FR, EN, AR) |
| `src/pages/Services.tsx` | Conversion des services additionnels en cartes avec listes de fonctionnalites |

