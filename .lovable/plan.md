
## Diagnostic

J'ai vérifié le flux de réservation (`src/pages/Booking.tsx`) et la fonction de calcul (`supabase/functions/calculate-distance/index.ts`).

### Ce qui existe aujourd'hui
- **Pas de carte interactive** sur la page `/booking`. Le panneau de droite est uniquement un résumé textuel (icônes + adresses + distance + prix). Aucun composant Google Map n'est intégré.
- Le calcul live (distance + durée + prix) **fonctionne correctement** via l'edge function `calculate-distance`, mais **uniquement** quand `pickupPlaceId` ET `dropoffPlaceId` sont tous les deux définis.

### Pourquoi rien ne s'affiche actuellement
J'ai trouvé **2 bugs** qui expliquent le silence du calcul :

1. **Bug critique — pré-remplissage depuis la home cassé** (`Booking.tsx` ligne 129) :
   ```ts
   supabase.functions.invoke("google-places", { body: { query: address } })
   ```
   L'edge function `google-places` attend `input`, pas `query`. Résultat : quand l'utilisateur arrive depuis le widget de la home avec pickup/dropoff déjà saisis, **aucun placeId n'est jamais résolu** → pas de calcul, pas de distance, pas de prix.

2. **Saisie libre sans sélection** : si l'utilisateur tape une adresse mais ne **clique pas** sur une suggestion du dropdown, `onPlaceSelect` n'est jamais appelé → `placeId` reste vide → pas de calcul.

3. **Absence visuelle d'une carte** : l'utilisateur attend une carte interactive (probablement une attente UX), mais rien n'est codé pour l'afficher.

---

## Plan de correction

### 1. Fix du pré-remplissage (urgent, 1 ligne)
Dans `Booking.tsx` ligne 129, remplacer `{ query: address }` par `{ input: address }`. Cela débloque le calcul automatique pour tous les utilisateurs venant du widget home.

### 2. Fallback de résolution placeId à la perte du focus
Dans `GooglePlacesAutocomplete.tsx`, si l'utilisateur quitte le champ sans cliquer une suggestion mais que des prédictions existent, sélectionner automatiquement la première prédiction (et appeler `onPlaceSelect`). Garantit qu'un placeId est toujours fourni.

### 3. Ajout d'une carte interactive Google Maps dans le résumé
Créer un composant `<RouteMap pickup={pickupPlaceId} dropoff={dropoffPlaceId} />` affiché en haut du sidebar de résumé (Booking.tsx).

Approche légère et sans clé exposée :
- Utiliser **Google Maps Embed API** via une `<iframe>` avec mode `directions` :
  ```
  https://www.google.com/maps/embed/v1/directions?origin=place_id:...&destination=place_id:...&key=...
  ```
- L'iframe s'affiche uniquement quand les deux placeIds sont disponibles ; sinon, placeholder "Sélectionnez un départ et une destination".
- La clé `VITE_GOOGLE_MAPS_API_KEY` étant restreinte côté Google Cloud, on peut soit l'exposer côté front (clé Embed publique standard chez Google), soit créer une mini edge function qui retourne l'URL signée. **Recommandation** : exposer la clé Embed côté front (c'est l'usage normal de l'API Embed), à condition d'ajouter une restriction de domaine HTTP dans Google Cloud pour cette clé. Si tu préfères ne rien exposer, on passe par une edge function qui renvoie l'URL.

Carte affichée dans une box de ~180px de hauteur, arrondie, au-dessus du bloc Distance/Durée.

### 4. Vérification end-to-end
Après les changements : tester depuis la home (widget pré-rempli) ET en saisie directe sur `/booking` que distance, durée, prix et carte s'affichent.

---

## Question de validation

Pour la carte : préfères-tu (A) exposer la clé Google Maps Embed côté front avec restriction de domaine (simple, standard, recommandé), ou (B) passer par une edge function (plus sûr mais 1 round-trip de plus) ?

Si tu valides "A" et le reste du plan, je passe en implémentation.
