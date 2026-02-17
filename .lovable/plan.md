

## Regenerer l'image SUV en noir et repositionner en premier

### Ce qui sera fait

1. **Generer une nouvelle image** du Soueast S07 en **noir**, vu de profil (vue laterale comme sur l'image de reference), avec le meme fond sombre/studio que les autres vehicules Mercedes de la flotte. L'image utilisera le modele Gemini pour produire un rendu coherent avec l'esthetique du site. Elle remplacera l'image actuelle dans `src/assets/soueast-s07-suv.jpg`.

2. **Deplacer le SUV en premiere position** (tout a gauche) dans les deux fichiers :

### Details techniques

**Image** : Generation via Lovable AI (google/gemini-3-pro-image-preview) avec un prompt base sur l'image de reference : Soueast S07 noir, vue de profil laterale, fond sombre de studio (gris fonce/noir), eclairage cinematique, sans annotations ni dimensions, style editorial luxe.

**FleetPreview.tsx** - Ligne 13-18 : Reordonner le tableau pour placer le SUV en premier :
```tsx
const vehicles = [
  { name: t.fleet_suv, desc: t.fleet_suv_desc, passengers: 5, luggage: 4, image: suvImage },
  { name: t.fleet_business, desc: t.fleet_business_desc, passengers: 3, luggage: 2, image: mercedesEClass },
  { name: t.fleet_first, desc: t.fleet_first_desc, passengers: 3, luggage: 3, image: mercedesSClass },
  { name: t.fleet_van, desc: t.fleet_van_desc, passengers: 7, luggage: 7, image: mercedesVClass },
];
```

**Fleet.tsx** - Lignes 77-94 : Meme reordonnancement, le SUV avec ses equipements en premier dans le tableau.

