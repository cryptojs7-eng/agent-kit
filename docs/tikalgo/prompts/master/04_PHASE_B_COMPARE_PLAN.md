> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 4. فاز B — مقایسه با پرامپت و برنامه‌ی ارتقا (یک بار)

```text
PHASE B — GAP ANALYSIS & UPGRADE PLAN.
Compare AUDIT_REPORT_FA.md against (1) section 5 of docs/TIKALGO_MASTER_PROMPT.md (AI Active
Signals S1–S14) and (2) docs/TIKALGO_SUPER_PLAN.md (M01–M50).
Also study ONLY the patterns in /root/tikalgo-refs (see §5.0 pattern map) — never copy GPL code.
Produce docs/state/UPGRADE_PLAN_FA.md (Persian):
- Gap matrix: requirement → existing component to reuse → change needed → risk → tests.
- Ordered work packages for S1–S14 sized to fit one session each, with acceptance criteria,
  DB migrations needed, API contracts, UI screens, and feature flags.
- Explicit list of what will NOT be touched (healthy features).
Update docs/state/NEXT.md with S1. Wait for my approval before writing code.
```
