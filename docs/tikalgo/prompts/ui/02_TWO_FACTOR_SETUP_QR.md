# Two-factor setup with QR

| | |
|---|---|
| **Area** | `auth` |
| **Where in TIKALGO** | Settings → Security → 2FA enrolment (TOTP) and backup codes |
| **Before using** | Read [`README.md`](./README.md) → "TIKALGO adaptation rules" and paste them after the prompt |

## Prompt (original)
```text
Build a two-factor enrolment card with Tailwind CSS, max-w-xl on a soft neutral background. Above the fold: a small uppercase "Security" eyebrow, a headline, and a line naming a few authenticator apps. The pairing panel puts a square QR placeholder (a 5-column grid of small rounded squares inside a bordered tile) beside a column holding a "Can't scan it?" hint, the setup key in a monospaced pill with a Copy button, and a six-digit confirmation input with wide letter-spacing. Footer row: a muted Cancel link and a dark "Turn on" button. Below it, a hidden success panel with a green confirmation strip, a grid of one-time backup codes, and a "Copy all codes" button. Then add JavaScript that copies the setup key to the clipboard and flips the button label to "Copied" for a moment, strips non-digits from the confirmation field and keeps the "Turn on" button disabled until six digits are present, and on confirm swaps the pairing panel for the backup-code panel and wires its copy button to put every code on the clipboard as separate lines.
```
