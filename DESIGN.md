# Design

Captured from the existing code (app/page.tsx, app/globals.css, app/layout.tsx).

## Theme

Dual-stage page: cinematic deep-teal stage for hero, scroll gallery, track record and final CTA; warm-stone light stage for portfolio and process. The scroll journey deliberately morphs ink → stone → ink. Styling system inspired by gocanopy.tech (mint-on-slate, pill CTAs, badge chips, tinted rounded cards) — colors and shapes only, no third-party assets.

## Color

- Ink (dark stage + text on light): `#14323a` deep teal-slate
- Stone (light stage): `#f6f5f3`
- Accent on dark: `#00ffbb` mint (kickers, stats, wordmark, pill buttons, badge borders)
- Accent on light: `#0f766e` deep teal (mint fails contrast on stone)
- Muted: `#9db8b4` on ink, `#5f7370` on stone
- Card tints (process steps): `#d1fae5` / `#99f6e4` / `#5eead4`
- Hairlines: `#e0ddd6` on stone, `rgba(246,245,243,0.16)` on ink

## Typography

- Display: `'Haboro Norm Regular', serif` — uppercase, letter-spacing 0.02–0.2em, weight 400. Sizes via clamp, up to 72px.
- Body/UI: `var(--font-geist), sans-serif` (Geist 300/400/500/600). Kickers: 12px, letter-spacing 0.25em, uppercase, weight 500.
- Hierarchy through scale + weight contrast, not color.

## Layout

- Sections: `max-width: 1280px`, padding `clamp(80px,12vh,160px) clamp(24px,6vw,96px)`.
- Content anchored to `id` sections: `#hero`, `#portfolio`, `#process`, `#contact`.
- Styling convention: inline `style={{}}` objects in TSX; `app/globals.css` only for keyframes, `:hover` states, and anything inline styles can't express (media queries, pseudo-elements).

## Motion

- Signature: 900vh scroll-driven hero (line grows → gallery videos scale in → black/white text morph), driven by refs + a passive scroll listener, no animation library.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo family). No bounce, no elastic.
- Transforms and opacity only; never animate layout properties.
- `data-scroll-behavior="smooth"` on `<html>` enables smooth anchor scrolling (Next 16) — do not remove.
- Honor `prefers-reduced-motion: reduce`: disable marquees, reveals, parallax and counters.

## Components

- Pill CTA: mint `rounded-full` button, ink text, trailing ink circle with mint arrow; hover nudges the arrow. Title case labels ("Get in touch").
- Badge chip: mint 1.5px border, rounded 8px, uppercase 11px letterspaced mint text on translucent ink.
- Announcement bar: fixed mint bar at top, centered underlined link, dismissible ×.
- Morphing bottom nav bar (280px pill ↔ 56px close button, fully rounded) + slide-up menu panel (ink, 16px radius).
- Portfolio cards: bare `<article>`, rounded-16px image with parallax + hover zoom/grayscale-lift, name in serif, location/price row beneath.
- Process steps: tinted mint-gradation cards (16px radius) with serif number in a 56px ink-bordered circle.
- Oversized mint serif wordmark above the footer.
- Media: self-hosted muted looping videos (`public/videos/`), decorative (`aria-hidden`).
