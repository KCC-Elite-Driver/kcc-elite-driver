

# Corrections : Skyline Footer doré + Image International Classe V

## 1. Régénérer l'image skyline monuments avec fond noir et monuments dorés

L'image actuelle a un fond qui crée un dégradé indésirable. Nouvelle génération avec un fond **noir pur** et des silhouettes de monuments en **doré/or subtil** pour s'intégrer parfaitement au footer noir du site.

**Prompt :** "Minimalist golden silhouette skyline on pure black background featuring iconic world monuments side by side: Egyptian Pyramids of Giza, Eiffel Tower Paris, Statue of Liberty New York, Big Ben London, Taj Mahal. Simple flat vector style silhouettes in subtle gold color (#C5A059). Wide panoramic format. Clean minimal design, pure black background #050505, no gradients."

**Fichier :** `src/assets/skyline-monuments.png`

## 2. Régénérer l'image International avec un Mercedes Classe V

Remplacer le Classe S défectueux par un **Mercedes Classe V (van de luxe)** pour varier la flotte présentée.

**Prompt :** "Cinematic 4K nighttime photograph of a single black Mercedes V-Class luxury van viewed from a three-quarter front angle, parked at an elegant international airport terminal with modern glass facade. Warm ambient lighting reflecting on polished van body. A chauffeur silhouette in dark suit standing beside the sliding rear door, back to camera, white gloves visible. No face shown. Professional editorial automotive photography, quiet luxury aesthetic."

**Fichier :** `src/assets/international-luxury-night.jpg`

## 3. Pas de changement de code nécessaire dans Footer.tsx

La structure actuelle du footer est correcte (image en `absolute bottom-0` avec `opacity-10`). Seule l'image source change : en passant d'une image grise sur fond clair à une image dorée sur fond noir, le rendu sera cohérent avec le fond noir du footer sans dégradé de couleurs indésirable.

---

## Résumé des fichiers

| Fichier | Action |
|---------|--------|
| `src/assets/skyline-monuments.png` | Régénérée : fond noir, monuments dorés |
| `src/assets/international-luxury-night.jpg` | Régénérée : Mercedes Classe V |

