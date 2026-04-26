<p align="center">
  <a href="https://opengraph-studio.vercel.app/">
    <img src="https://opengraph-studio.vercel.app/favicon.svg" alt="OpenGraph Studio logo" width="96" height="96">
  </a>
</p>

<h1 align="center">OpenGraph Studio</h1>

<p align="center">
  <strong>Live → <a href="https://opengraph-studio.vercel.app/">opengraph-studio.vercel.app</a></strong>
</p>

<p align="center">
  <a href="https://github.com/apoorvdarshan/opengraph-studio/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/apoorvdarshan/opengraph-studio?style=flat&color=a78bfa"></a>
  <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-a78bfa.svg?style=flat"></a>
  <a href="https://x.com/apoorvdarshan"><img alt="Follow on X" src="https://img.shields.io/badge/X-%40apoorvdarshan-a78bfa?style=flat&logo=x&logoColor=white"></a>
</p>


A single-page workshop for designing, previewing, and exporting Open Graph share cards. Vanilla HTML/CSS/JS — no build step, no framework, no account. Runs entirely in your browser.

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

**[opengraph-studio.vercel.app](https://opengraph-studio.vercel.app/)** — hosted on Vercel.

Or run it locally — no install required:

```bash
git clone https://github.com/apoorvdarshan/opengraph-studio
cd opengraph-studio
python3 -m http.server 3000
# then open http://localhost:3000
```

You can also just open `index.html` directly in any modern browser.

## Project structure

```
opengraph-studio/
├── index.html        # the entire app (HTML + CSS + JS)
├── api/
│   └── fetch.js      # Vercel Edge function: server-side CORS proxy
├── LICENSE           # MIT
├── README.md
├── CONTRIBUTING.md
└── .github/
    └── FUNDING.yml
```

The whole app is in `index.html` — no build, no `node_modules`, no toolchain. The single `api/fetch.js` is a Vercel Edge function that handles the URL-fetch feature server-side.

## Tech

- **Vanilla HTML, CSS, and JavaScript** — no framework, no bundler, no CDN libraries (except Google Fonts for typography).
- **Manrope** for UI, **Instrument Serif** for display moments, **JetBrains Mono** for code/dimensions — all from Google Fonts.
- Image processing via the **Canvas API** (`drawImage` + `toBlob`).
- **URL-fetch backend**: Vercel Edge function at `/api/fetch?url=...`. Validates the URL, blocks SSRF-prone hosts (localhost, link-local, internal metadata endpoints), 10s timeout, browser-like User-Agent, edge-cached for 5 minutes. Client falls back to public CORS proxies (allorigins, corsproxy.io, codetabs) if the edge function isn't reachable — useful for local development.

## Recommended values (encoded in the tool)

| Tag | Recommended | Hard caps |
|---|---|---|
| `og:title` | ≤ 60 chars | WA 65, TW/LI 70, Slack 75, FB 100 |
| `og:description` | 130–160 chars | WA 175, TW/FB 200 |
| `og:image` | 1200 × 630 (1.91:1) | min 600 × 315 |
| File size | ≤ 200 KB | acceptable to ~500 KB |

## Deploying

Drop `index.html` on any static host:

- **Vercel** — connect the repo (this is what [opengraph-studio.vercel.app](https://opengraph-studio.vercel.app/) uses); Vercel Web Analytics works out of the box via the script in the page.
- **GitHub Pages** — Settings → Pages → deploy from `main`. The Vercel Analytics script will silently 404; remove it if you don't want the console line.
- **Netlify / Cloudflare Pages** — drag-and-drop the file, or connect the repo.

No server, no API, no env vars required.

## Privacy

The hosted site at [opengraph-studio.vercel.app](https://opengraph-studio.vercel.app/) uses [Vercel Web Analytics](https://vercel.com/docs/analytics) — privacy-friendly, no cookies, no IP storage, GDPR-compliant. All image processing happens locally in your browser; uploaded images and pasted URLs never leave your device.

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
