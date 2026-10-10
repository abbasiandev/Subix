# Subix UI/UX documentation

This directory is the agent-facing source of truth for the Subix interface. Read it before adding a page, component, interaction, animation, or content surface.

## Product and experience definition

Subix is an RTL Persian marketplace and decision-support experience for AI accounts. The interface helps people compare tools by use case, capabilities, duration, price, and product details before they continue through the purchase path.

The visual direction is inspired by RiveDrive’s editorial pacing and cinematic scroll composition. RiveDrive is a reference for composition and rhythm only. Do not copy its brand, text, assets, layout markup, or visual identity.

## Canonical design principles

1. **One cinematic system:** dark canvas, restrained surfaces, thin borders, one warm primary signal, editorial typography, and generous space.
2. **Decision before conversion:** explain what a tool is and who it is for before asking the visitor to continue.
3. **AI first:** AI accounts are the default catalog scope. Other digital services may remain available, but must be visibly secondary.
4. **Truthful states:** never display payment success, activation, delivery, availability, discount, guarantee, or support promises that are not backed by current data or an operational integration.
5. **Progressive enhancement:** content and essential links work without WebGL, JavaScript animation, or high-power hardware.
6. **Persian-first RTL:** the document is Persian and RTL; Latin product names, URLs, phone numbers, prices, and technical identifiers use explicit direction where needed.
7. **Quiet hierarchy:** use scale, whitespace, position, and the accent color to establish hierarchy. Avoid gradients, shadows, badges, and animation competing with the primary action.

## Reading order for agents

1. [`AGENT_IMPLEMENTATION.md`](./AGENT_IMPLEMENTATION.md) — how to use this documentation and decide where code belongs.
2. [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — tokens, layout, typography, controls, surfaces, and responsive rules.
3. [`COMPONENTS.md`](./COMPONENTS.md) — reusable component contracts and anatomy.
4. [`PAGES_AND_ROUTES.md`](./PAGES_AND_ROUTES.md) — canonical page shells, route behavior, and states.
5. [`MOTION_AND_WEBGL.md`](./MOTION_AND_WEBGL.md) — cinematic motion, scroll story, WebGL lifecycle, and fallbacks.
6. [`CONTENT_AND_DATA.md`](./CONTENT_AND_DATA.md) — product, guide, pricing, claim, and copy rules.
7. [`ACCESSIBILITY_RTL.md`](./ACCESSIBILITY_RTL.md) — semantic, keyboard, RTL, responsive, and reduced-motion requirements.

## Source precedence

When documentation and code differ, use this order:

1. A user-approved requirement in the current task.
2. The canonical rules in this directory.
3. The current canonical components and styles listed below.
4. Existing route-local styles only when the page is explicitly documented as a legacy exception.

Do not copy a legacy route’s colors, gradients, shell, or component structure into a new feature.

## Canonical source files

| Concern | Source |
|---|---|
| Global app shell and skip link | `frontend/pages/_app.tsx` |
| RTL document and theme bootstrap | `frontend/pages/_document.tsx` |
| Canonical runtime tokens and public route CSS | `frontend/styles/rive-redesign.css` |
| Global font loading and compatibility overrides | `frontend/styles/globals.css` |
| Header | `frontend/components/Layout/NavigationBar.tsx` |
| Footer | `frontend/components/Layout/Footer.tsx` |
| Homepage | `frontend/pages/index.tsx` |
| Hero/WebGL fallback | `frontend/components/WebGLHero.tsx` |
| Scroll story | `frontend/components/ScrollStory.tsx` |
| Catalog filtering | `frontend/components/Products/Catalog.tsx` |
| Product card | `frontend/components/Products/Product3DCard.tsx` |
| Product registry and AI scope | `frontend/data/products.ts` |
| Product detail | `frontend/pages/products/[slug].tsx` |
| Purchase preview | `frontend/components/Purchase/PurchaseModal.tsx` |
| Blog index | `frontend/pages/blog.tsx` |
| Blog article | `frontend/pages/blog/[slug].tsx` |
| Public support | `frontend/pages/contact.tsx` |
| Phone authentication | `frontend/pages/login-phone.tsx` and `frontend/components/Auth/PhoneAuth.tsx` |
| Auth state | `frontend/context/AuthContext.tsx` |
| API contract | `frontend/lib/api.ts` |
| Asset path handling | `frontend/lib/assets.ts` |

## Current implementation status

- The public cinematic shell, homepage story, catalog, product details, blog, and public Telegram support are implemented.
- The catalog uses the local static product registry and defaults to the AI scope.
- Payment/order/fulfillment backend integration is intentionally out of scope. The purchase modal must remain visibly demo-only until that integration exists.
- Account subscription and ticket arrays are currently empty local placeholders. Document or implement new account states without implying that these placeholders are real order data.
- `/dashboard`, `/profile`, `/login`, `/tickets`, and named backup routes are redirect surfaces. New features belong on canonical routes.
- `frontend/styles/apple-design-system.ts`, Tailwind tokens, old glass components, and route-local blue/cyan styling remain in the repository for compatibility. They are not the preferred source for new public cinematic features.

## Documentation maintenance

Update the relevant document when a feature changes:

- New token or breakpoint: `DESIGN_SYSTEM.md`.
- New shared component: `COMPONENTS.md`.
- New route or state: `PAGES_AND_ROUTES.md`.
- New animation or WebGL behavior: `MOTION_AND_WEBGL.md`.
- New product/guide field or claim rule: `CONTENT_AND_DATA.md`.
- New interaction, keyboard rule, or RTL exception: `ACCESSIBILITY_RTL.md`.
- New agent workflow or verification command: `AGENT_IMPLEMENTATION.md`.
