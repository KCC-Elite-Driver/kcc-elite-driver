

# Plan : Logo sans fond noir et plus grand

## Ce qui sera fait

### 1. Supprimer le fond noir du logo
Le logo actuel (`kcc-logo.webp`) a un fond noir. On va appliquer un style CSS `mix-blend-mode: screen` sur l'image du logo dans le Header et le Footer. Ce mode de fusion rend le noir transparent, ne laissant visible que les elements clairs du logo (le texte et les motifs dores/blancs). Cela fonctionne parfaitement sur le theme sombre du site.

> Alternative : si le rendu n'est pas satisfaisant, on pourra utiliser un filtre CSS ou vous pourriez fournir une version PNG du logo avec fond transparent.

### 2. Agrandir le logo

**Header** :
- Passer de `h-10` (40px) a `h-14` (56px) pour le desktop
- Augmenter aussi la hauteur du header de `h-16` a `h-20` pour accommoder le logo plus grand

**Footer** :
- Passer de `h-10` (40px) a `h-16` (64px)

---

## Fichiers a modifier

| Fichier | Modification |
|---------|-------------|
| `src/components/Header.tsx` | Logo : `h-10` vers `h-14`, ajouter `mix-blend-mode: screen`, header `h-16` vers `h-20` |
| `src/components/Footer.tsx` | Logo : `h-10` vers `h-16`, ajouter `mix-blend-mode: screen` |

