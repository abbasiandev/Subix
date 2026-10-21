# Fluxo redesign — historical implementation plan

> **Canonical UI/UX documentation:** read [`docs/UI_UX/README.md`](docs/UI_UX/README.md) and the documents in `docs/UI_UX/` before implementing any new feature. This file records the original redesign direction and acceptance notes; it is not the current component contract.

## Goal and reference analysis

Reference: https://rivedrive.com/ (visually inspected in Chrome on 2026-10-05).

RiveDrive's defining characteristics are a black canvas, a fixed slim header, a cinematic full-viewport hero, oversized centered white/yellow headlines, and generous space between editorial sections. Small yellow labels establish hierarchy. Features are introduced through large statements and product demonstrations; the footer becomes quieter and denser.

Fluxo will adopt that composition in Persian/RTL, with its own content and an original WebGL backdrop. The headline and shopping flow should be the dominant elements.

## Information architecture

1. **Header:** Fluxo wordmark, home/products/guides/about links, account access, theme control, accessible mobile menu.
2. **Hero:** two-line headline using existing account/license copy, short description, catalog CTA, static/3D warm-gold visual, bottom scroll cue.
3. **Introduction:** centered editorial statement connecting AI, design, development, music, and streaming.
4. **Feature story 01:** AI tools, existing logo composition, links to corresponding products.
5. **Feature story 02:** creative/productivity tools, offset visual composition and concise explanatory text.
6. **Catalog:** retain all 80 offers and every product description, price, duration, discount, and detail link. Add a labeled search input, Persian category filters, result count, and empty state. Use compact static cards instead of a canvas per product.
7. **Guides:** keep existing articles and filters; use semantic cards with clear titles and dates.
8. **Closing CTA:** large white/yellow statement and link to the catalog.
9. **Footer:** retain about copy, quick links, contact, social links, payment information, trust artwork, and copyright. Identify unavailable routes/merchant credentials explicitly in the audit rather than inventing policy or merchant data.

## Design system

| Token group | Direction |
| --- | --- |
| Dark palette | Canvas `#050505`, surface `#111111`, raised `#191919`, text `#f5f5f7`, muted `#b0b0b8`, accent `#f4d548` |
| Light palette | Canvas `#faf9f5`, surface `#ffffff`, text `#171713`, muted `#57574e`, accent with darker foreground/outline values |
| Type | Self-hosted Lalezar display font and Vazirmatn variable body font; swap loading; fluid sizes |
| Layout | 1200px content maximum; fluid gutters; narrow readable paragraphs; centered editorial titles |
| Spacing | 4px foundation; 80–160px major section spacing; consistent 16/24/32px component gaps |
| Radius | Pill controls, 16–24px visual panels/cards, minimal decorative frames |
| Depth | Restrained shadows; glass only in header; warm soft glow on visual demonstrations |
| States | High-contrast focus outline, subtle hover lift, short press feedback, stateful filter buttons |

## WebGL composition and lifecycle

- Original layered floating geometry with gold/ivory shader gradients, fresnel edges, and subtle noise.
- Sparse mouse-reactive particles and smooth camera parallax, scroll-linked scene rotation/scale.
- Text and gradient render first. Three.js imports after idle and capability checks.
- Low-power/data-saver devices and `NEXT_PUBLIC_DISABLE_WEBGL=1` use the fallback.
- Pixel ratio capped at 2. No bloom without a verified 50+fps budget.
- Rendering stops on hidden tabs or offscreen canvas. Resume without time jumps.
- Reduced motion produces a static frame and disables reveal/hover movement.
- Clean teardown for observers, listeners, RAF, geometries, materials, renderer, and any textures.
- Next default async chunk splitting keeps unrelated React Three Fiber code out of the initial hero chunk.

## Responsive specification

- **1440px:** centered large hero; two-column feature stories; three-column catalog; three-column guides/footer.
- **768px:** compact header/mobile menu; stacked stories; two-column catalog; two-column guides.
- **375px:** single-column cards, wrapped filters, minimum 44px touch targets, headline scales within gutters.
- No horizontal scrolling or clipped copy. Fixed header leaves room for anchor targets and keyboard focus.

## Accessibility and progressive enhancement

- `lang="fa"`, `dir="rtl"`, semantic main/nav/sections/footer, one h1, skip link.
- Native links and buttons; menu closes with Escape, closed menu cannot receive focus, route links work from the root of `fluxo.ir`.
- Filter/search labels, pressed states, result announcements, decorative SVG/canvas hidden from AT.
- Body text contrast ≥4.5:1 in both themes; focus remains visible on dark/yellow/white backgrounds.
- Content stays visible without reveal JavaScript. System reduced-motion disables animation.
- Static logos are SVG assets; raster imagery only uses WebP/AVIF if introduced; no reference assets copied.

## Implementation order

1. Save this plan before implementing the revised direction.
2. Rebuild header/footer and homepage editorial structure.
3. Apply scoped reference-led CSS and theme tokens.
4. Rework hero shading, fallbacks, lifecycle, and reveal behavior.
5. Implement catalog search/filter and fix product/detail/asset paths.
6. Inspect Chrome screenshots at 1440/768/375 in both themes; test touch/menu/keyboard/reduced motion/WebGL fallback.
7. Build the static export and run axe, console checks, and production Lighthouse mobile.
8. Update audit/README and commit verified work. Remain on `feature/webgl-3d-redesign`; no push or hosting changes.

## Acceptance and reporting

Lighthouse mobile targets: Performance 85+, Accessibility 95+, Best Practices 95+, CLS <0.1. Report actual measured values, distinguish local production measurements from deployed baseline, and explain any remaining gaps. Browser download failures or unavailable Safari automation must be recorded accurately. All 80 products and existing article content remain available.
