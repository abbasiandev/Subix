# Subix content and marketplace consistency plan

**Target:** Subix  
**Reference:** RiveDrive’s scroll pacing and visual discipline only  
**Audience assumption:** visitors primarily looking to buy AI accounts and AI-related subscriptions  
**Status:** UI/content consistency pass implemented; payment and fulfillment backend intentionally out of scope

> The complete reusable UI/UX source of truth is now in [`docs/UI_UX/README.md`](docs/UI_UX/README.md). This file remains the audit history, approved product-positioning decision, and correction record.

## Approved direction

- Subix sells **all kinds of AI accounts** and the public experience should make comparison and selection faster.
- The catalog remains able to expose the wider existing inventory, but the default scope is **AI accounts**. Related non-AI inventory is separated under “سایر سرویس‌های دیجیتال”.
- The blog is a decision-support surface: guides should help visitors understand use case, capabilities, term, price, and tradeoffs before opening a product.
- Payment, order creation, fulfillment, and activation backend work are explicitly skipped in this pass.
- Public support is Telegram-only.
- Duplicate legacy routes redirect to canonical pages.

## 1. Audit summary

The following audit was captured before the canonical UI/content pass. It explains why the implementation was unified and which backend limitations remain.

### Confirmed inventory facts

- Static product registry contains **80 products**.
- Categories currently contain:
  - AI: 16
  - Design: 19
  - Productivity: 26
  - Music: 10
  - Media: 6
  - Developer tools: 3
- All 80 products currently use the same duration string: `۱ ماه (قابل تمدید)`.
- Exactly 40 products have `hasDiscount: true`; 40 do not.
- The raw `category` field contains 16 products under `ai`; the explicit AI-first storefront classification in `AI_PRODUCT_IDS` currently contains 28 products, including AI tools stored under related categories.
- The canonical catalog defaults to those 28 AI-first products and exposes the remaining inventory under `سایر سرویس‌های دیجیتال`.
- The homepage and `/products` now use the static `frontend/data/products.ts` registry. The API model in `lib/api.ts` remains reserved for future normalized backend integration.
- The homepage displays the AI-first catalog scope by default and 8 homepage article cards.
- Product detail pages use the static registry and are reachable from homepage cards.
- Purchase UI currently opens correctly, but `PurchaseModal.handlePayment()` simulates success with a timeout rather than creating an order or redirecting to a payment gateway.
- The account page initializes `subscriptions` and `tickets` as empty arrays instead of loading them from the existing API functions.

## 2. Confirmed inconsistencies

### P0 — breaks trust or conversion

#### 2.1 Two product systems — resolved for the canonical UI

**Observed:**

- Homepage and product detail use `frontend/data/products.ts`.
- The historical `/products` implementation used `getProducts()` and `getCategories()` from `frontend/lib/api.ts`.
- The static and API product shapes are different: static products have English names, logos, slugs, features, specifications, discount data, and descriptions; API products only expose a smaller operational shape.
- `/products` can show zero products when the API is unavailable, while the homepage still shows 80 products.

**Resolution:** the canonical homepage and `/products` catalog now use the static `frontend/data/products.ts` registry. The API contract remains available for future backend integration and must be normalized before it is reintroduced into canonical catalog UI.

#### 2.2 Payment success is simulated — intentionally retained as demo UI

**Observed:**

- Product data and UI promise account delivery, activation, payment, and guarantees.
- The purchase modal displays Zarinpal and IDPay choices.
- Clicking payment waits two seconds and displays success without calling `createOrder()` or redirecting to a real gateway.

**Resolution:** payment backend is explicitly out of scope. The purchase modal now displays a clearly labeled preview/demo state and does not claim that an account was activated.

#### 2.3 Account state does not represent purchases — backend follow-up

**Observed:**

- `account.tsx` defines empty `subscriptions` and `tickets` arrays locally.
- `getOrders()` and user APIs exist but are not used by the dashboard flow.
- A successful purchase cannot reliably appear in the account page.

