

## Plan : Optimisation Images + Correction /admin/login

### Probleme 1 : /admin/login redirige vers l'accueil

**Diagnostic** : Le fichier `public/404.html` redirige vers `/?redirect=/admin/login` mais l'application ne traite jamais ce parametre `redirect`. Le visiteur atterrit sur la page d'accueil sans etre redirige vers `/admin/login`.

**Correction** : Modifier `public/404.html` pour rediriger directement vers le chemin original (sans passer par un parametre query), et ajouter dans `src/App.tsx` une logique qui lit le parametre `?redirect=` au cas ou, pour rediriger l'utilisateur.

Concretement :
- **`public/404.html`** : changer le script pour faire `window.location.replace(path)` au lieu de `window.location.replace('/' + '?redirect=' + ...)`. Cela renverra directement vers `/admin/login` qui sera gere par le SPA une fois `index.html` charge.

---

### Probleme 2 : Image Hero avec balise `<picture>`

**Fichier** : `src/components/home/HeroSection.tsx`

Remplacer la balise `<img>` actuelle par une balise `<picture>` :
- `<source>` pour mobile (max-width: 768px) utilisant l'image 600px deja importee
- `<img>` fallback avec l'image desktop 1920px
- Conserver `fetchPriority="high"`, `loading="eager"`, `width`/`height`

---

### Probleme 3 : Logo sans deformation

**Fichiers** : `src/components/Header.tsx` et `src/components/Footer.tsx`

- **Header** : forcer `width={160} height={160}` et utiliser `object-contain` pour eviter la deformation. Le conteneur garde la hauteur visuelle via la classe CSS.
- **Footer** : corriger `height={128}` en `height={160}` pour un ratio 1:1 coherent avec la largeur de 160px, et ajouter `object-contain`.

---

### Details techniques

| Fichier | Modification |
|---|---|
| `public/404.html` | Redirection directe vers le chemin au lieu du parametre query |
| `src/components/home/HeroSection.tsx` | Remplacement `<img>` par `<picture>` avec source mobile/desktop |
| `src/components/Header.tsx` | Logo : `width={160} height={160}` + `object-contain` |
| `src/components/Footer.tsx` | Logo : `width={160} height={160}` + `object-contain` |

