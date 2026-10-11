> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 7. SAVE STATE — پایان هر جلسه (اجباری)

```text
SAVE STATE. Before ending:
1) Run an incremental Graphify update so graphify-out/ reflects today's changes.
2) Update docs/state/TIKALGO_STATE.md (status table per module with ✅/⚠️/❌/⏳ + evidence),
   docs/state/NEXT.md (exact next sub-phase + acceptance criteria),
   append docs/state/CHANGELOG_AI.md (date, phase, files changed, migrations, tests + results),
   append docs/state/DECISIONS.md (any architectural decision).
3) Commit docs/state + code changes with a clear message (no secrets).
4) Run DEPLOY & COMMIT (§13): push, staging → smoke tests → production → smoke tests,
   automatic rollback on failure.
5) Give me a short Persian summary: done / verified / deployed version / blocked / next.
```
