

## Correction de l'erreur 404 sur /admin/login en production

### Diagnostic

L'erreur 404 sur `https://www.kccelitedriver.com/admin/login` est un probleme classique d'hebergement SPA (Single Page Application). Le site utilise React Router pour gerer les routes cote client, mais le serveur web ne sait pas qu'il doit servir `index.html` pour toutes les routes.

- En local / apercu Lovable : ca fonctionne car le serveur de developpement redirige automatiquement
- En production : le serveur cherche un fichier `/admin/login/index.html` qui n'existe pas et retourne 404

### Solution

Ajouter un fichier de configuration pour indiquer au serveur de toujours servir `index.html` quel que soit le chemin demande. On va creer deux fichiers de fallback qui couvrent les hebergeurs les plus courants :

#### 1. Ajouter `public/_redirects` (pour Netlify et Lovable)

Creer le fichier `public/_redirects` avec la regle de redirection SPA :

```text
/*    /index.html   200
```

Cette regle unique indique au serveur : "pour toute URL qui ne correspond pas a un fichier statique existant, sers `index.html` avec un code 200".

#### 2. Ajouter `public/404.html` (fallback supplementaire)

Creer un fichier `public/404.html` qui redirige automatiquement vers la SPA via JavaScript. Cela couvre les hebergeurs qui ne supportent pas `_redirects` mais permettent une page 404 personnalisee.

### Impact

- Toutes les routes (`/admin/login`, `/client/bookings`, `/fleet`, etc.) fonctionneront correctement en acces direct ou apres un rafraichissement de page
- Aucun changement sur le fonctionnement actuel du site
- Compatible avec la majorite des hebergeurs (Netlify, Vercel, GitHub Pages, Lovable)

