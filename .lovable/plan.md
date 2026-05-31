# Intégration Paymob

## Objectif
Encaisser le paiement au moment de la réservation via Paymob. Le client voit la devise du pays de la course (EUR pour Paris, EGP pour Égypte). Pour Paris, la conversion EUR→EGP se fait en arrière-plan car Paymob ne facture qu'en EGP.

## Méthodes de paiement activées
- Carte bancaire (Visa / Mastercard / Meeza)
- Wallets égyptiens (Vodafone Cash, Orange Money, Etisalat Cash)
- Apple Pay / Google Pay

## Clés Paymob à fournir (je vous guiderai)
Dans le dashboard Paymob → **Developers → API Keys & Integrations** :

1. `PAYMOB_SECRET_KEY` — section *API Keys* (commence par `egy_sk_...`)
2. `PAYMOB_PUBLIC_KEY` — section *API Keys* (commence par `egy_pk_...`)
3. `PAYMOB_HMAC_SECRET` — section *HMAC* (pour vérifier les webhooks)
4. `PAYMOB_INTEGRATION_ID_CARD` — ID numérique de l'intégration "Online Card"
5. `PAYMOB_INTEGRATION_ID_WALLET` — ID de l'intégration "Mobile Wallet"
6. `PAYMOB_INTEGRATION_ID_APPLEPAY` — ID Apple Pay (si activé sur le compte)
7. `PAYMOB_INTEGRATION_ID_GOOGLEPAY` — ID Google Pay

Je demanderai chaque clé via le formulaire sécurisé une fois le plan validé.

## Flux de paiement

```text
Booking step "Paiement"
  └─► Edge fn  create-paymob-intent
        ├─ insère booking (status=pending, payment_status=awaiting)
        ├─ si devise=EUR : convertit EUR→EGP (taux live, même source que pricing)
        ├─ Intention Paymob (Unified Checkout / Intention API)
        │     payment_methods = [card, wallet, applepay, googlepay]
        └─► renvoie client_secret + checkout URL
  └─► Redirection vers Paymob Checkout (hosted)
        └─► retour /booking/confirmation?merchant_order_id=...

Webhook  paymob-webhook  (public, vérif HMAC)
  └─► met à jour booking.payment_status (paid / failed)
  └─► déclenche emails booking-received + admin-notification
```

## Modifications base de données
Nouvelle migration ajoutant à `bookings` :
- `payment_status` (`awaiting | paid | failed | refunded`, défaut `awaiting`)
- `payment_provider` (texte, ex. `paymob`)
- `payment_intent_id`, `payment_order_id`, `payment_transaction_id` (texte)
- `amount_charged`, `currency_charged` (montant réellement débité en EGP)
- `amount_display`, `currency_display` (ce que le client a vu, EUR ou EGP)
- `fx_rate` (numeric, taux EUR→EGP appliqué si conversion)

Table `payment_events` (journal des webhooks Paymob, accès service_role uniquement).

## Edge Functions
1. `create-paymob-intent` (verify_jwt = false)
   - Valide payload (Zod), recalcule le prix côté serveur (jamais faire confiance au client), convertit en EGP si nécessaire, crée l'Intention Paymob, insère le booking en `awaiting`, renvoie l'URL de checkout.
2. `paymob-webhook` (verify_jwt = false, vérification HMAC)
   - Met à jour booking + insère `payment_events`, déclenche `send-transactional-email` pour la confirmation client + notification admin **uniquement** quand `success=true`.
3. `get-fx-rate` (interne, cache 1 h en mémoire) — réutilise la source FX déjà mise en place pour le pricing volatile EGP.

Secrets ajoutés : les 7 clés ci-dessus.

## Modifications frontend
- `src/pages/Booking.tsx` :
  - Étape "Paiement" : remplacer la sélection card/cash par un bouton unique "Payer maintenant" (les méthodes Paymob sont sélectionnées sur la page de checkout hébergée).
  - Sur `handleConfirm` : appel `create-paymob-intent` puis `window.location.href = checkoutUrl`.
- Nouvelle route `/booking/return` : lit `merchant_order_id`, poll le statut du booking, affiche succès ou échec (et propose réessai).
- Affichage des montants : on garde la devise détectée par IP (logique déjà en place) ; on précise discrètement "Débité en EGP au taux du jour" si le client est en zone EUR.

## Sécurité
- Recalcul du prix server-side avant création de l'intention (anti-tampering).
- Vérification HMAC obligatoire sur le webhook, requêtes rejetées sinon.
- Aucune clé Paymob exposée côté client ; le `client_secret` Paymob est jetable et lié à une seule intention.
- RLS : `payment_events` lisible service_role uniquement ; `bookings.payment_*` lisible par le client propriétaire et admin.

## Étapes après validation du plan
1. Migration BDD (colonnes paiement + table events).
2. Ajout des 7 secrets Paymob via le formulaire sécurisé.
3. Création des 2 edge functions + tests via curl.
4. Adaptation de `Booking.tsx` + nouvelle page retour.
5. Test end-to-end en mode sandbox Paymob, puis bascule live.
