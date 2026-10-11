# Regional pricing section

| | |
|---|---|
| **Area** | `landing` |
| **Where in TIKALGO** | Plans page; currency selector (add a USDT row if crypto payment is offered) |
| **Before using** | Read [`README.md`](./README.md) → "TIKALGO adaptation rules" and paste them after the prompt |

## Prompt (original)
```text
Create a pricing section with Tailwind CSS that adapts to the visitor's region. Above the three plan cards, a right-aligned control row with a small globe glyph and a native select listing US Dollar, Euro, British Pound, Japanese Yen, and Indian Rupee. Each of the three cards (Starter, Team, Business) shows a plan name, a large price with a /mo suffix, a per-extra-seat line, a short description, a feature list, and a button; give every element that holds money a data-usd attribute with its dollar amount so nothing is hard-coded twice. Under the grid, a muted footnote about the tax treatment of the selected region. Then add JavaScript holding one record per currency — exchange rate, locale, tax note — that on change converts each data-usd amount, rounds sensibly (whole units for western currencies, nearest hundred for yen and rupee), formats it with Intl.NumberFormat so the symbol and separators match the locale, and swaps the footnote text.
```
