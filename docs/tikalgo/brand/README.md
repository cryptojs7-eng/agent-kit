# TikAlgo — Logo & Brand Assets (v4)

**Concept — AI × Trading, modern & minimal:** a bold **phosphor-green tile** with a single dark
**rising price line** that ends in an **orange AI node** — market move + AI signal in one gesture.
The wordmark is lowercase **tikalgo** set in **Sora SemiBold (600)**, converted to vector outlines
(no font needed at runtime), single color, with the dot of the *i* in the same **orange**.

**Typeface:** [Sora](https://fonts.google.com/specimen/Sora) — SIL Open Font License 1.1
(free for commercial use, including logos). Use Sora for brand headings; UI text per the Design
System (Inter/Geist, Persian Peyda/IRANSansX).

| File | Use |
|---|---|
| `tikalgo-logo-on-dark.svg` | Primary horizontal logo (mark + wordmark) on dark backgrounds |
| `tikalgo-logo.svg` | Horizontal logo on light backgrounds |
| `tikalgo-logo-currentcolor.svg` | UI component: wordmark inherits CSS `color` (theme-aware) |
| `tikalgo-wordmark-on-dark.svg` / `tikalgo-wordmark.svg` | Wordmark only |
| `tikalgo-mark.svg` | App icon, avatar, collapsed sidebar, Tika assistant avatar |
| `favicon.svg` | Browser favicon (same as mark) |
| `png/icon-192.png`, `png/icon-512.png` | PWA manifest icons |
| `png/apple-touch-icon.png` | iOS home-screen icon (180×180) |
| `png/favicon-32.png` | Legacy favicon |
| `png/tikalgo-logo*.png`, `png/tikalgo-wordmark*.png` | Raster logos (transparent) |

## Colors
| Token | Hex | Role |
|---|---|---|
| `--brand-bg` | `#0A1712` | Deep green-black: price line in the mark, dark theme base |
| `--brand-white` | `#FFFFFF` | Wordmark on dark |
| `--brand-green` | `#3DDC2F` | Phosphor green: logo tile, up/profit on dark |
| `--brand-green-dark` | `#1FA81F` | Green on light backgrounds (better contrast) |
| `--brand-ink` | `#0A1712` | Wordmark on light |
| `--brand-orange` | `#FF7A1A` | AI node / signal accent (i-dot, mark dot) — use sparingly |
| `--down` | `#F6465D` | Loss / down (semantic, not a brand color) |

Semantic use in the product: **up/profit = brand green**, **down/loss = `#F6465D`**,
**AI elements & highlights = orange**.

## Rules
- Clear space around the logo ≥ height of the letter **o**. Minimum width: 96 px (horizontal
  logo), 72 px (wordmark), 16 px (mark).
- Always lowercase `tikalgo`. Do not stretch, rotate, outline, add shadows/gradients, or swap
  the green/orange roles; keep the wordmark single-color.
- In the terminal header use `tikalgo-logo-currentcolor.svg` inline so it follows the theme.
- Clicking the logo opens the Command Menu (MASTER_PROMPT §5T, T1).

## Install into the TikAlgo frontend (done by Claude Code in T1)
```bash
# from /root/tikalgo (adjust the public/static dir to the project's framework)
cp docs/tikalgo/brand/favicon.svg                 web/public/favicon.svg
cp docs/tikalgo/brand/png/favicon-32.png          web/public/favicon-32.png
cp docs/tikalgo/brand/png/apple-touch-icon.png    web/public/apple-touch-icon.png
cp docs/tikalgo/brand/png/icon-192.png docs/tikalgo/brand/png/icon-512.png web/public/
mkdir -p web/public/brand && cp docs/tikalgo/brand/*.svg web/public/brand/
```
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#0A1712">
```
PWA `manifest.json`: icons `icon-192.png` (192×192) and `icon-512.png` (512×512),
`theme_color` / `background_color` `#0A1712`.
