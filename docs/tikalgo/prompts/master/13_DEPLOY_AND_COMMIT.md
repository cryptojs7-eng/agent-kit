> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 13. استقرار و کامیت در پایان هر جلسه (اجباری)

> طبق خواسته‌ی شما: **هر جلسه بعد از اتمام کار، کامیت و دیپلوی می‌شود.**

```text
DEPLOY & COMMIT (end of every session, after SAVE STATE):
1) Gates: all tests, build, typecheck and lint green; DB migrations reviewed and backward-
   compatible; no secrets in diff (gitleaks).
2) Backup: DB snapshot + current image tags recorded (for rollback).
3) Commit with a clear message and push to the project repository/branch.
4) Deploy: build images → deploy to STAGING → smoke tests (health endpoints, login → terminal,
   paper order path) → deploy to PRODUCTION with the same images → post-deploy smoke tests.
5) If any smoke test fails: automatic rollback to the previous images (and migration rollback
   if safe), then report.
6) NEVER as part of deploy: enable LIVE trading, set RUNTIME_ENABLED, change firewall/secrets,
   or drop data — those still need my explicit "OK".
7) Persian report: commit hash, deployed version, smoke-test results, rollback status.
```

---
