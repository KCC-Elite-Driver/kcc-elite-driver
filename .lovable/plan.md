## Contexte

La table `pricing_rules` (EG) contient déjà les bons tarifs en USD :

| Véhicule | Taux horaire | Forfait 10h |
|---|---|---|
| Van | 90 $/h | 500 $ |
| Class S (`first`) | 140 $/h | 650 $ |
| Class E (`business`) | 80 $/h | 400 $ |
| SUV | 45 $/h | 250 $ |

Aucune migration de données n'est nécessaire. Le travail est uniquement front-end + edge function pour exposer **seulement 4h ou 10h**, et faire en sorte que 10h utilise le forfait fixe.

## Changements

### 1. `src/pages/Booking.tsx` (sélecteur Mise à disposition)
- Remplacer le `<select>` actuel (4→12 + 12+) par deux options :
  - `4` → libellé `t.booking_hours_4` (« 4h — minimum »)
  - `10` → libellé `t.booking_hours_10` (« Forfait journée 10h »)
- Mettre à jour le helper text : « Forfait 4h ou 10h » (EN/FR/AR).
- Quand `hours === 10` lors de l'appel à `calculatePrice`, envoyer `serviceType: "daily12"` à l'edge function pour récupérer le forfait fixe ; sinon `"hourly"` pour 4h.
- L'`INSERT` dans `bookings` continue de stocker `service_type = "hourly"` (catégorie commerciale), mais le `mapServiceType` reste cohérent.

### 2. `src/components/home/BookingWidget.tsx` (widget d'accueil, mode hourly)
- Même réduction : remplacer la liste `[4..12]` + option 13 par seulement `4` et `10`.
- Passer `hours=10` ou `hours=4` dans l'URL — la page Booking gère ensuite la bascule daily12.

### 3. `supabase/functions/calculate-distance/index.ts`
Aucun changement requis : la branche `daily12` retourne déjà `rule.base_price` (le forfait). On exploite simplement cette branche pour `hours=10`.

### 4. `src/i18n/translations.ts`
Ajouter 3 clés en EN/FR/AR :
- `booking_hours_4` : « 4h — Mise à disposition »
- `booking_hours_10` : « Forfait journée — 10h »
- `booking_hours_helper` (mise à jour) : « Forfait 4h ou 10h »

## Hors-scope
- France/Paris : pas de changement (le sélecteur reste limité à 4h/10h aussi, par cohérence d'UX — à confirmer ou je garde l'ancien sélecteur pour FR uniquement). **Question** : restreindre 4h/10h uniquement pour l'Égypte, ou pour tous les pays ?
