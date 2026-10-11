# AI Active Signals (S1–S14)

| | |
|---|---|
| **Area** | Signal engine / AI Signals page |
| **Executable version / spec** | MASTER §5 |
| **Use** | Original brief (as written by the project owner). For Claude Code on the server, prefer the executable prompt in `TIKALGO_MASTER_PROMPT.md`, which adds the safety rules, phases and reporting format. |

---

در "/root/tikalgo" بخش AI Active Signals را به‌صورت کامل و واقعی تکمیل کن؛ فقط UI نساز و از معماری فعلی پروژه استفاده کن. هیچ قابلیت سالمی را حذف/بازنویسی نکن و هیچ Mock/Placeholder نساز.

قبل از تغییر، معماری فعلی را بررسی کن و از ماژول‌های موجود استفاده کن:
AI / Scanner / Watchlist / Strategies / Risk / Paper-Live / Orders / Positions / TP-SL / Trailing / Redis / PostgreSQL / WebSocket / 9router / TypeSafe-Jev / Exchange adapters.

برای معماری، این پروژه‌ها را بررسی و فقط الگوهای مناسب را اقتباس کن:

- https://github.com/buberlo/jev-trader
- https://github.com/zadescoxp/Jev-Trades
- https://github.com/Jev-trading/Jev-trading
- https://github.com/naimkatiman/alpha-scanner
- https://github.com/freqtrade/freqtrade
- https://github.com/Manjussha/AI-trader

هدف:

MARKET DATA
→ SCANNER
→ TECHNICAL/SMC/ICT/OI/FUNDING/CVD/LIQUIDITY/NEWS/WHale
→ AI
→ SIGNAL
→ WATCHLIST
→ STRATEGY
→ RISK
→ POSITION SIZE
→ PAPER/LIVE GATE
→ ORDER
→ POSITION MANAGER
→ TP/SL
→ BREAKEVEN
→ TRAILING
→ PARTIAL CLOSE
→ EXIT
→ JOURNAL/PERFORMANCE

1. AI SIGNALS

Signal schema واقعی ایجاد/تکمیل کن:

symbol, market, exchange, timeframe, strategy, style, direction, signal_type, confidence, probability, entry, SL, TP1/TP2/TP3, RR, risk, AI model, reasoning, MTF confluence, status, expiry.

States:
DETECTED / VALIDATED / WATCHLIST / READY / EXECUTED / MANAGED / CLOSED / EXPIRED / REJECTED.

2. USER CONTROLS

از UI امکان انتخاب/تغییر بده:

Trading Style:
SCALPING / INTRADAY / SWING / POSITION / MOMENTUM / TREND / BREAKOUT / SMC / ICT / ORDER FLOW / HYBRID / CUSTOM

Timeframe:
1m/3m/5m/15m/30m/1h/2h/4h/6h/12h/1D/1W/1M

Primary + Confirmation TFs

Strategy:
انتخاب استراتژی موجود + Create/Edit/Clone/Delete/Import/Export/Activate

AI:
Default Model / Signal Model / Decision Model / Reasoning Model / Fallback Model

TypeSafe/Jev را به‌عنوان DECISION MODEL نگه دار، نه Chat Model.

3. AI MARKET SCANNER

اسکنر را به AI Scanner واقعی متصل کن.

فیلترها:
market/exchange/symbol/timeframe/style/strategy/model/confidence/RR/risk.

خروجی:
LONG / SHORT / HOLD / WATCH

با دلیل سیگنال و امتیازهای:
Technical / MTF / SMC-ICT / OrderFlow / OI / Funding / Liquidity / Whale / News / Fundamental / AI.

سیگنال معتبر را خودکار به:

AI SIGNAL WATCHLIST

ارسال کن.

Watchlist:
ADD / REMOVE / PIN / MUTE / SNOOZE / APPROVE / REJECT / TRADE

با کلیک روی سیگنال، چارت و Entry/SL/TP/Invalidation نمایش داده شود.

4. AI RECOMMENDATIONS

یک بخش AI Insights بساز که پیشنهادهای بازار را نمایش دهد، ولی پیشنهاد را با معامله قطعی اشتباه نگیرد.

5. CAPITAL & RISK

اگر حساب Broker/Exchange متصل است، موجودی واقعی را از API بخوان:

equity / available balance / margin / buying power.

Position size فقط توسط Risk Engine محاسبه شود:

equity + risk% + entry + SL + fees + slippage + leverage + exchange limits.

قابلیت تنظیم:

