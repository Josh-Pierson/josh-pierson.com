# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## Project overview

This is Josh Pierson's static photography portfolio website. It is:

- Plain HTML, CSS, and JavaScript — **no framework, no build step, no bundler, no package manager**.
- Hosted on **Netlify** via **Netlify Drop** (the whole project folder is dragged onto app.netlify.com/drop to deploy — no CLI, no git-based deploy pipeline).
- Meant to remain a folder you can open directly in a browser (double-click `index.html`) and see exactly what will be live.

**The site owner, Josh, is not a developer.** He maintains this site himself between AI-assisted sessions. This has direct consequences for how you should work here:

- Keep changes simple and readable. Avoid clever or terse code.
- Add clear comments explaining *why* something is done, especially anything non-obvious.
- Don't introduce concepts (build tools, transpilers, frameworks, npm packages, CSS preprocessors, etc.) that would require tooling Josh doesn't have installed or doesn't understand.
- Prefer the most boring, obvious solution over an elegant abstraction.

## File structure

```
index.html            Homepage — full-screen scrolling photo gallery
contact.html          Contact page — email link, Instagram link, mailto contact
CSS/
  style.css           All site styles (single stylesheet, no preprocessor)
JS/
  main.js             Gallery rendering, infinite-scroll shuffle, mobile/desktop header show/hide behavior
images/
  contact.png          Portrait image used on the contact page
  contact-background.jpg  Background image for the contact page
  gallery/
    photo-01.jpg ... photo-75.jpg   The gallery images, in display order
README.md            Human-facing instructions for Josh (how to add/swap photos, deploy, image export settings, troubleshooting)
LICENSE              MIT license — covers the CODE ONLY, not the photos (see below)
favicon.ico          Browser tab icon, generated from images/gallery/photo-02.jpg
apple-touch-icon.png iOS home-screen bookmark icon (180x180), generated from images/gallery/photo-02.jpg
```

There is intentionally no `package.json`, no `node_modules`, no config files, and no server-side code. Keep it that way.

## Image handling conventions

- **Filenames must be lowercase, hyphen-separated** — e.g. `photo-31.jpg`, never `Photo 31.JPG` or `photo_31.jpg`. Web servers are case-sensitive and picky about this; a mismatched filename silently breaks the image.
- Gallery photos live in `images/gallery/` and follow the pattern `photo-01.jpg`, `photo-02.jpg`, ... sequentially, with **no gaps** in the numbering.
- **Only web-optimized images belong in this repo.** Never commit full-resolution camera originals.
  - Long edge: 1600–2000px
  - Format: JPEG (~80% quality) or WebP
  - Target: under 300KB per photo
  - Originals stay in Josh's Lightroom/photo library, not in this project.
- **How images are referenced:** `JS/main.js` builds the gallery filenames programmatically — it loops `for (let i = 1; i <= 75; i++)` and constructs `photo-01.jpg` through `photo-75.jpg`, then sets each `<img>`'s `src` to `"images/gallery/" + photo`. There is no manifest file or `<img>` tag per photo in the HTML — **the loop's upper bound in `main.js` is the single source of truth for how many gallery photos exist**, and it must be updated whenever photos are added or removed. `contact.png` and `contact-background.jpg` are referenced directly by filename in `contact.html`/`style.css`.

## Hard constraints — do not do these

- **Do not add build tools, package managers, frameworks, or dependencies of any kind.** No npm/yarn/pnpm, no React/Vue/Svelte, no Sass/Less/PostCSS, no bundlers (Vite/Webpack/Parcel), no static site generators. The project must always remain a plain folder that opens directly in a browser and can be dragged straight into Netlify Drop.
- **Do not remove or weaken any `robots.txt` or meta-tag AI-scraping protections.** If such a file or tags exist (or are added later), preserve them exactly; do not "clean them up" or remove them as part of unrelated changes.
- **Never suggest, apply, or discuss making the photos public domain or licensing them under an open-source/Creative Commons license.** All photographs under `images/` (including everything in `images/gallery/`) are © Josh Pierson, all rights reserved. The MIT `LICENSE` in this repo covers the HTML/CSS/JS code only — it grants zero rights to the images. See the "Photo copyright" section of `README.md`.
- **Comment your changes.** When you edit HTML, CSS, or JS, add a short HTML/CSS/JS comment near the change explaining what changed and why, so Josh (who doesn't code) can follow along later or paste it to an AI assistant for help.

## Mobile responsiveness

Mobile matters — a large share of visitors will be on phones. **Always check changes at a 375px viewport width** (roughly an iPhone SE/mini) in addition to desktop, especially for:

- The gallery grid/layout in `CSS/style.css`
- The show/hide header behavior in `JS/main.js` (desktop uses mouse position near the top of the screen; mobile uses touch/scroll to reveal the header for 3 seconds — see the `DESKTOP HEADER` / `MOBILE HEADER` sections in `main.js`)
- The contact page layout in `contact.html`

## Contact form

Contact is currently a simple `mailto:` link on `contact.html`, not an HTML `<form>`. If a real contact form is added in the future, it should use **Netlify Forms**: add `data-netlify="true"` (plus a `name` attribute and a hidden `form-name` input matching Netlify's static-form-detection requirements) to the `<form>` element. This requires no backend code or JavaScript submission handler — Netlify detects and processes the form automatically at deploy time. Do not wire up a custom form backend, third-party form service, or serverless function for this.
