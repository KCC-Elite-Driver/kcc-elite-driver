## Objectif

Adapter automatiquement la devise affichée selon le pays du client (via IP), avec un taux de change USD→EGP **récupéré en direct** sur le marché à chaque fois (devise égyptienne volatile).

## Approche

Toute la logique reste côté **edge function** `calculate-distance` — aucune modif UI nécessaire (le composant `Booking.tsx` affiche déjà dynamiquement `currency_symbol` + `price`).

### 1. Géolocalisation IP du client

L'edge function lit l'IP depuis les headers de la requête (`x-forwarded-for` ou `cf-connecting-ip`), puis interroge un service gratuit sans clé API :
- **API utilisée** : `https://ipapi.co/{ip}/country/` (gratuit, 30k req/mois, retourne le code pays ISO en texte brut)
- **Fallback** : si la géoloc échoue → pays = pays du lieu de pickup (logique actuelle)

### 2. Taux de change live USD→EGP

À chaque calcul (uniquement si pays détecté = EG), appel à :
- **API utilisée** : `https://open.er-api.com/v6/latest/USD` (gratuit, sans clé, mis à jour quotidiennement)
- Récupération de `rates.EGP`
- **Cache mémoire** dans l'edge function : 1 heure (évite de spammer l'API à chaque requête de prix)
- **Fallback** : si l'API échoue → taux par défaut codé en dur (50 EGP/USD), avec log d'avertissement

### 3. Mapping pays → devise

| Pays détecté (IP) | Devise affichée | Conversion appliquée |
|---|---|---|
| EG (Égypte) | **EGP** (format "EGP 3 500") | USD × taux live |
| FR | EUR (€) | aucune (déjà en EUR en BDD) |
| Autre | EUR par défaut | aucune |

**Note importante** : la BDD garde les prix EG en USD (référentiel stable pour l'admin). La conversion EGP est uniquement à l'affichage côté client.

### 4. Format d'affichage

"EGP 3 500" comme tu l'as choisi (code ISO devant, séparateur de milliers).

## Fichier modifié

- `supabase/functions/calculate-distance/index.ts` uniquement
- Déploiement automatique après modification

## Garde-fous

- Si l'IP est privée/locale (dev) → fallback sur pays du pickup
- Si l'API de taux ne répond pas → utilisation du dernier taux en cache, sinon fallback 50 EGP/USD
- Tous les appels externes ont un timeout de 3s pour ne pas ralentir la page

## Hors scope (à traiter plus tard si besoin)

- Le SUV n'a toujours pas de tarif en France (BDD vide pour FR/SUV)
- Système d'envoi d'emails de confirmation (point 3 de la conversation précédente)