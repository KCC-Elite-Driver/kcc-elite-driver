

# Corrections : Image International + Footer Skyline

## 1. Regenerer l'image International

L'image actuelle a un defaut (Mercedes avec deux faces avant). Nouvelle generation avec un prompt plus precis specifiant clairement l'orientation laterale du vehicule.

**Prompt ameliore :** "Cinematic 4K nighttime photograph of a single black luxury Mercedes sedan viewed from the side, parked at an elegant international airport terminal with modern glass facade. Only one car, seen in full side profile. Warm ambient lighting reflecting on polished car body. A chauffeur silhouette in dark suit standing beside the rear door, back to camera, white gloves visible. No face shown. Professional editorial automotive photography, quiet luxury aesthetic."

**Fichier :** `src/assets/international-luxury-night.jpg`

---

## 2. Repositionner le skyline dans le Footer

Actuellement, le skyline est place comme une bande separee entre le contenu et le copyright. D'apres la reference, les monuments doivent etre en arriere-plan, **derriere les colonnes de texte du footer**, avec une opacite subtile.

### Changement dans `src/components/Footer.tsx` :
- Rendre le conteneur principal du footer `relative`
- Positionner l'image skyline en `absolute bottom-0` derriere tout le contenu
- Supprimer la bande decorative separee actuelle
- L'image sera en fond, centree en bas, avec une opacite faible pour que le texte reste lisible par-dessus

---

## Resume des fichiers

| Fichier | Action |
|---------|--------|
| `src/assets/international-luxury-night.jpg` | Regeneree avec prompt corrige |
| `src/components/Footer.tsx` | Skyline repositionne en arriere-plan derriere le texte |

