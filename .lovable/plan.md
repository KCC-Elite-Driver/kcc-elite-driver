Replace the favicon with the newly uploaded logo `Logo_Webp_fond_noir-3.webp` (white K monogram + airplane + car on black), with the black background removed so the logo appears clean on the browser tab.

## Steps

1. Use `imagegen--edit_image` on `/mnt/user-uploads/Logo_Webp_fond_noir-3.webp` with `transparent_background: true`, cropping tightly to the logo for maximum visibility. Output → `public/favicon.png` (overwrites the current gold KCC favicon).
2. No changes to `index.html` — it already points at `/favicon.png`.