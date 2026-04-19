

## Plan : Activer Paddle à la place de Stripe

L'utilisateur veut basculer vers **Paddle** (Merchant of Record) après l'échec de Stripe (pays workspace non supporté).

### Pourquoi Paddle peut fonctionner ici
- Paddle est Merchant of Record : il gère TVA, remittance, factures à la place de l'entité juridique du client.
- Pays supportés plus larges côté merchant que Stripe direct.
- Tarif : 5 % + 0,50 € par transaction, tout inclus.

### Point critique à valider avant d'activer
Paddle vend principalement du **digital/SaaS**. Un service de **chauffeur privé** (prestation physique de transport) entre dans une zone grise de la politique d'acceptation Paddle. L'outil `recommend_payment_provider` doit être lancé en premier pour vérifier l'éligibilité — il classe le projet et indique si Paddle est autorisé, refusé, ou "à examiner".

Si Paddle refuse la catégorie "transport/chauffeur", on devra retomber sur :
- Virement IBAN (option déjà discutée),
- Stripe BYOK (clés d'un compte Stripe existant dans un pays supporté),
- Shopify (peu adapté à de la réservation de service).

### Étapes d'implémentation (mode default après approbation)

1. **Lancer `recommend_payment_provider`** pour vérifier que Paddle accepte la catégorie chauffeur.
2. **Selon le résultat :**
   - **Paddle OK** → appeler `enable_paddle_payments` (création sandbox immédiate, KYC pour le live plus tard).
   - **Paddle refusé / à risque** → revenir vers toi avec les options de repli, ne rien activer.
3. **Si activé**, créer les produits Paddle correspondant à la grille tarifaire (Class E/V/S × airport/hourly), idéalement en lisant `pricing_rules` plutôt qu'en codant en dur.
4. **Implémenter le checkout** sur la page de confirmation de réservation : redirection Paddle Checkout avec le montant calculé, métadonnées = numéro de réservation.
5. **Webhook Paddle** (edge function) pour marquer la réservation comme `paid` dans la BDD à réception de l'événement `transaction.completed`.
6. **Gestion VIP "Sur devis"** : pas de checkout Paddle, on garde le flux WhatsApp.

### Ce que je ne peux pas garantir maintenant
- Que Paddle accepte la catégorie "service de chauffeur privé" — l'éligibilité ne sera connue qu'après l'étape 1.
- Que le pays du workspace soit supporté côté Paddle (peu probable que ça bloque, mais possible).

### À confirmer avant que je lance
Une seule question : **est-ce que je tente l'éligibilité Paddle maintenant**, sachant que si elle est refusée pour cause de "service physique de transport", on devra choisir une option de repli (IBAN ou Stripe BYOK) ? Si oui, j'enchaîne directement check → activation → produits → checkout.

