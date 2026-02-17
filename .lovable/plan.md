

## Mise a jour de la carte SUV Prestige

### Changements

**1. Textes SUV Prestige** — Mise a jour des descriptions dans `src/i18n/translations.ts`

- **Francais** : "Soueast S07 ou equivalent. Technologie premium et espace genereux pour vos deplacements exigeants. Un SUV contemporain alliant robustesse et raffinement, offrant une visibilite optimale, un habitacle spacieux et une connectivite complete. Ideal pour les trajets avec importants bagages ou clients appreciant la technologie moderne. Equipe de WiFi tres haut debit, climatisation multi-zones, rafraichissements premium et presse francaise et internationale a bord."

- **English** : "Soueast S07 or equivalent. Premium technology and generous space for your demanding journeys. A contemporary SUV combining robustness with refinement, offering optimal visibility, spacious interior and complete connectivity. Ideal for journeys with substantial luggage or clients appreciating modern technology. Fitted with ultra-high-speed WiFi, multi-zone climate control, premium refreshments and international press on board."

- **Arabe** : Traduction equivalente du texte anglais, coherente avec le style des autres vehicules.

**2. Capacite passagers** — Passage de 7 a 3 passagers

- `src/components/home/FleetPreview.tsx` : ligne 14, `passengers: 7` devient `passengers: 3`
- `src/pages/Fleet.tsx` : ligne 79, `passengers: 7` devient `passengers: 3`

**3. Equipements sur la page Flotte** — `src/pages/Fleet.tsx`

Les amenities du SUV Prestige seront alignees avec la description enrichie. Ajout de :
- Presse (icone `Newspaper`, label `t.fleet_press`)
- Rafraichissements premium (icone `Wine`, label `t.fleet_refreshments`)

La liste passera de 4 a 6 equipements, coherent avec le niveau de detail des autres vehicules premium.

**4. Alignement vertical des cartes** — `src/components/home/FleetPreview.tsx`

Correction du probleme d'alignement identifie precedemment : application de `flex flex-col` et `flex-1` pour que les elements du bas (passagers/bagages, CTA) soient alignes sur toutes les cartes malgre les longueurs de description differentes.

### Fichiers modifies

| Fichier | Modifications |
|---|---|
| `src/i18n/translations.ts` | Descriptions SUV FR, EN, AR |
| `src/components/home/FleetPreview.tsx` | Passagers 7 vers 3, fix alignement flex |
| `src/pages/Fleet.tsx` | Passagers 7 vers 3, ajout amenities presse + rafraichissements |
