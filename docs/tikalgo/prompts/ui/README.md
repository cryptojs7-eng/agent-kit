# UI component prompts (Tailwind CSS)

Ready-to-use prompts for UI components in different parts of TIKALGO. Each file contains:
- the original prompt;
- where in the product it is used.

## TIKALGO adaptation rules (paste after any prompt below)
```text
Adapt this component to TIKALGO:
- Use the brand tokens from docs/tikalgo/brand/README.md: --brand-bg #0A1712, --brand-green #3DDC2F,
  --brand-orange #FF7A1A (AI accents only), --down #F6465D; light + dark theme; minimal SaaS style.
- Support RTL (Persian) and LTR (English): use logical utilities (ms-/me-/ps-/pe-, start/end), the project's
  FA/EN fonts, and Persian digits where the UI language is Persian.
- Accessibility: labels, aria attributes, visible focus rings, keyboard support, 44px touch targets on mobile.
- Mobile-first and responsive; respect prefers-reduced-motion for animations.
- Reuse existing components/design system in the repo; do not duplicate.
- Demo values are allowed ONLY in a standalone prototype. In the product, bind every number to the real API —
  no mock data, no fake success (MASTER_PROMPT rules).
- Security for auth screens: rate limits and server-side verification; never trust client-side checks alone.
```

## Index
| File | Component | Area | Where in TIKALGO |
|---|---|---|---|
| [`01_OTP_VERIFICATION.md`](./01_OTP_VERIFICATION.md) | OTP verification screen | `auth` | Login 2-step code, withdrawal / API-key confirmation, LIVE-mode activation confirmation |
| [`02_TWO_FACTOR_SETUP_QR.md`](./02_TWO_FACTOR_SETUP_QR.md) | Two-factor setup with QR | `auth` | Settings → Security → 2FA enrolment (TOTP) and backup codes |
| [`03_EMAIL_VERIFICATION_WAIT.md`](./03_EMAIL_VERIFICATION_WAIT.md) | Email verification waiting screen | `auth` | After signup, before the account is activated |
| [`04_TRIAL_SIGNUP.md`](./04_TRIAL_SIGNUP.md) | Trial signup page | `landing` | Landing → "Start free trial" for the paid plans |
| [`05_REGIONAL_PRICING.md`](./05_REGIONAL_PRICING.md) | Regional pricing section | `landing` | Plans page; currency selector (add a USDT row if crypto payment is offered) |
| [`06_STATS_BLOCK_DARK.md`](./06_STATS_BLOCK_DARK.md) | Dark stats block | `landing` | Landing hero metrics (e.g. signals generated, markets covered) — real numbers only |
| [`07_STATS_SPARKLINE_CARDS.md`](./07_STATS_SPARKLINE_CARDS.md) | Stats cards with CSS sparklines | `dashboard` | Portfolio / PAPER performance summary cards |
| [`08_GOALS_PROGRESS.md`](./08_GOALS_PROGRESS.md) | Goals progress block | `dashboard` | Monthly targets: max drawdown, profit target, trade count discipline |
| [`09_GAUGE_ROW.md`](./09_GAUGE_ROW.md) | Gauge row (SVG rings) | `dashboard` | Self-diagnostics / TIKALGO AI health: data, model, decision health |
| [`10_LEADERBOARD.md`](./10_LEADERBOARD.md) | Leaderboard | `community` | Copy-trading / strategy leaderboard, paper-trading competitions |
| [`11_LIVE_ACTIVITY_STRIP.md`](./11_LIVE_ACTIVITY_STRIP.md) | Live activity strip | `landing` | Landing "live" band: events processed, markets online — bind to real metrics |
| [`12_SURVEY_RESULTS.md`](./12_SURVEY_RESULTS.md) | Survey results block | `research` | User feedback / sentiment poll results |
| [`13_ENVIRONMENTAL_IMPACT.md`](./13_ENVIRONMENTAL_IMPACT.md) | Environmental impact panel | `optional` | Optional (ESG page). Low priority for TIKALGO |
| [`14_MOBILE_BOTTOM_NAV.md`](./14_MOBILE_BOTTOM_NAV.md) | Mobile bottom navigation | `mobile` | Mobile app/PWA tab bar (Home, Markets, Trade[+], AI Signals, Profile) — matches the UI spec |
| [`15_ANALYTICS_OVERVIEW.md`](./15_ANALYTICS_OVERVIEW.md) | Analytics overview panel | `dashboard` | Admin analytics / user PnL analytics with 24h–90d ranges |
| [`16_TEAM_ADMIN.md`](./16_TEAM_ADMIN.md) | Team administration panel | `admin` | Admin → users & roles (Owner/Admin/Editor/Viewer → map to TIKALGO roles) |
| [`17_CLOUD_COST_DASHBOARD.md`](./17_CLOUD_COST_DASHBOARD.md) | Cloud / infrastructure cost dashboard | `admin` | Admin → server, data-feed and API costs vs budget |
