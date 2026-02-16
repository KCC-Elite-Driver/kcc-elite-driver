

## Remplacer les emojis drapeaux par des images SVG

### Probleme
Windows ne rend pas les emojis drapeaux Unicode. Au lieu de voir des drapeaux, les utilisateurs Windows voient les codes ISO pays en texte brut (FR, GB, EG). iOS et Android supportent les drapeaux emoji, d'ou le fonctionnement sur mobile.

### Solution
Utiliser des images SVG de drapeaux au lieu d'emojis Unicode. Les SVG s'affichent de maniere identique sur tous les systemes d'exploitation.

### Modifications

#### Creer 3 fichiers SVG de drapeaux
- `src/assets/flags/fr.svg` - Drapeau francais (tricolore bleu-blanc-rouge)
- `src/assets/flags/gb.svg` - Drapeau britannique (Union Jack)
- `src/assets/flags/eg.svg` - Drapeau egyptien (rouge-blanc-noir avec aigle)

Les SVG seront des fichiers inline legers (quelques lignes chacun) pour eviter les dependances externes.

#### LanguageSwitcher.tsx
- Remplacer les chaines emoji `flag` par des imports d'images SVG
- Afficher les drapeaux avec une balise `<img>` de taille 20x15px (ratio drapeau) avec `rounded-sm` pour un rendu soigne
- Le reste du composant (dropdown, globe icon, noms de langues) reste inchange

### Details techniques

**Tableau des langues mis a jour** :
```
const languages = [
  { code: "fr", flag: frFlag, name: "Francais" },
  { code: "en", flag: gbFlag, name: "English" },
  { code: "ar", flag: egFlag, name: "العربية" },
];
```

**Rendu du drapeau** :
```
<img src={lang.flag} alt="" className="w-5 h-4 rounded-sm object-cover" />
```

Cela garantit un affichage identique sur Windows, Mac, Linux, iOS et Android.