risk/trade
max daily loss
max drawdown
max positions
max exposure
max leverage
correlation limits.

AI اجازه عبور از Risk Engine ندارد.

6. PAPER/LIVE

Modes:

PAPER
LIVE

و AI:

OFF
SIGNAL ONLY
AI CONFIRMATION
SEMI-AUTO
PAPER AUTO
LIVE AUTO

PAPER پیش‌فرض باشد.

LIVE AUTO فقط با تأیید صریح کاربر و عبور از تمام Gateها:

broker connected
credentials valid
trade permission
balance/margin
active strategy
risk profile
fresh market data
healthy AI
healthy risk engine
healthy execution engine.

7. EXECUTION

AI مستقیماً order ارسال نکند.

AI فقط structured decision بدهد.

Execution Gate:

SIGNAL
→ STRATEGY VALIDATION
→ ACCOUNT VALIDATION
→ RISK
→ POSITION SIZE
→ ORDER VALIDATION
→ PAPER/LIVE
→ EXCHANGE

Exchange capabilityها را رعایت کن:
min qty / step / tick / min notional / leverage / margin / order type.

8. POSITION MANAGEMENT

بعد از ورود:

TP1/TP2/TP3
Partial Close
Breakeven
Trailing Stop
AI Position Review
Exit

Trailing modes:

FIXED
ATR
STRUCTURE
BREAKEVEN_THEN_TRAIL
AI-SUGGESTED-BUT-RISK-VALIDATED

AI فقط اجازه Tighten کردن SL را داشته باشد؛ افزایش ریسک ممنوع مگر strategy/risk صراحتاً اجازه دهد.

AI position actions:

HOLD
TIGHTEN_STOP
TAKE_PARTIAL
EXIT
NO_CHANGE

9. RECOVERY

پس از restart، positions/orders/SL/TP/trailing state را از DB و Exchange reconcile کن و از duplicate orders جلوگیری کن.

10. UI

صفحه/پنل حرفه‌ای:

AI SIGNALS
AI MARKET SCANNER
AI WATCHLIST
AI INSIGHTS
ACTIVE POSITIONS

فیلتر و sort بر اساس:
market / exchange / style / strategy / timeframe / AI model / confidence / RR / status.

11. SETTINGS

تمام موارد بالا باید از Settings قابل تغییر باشند و به ".env" یا تغییر کد نیاز نداشته باشند.

12. SECURITY

API keys/private keys را encrypted ذخیره کن، masked نمایش بده و هرگز در frontend/log/database plaintext قرار نده.

AI به credentials دسترسی نداشته باشد.

13. TEST

End-to-end واقعی:

Scanner → AI → Signal → Watchlist → Strategy → Risk → Position Size → Paper Order → Position → TP/SL → Breakeven → Trailing → Exit → Journal.

LIVE را فقط بدون ارسال سفارش واقعی تست کن و مطمئن شو Gateها در شرایط نامعتبر آن را BLOCK می‌کنند.

14. FINAL AUDIT

در پایان گزارش بده:

AI Signals
Scanner
Watchlist
Strategies
AI Models
TypeSafe/Jev
Risk
Position Sizing
Paper
Live Gate
Execution
TP/SL
Trailing
Partial Close
Journal

با وضعیت:

✅ VERIFIED
⚠️ REQUIRES CREDENTIAL
⚠️ REQUIRES USER ACTION
❌ FAILED
⏳ NOT IMPLEMENTED

فقط موارد واقعاً تست‌شده را VERIFIED اعلام کن.

CRITICAL: هیچ Mock، Fake Success، Placeholder یا UI بدون Backend ایجاد نکن. معماری فعلی TIKALGO را حفظ کن. LIVE Trading را فعال نکن. AI هرگز نباید Risk Engine و Execution Gate را دور بزند.

 اینم به نصب اسمیل هوش مصنوعی افلاین اضافه کنید 
و در نهایت یک فایل پرامپت پس از ادغام پرامپت ها ارائه دهیداز تمامی اسکیل ها و پروژه های گیت هاب هر دو استفاده کنید
حتما فارسی گزارش دهید
در پرامپت ارتقا و ساخت کد را فاز بندی کنید و یکبار برای همیشه ابتدا پروژه فعلی را بررسی و گزارش سپس با پرامپت مقایسه و سپس ارتقا دهید یکبار  برای همیشه فایل اخرین وضعیت را در گرافیفی بسازید که هر بار از نو وارد کلا کد بشیم فورل با توجه به این فایلا ادامه ساخت پروژهرا انجام دهد نرود از اول پروژه را بخواند.
