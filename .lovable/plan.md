

## Remplacer l'image SUV par la photo fournie, adaptee au style flotte

### Etape 1 : Copier l'image fournie dans le projet
Copier `user-uploads://Starlit_Black_1_80a07f1abb.webp` vers `src/assets/soueast-s07-suv.jpg` (ou `.webp`).

### Etape 2 : Adapter l'image au style "Luxe Silencieux"
L'image fournie a un fond blanc/clair. Les 3 Mercedes ont un fond noir profond (#050505) avec des reflets dores/ambre. Il faut donc utiliser l'API d'edition d'image (google/gemini-3-pro-image-preview) pour :
- Remplacer le fond blanc par un fond **noir profond** avec reflets dores/ambre subtils
- Ajouter l'eclairage cinematique lateral (halo dore chaud) identique aux Mercedes
- Conserver le vehicule tel quel (profil pur, cote conducteur)
- Redimensionner/recadrer en **1920x1080 (16:9)** pour correspondre aux autres images de la flotte

### Etape 3 : Sauvegarder comme asset
Le fichier final remplacera `src/assets/soueast-s07-suv.jpg`. Aucune modification de code necessaire car les imports et les classes CSS restent identiques.

### Details techniques
- L'image sera editee via l'edge function AI avec le prompt : "Place this black SUV on a pure black background (#050505) with subtle warm golden amber reflections on the floor and car body edges, cinematic luxury automotive studio lighting with golden rim light, same aesthetic as a Mercedes press photo, 1920x1080 16:9 ratio, no text no watermarks"
- Format de sortie : JPEG haute qualite
- Aucune modification de code (FleetPreview.tsx, Fleet.tsx inchanges)

