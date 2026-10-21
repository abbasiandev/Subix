# Fluxo UI/UX audit

Audit date: 2026-10-05  
Reference: `https://fluxo.ir/` and the static export served locally from `frontend/out`.

## Findings and resolution

| Area | Finding | Resolution | Status |
| --- | --- | --- | --- |
| Hosting paths | Raw anchor links used `/` and `/#...`, which can leave a deployment base path. | Navigation anchors now use the shared `asset()` helper and work from the root of `fluxo.ir`. | Resolved |
| Responsive layout | Hero and grid sizing needed explicit constraints at 1440px, 768px, and 375px; article cards could request a minimum wider than a narrow viewport. | Added fluid type, bounded content columns, `min(100%, ...)` grid tracks, and mobile spacing rules. | Resolved |
| Navigation | Mobile menu had no expanded state, no controlled target, and no accessible navigation landmark label. | Added `aria-label`, `aria-expanded`, `aria-controls`, keyboard-visible focus styles, and a 44px touch target. | Resolved |
| Navigation | Viewport metadata disabled pinch zoom (`user-scalable=no`). | Removed zoom restriction. | Resolved |
| Theme | Only the dark presentation was available. | Added a persisted dark/light theme control and tokenized theme colors. | Resolved |
| Contrast | Muted text and legacy light-theme surfaces were inconsistent with the dark visual system. | Added stronger muted text colors, light-theme overrides, and AA-oriented body text tokens. | Resolved |
| Focus | Links, filters, buttons, and the skip path did not share a clear focus treatment. | Added global `:focus-visible` rings, link focus treatment, and a visible skip link. | Resolved |
| Interaction | Sections appeared immediately with no scroll-based reveal or reduced-motion override. | Added `IntersectionObserver` reveals and a reduced-motion rule that removes transitions. | Resolved |
| WebGL performance | The product grid created a Three.js canvas per card, making the page unnecessarily heavy and producing a Three.js `Clock` warning. | Product cards now use lazy-loaded brand SVGs and CSS orbital treatment; the single hero owns the 3D scene. | Resolved |
| WebGL fallback | The hero had no explicit WebGL/device fallback. | Added a static gradient fallback, WebGL capability detection, and low-power/data-saver detection. | Resolved |
| WebGL lifecycle | The hero rendered continuously regardless of tab visibility or viewport intersection. | Rendering now pauses for hidden tabs and offscreen hero content; resize is capped at pixel ratio 2. | Resolved |
| WebGL motion | Camera movement and particles did not respond to reduced-motion preferences or page scroll. | Added reduced-motion scaling, pointer parallax, scroll-linked rotation, and mouse-reactive particles. | Resolved |
| WebGL visuals | Existing geometry used stock materials without custom shader depth. | Added GLSL fresnel, soft gradient, animated-noise shell shading, and a particle shader. | Resolved |
| Accessibility | The page lacked a skip link and the decorative WebGL canvas was not explicitly hidden from assistive technology. | Added the skip link and `aria-hidden` decorative scene treatment; product logos are decorative because headings carry the names. | Resolved |
| Asset errors | The document referenced `/favicon.svg`, but the asset did not exist, producing a 404 in the browser console. | Added a lightweight SVG favicon. | Resolved |
| Motion safety | Existing hover and scanline effects had no complete reduced-motion coverage. | Disabled scanlines and transitions where appropriate under `prefers-reduced-motion`. | Resolved |

## Verification notes

- Local checks were run at 1440px, 768px, and 375px viewport widths.
- `npx tsc --noEmit`, `npm run build`, and `git diff --check` pass.
- Chrome console verification after the fixes reports no Three.js warning and no missing favicon request. Lighthouse was not available in the repository environment during this audit; the final quality section records that limitation.
