

## Ajouter la categorie SUV a la flotte

### Ce qui sera fait

1. **Generation d'image** : Utiliser l'IA de generation d'images (Lovable AI) pour creer une image realiste d'un SUV Soueast S07 en style luxe, coherent avec l'esthetique "Quiet Luxury" du site (ambiance nocturne, tons sombres, contraste eleve).

2. **Traductions** : Ajouter les cles suivantes dans les 3 langues (FR, EN, AR) dans `translations.ts` :
   - `fleet_suv` : "SUV" (identique dans les 3 langues)
   - `fleet_suv_desc` : Description du vehicule SUV (Soueast S07 ou equivalent, confort, espace, polyvalence)

3. **FleetPreview** (`src/components/home/FleetPreview.tsx`) : Ajouter le SUV comme 4e vehicule dans le tableau, avec 5 passagers et 4 bagages. Adapter la grille en `md:grid-cols-2 lg:grid-cols-4` pour accueillir 4 cartes.

4. **Fleet page** (`src/pages/Fleet.tsx`) : Ajouter le SUV avec ses equipements (WiFi, eau, chargeurs, protocole desinfection) et adapter la grille en `lg:grid-cols-4`.

5. **Type translations** : Ajouter `fleet_suv` et `fleet_suv_desc` dans l'interface TypeScript des traductions.

### Details techniques

**translations.ts** - Interface (apres ligne 46) :
```
fleet_suv: string;
fleet_suv_desc: string;
```

**translations.ts** - FR (apres fleet_van_desc) :
```
fleet_suv: "SUV",
fleet_suv_desc: "Soueast S07 ou équivalent. Polyvalence et élégance pour tous vos trajets. Espace généreux, suspensions adaptatives, WiFi très haut débit et rafraîchissements premium à bord.",
```

**translations.ts** - EN :
```
fleet_suv: "SUV",
fleet_suv_desc: "Soueast S07 or equivalent. Versatility and elegance for all your journeys. Generous space, adaptive suspension, ultra-high-speed WiFi and premium refreshments on board.",
```

**translations.ts** - AR :
```
fleet_suv: "SUV",
fleet_suv_desc: "سوايست S07 أو ما يعادلها. تعدد الاستخدامات والأناقة لجميع رحلاتك. مساحة واسعة، تعليق تكيفي، واي فاي فائق السرعة ومرطبات فاخرة على متنها.",
```

**FleetPreview.tsx** :
- Importer l'image SUV generee
- Ajouter le 4e vehicule : `{ name: t.fleet_suv, desc: t.fleet_suv_desc, passengers: 5, luggage: 4, image: suvImage }`
- Grille : `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

**Fleet.tsx** :
- Importer l'image SUV
- Ajouter le vehicule SUV avec equipements : WiFi, eau, chargeurs, desinfection
- Grille : `lg:grid-cols-4`

**Image** : Generee via Lovable AI avec le prompt axe sur un SUV Soueast S07 noir, ambiance nocturne luxe, style editorial. L'image sera sauvegardee dans `src/assets/soueast-s07-suv.jpg`.

