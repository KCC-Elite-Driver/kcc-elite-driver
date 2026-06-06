## 3 corrections cibl\u00e9es

### 1. Num\u00e9ro de t\u00e9l\u00e9phone du footer
**Fichier :** `src/components/Footer.tsx`
- Remplacer le `+33 1 23 45 67 89` par le num\u00e9ro WhatsApp `+20 150 704 0949` (m\u00eame num\u00e9ro que celui d\u00e9j\u00e0 utilis\u00e9 sur `https://wa.me/201507040949` partout dans le site).
- Mettre \u00e0 jour le `href="tel:..."` en cons\u00e9quence.
- Aucun autre changement dans le footer.

### 2. Inverser \u00e9tapes V\u00e9hicule \u2194 Infos passager
**Fichier :** `src/pages/Booking.tsx`

Nouvel ordre :
```
0. Service  \u2192  1. Trajet/Date  \u2192  2. V\u00e9hicule  \u2192  3. Infos passager  \u2192  4. R\u00e9cap & Paiement
```

Changements minimaux :
- Tableau `steps` : intervertir `booking_step_passenger` et `booking_step_vehicle`.
- Bloc `{step === 2 && ...}` (passager) renomm\u00e9 en `{step === 3 && ...}`.
- Bloc `{step === 3 && ...}` (v\u00e9hicule) renomm\u00e9 en `{step === 2 && ...}`.
- `canProceed()` : permuter les cas `case 2` et `case 3`.
- Aucun changement de logique, de pricing, de paiement ni d'emails. La sidebar r\u00e9cap reste identique.

V\u00e9rification post-patch : navigation step 0\u21924 fonctionne, le SUV reste filtr\u00e9 EG uniquement, le param `skipTo` (depuis le widget d'accueil) continue de pointer vers l'\u00e9tape "Trajet" (`skipTo=1`), inchang\u00e9.

### 3. Indicatifs t\u00e9l\u00e9phoniques internationaux complets
**Fichier :** `src/pages/Booking.tsx`

- Remplacer la liste `PHONE_CODES` (4 entr\u00e9es) par une liste compl\u00e8te des indicatifs internationaux (\u2248 240 pays, format `{ code, flag, label, name }`), tri\u00e9e par nom de pays, avec FR / EG / GB / US en t\u00eate pour rester rapides d'acc\u00e8s.
- Le `<select>` actuel reste tel quel (m\u00eames classes Tailwind), seul son contenu change.
- Valeur par d\u00e9faut : `+33` (inchang\u00e9).

### V\u00e9rification

- `bunx tsc --noEmit` apr\u00e8s patch.
- Preview manuel : footer affiche le bon num\u00e9ro, tunnel passe bien Service\u2192Trajet\u2192V\u00e9hicule\u2192Infos\u2192R\u00e9cap, dropdown indicatif affiche tous les pays.

### Fichiers touch\u00e9s
- `src/components/Footer.tsx`
- `src/pages/Booking.tsx`

Aucune autre modification (edge functions, DB, emails, paiement, autres composants).