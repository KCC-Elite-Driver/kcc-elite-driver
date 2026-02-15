

# Plan : Mise a jour de la page Contact — Textes optimises

Ce plan enrichit la page Contact avec le contenu UX Writing fourni, en francais, anglais (British English) et arabe.

---

## 1. Traductions (`src/i18n/translations.ts`)

### Cles existantes a mettre a jour

| Cle | Nouvelle valeur FR |
|-----|--------------------|
| `contact_subtitle` | "Pour une demande sur mesure, un devis personnalise ou des questions sur nos services." |
| `contact_name` | "Nom complet" (identique) |
| `contact_message` | "Votre message" (identique) |
| `contact_service_airport` | "Transfer Aeroport" |
| `contact_service_hourly` | "Mise a Disposition Horaire" |
| `contact_service_event` | "Evenement VIP" (identique) |
| `contact_service_other` | "Autre demande" |
| `contact_send` | "Envoyer mon message" |
| `contact_success` | "Votre message a ete envoye avec succes. Notre equipe vous repondra sous peu a l'adresse email fournie." |
| `contact_whatsapp` | "Discuter sur WhatsApp" |
| `contact_call` | "Appeler maintenant" |
| `contact_direct_subtitle` | "Reponse garantie sous 2 heures (Lun-Ven 8h-20h / Sam-Dim 9h-18h)" |
| `contact_map_coming` | "Google Maps — Bientot disponible" (identique) |

Memes mises a jour pour EN et AR.

### Nouvelles cles a ajouter

```
// Contact - hero description
contact_description: string;

// Contact - form section
contact_form_title: string;
contact_form_desc: string;
contact_name_placeholder: string;
contact_email_placeholder: string;
contact_email_helper: string;
contact_phone_placeholder: string;
contact_phone_helper: string;
contact_service_placeholder: string;
contact_service_city: string;
contact_service_tours: string;
contact_service_helper: string;
contact_message_placeholder: string;
contact_message_helper: string;
contact_privacy_checkbox: string;
contact_privacy_desc: string;
contact_submit_helper: string;
contact_success_title: string;

// Contact - direct contact enrichment
contact_email_direct: string;
contact_email_direct_helper: string;
contact_whatsapp_helper: string;
contact_call_helper: string;
contact_call_number: string;
contact_call_hours: string;

// Contact - FAQ
contact_faq_title: string;
contact_faq_q1: string;
contact_faq_a1: string;
contact_faq_q2: string;
contact_faq_a2: string;
contact_faq_q3: string;
contact_faq_a3: string;
contact_faq_q4: string;
contact_faq_a4: string;
contact_faq_q5: string;
contact_faq_a5: string;
```

### Valeurs FR des nouvelles cles

