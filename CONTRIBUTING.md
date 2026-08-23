# Contributing to OpenGraph Studio

Thanks for your interest! This is a small, focused single-file project. Contributions are welcome whether you're fixing a bug, polishing a preview card, or adding a new feature.

## Quick start

```bash
git clone https://github.com/aopv/opengraph-studio
cd opengraph-studio
python3 -m http.server 3000
# open http://localhost:3000
```

That's it. There's no build step, no dependencies, no toolchain.

## Reporting bugs

[Open an issue](https://github.com/aopv/opengraph-studio/issues/new) with:

1. **What you did** — steps to reproduce.
2. **What you expected** to happen.
3. **What actually happened** — include console errors and a screenshot if visual.
4. **Browser & OS** — e.g. "Chrome 131 on macOS Sequoia".
5. If the bug involves URL fetching, include the URL you tried.

## Suggesting features

Open an issue with the `enhancement` label. Brief is fine — a sentence on the use case and one on the proposed UI is plenty. We'll discuss before you write code.

## Pull requests

### Workflow

1. Fork the repo.
2. Create a branch off `main`: `git checkout -b your-feature`.
3. Make focused, well-scoped commits — one feature or fix per PR.
4. Test in a fresh browser session (clear cache for CSS changes).
5. Open a PR with:
   - **What** changed
   - **Why** (link the issue if there is one)
   - **Screenshots** for any UI change
6. A maintainer will review.

### Style

- **Single-file constraint:** everything lives in `index.html`. No new files for source code, no build step, no `node_modules`. If a feature genuinely needs splitting, open an issue first.
- **No frameworks, no CDN libraries.** Google Fonts (CSS only) is the one exception.
- **Vanilla JS** — IIFE-wrapped, `'use strict'`, no transpilation. Use modern syntax (`const`/`let`, arrow functions, optional chaining).
- **CSS variables** for any color, radius, or shadow. Don't hardcode hex values that already exist as a variable.
- **Semantic colors:**
  - `--accent` (violet) for brand and primary actions
  - `--warn` (amber) for caution states (e.g. dimension warnings)
  - `--danger` (rose) for hard errors (e.g. over-limit chars)
  - `--success` (green) for live/positive indicators
  - Don't use `--accent` for warnings or `--warn` for branding.
- **Typography:**
  - `--sans` (Manrope) for UI body
  - `--serif` (Instrument Serif) for signature display moments only — used sparingly
  - `--mono` (JetBrains Mono) for code, dimensions, kbd, technical labels
- **Comments:** only when the *why* is non-obvious. The code itself should explain the *what*.
- **No debug code** — no `console.log`, no commented-out blocks, no TODOs without a linked issue.

### Testing checklist

Before submitting:

- [ ] URL fetch works for a real site (try `fud-ai.app` or `vercel.com`)
- [ ] Drag-and-drop image works
- [ ] Paste from clipboard (`⌘V`) works on a fresh page
- [ ] Crop box drags and resizes smoothly, stays in bounds
- [ ] Quality slider updates output size live
- [ ] Format toggle (JPEG/PNG/WEBP) updates output and `og:image:type`
- [ ] Auto-compress reaches a quality under 200 KB
- [ ] Download produces a 1200 × 630 image in the chosen format
- [ ] All 6 preview cards render correctly with and without an image
- [ ] Embed block updates live and copies to clipboard
- [ ] Status bar reflects current state
- [ ] Responsive: layout collapses cleanly under 1000 px

### Commit messages

Short, imperative, lowercase. Examples:

- `fix preview grid collapsing on single platform filter`
- `add og:image:width/height to embed output`
- `switch download button gradient to violet`

No trailing period. No emoji. No "Closes #123" — link the issue in the PR description instead.

## Adding a new preview card

If you want to add a new platform preview (e.g. Mastodon, Bluesky, Telegram), the pattern is:

1. **Add the HTML** in the `<div class="preview-grid">` block in `index.html`. Follow the existing structure: `.preview-card[data-preview="<name>"]` with `.pc-head` + the platform-specific markup.
2. **Add the CSS** in the `/* ===== <Platform> ===== */` block, mirroring how other platforms' wrap/card classes are scoped.
3. **Add a tab button** in `.preview-tabs`.
4. **Add the per-platform character limits** to the `LIMITS` object in the JS, and update `renderPreviewText()` to truncate that platform's title/description with `truncate(t, LIMITS.title.<name>)`.
5. **Add the IDs** for image/title/desc/etc. to the `applyImageToPreviews` ID list and to `renderPreviewText`.

Test all 7 (or 8, etc.) cards render correctly with and without an image, and that filtering by the new tab works.

## Code of conduct

Be kind. Disagree on ideas, never on people. Maintainers reserve the right to lock or remove abusive comments.

## License

By contributing, you agree your contributions will be licensed under the [MIT License](./LICENSE).
