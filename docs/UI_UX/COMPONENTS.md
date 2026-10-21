# Fluxo component contracts

This document defines what each canonical component means, what it must contain, and how a new feature should compose it.

## 1. App shell

### `NavigationBar`

Source: `frontend/components/Layout/NavigationBar.tsx`

#### Responsibilities

- Fixed public header.
- Fluxo wordmark link to `/`.
- Canonical navigation links:
  - `خانه` → `/`
  - `کاتالوگ اکانت‌ها` → `/products`
  - `راهنمای انتخاب` → `/blog`
  - `پشتیبانی تلگرام` → `/contact`
- Auth action:
  - authenticated → `/account`, label `حساب کاربری`
  - unauthenticated → `/login-phone`, label `ورود / عضویت`
- Theme toggle.
- Responsive mobile menu.

#### Interaction contract

- Mobile menu uses a native button with `aria-expanded` and `aria-controls`.
- Escape closes the menu and returns focus to the toggle.
- Route changes close the menu.
- Closed menu is `hidden` and cannot receive focus.
- Theme preference is saved as `fluxo-theme` in local storage.

#### Visual contract

- Use `.site-header`, `.site-nav`, `.site-wordmark`, `.site-nav-links`, `.site-nav-actions`.
- Do not replace it with `NavigationNew` for new public pages.

### `Footer`

Source: `frontend/components/Layout/Footer.tsx`

#### Responsibilities

- About/positioning statement.
- Canonical route links.
- Telegram-only public support link from `SUPPORT_URL`.
- Legal links remain visibly unavailable until real pages exist.
- Copyright and concise positioning line.

#### Content rule

Do not add email, Instagram, payment gateways, trust badges, 24/7 claims, legal claims, or fulfillment promises unless the product owner and operational source support them.

## 2. Homepage components

### `WebGLHero`

Source: `frontend/components/WebGLHero.tsx`

#### Required composition

1. `flash-hero` section with one H1.
2. Decorative grid and fallback layer.
3. Lazy WebGL orbital scene when supported.
4. Short kicker, editorial H1, description, and catalog anchor CTA.
5. Decorative status labels hidden from assistive technology.
6. Screen-reader description of whether WebGL is active or fallback is used.

#### Copy rule

The current implementation contains older hero copy in `WebGLHero.tsx`, while `index.tsx` and metadata use the approved AI decision-support positioning. New work must use the approved positioning and update the hero source before reusing it:

> Help visitors compare and choose AI accounts for text, image, video, audio, and development.

Never describe a visual status label such as `LIVE / 02:37:11` as a real operational status.

### `ScrollStory`

Source: `frontend/components/ScrollStory.tsx`

The current story has three chapters and three beats per chapter:

1. `۰۱ · متن و تحقیق`
2. `۰۲ · تصویر و ویدیو`
3. `۰۳ · کدنویسی و ساخت`

Each beat contains:

- short title
- decision-support paragraph
- one related product link
- two product nodes in the visual composition

The visual is decorative except for product links. Use `aria-hidden` for grid, route, core, and fact decoration. Preserve a no-JS fallback where every beat remains readable.

### `Catalog`

Source: `frontend/components/Products/Catalog.tsx`

#### State

- `scope`: `'ai' | 'other'`, defaults to `'ai'`.
- `category`: `'all'` or a product category, resets to `all` when scope changes.
- `query`: local search string.

#### Anatomy

1. Search field with `catalog-search`.
2. Live result count with `role="status"`.
3. Scope button group:
   - `اکانت‌های هوش مصنوعی`
   - `سایر سرویس‌های دیجیتال`
4. Category button group with `aria-pressed`.
5. Product card grid.
6. Empty state with reset action.

#### New filter rules

- Add filters as independent state with explicit pressed state.
- Reset dependent filters when their parent scope changes.
- Search Persian and English product name and description fields.
- Do not call the unavailable API for this canonical static catalog surface.
- If a future backend source replaces the static registry, normalize it into the same `Product` contract before rendering.

### `Product3DCard`

Source: `frontend/components/Products/Product3DCard.tsx`

#### Card anatomy

1. Brand logo in a white contained square.
2. Persian category label.
3. Optional structured discount marker.
4. English product name with `dir="ltr"`.
5. Persian product title.
6. Short factual description.
7. Duration and price.
8. `مشاهده مشخصات` metadata.
9. `بررسی و انتخاب` detail link.

The entire card is a link to `/products/[slug]`. Do not nest a second interactive button inside the linked card unless the card is structurally changed to avoid invalid interactive nesting.

## 3. Product detail components

### Product detail page

Source: `frontend/pages/products/[slug].tsx`

Required order:

1. Fixed canonical header.
2. Back-to-catalog control.
3. Product logo and optional structured discount.
4. Category label.
5. One H1 containing the Persian product title.
6. Product description.
7. Pricing block.
8. Primary `بررسی مسیر دریافت` button.
9. Trust/decision indicators that state only verified facts.
10. Features section.
11. Four-step current flow explanation.
12. Footer.

The current payment button opens the preview modal. It does not claim that payment or activation completed.

### Pricing block

Show:

- current price in Persian digits where appropriate
- currency `تومان`
- duration
- original price only when `hasDiscount === true` and `originalPrice` exists
- derived discount percentage only from numeric source data

Do not manually type a discount percentage in article copy or UI.

### `PurchaseModal`

Source: `frontend/components/Purchase/PurchaseModal.tsx`

Current states:

- `auth`: phone auth for a guest.
- `payment`: visual preview of the future gateway step.
- `demo`: explicit message that backend payment and activation are not connected.

Required behavior:

- Close button always available in the current demo.
- Overlay click closes the modal.
- Product name and price are visible in the header.
- Gateway options are presentation-only until backend integration exists.
- Never render a success icon or “purchase successful” state in the demo.

When backend is added, replace the `demo` state with real order/payment states and update this documentation before implementation.

## 4. Editorial components

### `ArticleGrid`

Source: `frontend/components/Articles/ArticleGrid.tsx`

- Uses the local `articles` dataset for the homepage guide section.
- Filter categories: all, guide, tutorial, news, comparison.
- Filter buttons require `aria-pressed`.
- Empty state must explain that no article exists in the selected category.
- Cards link to `/blog/[slug]`.

### Blog index cards

Source: `frontend/pages/blog.tsx`

The blog index merges `blogPosts` and `articles`, removes duplicate slugs, and excludes unrelated non-AI decision-guide entries. New editorial cards should show:

- category
- title
- decision-support excerpt
- reading time
- date
- optional view count only if the source is real

Do not show placeholder view counts as social proof.

## 5. Support component

### Public support page

Source: `frontend/pages/contact.tsx`

Required composition:

1. Public page with no auth gate.
2. Editorial support headline.
3. Telegram primary action from `SUPPORT_URL`.
4. Three decision-support notes:
   - state the use case
   - inspect product details
   - ask the support team
5. Link back to `/products`.

Telegram is the only approved public support channel.

## 6. Redirect component

### `RouteRedirect`

Source: `frontend/components/RouteRedirect.tsx`

Use for legacy routes. It renders the canonical shell, attempts `router.replace`, and provides a manual fallback link. New features must not be added to redirect pages.
