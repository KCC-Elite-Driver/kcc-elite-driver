## Objectif
Remplacer le favicon actuel par le logo KCC sans le carré noir visible — fond transparent pour qu'il s'intègre proprement quel que soit le thème de l'onglet (clair/sombre).

## Étapes
1. Générer une version transparente du logo uploadé (`Logo_Webp_fond_noir-2.webp`) via `imagegen--edit_image` avec `transparent_background: true` → sortie `public/favicon.png` (PNG carré, fond supprimé).
2. Supprimer `public/favicon.ico` (sinon le navigateur le sert en priorité) et `public/favicon.webp` devenu obsolète.
3. Mettre à jour `index.html` : remplacer les `<link rel="icon">` existants par un seul lien vers `/favicon.png` (type `image/png`), conserver `apple-touch-icon` pointant vers le même fichier.

## Résultat
Onglet navigateur affichant le logo KCC (avion + K + voiture) sans rectangle noir autour — silhouette propre sur fond clair comme sur fond sombre.
