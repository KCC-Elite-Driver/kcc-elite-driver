## Objectif

1. Sur la page retour Paymob, afficher immédiatement un récapitulatif complet de la réservation + un bouton « Renvoyer l'email de confirmation ».
2. Mettre en place un test E2E automatisé (paiement → réservation → 2 emails) pour détecter toute régression.

---

## Partie 1 — Page de confirmation enrichie (`src/pages/BookingReturn.tsx`)

### Récapitulatif visible
Une fois `payment_status = paid` détecté, charger le booking complet et afficher :
- Référence (RES-YYYYMMDD-XXXX)
- Service, véhicule
- Trajet : pickup → dropoff
- Date / heure (formatées selon la locale active)
- Passagers, bagages, n° de vol (si présent)
- Client : prénom nom, email (masqué partiellement), téléphone
- Montant payé + devise affichée + devise débitée (EGP) si différente
- Bloc « Prochaines étapes » (checklist déjà utilisée dans la confirmation email)

### Bouton « Renvoyer la confirmation par email »
- Visible uniquement quand `status === "paid"`.
- État local : `idle | sending | sent | error` + cooldown 30 s.
- Action : `supabase.functions.invoke("send-transactional-email", { ... })` avec :
  - `templateName: "booking-received"`
  - `recipientEmail: booking.email`
  - `idempotencyKey: booking-received-resend-{bookingId}-{timestamp}` (différent de la clé webhook pour autoriser le renvoi)
  - `templateData` identique à celui envoyé par le webhook
- Feedback via `toast` (succès / erreur) + message inline.

### i18n
Ajouter les clés dans `src/i18n/translations.ts` pour EN-GB, FR, AR :
`bookingReturn.summary.*`, `bookingReturn.resend.*` (idle/sending/sent/cooldown/error).

### Style
Respecter Obsidian Black + Signature Gold, Playfair pour titre récap, cartes en glassmorphism existantes.

---

## Partie 2 — Test E2E automatisé

### Approche
Test Deno côté Edge Functions (cohérent avec `supabase/functions/*`), exécutable via `supabase--test_edge_functions`. Pas de test UI Vitest pour le flux paiement car nécessite Paymob réel.

### Fichier : `supabase/functions/paymob-webhook/e2e_test.ts`
Scénario en un seul `Deno.test` :

1. **Setup** : créer un booking de test en DB via service-role client (`payment_status = awaiting`).
2. **Forger un payload Paymob valide** :
   - Construire l'objet `obj` avec tous les champs HMAC.
   - Calculer le HMAC SHA-512 avec `PAYMOB_HMAC_SECRET` du `.env`.
   - `special_reference = bookingId` et `success = true`.
3. **Appeler `paymob-webhook`** via `fetch` direct (HMAC en query string).
4. **Assertions** :
   - Réponse 200.
   - `bookings.payment_status === "paid"`.
   - `payment_events` contient une ligne avec `hmac_valid = true`.
   - `email_send_log` contient une ligne `template_name = booking-received` avec `metadata.idempotency_key = booking-received-{bookingId}`.
   - `email_send_log` contient une ligne `template_name = admin-booking-notification`.
5. **Idempotence** : rappeler le webhook → vérifier qu'aucune ligne dupliquée n'est créée dans `email_send_log` (toujours 1 + 1).
6. **Cleanup** : supprimer booking + events + email logs créés.

### Loader d'env
Ajouter en tête : `import "https://deno.land/std@0.224.0/dotenv/load.ts";`
Variables lues : `VITE_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (ou `SUPABASE_PUBLISHABLE_KEY` + service via secrets), `PAYMOB_HMAC_SECRET`.

### CI hook
Documenter dans `README.md` (section Tests) que le test tourne via `supabase--test_edge_functions` ; pas d'intégration CI externe demandée.

---

## Fichiers touchés

| Fichier | Changement |
|---|---|
| `src/pages/BookingReturn.tsx` | Récap complet + bouton renvoi email |
| `src/i18n/translations.ts` | Nouvelles clés EN/FR/AR |
| `supabase/functions/paymob-webhook/e2e_test.ts` | Nouveau test E2E |
| `README.md` | Note sur l'exécution du test E2E |

---

## Hors scope (à confirmer si souhaité)
- Test UI Vitest de `BookingReturn` (mock Supabase) — peut être ajouté si tu veux une couverture front aussi.
- Tests pour `create-paymob-intent` (insertion booking pré-paiement).