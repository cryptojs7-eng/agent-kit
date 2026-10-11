> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 8. پرامپت‌های کمکی

**بازبینی امنیت و ایمنی معاملاتی یک تغییر**
```text
Review the current diff for: secret leaks, AI path that can reach orders without the
Execution Gate, any risk-increasing SL change, PAPER/LIVE leakage, missing idempotency,
repainting/lookahead in features, unvalidated input, license problems. Persian report by severity.
```

**افزودن یک استراتژی یا اسکیل جدید**
```text
Add strategy/skill "<name>" using the existing Strategy CRUD (S2) and skill manifest
(can_trade=false). Backtest/paper evaluate it, store results, do not activate for LIVE.
Persian report + Save State.
```

**طراحی یک صفحه**
```text
Using UI/UX Pro Max and docs/design/DESIGN_SYSTEM.md, design then implement <screen> for
mobile (bottom tab bar) and desktop, FA/EN RTL, dark/light, all states, wired to real APIs only.
```
