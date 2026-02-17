

## Corrections et ameliorations du site

### 1. Calendrier - Style de la date selectionnee et du jour actuel

**Fichier** : `src/components/ui/calendar.tsx`

- Ajouter `rounded-md` a la classe `day_selected` pour que la date choisie ait des arrondis
- Reduire le style `day_today` pour qu'il ne soit pas aussi visible quand une autre date est selectionnee (utiliser un simple soulignement ou un anneau subtil au lieu d'un fond plein)

### 2. Champ heure - Superposition des tirets

**Fichier** : `src/components/home/BookingWidget.tsx`

- Le probleme : le placeholder "--:--" personnalise se superpose avec la valeur native du input time
- Solution : masquer completement la valeur native quand le champ est vide en ajoutant `color: transparent` au champ time quand `!time`, et ne montrer que le placeholder personnalise
- Ajouter la classe conditionnelle `text-transparent` quand `!time` pour cacher les tirets natifs

### 3. Bouton Search / Reserver - Navigation vers /booking

**Fichier** : `src/components/home/BookingWidget.tsx`

- Ajouter `useNavigate` de react-router-dom
- Au clic du bouton Search, naviguer vers `/booking` en passant les parametres (pickup, dropoff, date, time, mode) via query params ou state
- Transformer le bouton en element cliquable avec un `onClick`

### 4. Alignement des cartes vehicules (page Flotte)

**Fichier** : `src/pages/Fleet.tsx`

- Restructurer le `VehicleCard` avec `flex flex-col h-full` sur le conteneur principal
- Mettre `flex-grow` sur la section description pour pousser les equipements et le bouton vers le bas
- Utiliser `mt-auto` sur la section des equipements et le bouton pour aligner tous les boutons au meme niveau
- Cela force les cartes a avoir la meme hauteur et les boutons alignes en bas

### 5. Footer - Logo plus grand et ligne separatrice plus basse

**Fichier** : `src/components/Footer.tsx`

- Augmenter la taille du logo de `h-20` a `h-28` ou `h-32`
- Ajouter `mt-10` ou `mt-12` au separateur (la bordure `border-t`) avant les liens legaux pour eloigner la ligne des colonnes de navigation

### 6. Section Valeurs - Passer de 3 a 4 cartes

**Fichiers** : `src/i18n/translations.ts` et `src/components/home/ValuesSection.tsx`

- Ajouter une 4eme valeur dans les traductions (FR/EN/AR) : "Anticipation" avec sa description
- Renommer les valeurs existantes pour correspondre a l'image : Discretion, Excellence, Integrite, Anticipation
- Mettre a jour le grid de `md:grid-cols-3` a `md:grid-cols-4` (ou `grid-cols-2 md:grid-cols-4`)
- Ajouter les icones correspondantes (Lock, Star, Scale, Lightbulb)
- Chaque carte aura un fond sombre avec bordure et l'icone dans un carre arrondi dore

### 7. Bouton WhatsApp flottant

**Fichier** : nouveau composant `src/components/WhatsAppFloatingButton.tsx` + integration dans `src/components/Layout.tsx`

- Creer un bouton rond vert WhatsApp (#25D366) fixe en bas a droite (`fixed bottom-6 right-6 z-50`)
- Icone WhatsApp (MessageCircle de lucide ou SVG WhatsApp)
- Lien vers `https://wa.me/NUMERO` (numero temporaire, le user fournira le vrai plus tard)
- Animation subtile de pulsation pour attirer l'attention
- Integrer le composant dans Layout.tsx pour qu'il apparaisse sur toutes les pages

---

### Resume technique des fichiers modifies

| Fichier | Modification |
|---|---|
| `src/components/ui/calendar.tsx` | Arrondis date selectionnee, style jour actuel attenue |
| `src/components/home/BookingWidget.tsx` | Fix tirets heure, navigation bouton Search |
| `src/pages/Fleet.tsx` | Flex layout pour aligner equipements et boutons |
| `src/components/Footer.tsx` | Logo agrandi, espacement separateur |
| `src/components/home/ValuesSection.tsx` | 4 cartes au lieu de 3, nouveau design avec bordures |
| `src/i18n/translations.ts` | Nouvelles traductions pour les 4 valeurs |
| `src/components/WhatsAppFloatingButton.tsx` | Nouveau composant bouton flottant |
| `src/components/Layout.tsx` | Integration du bouton WhatsApp |

