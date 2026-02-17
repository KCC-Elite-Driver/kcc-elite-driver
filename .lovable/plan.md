

## Raccourcir la description SUV Prestige (style identique aux autres cartes)

### Probleme

La description SUV Prestige fait ~60 mots alors que les 3 autres vehicules font ~35 mots chacun. Le texte actuel ajoute des details superflus ("visibilite optimale, habitacle spacieux, connectivite complete, ideal pour les trajets...") absents des autres cartes.

### Structure des autres descriptions (a reproduire)

Toutes les cartes suivent le meme schema en 2 phrases :
1. **Modele + positionnement** (ex: "Mercedes Classe E ou equivalent. Confort discret et connectivite complete pour vos deplacements professionnels.")
2. **Liste equipements** (ex: "Equipee de WiFi tres haut debit, climatisation intelligente, rafraichissements premium et presse a bord.")

### Nouveaux textes

**Francais** :
"Soueast S07 ou equivalent. Technologie premium et espace genereux pour vos deplacements exigeants. Equipe de WiFi tres haut debit, climatisation multi-zones, rafraichissements premium et presse francaise et internationale a bord."

**English** :
"Soueast S07 or equivalent. Premium technology and generous space for your demanding journeys. Fitted with ultra-high-speed WiFi, multi-zone climate control, premium refreshments and international press on board."

**Arabe** :
"سوايست S07 أو ما يعادلها. تقنية متميزة ومساحة سخية لرحلاتكم المتطلبة. مجهزة بواي فاي فائق السرعة، تكييف متعدد المناطق، مرطبات فاخرة وصحافة فرنسية ودولية على متنها."

### Equipements (page Flotte)

Les amenities restent identiques a ce qui est deja configure (WiFi, eau, chargeurs, presse, rafraichissements, desinfection) — aucun changement.

### Fichier modifie

| Fichier | Modification |
|---|---|
| `src/i18n/translations.ts` | Raccourcir `fleet_suv_desc` en FR, EN, AR (~35 mots, meme style que Business/First/Van) |

