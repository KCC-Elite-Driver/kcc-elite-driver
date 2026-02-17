

## Optimisation Performance - Phase 2 (Score 74 vers 90+)

### Analyse des goulots d'etranglement restants

Apres Phase 1, le score est passe de 72 a 74. Les problemes restants :
- **132 KiB de JS inutilise** : les sections below-the-fold (GlobalAxis, FleetPreview, ValuesSection) et leurs images sont chargees de facon synchrone dans Index.tsx
- **Hero image trop lourde** : 106 KiB pour mobile alors qu'on sert l'image en 1920px sur tous les ecrans
- **Framer Motion charge sur le chemin critique** : ScrollReveal importe `framer-motion` meme pour le hero (BookingWidget)
- **Footer logo non optimise** : charge l'image originale sans redimensionnement

---

### Modifications prevues

#### 1. Lazy-loader les sections below-the-fold dans Index.tsx (Impact: -80-100 KiB JS)

**Fichier** : `src/pages/Index.tsx`

- Convertir `GlobalAxis`, `FleetPreview`, et `ValuesSection` en imports `React.lazy()`
- Les envelopper dans `Suspense` avec un fallback minimal
- Ces 3 composants + leurs images (4 images fleet + 3 images axis + 1 image values = ~8 images) ne seront charges qu'au scroll
- Cela retire egalement `framer-motion` (ScrollReveal) du bundle critique puisque ces composants sont les principaux utilisateurs

#### 2. Image hero responsive avec srcset (Impact: LCP -1-2s sur mobile)

**Fichier** : `src/components/home/HeroSection.tsx`

- Ajouter un import pour une version mobile de l'image hero : `?format=webp&w=600&q=70`
- Utiliser `srcSet` et `sizes` sur le `<img>` pour servir :
  - 600px de large sur mobile (< 768px) : ~25-30 KiB au lieu de 106 KiB
  - 1920px sur desktop
- Ajouter la declaration TypeScript correspondante

#### 3. Lazy-loader le BookingWidget avec Framer Motion (Impact: -30-40 KiB JS)

**Fichier** : `src/components/home/HeroSection.tsx`

- Le `BookingWidget` est le seul element du hero encore enveloppe dans `ScrollReveal` (framer-motion)
- Le lazy-loader avec `React.lazy()` pour retirer framer-motion du bundle critique
- Le widget est below-the-fold sur mobile, donc le lazy loading n'impacte pas l'experience

#### 4. Optimiser le logo du Footer

**Fichier** : `src/components/Footer.tsx`

- Changer l'import du logo pour utiliser la version redimensionnee : `?format=webp&w=160`
- Ajouter `width` et `height` explicites
- Ajouter `loading="lazy"` puisque le footer est toujours below-the-fold

#### 5. Declarations TypeScript pour les nouveaux formats d'image

**Fichier** : `src/vite-env.d.ts`

- Ajouter les declarations pour `*?format=webp&w=600&q=70`

---

### Gains attendus

| Metrique | Avant (Phase 1) | Apres Phase 2 (estime) |
|---|---|---|
| LCP | ~3.5s | ~1.5-2s |
| JS inutilise | 132 KiB | ~30-40 KiB |
| Hero image mobile | 106 KiB | ~25-30 KiB |
| Score global | 74 | 88-95 |

### Details techniques

- `React.lazy()` sur les 3 sections below-the-fold deplace ~80 KiB de JS (composants + framer-motion + images) hors du bundle initial
- Le `srcSet` avec `sizes="(max-width: 768px) 600px, 1920px"` laisse le navigateur choisir la bonne image avant meme le rendu CSS
- Le Footer est toujours en bas de page, donc `loading="lazy"` sur son logo ne change rien visuellement mais economise une requete au chargement initial
- Framer Motion (~30 KiB) est entierement retire du chemin critique car le seul usage above-the-fold (BookingWidget ScrollReveal) sera lazy-loade

