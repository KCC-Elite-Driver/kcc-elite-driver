

## Plan : Tarification Paris/France (EUR)

Mise en place de la grille tarifaire France pour les départs depuis Paris, en remplacement de la logique actuelle "3 EUR/km × multiplicateur".

### Grille appliquée

**Transferts aéroports → centre Paris & environs** (forfait jusqu'à 25 km, puis surcharge/km)
| Véhicule | Forfait base | Au-delà de 25 km |
|---|---|---|
| Class E (business) | 130 € | +3 €/km |
| Class V / Van | 150 € | +3,50 €/km |
| Class S (first) | 200 € | +4 €/km |

**Mise à disposition** (horaire, min. 4 h)
| Class E | Class V | Class S |
|---|---|---|
| 80 €/h | 90 €/h | 120 €/h |

**SUV** : non mentionné dans la grille Paris → je propose de **masquer le SUV pour les départs France** dans le sélecteur véhicule (uniquement Class E, Class V, Class S disponibles côté France). À confirmer dans les questions ci-dessous.

**VIP & Inter-cité France** : "Sur devis" + WhatsApp (même comportement que l'Égypte).

---

### Modifications techniques

**1. `supabase/functions/calculate-distance/index.ts`**
- Ajouter une branche `country === "FR"` (avant le fallback générique).
- `airport` : `prix = forfait_base + max(0, distance_km - 25) × tarif_km_supplémentaire`.
- `hourly` : `tarif_horaire × max(hours, 4)`. Si `hours > 12` → `quote_only`.
- `vip` / `intercity` → `quote_only: true`.
- Réponse : `currency: "EUR"`, `currency_symbol: "€"`.
- Conserver `distance_km` et `duration_min` dans la réponse pour l'affichage.

**2. `src/pages/Booking.tsx`**
- Aucun changement structurel : la même UI gère déjà serviceType + hours + quote_only (mise en place pour l'Égypte).
- (Optionnel) Filtrer la liste des véhicules : si la sidebar détecte un pickup en France, masquer SUV. Ou laisser le SUV partout et calculer en fallback (à clarifier).

**3. `src/pages/Services.tsx`**
- Ajouter une section "Tarifs — Paris & Île-de-France" symétrique à celle du Caire avec la grille EUR.
- Mention "Forfait inclus jusqu'à 25 km — au-delà : tarif au kilomètre".
- Mention "Minimum 4 heures" pour la mise à dispo.

**4. `src/i18n/translations.ts`**
- Ajouter clés : "Au-delà de 25 km" / "Beyond 25 km" / "بعد ٢٥ كم", "Forfait inclus jusqu'à 25 km" / "Package includes up to 25 km" / "تشمل الباقة حتى ٢٥ كم".

**5. Vérification end-to-end**
Tester : CDG → Paris centre (≤25 km, forfait pur), CDG → Versailles (>25 km, forfait + km sup), mise à dispo 4h/8h, VIP.

---

### Questions de cadrage avant implémentation

1. **SUV en France** : on le masque pour les pickups France, ou on le garde avec un tarif équivalent (ex. même que Class E) ?
2. **Forfait 12 h France** : tu veux qu'on ajoute aussi un forfait journée 12 h pour Paris (comme en Égypte), ou on reste uniquement sur airport + hourly + VIP/inter-cité ?
3. **Aéroports concernés** : le forfait s'applique pour CDG, Orly, Beauvais, Le Bourget — tous ces aéroports, ou uniquement CDG/Orly ?
4. **"Centre et environs"** : on définit "environs" comme ≤ 25 km du point de départ (logique de seuil unique sur la distance Google), ou tu veux une zone géographique spécifique (Île-de-France / Paris intra-muros / etc.) ?

Réponds à ces 4 points et je passe en implémentation.

