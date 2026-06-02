## Objectif

Deux corrections ciblées, sans toucher au reste du code :

1. Permettre de choisir le nombre d'heures dans le widget de réservation de la page d'accueil (mode "Mise à disposition").
2. Ne proposer le SUV qu'en Égypte (pas en France) dans le tunnel de réservation.

Plus une passe de vérification rapide avant/après pour s'assurer qu'aucune régression n'est introduite.

---

## 1. Widget d'accueil — sélecteur d'heures (`src/components/home/BookingWidget.tsx`)

- Ajouter un état local `hours` (défaut `4`).
- Quand `mode === "hourly"`, remplacer le champ "Destination" par un `<select>` `4h → 12h` + option `12h+ (sur devis)`, aligné avec le style des autres champs (mêmes classes Tailwind, icône `Clock`).
- À la soumission, si `mode === "hourly"`, ajouter `params.set("hours", String(hours))`.
- Aucun changement de logique `skipTo` ni des autres modes.

## 2. Tunnel de réservation — pré-remplissage `hours` (`src/pages/Booking.tsx`)

- Dans le `useEffect` qui lit `searchParams`, lire `hours` et faire `setHours(Number(...))` si présent et valide (4–13).
- Aucune autre modification.

## 3. SUV réservé à l'Égypte (`src/pages/Booking.tsx`)

- Ajouter un état `priceCountry` (string | null) alimenté par la réponse de `calculate-distance` (champ `country` déjà renvoyé).
- Construire `availableVehicles` = `vehicles.filter(v => v.key !== "suv" || priceCountry === "EG" || priceCountry === null)`.
  - Tant que le pays n'est pas connu (pas encore de `pickupPlaceId`), on n'enlève rien pour éviter un flash.
- Dans le `useEffect` de calcul de prix, si `priceCountry !== "EG"` et `data.vehicle === "suv"`, réinitialiser `data.vehicle = null` (et le prix), pour éviter qu'un SUV pré-sélectionné reste avec un prix vide en France.
- L'étape 3 (`vehicles.map`) utilise `availableVehicles` à la place de `vehicles`.

Aucune autre logique (pricing, paiement, emails) n'est touchée.

## 4. Double-check avant / après

Avant patch :
- Relire `BookingWidget.tsx` et la portion `step === 1` / `step === 3` de `Booking.tsx` pour repérer les classes et props existantes.
- Vérifier que `calculate-distance` renvoie déjà `country` (déjà confirmé).

Après patch :
- `bunx tsc --noEmit` pour s'assurer qu'aucune erreur TypeScript n'est introduite.
- Vérification manuelle du flux : page d'accueil → hourly → choisir 6h → arrivée step 2 du booking avec `hours=6` pré-rempli.
- Vérification : pickup à Paris → SUV n'apparaît plus à l'étape véhicule ; pickup au Caire → SUV présent.

## Fichiers touchés

- `src/components/home/BookingWidget.tsx` — ajout sélecteur heures + param URL.
- `src/pages/Booking.tsx` — lecture de `hours` URL, état `priceCountry`, filtre SUV.

Aucun changement aux edge functions, à la DB, aux emails ou au paiement.