| Cle | Valeur |
|-----|--------|
| `contact_description` | "Notre equipe est disponible pour vous servir. Reponse garantie sous 2 heures." |
| `contact_form_title` | "Envoyez-nous un message" |
| `contact_form_desc` | "Completez ce formulaire. Nous vous repondrons rapidement." |
| `contact_name_placeholder` | "Jean Dupont" |
| `contact_email_placeholder` | "jean.dupont@example.com" |
| `contact_email_helper` | "Nous vous repondrons a cette adresse." |
| `contact_phone_placeholder` | "+33 6 XX XX XX XX" |
| `contact_phone_helper` | "Pour vous contacter directement si necessaire." |
| `contact_service_placeholder` | "Selectionnez un service" |
| `contact_service_city` | "Intercites & Longue Distance" |
| `contact_service_tours` | "Circuits Touristiques Prives" |
| `contact_service_helper` | "Cela nous aide a diriger votre message au bon service." |
| `contact_message_placeholder` | "Decrivez votre demande : type de service, dates, besoins specifiques, preferences..." |
| `contact_message_helper` | "Plus vous nous donnez de details, plus nous pourrons personnaliser notre reponse." |
| `contact_privacy_checkbox` | "J'accepte que mes donnees soient traitees pour repondre a ma demande" |
| `contact_privacy_desc` | "Vos donnees personnelles seront traitees conformement a notre Politique de confidentialite." |
| `contact_submit_helper` | "Nos equipes repondent generalement sous 2 heures pendant les heures de bureau." |
| `contact_success_title` | "Merci !" |
| `contact_email_direct` | "contact@kcc-elitedriver.com" |
| `contact_email_direct_helper` | "Reponse garantie sous 2 heures." |
| `contact_whatsapp_helper` | "Chat instantane. Disponible 24h/24, reponse rapide." |
| `contact_call_helper` | "Parlez directement a un agent. Gratuit depuis la France." |
| `contact_call_number` | "+33 1 23 45 67 89" |
| `contact_call_hours` | "Lun-Ven 08:00-20:00 / Sam-Dim 09:00-18:00 (CET)" |
| `contact_faq_title` | "Questions frequemment posees" |
| `contact_faq_q1` | "Quel est votre delai de reponse ?" |
| `contact_faq_a1` | "Nous garantissons une reponse sous 2 heures pendant les heures de bureau (lun-ven 8h-20h, sam-dim 9h-18h)." |
| `contact_faq_q2` | "Puis-je modifier ma reservation ?" |
| `contact_faq_a2` | "Oui. Annulation gratuite jusqu'a 24h avant le depart (48h pour Meet & Greet a l'aeroport)." |
| `contact_faq_q3` | "Proposez-vous des services pour les groupes ?" |
| `contact_faq_a3` | "Absolument. Notre Van Prestige accueille jusqu'a 7 passagers. Pour les delegations plus importantes, nous coordonnons plusieurs vehicules." |
| `contact_faq_q4` | "Comment sont traitees mes donnees personnelles ?" |
| `contact_faq_a4` | "Vos donnees sont traitees de maniere confidentielle conformement a nos standards de securite les plus stricts." |
| `contact_faq_q5` | "Acceptez-vous les paiements en especes ?" |
| `contact_faq_a5` | "Oui, reglez en especes directement aupres du chauffeur. Tarif fixe, pas de surprise. Recu fourni." |

Valeurs EN et AR equivalentes ajoutees egalement.

---

## 2. Formulaire de contact (`src/components/contact/ContactForm.tsx`)

### Modifications

- Ajouter un titre de section (`contact_form_title`) et une description (`contact_form_desc`) en haut du formulaire
- Ajouter des placeholders localises sur tous les champs (name, email, phone, message)
- Ajouter des helper texts sous les champs email, phone, service et message
- Ajouter 2 options au dropdown service : "Intercites & Longue Distance" et "Circuits Touristiques Prives"
- Remplacer le placeholder du dropdown par `contact_service_placeholder`
- Ajouter une checkbox de consentement confidentialite (obligatoire) avant le bouton
- Ajouter un helper text pre-soumission sous le bouton
- Mettre a jour le schema zod pour inclure le champ `privacy_accepted`

---

## 3. Contact direct (`src/components/contact/DirectContact.tsx`)

### Modifications

- Ajouter un bloc email direct (icone Mail, lien mailto:contact@kcc-elitedriver.com) avec helper text
- Ajouter des helper texts sous les boutons WhatsApp et Appel
- Afficher le numero de telephone visible et les horaires d'ouverture
- Mettre a jour le message WhatsApp pre-rempli avec le texte optimise localise

---

## 4. Section FAQ (`src/pages/Contact.tsx`)

### Ajout

- Nouvelle section FAQ sous le formulaire/sidebar, utilisant le composant Accordion de shadcn/ui
- 5 questions-reponses issues du contenu UX Writing
- Animation d'entree ScrollReveal coherente avec le reste du site

---

## Resume des fichiers a modifier

| Fichier | Modification |
|---------|-------------|
| `src/i18n/translations.ts` | Mise a jour de ~13 cles existantes + ajout de ~30 nouvelles cles (FR, EN, AR) |
| `src/components/contact/ContactForm.tsx` | Titre de section, placeholders, helpers, 2 options service, checkbox confidentialite |
| `src/components/contact/DirectContact.tsx` | Bloc email, helpers, numero visible, horaires |
| `src/pages/Contact.tsx` | Ajout description hero + section FAQ avec Accordion |

