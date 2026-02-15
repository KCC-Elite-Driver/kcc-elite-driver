

# Plan : Mise a jour Header, Footer et creation des pages legales

Ce plan met a jour le Header et le Footer avec les textes UX Writing optimises, enrichit le dropdown Services, ameliore le Footer avec 4 colonnes completes et cree 4 pages legales.

---

## 1. Traductions (`src/i18n/translations.ts`)

### Nouvelles cles a ajouter au type `TranslationKeys`

```
// Header - services dropdown enriched
services_dropdown_city: string;
services_dropdown_cultural: string;
services_dropdown_view_all: string;

// Footer - enriched
footer_description: string;
footer_service_city: string;
footer_service_cultural: string;
footer_whatsapp: string;
footer_address: string;
footer_hours: string;
footer_privacy_link: string;
footer_terms_link: string;
footer_cancellation_link: string;
footer_legal_link: string;

// Legal pages
privacy_title: string;
privacy_intro: string;
privacy_data_collected_title: string;
privacy_data_collected: string;
privacy_usage_title: string;
privacy_usage: string;
privacy_sharing_title: string;
privacy_sharing: string;
privacy_rights_title: string;
privacy_rights: string;
privacy_security_title: string;
privacy_security: string;
privacy_contact: string;

terms_title: string;
terms_acceptance: string;
terms_eligibility: string;
terms_booking: string;
terms_behaviour: string;
terms_liability: string;
terms_ip: string;
terms_modification: string;

cancellation_title: string;
cancellation_standard_title: string;
cancellation_standard: string;
cancellation_meetgreet_title: string;
cancellation_meetgreet: string;
cancellation_vip_title: string;
cancellation_vip: string;
cancellation_how_title: string;
cancellation_how: string;
cancellation_refund_title: string;
cancellation_refund: string;

legal_title: string;
legal_company: string;
legal_hosting: string;
legal_ip: string;
```

Valeurs FR, EN et AR ajoutees pour toutes les nouvelles cles.

### Cles existantes a mettre a jour

| Cle | Changement |
|-----|-----------|
| `footer_tagline` | Conserver (identique) |
| `footer_description` | Nouvelle cle avec description complete |

---

## 2. Header (`src/components/Header.tsx`)

### Modifications

- **Dropdown Services** : Ajouter 2 items supplementaires au tableau `serviceItems` :
  - "Intercites & Longue Distance" (`services_dropdown_city`)
  - "Circuits Touristiques Prives" (`services_dropdown_cultural`)
  - Separateur visuel (`<div>` avec border-t)
  - "Voir tous les services" (`services_dropdown_view_all`) avec lien vers `/services`
- **Alt text du logo** : Mettre a jour avec texte descriptif localise (utiliser `hero_title` existant)
- **CTA Reserver** : Lier vers `/booking` au lieu de `/contact` (coherence avec le brief)
- **Menu mobile** : Meme enrichissement du dropdown Services

---

## 3. Footer (`src/components/Footer.tsx`)

### Modifications

- **Colonne 1 (Branding)** : Ajouter la description complete sous le tagline (`footer_description`)
- **Colonne 2 (Navigation)** : Ajouter le lien Reservation (`nav_booking`)
- **Colonne 3 (Services)** : Transformer les textes statiques en liens vers `/services#anchor`, ajouter "Intercites & Longue Distance" et "Circuits Touristiques Prives"
- **Colonne 4 (Contact)** : Ajouter lien WhatsApp, afficher les horaires d'ouverture, ajouter l'adresse "Paris, France | Cairo, Egypt"
- **Section legale (bas de page)** : Ajouter une rangee de liens legaux :
  - Politique de confidentialite -> `/privacy`
  - Conditions d'utilisation -> `/terms`
  - Politique d'annulation -> `/cancellation-policy`
  - Mentions legales -> `/legal`

---

## 4. Nouvelles pages legales

### 4 fichiers a creer

**`src/pages/Privacy.tsx`**
- Page de politique de confidentialite avec sections : Introduction, Donnees collectees, Utilisation, Partage, Droits, Securite, Contact
- Structure claire avec titres h2 et paragraphes
- Utilise les cles de traduction pour le trilingue

**`src/pages/Terms.tsx`**
- Conditions d'utilisation : Acceptation, Eligibilite, Reservation et paiement, Comportement, Limitation de responsabilite, Propriete intellectuelle, Modification
- Meme structure que Privacy

**`src/pages/CancellationPolicy.tsx`**
- Politique d'annulation flexible avec 3 categories de service (Standard, Meet & Greet, VIP Events)
- Section "Comment annuler" et "Remboursement"
- Icones visuelles (check, warning, cross) pour chaque condition

**`src/pages/Legal.tsx`**
- Mentions legales : informations societe, hebergement, propriete intellectuelle
- Page plus courte et factuelle

---

## 5. Routage (`src/App.tsx`)

### Ajout de 4 routes

```
<Route path="/privacy" element={<Privacy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/cancellation-policy" element={<CancellationPolicy />} />
<Route path="/legal" element={<Legal />} />
```

---

## Resume des fichiers a modifier ou creer

| Fichier | Action |
|---------|--------|
| `src/i18n/translations.ts` | Ajout de ~40 nouvelles cles (FR, EN, AR) + mise a jour de quelques cles existantes |
| `src/components/Header.tsx` | Enrichissement dropdown Services (5 items + separateur + "Voir tous"), alt logo, CTA vers /booking |
| `src/components/Footer.tsx` | 4 colonnes completes, liens services, liens legaux, WhatsApp, horaires |
| `src/pages/Privacy.tsx` | Nouvelle page - Politique de confidentialite |
| `src/pages/Terms.tsx` | Nouvelle page - Conditions d'utilisation |
| `src/pages/CancellationPolicy.tsx` | Nouvelle page - Politique d'annulation |
| `src/pages/Legal.tsx` | Nouvelle page - Mentions legales |
| `src/App.tsx` | 4 nouvelles routes |

