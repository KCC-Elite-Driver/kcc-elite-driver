

## Regenerer l'image SUV : profil pur, fond noir/dore, cote conducteur

### Probleme
L'image actuelle montre le SUV en vue 3/4 au lieu d'une vue de profil laterale pure comme les trois Mercedes. Il faut aussi corriger le fond (noir profond + reflets dores/ambre) et le cadrage.

### Ce qui sera fait

Regenerer `src/assets/soueast-s07-suv.jpg` avec ces specifications strictes :

- **Vue de profil laterale pure** (pas de 3/4) : le vehicule est vu exactement de cote, comme les Mercedes
- **Orientation vers la droite** (nez a droite) pour montrer le cote conducteur (conduite a gauche), coherent avec les autres images de la flotte
- **Fond noir profond** (#050505) avec reflets dores/ambre chauds sur le sol et la carrosserie
- **Eclairage cinematique** : halo dore lateral identique aux Mercedes
- **Cadrage** : vehicule centre, remplissant le cadre horizontalement, proportions 16:9 (1920x1080)
- **Style** : editorial luxe automobile, pas d'annotations, pas de texte

Aucune modification de code. Seul le fichier image est remplace.

### Details techniques

Prompt optimise pour forcer le profil pur :
"Black Soueast S07 SUV, EXACT side profile view perfectly perpendicular to camera, facing right, showing driver door side, pure black background with subtle warm golden amber reflections on floor and car body, golden rim lighting on edges, cinematic luxury automotive studio photography, car perfectly centered filling entire frame horizontally, same dark moody studio aesthetic as Mercedes S-Class press photo, absolutely no 3/4 angle, strict 90 degree side view only, no text no annotations no watermarks, high contrast editorial style, 1920x1080 16:9"

