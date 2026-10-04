# TikAlgo — Logo & Brand Assets

Minimal geometric wordmark **tikalgo** (lowercase, English) drawn as pure SVG strokes — no font
dependency, crisp at any size. The **yellow square** (dot of the *i*) is the brand accent: a
"signal" point. The app mark reuses the wordmark's **t** + accent square.

| File | Use |
|---|---|
| `tikalgo-logo.svg` | Wordmark on light backgrounds |
| `tikalgo-logo-on-dark.svg` | Wordmark on dark backgrounds |
| `tikalgo-logo-currentcolor.svg` | UI component: letters inherit CSS `color` (theme-aware); accent stays yellow |
| `tikalgo-mark.svg` | App icon / avatar / header compact logo |
| `favicon.svg` | Browser favicon (same as mark) |
| `tikalgo-mark-bars-alt.svg` | Alternative mark (rising bars) — not primary |
| `png/icon-192.png`, `png/icon-512.png` | PWA manifest icons |
| `png/apple-touch-icon.png` | iOS home-screen icon (180×180) |
| `png/favicon-32.png` | Legacy favicon |
| `png/tikalgo-logo*.png` | Raster wordmarks (1074×384, transparent) |

## Colors
| Token | Hex | Role |
|---|---|---|
| `--brand-ink` | `#0B0E11` | Wordmark on light, icon background |
| `--brand-paper` | `#EAECEF` | Wordmark on dark, icon glyph |
| `--brand-accent` | `#F0B90B` | Accent square (signal) — use sparingly |

## Rules
- Clear space around the wordmark ≥ height of the letter **o**. Minimum width: 72 px (wordmark), 16 px (mark).
- Always lowercase `tikalgo`. Do not stretch, rotate, outline, add shadows, or recolor the accent.
- In the terminal header use `tikalgo-logo-currentcolor.svg` inline so it follows the dark/light theme.
- Clicking the logo opens the Command Menu (MASTER_PROMPT §5T, T1).

## Install into the TikAlgo frontend (done by Claude Code in T1)
```bash
# from /root/tikalgo (adjust the public/static dir to the project's framework)
cp docs/tikalgo/brand/favicon.svg                 web/public/favicon.svg
cp docs/tikalgo/brand/png/favicon-32.png          web/public/favicon-32.png
cp docs/tikalgo/brand/png/apple-touch-icon.png    web/public/apple-touch-icon.png
cp docs/tikalgo/brand/png/icon-192.png docs/tikalgo/brand/png/icon-512.png web/public/
cp docs/tikalgo/brand/tikalgo-logo*.svg docs/tikalgo/brand/tikalgo-mark.svg web/public/brand/
```
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```
PWA `manifest.json`: icons `icon-192.png` (192×192) and `icon-512.png` (512×512), `theme_color` `#0B0E11`.
