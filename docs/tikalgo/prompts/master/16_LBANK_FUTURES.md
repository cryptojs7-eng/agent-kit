> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 16. فعال‌سازی LBank Futures (پرامپت اجرایی L0 تا L9)

> **به‌روزرسانی (2026-10)، پاسخ رسمی پشتیبانی LBank:** «API LBank برای استفادهٔ تجاری باز نیست. دسترسی API فقط به شرکای سازمانی داده می‌شود و درخواست سازمانی جدید فعلاً پذیرفته نمی‌شود.»
> نتیجه برای این بخش:
> - **L5 (آداپتور خصوصی) متوقف است.** `LBANK_FUTURES_LIVE` باید همیشه false بماند و `liveTrade` در ماتریس قابلیت‌ها هم false است.
> - **LBank فقط به‌عنوان منبع دادهٔ عمومی و PAPER می‌ماند.** قبل از استفادهٔ تجاری از دادهٔ عمومی LBank در محصول (tikalgoai.com)، شرایط استفادهٔ LBank بررسی شود. در صورت ابهام، دادهٔ بازار از منبع دیگری گرفته شود.
> - **«Venue جایگزین فیوچرز» در L6 پیش‌فرض است:** Hyperliquid (غیرمتمرکز، API کامل)، یا CoinEx، BingX، Bybit، OKX یا Bitget بسته به شرایط کاربر. هر venue جایگزین کانکتور، ماتریس قابلیت و تست‌های خودش را دارد.
> - کلید API فعلی LBank کاربرد معاملاتی ندارد و باید غیرفعال یا حذف شود.

> **واقعیت فعلی (بررسی‌شده، 2026-10):** API عمومی قراردادهای LBank (`https://lbkperp.lbank.com`، مسیر `/cfd/openApi/v1/pub/...`) فقط **داده‌ی بازار** می‌دهد: زمان سرور، فهرست قراردادها، تیکر و فاندینگ، و دفتر سفارش. **endpointهای خصوصی** (ثبت و لغو سفارش، پوزیشن، اهرم، حساب) در مستندات عمومی نیستند. CCXT (`lbank`) هم برای swap فقط همین ۴ endpoint عمومی را دارد. امضا: پارامترها مرتب ← MD5 (حروف بزرگ) ← HmacSHA256 یا RSA؛ هدرهای `timestamp`، `signature_method` و `echostr`. **کلیدی که به IP محدود نشده باشد ۳۰ روز اعتبار دارد.**
> منابع: https://www.lbank.com/docs/contract.html · https://docs.ccxt.com/docs/exchanges/lbank

