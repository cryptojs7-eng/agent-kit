# Analytics overview panel

| | |
|---|---|
| **Area** | `dashboard` |
| **Where in TIKALGO** | Admin analytics / user PnL analytics with 24h–90d ranges |
| **Before using** | Read [`README.md`](./README.md) → "TIKALGO adaptation rules" and paste them after the prompt |

## Prompt (original)
```text
Build an analytics overview panel with Tailwind CSS. The header row holds a page title, a muted line naming the active range, and on the right a chip group for 24h, 7d, 30d and 90d where the active chip is dark, plus a bordered "Export" button. Below, a four-card metric row: each bordered rounded-xl card has a small label, a large figure, a signed change pill in green or red, and a twelve-bar mini chart drawn with flex items of varying heights. Under that, a wider chart card with a title, a legend of two dotted series labels, and a placeholder area chart drawn as an SVG polyline over a faint grid. Then add JavaScript that holds a dataset per range, redraws the four figures, the change pills and the mini bars when a chip is clicked, and updates the subline to name the compared period.
```