**Resolution for this pass:** account empty states are worded to avoid claiming a completed purchase. Connecting orders/subscriptions/tickets remains a separate backend feature and must follow the account state contract in `docs/UI_UX/PAGES_AND_ROUTES.md`.

#### 2.4 Contact route is not a public contact route — resolved

**Observed:**

- `/contact` uses `useRequireAuth()` and returns `null` when unauthenticated after loading.
- The home/footer language presents contact/support as a normal destination.
- The local audit showed only a loading state for the unauthenticated route.

**Resolution:** `/contact` is public and Telegram-only. Account-specific ticket history remains a future authenticated feature.

#### 2.5 Discount claims conflict with product data — editorial claims corrected

**Observed:**

- Leonardo AI is `hasDiscount: false` with `originalPrice: null` in the product registry.
- The legacy Leonardo blog post claims a “91% discount”, `$49/month`, and a specific Subix price.
- Product cards calculate discount presentation from structured data, while blog content hard-codes a separate offer.

**Resolution:** stale hard-coded price and discount claims were removed from the affected decision-guide content. Future prices and discounts must come from the product contract described in `docs/UI_UX/CONTENT_AND_DATA.md`.

### P1 — creates content and navigation confusion

#### 2.6 Product positioning is broader than the stated AI-account purpose

The raw registry category contains 16 `ai` products, while the explicit AI-first storefront classification currently contains 28 products across AI, developer, design, productivity, and music records. The current copy historically alternated between:

- AI accounts
- software licenses
- productivity tools
- music and streaming
- entertainment subscriptions
- digital account marketplace

**Correction decision:** Subix is positioned around all kinds of AI accounts. The default catalog scope is AI accounts, while the existing non-AI inventory remains available under an explicitly separate “سایر سرویس‌های دیجیتال” scope so it does not compete with the primary message.

#### 2.7 Category taxonomy is not unified

The static registry uses `ai`, `music`, `devTools`, `design`, `media`, and `productivity`. The home UI uses Persian labels; the API page renders backend category strings; blog categories use `guide`, `tutorial`, `news`, and `comparison`; the legacy blog uses `guides`, `tips`, `news`, and `comparison`.

**Correction:** define one user-facing taxonomy:

1. هوش مصنوعی و دستیارها
2. تولید تصویر و ویدیو
3. موسیقی و صدا
4. برنامه‌نویسی و ابزارهای توسعه
5. طراحی و تولید محتوا
6. بهره‌وری و آموزش
7. سرگرمی و سایر سرویس‌ها

Map every existing product and article into this taxonomy. Store the internal key separately from the display label.

#### 2.8 Multiple navigation shells — canonical public routes resolved

| Surface | Current shell |
|---|---|
| Homepage/detail/account | `NavigationBar`, RiveDrive-inspired dark shell, Subix footer |
| `/products` | `NavigationNew`, blue/cyan buttons, no shared footer |
| `/blog` | `DesktopContainer`, gradient orbs, no shared Subix header/footer |
| `/login-phone` | standalone `SUBIX` auth card, blue/cyan styling |
| `/contact` | Telegram Mini App layout, auth-gated, no shared shell |

**Resolution:** canonical public homepage, catalog, detail, blog, article, and contact pages use `NavigationBar` and `Footer`. Auth/account surfaces retain focused legacy markup where required, but new public features must use the canonical shell.

#### 2.9 Navigation labels and destinations differ — canonical routes resolved

- Homepage uses `راهنماها` pointing to `/#articles`.
- `NavigationNew` uses `بلاگ` pointing to `/blog`.
- Homepage exposes `/products` through its product section but does not make the dedicated page the canonical catalog route.
- Some footer legal routes are intentionally marked “به‌زودی” because `/privacy` and `/terms` do not exist.
- Account links vary between `/account`, `/dashboard`, and `/profile`.

**Resolution:** the canonical route map is documented in `docs/UI_UX/PAGES_AND_ROUTES.md`; duplicate legacy routes now redirect to canonical destinations.

Canonical route map:

