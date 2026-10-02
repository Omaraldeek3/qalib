# Qalib · قالب: design

Written 2026-10-02. Omar asked for a library of website designs that he opens whenever he starts a new site. He answered four questions before going to sleep and asked for the build to run overnight:

- **How a site gets built:** library + prompt. Every design has a live demo and a detailed prompt that tells Claude Code how to build a site in that style. There is no in-browser editor and no zip export.
- **Publishing:** deploy to a subdomain of omardeek.tech; the GitHub repository stays private until he reviews it.
- **Name:** Qalib · قالب ("template", also "mould").
- **Site types:** all of them, varied: companies and services, restaurants and cafes, shops, personal sites and landing pages.

## What the product is

1. **Library.** 108 designs in 18 styles (6 each). The styles cover what he listed (classic, old/vintage, modern, animated, traditional, digital) and more: heritage, minimal, luxury, playful, editorial, brutalist, glass, retro, organic, art deco, hand-drawn, geometric, conventional corporate.
2. **Live demo per design**, in Arabic (RTL) and English (LTR). Each demo is a complete one-page website for a believable business, so a design is judged on real content and not on lorem ipsum.
3. **Prompt per design.** A brief form (project name, site type, languages, stack, description, notes) is saved in the browser and merged into the prompt of whichever design is open. The prompt describes the design precisely (tokens, typography, layout, every section, motion, decoration, RTL rules, accessibility) and points at the demo's raw HTML as a reference implementation. An option appends the full reference CSS.

## Architecture

```
src/catalog/      pure data: fonts, categories (styles), profiles (demo content), designs
src/demo/         demo engine: React components rendered to static HTML at build time
  css/base.css    shared layout for every section variant, driven by CSS variables
  css/kits/*.css  one stylesheet per style: the visual identity
  runtime.js      small inline script: reveal on scroll, counters, countdown, marquee, parallax, menu
src/prompt/       prompt builder (pure function, used by the design page)
src/app/          Next.js 16 app: /[locale], /[locale]/styles/[cat], /[locale]/d/[slug]
scripts/          build-demos (static HTML + fonts), images (download + webp), thumbs (Playwright)
public/demos/     generated: <slug>/ar.html, <slug>/en.html, <slug>/style.css
public/fonts/     generated: self-hosted fontsource files, Arabic + Latin subsets only
public/img/       committed: demo photos (Unsplash licence, via Lorem Picsum)
public/thumbs/    committed: cover and full-page screenshots per design and language
```

**One source of truth.** A design is data: style, demo profile, palette (8 colour roles), fonts (Latin and Arabic display and body), a variant for each section, motion level and decorations. The demo generator and the prompt builder read the same object, so the prompt always describes what the demo shows.

**Variety without 108 hand-written sites.** The markup is shared and semantic (`.hero--split`, `.items--menu`, `.sec__head`); `base.css` lays out every variant; each style's kit restyles everything (type, borders, shadows, image treatment, ornaments, motion). Within a style, designs differ in business, palette, fonts, hero variant, section variants and light/dark scheme.

**Demos are static HTML** with inline CSS and a small inline script, relative URLs for fonts and images. They load fast, work from `file://` for screenshots, and are the cleanest possible reference for Claude Code to read with `curl`.

**Fonts** come from fontsource packages and are copied at build time (only the Arabic, Latin and Latin-extended files of the weights in use). No third-party requests, in line with Sira.

**Arabic rules** baked into the base CSS: `letter-spacing: 0` and no `text-transform` on Arabic, logical properties throughout, mirrored arrows, slightly larger Arabic body size.

## Library app

- Home: hero with a fan of design cards, how it works (pick, describe, copy), the 18 styles as tiles each set in its own style's font and colours, and the full catalogue with filters (style, site type, light/dark, animated, search) and favourites.
- Style page: what defines the style, then its designs.
- Design page: preview in a frame (desktop, tablet, phone; Arabic or English; open full screen), the design's DNA (palette with hex, fonts, motion, decorations), the brief form and the generated prompt with copy, then neighbouring designs.
- Arabic and English UI at /ar and /en; `/` redirects by Accept-Language (Next 16 `proxy.ts`).
- Visual identity: a printer's specimen catalogue. Warm paper, ink, one vermilion accent, Reem Kufi and Bricolage Grotesque for display, Readex Pro for text, IBM Plex Mono for catalogue numbers and hex codes, crop marks around thumbnails. Light and dark.

## Quality bar and checks

- Unit tests (node:test): catalogue integrity (unique slugs, 6 designs per style, every font, image and icon resolves), prompt builder (tokens, brief, both languages).
- Generated demos: valid `lang`/`dir`, no missing assets.
- Playwright e2e: locale redirect, filters, design page preview and copy.
- Screenshots of the library and a sample of demos at desktop and phone width, reviewed before calling it done.
- `npm run lint`, `npm run typecheck`, `npm run build` clean.

## Out of scope

Editing content in the browser, exporting sites, accounts, a server. A later version could add more designs per style or let a design be previewed with another business's content.

## Update, later on 2026-10-02: the Interactive style and 12 designs per style

Omar liked the library and asked for more designs and a style whose sites react to the user, "like sites where the hero moves and changes as you scroll down with the mouse". A live prototype of eight interactions (an Artifact) went to him first; he approved all eight and chose 12 designs per style: 19 styles, 228 designs.

**The Interactive style (تفاعلي).** Twelve designs, each built on one signature interaction, two designs per hero:

| Interaction | Where | What it does |
| --- | --- | --- |
| zoom | hero | the stage holds while the photo grows from a framed card to full screen; the call to action appears at the end |
| layers | hero | photos and shapes float at different depths and follow the pointer |
| spotlight | hero | a dark hero; the pointer carries a light that reveals the colour photo and filled headline underneath; pressing widens it |
| trail | hero | moving the pointer drops photos that pop in and fade |
| tilt | hero | a phone or photo card leans toward the pointer with a moving glare and turns slightly with the scroll |
| curtain | hero | two panels carrying the brand name open like doors with the scroll, revealing the photo and headline |
| scrub | about | one statement held on screen, its words lighting up one by one with the scroll |
| rail | items | the vertical scroll slides a row of cards sideways, then the page continues |

**How it works.** One small engine in `runtime.js`, no libraries. Pinned sections (`[data-pin]`) are tall, with a sticky stage; a rAF scroll handler writes `--p` (0 to 1) on each, and CSS turns it into transforms, clip-paths and opacity. Pointer sections (`[data-mouse]`) get `--mx`/`--my` (-1 to 1, eased) and `--sx`/`--sy` (pixels); with no pointer for two seconds they drift on their own, so phones see the effect too. Pinning only happens with JavaScript and without `prefers-reduced-motion`; otherwise every section falls back to a still layout with all content visible. Layout of the new variants lives in `base.css` like every other variant; the style's identity lives in `kits/interactive.css`. The prompt gains an Interactions block that explains each mechanism precisely.

**More designs.** Every existing style gets six more designs (108 new), using demo businesses the style does not have yet where possible, new palette and font pairings, and different section variants, so a style reads as a family and not as recolours. Thumbnails for interactive designs are taken in their first frame (motion on); full-page thumbnails use the still fallback.
