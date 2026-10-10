# Subix canonical design system

## 1. Visual character

Subix is a quiet cinematic marketplace. The page should feel like an editorial product film: a nearly black canvas, a controlled field of light, oversized Persian display statements, small indexed labels, thin structural lines, and a single warm action color.

The design is intentionally not a generic dashboard, SaaS gradient template, or glass-heavy crypto interface.

### Use

- dark negative space
- large short statements
- numbered/indexed sections
- restrained product surfaces
- warm accent for active state and primary action
- one visual idea per viewport in the scroll story

### Avoid

- blue/cyan/purple gradient CTAs in canonical public pages
- multiple competing accent colors
- emoji as the primary product visual
- arbitrary shadows or card decorations
- dense dashboard layouts on marketing pages
- invented statistics, testimonials, discount percentages, trust badges, or urgency

## 2. Runtime token set

The canonical public tokens are defined in `frontend/styles/rive-redesign.css`. Use CSS variables rather than copying literal values.

### Dark theme

| Token | Value | Use |
|---|---|---|
| `--site-bg` | `#050505` | Page canvas and primary background |
| `--site-surface` | `#111111` | Cards, panels, modal surface |
| `--site-raised` | `#191919` | Selected controls, nested surfaces |
| `--site-ink` | `#f5f5f7` | Primary text and headings |
| `--site-muted` | `#b0b0b8` | Supporting text and metadata |
| `--site-accent` | `#f4d548` | Filled primary action and active controls |
| `--site-accent-text` | `#f4d548` | Links, labels, outlines, active text |
| `--site-line` | `#292929` | Borders, separators, progress tracks |
| `--site-header` | `rgba(5, 5, 5, .84)` | Fixed header surface |
| `--site-glow` | `rgba(244, 213, 72, .09)` | Soft decorative radial glow |
| `--site-display` | `Lalezar`, `Vazirmatn`, sans-serif | Display typography |
| `--site-body` | `Vazirmatn`, system-ui, sans-serif | Body and controls |
| `--site-radius` | `20px` | Primary visual panel/card radius |
| `--site-shadow` | `0 30px 80px rgba(0, 0, 0, .2)` | Restrained depth |
| `--site-gutter` | `clamp(20px, 4vw, 64px)` | Responsive horizontal inset |
| `--site-section-space` | `clamp(80px, 11vw, 160px)` | Major section vertical spacing |

### Light theme

The theme toggle can set `document.documentElement.dataset.theme = 'light'`.

| Token | Value |
|---|---|
| `--site-bg` | `#faf9f5` |
| `--site-surface` | `#ffffff` |
| `--site-raised` | `#efeee8` |
| `--site-ink` | `#171713` |
| `--site-muted` | `#57574e` |
| `--site-accent-text` | `#756000` |
| `--site-line` | `#d8d7ce` |
| `--site-header` | `rgba(250, 249, 245, .9)` |
| `--site-glow` | `rgba(210, 180, 46, .1)` |
| `--site-shadow` | `0 25px 70px rgba(35, 30, 12, .07)` |

New public components must remain legible in both themes. Do not hard-code dark-only text colors into a canonical component.

### Compatibility tokens that are not canonical

The repository also contains these older token families:

- `--electric`, `--violet`, `--hot`, and `--coral` in `globals.css`
- `--color-canvas`, `--color-surface`, `--color-accent`, and related v2 tokens in `globals.css`
- blue/white Apple-style values in `frontend/styles/apple-design-system.ts`
- Tailwind `primary` values in `frontend/tailwind.config.js`

They exist because login/account/legacy components still use them or because old styles must compile. Do not use them for a new canonical public component. If a legacy component is intentionally modernized, migrate it to `--site-*` tokens rather than adding another token family.

## 3. Typography

### Fonts

- `Lalezar`: display headlines and large editorial statements.
- `Vazirmatn`: body, controls, metadata, navigation, and Persian/Latin mixed content.
- Fonts are self-hosted from `frontend/public/fonts/` and registered in `frontend/styles/globals.css`.

### Type behavior

- Display headings are light-weight, large, short, and allowed to wrap intentionally.
- Body text is readable, muted, and line-height approximately `2` for Persian editorial copy.
- Use `text-wrap: balance` for display headings when supported.
- Use `dir="ltr"` for English product names, usernames, URLs, phone values, and machine-readable identifiers.
- Never use letter-spacing to force Persian text into a Latin rhythm. Letter spacing is reserved for Latin/system labels such as `SUBIX` and index marks.

### Canonical hierarchy

