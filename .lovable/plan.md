

## Corrections du recapitulatif lateral et du calcul de prix

### Probleme identifie : le prix ne s'affiche jamais

**Cause racine** : Quand l'utilisateur selectionne une adresse depuis la liste statique (ex: "Aeroport Paris-Orly"), la fonction `handleSelectStatic` dans `GooglePlacesAutocomplete.tsx` n'appelle PAS `onPlaceSelect(placeId)`. Donc `pickupPlaceId` et `dropoffPlaceId` restent vides, et le calcul de prix ne se declenche jamais.

De plus, les adresses statiques n'ont pas de `place_id` Google associe. Il faut soit :
- Effectuer un appel supplementaire "Find Place from Text" pour obtenir le place_id a partir du nom
- Soit ne declencher le calcul que pour les adresses selectionnees via Google (qui ont un place_id)

### Modifications prevues

**1. `src/components/GooglePlacesAutocomplete.tsx` - Recuperer le placeId pour les adresses statiques**

- Modifier `handleSelectStatic` pour qu'il appelle l'edge function `google-places` avec le nom exact de l'adresse, recupere le premier `place_id` retourne, puis appelle `onPlaceSelect(placeId, name)`
- Alternative plus simple : ajouter les `place_id` connus en dur pour les locations statiques les plus frequentes (CDG, Orly, etc.)
- Approche retenue : faire un appel `google-places` en arriere-plan apres la selection statique pour obtenir le `place_id`, puis appeler `onPlaceSelect`

**2. `src/pages/Booking.tsx` - Ajouter les extras (meet & greet) dans le recapitulatif**

- Dans la sidebar, ajouter une ligne "VIP Meet & Greet" quand `data.meetGreet === true` et que le pickup est un aeroport/gare
- Afficher un prix fixe pour ce service (ex: 30 EUR / 500 EGP selon la devise detectee)
- Mettre a jour le TOTAL pour inclure l'extra
- Ajouter les extras pertinents : nombre de passagers, nombre de bagages, numero de vol

**3. `src/pages/Booking.tsx` - Enrichir la sidebar avec toutes les informations**

La sidebar affichera progressivement toutes les infos au fur et a mesure des etapes :
- **Etape 0** : Service selectionne (icone + label)
- **Etape 1** : Date/heure, Pickup, Destination, Distance, Duree
- **Etape 2** : Nom du passager, email, telephone, nombre passagers/bagages, notes, numero de vol, Meet & Greet
- **Etape 3** : Vehicule selectionne avec prix
- **Etape 4** : Methode de paiement + Total final

**4. `supabase/functions/calculate-distance/index.ts` - Ajout de logs de debug**

- Ajouter un `console.log` du resultat Distance Matrix brut pour diagnostiquer les erreurs 400
- Logger `distRes.rows[0].elements[0].status` pour comprendre pourquoi certains trajets echouent

### Resume technique

| Fichier | Modification |
|---|---|
| `src/components/GooglePlacesAutocomplete.tsx` | Appel google-places apres selection statique pour obtenir le place_id |
| `src/pages/Booking.tsx` | Sidebar enrichie avec extras, passager, service, et total dynamique |
| `supabase/functions/calculate-distance/index.ts` | Logs de debug pour diagnostiquer les erreurs |

