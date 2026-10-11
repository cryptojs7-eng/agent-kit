# Email verification waiting screen

| | |
|---|---|
| **Area** | `auth` |
| **Where in TIKALGO** | After signup, before the account is activated |
| **Before using** | Read [`README.md`](./README.md) → "TIKALGO adaptation rules" and paste them after the prompt |

## Prompt (original)
```text
Create an email verification waiting screen with Tailwind CSS. Centre a max-w-sm card holding a neutral-tinted round tile with an envelope glyph, a heading reading "Check your inbox", and a line saying a verification link was sent to an address shown in medium weight with a small "change" link beside it. Add three muted hint rows with check glyphs — the link works once, it expires in an hour, and the tab can be closed once verified. Then a full-width outline "Resend email" button that starts disabled with a countdown in its label, a small muted line reporting how many times it has been sent, and a footer link to contact support. Then add JavaScript that starts a thirty second countdown, updates the button label each second, enables it when the countdown ends, and on click increments the send counter, updates the "sent" line and restarts the countdown from a longer interval each time.
```
