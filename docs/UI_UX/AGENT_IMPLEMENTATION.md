# Agent implementation guide for Fluxo UI/UX

## 1. Before writing code

Answer these questions:

1. Is this a new public marketplace feature, an editorial feature, an auth feature, or an account feature?
2. Which canonical route owns it?
3. Does it need a shared component or can it remain page-local?
4. What product/content/API source is authoritative?
5. Is the state real, pending, unavailable, or demo-only?
6. Does it need a new design token, or can it use existing tokens?
7. What is the no-JS and reduced-motion behavior?
8. How does Persian RTL affect the layout and mixed Latin content?

If any answer is unknown, document the unknown in the UI rather than inventing a behavior.

## 2. Implementation decision tree

### New public page

Use the canonical shell:

```tsx
<div className="rive-page" dir="rtl">
  <NavigationBar />
  <main id="main-content" tabIndex={-1}>...</main>
  <Footer />
</div>
```

Use `rive-redesign.css` tokens and page classes. Do not import or recreate `NavigationNew`.

### New catalog feature

Extend `Catalog` or create a child component that receives normalized `Product` objects. Keep:

- AI scope as the default
- scope/category state separate
- `aria-pressed` on filters
- result status
- empty state
- detail links to `/products/[slug]`

### New product feature

Add the source field to `Product`, render it in the card/detail contract, and update `CONTENT_AND_DATA.md`. Do not put the value only in a page-local constant if it is part of the product truth.

### New purchase state

First define whether it is a real backend state or demo state. Do not use words such as “موفق”, “فعال شد”, “پرداخت شد”, or “تحویل شد” without a real source of truth.

### New animation

Implement the static content first. Then add the animated enhancement. Add reduced-motion behavior before merging.

## 3. Styling rules for new code

Prefer:

```css
background: var(--site-surface);
color: var(--site-ink);
border-color: var(--site-line);
padding-inline: var(--site-gutter);
color: var(--site-accent-text);
```

Prefer classes already defined in `rive-redesign.css`:

- `.rive-page`
- `.site-container`
- `.site-button`
- `.text-link`
- `.eyebrow`
- `.accent-text`
- `.catalog-card`
- `.catalog-grid`
- `.support-card`

Do not add one-off blue, cyan, violet, or teal gradients to canonical public surfaces.

## 4. Naming and file placement

- Shared layout: `frontend/components/Layout/`
- Product components: `frontend/components/Products/`
- Editorial components: `frontend/components/Articles/`
- Auth components: `frontend/components/Auth/`
- Reusable motion: `frontend/components/Animations/`
- Product data: `frontend/data/products.ts`
- Article data: `frontend/data/articles.ts` or `frontend/data/blog-posts.ts` until formally merged
- Canonical public styles: `frontend/styles/rive-redesign.css`
- Page route: `frontend/pages/`

Use a component when two pages need the same structure or interaction. Do not abstract a component only to hide one page’s markup.

## 5. New feature documentation requirement

For every new feature, update at least one of the UI/UX docs with:

- purpose
- owner route/component
- user-visible states
- exact labels and CTA behavior
- source data
- responsive behavior
- reduced-motion behavior
- accessibility behavior
- fallback/error behavior

## 6. Verification commands

Run from `frontend/`:

```bash
npm run build
git diff --check
```

`npm run lint` currently prompts for initial ESLint configuration in this repository. Do not silently claim lint passed until a configuration exists.

For a local route smoke test:

```bash
npm run dev -- -p 3311
```

Check:

- `/`
- `/products/`
- `/products/leonardo-ai-pro/`
- `/blog/`
- `/blog/leonardo-ai-complete-guide/`
- `/contact/`
- `/login-phone/`
- `/account/`

## 7. Acceptance checklist

### Structure

- [ ] Correct canonical route and shell.
- [ ] One H1 and one main landmark.
- [ ] No duplicate navigation implementation.
- [ ] No accidental legacy route dependency.

### Design

- [ ] Uses canonical tokens.
- [ ] Uses Lalezar only for display statements.
- [ ] Uses Vazirmatn for body and controls.
- [ ] Uses warm accent as the primary signal.
- [ ] Preserves generous editorial spacing.
- [ ] Does not add unsupported visual claims.

### Content

- [ ] Persian copy is concise and decision-support focused.
- [ ] Product names and identifiers are formatted correctly.
- [ ] Price, duration, discount, and claims come from a source.
- [ ] Demo/backend limitations are visible.

### Interaction

- [ ] Native buttons and links are used.
- [ ] Focus is visible.
- [ ] Loading, empty, error, and unavailable states exist.
- [ ] `aria-pressed`, `aria-expanded`, labels, and status announcements are present where needed.
- [ ] Escape and focus restoration work for overlays/menus.

### Responsive and motion

- [ ] Verified at 375px, 768px, and 1280px.
- [ ] No horizontal overflow.
- [ ] Reduced motion exposes all essential content.
- [ ] No WebGL/JS fallback still works.

### Verification

- [ ] `npm run build` passes.
- [ ] `git diff --check` passes.
- [ ] Key route smoke test passes.
- [ ] Documentation was updated with the new feature contract.
