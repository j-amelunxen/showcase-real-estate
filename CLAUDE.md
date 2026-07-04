# Immo-Showcase — project notes

Fictional luxury real-estate showcase landing page. Next.js 16 (App Router, Turbopack), React 19, TypeScript. No CSS framework — layout is inline `style={{}}` objects plus `app/globals.css` for keyframes and `:hover` states (which inline styles can't express).

## Commands

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
pnpm lint
```

## Structure

- `app/page.tsx` — the entire landing page, one client component (scroll-driven animation needs refs + a scroll listener, so it can't be a server component)
- `app/layout.tsx` — root layout, metadata, Geist font, the Haboro Norm Regular `<link>` (third-party font CDN, not on next/font)
- `app/impressum/page.tsx` — legal notice (server component)
- `public/videos/` — self-hosted, compressed video assets

## Conventions

- Sections use `id` anchors (`#hero`, `#portfolio`, `#process`, `#contact`) — the menu overlay and the "GET IN TOUCH" buttons scroll to these instead of doing anything fake. Keep new sections wired the same way rather than adding dead links/buttons.
- `data-scroll-behavior="smooth"` on `<html>` (in `layout.tsx`) is what makes anchor-link scrolling smooth in Next 16 — don't remove it.
- Everything is a fictional brand. Contact details (`hello@immo-showcase.com`, phone number) are placeholders, not real.
- `/impressum` renders from `IMPRESSUM_*` environment variables (owner, company, street, city, phone, email, VAT, web) with neutral placeholder fallbacks. The real operator data is **never committed** — it lives only in Vercel's env config and is injected at build time. Keep it that way: never hardcode real name/address/phone/VAT back into the source. See `.env.example` for the full list of keys.

## Media licensing — read before touching images/video

See [`MEDIA-LICENSES.md`](./MEDIA-LICENSES.md). Short version: all videos are self-hosted and Pexels-licensed. The three portfolio property images are still hotlinked from a third-party AI-generation bucket with **no verified license** — don't add more assets from that same source, and don't remove the warning in `MEDIA-LICENSES.md` without actually resolving it (replacing the images or removing them).
