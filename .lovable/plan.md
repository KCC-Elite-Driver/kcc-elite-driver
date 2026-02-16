
## Corriger le champ heure du widget de reservation sur mobile

### Probleme
Sur mobile (iOS), le champ heure (`input type="time"`) ne s'affiche pas correctement :
- L'icone horloge et la valeur horaire ne sont pas alignees dans le meme cadre
- Le champ semble trop petit par rapport aux autres champs (pickup, destination, date)

Cela est du au rendu natif de `input type="time"` sur iOS/Safari qui applique ses propres styles et ignore certaines proprietes CSS.

### Solution
Forcer le champ heure a occuper toute la largeur disponible et corriger le rendu iOS :
1. Ajouter `-webkit-appearance: none` pour desactiver le style natif iOS
2. Ajouter `box-sizing: border-box` explicitement
3. S'assurer que le conteneur parent n'a pas de contrainte de largeur

### Modifications techniques

**BookingWidget.tsx** - Champ heure (lignes 94-101) :
- Ajouter `appearance-none` (Tailwind pour `-webkit-appearance: none`) sur l'input time
- Ajouter `block` pour forcer le display block
- Changer le conteneur `div` pour qu'il prenne bien toute la largeur avec `w-full`

```tsx
<div className="relative w-full">
  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
  <input
    type="time"
    placeholder={t.hero_time}
    className="w-full min-w-0 block appearance-none bg-secondary border border-border rounded-md pl-10 pr-3 py-3.5 text-base font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary [&::-webkit-date-and-time-value]:text-left"
  />
</div>
```

Les classes ajoutees :
- `appearance-none` : supprime le style natif du navigateur
- `block` : force display block
- `w-full` sur le conteneur parent (remplace juste `relative min-w-0`)
- `z-10` sur l'icone pour qu'elle reste au-dessus
- `[&::-webkit-date-and-time-value]:text-left` : aligne le texte a gauche sur Safari/iOS
