# Fluxo motion and WebGL system

## 1. Motion philosophy

Motion is atmospheric and explanatory. It should reveal hierarchy, show continuity between choices, or add depth to the cinematic canvas. It must never delay content, hide essential controls, or imply a transaction state.

Use short, low-amplitude movement:

- opacity and 20px vertical reveal for section entrances
- 2–4px card hover lift
- 2px primary button hover lift
- 0.45–0.6s crossfade for active scroll-story beats
- slow ambient orbit/parallax in WebGL

Avoid:

- bouncing cards
- constant motion on text
- large transforms on mobile
- scanlines or status animations that imply real-time operational data
- animation-only information

## 2. Reduced motion

Every motion feature must respect `prefers-reduced-motion: reduce`.

Required behavior:

- reveal elements are visible without transition
- scroll story loses sticky chapter behavior and exposes all beats in document flow
- WebGL motion scale is reduced or the fallback is used
- hover transforms and scanline effects are disabled
- smooth scrolling is disabled
- content remains fully readable

Do not use JavaScript alone to hide content before checking reduced motion.

## 3. Homepage reveal behavior

`frontend/pages/index.tsx` observes `.story-reveal` elements. The default behavior is:

1. Content renders visible for no-JS.
2. When JavaScript is ready, `.reveal-pending` is added.
3. Intersection with approximately `0.12` threshold adds `.is-visible`.
4. The observer disconnects after reveal.

New reveal content must follow the same progressive enhancement order.

## 4. `ScrollReveal`

Source: `frontend/components/Animations/ScrollReveal.tsx`

Props:

| Prop | Default | Meaning |
|---|---:|---|
| `direction` | `up` | Initial transform direction |
| `delay` | `0` | Delay in milliseconds |
| `duration` | `600` | Transition duration in milliseconds |
| `threshold` | `0.1` | Intersection threshold |
| `className` | `''` | Additional class |

Directions:

- `up`: `translateY(40px)`
- `down`: `translateY(-40px)`
- `left`: `translateX(40px)`
- `right`: `translateX(-40px)`
- `fade`: no transform

Use it for secondary page entrance content, not for essential content that must be visible immediately.

## 5. Scroll story behavior

Source: `frontend/components/ScrollStory.tsx`.

### Normal motion

- Each chapter becomes approximately `360vh` tall after JS enhancement.
- Sticky frame begins below the 76px header.
- Three beats per chapter are positioned in the same copy frame.
- Intersection sentinels occupy approximately `120vh` per beat.
- An observer with root margin `-46% 0px -46% 0px` changes the active beat.
- Inactive beats are invisible and non-interactive.
- Active beat fades and translates into place.
- Progress scale communicates the active beat index.
- Product nodes in the visual link to actual product detail pages.

### No JavaScript or reduced motion

- Sentinels are not shown.
- Sticky behavior is disabled.
- All beats render in normal flow with full opacity.
- No product decision information is lost.

### New chapter contract

Each chapter must define:

```ts
{
  number: string;
  label: string;
  beats: {
    title: string;
    body: string;
    productIds: number[];
  }[];
}
```

Keep three beats unless there is a deliberate UX reason to change the pacing. Each beat needs a factual decision-support idea and at least one valid product id.

## 6. WebGL hero lifecycle

Source: `frontend/components/WebGLHero.tsx`.

### Load strategy

- Three.js is dynamically imported after idle, with a timeout fallback.
- No WebGL when `NEXT_PUBLIC_DISABLE_WEBGL === '1'`.
- No WebGL when the browser lacks WebGL.
- No WebGL on low-power/data-saving devices detected by connection save-data or hardware concurrency <= 4.
- Pixel ratio is capped at 2.

### Scene

- translucent shader-driven icosahedron core
- translucent shell
- three orbital rings
- 1100 particle points
- mouse pointer parallax
- scroll-linked rotation
- slow ambient rotation

### Runtime lifecycle

- Render only when the hero is visible and the document tab is visible.
- Observe hero visibility with `IntersectionObserver`.
- Stop RAF when cancelled.
- Remove pointer, scroll, resize, and visibility listeners on teardown.
- Dispose geometries, materials, renderer, and canvas.

### Fallback

The fallback uses CSS radial gradients and a static field. Text and CTA must render independently of WebGL.

## 7. Route WebGL stage

Source: `frontend/components/WebGLRouteStage.tsx`.

It is mounted by `_app.tsx` on non-home routes as an `aria-hidden` fixed background layer. It contains:

- cyan and magenta point lights
- wireframe orbital core
- translucent shell
- rings
- point field
- CSS perspective grid

It must never intercept pointer events or reduce text contrast. New route features should work if this layer is disabled.

## 8. Framer Motion

Framer Motion is present in legacy/auth components. If used in a new canonical feature:

- animate opacity/transform only
- use the documented reduced-motion behavior
- avoid layout animations that shift content around Persian text
- do not introduce a second easing vocabulary without documenting it
