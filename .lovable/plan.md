# Correction de l'envoi d'emails après paiement Paymob

## Problème
Après un paiement réussi, les emails de confirmation (client + admin) ne sont jamais envoyés, même si :
- Le webhook Paymob est bien reçu
- La signature HMAC est validée
- La réservation passe correctement à `payment_status = paid`

## Cause racine
Dans `supabase/functions/paymob-webhook/index.ts`, les appels à `send-transactional-email` sont en *fire-and-forget* :
```ts
fetch(fnUrl, { … }).catch(e => console.error(…))
return new Response("ok", …)
```
Deno arrête le worker dès le `return`. Les promesses `fetch()` non awaited sont tuées avant l'envoi → aucun email n'arrive et aucune ligne n'est créée dans `email_send_log`.

## Correction
Dans `paymob-webhook/index.ts`, remplacer les deux `fetch(...).catch(...)` par un `await Promise.allSettled([...])` avant le `return`. Comme ça :
- Les deux requêtes (email client + email admin) partent réellement
- Si l'une échoue, l'autre part quand même
- On loggue les erreurs individuelles
- On répond toujours `200 ok` à Paymob (jamais bloquer l'ACK webhook)

## Test après déploiement
1. Renvoyer un webhook test via le dashboard Paymob (ou nouveau paiement sandbox)
2. Vérifier `email_send_log` → 2 nouvelles lignes (`booking-received` + `admin-booking-notification`)
3. Vérifier réception dans la boîte du client et `admin@kccelitedriver.com`

## Bonus (optionnel, à valider)
Aussi rattraper la réservation déjà payée `35cd52b5-2d69-4466-94f8-95d6cdbc24c4` en relançant manuellement l'envoi des 2 emails, pour ne pas perdre ce test.
