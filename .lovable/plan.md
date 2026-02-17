

## Generer l'image du Soueast S07 SUV

### Objectif
Creer une image du SUV Soueast S07 noir avec exactement le meme rendu visuel que les 3 Mercedes existantes (E-Class, S-Class, V-Class).

### Style de reference (commun aux 3 Mercedes)
- Vue de profil laterale gauche (nez a gauche, arriere a droite)
- Fond noir profond et uniforme
- Sol en beton/asphalte gris texturise avec reflets diffus
- Halo dore/ambre chaud en arriere-plan (sous et derriere le vehicule)
- Eclairage cinematique avec rim light subtil sur les aretes de la carrosserie
- Vehicule entierement noir, vitres teintees sombres
- Format 16:9, resolution elevee
- Esthetique studio automobile professionnel, PAS de rendu CGI

### Prompt de generation
"A black Soueast S07 SUV, side profile view facing left, in a professional luxury automotive studio photograph. The car is placed on a textured gray concrete floor with realistic soft diffused reflections. Deep black background with a subtle warm golden amber glow behind and underneath the car. Cinematic rim lighting on the car body edges. Tinted dark windows. Photorealistic, high resolution, 16:9 aspect ratio. No text, no watermarks, no borders, no logos."

### Fichier cree
- `src/assets/soueast-s07-suv.jpg` : nouvelle image generee

### Fichiers modifies
- `src/components/home/FleetPreview.tsx` : remplacer `const suvImage = "/placeholder.svg"` par `import suvImage from "@/assets/soueast-s07-suv.jpg"`
- `src/pages/Fleet.tsx` : idem