### پرامپت (کامل کپی کنید و به Claude Code بدهید)
```text
طبق CLAUDE.md و docs/state/TIKALGO_STATE.md ادامه بده (کل پروژه را از اول نخوان؛ برای کد از Graphify پرس‌وجو کن).
مأموریت این جلسه: «فعال‌سازی LBank Futures» طبق بخش 16 فایل TIKALGO_MASTER_PROMPT.md، مرحله‌به‌مرحله L0 تا L9.

قوانین بحرانی (بدون استثنا):
- هیچ Mock، Fake Success، Placeholder یا UI بدون Backend. معماری فعلی را حفظ کن. route و auth موجود را نشکن.
- LIVE Trading را فعال نکن. AI و هیچ مسیر دیگری حق دور زدن Risk Engine و Execution Gate را ندارد.
- هیچ endpoint خصوصی را حدس نزن و از endpointهای مخفی وب‌سایت LBank، اسکرپینگ، کوکی یا خودکارسازی مرورگر استفاده نکن.
- فقط از مستندات رسمی استفاده کن: https://www.lbank.com/docs/contract.html و، اگر وجود داشت، فایل docs/vendors/lbank-contract-private.md (مستندات خصوصی‌ای که LBank به ما می‌دهد).
- کلیدها فقط در Vault رمزنگاری‌شده‌ی فعلی؛ هرگز در لاگ، frontend، prompt مدل‌ها یا git.

L0 — بازخوانی: TIKALGO_STATE، NEXT، BACKEND_GAPS و MODULE_MAP را بخوان. کانکتورهای موجود LBank (اسپات و فیوچرز)، نسخه‌ی CCXT، Paper Engine، Risk Engine، Execution Gate و Vault را از گراف پیدا کن.

L1 — Audit واقعی: با curl، endpointهای عمومی getTime، instrument، marketData و marketOrder را روی lbkperp.lbank.com صدا بزن. پاسخ‌های واقعی را در tests/fixtures/lbank_futures/ ذخیره کن (فقط پاسخ واقعی، نه ساختگی). گزارش بده چه چیزی در کد وجود دارد، چه چیزی کار می‌کند و چه چیزی نیست.

L2 — ماتریس قابلیت‌ها: در VenueCapabilities (Super Plan 5.4) برای lbank:futures این را ثبت کن:
  marketData=true، paperTrade=true، liveTrade=false، leverage=false، positions=false، privateWs=false.
  هر قابلیت فقط وقتی true می‌شود که تست واقعی آن پاس شده باشد. UI و Execution Gate فقط از همین ماتریس می‌خوانند.

L3 — آداپتور داده‌ی LBank Futures:
  - REST عمومی (instrument، ticker، فاندینگ، orderbook) و WS عمومی wss://lbkperpws.lbank.com/ws
  - نرمال‌سازی به schema داخلی (symbol، contractSize، tickSize، stepSize، maxLeverage، maintenance margin، fundingRate/nextFundingTime)
  - انتشار روی Event Bus (Redis Streams) و ذخیره در TimescaleDB، مثل بقیه‌ی venueها
  - rate limit، retry با backoff، reconnect و heartbeat برای WS، و هشدار health در صورت قطعی
  - تست‌ها با fixtureهای واقعی L1

L4 — PAPER کامل برای LBank Futures: Paper Engine فعلی با فید قیمت LBank Futures، کارمزد maker/taker (قابل تنظیم)، فاندینگ واقعی، محاسبه‌ی قیمت لیکوییدیشن از مشخصات قرارداد، isolated/cross و اهرم (شبیه‌سازی). همان Risk Engine و همان Execution Gate. تست: باز کردن، بستن، SL/TP، لیکوییدیشن و فاندینگ.

L5 — آداپتور خصوصی پشت Feature Flag (LBANK_FUTURES_LIVE=false به‌صورت پیش‌فرض):
  - فقط لایه‌ی امضا را طبق مستندات رسمی پیاده کن (مرتب‌سازی، MD5 با حروف بزرگ، HmacSHA256 و RSA، هدرهای timestamp، signature_method و echostr)، همراه با unit test
  - اگر docs/vendors/lbank-contract-private.md وجود ندارد: endpointهای خصوصی را پیاده نکن. در BACKEND_GAPS بنویس: «LBank Futures live: در انتظار مستندات و دسترسی رسمی Contract API» و برو به L6.
  - اگر وجود دارد: ثبت و لغو سفارش (market، limit، reduceOnly، SL/TP)، پوزیشن‌ها، تنظیم اهرم و margin mode، موجودی و WS خصوصی را پیاده کن. تست قراردادی با پاسخ‌های نمونه‌ی همان مستند. تست واقعی فقط با تأیید صریح من و با کمترین حجم ممکن. بعد از پاس شدن، قابلیت‌های مربوطه را در ماتریس true کن.

L6 — Execution Gate و مسیر جایگزین:
  - سفارش LIVE به venueای که liveTrade=false دارد ← رد شفاف با کد LBANK_FUTURES_LIVE_UNAVAILABLE و پیام فارسی و انگلیسی (بدون خطای ساکت و بدون موفقیت جعلی)
  - تنظیم کاربر «Venue جایگزین فیوچرز» (پیش‌فرض: خاموش). اگر روشن باشد، Gate پیشنهاد اجرا روی venue جایگزین انتخاب‌شده (Bybit، OKX، Bitget، Binance، Gate، BingX یا Hyperliquid) را با تأیید صریح کاربر می‌دهد. هرگز مسیر سفارش بی‌صدا عوض نمی‌شود.
  - سیگنال‌ها و تحلیل همچنان از داده‌ی LBank Futures استفاده می‌کنند.

L7 — UI تنظیمات کانکتور (Settings → Exchanges → LBank):
  - Badgeهای وضعیت واقعی از ماتریس: Market data: Live · Paper: Active · Live: «در انتظار دسترسی API»
  - فرم کلید API با: فقط مجوز Trade/Read (بدون Withdraw)؛ هشدار اتصال به IP سرور (IP سرور نمایش داده شود)؛ هشدار انقضای ۳۰ روزه برای کلید بدون IP
  - دکمه‌ی Test Connection که درخواست واقعی می‌زند و نتیجه‌ی واقعی را نشان می‌دهد
  - همه‌ی تنظیمات جدا برای PAPER و LIVE (طبق بخش 10)

L8 — امنیت و پایش: رمزنگاری کلید در Vault؛ ماسک در UI؛ یادآوری در روز ۲۵ برای کلید بدون IP؛ لاگ ممیزی هر تغییر کلید و flag؛ هشدار health برای فید داده؛ kill-switch مستقل برای LBank.

L9 — پایان جلسه: build، typecheck، lint و همه‌ی تست‌ها؛ به‌روزرسانی Graphify؛ ذخیره‌ی STATE، NEXT، CHANGELOG_AI، DECISIONS و BACKEND_GAPS؛ deploy و commit (بخش 13)؛ گزارش نهایی به فارسی: چه چیزی واقعاً کار می‌کند (با شواهد تست)، چه چیزی در انتظار LBank است و گام بعدی.
```

### متن درخواست دسترسی Contract API از LBank (برای ارسال به پشتیبانی یا بخش Institutional)
```text
Subject: Request for Futures (Contract) API trading access — TikAlgo

Hello LBank API Team,

We operate TikAlgo (tikalgoai.com), an automated trading platform, and would like to trade
LBank perpetual futures via API. The public contract docs (lbkperp.lbank.com, /cfd/openApi/v1/pub)
only cover market data. Could you please:
1. Enable private Contract API access (order placement/cancel, positions, leverage,
   margin mode, account balance, private WebSocket) for our account (UID: ________);
2. Share the private endpoint documentation and rate limits;
3. Confirm the required key permissions and IP whitelisting (our server IP: ________).

We will use IP-bound keys without withdrawal permission. Thank you.
```

### تست‌های پذیرش
- ماتریس قابلیت‌ها: `liveTrade=false` ← هر سفارش LIVE با رد شفاف (کد و پیام) برگردانده می‌شود؛ UI دکمه‌ی LIVE را غیرفعال و با دلیل نشان می‌دهد
- فید داده: قطع WS ← reconnect و هشدار health؛ داده‌ی کهنه‌تر از آستانه ← سیگنال جدید صادر نمی‌شود
- PAPER: لیکوییدیشن و فاندینگ با مشخصات واقعی قرارداد درست محاسبه می‌شوند
- امضا: unit test با نمونه‌ی مستند پاس می‌شود؛ هیچ secretای در لاگ نیست
- مسیر جایگزین: بدون تأیید کاربر هیچ سفارشی به venue دیگر نمی‌رود
