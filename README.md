# Halflight

A multi-page website for a fictional independent creative studio in Lisbon (brand, web, development, marketing, content). Built with plain HTML, CSS and vanilla JS: no framework, no build step.

> All names, clients, figures, awards, news and quotes are fictional placeholders. Images are AI-generated for this project.

## Quick start

```bash
npx serve .
```

Then open `index.html`. Any static server works.

## Structure

```
halflight/
├── index.html      Home
├── work.html       Work index (grid + index view, filters)
├── project.html    Case-study template (project.html?p=<slug>)
├── studio.html     About: story, services, process, crew, recognition
├── contact.html    Enquiry form, details, FAQ
├── site.css        One stylesheet for every page
├── site.js         Content data + shared chrome + per-page setup
└── media/          36 WebP images (2.7 MB total)
```

**Only dependency:** [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling, loaded from unpkg. The site works without it.

## Features

- **Collage hero:** a giant line slides through 10 project photos; hover lifts, cross-fades and captions a photo, click opens the case study.
- **Work page:** filter chips with counts (View Transitions) and a Grid / Index toggle; the index has a cursor-following image preview.
- **Case studies:** one JS-rendered template with details row, parallax image, brief/response, results, quote and "Next case study".
- **Studio page:** a headline orbited by 12 crew portraits in pure CSS (`@property --spin` + `cos()`/`sin()`), with a numbered contents row that tracks the section in view.
- **Hover statement:** underlined phrases fan out a rotated photo stack that follows the cursor (hidden on touch).
- **Footer wordmark:** variable font weight ripples around the cursor (200 → 750, cosine falloff, rAF-throttled), plus a live Lisbon clock.
- **Shared chrome:** comma nav that condenses into a pill on scroll, page-transition sheet, custom cursor states ("View", "Next", "Send").
- **Motion:** word-by-word text reveals, clip-wipe image reveals, fade-up grids, drifting crew rows that speed up with scroll.

## Design system

| Token | Value | Use |
|---|---|---|
| `--bg` / `--ink` | `#fff` / `#141414` | Page / text |
| `--mute` | `#6e6e6e` | Small secondary text (≈5:1) |
| `--soft` | `#a6a6a6` | Large secondary text only |
| `--line` | `#e6e6e6` | Hairlines |
| `--chip` | `#f1f1ef` | Chips, image placeholders |
| `--lime` | `#d9f56c` | "New" tag only |

**Type**
- [Switzer](https://www.fontshare.com/fonts/switzer) variable (`f[]=switzer@1`): 400 body, 500 labels. Must be the variable file; the footer animates through in-between weights.
- Instrument Serif italic for a few accent words only.
- Sentence case throughout.

**Logo:** a circle with a horizon line and a half-sun that rises on hover.

## Editing content

All content lives in `site.js`:

| Object | Contents |
|---|---|
| `PROJECTS` | slug, name, client, sector, year, services, `line`, brief, response, results, quote, featured, isNew, ratio |
| `CREW` | Team members |
| `NEWS` | News cards |

**Adding a project:** add one object to `PROJECTS` plus `media/<key>-1.webp` (product/brand application) and `media/<key>-2.webp` (in-use shot). Grids, index, case page, next links and filter counts update automatically.

**Other changes**
- Colours, spacing, easing: CSS variables in `:root` of `site.css`.
- Header and footer: `chrome()` in `site.js`.
- Per-page logic: the `pages` object in `site.js`, keyed by `<body data-page="…">`.
- Scroll feel: `new Lenis({ lerp: .1 })` (lower = floatier). Remove the Lenis `<script>` to disable.

**Converting images**
```bash
ffmpeg -i photo.jpg -vf "scale='min(1600,iw)':-2" -c:v libwebp -quality 80 media/name.webp
```

## Accessibility

- Semantic landmarks; filters and toggles use `aria-pressed`.
- Hero line exposed via `aria-label`; duplicated crew figures are `aria-hidden`; form status via `role="status"`.
- `prefers-reduced-motion` disables transitions, loader, drifting, parallax and smooth scroll.

## Responsive

- Pill header from the start on mobile; hero collage scales up.
- Grids 4 → 2 → 1 columns, crew 6 → 3 → 2; tables collapse to name + arrow.
- `overflow-x: clip` is on `html` only. Adding it to `body` breaks `position: sticky`.

## Performance

- 36 WebP images, max 1600px, q80, 2.7 MB total; lazy-loaded below the hero.
- Scroll-linked animation runs in `requestAnimationFrame` using only `transform`/`opacity` (except the footer weight effect).
- Passive / rAF-throttled pointer handlers.
- ~33 KB CSS and ~34 KB JS, unminified and commented.

## Before going live

- [ ] Connect the contact form and newsletter to a backend (search `site.js` for `ponytail:`).
- [ ] Add Open Graph images and a sitemap.
- [ ] Pre-render case pages if SEO matters (currently rendered client-side from one template).
- [ ] Replace `#` social links.

## Credits

Layout and interaction patterns inspired by Antinomy, Parker, Motto, Rearc and Samuel Orea.
