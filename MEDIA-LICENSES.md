# Media asset licenses

This project is a design showcase and does not claim ownership of any third-party media used in it. All video files are self-hosted under `public/videos/` (re-encoded to H.264/MP4, downscaled to a max width of 1600px, audio removed since every clip is used muted) to avoid hotlinking third-party servers. Original source URLs are kept below for provenance.

## Video (self-hosted in `public/videos/`)

| File | Source | License | Notes |
|---|---|---|---|
| `hero.mp4` | Pexels — `videos.pexels.com/video-files/30670702/13125376_1920_1080_30fps.mp4` | [Pexels License](https://www.pexels.com/license/) — free for personal & commercial use, no attribution required, cannot be resold unmodified or redistributed as stock footage | Re-encoded from ~100 MB to ~29 MB (1600px width, CRF 24 — bumped up from an earlier 1280px/CRF 28 pass that looked visibly blocky when stretched via `object-fit: cover` on wide viewports) |
| `gallery-1.mp4` | Pexels — `videos.pexels.com/video-files/30670726/13125532_1920_1080_30fps.mp4` | [Pexels License](https://www.pexels.com/license/) | Re-encoded from ~101 MB to ~29 MB |
| `gallery-2.mp4` | Pexels — `videos.pexels.com/video-files/34874523/14777095_2560_1440_25fps.mp4` | [Pexels License](https://www.pexels.com/license/) | Re-encoded from ~6.8 MB to ~2.2 MB |
| `gallery-3.mp4` | Pexels — `videos.pexels.com/video-files/30698669/13135530_1920_1080_30fps.mp4` | [Pexels License](https://www.pexels.com/license/) | Re-encoded from ~31 MB to ~12.5 MB |

Total for all four: ~71 MB (up from ~24 MB at the previous, more aggressive compression). A CSS film-grain overlay (`.grain-overlay` in `globals.css`, applied over the hero video) also helps mask any remaining compression blockiness — it's pure CSS (an SVG turbulence filter), no extra asset.

A fifth clip (`splash.mp4`, used for an intro splash screen) was removed entirely: it came from `d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/...`, not Pexels, and its filename/storage path matched AI-generated output from the design tool that produced this mockup rather than licensed stock footage. Since its license couldn't be verified, the asset and the splash-screen feature were removed rather than shipped with an unclear license.

## Images (still hotlinked, not self-hosted)

The three portfolio property photos (`Villa Serrana`, `The Meridian Penthouse`, `Casa Lumen`) in `app/page.tsx` are loaded from `images.higgs.ai`, which proxies the same `d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/...` bucket the removed `splash.mp4` came from — same provenance problem.

## ⚠️ Action needed before any public/commercial use

The three portfolio images do **not** have a known, verifiable license. They appear to be AI-generated outputs tied to a specific design-tool user account rather than licensed stock media, and they are not owned by this project. Before publishing this repo publicly or using it commercially:

- Replace the three portfolio images with your own photography, or with verifiably licensed stock assets, **or**
- Remove them and adjust the layout accordingly.

Until then, treat this project as an internal/portfolio demo only.
