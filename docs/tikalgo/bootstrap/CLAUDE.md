# TikAlgo — Claude Code Project Memory

## Session protocol (MANDATORY — do not re-read the whole repo)
1. Read ONLY, in order:
   - `CLAUDE.md` (this file)
   - `docs/state/TIKALGO_STATE.md`
   - `docs/state/NEXT.md`
   - `graphify-out/GRAPH_REPORT.md`
   - last entry of `docs/state/CHANGELOG_AI.md`
2. For code details, query the Graphify knowledge graph (`/graphify`) and open only the files
   it points to. If files changed since the last graph build, run an incremental update first.
3. Continue from `docs/state/NEXT.md`. Report to the user in **Persian**.
4. Before ending: run the SAVE STATE procedure (§7 of `docs/TIKALGO_MASTER_PROMPT.md`).

## References
- Architecture: `docs/TIKALGO_SUPER_PLAN.md` (modules M01–M50, phases, gates, DoD)
- Prompts & specs: `docs/TIKALGO_MASTER_PROMPT.md` (AI Active Signals S1–S14 in §5, Terminal UI T0–T11 in §5T)
- Backend gaps found by UI work: `docs/state/BACKEND_GAPS.md`
- Audit: `docs/state/AUDIT_REPORT_FA.md` · Plan: `docs/state/UPGRADE_PLAN_FA.md`
- Module map: `docs/state/MODULE_MAP.md` · Decisions: `docs/state/DECISIONS.md`
- External pattern references (read-only, outside repo): `/root/tikalgo-refs/`

## Hard rules (summary — full text in MASTER_PROMPT §2.1)
- Existing-first: never rewrite or delete healthy features; extend existing modules.
- No mocks, placeholders, fake success, or UI without a real backend.
- AI never sends orders and never bypasses Risk/Execution Gate. AI may only TIGHTEN stops.
- PAPER default. Never enable LIVE. LIVE_AUTO needs explicit user confirmation + all gates.
- TypeSafe/Jev = DECISION model (not chat). Model roles routed via 9router; Ollama = local
  reasoning/fallback (127.0.0.1 only).
- All settings DB-backed and editable in Settings (no .env/code changes for users).
- Secrets encrypted at rest, masked in UI, redacted in logs, never sent to frontend or AI.
- License check before adopting external code; freqtrade (GPL) = ideas only.
- Destructive/production actions require explicit user "OK".
- Status vocabulary: ✅ VERIFIED · ⚠️ REQUIRES CREDENTIAL · ⚠️ REQUIRES USER ACTION · ❌ FAILED · ⏳ NOT IMPLEMENTED
