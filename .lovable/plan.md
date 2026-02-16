

## Corriger la hauteur du champ heure sur mobile

### Probleme
Apres avoir ajoute `appearance-none` pour supprimer le style natif iOS, le champ heure a perdu sa hauteur naturelle et apparait beaucoup plus petit que les autres champs (lieu, destination, date).

### Solution
Ajouter une hauteur minimale explicite sur le champ heure pour qu'il corresponde exactement aux autres champs du formulaire. Les autres champs utilisent `py-3.5` qui donne environ 48-50px de hauteur. On va ajouter `h-[50px]` sur l'input time pour garantir une hauteur identique, ainsi que des styles webkit supplementaires pour forcer iOS a respecter cette hauteur.

### Modification technique

**BookingWidget.tsx** - Ligne 99 :
- Ajouter `h-[50px]` pour forcer la meme hauteur que les autres champs
- Ajouter `[&::-webkit-calendar-picker-indicator]:opacity-0` pour masquer l'indicateur natif iOS tout en gardant le tap fonctionnel

```tsx
className="w-full min-w-0 block appearance-none bg-secondary border border-border rounded-md pl-10 pr-3 py-3.5 h-[50px] text-base font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary [&::-webkit-date-and-time-value]:text-left [&::-webkit-calendar-picker-indicator]:opacity-0"
```

Cela garantit que le champ heure a exactement la meme hauteur que les champs Lieu, Destination et Date sur tous les appareils.
