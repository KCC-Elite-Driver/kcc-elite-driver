

## Plan : Tarification Égypte (USD)

Mise en place de la nouvelle grille tarifaire forfaitaire pour les départs Égypte. La logique actuelle (`calculate-distance` : 150 EGP/km) sera remplacée par des forfaits fixes quand `country === "EG"`.

### Grille appliquée

**Transfert Aéroport — Le Caire ↔ Le Caire/environs** (forfait fixe)
| Véhicule | Tarif | +Sphinx |
|---|---|---|
| SUV | 70 $ | +40 $ |
| Class E | 150 $ | +40 $ |
| VAN | 200 $ | +40 $ |
| Class S | 300 $ | +40 $ |

**Mise à disposition** (horaire, **min. 4 h**)
| SUV | Class E | VAN | Class S |
|---|---|---|---|
| 45 $/h | 80 $/h | 90 $/h | 140 $/h |

**Forfait 12 h**
| SUV | Class E | VAN | Class S |
|---|---|---|---|
| 250 $ | 400 $ | 500 $ | 650 $ |

**Évènements VIP & Inter-cité** : "Sur devis" (pas de prix calculé, CTA contact).

---

### Modifications techniques

**1. `supabase/functions/calculate-distance/index.ts`**
- Étendre le payload : ajouter `serviceType` ("airport" | "hourly" | "daily12" | "vip" | "intercity") et `hours` (number).
- Si `country === "EG"` :
  - `airport` → forfait selon véhicule + détection Sphinx (+40 $).
  - `hourly` → tarif horaire × max(hours, 4).
  - `daily12` → forfait 12h fixe.
  - `vip` / `intercity` → renvoyer `quote_only: true` sans prix.
- Sinon : conserver la logique actuelle (sera remplacée à la livraison des tarifs France).
- Réponse Égypte : `currency: "USD"`, `currency_symbol: "$"`.
- Détection Sphinx : on lit le `name` retourné par Place Details (origine ET destination) ; si contient "Sphinx" → +40 $.

**2. `src/pages/Booking.tsx`**
- Passer `serviceType` et `hours` lors de l'appel à `calculate-distance`.
- Si `serviceType === "hourly"` : sélecteur d'heures (min 4, défaut 4) + mention "Minimum 4 heures".
- Ajouter le service "Forfait 12 h" dans la sélection des services.
- Si `quote_only` → afficher "Sur devis" + bouton vers `/contact` pré-rempli (au lieu du prix).

**3. `src/pages/Services.tsx`**
- Mettre à jour la grille tarifaire publique Égypte avec les nouveaux montants en USD.
- Mention "+40 $ depuis l'aéroport du Sphinx" sous Transfert Aéroport.
- Mention "Minimum 4 heures" sous Mise à disposition.

**4. `src/i18n/translations.ts`**
- Ajouter clés : "Sur devis" / "Quote on request" / "بعرض سعر".
- Ajouter "Forfait 12 h" / "12-hour package" / "باقة ١٢ ساعة".
- Ajouter "Minimum 4 heures" / "Minimum 4 hours" / "٤ ساعات كحد أدنى".

**5. Vérification end-to-end**
Tester chaque combinaison véhicule × service depuis la home et depuis `/booking` (Le Caire, Sphinx, mise à dispo 4h/6h, forfait 12h, VIP).

---

### Points à clarifier avant implémentation

1. **Forfait 12 h** : nouveau service distinct dans le sélecteur (à côté de Aéroport / Mise à dispo) — OK pour toi ?
2. **Sphinx** : détection automatique par nom du lieu (contient "Sphinx") — OK ou tu préfères qu'on se base uniquement sur la sélection de l'option prédéfinie "Aéroport International du Sphinx" ?
3. **VIP / Inter-cité** : afficher "Sur devis" + bouton qui ouvre `/contact` pré-rempli avec les infos de la course (date, lieux, véhicule) — OK ?
4. **Devise** : tout en USD ($) uniquement pour l'Égypte, ou affichage parallèle EGP indicatif ?

Réponds à ces 4 points et je passe en implémentation.

