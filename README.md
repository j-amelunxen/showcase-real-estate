# Immo-Showcase — Premium Real Estate Landing Page

A single-page, scroll-driven landing page for a fictional luxury real-estate brand. Built with Next.js (App Router) and TypeScript, converted from an original interactive design-candidate prototype.

## Features

- Scroll-driven full-viewport gallery: a growing line morphs into a video gallery, then into a black-to-white text transition, all tied to scroll position
- Slide-up menu overlay with staggered item animations, deep-linking to each section
- Portfolio, process, and contact sections
- Impressum page (`/impressum`)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Plain CSS (no framework) — all layout is done with inline styles + a small `globals.css` for keyframes and hover states
- [`next/font/google`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for the Geist typeface

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build   # production build
pnpm start   # run the production build
pnpm lint    # eslint
```

## Project layout

- `app/page.tsx` — the entire landing page (client component)
- `app/layout.tsx` — root layout, metadata, fonts
- `app/impressum/page.tsx` — legal notice (German, authoritative, with an English translation below it)
- `public/videos/` — self-hosted, compressed video assets (see [`MEDIA-LICENSES.md`](./MEDIA-LICENSES.md) for sources/licenses)

## Media

All video assets are self-hosted and fully licensed (Pexels License, see [`MEDIA-LICENSES.md`](./MEDIA-LICENSES.md) for the per-file breakdown). The three portfolio images are still hotlinked and their license status is **not yet verified** — read that file before using this project outside of a private demo.

---

Made with ❤ by [software-architecture.ai](https://software-architecture.ai)
