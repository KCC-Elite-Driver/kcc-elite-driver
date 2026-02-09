

# KCC-EliteDriver -- Plan d'implementation technique (Phase 1)

Tout est pret. Le site affiche actuellement la page par defaut car aucun code n'a encore ete ecrit. Voici le plan detaille pour construire le site complet Phase 1.

---

## Etape 1 : Systeme de design et configuration

**Fichiers concernes :**
- `src/index.css` -- Palette de couleurs "Luxe Silencieux" (Obsidian Black, Signature Gold, Anthracite Gray)
- `tailwind.config.ts` -- Polices Playfair Display + Inter, animations personnalisees (fade-in, slide-up)
- `index.html` -- Import des polices Google Fonts

**Details techniques :**
- Variables CSS personnalisees pour les couleurs de la marque (gold, obsidian, anthracite)
- Animations Tailwind pour le fade-in au scroll et les transitions de hover
- Configuration des polices serif (Playfair Display) et sans-serif (Inter)

---

## Etape 2 : Systeme de traduction (FR / EN / AR)

**Nouveaux fichiers :**
- `src/i18n/translations.ts` -- Toutes les traductions FR, EN, AR dans un seul fichier
- `src/i18n/LanguageContext.tsx` -- Context React pour gerer la langue active

**Fonctionnement :**
- Un React Context fournit la langue courante et une fonction pour la changer
- Un hook `useTranslation()` permet d'acceder aux traductions depuis n'importe quel composant
- Langue par defaut : Francais
- Pas de mirroring RTL pour l'arabe (traduction du texte uniquement)

---

## Etape 3 : Navigation et Header

**Nouveaux fichiers :**
- `src/components/Header.tsx` -- Header sticky avec effet glassmorphism
- `src/components/LanguageSwitcher.tsx` -- Selecteur FR / EN / AR
- `src/components/MobileMenu.tsx` -- Menu hamburger avec drawer elegant
- `src/components/Footer.tsx` -- Pied de page avec liens et coordonnees

**Details :**
- Header fixe en haut avec fond semi-transparent et blur (glassmorphism)
- Logo texte "KCC-EliteDriver" avec accent dore
- Liens de navigation : Accueil, Flotte, Services, Reservation, Contact
- Bouton CTA "Reserver" en or
- Menu mobile avec animation slide-in depuis la droite
- Footer sombre avec colonnes d'informations

---

## Etape 4 : Page d'accueil (Home)

**Fichier modifie :**
- `src/pages/Index.tsx` -- Refonte complete

**Nouveaux composants :**
- `src/components/home/HeroSection.tsx` -- Hero plein ecran avec headline et widget de reservation
- `src/components/home/BookingWidget.tsx` -- Widget minimaliste (One-way/Hourly, pickup, dropoff, date, heure)
- `src/components/home/GlobalAxis.tsx` -- Section Cairo - Paris - International
- `src/components/home/FleetPreview.tsx` -- 3 cartes de vehicules avec liens vers la page Flotte
- `src/components/home/ValuesSection.tsx` -- Discretion, Ponctualite, Chauffeurs multilingues

**Details du Hero :**
- Fond sombre avec gradient subtil evoquant le luxe
- Titre "L'excellence a chaque kilometre" en Playfair Display
- Sous-titre descriptif en Silk Gray
- Widget de reservation avec toggle One-way / Hourly et champs stylises

---

## Etape 5 : Page Flotte (Fleet)

**Nouveau fichier :**
- `src/pages/Fleet.tsx` -- Page de la flotte complete

**Nouveau composant :**
- `src/components/fleet/VehicleCard.tsx` -- Carte detaillee par vehicule

**Vehicules affiches :**
1. **Business** (Mercedes Classe E ou equivalent) -- 3 passagers, 2 bagages, Wi-Fi, eau, chargeurs
2. **First Class** (Mercedes Classe S ou equivalent) -- 3 passagers, 3 bagages, Wi-Fi, eau, chargeurs, presse, separation
3. **Van** (Mercedes Classe V ou equivalent) -- 7 passagers, 7 bagages, Wi-Fi, eau, chargeurs, espace conference

**Chaque carte inclut :**
- Image placeholder du vehicule
- Capacite passagers et bagages avec icones
- Liste d'equipements
- Bouton "Reserver" en or

---

## Etape 6 : Page Contact

**Nouveau fichier :**
- `src/pages/Contact.tsx` -- Page contact complete

**Nouveaux composants :**
- `src/components/contact/ContactForm.tsx` -- Formulaire (nom, email, telephone, message, type de service)
- `src/components/contact/MapPlaceholder.tsx` -- Zone reservee pour future integration Google Maps
- `src/components/contact/DirectContact.tsx` -- Boutons WhatsApp et telephone

**Details :**
- Formulaire valide avec react-hook-form et zod
- Bouton WhatsApp avec lien direct
- Bouton telephone avec lien tel:
- Section carte grise avec texte "Google Maps - Coming Soon"
- Les soumissions seront stockees dans Supabase (table contact_inquiries)

---

## Etape 7 : Routing et mise en page

**Fichier modifie :**
- `src/App.tsx` -- Ajout des routes /fleet et /contact

**Nouveau fichier :**
- `src/components/Layout.tsx` -- Layout commun avec Header + Footer

**Structure des routes :**
- `/` -- Page d'accueil
- `/fleet` -- Page Flotte
- `/contact` -- Page Contact
- `*` -- Page 404

---

## Etape 8 : Backend Supabase

**Table a creer :**
- `contact_inquiries` avec les colonnes : id, name, email, phone, message, service_type, language, created_at
- Politique RLS pour permettre les insertions publiques (les visiteurs peuvent envoyer des demandes)

---

## Resume des fichiers a creer/modifier

| Action | Fichier |
|--------|---------|
| Modifier | `index.html`, `src/index.css`, `tailwind.config.ts` |
| Modifier | `src/App.tsx`, `src/pages/Index.tsx` |
| Creer | `src/i18n/translations.ts`, `src/i18n/LanguageContext.tsx` |
| Creer | `src/components/Layout.tsx`, `src/components/Header.tsx` |
| Creer | `src/components/Footer.tsx`, `src/components/LanguageSwitcher.tsx` |
| Creer | `src/components/MobileMenu.tsx` |
| Creer | `src/components/home/HeroSection.tsx`, `src/components/home/BookingWidget.tsx` |
| Creer | `src/components/home/GlobalAxis.tsx`, `src/components/home/FleetPreview.tsx` |
| Creer | `src/components/home/ValuesSection.tsx` |
| Creer | `src/pages/Fleet.tsx`, `src/components/fleet/VehicleCard.tsx` |
| Creer | `src/pages/Contact.tsx`, `src/components/contact/ContactForm.tsx` |
| Creer | `src/components/contact/MapPlaceholder.tsx`, `src/components/contact/DirectContact.tsx` |
| Supabase | Table `contact_inquiries` avec RLS |

---

## Resultat attendu

Un site premium 3 pages (Accueil, Flotte, Contact) avec :
- Design sombre et elegant "Luxe Silencieux"
- Navigation sticky glassmorphique avec menu mobile
- Traduction FR / EN / AR fonctionnelle
- Formulaire de contact connecte a Supabase
- Animations fluides au scroll et au hover
- Design responsive mobile-first

