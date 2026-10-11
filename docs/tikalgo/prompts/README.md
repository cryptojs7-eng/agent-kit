# TIKALGO prompt library

All TIKALGO prompts as separate Markdown files, so each part of the project can use its own prompt.

| Folder | What it contains | Source of truth |
|---|---|---|
| [`master/`](./master/) | One file per section of the executable master prompt (bootstrap, resume, phases, catalogs, LBank, TIKALGO AI …) | [`../TIKALGO_MASTER_PROMPT.md`](../TIKALGO_MASTER_PROMPT.md). Regenerate with `python3 split_master.py` |
| [`briefs/`](./briefs/) | The project owner's original briefs, verbatim, each with a link to its executable prompt/spec | These files |
| [`ui/`](./ui/) | Tailwind UI component prompts (built versions: [`../ui-kit/`](../ui-kit/), see `ui-kit/INSTALL.md`) with "where in TIKALGO" and adaptation rules | These files |
| [`ops/`](./ops/) | Operational templates: LBank emails, Claude Code permissions, API-key removal | These files |

Related:
- **Spec:** [`../strategy/TIKALGO_QUANT_INTELLIGENCE_AND_TAMRS.md`](../strategy/TIKALGO_QUANT_INTELLIGENCE_AND_TAMRS.md) (Parts I–VII).
- **Avatar image brief:** [`../brand/tika/PHOTO_PROMPT.md`](../brand/tika/PHOTO_PROMPT.md).

## Recommended order (Claude Code on the server, `/root/tikalgo`)
| Step | When | File |
|---|---|---|
| 1 | Once | [`master/01_BOOTSTRAP.md`](./master/01_BOOTSTRAP.md) |
| 2 | Start of every session | [`master/02_RESUME_SESSION.md`](./master/02_RESUME_SESSION.md) |
| 3 | Once | [`master/03_PHASE_A_AUDIT.md`](./master/03_PHASE_A_AUDIT.md) → [`master/04_PHASE_B_COMPARE_PLAN.md`](./master/04_PHASE_B_COMPARE_PLAN.md) |
| 4 | Signals | [`master/05_PHASE_C_AI_ACTIVE_SIGNALS.md`](./master/05_PHASE_C_AI_ACTIVE_SIGNALS.md) (brief: [`briefs/01_AI_ACTIVE_SIGNALS.md`](./briefs/01_AI_ACTIVE_SIGNALS.md)) |
| 5 | Terminal UI | [`master/05T_PHASE_T_TERMINAL_UI.md`](./master/05T_PHASE_T_TERMINAL_UI.md) (brief: [`briefs/02_TERMINAL_UI.md`](./briefs/02_TERMINAL_UI.md)) + [`ui/`](./ui/) components |
| 6 | Quant intelligence + TIKALGO AI | [`master/17_QUANT_INTELLIGENCE_TIKALGO_AI.md`](./master/17_QUANT_INTELLIGENCE_TIKALGO_AI.md): Q0 → Q19, then C0 → C10 (briefs 03–07) |
| 7 | Super-project modules | [`master/06_PHASE_D_SUPER_PROJECT.md`](./master/06_PHASE_D_SUPER_PROJECT.md) |
| 8 | End of every session | [`master/07_SAVE_STATE.md`](./master/07_SAVE_STATE.md) + [`master/13_DEPLOY_AND_COMMIT.md`](./master/13_DEPLOY_AND_COMMIT.md) |

## By project area
| Area | Files |
|---|---|
| Signals & strategy | `master/05`, `master/17`, `briefs/01`, `briefs/03`, `briefs/04` |
| TIKALGO AI (decision engine) | `master/15`, `master/17`, `briefs/05`, `briefs/06` |
| Cognitive core | `master/17` (C0–C10), `briefs/07` |
| Exchanges & connectors | `master/09`, `master/16`, `ops/LBANK_SUPPORT_EMAILS.md` |
| Settings (PAPER/LIVE) | `master/10` |
| Frontend / terminal / mobile | `master/05T`, `briefs/02`, `ui/*` |
| Auth & security UI | `ui/01`, `ui/02`, `ui/03` |
| Landing & pricing | `ui/04`, `ui/05`, `ui/06`, `ui/11` |
| Dashboards & admin | `ui/07`–`ui/10`, `ui/15`–`ui/17` |
| Tika assistant & brand | `master/14`, `briefs/08`, `../brand/` |
| Knowledge, vendoring, projects | `master/11`, `master/12`, `master/Z` |
| Server / Claude Code ops | `ops/CLAUDE_CODE_PERMISSIONS.md` |

> Every prompt for the server assumes the master rules:
> - no mock data, no fake success;
> - keep the existing architecture;
> - LIVE OFF by default;
> - the AI never bypasses the Risk Engine or the Execution Gate;
> - report in Persian.
