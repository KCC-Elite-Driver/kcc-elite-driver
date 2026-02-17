

## Integration Google Places Autocomplete + Distance Matrix + Tarification dynamique

### Vue d'ensemble

Remplacer l'autocompletion statique actuelle par l'API Google Places (suggestions d'adresses en temps reel), et ajouter le calcul de prix via la Distance Matrix API avec adaptation automatique de la devise (EUR ou EGP) selon le lieu de depart.

### Architecture

Deux fonctions backend seront creees pour garder la cle API Google cote serveur :

1. **`google-places`** : proxy vers l'API Google Places Autocomplete
2. **`calculate-distance`** : appel Distance Matrix API + calcul du tarif

Le composant `LocationAutocomplete` existant sera remplace par un nouveau `GooglePlacesAutocomplete` qui interroge la fonction backend.

### Tarification

- **France / Europe** : 3 EUR par kilometre
- **Egypte** : 150 EGP par kilometre
- Detection automatique basee sur le pays du lieu de depart (retourne par Google Places)
- Multiplicateur par categorie de vehicule :
  - SUV Prestige : x1.0
  - Business : x1.0
  - First Class : x1.5
  - Van Prestige : x1.3

### Fichiers a creer

**1. `supabase/functions/google-places/index.ts`**
- Endpoint POST qui recoit `{ input, sessionToken? }`
- Appelle l'API Google Places Autocomplete (REST)
- Restreint les resultats a la France et l'Egypte (`components=country:fr|country:eg`)
- Retourne les predictions (description, place_id, structured_formatting)

**2. `supabase/functions/calculate-distance/index.ts`**
- Endpoint POST qui recoit `{ origin, destination, vehicle }`
- Appelle l'API Google Distance Matrix (REST)
- Detecte le pays d'origine via un appel Place Details ou Geocoding
- Calcule : distance_km x tarif_base x multiplicateur_vehicule
- Retourne `{ distance_km, duration_min, price, currency, currency_symbol }`

**3. `src/components/GooglePlacesAutocomplete.tsx`**
- Nouveau composant qui remplace `LocationAutocomplete`
- Appelle la fonction backend `google-places` avec debounce (300ms)
- Affiche les suggestions Google dans le meme style visuel (fond carte, icones)
- Conserve la liste statique des lieux predéfinis en fallback (si l'API ne repond pas)
- Meme interface props : `value`, `onChange`, `placeholder`, `iconColor`
- Nouveau prop optionnel `onPlaceSelect(placeId, description)` pour stocker le place_id

### Fichiers a modifier

**4. `src/pages/Booking.tsx`**
- Remplacer `LocationAutocomplete` par `GooglePlacesAutocomplete`
- Ajouter les states : `pickupPlaceId`, `dropoffPlaceId`, `estimatedPrice`, `currency`, `distanceKm`, `durationMin`, `priceLoading`
- Appeler `calculate-distance` automatiquement quand pickup + dropoff + vehicle sont remplis
- Afficher le prix estime sur la carte vehicule (etape 3) et dans le resume (etape 4)
- Stocker le prix et la devise dans le payload de la reservation envoyee a la base

**5. `src/components/home/BookingWidget.tsx`**
- Remplacer `LocationAutocomplete` par `GooglePlacesAutocomplete`

**6. `supabase/config.toml`**
- Ajouter les 2 fonctions avec `verify_jwt = false`

### Details techniques

**Debounce** : Les appels a Google Places sont declenches 300ms apres que l'utilisateur arrete de taper, pour eviter les appels excessifs.

**Gestion d'erreur** : Si l'API Google echoue, le composant affiche la liste statique existante en fallback, assurant que le formulaire reste utilisable.

**Session tokens** : Un session token unique est genere par session de recherche (uuid) pour grouper les requetes Places et reduire la facturation Google.

**Detection devise** : La fonction `calculate-distance` utilise le champ `address_components` du geocoding pour detecter le code pays du depart. Si `country === "EG"` alors EGP, sinon EUR.

**Affichage du prix** :
- Sur les cartes vehicule (etape 3) : "A partir de XX EUR" ou "A partir de XX EGP"
- Dans le resume (etape 4) : ligne supplementaire avec le prix estime
- Indication que le prix est estimatif et peut varier