| Element | Typical implementation |
|---|---|
| Hero H1 | `clamp(52px, 7.5vw, 108px)`, Lalezar, line-height `1.28` |
| Section display H2 | `clamp(48px, 7.2vw, 100px)`, Lalezar, line-height `1.3` |
| Scroll beat H2 | `clamp(38px, 4.5vw, 64px)`, Lalezar, line-height `1.35` |
| Card title | 17px, Vazirmatn, weight 700, line-height about `1.8` |
| Body | 15–18px, Vazirmatn, line-height about `2` |
| Eyebrow/index | 12–13px, accent, short label |
| Metadata | 10–13px, muted |

## 4. Layout

### Containers

Use `.site-container` for canonical public content:

- `max-width: 1328px`
- `padding-inline: var(--site-gutter)`
- `margin-inline: auto`
- `width: 100%`

The scroll story uses a narrower content frame of approximately `1120px` for visual focus. Product detail inner content uses the wider `1328px` frame.

### Header offset

- Desktop header height: `76px`.
- Small-screen header height: `68px`.
- Anchor scrolling uses `scroll-padding-top: 96px`.
- Any route-local page content must leave room for the fixed header.

### Grid rules

- Catalog: 3 columns on wide screens, 2 around tablet, 1 on small screens.
- Article grid: 3 columns on wide screens, 2 around tablet, 1 on small screens.
- Support notes: 3 columns wide, 1 column below 700px.
- Product detail hero: 2 columns wide, 1 column below 768px.
- Keep `min-width: 0` on grid children to prevent mixed Persian/Latin overflow.

### Spacing rhythm

Use a 4px foundation. Prefer these common gaps:

- 8px: icon/label micro gap
- 12px: metadata and compact control gap
- 16px: card internal grouping
- 20–24px: card padding and primary grouping
- 32px: component separation
- 48–64px: page subsection separation
- 80–160px: major editorial section separation

## 5. Surfaces and borders

Canonical cards are quiet, flat, and structural:

```css
background: var(--site-surface);
border: 1px solid var(--site-line);
border-radius: var(--site-radius);
```

Use a radial `var(--site-glow)` only for a hero, visual composition, support card, or story visual. Glass blur is canonical for the fixed header; it is not a default requirement for every card.

## 6. Controls

### Primary button

Use `.site-button`:

- inline-flex
- minimum height `52px`
- horizontal padding around `28px`
- pill radius `99px`
- background `var(--site-accent)`
- foreground `#171713`
- weight 700
- hover lift approximately 2px
- active scale approximately `.98`

Primary labels describe the next real action. Examples:

- `مشاهده کاتالوگ اکانت‌ها`
- `باز کردن تلگرام`
- `بررسی مسیر دریافت` when the flow is only a preview

### Text link

Use `.text-link` for secondary navigation:

- accent color
- minimum height `44px`
- directional arrow as decorative text with `aria-hidden="true"`
- underline/border appears on hover

### Filter and scope buttons

- Minimum height `44px`.
- Pill shape.
- Idle: transparent or raised background, muted text, thin line.
- Selected: accent fill, dark foreground, `aria-pressed="true"`.
- Scope and category controls are separate groups.

### Inputs

- Dark surface background, thin line, full-width where practical.
- Search input height: `54px` on catalog.
- Always provide a visible or screen-reader label.
- Preserve visible focus ring.
- Use `type="search"` for catalog search and `type="tel"`/numeric input for authentication.

## 7. Focus, hover, and status

- Global focus: `3px` accent outline with approximately `5px` offset in the cinematic layer.
- Hover is a small change in border, color, or vertical lift. It must not be required to understand an action.
- Destructive/logout actions use a red status treatment only when relevant.
- Success, warning, error, and pending colors must represent actual states. Do not use green to imply a successful purchase in the demo flow.

## 8. Responsive behavior

### Wide desktop: 1280px and above

- Fixed header with full navigation.
- Large display typography.
- Two-column story/product layouts.
- Three-column catalog and guide grids.

### Tablet: 768–1279px

- Header may collapse navigation around the 1000px breakpoint.
- Story stacks around 800px.
- Catalog and guides use two columns where space allows.
- Reduce display size before reducing readability.

### Mobile: 375–767px

- Header is 68px high with menu toggle.
- One-column cards and stacked content.
- Horizontal filter wrapping or scroll where documented.
- Maintain 44px minimum interactive targets.
- Do not let English names, phone numbers, prices, or long Persian words create horizontal overflow.

### Smallest supported practical width: 375px

The experience must remain usable at 375px. Verify the homepage, catalog, product detail, blog, login, support, modal, and account empty state at this width.
