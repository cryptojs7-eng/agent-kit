# Gauge row (SVG rings)

| | |
|---|---|
| **Area** | `dashboard` |
| **Where in TIKALGO** | Self-diagnostics / TIKALGO AI health: data, model, decision health |
| **Before using** | Read [`README.md`](./README.md) → "TIKALGO adaptation rules" and paste them after the prompt |

## Prompt (original)
```text
Create a three-up gauge row with Tailwind CSS and inline SVG. Each gauge sits in a bordered rounded-2xl card: an SVG viewBox of 100 by 100 with two circles — a neutral-100 track and a coloured progress ring using stroke-dasharray and stroke-dashoffset with a rotate minus ninety transform — and an absolutely centred figure showing the percentage in large medium-weight text with a tiny label under it. Around the gauge, a title above and a two-line explanation below, plus a footer row with the raw counts. Use green for a healthy metric, amber for one that needs attention and neutral-900 for a neutral one. Then add JavaScript that reads a data-value attribute on each ring, computes the dash offset from the circumference, and animates the offset from empty to its value with a CSS transition triggered on the next frame so the rings sweep in on load.
```
