

## Drapeaux de langue, traducteur mobile en haut, et correction du debordement heure

### 1. Drapeaux dans le LanguageSwitcher

Remplacer les labels texte (FR, EN, AR) par des emojis drapeaux tout en gardant le code fonctionnel :
- FR : drapeau francais (emoji ou image SVG inline)
- EN : drapeau britannique
- AR : drapeau egyptien (contexte du projet KCC Paris-Le Caire)

Les drapeaux seront affiches comme emoji Unicode pour eviter d'ajouter des images. Le separateur `|` sera supprime car les drapeaux sont visuellement distincts.

### 2. Traducteur en haut du menu mobile

Dans le Header, deplacer le `<LanguageSwitcher />` du bas du menu mobile (apres le separateur) vers le haut, juste avant les liens de navigation. Il sera affiche directement sous le padding top du panneau, avant les liens.

### 3. Correction du debordement de la ligne heure sur mobile

Le champ `<input type="time">` sur mobile deborde du cadre car il n'a pas de contrainte `min-width: 0` ni `overflow: hidden`. Corrections :
- Ajouter `min-w-0` au conteneur relatif du champ heure pour empecher le debordement dans la grille CSS.
- Ajouter `min-w-0` a l'input lui-meme.

### Details techniques

**LanguageSwitcher.tsx** :
- Modifier le tableau `languages` pour utiliser des drapeaux emoji :
  - `{ code: "fr", label: "FR", flag: "\ud83c\uddeb\ud83c\uddf7" }`
  - `{ code: "en", label: "EN", flag: "\ud83c\uddec\ud83c\udde7" }`
  - `{ code: "ar", label: "AR", flag: "\ud83c\uddea\ud83c\uddec" }`
- Afficher `flag` suivi de `label` dans chaque bouton, ou uniquement le drapeau pour un rendu plus compact.
- Supprimer le separateur `|`.
- Augmenter legerement la taille des boutons pour un clic facile.

**Header.tsx (menu mobile)** :
- Deplacer le bloc `<LanguageSwitcher />` de la ligne 208-210 vers juste apres `pt-20` (ligne 155), avant la boucle `navLinks.map`.
- Le separateur `border-t` restera en bas pour le bouton "Reserver".

**BookingWidget.tsx** :
- Ligne 94 : ajouter `min-w-0` au `div.relative` conteneur du champ heure.
- Ligne 96-99 : ajouter `min-w-0` a la classe de l'input time.

