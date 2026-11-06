# RUNO — Homepage

Premium contemporary streetwear homepage built with **React 19, Vite 7, Tailwind CSS 4, Framer Motion and Lucide**.

## Open it

**Quickest:** open `website/index.html` (or `dist/index.html` after a build) by double-clicking, or visit it through XAMPP, e.g. `http://localhost/runo-homepage/website/`.

The `index.html` in the project root is the *source* file. It stays blank if opened directly in the browser, because it needs Vite to run.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # self-contained site in /dist (works from any folder)
npm run preview    # serve the build locally
```

Requires Node 20.19+ (or 22+).

## Replace your media

| What | Where |
| --- | --- |
| Hero video | `public/videos/runo-campaign.mp4`. Overwrite the file, or change `media.heroVideo` in `src/config/site.js` |
| Hero poster (first frame, shown while loading) | `public/images/hero-poster.jpg` |
| Philosophy & campaign images | `public/images/*.webp`. Paths are in `src/config/site.js` |
| Logo | `src/components/ui/Logo.jsx`. Swap the text wordmark for an `<img>` of your SVG |

The video currently in the project is your campaign film, re-muxed with `+faststart` so it starts playing before it has fully downloaded. The stills on the page are frames taken from that film.

**Video tip:** keep the hero file under ~8 MB (H.264, 1080p, around 10 s, no audio track needed). Example:
`ffmpeg -i in.mp4 -an -c:v libx264 -crf 24 -preset slow -movflags +faststart public/videos/runo-campaign.mp4`

## Products, prices, colours

Everything lives in `src/data/products.js`.

- `price: null` displays `€ —`. Set a number (e.g. `price: 180`) and the card, bag line and subtotal format it automatically. Currency is set at the top of the file.
- `image` / `hoverImage`: set a path in `/public` to use real photography. While `image` is `null`, the card shows a drawn garment placeholder in the selected colour, marked "Image placeholder". The Oversized Graphic Hoodie already uses an on-model campaign still as its hover image.
- `colors`: name + hex (and an optional `accent` for two-tone pieces). Picking a swatch recolours the placeholder.

## Copy & links

All headlines, body copy, nav and footer links are in `src/config/site.js`. Links to pages that don't exist yet (`/journal`, `/contact`, `/shipping-returns`, `/privacy`, `/account`, `/checkout`, `/shop`) are ready to point at real routes.

The newsletter form validates the email and shows a confirmation. Connect it to your provider in `src/components/sections/Newsletter.jsx` (see the `TODO`).

## Structure

```
src/
  config/site.js            copy, links, media paths
  data/products.js          catalogue + price formatting
  context/BagContext.jsx    bag state (persists in localStorage)
  hooks/                    useScrolled, useOverlay (scroll lock + Esc)
  components/
    layout/                 Navbar, Footer
    overlays/               MobileMenu, SearchOverlay, BagDrawer
    sections/               Hero, Philosophy, Collection, Campaign, Values, Newsletter
    ui/                     Button, Logo, Reveal (fade / mask / image reveal),
                            ProductCard, GarmentArt (placeholder drawings)
```

## Design tokens

Defined in `src/index.css` (`@theme`), sampled from the campaign film:

| Token | Hex | Use |
| --- | --- | --- |
| ivory | `#F2EDE4` | page background |
| bone | `#E7E0D3` | product stage, newsletter |
| sand | `#D6CCBB` | hairlines |
| stone | `#A89D8A` | numerals, ornament |
| concrete | `#6B6358` | secondary text |
| charcoal | `#2B2925` | body text |
| ink | `#161513` | headlines, dark sections |

Type: **Cormorant Garamond** (display) and **DM Sans** (text), both Google Fonts, self-hosted through `@fontsource`, so there are no third-party font requests.

## Accessibility & performance

- Skip link, labelled icon buttons, `aria-current` on the active nav item, focus-visible outlines, Esc closes every overlay, page scroll is locked behind them.
- Hero video has a pause/play control. With *reduce motion* turned on, the video stays on its poster and Framer Motion animations are reduced.
- Below-the-fold images are lazy-loaded WebP with `srcset`. The video uses a poster and fast-start.