```text
/                  Landing + featured AI catalog + guides
/products          Full searchable catalog
/products/[slug]   Product detail and purchase entry
/blog              Guides and editorial content
/blog/[slug]       Article detail
/login-phone       Phone authentication
/account           Authenticated orders, subscriptions, support
/contact           Public support entry point
```

Legacy routes remain as compatibility redirect surfaces and must not receive new feature work.

#### 2.10 Guide content does not consistently support the buying decision

Some articles directly explain products such as ChatGPT, Leonardo, Suno, Captions, and Canva. Others focus on broad comparisons or unrelated language/streaming tools. Legacy content also contains product price and discount claims that can become stale.

**Correction:** every guide should have a clear relationship to the marketplace:

- What the tool does
- Who it is for
- Which plan/account is being sold
- Important limitations
- Current product link
- Current price/term pulled from the product record
- Last-reviewed date

Articles without a current product relationship should be labeled editorial content or removed from the buying guides filter.

### P2 — visual and layout inconsistencies

#### 2.11 Color and control language changes by route

- Homepage: black, gold, editorial cards.
- `/products`: blue/cyan gradient controls.
- `/blog`: teal buttons, light/glass card assumptions, emoji-led categories.
- Auth: blue/cyan gradient CTA.
- Contact: cyan/blue/purple glass cards.

**Correction:** use the shared Subix token layer everywhere:

- dark canvas
- raised dark surface
- one gold/amber primary action
- muted gray supporting text
- one error/status red
- shared borders, radii, focus ring, and button sizes

#### 2.12 Card anatomy changes between catalog surfaces

Homepage cards include brand logo, category, discount, English name, Persian title, description, duration, price, activation status, and action. `/products` uses `ProductCardNew` and API data with a different set of fields. Blog cards use a separate glass-card anatomy.

**Correction:** define reusable card variants:

- `ProductCard`: compact catalog card
- `ProductDetailSummary`: full purchase summary
- `GuideCard`: editorial guide card
- `OrderCard`: account state card

Each variant must use the same label, spacing, price, metadata, and action conventions.

#### 2.13 Pricing and duration display are duplicated

- Product registry duration: `۱ ماه (قابل تمدید)`.
- Product specifications: `۳۰ روزه (امکان تمدید دوره‌ای)`.
- Product card, detail page, blog content, and backend model each have different ways to describe term and activation.

**Correction:** render a normalized pricing block everywhere:

```text
قیمت فعلی
مدت: ۳۰ روز
تمدید: قابل تمدید / غیرقابل تمدید / نامشخص
فعال‌سازی: [actual minutes or verified copy]
```

Do not hard-code “instant”, “24/7”, refund, guarantee, or support claims unless the source data contains them.

#### 2.14 Brand and imagery treatment changes

- Homepage uses an `S.` wordmark treatment.
- `/products` uses the `SUBIX` Logo component.
- Blog uses emoji visual placeholders and legacy image treatment.
- Product cards use brand logos with empty alt text.

**Correction:** use one Subix wordmark component, preserve actual third-party brand logos as decorative only when the product title already provides the accessible name, and give every meaningful article/product image an accurate alt strategy.

## 3. Content correction model

Before editing copy, create a content contract for every product:

| Field | Required rule |
|---|---|
| Product name | Persian display name plus verified English name |
| Category | One canonical internal category and one Persian label |
| Product type | AI assistant, image, video, audio, developer, design, productivity, entertainment, or other |
| Access type | Dedicated/shared/license; never imply dedicated if unknown |
| Platform | Web, Windows, macOS, iOS, Android, or unknown |
| Duration | Numeric days plus display label |
| Renewal | Boolean/unknown plus display copy |
| Current price | One numeric source and currency |
| Original price | Optional; required for discount display |
| Discount | Derived, never manually typed |
| Activation | Verified time range or “زمان فعال‌سازی را بررسی کنید” |
| Included features | 3–6 factual bullets |
| Support/guarantee | Only when operationally verified |
| Purchase route | One real action: order API, payment gateway, or contact |
| Last reviewed | Required for claims that can change |

## 4. Prioritized implementation plan

### Phase A — source of truth and positioning

