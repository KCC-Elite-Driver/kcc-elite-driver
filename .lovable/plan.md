

## Agrandir le widget de reservation et localiser le format de date

### Probleme actuel
- Le widget est limite a `max-w-3xl` (48rem / 768px), ce qui compresse les 4 champs sur une seule ligne.
- Les champs de saisie utilisent `py-3` et `text-sm`, ce qui les rend etroits.
- Le champ date utilise `<input type="date">` natif qui affiche toujours le format du navigateur, sans respecter la langue selectionnee.

### Modifications prevues

#### 1. Elargir le widget (BookingWidget.tsx)
- Passer `max-w-3xl` a `max-w-5xl` pour donner plus d'espace horizontal.
- Changer la grille de `lg:grid-cols-4` a `lg:grid-cols-2` pour que chaque champ ait plus de largeur.
- Augmenter le padding interne des champs : `py-3` vers `py-3.5` et `text-sm` vers `text-base`.
- Appliquer les memes changements de taille aux champs dans LocationAutocomplete.tsx.

#### 2. Localiser le format de date
- Remplacer le `<input type="date">` natif par un composant personnalise utilisant le `Calendar` (react-day-picker) deja installe, affiche dans un Popover.
- Formater la date affichee avec `date-fns` (deja installe) et ses locales :
  - `fr` : `dd/MM/yyyy`
  - `en` : `MM/dd/yyyy`
  - `ar` : `dd/MM/yyyy` (avec locale arabe)
- Le composant utilisera `useTranslation()` pour detecter la langue courante et appliquer le bon format et la bonne locale au calendrier.

### Details techniques

**BookingWidget.tsx** :
- Ajouter un state `date` de type `Date | undefined`.
- Importer `Popover`, `PopoverTrigger`, `PopoverContent` de `@/components/ui/popover` et `Calendar` de `@/components/ui/calendar`.
- Importer `format` et les locales `fr`, `enGB`, `ar` de `date-fns`.
- Creer un mapping `{ fr: { locale: fr, fmt: "dd/MM/yyyy" }, en: { locale: enGB, fmt: "MM/dd/yyyy" }, ar: { locale: ar, fmt: "dd/MM/yyyy" } }`.
- Afficher la date formatee dans le bouton du Popover, ou le placeholder si aucune date n'est selectionnee.
- Passer la locale au composant `Calendar` via la prop `locale`.

**LocationAutocomplete.tsx** :
- Augmenter la taille des champs de saisie pour correspondre au nouveau style (py-3.5, text-base).

**HeroSection.tsx** : aucun changement necessaire.

