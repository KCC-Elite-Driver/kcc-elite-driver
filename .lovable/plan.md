

## Transformer le Language Switcher en dropdown avec icone globe

### Rendu cible (base sur les images de reference)
- Dans la barre de navigation : une icone globe + le code langue actuel (ex: "fr", "en", "ar")
- Au clic : un dropdown s'ouvre avec chaque langue affichee sous forme de drapeau + nom complet (ex: "Francais", "English", "العربية")
- Style sombre coherent avec le theme du site

### Modifications

#### LanguageSwitcher.tsx - Refonte complete
- Remplacer les 3 boutons drapeaux par un composant `DropdownMenu` (deja installe via Radix)
- Le declencheur (trigger) affiche :
  - L'icone `Globe` de lucide-react
  - Le code de la langue active en minuscules (fr, en, ar)
- Le menu dropdown affiche 3 items :
  - Drapeau emoji + nom complet de la langue
  - FR : "Francais", EN : "English", AR : "العربية"
  - L'item actif sera visuellement distingue (texte primary)

#### Header.tsx - Aucun changement
- Le composant LanguageSwitcher est deja correctement place en desktop (ligne 120) et en mobile (ligne 156-158)
- La refonte du LanguageSwitcher s'appliquera automatiquement aux deux

### Details techniques

**LanguageSwitcher.tsx** :
- Importer `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` depuis `@/components/ui/dropdown-menu`
- Importer `Globe` depuis `lucide-react`
- Tableau des langues : `{ code, flag, name }` avec les noms complets
- Le trigger sera un bouton avec `Globe` (16px) + texte du code langue
- Le contenu du dropdown : fond sombre (`bg-card`), items avec drapeau + nom, espacement confortable
- Au clic sur un item : appeler `setLanguage(code)` et le menu se ferme automatiquement

