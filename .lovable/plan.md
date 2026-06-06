Use the original uploaded logo `Logo_Webp_fond_noir-2.webp`, remove its black background, and use it as the favicon at a larger visible size.

## Steps

1. Copy `user-uploads://Logo_Webp_fond_noir-2.webp` to `/tmp/logo-original.webp`.
2. Use `imagegen--edit_image` with `transparent_background: true` on the original logo to remove the black background, output to `public/favicon.png` (overwrites current generated favicon).
3. Keep `index.html` as is — it already references `/favicon.png` with `sizes="any"`, so browsers will scale up the transparent PNG naturally on the tab. The transparent background will make the logo appear visually larger (no black box around it eating space).

No new logo will be generated — only background removal on your original file.