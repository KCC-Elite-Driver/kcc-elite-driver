

# Plan : Mise a jour des textes optimises KCC-EliteDriver

Ce plan met a jour l'ensemble des textes du site avec le contenu optimise fourni, en francais et en anglais (British English), et ajoute les traductions arabes correspondantes.

---

## 1. Mise a jour des traductions existantes

**Fichier : `src/i18n/translations.ts`**

Toutes les modifications de texte ci-dessous seront appliquees aux 3 langues (FR, EN, AR).

### Hero Section
| Cle | Ancienne valeur (FR) | Nouvelle valeur (FR) |
|-----|---------------------|---------------------|
| `hero_subtitle` | "Service de chauffeur prive haut de gamme..." | "Une continuite de service sans compromis. Discretion absolue, ponctualite garantie, serenite a chaque deplacement important." |
| `hero_oneway` | "Transfert" | "Transfert" (inchange) |
| `hero_hourly` | "Mise a disposition" | "Mise a disposition" (inchange) |

EN: subtitle devient "Seamless service across continents. Complete discretion, punctuality guaranteed, peace of mind with every journey."
EN: title devient "Excellence at every milestone" (au lieu de "Excellence at every mile")

### Global Axis (Section geographique)
| Cle | Nouvelle valeur FR |
|-----|-------------------|
| `axis_title` | "De part et d'autre du monde" |
| `axis_subtitle` | "Une presence locale, une excellence internationale" |
| `axis_cairo_desc` | "Transferts aeroport, circuits culturels prives et deplacements d'affaires. Maitrise eprouvee de la capitale egyptienne et de ses enjeux specifiques." |
| `axis_paris_desc` | "Transferts aeroport, mise a disposition horaire, evenements prives. Expertise affirmee de la Ville de Lumiere et de ses codes internationaux." |
| `axis_international_desc` | "Trajets longue distance coordonnes, connexions aeriennes et services sur mesure. A l'ecoute de vos besoins ou que vous soyez." |

EN equivalents mis a jour egalement ("Across the globe", "Local presence, international excellence", etc.)

### Fleet (Descriptions vehicules)
| Cle | Nouvelle valeur FR |
|-----|-------------------|
| `fleet_subtitle` | "Selectionnes avec soin pour chaque contexte" |
| `fleet_business_desc` | "Mercedes Classe E ou equivalent. Confort discret et connectivite complete pour vos deplacements professionnels. Equipee de WiFi tres haut debit, climatisation intelligente, rafraichissements premium et presse francaise et internationale a bord." |
| `fleet_first_desc` | "Mercedes Classe S ou equivalent. L'excellence absolue pour vos moments les plus sensibles. Votre bureau mobile prive : WiFi tres haut debit, climatisation zoning, espaces de travail integres, rafraichissements haut de gamme, lecture selectionnee." |
| `fleet_van` | "Van Prestige" (etait "Van VIP") |
| `fleet_van_desc` | "Mercedes Classe V ou equivalent. Espace sans compromis pour delegations officielles et evenements prives. Equipee de WiFi tres haut debit, climatisation zoning, bar integre, divertissement discret et configuration modulable selon vos besoins." |
| `fleet_book` | "Reserver" avec fleche (inchange) |

EN: descriptions mises a jour ("Discreet comfort and complete connectivity...", "Absolute excellence for your most important moments...", "Van Prestige", "Uncompromised space for official delegations...")

### Values (Engagements)
| Cle | Nouvelle valeur FR |
|-----|-------------------|
| `values_subtitle` | "Ce qui nous definit" |
| `values_discretion_desc` | "Confidentialite absolue. Vos trajets, vos horaires, vos conversations restent strictement prives. C'est notre priorite premiere." |
| `values_punctuality_desc` | "Anticipation constante. Suivi des vols en temps reel, gestion des aleas, arrivee toujours en avance. Jamais d'attente, jamais de retard." |
| `values_multilingual_desc` | "Chauffeurs francophones, anglophones et arabophones. Fluidite totale dans chaque echange, comprehension des nuances culturelles de chaque marche." |

EN: "What defines us", descriptions mises a jour avec le texte British English fourni.

### Booking (micro-copie)
| Cle | Nouvelle valeur FR |
|-----|-------------------|
| `booking_notes_placeholder` | "Notes au chauffeur - Demandes particulieres" |
| `booking_meet_greet_desc` | "Accueil personnalise a l'arrivee" |
| `booking_cancellation_policy` | "Annulation flexible sans frais jusqu'a 24h avant le depart. Au-dela, des frais de 50% s'appliquent." |
| `booking_success` | "Reservation confirmee !" (inchange) |
| `booking_success_desc` | "Votre reservation est confirmee. Un email de recapitulatif a ete envoye. Nous vous remercions de votre confiance." |

EN: equivalents mis a jour ("Your booking is confirmed. A summary email has been sent. Thank you for your trust.", etc.)

### Footer
| Cle | Nouvelle valeur FR |
|-----|-------------------|
| `fleet_page_subtitle` | "Selectionnes avec soin pour chaque contexte" |

---

## 2. Nouvelles cles de traduction a ajouter

Pour les sections additionnelles du master prompt (Meet & Greet, Circuits Culturels, Mise a disposition, Pourquoi nous), de nouvelles cles seront ajoutees au type `TranslationKeys` et aux 3 langues :

```
// Services page - additional cards
services_meetgreet_title / _desc
services_cultural_title / _desc
services_standby_title / _desc / _format
services_cancellation_title / _desc
services_airports_title / _desc / _includes
services_why_title
services_why_discretion / _desc
services_why_expertise / _desc  
services_why_excellence / _desc
```

---

## 3. Page Services enrichie

**Fichier : `src/pages/Services.tsx`**

Ajouter les nouvelles cartes de service apres les 4 existantes :
- **Meet & Greet** : "Accueil Personnalise aux Aeroports" avec description
- **Circuits Culturels** : "Circuits Touristiques Prives" (place discretement comme demande dans le master prompt)
- **Mise a Disposition Horaire** : avec les formats (4h / 8h / Sur mesure)

Ajouter une section "Pourquoi KCC-EliteDriver ?" en bas de page avec les 3 piliers (Discretion & Securite, Expertise Internationale, Excellence Operationnelle).

Ajouter une section "Transferts Aeroports" listant CAI, CDG, ORY avec les inclusions.

---

## 4. Traductions arabes

Toutes les nouvelles cles et modifications seront egalement traduites en arabe pour maintenir la parite trilingue.

---

## Resume des fichiers a modifier

| Fichier | Modification |
|---------|-------------|
| `src/i18n/translations.ts` | Mise a jour de ~30 cles existantes + ajout de ~15 nouvelles cles (FR, EN, AR) |
| `src/pages/Services.tsx` | Ajout des sections Meet & Greet, Circuits, Mise a disposition, Pourquoi nous, Transferts aeroports |

