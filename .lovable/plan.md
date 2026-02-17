
## Conversion des images JPG en WebP + optimisation Lighthouse

### Contexte
Le score Lighthouse mobile est de 73 avec un FCP de 3,8s et un LCP de 4,8s. Les images JPG representent un poids important. Le format WebP offre une compression 25-35% meilleure que JPEG a qualite equivalente.

### Approche
Installer le plugin `vite-imagetools` qui permet de convertir les images au format WebP au moment du build, directement via les imports. Aucun fichier image ne doit etre remplace manuellement : on ajoute `?format=webp` aux imports existants.

### Modifications

#### 1. Installer la dependance `vite-imagetools`

Ajouter le package qui gere la transformation d'images a la volee pendant le build Vite.

#### 2. Configurer Vite (`vite.config.ts`)

Ajouter le plugin `imagetools()` dans la liste des plugins Vite. Ajouter aussi une declaration de type pour que TypeScript accepte les imports avec query string.

#### 3. Ajouter les types pour les imports image (`src/vite-env.d.ts`)

Declarer les modules `*.jpg?format=webp` et `*.png?format=webp` pour que TypeScript ne genere pas d'erreurs.

#### 4. Mettre a jour tous les imports dans les composants

Modifier chaque import d'image `.jpg` pour ajouter le suffixe `?format=webp&w=800` (ou `&w=1920` pour les images hero plein ecran). Cela genere automatiquement des fichiers WebP optimises et redimensionnes.

Fichiers concernes (9 fichiers, ~16 imports) :

| Fichier | Images | Largeur |
|---|---|---|
| `src/components/home/HeroSection.tsx` | hero-chauffeur-paris.jpg | 1920px |
| `src/components/home/FleetPreview.tsx` | 4 vehicules | 800px |
| `src/components/home/GlobalAxis.tsx` | 3 villes | 800px |
| `src/components/home/ValuesSection.tsx` | cairo-detail-glove.jpg | 1920px |
| `src/pages/Fleet.tsx` | 4 vehicules + cairo-interior-night.jpg | 800px / 1920px |
| `src/pages/About.tsx` | about-chauffeur-detail.jpg | 1920px |
| `src/pages/Services.tsx` | cairo-pyramids-night.jpg | 1920px |
| `src/pages/Booking.tsx` | 3 vehicules + booking-interior-night.jpg | 800px / 1920px |
| `src/pages/Contact.tsx` | contact-airport-chauffeur.jpg | 1920px |

#### 5. Convertir aussi `skyline-monuments.png`

Si utilise quelque part, appliquer le meme traitement au fichier PNG.

### Gains attendus

- Reduction du poids des images de 25-35%
- Amelioration du LCP (actuellement 4,8s) grace a des fichiers plus legers
- Le redimensionnement (`w=800` pour les cartes) evite de charger des images surdimensionnees sur mobile
- Aucun impact visuel : meme qualite percue

### Details techniques

- `vite-imagetools` genere les WebP au moment du build, pas de fichier a convertir manuellement
- Les images originales JPG restent dans `src/assets/` comme source
- Le navigateur recoit directement du WebP via le bundle Vite
- Compatible avec tous les navigateurs modernes (support WebP > 97%)
