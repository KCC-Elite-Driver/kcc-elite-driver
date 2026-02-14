

# Plan : Alignement avec le Master Prompt

Ce plan couvre les modifications qui peuvent etre implementees immediatement, sans integration d'API externes (Google Maps, Stripe). Les integrations API seront traitees dans une etape ulterieure.

---

## 1. Support RTL pour l'arabe

### Modifications
- **`src/i18n/LanguageContext.tsx`** : Ajouter un effet qui applique `dir="rtl"` et `lang="ar"` sur le `<html>` quand la langue arabe est selectionnee, et `dir="ltr"` sinon.
- **`index.html`** : Ajouter la police arabe Cairo (Google Fonts) pour une meilleure lisibilite.
- **`src/index.css`** : Ajouter une regle `[dir="rtl"]` pour swapper la police body vers Cairo et ajuster les espacements logiques (margin-inline, padding-inline) la ou necessaire.

---

## 2. Navigation Services en dropdown

### Modifications
- **`src/components/Header.tsx`** : Remplacer le lien direct "Services" par un dropdown au hover (desktop) contenant :
  - Transfert Aeroport
  - Mise a disposition
  - Evenement VIP
  - Intercites
  - *(Le lien "Circuits Touristiques" sera cache dans ce sous-menu si ajoute plus tard)*
- Chaque item du dropdown redirige vers `/services` (ou vers une ancre specifique)
- Sur mobile : le dropdown devient un sous-menu accordeon

---

## 3. Fleet : ajout d'equipements manquants

### Modifications
- **`src/i18n/translations.ts`** : Ajouter les cles `fleet_refreshments` ("Rafraichissements Premium"), `fleet_disinfection` ("Protocole de desinfection")
- **`src/pages/Fleet.tsx`** : Ajouter ces amenites aux vehicules concernes (First Class et Van notamment)

---

## 4. Booking Stage 3 : Informations passager detaillees

C'est le changement le plus important. Le flux de reservation passe de 4 a 5 etapes.

### Nouvelle structure du tunnel :
1. **Service** (inchange)
2. **Itineraire** (pickup, dropoff, date, heure -- inchange)
3. **Passager** (NOUVEAU) -- informations personnelles
4. **Vehicule** (inchange)
5. **Recapitulatif + Politique d'annulation** (modifie)

### Champs de l'etape 3 "Passager" :
- Prenom (obligatoire)
- Nom (obligatoire)
- Email (obligatoire)
- Telephone avec selecteur indicatif pays (+33, +20, +44, +1) (obligatoire)
- Checkbox "Facture entreprise ?"
- Selecteur nombre de passagers (deplace depuis etape 2)
- Selecteur nombre de bagages (deplace depuis etape 2)
- Textarea "Notes au chauffeur"
- **Conditionnel** : Si le lieu de prise en charge contient "aeroport" ou "gare" :
  - Champ "Numero de vol / train" (ex: LH83822)
  - Checkbox "Meet & Greet" (coche par defaut pour les aeroports)

### Etape 5 "Recapitulatif" modifiee :
- Afficher la politique d'annulation : "Annulation gratuite jusqu'a 24h avant. 50% de frais si annule dans les 24h."
- Options de paiement (affichage seulement pour l'instant) :
  - Carte bancaire (a integrer avec Stripe plus tard)
  - Especes au chauffeur

### Traductions a ajouter (FR, EN, AR) :
- `booking_step_passenger`, `booking_firstname`, `booking_lastname`, `booking_email`, `booking_phone`
- `booking_company_invoice`, `booking_flight_number`, `booking_meet_greet`
- `booking_cancellation_policy`, `booking_payment_card`, `booking_payment_cash`

---

## 5. Resume des fichiers

| Action | Fichier |
|--------|---------|
| Modifier | `src/i18n/LanguageContext.tsx` -- RTL dir attribute |
| Modifier | `src/i18n/translations.ts` -- Nouvelles cles (booking passager, fleet, cancellation) |
| Modifier | `index.html` -- Police Cairo pour l'arabe |
| Modifier | `src/index.css` -- Styles RTL |
| Modifier | `src/components/Header.tsx` -- Dropdown Services |
| Modifier | `src/pages/Fleet.tsx` -- Amenites supplementaires |
| Modifier | `src/pages/Booking.tsx` -- Etape passager + politique annulation + paiement |

---

## 6. Ce qui reste pour plus tard (necessite des cles API)

Ces elements du master prompt ne sont pas implementes dans ce plan car ils necessitent des integrations externes :
- **Google Places Autocomplete** : Remplacer la liste statique (necessite cle API Google Maps)
- **Google Distance Matrix API** : Calcul de prix en temps reel (necessite cle API Google Maps)
- **Stripe** : Paiement par carte (necessite activation Stripe)
- **Supabase** : Stockage des reservations (necessite connexion Cloud)

Ces integrations pourront etre ajoutees etape par etape une fois les cles configurees.

