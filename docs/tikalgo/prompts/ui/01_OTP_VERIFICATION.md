# OTP verification screen

| | |
|---|---|
| **Area** | `auth` |
| **Where in TIKALGO** | Login 2-step code, withdrawal / API-key confirmation, LIVE-mode activation confirmation |
| **Before using** | Read [`README.md`](./README.md) → "TIKALGO adaptation rules" and paste them after the prompt |

## Prompt (original)
```text
Build an OTP verification screen with Tailwind CSS. Centered card explaining a 6-digit code was sent to an email. Show six separate square inputs (size-12, text-center, large font) in a row, an active-state focus ring, a "Verify" button, and a muted line "Didn't get it? Resend in 0:30". Keep it clean and centered. Then add JavaScript for the behaviour people expect from a real code field: advance to the next box as each digit is typed, step back on Backspace from an empty box, move with the arrow keys, spread a pasted 6-digit code across all six boxes at once, strip anything that is not a digit, keep the Verify button disabled until all six are filled, and run the resend line down from 0:30 to a live "Resend code" button.
```
