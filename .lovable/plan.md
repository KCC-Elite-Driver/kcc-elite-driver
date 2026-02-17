

## Regenerer l'image SUV avec fond noir/dore et dimensions correctes

### Probleme constate
L'image du SUV (Soueast S07) a un fond gris clair qui ne correspond pas au fond noir profond avec reflets dores/ambre des trois images Mercedes (Business, First Class, Van Prestige). Le vehicule semble aussi plus petit et mal cadre par rapport aux autres.

### Ce qui sera fait

1. **Regenerer l'image** `src/assets/soueast-s07-suv.jpg` avec un prompt tres precis reproduisant :
   - Fond noir profond identique aux Mercedes (#050505 a #1A1A1A)
   - Reflets dores/ambre subtils sur la carrosserie et en arriere-plan
   - Vue de profil laterale du Soueast S07 noir
   - Vehicule centre et cadre de la meme maniere que les autres (occupe toute la largeur du cadre)
   - Eclairage cinematique lateral avec halo dore chaud
   - Style editorial luxe automobile, pas d'annotations

2. **Aucune modification de code** : seul le fichier image sera remplace. Les composants FleetPreview.tsx et Fleet.tsx utilisent deja les memes classes CSS (`h-48` / `h-56`, `object-cover`) pour toutes les cartes, donc les dimensions du cadre seront automatiquement coherentes une fois l'image correctement proportionnee.

### Details techniques

**Prompt de generation** (via google/gemini-3-pro-image-preview) :
"Black Soueast S07 SUV, side profile view facing right, pure black background with subtle warm golden amber reflections and rim lighting on the car body, cinematic luxury automotive studio photography, car fills the entire frame horizontally, same exact dark moody aesthetic as a Mercedes S-Class studio shot, no text no annotations no watermarks, high contrast editorial style, 16:9 aspect ratio"

Le modele Gemini Pro Image sera utilise pour une meilleure qualite et coherence avec les autres visuels de la flotte.

