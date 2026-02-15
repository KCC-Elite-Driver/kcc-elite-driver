

# Espace Admin + Espace Client — Backend et Interface

## Apercu general

Mise en place d'un backend complet avec Supabase (via Lovable Cloud) pour gerer :
- **Espace Administrateur** : gestion des reservations, prestataires, chauffeurs, assignation
- **Espace Client** : inscription, connexion, gestion de ses propres reservations, possibilite de re-commander un trajet identique

---

## Phase 1 : Backend (Supabase)

### 1.1 Activer Lovable Cloud
Connecter le backend Supabase integre au projet.

### 1.2 Tables a creer

| Table | Colonnes principales |
|-------|---------------------|
| `user_roles` | `id`, `user_id` (FK auth.users), `role` (enum: admin, user) |
| `providers` | `id`, `name`, `phone`, `email`, `created_at` |
| `drivers` | `id`, `provider_id` (FK providers), `firstname`, `lastname`, `phone`, `email`, `created_at` |
| `bookings` | `id`, `client_id` (FK auth.users), `driver_id` (FK drivers, nullable), `provider_id` (FK providers, nullable), `service_type`, `pickup`, `dropoff`, `date`, `time`, `firstname`, `lastname`, `email`, `phone`, `passengers`, `luggage`, `notes`, `flight_number`, `meet_greet`, `vehicle`, `payment_method`, `status` (enum: pending, confirmed, completed, cancelled), `created_at`, `updated_at` |

### 1.3 Fonction securisee + Policies RLS

- Fonction `is_admin(user_id)` en SECURITY DEFINER pour eviter la recursion
- **providers / drivers** : lecture, ecriture, suppression reservees aux admins
- **bookings** : admins voient tout ; clients voient/modifient/annulent uniquement les leurs
- **user_roles** : seuls les admins peuvent gerer les roles

### 1.4 Authentification
- Email + mot de passe via Supabase Auth
- Les clients s'inscrivent librement
- Les admins sont ajoutes manuellement en base (insertion dans `user_roles`)

---

## Phase 2 : Espace Administrateur

### Pages a creer

| Page | Route | Description |
|------|-------|-------------|
| Login Admin | `/admin/login` | Connexion email/mdp, redirection si admin |
| Dashboard | `/admin` | Vue d'ensemble des reservations recentes |
| Reservations | `/admin/bookings` | Liste avec filtres (statut, date), detail, assignation chauffeur |
| Prestataires | `/admin/providers` | CRUD prestataires |
| Chauffeurs | `/admin/drivers` | CRUD chauffeurs, lies a un prestataire, fiche avec coordonnees |

### Fonctionnalites cles
- **Tableau des reservations** : colonnes triables (date, client, statut, chauffeur assigne)
- **Assignation** : dropdown pour choisir prestataire puis chauffeur depuis la fiche reservation
- **Gestion prestataires** : ajouter/modifier/supprimer un prestataire
- **Gestion chauffeurs** : ajouter un chauffeur sous un prestataire, fiche complete (nom, prenom, telephone, email)

---

## Phase 3 : Espace Client

### Pages a creer

| Page | Route | Description |
|------|-------|-------------|
| Inscription | `/client/register` | Formulaire email/mdp |
| Connexion | `/client/login` | Login email/mdp |
| Mes reservations | `/client/bookings` | Liste des reservations du client |
| Detail reservation | `/client/bookings/:id` | Detail, modification, annulation |
| Nouvelle reservation | `/client/bookings/new` | Formulaire de reservation (reutilise le flow existant) |

### Fonctionnalites cles
- **Historique** : voir toutes ses reservations passees et futures
- **Modifier** : changer date, heure, adresse tant que le statut le permet
- **Annuler** : annulation avec confirmation
- **Re-commander** : bouton "Reserver a nouveau" qui pre-remplit le formulaire avec les memes donnees (meme chauffeur prefere, meme service, meme vehicule)

---

## Phase 4 : Integration avec le formulaire existant

Le formulaire de reservation actuel (`/booking`) sera adapte :
- Si le client est connecte : la reservation est enregistree en base liee a son compte
- Si non connecte : redirection vers inscription/connexion avant confirmation
- Les coordonnees (nom, email, tel) sont pre-remplies depuis le profil client

---

## Fichiers concernes

### Nouveaux fichiers (environ 15-20)

```text
src/integrations/supabase/         -- client + types auto-generes
src/pages/admin/AdminLogin.tsx
src/pages/admin/AdminDashboard.tsx
src/pages/admin/AdminBookings.tsx
src/pages/admin/AdminProviders.tsx
src/pages/admin/AdminDrivers.tsx
src/pages/client/ClientLogin.tsx
src/pages/client/ClientRegister.tsx
src/pages/client/ClientBookings.tsx
src/pages/client/ClientBookingDetail.tsx
src/components/admin/BookingTable.tsx
src/components/admin/ProviderForm.tsx
src/components/admin/DriverForm.tsx
src/components/client/BookingCard.tsx
src/components/ProtectedRoute.tsx
src/hooks/useAuth.ts
```

### Fichiers modifies

| Fichier | Modification |
|---------|-------------|
| `src/App.tsx` | Ajouter les routes admin et client |
| `src/pages/Booking.tsx` | Lier le formulaire a Supabase si connecte |
| `src/components/Header.tsx` | Ajouter lien Mon Espace / Se connecter |
| `src/i18n/translations.ts` | Ajouter les traductions admin/client |

---

## Details techniques

### Securite
- Fonction `is_admin()` en SECURITY DEFINER pour les policies RLS
- Roles stockes dans une table separee `user_roles` (jamais sur le profil)
- Routes admin protegees par un composant `ProtectedRoute` qui verifie le role en base
- Validation des inputs avec Zod cote client

### Approche incrementale
Vu l'ampleur, l'implementation se fera en plusieurs etapes :
1. Backend (tables + RLS + auth)
2. Espace admin (pages + CRUD)
3. Espace client (pages + reservations)
4. Integration du formulaire existant

