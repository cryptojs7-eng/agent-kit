# TikAlgo — Logo & Brand Assets (v12)

**Concept — AI × Trading monogram:** the letters **t i** followed by a **green k** drawn exactly like
the approved reference: a tall, almost-vertical left arm (to the height of the *t*) and a slimmer
right arm rising at 42°, meeting in a sharp point on the baseline. It reads as the **k** of
*tikalgo*, an **up-trend**, and an **approved-signal check**. The dot of the *i* is the
**orange AI node**. Everything sits in a **rounded square** (corner radius = 20% of the side).

**Typefaces** (both SIL Open Font License 1.1 — free for commercial use, incl. logos):
- **Monogram:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) SemiBold (600).
- **Full wordmark "tikalgo":** [Unbounded](https://fonts.google.com/specimen/Unbounded) SemiBold
  (600) — wide and modern, corners rounded (r = 5), single color with the orange i-dot.
  Alternate with a green k: `alt/tikalgo-wordmark-green-k*.svg`.
 Letters are converted to
vector outlines (no font needed at runtime). The k is custom geometry matched to the font's stem width: left arm 7°,
right arm 42° at 0.8 × stem width.
Monogram letter corners are **softly rounded** (vector opening, r = 3.5 at 100-unit font size).

## Variants
| File | Description | Use |
|---|---|---|
| `tikalgo-mark.svg` ⭐ | Dark square · white **ti** · **green** tick · orange dot | **Primary** icon, favicon, app icon, Tika avatar |
| `tikalgo-mark-dark-mono.svg` | Dark square · all white · orange dot | Single-color contexts on dark |
| `tikalgo-mark-green.svg` | Green square · dark glyphs · orange dot | Marketing, social avatars, high-impact |
| `tikalgo-mark-light.svg` | White square + dark frame · dark **ti** · green tick | Light backgrounds, print |
| `tikalgo-mark-light-mono.svg` | White square + dark frame · all dark · orange dot | Documents, single-color print |
| `tikalgo-logo.svg` | Primary mark + dark wordmark | Horizontal logo on light |
| `tikalgo-logo-on-dark.svg` | Framed mark + white wordmark | Horizontal logo on dark (header) |
| `tikalgo-logo-currentcolor.svg` | Wordmark inherits CSS `color` | Theme-aware UI header |
| `tikalgo-wordmark.svg` / `-on-dark.svg` | **tikalgo** in Unbounded 600, orange i-dot | Text-only placements |
| `alt/tikalgo-wordmark-green-k*.svg` | Same with a green k | Alternate |
| `favicon.svg` | = primary mark | Browser favicon |
| `png/icon-192.png`, `png/icon-512.png` | Primary mark | PWA manifest |
| `png/apple-touch-icon.png`, `png/favicon-32.png` | Primary mark | iOS / legacy favicon |
| `png/mark-green-512.png`, `png/mark-light-512.png` | Alternate marks | Social / print |
| `png/tikalgo-logo*.png`, `png/tikalgo-wordmark*.png` | Raster logos (transparent) | Docs, slides |

## Tika — AI assistant avatar (`tika/`)
A natural, friendly person in the logo's rounded dark square: warm skin tone, dark hair,
eyebrows, nose and a natural smile; a green brand shirt with collar, a **green headset**
(assistant) and the **orange AI node** as the microphone (the logo's i-dot).

| File | State |
|---|---|
| `tika/tika-avatar.svg` ⭐ | Default / idle |
| `tika/tika-avatar-listening.svg` | Listening (green ring) — mic active |
| `tika/tika-avatar-thinking.svg` | Thinking (orange eyes) — generating an answer |
| `tika/tika-avatar-speaking.svg` | Speaking (animated orange pulse ring + antenna; SVG/SMIL) |
| `tika/png/*.png` | 512/256/128/64 px exports |

**Alternate character — `tika/poirot/`:** the same person and brand styling with a dapper,
curled **Poirot-style mustache** and a dark **bow tie** — the "market detective" persona. Same four
states (idle, listening, thinking, speaking) and PNG exports. Choose the persona in Settings →
Tika → Avatar.

Respect `prefers-reduced-motion`: show the static listening/thinking files instead of the
animated speaking file when reduced motion is requested.

## Colors
| Token | Hex | Role |
|---|---|---|
| `--brand-bg` | `#0A1712` | Deep green-black: mark square, dark theme base |
| `--brand-white` | `#FFFFFF` | Glyphs on dark |
| `--brand-green` | `#3DDC2F` | Phosphor green: tick (trend), green mark, up/profit on dark |
| `--brand-green-dark` | `#1FA81F` | Green on light backgrounds |
| `--brand-orange` | `#FF7A1A` | AI node (i-dot) and AI highlights — use sparingly |
| `--down` | `#F6465D` | Loss / down (semantic) |

## Rules
- Keep the 20% corner radius; do not rotate, stretch, outline, shadow or gradient.
- Clear space ≥ 25% of the square's width on all sides. Minimum size: 16 px (mark), 120 px wide (horizontal logo).
- Always lowercase `tikalgo`. Keep the orange dot orange in every variant.
- In the terminal header use `tikalgo-logo-currentcolor.svg` inline; clicking it opens the Command Menu (MASTER_PROMPT §5T, T1).

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
