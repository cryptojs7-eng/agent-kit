# VPS Environment Audit (read-only)

**Date:** 2026-09-01
**Host:** `vm`
**Scope:** Read-only inspection — nothing was installed, modified, started, or stopped.

## System

| # | Item | Finding |
|---|------|---------|
| 1 | **OS / version** | Ubuntu 24.04.4 LTS (Noble Numbat), `x86_64`; kernel `6.18.44-fc-v22` |
| 2 | **CPU / cores** | Intel Xeon @ 2.80GHz — **4 cores** (4 logical, 1 socket, 1 thread/core) |
| 3 | **RAM** | **16 GB total** (`MemTotal` 16,461,068 kB); ~15 GB available; **no swap** (0 B) |
| 4 | **Disk / filesystem** | Root `/` on `/dev/vda` (**ext4**): 252 G size, 7.1 G used, **30 G available (20% used)**. Extra mounts: `/opt/claude-code` (ext4, 90% full), `/opt/env-runner` (ext4, 66%), plus `tmpfs` for `/dev/shm` (16 G) and cgroup. Note: writable space is a fixed per-session allowance, so the 252 G "size" vs 30 G "avail" gap is the quota, not a full disk. |

## Runtimes & tools

| # | Item | Finding |
|---|------|---------|
| 5 | **Python** | **3.11.15** (`/usr/local/bin/python3`, `python` → same); `pip` 24.0 |
| 6 | **Node.js** | **v22.22.2** (`/opt/node22/bin/node`); npm 10.9.7, yarn 1.22.22, pnpm 10.4.1, npx 10.9.7 — all present |
| 7 | **Git** | **2.43.0** (`/usr/bin/git`) |
| 8 | **Docker** | Client **29.3.1** installed — **daemon NOT running** (no `/var/run/docker.sock`) |
| 9 | **PostgreSQL** | Client tools **16.13** installed (`psql`, `pg_isready`, `pg_config`) — **server NOT running** (`pg_isready`: no response on :5432; no `postgres` process) |
| 10 | **Redis** | **7.0.15** installed (`redis-server`, `redis-cli`) — **server NOT running** (`redis-cli ping`: connection refused on :6379; no `redis-server` process) |

## Session context & capabilities

| # | Item | Finding |
|---|------|---------|
| 11 | **Working directory** | `/home/user/agent-kit` |
| 12 | **Current user** | **root** (`uid=0(root) gid=0(root)`); `HOME=/root` |
| 13 | **Internet** | Outbound HTTPS goes through an **allowlisting proxy** (`HTTPS_PROXY=http://127.0.0.1:39071`). `api.github.com` → **HTTP 200 (reachable)**; `example.com` → **403 CONNECT tunnel failed (blocked by proxy policy)**. Connectivity works, but only for allowlisted hosts. |
| 14 | **Shell execution** | **Yes** — working (`/usr/bin/bash`) |
| 15 | **File read/write** | **Yes** — verified a write + read + cleanup round-trip in the scratchpad dir |

## Project (item 16)

`/home/user/agent-kit` is a **pnpm TypeScript monorepo** ("agent-kit"). Top-level entries:

```
.cursor/            docs/               package.json
.git/               packages/           pnpm-lock.yaml
.gitignore          LICENSE             pnpm-workspace.yaml
config.toml.example README.md           tsconfig.base.json
                    SECURITY.md
```

- **Git:** branch `claude/vps-environment-audit-508m54`, HEAD `2ee2d6b` ("fix: 4 security and correctness bugs from exploration testing"), remote `github.com/cryptojs7-eng/agent-kit`.
- **Layout:** source under `packages/`, docs under `docs/`, shared TS config in `tsconfig.base.json`, example config in `config.toml.example`.

## Summary

A 4-core / 16 GB Ubuntu 24.04 container running as root with ample free disk. Python 3.11, Node 22 (+pnpm/yarn), and Git are ready to use. Docker, PostgreSQL, and Redis are **installed but their daemons are not running**. Shell execution and file I/O both work; internet is available only through an allowlisting proxy (GitHub reachable, general web hosts such as example.com blocked).
