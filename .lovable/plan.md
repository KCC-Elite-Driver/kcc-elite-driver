

# Plan : Enrichissement de la page de confirmation de reservation

Ce plan transforme l'ecran de confirmation minimaliste actuel en une page complete avec details de reservation, prochaines etapes, rappel d'annulation et boutons d'action optimises.

---

## 1. Nouvelles cles de traduction (`src/i18n/translations.ts`)

### Cles a ajouter au type `TranslationKeys`

```
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
```

### Valeurs FR

| Cle | Valeur |
|-----|--------|
| `booking_confirmation_details_title` | "Vos informations de reservation" |
| `booking_confirmation_number` | "Numero de reservation" |
| `booking_confirmation_email_label` | "Email de confirmation" |
| `booking_confirmation_support` | "Support 24/7" |
| `booking_confirmation_status` | "Statut" |
| `booking_confirmation_status_confirmed` | "Confirmee" |
| `booking_confirmation_details_helper` | "Conservez ce numero pour toute modification ou question concernant votre reservation." |
| `booking_next_steps_title` | "Ce qui se passe ensuite" |
| `booking_next_step_1` | "Un email de confirmation contenant tous les details a ete envoye." |
| `booking_next_step_2` | "Votre chauffeur vous sera assigne 24 heures avant votre depart." |
| `booking_next_step_3` | "Vous recevrez ses coordonnees et une photo professionnelle." |
| `booking_next_step_4` | "Notre equipe est disponible 24h/24 pour toute question." |
| `booking_cancellation_reminder` | "Rappel : Annulation gratuite jusqu'a 24h avant le depart. Au-dela, des frais de 50% s'appliquent. Pour les services avec Meet & Greet a l'aeroport, delai d'annulation : 48h." |

Valeurs EN et AR equivalentes ajoutees egalement.

---

## 2. Enrichissement de l'ecran de confirmation (`src/pages/Booking.tsx`)

### Transformation de la section `if (completed)` (lignes 132-151)

L'ecran actuel affiche uniquement un titre, un message et deux boutons. Il sera enrichi avec :

### Structure de la nouvelle page

1. **Icone + Titre + Message** (existant, conserve)
2. **Section "Vos informations de reservation"** — carte avec :
   - Numero de reservation (genere dynamiquement : `RES-YYYYMMDD-XXX`)
   - Email de confirmation (affiche l'email saisi par l'utilisateur)
   - Support 24/7 : +33 1 23 45 67 89
   - Statut : Confirmee (avec icone check verte)
   - Helper text en dessous
3. **Section "Ce qui se passe ensuite"** — liste de 4 etapes avec icones check :
   - Email envoye
   - Chauffeur assigne 24h avant
   - Coordonnees et photo du chauffeur
   - Equipe disponible 24/7
4. **Rappel politique d'annulation** — encadre discret avec icone info
5. **Boutons d'action** (existants, conserves) :
   - Retour a l'accueil (secondary)
   - Nouvelle reservation (primary/gold)

### Generation du numero de reservation

Ajout d'un `useMemo` qui genere un numero au format `RES-YYYYMMDD-XXX` base sur la date du jour et un compteur aleatoire a 3 chiffres.

---

## Resume des fichiers a modifier

| Fichier | Modification |
|---------|-------------|
| `src/i18n/translations.ts` | Ajout de ~13 nouvelles cles (FR, EN, AR) |
| `src/pages/Booking.tsx` | Remplacement du bloc de confirmation (lignes 132-151) par une page enrichie |

