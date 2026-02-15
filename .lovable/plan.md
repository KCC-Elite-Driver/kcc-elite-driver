

# Ajout d'images Hero pour les pages A propos, Reservation et Contact

## Images a generer

### 1. Page Contact : Chauffeur dans un hall d'aeroport (choix de l'utilisateur)
Un chauffeur en costume sombre, vu de dos, tenant une pancarte dans un hall d'arrivees d'aeroport luxueux. Eclairage cinematique nocturne, style "Quiet Luxury".

**Fichier :** `src/assets/contact-airport-chauffeur.jpg`

### 2. Page Reservation : Interieur d'un Mercedes vu depuis la banquette arriere
Vue depuis la banquette arriere en cuir d'un Mercedes, montrant le tableau de bord eclaire et la route de nuit a travers le pare-brise. Atmosphere feutree et luxueuse.

**Fichier :** `src/assets/booking-interior-night.jpg`

### 3. Page A propos : Detail d'un chauffeur ajustant sa manchette pres d'un vehicule
Gros plan cinematique sur les mains gantees d'un chauffeur ajustant sa manchette devant un vehicule noir, de nuit. Eclairage dore subtil.

**Fichier :** `src/assets/about-chauffeur-detail.jpg`

## Modifications de code

Pour chaque page, remplacer la section hero simple (`gradient-hero` avec padding) par le pattern utilise dans `Services.tsx` : image en arriere-plan avec overlay degrade.

### Fichiers modifies

| Fichier | Action |
|---------|--------|
| `src/assets/contact-airport-chauffeur.jpg` | Nouveau : image generee |
| `src/assets/booking-interior-night.jpg` | Nouveau : image generee |
| `src/assets/about-chauffeur-detail.jpg` | Nouveau : image generee |
| `src/pages/Contact.tsx` | Hero avec image de fond + overlay |
| `src/pages/Booking.tsx` | Hero avec image de fond + overlay |
| `src/pages/About.tsx` | Hero avec image de fond + overlay |

### Pattern applique (identique a Services.tsx)

```text
<section className="relative py-32 overflow-hidden">
  <div className="absolute inset-0">
    <img src={heroImage} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
  </div>
  <div className="relative z-10 ...">
    <!-- titre + sous-titre existants -->
  </div>
</section>
```

