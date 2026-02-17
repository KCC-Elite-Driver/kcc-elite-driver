

## Optimisation Performance Lighthouse : Score 72 vers 90+

### Probleme principal identifie

Le LCP (Largest Contentful Paint) est a 4,6s avec un **delai de 3290ms**. La cause racine : le `<h1>` du hero est enveloppe dans `ScrollReveal` (framer-motion) qui demarre avec `opacity: 0`. Le navigateur ne peut pas "peindre" le LCP tant que JavaScript n'a pas execute l'animation. C'est le correctif le plus impactant.

Le second probleme : **184 KiB de JS inutilise** car toutes les 20+ pages (admin, client, fleet, etc.) sont importees de facon synchrone dans `App.tsx`.

---

### Modifications prevues

#### 1. Supprimer ScrollReveal du hero above-the-fold (Impact: LCP -2-3s)

**Fichier** : `src/components/home/HeroSection.tsx`

- Retirer les 3 wrappers `ScrollReveal` autour du badge, h1 et sous-titre
- Ces elements s'afficheront instantanement, permettant au navigateur de peindre le LCP sans attendre JavaScript/framer-motion
- Garder `ScrollReveal` uniquement sur le `BookingWidget` (below-the-fold sur mobile)
- Ajouter `&q=75` a l'import hero pour reduire la taille du fichier WebP d'environ 25%

#### 2. Lazy loading de toutes les routes sauf Index (Impact: -150 KiB JS)

**Fichier** : `src/App.tsx`

- Convertir 18 pages en imports `React.lazy()` : Fleet, Services, About, Booking, Contact, Privacy, Terms, CancellationPolicy, Legal, NotFound, AdminLogin, AdminDashboard, AdminBookings, AdminProviders, AdminDrivers, ClientLogin, ClientRegister, ClientBookings, ClientBookingDetail
- Ajouter un `Suspense` avec fallback minimal (spinner ou fond noir)
- Seuls `Index` et `Layout` restent en import synchrone
- Gain estime : ~150-180 KiB de JS en moins au chargement initial

#### 3. Optimiser le logo dans le Header

**Fichier** : `src/components/Header.tsx`

- Changer l'import du logo pour utiliser `?format=webp&w=160` (actuellement le fichier original ~500x500 est charge pour un affichage a 80px)
- Ajouter `width={80}` et `height={80}` explicites sur le `<img>` du logo
- Satisfait l'audit Lighthouse "Images with missing width/height"

#### 4. Ajouter width/height aux images below-the-fold

**Fichiers** : `src/components/home/GlobalAxis.tsx`, `src/components/home/ValuesSection.tsx`

- Ajouter `width` et `height` explicites aux `<img>` pour eviter les layout shifts (CLS)

#### 5. Declarations TypeScript

**Fichier** : `src/vite-env.d.ts`

- Ajouter les declarations pour les nouveaux formats d'import : `*?format=webp&w=1920&q=75` et `*?format=webp&w=160`

---

### Gains attendus

| Metrique | Avant | Apres (estime) |
|---|---|---|
| LCP | 4,6s (delai 3290ms) | ~1,5-2s |
| FCP | 3,9s | ~2-2,5s |
| JS inutilise | 184 KiB | ~20-30 KiB |
| Score global | 72 | 85-95 |

### Details techniques

- Le LCP est le levier le plus important : le h1 doit etre visible immediatement sans animation JS
- `React.lazy()` decoupe le bundle en chunks par route, charges uniquement a la navigation
- La qualite WebP a 75 est visuellement identique a 80 mais reduit significativement la taille
- Le logo redimensionne a 160px de large (2x l'affichage a 80px) offre un bon ratio qualite/poids

