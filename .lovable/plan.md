

## Corrections de la page Reservation et navigation

### 1. Carte trajet avec prix estime et temps (Step 1 - Details du trajet)

**Fichier** : `src/pages/Booking.tsx`

- Ajouter un composant `TripSummaryCard` qui s'affiche dans l'etape 1 (Details) une fois que le pickup ET la destination sont renseignes
- Ce composant appelle l'edge function `calculate-distance` pour obtenir la distance, la duree et le prix estime
- Affichage : une carte avec bordure doree montrant :
  - Icone MapPin + adresse de depart
  - Ligne verticale pointillee
  - Icone MapPin + adresse d'arrivee
  - Section basse : Distance (km), Duree estimee (~min), Prix estime (avec devise auto EUR/EGP)
- Le calcul se declenche automatiquement quand les deux placeId sont disponibles
- Un loader s'affiche pendant le calcul
- Le prix affiche est une estimation de base (multiplier vehicule applique plus tard a l'etape 3)

### 2. Supprimer l'animation clignotante du bouton WhatsApp

**Fichier** : `src/components/WhatsAppFloatingButton.tsx`

- Retirer la classe `animate-pulse` du bouton
- Garder uniquement le `hover:scale-110` pour une interaction subtile au survol

### 3. Remonter en haut de page lors de la navigation

**Fichiers** : `src/components/ScrollToTop.tsx` (nouveau) + `src/App.tsx`

- Creer un composant `ScrollToTop` qui ecoute les changements de `pathname` via `useLocation`
- Appeler `window.scrollTo({ top: 0, behavior: "instant" })` a chaque changement de route
- Integrer ce composant dans `App.tsx` a l'interieur du `BrowserRouter`

### 4. Uniformiser le calendrier de la page Reservation

**Fichier** : `src/pages/Booking.tsx`

- Remplacer le `<input type="date">` natif par le composant `Calendar` (Popover + DayPicker) deja utilise dans le BookingWidget de la page d'accueil
- Importer `Popover`, `PopoverTrigger`, `PopoverContent` et `Calendar` depuis les composants UI
- Utiliser le meme style de bouton declencheur avec icone calendrier et formatage localise de la date
- Le calendrier s'ouvrira dans un Popover identique a celui de la page d'accueil

### Resume technique

| Fichier | Modification |
|---|---|
| `src/pages/Booking.tsx` | Ajout carte trajet + remplacement input date par Calendar Popover |
| `src/components/WhatsAppFloatingButton.tsx` | Suppression animate-pulse |
| `src/components/ScrollToTop.tsx` | Nouveau composant scroll-to-top |
| `src/App.tsx` | Integration ScrollToTop dans BrowserRouter |

