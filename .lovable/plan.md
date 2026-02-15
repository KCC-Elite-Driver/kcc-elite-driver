

# Plan : Images Paris & International pour GlobalAxis + Fond monuments au Footer

## 1. Generer 2 nouvelles images "Quiet Luxury"

### Image Paris — Mercedes devant un decor parisien (nuit)
**Prompt :** Cinematic 4K nighttime photograph of a black Mercedes S-Class parked on a cobblestone street near the Eiffel Tower in Paris. Tower illuminated with warm golden light in the background. Chauffeur silhouette in dark suit seen from behind. No face visible. Moody lighting, quiet luxury aesthetic. Professional automotive photography.

**Fichier :** `src/assets/paris-eiffel-night.jpg`

### Image International — Mercedes dans un decor cosmopolite (nuit)
**Prompt :** Cinematic 4K nighttime photograph of a black luxury Mercedes sedan parked at an elegant international airport terminal or grand hotel entrance with a modern glass and steel facade. Warm ambient lighting reflecting on polished car. Chauffeur silhouette in dark suit standing beside car, back to camera, white gloves visible. No face shown. Cosmopolitan, global luxury atmosphere. Professional editorial photography.

**Fichier :** `src/assets/international-luxury-night.jpg`

---

## 2. Integrer les images dans GlobalAxis

Modifier `src/components/home/GlobalAxis.tsx` pour ajouter des images de header aux 3 cartes (pas seulement Cairo) :
- Carte Cairo (i===0) : `cairo-library-dusk.jpg` (deja en place)
- Carte Paris (i===1) : `paris-eiffel-night.jpg` (nouvelle image)
- Carte International (i===2) : `international-luxury-night.jpg` (nouvelle image)

Refactorer le rendu conditionnel `{i === 0 && ...}` en un tableau d'images applique a chaque carte.

---

## 3. Generer l'image de fond "skyline monuments" pour le Footer

### Image skyline silhouette
**Prompt :** Minimalist grey silhouette skyline illustration on transparent/white background featuring iconic world monuments side by side: Egyptian Pyramids of Giza, Eiffel Tower Paris, Statue of Liberty New York, Big Ben London, Taj Mahal. Simple flat vector style silhouettes, subtle and elegant, light grey color (#d1d5db). Wide panoramic format 1920x300. Clean minimal design suitable as decorative footer background.

**Fichier :** `src/assets/skyline-monuments.png`

---

## 4. Integrer le skyline dans le Footer

Modifier `src/components/Footer.tsx` pour ajouter l'image de skyline en fond decoratif entre le contenu du footer et la section legale/copyright, comme dans la reference fournie. L'image sera positionnee en bas du footer avec une opacite reduite pour rester subtile.

---

## Resume des fichiers

| Fichier | Action |
|---------|--------|
| `src/assets/paris-eiffel-night.jpg` | Nouvelle image generee |
| `src/assets/international-luxury-night.jpg` | Nouvelle image generee |
| `src/assets/skyline-monuments.png` | Nouvelle image generee (silhouette monuments) |
| `src/components/home/GlobalAxis.tsx` | Ajout images Paris + International aux cartes |
| `src/components/Footer.tsx` | Ajout fond skyline decoratif |

