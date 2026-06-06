
# Correction complète des bugs d'audit

## 🔴 Critiques

### 1. Formulaire de contact non fonctionnel
Créer une edge function `send-contact-message` qui :
- Valide l'input (zod)
- Envoie un email via le système transactionnel existant à `contact@kccelitedriver.com` (et copie au client)
- Branche `ContactForm.tsx` sur `supabase.functions.invoke('send-contact-message', ...)` avec gestion d'erreur

### 2. Désync `service_type` (Booking)
Dans `src/pages/Booking.tsx` (lignes 459 & 529), appliquer `mapServiceType()` avant insertion en BDD pour que `bookings.service_type` matche les valeurs de `pricing_rules` (`airport` / `hourly` / `vip` / `intercity` / `tours`).

## 🟡 Moyennes

### 3. Numéro de téléphone factice
Remplacer `+33 1 23 45 67 89` dans `translations.ts` (clés `contact_call_number`, `legal_company`) par le vrai numéro. **Question** : quel numéro utiliser ? Par défaut je mets celui de `DirectContact.tsx` actuel s'il est réel, sinon je laisse un placeholder neutre `+33 (0)1 XX XX XX XX` clairement marqué TODO.

### 4. Surcharge Meet & Greet hardcodée
Lire la valeur depuis `pricing_rules` (ajout d'une colonne ou utilisation de `sphinx_surcharge` selon convention). Simplification : créer une constante centralisée `MEET_GREET_SURCHARGE` dans `src/lib/pricing.ts` partagée client + edge function, jusqu'à migration BDD complète.

### 5. Textes hardcodés FR dans Booking
Ajouter clés i18n `booking_estimated_price` et `booking_trip_details_helper` (EN/FR/AR) dans `translations.ts`, et remplacer les littéraux ligne 961 & 1200.

### 6. Lien Services manquant dans Footer
Ajouter l'entrée `Services` -> `/services` dans la colonne Navigation de `src/components/Footer.tsx`.

## 🟢 Basses

### 7. BookingReturn — i18n
Migrer `src/pages/BookingReturn.tsx` vers `useTranslation()` + clés dans `translations.ts` (EN/FR/AR).

### 8. Console.log de debug
Retirer les `console.log` / `console.error` non essentiels de `ContactForm.tsx:55` et `NotFound.tsx:8`.

## Vérifications finales
- Build TS
- Test manuel : envoi formulaire contact → email reçu
- Test manuel : nouvelle réservation → `service_type` correct en BDD
- Vérifier RTL/AR sur Booking et BookingReturn

## Question préalable
**Quel numéro de téléphone réel utiliser pour le site ?** (sinon je laisse un placeholder TODO clair)
