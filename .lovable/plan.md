
## Regenerer l'image du SUV avec le meme rendu visuel que les Mercedes

### Probleme identifie
L'image actuelle du SUV a un rendu trop "CGI" par rapport aux Mercedes :
- Le fond est un noir pur avec un reflet miroir trop symetrique
- Il manque le sol en beton/asphalte gris visible sur les Mercedes
- Il manque le halo dore/ambre chaud en arriere-plan
- Les reflets lumineux sur la carrosserie ne sont pas assez realistes

### Ce que montrent les Mercedes (reference)
- Sol texturise gris beton avec reflets diffus
- Halo dore/ambre chaud en arriere-plan (cote arriere du vehicule)
- Eclairage lateral cinematique avec rim light subtil
- Aspect photographique de studio automobile professionnel

### Solution
Re-editer l'image du SUV via l'API d'edition d'image (google/gemini-3-pro-image-preview) avec un prompt beaucoup plus precis qui reproduit exactement l'esthetique des Mercedes :

**Prompt d'edition** : "Edit this black SUV image to match the exact same studio photography style: place the car on a textured gray concrete floor with realistic soft reflections, add a warm golden amber glow in the background behind the car, add subtle cinematic rim lighting on the car body edges, make the overall atmosphere look like a professional luxury automotive studio photograph, NOT CGI. Keep the car exactly as it is. No text, no watermarks, no borders."

### Fichier modifie
- `src/assets/soueast-s07-suv.jpg` : remplacement par la version re-editee

### Aucune modification de code
Les imports et composants restent identiques.
