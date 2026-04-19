

## Contexte

Utilisateur demande deux choses :
1. **Vérifier que SUV est accessible en réservation depuis l'Égypte** (côté UI booking).
2. **Appliquer la surcharge Sphinx de 40$ uniquement au départ de l'aéroport du Sphinx** (pas à l'arrivée).

## Investigation nécessaire

Avant de modifier, je dois lire :
- `src/pages/Booking.tsx` — voir comment les véhicules sont filtrés par pays (SUV peut-être exclu pour EG ?).
- `supabase/functions/calculate-distance/index.ts` — logique Sphinx actuelle (déjà visible : `isSphinx(originMeta.name) || isSphinx(destMeta.name)` → s'applique aussi à l'arrivée, à corriger).
- `pricing_rules` table — vérifier la règle EG/airport/suv et la valeur de `sphinx_surcharge` (40 USD ? ou stockée en EGP/EUR ?).

## Changements prévus

### 1. Edge function `calculate-distance`
Ligne actuelle :
```ts
const sphinxTouched = isSphinx(originMeta.name) || isSphinx(destMeta.name);
```
À remplacer par :
```ts
const sphinxDeparture = isSphinx(originMeta.name); // origine = pickup uniquement
const price = base + (sphinxDeparture ? sphinxFee : 0);
```
Renommer le champ retour `sphinx_surcharge` (sémantique conservée, valeur 0 si pas de départ Sphinx).

Vérifier aussi que la détection `isSphinx` matche bien le nom Google Places de l'aéroport du Sphinx (SPX / Sphinx International Airport). Si besoin, élargir la regex : `/sphinx|spx/i`.

### 2. Booking UI — accès SUV en EG
Lire `Booking.tsx` pour voir si le SUV est conditionnellement masqué selon le pays détecté. Si oui, autoriser SUV pour EG (la règle existe en BDD probablement). Si non, vérifier qu'aucun filtre frontend ne bloque.

### 3. Vérification BDD
Lire `pricing_rules` pour EG/airport/suv : confirmer que la ligne existe, que `sphinx_surcharge` vaut bien l'équivalent de 40 USD dans la devise stockée (probablement EGP). Si la valeur diffère, proposer un UPDATE via l'outil insert.

## Question avant exécution

La surcharge est mentionnée à **40 $ (USD)** mais `pricing_rules` stocke en devise locale (EGP probable pour l'Égypte). Je dois savoir comment la stocker :

