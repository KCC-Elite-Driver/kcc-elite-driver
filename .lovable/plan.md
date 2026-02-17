
## Corrections layout booking + navigation intelligente + simplification header

### 1. Egaliser la hauteur du sommaire avec le formulaire et centrer les cartes

**Fichier** : `src/pages/Booking.tsx`

- Remplacer le layout `flex-col lg:flex-row` par un layout ou le formulaire est centre (max-w-3xl mx-auto) et le sommaire est positionne en sidebar droite avec `lg:grid lg:grid-cols-[1fr_320px]`
- Ajouter `min-h-0` et `self-start` au sommaire pour qu'il colle en haut sans depasser
- Garder `lg:sticky lg:top-24` sur le sommaire
- Le formulaire reste centre visuellement grace au grid

### 2. Navigation intelligente depuis le BookingWidget (page d'accueil)

**Fichier** : `src/components/home/BookingWidget.tsx`

Quand l'utilisateur clique "Rechercher" depuis la page d'accueil :
- Si mode = "oneway" et que pickup + dropoff + date + time sont remplis : envoyer vers `/booking` avec un param `skipTo=3` (etape vehicule) + les params pre-remplis + `service=airport`
- Si mode = "oneway" et que seuls pickup + date + time sont remplis (pas de dropoff) : envoyer avec `skipTo=1` pour completer la destination
- Si mode = "hourly" et que pickup + date + time sont remplis : envoyer avec `skipTo=3` + `service=hourly`

**Fichier** : `src/pages/Booking.tsx`

- Lire le param `skipTo` depuis les searchParams
- Pre-remplir `data.service`, `data.pickup`, `data.dropoff`, `data.date`, `data.time` depuis les params
- Appeler `setStep(Number(skipTo))` dans le useEffect d'initialisation
- S'assurer que les placeIds sont aussi recuperes (via un appel google-places) pour que le calcul de prix se declenche

### 3. Supprimer le menu deroulant Services dans le Header

**Fichier** : `src/components/Header.tsx`

- Retirer la propriete `dropdown: true` du lien Services dans `navLinks`
- Supprimer tout le code du dropdown desktop (`serviceItems`, `handleMouseEnter`, `handleMouseLeave`, `dropdownRef`, `servicesOpen`, etc.)
- Supprimer le dropdown mobile (`mobileServicesOpen`, etc.)
- Le lien "Services" devient un lien simple comme les autres (Home, Flotte, etc.)
- Nettoyer les imports inutiles (`ChevronDown`, etc. si plus utilise)

### Resume technique

| Fichier | Modification |
|---|---|
| `src/pages/Booking.tsx` | Grid layout centre + lecture param skipTo pour sauter les etapes |
| `src/components/home/BookingWidget.tsx` | Logique skipTo selon les champs remplis |
| `src/components/Header.tsx` | Suppression dropdown Services, lien direct simple |
