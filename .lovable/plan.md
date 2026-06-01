## Diagnostic

Le paiement fonctionne bien : les dernières réservations sont marquées `paid` et les webhooks Paymob ont une signature valide.

Le blocage est ailleurs : aucune ligne d’envoi email n’est créée pour les réservations Paymob récentes (`Yanis`). Le domaine email est vérifié, la file email existe, et le traitement email fonctionne sur l’ancien test du 3 mai. Le problème vient donc du déclenchement de l’email après paiement.

Cause probable : le webhook n’envoie l’email que si la réservation passe de `awaiting` à `paid`. Si la réservation est déjà marquée `paid` avant ou pendant le traitement, le webhook considère que c’est déjà fait et ne crée pas l’email. Les webhooks rejoués ne peuvent donc pas réparer l’absence d’email.

## Plan de correction

1. Rendre l’envoi email idempotent sur les logs email, pas uniquement sur `payment_status`
   - Avant d’envoyer, vérifier si un email `booking-received` existe déjà pour la réservation via sa clé d’idempotence.
   - Si aucun email n’existe, envoyer la confirmation client même si la réservation est déjà `paid`.
   - Faire pareil pour la notification admin.

2. Garder la protection anti-doublon
   - Ne pas renvoyer d’email si un envoi `pending`, `sent`, `failed`, `dlq` ou `suppressed` existe déjà pour cette réservation.
   - Conserver les clés : `booking-received-{bookingId}` et `admin-booking-{bookingId}`.

3. Ajouter un fallback de récupération
   - Si un paiement est confirmé et qu’aucun email n’a été créé, le webhook doit créer les emails même lors d’un replay Paymob.
   - Cela permettra de rejouer les trois réservations déjà payées pour générer les confirmations manquantes.

4. Déployer les fonctions concernées
   - Déployer `paymob-webhook` après modification.
   - Si nécessaire, redéployer aussi `send-transactional-email` et `process-email-queue` pour s’assurer que la version active est cohérente.

5. Vérifier après correction
   - Rejouer le webhook Paymob pour une réservation récente.
   - Vérifier que `email_send_log` contient `booking-received` pour le client et `admin-booking-notification` pour l’admin.
   - Vérifier que les statuts passent de `pending` à `sent`.

## Résultat attendu

Après paiement, le client recevra la confirmation de réservation en plus de la confirmation de paiement, et l’admin recevra la notification de nouvelle réservation.