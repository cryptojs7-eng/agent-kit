# Mobile bottom navigation

| | |
|---|---|
| **Area** | `mobile` |
| **Where in TIKALGO** | Mobile app/PWA tab bar (Home, Markets, Trade[+], AI Signals, Profile) — matches the UI spec |
| **Before using** | Read [`README.md`](./README.md) → "TIKALGO adaptation rules" and paste them after the prompt |

## Prompt (original)
```text
Create a mobile bottom navigation with Tailwind CSS. Draw a narrow phone-shaped frame with a rounded border on a neutral background, containing a scrollable content area of placeholder blocks and, fixed to the bottom of the frame, a tab bar. The bar has five items with a glyph above a tiny label; the active item is neutral-900 with a small dot under the label while the others are muted, one carries a red notification dot on its glyph, and the middle item is a raised circular dark button with a plus glyph that sits slightly above the bar line. Add a safe-area strip below the tabs. Then add JavaScript that switches the active tab on tap, moves the indicator dot, updates the heading in the content area, and clears the notification dot the first time its tab is opened.
```
