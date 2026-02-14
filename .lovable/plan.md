

# Plan : Mise a jour des textes optimises — Page A propos

Ce plan aligne les textes de la page About avec le contenu optimise fourni, en francais, anglais (British English) et arabe.

---

## 1. Mise a jour des traductions (`src/i18n/translations.ts`)

### Nouvelles cles a ajouter au type `TranslationKeys`

```
about_cta_desc: string;
about_values_title: string;
about_value_discretion: string;
about_value_discretion_desc: string;
about_value_excellence: string;
about_value_excellence_desc: string;
about_value_integrity: string;
about_value_integrity_desc: string;
about_value_anticipation: string;
about_value_anticipation_desc: string;
```

### Cles existantes a modifier (FR)

| Cle | Ancienne valeur | Nouvelle valeur |
|-----|----------------|-----------------|
| `about_story_p2` | "...chaque client merite une experience de transport qui depasse ses attentes. Que ce soit un dirigeant..." | "...chaque client merite une experience de transport qui transcende les simples attentes. Qu'il s'agisse d'un dirigeant d'entreprise en deplacement au Caire, d'une famille en voyage a Paris, ou d'un diplomate necessitant un service discret et securise, nous adaptons notre excellence a chaque situation." |
| `about_story_p3` | "...transport prive haut de gamme...chauffeurs tries sur le volet...vehicules premium..." | "...transport prive d'excellence...chauffeurs rigoureusement selectionnes...vehicules haut de gamme entretenus selon les standards les plus exigeants." |
| `about_team_drivers_desc` | Version courte | "Chaque chauffeur est rigoureusement selectionne pour son professionnalisme, sa connaissance approfondie des itineraires du Caire et de Paris, et sa maitrise parfaite du francais, de l'anglais et de l'arabe. Experience, discretion et excellence : notre standard." |
| `about_team_discretion_desc` | Version courte | "Nos chauffeurs sont formes aux plus hauts standards de confidentialite et de securite, garantissant la serenite totale de nos clients les plus exigeants. Votre vie privee est notre priorite absolue." |
| `about_team_training_desc` | "conduite securitaire, protocole VIP..." | "conduite defensive avancee, protocoles VIP, protocoles de securite renforces, premiers secours et connaissance complete des vehicules de derniere generation." |
| `about_cert_vtc_desc` | Version courte | "Licence professionnelle de transport de personnes delivree par les autorites competentes. Conformite totale avec la reglementation en vigueur en France et en Egypte." |
| `about_cert_insurance_desc` | Version courte | "Couverture d'assurance complete tous risques pour chaque trajet : passagers, bagages et vehicule inclus. Protection maximale pour votre tranquillite d'esprit." |
| `about_cert_safety` | "Formation Securite" | "Formation Securite Renforcee" |
| `about_cert_safety_desc` | Version courte | "Chauffeurs certifies en conduite defensive avancee et protocoles de securite de haut niveau. Entrainement regulier pour repondre aux normes internationales les plus strictes." |
| `about_cert_iso_desc` | Version courte | "Processus qualite alignes sur les normes internationales ISO de service premium. Audit et amelioration continue pour garantir l'excellence operationnelle." |
| `about_cta` | "Pret a vivre l'excellence ?" | "Commencons votre voyage d'excellence" |

### Nouvelles cles (FR)

| Cle | Valeur |
|-----|--------|
| `about_cta_desc` | "Decouvrez comment KCC-EliteDriver peut transformer vos deplacements." |
| `about_values_title` | "Nos Valeurs" |
| `about_value_discretion` | "Discretion" |
| `about_value_discretion_desc` | "Confidentialite absolue. Vos trajets, vos horaires, vos rencontres : tout reste prive." |
| `about_value_excellence` | "Excellence" |
| `about_value_excellence_desc` | "Nous ne nous contentons jamais du \"bon\". L'excellence est notre standard minimum." |
| `about_value_integrity` | "Integrite" |
| `about_value_integrity_desc` | "Transparence totale, tarification honnete, services sans detour." |
| `about_value_anticipation` | "Anticipation" |
| `about_value_anticipation_desc` | "Nous prevoyons vos besoins avant que vous les exprimiez." |

### Memes modifications en anglais (EN)

Toutes les cles existantes seront mises a jour avec les textes British English fournis (ex: "transcends expectations", "rigorously vetted", "Enhanced Security Training", "Begin Your Journey of Excellence").

Nouvelles cles EN : "Our Values", "Discretion", "Excellence", "Integrity", "Anticipation" avec descriptions.

### Memes modifications en arabe (AR)

Toutes les cles mises a jour et nouvelles seront traduites en arabe pour maintenir la parite trilingue et la compatibilite RTL.

---

## 2. Enrichissement de la page About (`src/pages/About.tsx`)

### Ajout de la section "Nos Valeurs"

Une nouvelle section sera inseree entre les Certifications et le CTA final, affichant 4 valeurs en grille (2x2 ou 4 colonnes) :
- Discretion
- Excellence
- Integrite
- Anticipation

Chaque valeur sera presentee avec un titre en gras et une description courte, dans le style des cartes de certification existantes.

### Enrichissement du CTA final

Le CTA affichera desormais une description optionnelle (`about_cta_desc`) sous le titre, avant le bouton. Le texte du bouton CTA utilisera une cle dediee selon la langue (FR: "Contact", EN: "Get in touch").

---

## Resume des fichiers a modifier

| Fichier | Modification |
|---------|-------------|
| `src/i18n/translations.ts` | Mise a jour de ~11 cles existantes + ajout de ~9 nouvelles cles (FR, EN, AR) |
| `src/pages/About.tsx` | Ajout section Valeurs + description CTA |

