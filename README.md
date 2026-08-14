# josh-pierson.com

Josh Pierson's photography portfolio website. It's a plain HTML/CSS/JavaScript site — no build tools, no frameworks, no server required. The homepage shows a full-screen scrolling gallery of photos (loaded from `images/gallery/`), and there's a simple contact page with an email address and Instagram link. The site is hosted on Netlify.

## Previewing changes locally

You don't need to install anything. Just find `index.html` in the project folder and double-click it (or right-click → Open With → your browser). It'll open in your browser exactly as it would look live. Do the same with `contact.html` to preview that page.

To see a change, save the file you edited, then refresh the browser tab.

## Adding or swapping a photo

**Swapping a photo** (replacing photo-12.jpg with a different image, same slot):

1. Rename your new photo file to match exactly, e.g. `photo-12.jpg`.
2. Drop it into the `images/gallery/` folder, replacing the old one.
3. That's it — no other files need to change.

**Adding a new photo** (growing the gallery):

1. Name the file following the same pattern as the others: `photo-31.jpg` (the next number after the last one), all lowercase, using hyphens (not spaces or underscores) if the name ever needs more than one word.
2. Put it in `images/gallery/`.
3. Open `JS/main.js` in a text editor and find this line near the top:
   ```js
   for (let i = 1; i <= 75; i++) {
   ```
   Change `75` to match the total number of photos now in the gallery folder (count them, or check the highest number in a filename). This number tells the site how many photos to look for.
4. Save, then reload `index.html` in your browser to confirm the new photo shows up.

A few rules that matter:
- Filenames must be **lowercase** with **hyphens**, never spaces or capital letters (`photo-31.jpg`, not `Photo 31.JPG`). Web servers are picky about this and a mismatched filename will just show a broken image.
- The numbers should stay sequential with no gaps (photo-01, photo-02, photo-03...). A gap will cause a broken image in the gallery.
- If you remove a photo entirely, you'll need to renumber the ones after it (or just leave a gap and lower the count in `main.js` — but sequential is cleaner).

## Image requirements

Before adding any photo to the site, resize and compress it. Full-resolution camera files are far too large for a website and will make the site slow to load.

- **Size:** long edge should be 1600–2000 pixels (i.e. resize so the longer side of the image — width or height — is in that range).
- **Format:** JPEG at ~80% quality, or WebP.
- **File size:** aim for under 300KB per photo.
- **Never commit full-resolution originals** to this project. Keep your originals in Lightroom/your photo library — only the resized, compressed export goes into `images/gallery/`.

Most photo editors (Lightroom, Photoshop, Affinity, etc.) can export at a specific pixel size and quality in one step — use the export/"Save for Web" settings rather than resizing after the fact.

## Deploying the site

This site is hosted on Netlify using **Netlify Drop**, which just means dragging the folder onto a webpage — no command line, no git required.

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the entire project folder (the one containing `index.html`) onto the page.
3. Netlify uploads it and gives you a live URL within a minute or two.
4. If the site is already connected to a custom domain in Netlify, the new upload replaces the live site automatically — no extra steps needed.

Do this any time you've added/swapped photos or changed any file, and want those changes to go live.

## Photo copyright

All photographs in `images/` (including the gallery images) are © Josh Pierson and are **not** covered by the MIT license in this repository. That license applies only to the code (the HTML, CSS, and JavaScript files) — it grants no rights to reuse, copy, or redistribute any of the photos.

## If something breaks

If the site stops working right (photos not showing, layout looks wrong, page won't load, etc.):

1. Take a screenshot of the problem.
2. Open the file that seems related to the issue (most likely `JS/main.js`, `CSS/style.css`, `index.html`, or `contact.html`) and copy its contents.
3. Paste the code and the screenshot into Claude or ChatGPT and describe what you were trying to do and what's happening instead.

That's usually enough for it to spot the issue and tell you exactly what to change.
