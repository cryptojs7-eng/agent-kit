> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 3. فاز A — بررسی کامل پروژه‌ی فعلی و گزارش (یک بار)

```text
PHASE A — FULL AUDIT (read-only for application code).
Using the Graphify graph (open files only as needed), inspect and document:
- Repo tree, services, docker-compose topology, CI, test suite (run it, record results).
- PostgreSQL schema & migrations; Redis keys/streams/pubsub; WebSocket channels.
- Market data ingestion & freshness (incl. runtime_stale history).
- Scanner, AI layer (llm_engine, 9router routing, TypeSafe/Jev integration and how it is
  currently used — decision vs chat), Signals, Watchlist, Strategies (CRUD? storage?),
  Risk Engine (rules, where enforced), Position sizing, Paper vs Live separation, Orders,
  Positions, TP/SL, Breakeven, Trailing, Partial close, exit_advisor, Journal/Performance,
  Settings storage, Exchange adapters & their real capabilities (min qty/step/tick/min
  notional/leverage/margin/order types), credential storage & encryption.
- Frontend: existing AI/Signals/Scanner/Watchlist/Positions screens and which are backed by
  real APIs vs static.
- Security quick-scan (gitleaks, plaintext keys, exposed ports, unknown cron/systemd —
  server was compromised on 2026-09-13).
Produce:
- docs/state/AUDIT_REPORT_FA.md (Persian): per area → status (✅/⚠️/❌/⏳), evidence (file
  paths, endpoints, tests), gaps, bugs, risks.
- docs/TIKALGO_ARCHITECTURE_BASELINE.md with Mermaid diagrams of the CURRENT pipeline.
- Update docs/state/TIKALGO_STATE.md and MODULE_MAP.md.
No application code changes. Report in Persian and wait.
```
