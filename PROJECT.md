# Halflight — Independent Studio for Web, Brand & Growth

A multi-page website for a fictional creative agency in Lisbon: **brand, web design, development, marketing and content**.

**Stack:** plain HTML, CSS and vanilla JavaScript. No framework and no build step. The only external script is [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling, loaded from unpkg; the site still works if it fails to load.

```
halflight/
├── index.html      Home
├── work.html       Work index (grid + index view, filters)
├── project.html    Case-study template (project.html?p=<slug>)
├── studio.html     About: who we are, services, process, crew, recognition
├── contact.html    Enquiry form, details, FAQ
├── site.css        One stylesheet for every page
├── site.js         Content data + shared chrome (header, footer, transitions, cursor, reveals) + per-page setup
└── media/          36 art-directed WebP images (generated for this site, 2.7 MB total)
```

Run it with `npx serve .` (or any static server), then open `index.html`.

---

## 1. Direction (v7) — what we learned from the references

The client chose **Antinomy + Parker** as the backbone, **AI-generated branded work** for imagery, **Switzer + a serif accent** for type, and a **multi-page** structure. The approved **collage hero** and **"for your consideration" crew rows** were kept.

What each reference actually does (fonts read from their CSS and font files, full pages scrolled, inner pages opened):

| Site | Fonts | What we borrowed |
|---|---|---|
| **Antinomy** | ABC Diatype only; 24px statements with 1.05 line height, 14px body; white | Case studies that alternate sides (a big image plus a grey "Case study" label and one sentence), a sparse client row, 4-column news cards, word-by-word text reveals, and a comma nav that shrinks into a centred pill on scroll |
| **Parker** | Die Grotesk + Nimbus Roman + PS Times; text #161e20 | A work grid of **bottom-aligned images of different heights**; captions reading "Name — one-line positioning"; **tag chips with a lime "New"**; a service list under each project; underlined key phrases in a large statement |
| **Motto** | PP Neue Montreal (20px/500 body) + NON Natural Grotesk | Calm, large body text; underlined text links rather than buttons; "Next project" treatment |
| **Rearc** | G2 Erika Mono UI + Neue Haas | A sentence **ringed by circles** (here: the crew's portraits), and a **numbered contents row** ("1. Who we are 2. What we do…") |
| **Samuel Orea** | Monument Grotesk | Photos of branded objects on clean backdrops |

**The biggest lesson was imagery.** None of the references use stock model portraits. They show **work in context**: a logo on a product, a sign, packaging, a billboard, a screen. The 36 images in `/media` were art-directed in that style with one shared look (medium-format film, soft natural light, muted palette). Each client's name actually appears in its photos: the NORTHWAKE label, the LOWTIDE sign, OBLONG RECORDS sleeves, PALE ORCHARD bottles, the VESSEL AIR billboard, the Kotawa app. The crew portraits are one consistent studio series.

---

## 2. Design system

| Token | Value | Use |
|---|---|---|
| `--bg` / `--ink` | `#fff` / `#141414` | Page / text |
| `--mute` | `#6e6e6e` | Small secondary text (≈5:1 on white) |
| `--soft` | `#a6a6a6` | Large secondary text only |
| `--line` | `#e6e6e6` | Hairlines |
| `--chip` | `#f1f1ef` | Chips, image placeholders |
| `--lime` | `#d9f56c` | "New" tag only |

**Type:**
- **Switzer variable** (Fontshare, free, weights 100–900 in one file): 400 for almost everything, 500 for names and labels. It has to be the variable version (`f[]=switzer@1`), because the footer wordmark animates through in-between weights.
- **Instrument Serif** italic: only for a few key words ("believe in", "after", "brave", "moments of growth").
- Sizes: 13px labels · 15px body · 18–23px lead · 22–32px statement · 30–58px large statement · 56–200px titles.
- Sentence case throughout; no all-caps headlines.

**Logo:** a circle with a horizon line and a half-sun rising above it, which is the "half light". The sun rises on hover, and the wordmark disappears when the header condenses into a pill.

**Motion:**
- Word-by-word rise on statements.
- Clip-wipe image reveals (the image clips, not its container, so the scroll trigger still fires).
- A fade-up on grid items.
- A white page-transition sheet with the logo.
- Cursor states ("View", "Next", "Send").
- Hover image swaps on work cards (second photo cross-fades in).
- Smooth, inertial scrolling (Lenis). It moves the real scroll position, so `position: sticky`, `scrollY` and anchor links all keep working. It pauses during the home loader and is off for reduced motion.
- Drifting crew rows that speed up with scroll.
- The footer wordmark thickens like a wave around the cursor (200 → 750 weight on a cosine falloff, rAF-throttled).

---

## 3. Pages

**Home:**
- Collage hero: the giant line slides through 10 photos of real work. Hovering a photo lifts it (slight scale and shadow), cross-fades it to the project's second shot, and shows a caption pill. The other photos stay untouched, with no dimming. Clicking opens the case study.
- Intro statement with underlined links.
- 3 figures.
- 4 featured case studies in the Antinomy rhythm (left, right, square offset, full-width).
- A client wordmark row.
- "More work" in the Parker grid.
- About: a large statement you can hover. Each underlined phrase ("fourteen designers…", "Lisbon", "fourteen countries", "first sketch") fans out a rotated stack of related photos that follows the cursor. Below a hairline sit overlapping crew faces (greyscale, turning colour on hover) linking to the crew, plus 3 figures. The fan is hidden on touch devices.
- Crew rows around "Let's make something *brave*".
- News cards.
- Footer.

**Work:**
- A statement header.
- Filter chips with counts (All, Web design, Development, Brand, Marketing), animated with View Transitions.
- A **Grid / Index** toggle. The index is a table with a cursor-following image preview.

**Case study** (`project.html?p=…`):
- Label, a huge name and a one-line positioning statement.
- Details row (client, year, sector, services).
- A full-bleed image with parallax.
- "The brief" / "Our response", then a second image with a caption.
- Three results.
- The client quote.
- A large "Next case study" with an image.

**Studio:**
- A statement orbited by the 12 crew portraits. They move on an ellipse sized to fit between the header and the contents row, and stay upright. It is pure CSS: an animated `@property --spin` angle feeds `cos()`/`sin()` positions, and `--ring-t`/`--ring-b` on `.st-hero` set the clearance. The numbered contents row tracks the section in view.
- 1. Who we are: the story plus two studio photos.
- 2. What we do: 5 service rows with an image preview on hover.
- 3. How we work: 4 steps.
- 4. The crew: a 6-column greyscale grid that turns colour on hover.
- 5. Recognition: an awards list with a project preview on hover.

**Contact:**
- A statement header.
- Details and a storefront photo.
- A form with chips, floating labels and validation.
- An FAQ built on `<details>`.

**Shared on every page:**
- Header: logo, comma nav with the current page in black, condensing to a pill on scroll (always a pill on mobile).
- Footer: new business email, Lisbon and London addresses with pin icons, follow links, newsletter, the giant wordmark, a live Lisbon clock.

---

## 4. Editing content

Everything lives in `site.js`:
- `PROJECTS` (slug, name, client, sector, year, services, `line`, brief, response, results, quote, featured, isNew, ratio).
- `CREW`.
- `NEWS`.

Each project uses the images `media/<key>-1.webp` (product or brand application) and `media/<key>-2.webp` (campaign or in-use shot). Adding a project means adding one object plus its two images. Grids, index, case page, next-project links and filter counts all update automatically.

**Common changes:**
- Colours, spacing and easing are CSS variables at the top of `site.css` (`:root`).
- The header nav and footer are built once in `chrome()` in `site.js`, so edit them there and every page updates.
- Each page has a setup function in the `pages` object in `site.js`, keyed by `<body data-page="…">`.
- Smooth-scroll feel is set by `lerp` in `new Lenis({ lerp: .1 })` (lower is floatier). Delete the Lenis `<script>` tag to turn it off.

> All names, clients, figures, awards, news and quotes are **fictional placeholders**.

---

## 5. Accessibility & responsive

- **Contrast:** secondary small text is #6e6e6e (≈5:1).
- **Semantics:** headings reset to regular weight; semantic landmarks; filters and view toggles use `aria-pressed`.
- **Screen readers:** the hero line is in `aria-label`, duplicated crew figures are `aria-hidden`, and the form reports via `role="status"`.
- **Motion:** `prefers-reduced-motion` turns off transitions, the loader, drifting and parallax.
- **Mobile:**
  - Pill header from the start, and the hero collage scales up.
  - Featured studies stack.
  - Grids go 4 → 2 → 1 columns and crew 6 → 3 → 2.
  - Tables collapse to name and arrow.
- **No sideways scroll:** `overflow-x: clip` on `html` only. Putting overflow on `body` as well would break `position: sticky`, which is what caused the blank screen in v4.

## 6. Performance

- **Images:** all 36 are WebP (max 1600px wide, quality 80), 2.7 MB in total, down from 5.2 MB of JPGs. Everything below the hero uses `loading="lazy"`.
- **Adding an image:** save it as `media/<name>.webp`. To convert a new photo:
  ```bash
  ffmpeg -i photo.jpg -vf "scale='min(1600,iw)':-2" -c:v libwebp -quality 80 media/name.webp
  ```
- **Animation work:** scroll-linked work runs in `requestAnimationFrame` and uses only `transform`/`opacity`, except the footer wordmark weight. Pointer handlers are passive or rAF-throttled.
- **Code size:** one CSS file (~33 KB) and one JS file (~34 KB), unminified and commented so they are easy to edit.

## 7. Before going live

1. **Forms:** search `site.js` for `ponytail:` and connect the contact form and newsletter to a backend.
2. **SEO:** add Open Graph images, a sitemap, and pre-render case pages if SEO matters (they are currently rendered from one template with JavaScript).
3. **Social links** currently point to `#`.

## Version history
v1 monospace → v2 white collage (approved hero) → v3 dark serif (`../halflight-v3-archive`) → v4 extras → v5 aligned to screenshots → v6 polish pass (`../halflight-v6-archive`) → **v7: reference-driven multi-page rebuild with generated brand imagery (this version).** Earlier versions and archives have been removed; only v7 remains.
