

# Repositionnement du skyline monuments dans le Footer

## Changement

Modifier le positionnement de l'image `skyline-monuments.png` dans `src/components/Footer.tsx` :

- **Largeur** : repasser en pleine largeur (`w-full`) au lieu de `w-3/4`
- **Position verticale** : descendre l'image pour qu'elle soit plus bas, en dessous de la zone de navigation. Utiliser un décalage négatif (`-bottom-8` ou similaire) ou réduire la hauteur visible (`h-24` ou `max-h-24`) pour que seule la partie haute des monuments dépasse dans le footer sans empiéter sur les colonnes de texte
- Retirer le centrage `mx-auto right-0` devenu inutile avec `w-full`
- Conserver l'opacité subtile à `opacity-[0.04]`

## Fichier modifié

| Fichier | Action |
|---------|--------|
| `src/components/Footer.tsx` | Ajuster classes CSS de l'image skyline |

