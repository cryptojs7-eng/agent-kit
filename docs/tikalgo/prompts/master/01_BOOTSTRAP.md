> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 1. BOOTSTRAP — یک بار برای همیشه

### 1.1 نصب ابزارها (روی سرور، در `/root/tikalgo`)

```bash
cd /root/tikalgo

# --- Graphify: گراف دانش کد (حافظه‌ی ساختاری پروژه) ---
uv tool install graphifyy          # یا: pipx install graphifyy   (نام پکیج با دو y)
graphify install                   # اسکیل /graphify و هوک‌های Claude Code را نصب می‌کند (اول تنظیماتش را بخوانید)

# --- UI/UX Pro Max (اگر هنوز نصب نیست؛ v2.13.0 قبلاً نصب شده) ---
# داخل Claude Code:
#   /plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
#   /plugin install ui-ux-pro-max@ui-ux-pro-max-skill

# --- AI آفلاین (Ollama) ---
curl -fsSL https://ollama.com/install.sh | sh
# فقط روی localhost گوش بدهد (امنیت): در systemd مقدار OLLAMA_HOST=127.0.0.1:11434 را تنظیم کنید
sudo systemctl edit ollama   # [Service] Environment="OLLAMA_HOST=127.0.0.1:11434"
sudo systemctl restart ollama
# مدل‌ها (بسته به RAM/GPU سرور یکی را انتخاب کنید):
ollama pull qwen2.5:7b-instruct        # عمومی و سبک (~5GB)؛ برای Reasoning یا Fallback
ollama pull llama3.1:8b                # جایگزین
ollama pull nomic-embed-text           # embedding برای RAG، حافظه و ژورنال
# تست:
curl -s http://127.0.0.1:11434/api/tags
```

> ⚠️ **Ollama را هرگز روی اینترنت باز نکنید.** پورت 11434 فقط روی 127.0.0.1 یا شبکه‌ی داخلی Docker باشد. اگر سرور GPU ندارد، مدل‌های ۷ و ۸ میلیارد پارامتری روی CPU کندند (چند ثانیه برای هر پاسخ). مدل‌های Ollama هم برای توضیح، Reasoning، دستیار تیکا و embedding استفاده می‌شوند و هم **می‌توانند به‌عنوان مدل تصمیم آفلاین** انتخاب شوند (بخش ۱۵). برای تصمیم لحظه‌ای روی CPU، مدل کوچک‌تر یا timeout مناسب تنظیم کنید. Jev یکی از گزینه‌های تصمیم است.

### 1.2 اسکیل‌ها و مراجع (فقط مطالعه یا اقتباس؛ هیچ اسکیلی مستقیم در production نصب نمی‌شود)
```bash
mkdir -p /root/tikalgo-refs && cd /root/tikalgo-refs
git clone --depth 1 https://github.com/buberlo/jev-trader          # MIT
git clone --depth 1 https://github.com/zadescoxp/Jev-Trades         # Apache-2.0
git clone --depth 1 https://github.com/Jev-trading/Jev-trading      # MIT
git clone --depth 1 https://github.com/naimkatiman/alpha-scanner    # MIT
git clone --depth 1 https://github.com/Manjussha/AI-trader          # MIT
git clone --depth 1 https://github.com/freqtrade/freqtrade          # GPL-3.0 → فقط ایده، کد کپی نشود
git clone --depth 1 https://github.com/agiprolabs/claude-trading-skills
git clone --depth 1 https://github.com/TauricResearch/TradingAgents
```
> `tikalgo-refs` **خارج از مخزن** است تا کد بیرونی وارد پروژه نشود. Claude Code فقط الگوها را می‌خواند.

### 1.3 پرامپت Bootstrap (یک بار به Claude Code بدهید)
```text
BOOTSTRAP (one-time). Goal: create a permanent project memory so future sessions never
re-read the whole repository.

1) Run /graphify on /root/tikalgo to build the knowledge graph (outputs in graphify-out/).
   Exclude node_modules, .venv, dist, build, data dumps and secrets (.env*).
2) Create/merge these files (copy templates from docs/tikalgo/bootstrap/ if present; if a
   CLAUDE.md already exists, MERGE — never delete existing instructions):
   - CLAUDE.md (root): session protocol + hard rules + where state lives.
   - docs/state/TIKALGO_STATE.md: single source of truth for current status (modules, phase,
     what works, what is broken, credentials needed, last verified tests, open risks).
   - docs/state/NEXT.md: the exact next step(s) with acceptance criteria.
   - docs/state/DECISIONS.md: append-only log of architectural decisions (ADR-lite).
   - docs/state/CHANGELOG_AI.md: append-only log of every session (date, phase, files, tests).
   - docs/state/MODULE_MAP.md: module → paths → owners → tests → health endpoint
     (generated from the Graphify graph; keep it short, link to graph nodes).
3) Copy docs/tikalgo/TIKALGO_SUPER_PLAN.md and this prompt file into docs/ if missing.
4) Do NOT change application code during bootstrap. Commit only docs/state, CLAUDE.md and
   graphify config (never commit secrets or large graph artifacts if they contain secrets).
5) Report in Persian: what was created, graph stats, and confirm the resume protocol works by
   simulating a fresh session (read only the state files + GRAPH_REPORT and summarize).
```
