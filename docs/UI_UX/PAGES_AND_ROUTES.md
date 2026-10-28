# Fluxo pages, routes, and state contracts

## 1. Canonical route map

| Route | Purpose | Shell | Auth |
|---|---|---|---|
| `/` | Cinematic landing, scroll story, featured catalog, guides | `NavigationBar` + `Footer` | Public |
| `/products` | Full searchable catalog | `NavigationBar` + `Footer` | Public |
| `/products/[slug]` | Product detail and purchase preview entry | `NavigationBar` + `Footer` | Public; auth inside preview if needed |
| `/blog` | AI decision guides and comparisons | `NavigationBar` + `Footer` | Public |
| `/blog/[slug]` | Guide detail | `NavigationBar` + `Footer` | Public |
| `/contact` | Public Telegram support | `NavigationBar` + `Footer` | Public |
| `/login-phone` | Phone number and OTP authentication | Focused auth surface | Public |
| `/account` | Authenticated account state | `NavigationBar` + `Footer` | Required |

## 2. Legacy redirects

These are compatibility surfaces, not feature destinations:

| Legacy route | Destination |
|---|---|
| `/dashboard` | `/account` |
| `/dashboard-new` | `/account` |
| `/profile` | `/account` |
| `/login` | `/login-phone` |
| `/tickets` | `/contact` |
| `/product-detail-new` | `/products` |
| `/index-new` | `/` |
| `/index-old-backup` | `/` |
| `/products-old-backup` | `/products` |

If a legacy URL is encountered in a new task, preserve the redirect unless the user explicitly requests migration behavior.

## 3. Route shell rules

### Public marketplace shell

Use:

```tsx
<div className="rive-page" dir="rtl">
  <NavigationBar />
  <main id="main-content" tabIndex={-1}>...</main>
  <Footer />
</div>
```

Homepage uses `.rive-home` because it owns the hero and scroll story. It still uses the same header/footer.

### Auth shell

`/login-phone` is a focused form surface. It currently uses a dark gradient, Logo component, centered card, blue/cyan legacy CTA, and Framer Motion entry. When modernizing it, retain the authentication interaction contract but migrate colors and controls to canonical site tokens unless backward compatibility requires otherwise.

### Account shell

`/account` uses `NavigationBar`, a protected state gate, dashboard cards, tabs, and `Footer`. Its current local `subscriptions` and `tickets` arrays are empty placeholders. New features must represent loading, error, empty, pending, active, expired, answered, and closed states distinctly.

## 4. Page specifications

### Home

Order:

1. `WebGLHero`
2. Editorial introduction
3. `ScrollStory`
4. Catalog section with id `products`
5. Guides section with id `articles`
6. Closing CTA
7. Footer

Requirements:

- one H1 in the hero
- the hero's `شروع مسیر انتخاب` CTA links to the beginning of the selection
  story (`#selection-flow`), while catalog links use `#products` or `/products`
- the homepage navigation uses these scroll sections for active location state:
  `home`, `products`, `articles`, and `support`
- all content remains readable when animations are unavailable
- the story is a progressive enhancement, not the only way to access products

### Catalog

Order:

1. Page hero: `۰۱ · کاتالوگ فلوکسو`
2. H1 and short decision-support description
3. Search and result status
4. AI/non-AI scope controls
5. Category controls
6. Product grid or empty state
7. Footer

### Product detail

Required states:

- valid product
- static fallback generation
- router fallback loading
- purchase modal closed
- purchase modal auth
- purchase modal preview
- purchase modal demo-not-connected

Never add a fake success state to make the page feel complete.

### Blog index

Order:

1. Page H1 and decision-support description
2. Search field
3. Category filters
4. Guide grid
5. Empty search result
6. Telegram support CTA
7. Footer

### Blog article

Order:

1. Back link
2. Category badge
3. H1
4. Author/date/read-time metadata
5. Tags
6. Article body
7. Share controls, if functional
8. Related guides
9. Footer

If share buttons do not perform a real share action, they must be labeled or implemented as real controls before being presented as functionality.

### Contact

Public support page. Do not add `useRequireAuth` to the public support entry point. Account-specific support history may remain protected elsewhere.

### Login

#### Phone state

- phone label and input
- Persian phone validation
- disabled/loading submit
- error message
- terms link only when `/terms` exists; currently legal route is unavailable and should not be silently represented as a working page

#### OTP state

- editable phone link
- five numeric inputs
- paste support
- auto-advance
- backspace navigation
- auto-submit on five digits
- countdown
- resend action
- validation error
- loading state

### Account

#### Unauthenticated

- explain why login is needed
- show embedded `PhoneAuth`
- link or CTA to browse the catalog

#### Authenticated

- user identity header
- logout action
- home link
- subscription tab with count
- ticket tab with open count
- empty or populated content

## 5. Metadata and SEO

Every canonical page must have:

- one useful title
- one page-specific description
- one H1
- a canonical URL rooted at `https://fluxo.ir/`
- meaningful Open Graph values where relevant

Do not let `_app.tsx` generic metadata override a page-specific title/description unintentionally.
