# OpenGraph Studio

A single-page workshop for designing, previewing, and exporting Open Graph share cards. Vanilla HTML/CSS/JS — no build step, no framework, no tracking. Runs entirely in your browser.

> Crop · Compress · Preview · Export — pixel-perfect 1200×630.

## Features

- **Two input methods**
  - Paste any URL → fetches the live page (via [corsproxy.io](https://corsproxy.io)), parses `og:*` / `twitter:*` / `<title>` / `<meta description>`, and auto-loads the `og:image` into the editor.
  - Drag, click, or paste (`⌘V` / `Ctrl+V`) any JPG, PNG, or WEBP from your clipboard or desktop.

- **Editor**
  - Interactive crop overlay locked to the 1200 × 630 OG aspect ratio (1.91:1).
  - Live quality slider (10–100%) with live output-size readout.
  - Format toggle: JPEG, PNG, WEBP (with auto-derived `og:image:type` in the embed output).
  - Source-dimension warning when the input is below 1200 × 630.
  - One-click **auto-compress** — binary-searches the highest quality that fits under 200 KB.
  - **Download HD** at exactly 1200 × 630.

- **Live previews for 6 platforms** — Twitter / X, Facebook, LinkedIn, WhatsApp, Slack, Discord. Each card renders its actual platform-truncated text so you see exactly how it'll appear when shared.

- **Character-limit awareness** — per-platform truncation hints under each metadata field. Title and description counters color-code as you approach each platform's hard cap (WhatsApp 65, Twitter/LinkedIn 70, Slack 75, Facebook 100; descriptions WhatsApp 175, Twitter 200).

- **Embed block** — generates up to 18 OG + Twitter Card meta tags, including `og:image:type/width/height/alt`, `og:locale`, `twitter:site/creator/image:alt`. One-click copy.

- **Status bar** — live source dimensions, character counts, tag count, and output file size with traffic-light status indicator.

## Live demo

Open `index.html` directly in any modern browser, or serve it locally:

```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

## Project structure

```
opengraph-studio/
├── index.html        # the entire app (HTML + CSS + JS)
├── LICENSE           # MIT
├── README.md
├── CONTRIBUTING.md
└── .github/
    └── FUNDING.yml
```

Everything lives in `index.html`. There is no build, no `node_modules`, no toolchain.

## Tech

- **Vanilla HTML, CSS, and JavaScript** — no framework, no bundler, no CDN libraries (except Google Fonts for typography).
- **Manrope** for UI, **Instrument Serif** for display moments, **JetBrains Mono** for code/dimensions — all from Google Fonts.
- Image processing via the **Canvas API** (`drawImage` + `toBlob`).
- URL-fetch path uses [corsproxy.io](https://corsproxy.io) to bypass CORS when reading remote pages and images.

## Recommended values (encoded in the tool)

| Tag | Recommended | Hard caps |
|---|---|---|
| `og:title` | ≤ 60 chars | WA 65, TW/LI 70, Slack 75, FB 100 |
| `og:description` | 130–160 chars | WA 175, TW/FB 200 |
| `og:image` | 1200 × 630 (1.91:1) | min 600 × 315 |
| File size | ≤ 200 KB | acceptable to ~500 KB |

## Deploying

Drop `index.html` on any static host:

- **GitHub Pages** — Settings → Pages → deploy from `main`
- **Vercel / Netlify / Cloudflare Pages** — drag-and-drop the file, or connect the repo

No server, no API, no env vars required.

## Roadmap

- Safe-zone overlay (60 px margin guides) on the crop tool
- Optional `og:image:secure_url` toggle
- Save / load presets
- Per-platform export (different sizes for each)

## License

[MIT](./LICENSE) © Apoorv Darshan

## Contributing

PRs welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the workflow and style notes.

## Author & support

- **Developer:** Apoorv Darshan — [@apoorvdarshan on X](https://x.com/apoorvdarshan)
- **Email:** [ad13dtu@gmail.com](mailto:ad13dtu@gmail.com)
- **Issues / bugs:** [github.com/apoorvdarshan/opengraph-studio/issues](https://github.com/apoorvdarshan/opengraph-studio/issues)
- **Support the project:** [paypal.me/apoorvdarshan](https://paypal.me/apoorvdarshan) — or just star the repo, that helps too

If this saved you time, a ⭐ on [the repo](https://github.com/apoorvdarshan/opengraph-studio) is the easiest thank-you.
