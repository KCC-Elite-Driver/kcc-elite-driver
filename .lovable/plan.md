# Intégration Paymob — Carte bancaire

## Périmètre v1
- **Activé maintenant** : carte bancaire (Visa / Mastercard / Meeza) via Paymob.
- **Plus tard** : wallets égyptiens, Apple Pay, Google Pay — il suffira d'ajouter les Integration IDs Paymob correspondants une fois ces méthodes activées sur votre compte Paymob.

## Devises
- Client à Paris → affichage et facturation perçue en **EUR**, conversion EUR → EGP en backend (Paymob ne facture qu'en EGP).
- Client en Égypte → tout en **EGP** (pas de conversion).
- Le taux EUR→EGP utilisé est stocké sur la réservation pour traçabilité.

## Clés Paymob nécessaires (v1)
À récupérer dans **Paymob Dashboard → Developers → API Keys & Integrations** :

1. `PAYMOB_SECRET_KEY` — section *API Keys* (commence par `egy_sk_...`)
2. `PAYMOB_PUBLIC_KEY` — section *API Keys* (commence par `egy_pk_...`)
3. `PAYMOB_HMAC_SECRET` — section *HMAC* (vérification des webhooks)
4. `PAYMOB_INTEGRATION_ID_CARD` — l'ID numérique de votre intégration "Online Card"

Je vous demanderai ces 4 valeurs via le formulaire sécurisé dès passage en build.

## Flux

```text
Booking étape "Paiement"
  └─► Edge fn create-paymob-intent
        ├─ recalcule le prix server-side
        ├─ convertit EUR→EGP si besoin (taux live)
        ├─ crée booking (status=pending, payment_status=awaiting)
        ├─ crée l'Intention Paymob (méthode = carte)
        └─► renvoie l'URL de checkout hébergé Paymob
  └─► Redirection vers Paymob Checkout
        └─► retour /booking/return?merchant_order_id=...

Webhook paymob-webhook (public, vérif HMAC obligatoire)
  └─► met à jour booking.payment_status
  └─► déclenche emails (booking-received + admin-notification) si paiement OK
```

## Base de données
Migration déjà appliquée. Ajoute à `bookings` : `payment_status`, `payment_provider`, `payment_intent_id`, `payment_order_id`, `payment_transaction_id`, `amount_charged`, `currency_charged`, `amount_display`, `currency_display`, `fx_rate`. Crée la table `payment_events` (journal des webhooks, RLS service_role + admin lecture).

## Edge Functions à créer
1. **`create-paymob-intent`** (`verify_jwt = false`) — validation Zod, recalcul prix, conversion FX, création Intention Paymob, insertion booking, retour URL checkout.
2. **`paymob-webhook`** (`verify_jwt = false`) — vérification HMAC, mise à jour booking, log dans `payment_events`, déclenchement des emails uniquement si succès.

## Frontend
- `src/pages/Booking.tsx` — étape "Paiement" simplifiée : un bouton **"Procéder au paiement"** qui redirige vers Paymob. (On retire la sélection card/cash : tout passe par Paymob carte.)
- Pour les clients EUR : petite mention discrète "Débité en EGP au taux du jour" sous le total.
- Nouvelle page `/booking/return` — lit `merchant_order_id`, vérifie le statut, affiche confirmation ou échec avec option de réessai.

## Sécurité
- Aucune clé Paymob exposée au navigateur.
- Prix toujours recalculé côté serveur avant création de l'Intention.
- HMAC vérifié sur chaque webhook ; requêtes invalides rejetées et loguées.
- `payment_events` non lisible publiquement.

## Étapes après validation
1. Demander les 4 secrets Paymob.
2. Créer les 2 edge functions et les tester via curl en mode sandbox.
3. Mettre à jour `Booking.tsx` + nouvelle page `/booking/return`.
4. Test end-to-end avec une transaction sandbox, puis bascule en live.
5. Quand vous activez wallets / Apple Pay / Google Pay côté Paymob → ajouter les Integration IDs correspondants (changement mineur dans `create-paymob-intent`).
