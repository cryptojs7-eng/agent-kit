> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 12. دانش تریدرها و شرکت‌های حرفه‌ای در اسکیل‌ها و AI آفلاین (قابل افزودن و به‌روزرسانی)

### 12.1 بسته‌های دانش (Knowledge Skills)
**ساختار:**
```
skills/knowledge/<pack>/
  SKILL.md        # خلاصه‌ی روش، قوانین قابل اجرا، شرایط کاربرد و ضدشرایط
  rules.yaml      # قوانین قطعی قابل بک‌تست
  sources.md      # منابع (کتاب، مقاله یا وب‌سایت) با ارجاع؛ فقط خلاصه و برداشت خودمان
  eval/           # دیتاست و نتایج بک‌تست و paper
  manifest.json   # version, license, can_trade=false
```

**بسته‌های اولیه** (خلاصه‌ی روش‌های شناخته‌شده، **نه کپی متن کتاب‌ها**):
| بسته | منبع دانش |
|---|---|
| wyckoff-vsa | روش Wyckoff و Volume Spread Analysis |
| market-profile-volume-profile | Market Profile (Steidlmayer)، POC و Value Area |
| order-flow-footprint | Delta، CVD، Absorption و Imbalance |
| ict-smc | Order Block، FVG، نقدینگی و Kill Zones |
| price-action | ساختار بازار، کندل‌ها و سطوح |
| trend-following-turtle | سیستم‌های شکست و روندی (Turtle، Donchian) |
| momentum-growth | روش‌های رشد و مومنتوم (CAN SLIM و SEPA، به‌صورت خلاصه) |
| stage-analysis | تحلیل مراحل بازار (Weinstein) |
| elder-triple-screen | سیستم سه‌صفحه‌ای |
| elliott-harmonic | الیوت و الگوهای هارمونیک |
| macro-intermarket | روابط بین‌بازاری، DXY، بازده اوراق، طلا و نفت |
| risk-kelly-sizing | مدیریت ریسک، Kelly و Volatility Targeting |
| quant-factors | فاکتورها (Momentum، Value، Carry و Low-Vol) از **مقالات عمومی** شرکت‌های تحقیقاتی کوانت (مثل AQR و Man Group) و ادبیات دانشگاهی |
| legendary-traders | فلسفه و پرسش‌های کلیدی تریدرهای مشهور (Livermore، Soros، Buffett، Simons)؛ الگو: [trading-skills](https://github.com/VictorVVedtion/trading-skills) |

> ⚖️ **کپی‌رایت:** متن کامل کتاب‌ها یا گزارش‌های پولی را وارد سیستم نکنید. فقط خلاصه، قوانین استخراج‌شده و ارجاع، یا منابع با مجوز عمومی (مقاله‌های آزاد و مستندات رسمی) قابل استفاده‌اند.

### 12.2 اتصال به AI آفلاین (RAG محلی)
- embedding محلی با `nomic-embed-text` از طریق Ollama ← ذخیره در **pgvector** ← بازیابی دانش مرتبط با «سبک + رژیم + نماد» قبل از هر تصمیم Reasoning
- **مدل تصمیم همان مدل انتخاب‌شده در بخش ۱۵ است (Jev، آفلاین یا ابری).** دانش به‌عنوان **شاهد و زمینه** به Reasoning model و Critic داده می‌شود، نه به‌عنوان دستور معامله.
- درس‌های ژورنال خودمان هم در همین حافظه ذخیره و بازیابی می‌شوند (M25).

### 12.3 افزودن و به‌روزرسانی دانش و اسکیل (از UI)
- **Settings → Skills & Knowledge:** آپلود یا ویرایش بسته (Markdown و YAML)، نسخه‌ی جدید، مقایسه‌ی نسخه‌ها (diff) و Rollback
- **چرخه‌ی ارتقا:** `draft → indexed → backtested → paper → approved`. فقط نسخه‌ی approved در تصمیم‌ها استفاده می‌شود.
- **افزودن مدل جدید:** ثبت در Model Registry (Ollama یا ابری)، بنچمارک روی دیتاست ارزیابی، و ارتقا فقط با تأیید
- **پرامپت:**
```text
ADD/UPDATE KNOWLEDGE PACK "<name>": create/update skills/knowledge/<name>/ (SKILL.md, rules.yaml,
sources.md with citations — summaries only, no copyrighted full text, manifest can_trade=false),
embed into pgvector via local Ollama embeddings, backtest rules.yaml where applicable, run paper
evaluation, show diff vs previous version, and require my approval to activate. Persian report.
```
