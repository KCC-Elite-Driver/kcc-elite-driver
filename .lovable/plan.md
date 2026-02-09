

# Plan d'implementation : Animations scroll, Page A propos, Logo

## 1. Installation de framer-motion et integration du logo

### Logo de l'entreprise
- Copier l'image uploadee (`Logo_Webp_fond_noir.webp`) dans `src/assets/kcc-logo.webp`
- Remplacer le texte "KCC-EliteDriver" par l'image du logo dans le **Header** (desktop et mobile) et le **Footer**
- Le logo sera affiche avec une hauteur d'environ 40px dans le header, lien vers la page d'accueil

### Dependance
- Installer `framer-motion` pour les animations au scroll

---

## 2. Animations au scroll avec framer-motion

### Composant reutilisable `ScrollReveal`
Creer un composant wrapper `src/components/ScrollReveal.tsx` qui utilise `motion.div` avec `whileInView` pour declencher les animations quand les elements entrent dans le viewport.

Variantes d'animation disponibles :
- **fade-up** : Apparition avec glissement vers le haut (par defaut)
- **fade-in** : Simple fondu
- **scale-in** : Apparition avec leger zoom
- **slide-left / slide-right** : Glissement lateral

### Pages concernees

**Page d'accueil (`Index.tsx`)** :
- HeroSection : Le badge, le titre et le sous-titre apparaissent en fade-up echelonne
- GlobalAxis : Le titre de section puis chaque carte apparait avec un delai progressif
- FleetPreview : Le titre puis chaque carte de vehicule glisse vers le haut
- ValuesSection : Le titre puis chaque valeur apparait avec un delai

**Page Services** :
- Le titre hero en fade-in
- Chaque `ServiceCard` apparait en fade-up avec delai progressif (stagger)

**Page Booking** :
- Le contenu de chaque etape s'anime en fade lors du changement d'etape

Remplacement des classes CSS `animate-fade-in` et `opacity-0` existantes par les composants `ScrollReveal` pour une animation declenchee au scroll (et non au chargement de page).

---

## 3. Page "A propos" (`/about`)

### Nouveau fichier : `src/pages/About.tsx`

Structure de la page :
1. **Hero** : Titre "A propos de KCC-EliteDriver" avec fond gradient
2. **Section Histoire** : Recit de la creation de l'entreprise, le lien entre Le Caire et Paris, la vision du fondateur
3. **Section Equipe** : Presentation des valeurs de l'equipe (chauffeurs experimentes, protocole de discretion, formation continue) -- pas de photos individuelles pour respecter l'anonymat de la marque
4. **Section Certifications** : Badges et certifications (VTC agree, assurance premium, formation securite, standards ISO)
5. **CTA final** : Bouton vers la page Contact

### Traductions
Ajouter toutes les cles de traduction pour la page A propos dans `src/i18n/translations.ts` (FR, EN, AR) :
- `about_title`, `about_subtitle`
- `about_story_title`, `about_story_text`
- `about_team_title`, `about_team_desc`
- `about_certifications_title`
- Cles pour chaque certification
- `nav_about` pour le lien de navigation

### Routing et navigation
- Ajouter la route `/about` dans `App.tsx`
- Ajouter le lien "A propos" dans la navigation du Header (entre "Services" et "Reservation")
- Ajouter le lien dans le Footer

---

## 4. Resume des fichiers a modifier/creer

| Action | Fichier |
|--------|---------|
| Copier | `user-uploads://Logo_Webp_fond_noir.webp` vers `src/assets/kcc-logo.webp` |
| Creer | `src/components/ScrollReveal.tsx` |
| Creer | `src/pages/About.tsx` |
| Modifier | `src/i18n/translations.ts` -- Ajouter les types + traductions (about, nav_about) |
| Modifier | `src/components/Header.tsx` -- Logo image + lien "A propos" |
| Modifier | `src/components/Footer.tsx` -- Logo image + lien "A propos" |
| Modifier | `src/App.tsx` -- Route `/about` |
| Modifier | `src/components/home/HeroSection.tsx` -- ScrollReveal |
| Modifier | `src/components/home/GlobalAxis.tsx` -- ScrollReveal |
| Modifier | `src/components/home/FleetPreview.tsx` -- ScrollReveal |
| Modifier | `src/components/home/ValuesSection.tsx` -- ScrollReveal |
| Modifier | `src/pages/Services.tsx` -- ScrollReveal |

---

## Details techniques

### ScrollReveal.tsx (structure)
```text
Props:
  - variant: "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right"
  - delay: number (en secondes)
  - duration: number (defaut 0.6s)
  - children: ReactNode

Utilise:
  - motion.div de framer-motion
  - whileInView pour declencher au scroll
  - viewport={{ once: true, margin: "-50px" }}
```

### Logo dans le Header
```text
Avant : <span>KCC-EliteDriver</span>
Apres : <img src={logo} alt="KCC-EliteDriver" className="h-10 w-auto" />
```

Le logo garde le fond transparent sur le header glassmorphique. L'image WebP sur fond noir s'integre naturellement dans le theme sombre du site.

