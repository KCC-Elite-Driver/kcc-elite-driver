

## Mise a jour de la carte SUV : titre "SUV Prestige", description enrichie, 7 passagers

### Ce qui change

Le vehicule SUV existe deja dans le code mais necessite des ajustements pour correspondre exactement aux specifications demandees.

### Modifications

**1. Traductions (`src/i18n/translations.ts`)**
- Renommer `fleet_suv` de "SUV" en **"SUV Prestige"** (FR), "SUV Prestige" (EN), "SUV بريستيج" (AR)
- Remplacer `fleet_suv_desc` par la nouvelle description :
  - FR : "Soueast S07 ou equivalent. Alliez technologie de pointe et confort spacieux. Un SUV moderne offrant un habitacle raffine, une connectivite intuitive et une securite renforcee pour une experience de route sereine."
  - EN/AR : traductions equivalentes
- Passer les passagers de **5 a 7**

**2. Composant FleetPreview (`src/components/home/FleetPreview.tsx`)**
- Modifier `passengers: 5` en `passengers: 7` pour le SUV

**3. Page Fleet (`src/pages/Fleet.tsx`)**
- Modifier `passengers: 5` en `passengers: 7` pour le SUV

### Ce qui ne change PAS
- L'image (`src/assets/soueast-s07-suv.jpg`) reste celle deja en place
- La grille est deja configuree en 4 colonnes desktop / 2 colonnes tablette / 1 colonne mobile (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`)
- Le style des cartes (fond anthracite, texte gris soie, bouton or, police Playfair/Inter) est deja conforme
- Le CTA "Reserver" avec fleche dorée est deja present
- L'ordre des vehicules reste : SUV Prestige, Business, First Class, Van Prestige

### Details techniques
- 3 fichiers modifies : `translations.ts`, `FleetPreview.tsx`, `Fleet.tsx`
- Seuls les textes et le nombre de passagers changent
- Aucune nouvelle dependance, aucun changement de structure

