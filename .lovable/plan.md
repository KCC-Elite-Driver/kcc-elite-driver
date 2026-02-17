
## Passer l'anglais comme langue principale du site

### Ce qui a ete verifie

Les 4 cartes vehicules (SUV Prestige, Business, First Class, Van Prestige) s'affichent correctement sur la page Flotte avec une coherence visuelle : meme fond sombre, meme eclairage cinematique dore, meme style de carte. L'image du SUV Soueast S07 s'integre bien avec les 3 Mercedes.

Sur la page d'accueil, la section FleetPreview utilise des animations ScrollReveal qui fonctionnent correctement au scroll.

### Modifications prevues

**1. `src/i18n/LanguageContext.tsx`**
- Changer la langue par defaut de `"fr"` a `"en"` (3 endroits : defaultContext, useState, defaultContext translations)

**2. `src/components/LanguageSwitcher.tsx`**
- Reordonner la liste des langues : English en premier, puis Francais, puis Arabe

**3. `index.html`**
- Mettre `lang="en"` au lieu de `lang="fr"` sur la balise HTML (si applicable)

### Resultat
Le site s'affichera en anglais par defaut a la premiere visite. Les utilisateurs pourront toujours changer de langue via le selecteur.