1. Decide whether non-AI inventory remains visible as secondary digital subscriptions.
2. Normalize the static and API product models into one shared type.
3. Add canonical category mappings and product metadata fields.
4. Remove hard-coded discount, price, activation, guarantee, and support claims from articles and components.

**Definition of done:** homepage, `/products`, product detail, purchase modal, blog references, and account order cards all read the same product fields.

### Phase B — marketplace flow

1. Make `/products` use the same canonical product data as the homepage.
2. Add explicit API loading, unavailable, and error states instead of showing “0 products” for a failed request.
3. Make product card → detail → auth → order → payment → activation a single stateful flow.
4. Replace simulated payment success with the real order/payment integration, or clearly label the entire flow as demo-only until integration exists.
5. Connect `/account` to real orders, subscriptions, and tickets.
6. Make contact/support public and keep authenticated ticket history private.

**Definition of done:** a user can understand what they are buying, see the exact term/price/access type, complete or clearly fail a purchase, and see the resulting order state in the account.

### Phase C — one shell and one content system

1. Replace `NavigationNew` with the shared `NavigationBar` or a single unified component.
2. Bring `/products`, `/blog`, `/login-phone`, `/contact`, and `/account` into consistent shell rules.
3. Define canonical nav labels and route destinations.
4. Normalize page headings, section labels, CTA language, card anatomy, and empty states.
5. Add public legal/contact routes only when real content exists; otherwise keep the links visibly marked as unavailable.

**Definition of done:** every public page has a predictable header, footer, logo, typography, main landmark, skip-link target, primary CTA, and mobile behavior.

### Phase D — AI-account content hierarchy

1. Reframe homepage hero and first scroll chapters around buying AI tools.
2. Put AI categories and AI products first in the catalog.
3. Move non-AI categories into an explicit secondary section if retained.
4. Reclassify guides using the canonical category taxonomy.
5. Add a product link and current factual buying summary to every commercial guide.
6. Remove stale, duplicated, or unsupported price/discount claims.

**Definition of done:** a visitor can understand within the first screen that Subix sells AI accounts, find an AI category, compare AI products, read a relevant guide, and purchase without encountering unrelated or contradictory positioning.

### Phase E — responsive and accessibility consistency

1. Test all cards, filter chips, product details, auth forms, modals, and empty states at 375px, 768px, and 1280px.
2. Add semantic labels and pressed/expanded states to filters, menus, accordions, and payment choices.
3. Ensure every page has one H1, one main landmark, a valid skip-link target, and a useful document title.
4. Verify Persian/Latin mixed text direction in product names, prices, email addresses, slugs, and payment values.
5. Keep all content readable with JavaScript disabled and `prefers-reduced-motion` enabled.

**Definition of done:** axe reports zero violations on home, catalog, product detail, blog, login, contact, and account states; keyboard traversal reaches every purchase/control action.

### Phase F — performance and release verification

1. Run a production Lighthouse test against the actual `/Subix` deployment path, not the dev server.
2. Lazy-load below-fold product/article imagery and the WebGL/scroll visuals.
3. Measure CLS, LCP, and long-task impact from 80 cards and the pinned scroll story.
4. Verify static export asset paths under `/Subix`.
5. Run link checks for every catalog, article, auth, support, account, and footer destination.

**Definition of done:** production preview is reachable at the deployment base path, no critical route returns 404, product/catalog data is available, and Lighthouse results are recorded honestly.

## 5. Recommended implementation order

1. Canonical product data and category contract
2. Fix `/products` data availability and error states
3. Fix purchase/order/account truthfulness
4. Make contact/support public
5. Unify header/footer/page shells
6. Correct AI-first content hierarchy and stale claims
7. Normalize cards, pricing, durations, and CTAs
8. Complete accessibility and responsive corrections
9. Run production-path performance and link verification

## 6. Decisions needed before implementation

1. Confirm the manually maintained AI product classification as new products are added.
2. Connect payment/order/fulfillment backend in a separate implementation pass.
3. Confirm the Telegram support username and public response expectations.
