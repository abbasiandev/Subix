# Fluxo accessibility, RTL, and responsive rules

## 1. Document baseline

`frontend/pages/_document.tsx` defines:

- `lang="fa"`
- `dir="rtl"`
- theme initialization from `localStorage`

Do not override document direction for a whole new page. Apply LTR only to data that is inherently LTR.

## 2. Page semantics

Every canonical page must have:

- one `<main id="main-content" tabIndex={-1}>`
- one H1
- a labeled navigation landmark
- meaningful section headings
- footer landmark where the shared footer is used
- skip link destination that exists in the rendered page

Decorative canvas, SVG routes, grids, glows, particles, and brand logo images whose accessible name is already supplied by nearby text use `aria-hidden` or empty alt text.

## 3. Keyboard behavior

### Header

- Tab reaches wordmark, nav links, account, theme, and menu controls.
- Menu toggle has `aria-expanded` and `aria-controls`.
- Escape closes the menu and returns focus to its toggle.
- Closed menu is hidden.

### Catalog

- Search is keyboard accessible and labeled.
- Scope and category buttons are native buttons.
- `aria-pressed` communicates selected filter state.
- Result count is exposed via `role="status"`.
- Product cards have a clear focus ring.

### Modal

- Overlay click may close the current demo modal.
- When a real payment flow is implemented, add focus trapping and restore focus to the opener.
- Do not close a real payment process while a transaction is in progress unless the backend state is safe.

### Authentication

- Phone input is labeled.
- OTP inputs support keyboard navigation, paste, backspace, and submit.
- Loading and error messages are visible and understandable.
- Disabled controls must still expose why they are unavailable through surrounding copy or state.

## 4. Focus treatment

Canonical public focus uses a visible warm-accent outline:

```css
:focus-visible {
  outline: 3px solid var(--site-accent-text);
  outline-offset: 5px;
}
```

Do not remove focus outlines for aesthetic reasons. If a component uses a custom ring, it must remain visible against both dark and light themes.

## 5. Contrast and color

- Normal text target: at least 4.5:1.
- Large text target: at least 3:1.
- Color cannot be the only status signal.
- Discount, pending, active, expired, error, and unavailable states require text labels in addition to color.
- Decorative neon colors must not be used for long body copy.

## 6. Motion accessibility

Respect `prefers-reduced-motion: reduce` for:

- reveal transitions
- sticky story behavior
- WebGL motion
- hover movement
- scanline effects
- smooth scrolling
- counters and ambient animation

Content must stay in document flow and remain visible.

## 7. RTL and mixed-direction content

Use:

```tsx
<span dir="ltr">ChatGPT Plus</span>
<span className="dir-ltr">09123456789</span>
```

For mixed text:

- keep the surrounding paragraph RTL
- isolate English product names with `dir="ltr"`
- isolate URLs, emails, phone numbers, prices, and IDs
- use logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline`) instead of left/right where possible
- do not rotate arrows based on guesswork; verify the visual direction in RTL

## 8. Images and logos

- Meaningful product/article images need useful alt text.
- Decorative brand logos may use `alt=""` when the nearby title already names the product.
- Use `asset()` for local assets so production `https://fluxo.ir/` paths work.
- Keep explicit width and height where possible to reduce layout shift.
- WebGL canvases are decorative and `aria-hidden`.

## 9. Progressive enhancement

Required fallbacks:

- no WebGL: CSS hero fallback
- no IntersectionObserver: content remains visible
- no JavaScript: scroll-story beats render in normal flow
- reduced motion: static content and no sticky story
- unavailable backend: visible empty/error/demo state, never a false zero-success state

## 10. Verification matrix

Check at minimum:

| Surface | Widths | States |
|---|---|---|
| Home | 375, 768, 1280 | normal, reduced motion, no WebGL |
| Catalog | 375, 768, 1280 | AI scope, other scope, category filter, search empty |
| Detail | 375, 768, 1280 | normal, modal auth, modal preview, demo state |
| Blog | 375, 768, 1280 | all posts, category filter, empty search |
| Login | 375, 768 | phone error, OTP error, countdown, loading |
| Contact | 375, 768, 1280 | public Telegram CTA |
| Account | 375, 768, 1280 | loading, unauthenticated, empty subscriptions, empty tickets |
