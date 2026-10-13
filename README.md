# Ether Archive — Terminal UI

Minimal black-and-white, single-screen terminal interface for Ether Archive. No raster artwork is used. Logo/icon files are editable SVGs in `public/logos/`.

## Local development

```bash
npm install
npm run dev
```

## Build / deploy

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` directory using the existing Cloudflare Pages/Workers frontend workflow. This project does not modify the API Worker or KV allowlist.

## Edit content

Most labels, links, dates, and API settings are in `src/config/manifest.json`.

- `site.apiBaseUrl`: `https://ether-archive-api.e-gndz-33.workers.dev`
- `site.presaleCheckPath`: `/api/presale/check`
- `site.mintDate`: `2026-10-31T17:00:00Z` (20:00 GMT+3)
- `site.openSeaUrl`, `site.xUrl`, `site.telegramUrl`: external links
- `assets.logoSvg`, `assets.openSeaIcon`, `assets.xIcon`, `assets.telegramIcon`: SVG file paths

The presale flow uses `window.ethereum`, requests the connected address, then sends `POST /api/presale/check` with `{ "wallet": "0x..." }`. Expected API response: `{ "eligible": true|false }`.

## SVG logos

Replace the files in `public/logos/` with your own SVG markup while keeping the filenames, or update their paths in `src/config/manifest.json`.

## Notes

- This is a single viewport with no page scrolling by design; the command panel swaps content in place.
- `//mint` currently displays mint details and the OpenSea link. It does not execute a mint transaction because no mint contract details were supplied.
- The API Worker and Cloudflare KV allowlist remain untouched.
