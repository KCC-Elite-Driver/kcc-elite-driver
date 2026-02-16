

## Afficher "--:--" quand le champ heure est vide

### Probleme
Le champ `input type="time"` en HTML ne supporte pas les placeholders. Quand aucune heure n'est selectionnee, la case reste completement vide au lieu d'afficher un texte indicatif.

### Solution
Ajouter un etat `time` au composant et afficher un texte "--:--" par-dessus le champ quand il est vide. Quand l'utilisateur clique dessus, le selecteur natif d'heure s'ouvre normalement.

### Modifications techniques

**BookingWidget.tsx** :
1. Ajouter un state `time` : `const [time, setTime] = useState("")`
2. Remplacer le bloc du champ heure par une version avec overlay conditionnel :
   - L'input time reste present mais invisible quand vide (couleur transparente)
   - Un `span` affiche "--:--" en texte grise quand `time` est vide
   - Quand l'utilisateur selectionne une heure, le span disparait et l'heure s'affiche normalement
3. Ajouter `value={time}` et `onChange` sur l'input pour le rendre controle

```tsx
<div className="relative w-full">
  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
  <input
    type="time"
    value={time}
    onChange={(e) => setTime(e.target.value)}
    className="w-full min-w-0 block appearance-none bg-secondary border border-border rounded-md pl-10 pr-3 py-3.5 h-[50px] text-base font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary [&::-webkit-date-and-time-value]:text-left [&::-webkit-calendar-picker-indicator]:opacity-0"
  />
  {!time && (
    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-muted-foreground text-base font-sans pointer-events-none">
      --:--
    </span>
  )}
</div>
```

Aucun autre fichier n'est modifie. Le comportement est purement visuel et n'affecte pas la logique de reservation.
