## 3 corrections ciblées

### 1. Menu déroulant pour l'heure (au lieu d'un champ libre)

**Fichiers :** `src/pages/Booking.tsx` (étape Trajet) + `src/components/home/BookingWidget.tsx` (widget accueil, pour rester cohérent)

- Remplacer `<input type="time" />` par un `<select>` listant toutes les heures par tranches de **15 minutes** (`00:00`, `00:15`, ..., `23:45` — 96 options).
- Même style Tailwind que les autres `<select>` du tunnel (bg-secondary, h-[50px], icône horloge à gauche, `appearance-none`).
- Valeur stockée : toujours format `HH:MM` (identique à aujourd'hui, donc aucun impact sur les emails / DB / paramètres URL `skipTo`).

### 2. Meet & Greet Égypte : 500 EGP → 1500 EGP

**Fichier :** `src/pages/Booking.tsx`

- Ligne 1167 : `formatPrice(500, "EGP")` → `formatPrice(1500, "EGP")`
- Ligne 1173 : `priceCurrency === "EGP" ? 500 : 30` (×2 occurrences sur la même ligne) → `1500`

EUR (30 €) et USD (30 $) restent inchangés. Aucun changement côté edge function (le supplément est purement front).

### 3. Ne pas afficher le prix avant l'étape Véhicule

**Fichier :** `src/pages/Booking.tsx` (sidebar récap, lignes 1131‑1177)

Actuellement, dès que la distance est calculée (étape Trajet), le bloc Prix trajet + Meet & Greet + TOTAL apparaît dans la sidebar. C'est ce qui « effraie » avant l'étape véhicule.

Modification :
- Envelopper les deux blocs `{quoteOnly && ...}` et `{!quoteOnly && estimatedPrice != null && ...}` dans une condition supplémentaire `step >= 2` (étape Véhicule ou ultérieure).
- Le reste de la sidebar reste visible aux étapes 0 et 1 : service, date/heure, pickup, destination, **distance + durée** (= « uniquement le trajet »).

Aucun changement de la logique de calcul de prix (`calculate-distance` continue de tourner en arrière‑plan dès que pickup+dropoff sont valides, pour que le prix soit prêt à l'affichage dès l'arrivée à l'étape 2).

### Vérification post-patch
- `bunx tsc --noEmit`
- Preview : 
  - Étape Trajet → la sidebar montre trajet + distance/durée mais **pas** de prix.
  - Étape Véhicule → prix réapparait, Meet & Greet Égypte affiche **EGP 1 500**.
  - Sélecteur d'heure → dropdown 15 min sur Booking + widget accueil.

### Fichiers touchés
- `src/pages/Booking.tsx`
- `src/components/home/BookingWidget.tsx`

Aucune autre modification (edge functions, DB, emails, paiement, traductions).
