> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 5T. فاز T — Authenticated Trading Terminal UI (اعمال مستقیم روی کد)

> **هدف:** بعد از Login، ترمینال باید یک Trading Terminal حرفه‌ای، مینیمال و سریع باشد، با الهام از UX صرافی‌های مدرن مثل Toobit و LBank، **اما با هویت اختصاصی TIKALGO**.
> این فاز **مستقیم روی کد واقعی** اجرا می‌شود. Mockup، Demo، طراحی جداگانه یا «کد پیشنهادی» قابل قبول نیست. Landing عمومی خارج از این فاز است.
> **وابستگی:** T6 (مرکز AI Signals) به S1 تا S10 نیاز دارد و جایگزین S11 است. بقیه‌ی زیرفازهای T می‌توانند موازی با فاز C پیش بروند.

### 5T.0 پرامپت عمومی هر زیرفاز
```text
PHASE T — TRADING TERMINAL UI. Implement sub-phase <T#> DIRECTLY in the existing TikAlgo
frontend so it is visible in the real Login → Terminal path. Not a mockup, not a demo, not a
separate design. Use the UI/UX Pro Max skill + docs/design/DESIGN_SYSTEM.md.
RULES:
- First inspect (via Graphify) current frontend/backend structure, routing, auth guards,
  state management, API clients, WebSocket channels, i18n and existing components for the
  scope of <T#>. Reuse them; remove only DUPLICATE UI after migrating its usages.
- Do NOT delete or break any API, exchange/broker adapter, trading logic, DB schema, route
  or auth. Keep all current trading features working (regression-test them).
- NO mock/hardcoded market data, balances, positions or prices. Wire to real API/state/WS.
  If the backend has no data for a widget, render a proper Empty/Unavailable state with the
  reason and log it in docs/state/BACKEND_GAPS.md — never fake data.
- Every user-facing string goes through real i18n (fa + en); RTL for fa, LTR for en.
- Sensitive actions (place/close order, close all, switch to LIVE, delete strategy/key)
  require Confirm dialogs and result Toasts; LIVE/PAPER always clearly visible.
- Run build + typecheck + lint + tests; fix what you broke. Persian report + Save State.
```

### 5T.1 Design System و قوانین بصری (T0 تا T1)
- **هویت TIKALGO:** فونت SaaS مدرن و خوانا. انگلیسی Inter یا Geist؛ فارسی Peyda یا IRANSansX (پشتیبان Vazirmatn)؛ اعداد tabular. کارت‌های تمیز با Border ظریف، فاصله‌گذاری مناسب و سلسله‌مراتب بصری واضح، بدون شلوغی.
- **Dark/Light** با توکن‌ها (CSS variables و Tailwind). پالت رسمی برند TIKALGO (از `brand/README.md`): سفید `#FFFFFF`، سبز فسفری `#3DDC2F` (روی تیره) و `#1FA81F` (روی روشن)، نارنجی `#FF7A1A` (رنگ AI و تأکید)، زمینه‌ی تیره `#0A1712`. رنگ‌های معنایی: سود و صعود = سبز برند؛ ضرر و نزول = `#F6465D`؛ هشدار = نارنجی؛ در Design System رسمی می‌شود و جایگزین پالت قبلی سبک بایننس می‌شود.
- **Motion:** نرم و محدود (۱۵۰ تا ۲۵۰ میلی‌ثانیه) با احترام به `prefers-reduced-motion`.
- **Responsive:** دسکتاپ اول (مثل ترمینال‌های حرفه‌ای)، بعد تبلت و موبایل. در موبایل نوار پایین ثابت با ۵ بخش اصلی.

### 5T.2 زیرفازها

**T0 · Audit فرانت‌اند (فقط خواندن)**
- مسیرها (routes)، Auth guard، Layoutها، کامپوننت‌های تکراری، کلاینت‌های API، کانال‌های WS، i18n فعلی، تم، کتابخانه‌ی نمودار و هر صفحه‌ای که داده‌ی hardcode دارد
- **خروجی:** `docs/state/FRONTEND_AUDIT_FA.md` و جدول «ویجت ← API یا WS موجود ← کمبود Backend»

**T1 · App Shell (چارچوب برنامه)**
- **لوگوی رسمی TIKALGO** از `docs/tikalgo/brand/` (راهنما: `brand/README.md`): در هدر نسخه‌ی `tikalgo-logo-currentcolor.svg` به‌صورت inline (هماهنگ با تم تیره و روشن) و در حالت جمع‌شده‌ی سایدبار و موبایل `tikalgo-mark.svg` (همین نشان، آواتار دستیار «تیکا» هم هست)؛ favicon (SVG و PNG)، apple-touch-icon و آیکون‌های PWA (۱۹۲ و ۵۱۲) در manifest؛ همچنین در صفحه‌ی Login و اسکلت بارگذاری. لوگوهای قبلی پروژه با این لوگو **جایگزین** می‌شوند (همه‌ی ارجاع‌ها به‌روز شوند).
- Header و Sidebar ثابت و قابل جمع شدن
- **کلیک روی لوگوی TIKALGO** یک Menu/Command Menu باز می‌کند که شامل میانبر همه‌ی ماژول‌ها (Icon + Label) و دسترسی به Settings است
- Global Search، Command Palette (⌘K / Ctrl+K)، Quick Actions، Favorites و «آخرین بازارهای مشاهده‌شده»
- نشانگر **LIVE/PAPER**، وضعیت اتصال هر Exchange/Broker و وضعیت WebSocket
- سوئیچ تم و زبان؛ Error Boundary؛ Toast و Confirm سراسری
- **ناوبری اصلی (۵ بخش):** Home · Trading Terminal · Forex/Metals/US Stocks · Crypto · AI Signals، به‌علاوه‌ی **Markets** در منو و Command Menu
- همه‌ی Routeهای قبلی حفظ می‌شوند. اگر مسیری عوض شود، redirect از مسیر قدیمی گذاشته می‌شود.

**T2 · Home**
- **Total Account Equity:** مجموع موجودی همه‌ی حساب‌ها، با تفکیک هر Exchange، Broker و Wallet (فقط از API واقعی؛ حساب متصل‌نشده یعنی Empty state)
- **عملکرد 24H / 7D / 30D:** مقدار، درصد سود و زیان و نمودار. اگر تاریخچه‌ی equity در Backend نیست، Unavailable نشان داده و در BACKEND_GAPS ثبت می‌شود.
- **کارت‌های compact گرافیکی:** Market Regime، روند BTC، روند طلا، روند نفت و Fear & Greed
- **Market Lists با تب‌های** Top Gainers، Top Losers، Favorites و AI Signals. ستون‌ها: Symbol، Name، Price، Change%، Trend (sparkline) و AI Signal
- وضعیت Live/Paper و زمان آخرین به‌روزرسانی

**T3 · Trading Terminal (Desktop-first)**
- تب‌های لیست: Gainers، Losers، AI Signals و Favorites
- انتخاب Exchange/Broker/Account؛ جست‌وجوی نماد
- **Chart** (کتابخانه‌ی موجود؛ lazy-load)، **Order Book/Depth** و **Trades** (با WS)
- **Positions، Open Orders، Balance/Margin/Available**
- **Order Entry:** Buy/Sell؛ Market، Limit و Stop؛ TP، SL و Trailing؛ Leverage و Cross/Isolated برای Futures؛ Close Position و Close All (با Confirm)
- **پنل ریسک:** اندازه‌ی پوزیشن از Risk Engine، قیمت Liquidation، ریسک به درصد و R
- **قاعده:** همه‌ی سفارش‌ها از **Execution Gate** موجود عبور می‌کنند. UI هیچ مسیر مستقیمی به صرافی ندارد. همه‌ی قابلیت‌های معاملاتی فعلی حفظ و با تست regression بررسی می‌شوند.

**T4 · Forex / Metals / US Stocks** (سه بازار کاملاً جدا)
- در هر کدام: Gainers، Losers، AI Signals، Favorites، Search، انتخاب Account/Broker، Chart، Positions، Orders، Balance، Order panel و Market details
- **Forex:** Lots، Leverage و Margin
- **US Stocks:** Quantity و Order Type
- **Metals:** قرارداد، حجم و ریسک، طبق قابلیت‌های Adapter موجود (MT5 یا Broker)
- اگر Adapter یک بازار وجود ندارد، صفحه با Empty state «اتصال بروکر لازم است» نمایش داده می‌شود و در BACKEND_GAPS ثبت می‌شود.

**T5 · Crypto: Spot / DEX / Futures**
- در هر تب: Gainers، Losers، AI Signals، Favorites، انتخاب Exchange/Wallet، Chart، Order Book، Positions، Orders، Balance و Order Entry
- در Futures: Risk و Leverage، Margin mode و Funding
- در DEX: انتخاب Wallet و شبکه، فقط اگر Adapter موجود است

**T6 · AI Signals Center** (جایگزین S11؛ بعد از S1 تا S10)
- Active، Open و Closed Signals، Signal History و AI Watchlist
- فیلتر و انتخاب: Strategy، Trading Style، Timeframe، AI Model، Confidence و Status
- **جزئیات هر سیگنال:** Entry، TP/SL، Trailing، وضعیت، دلیل ایجاد، Market Context، اندیکاتورها و داده‌های استفاده‌شده، **Decision Trace** و نتیجه‌ی سیگنال
- **عملیات:** انتقال به Watchlist یا Terminal (Terminal با Entry، SL و TP از پیش پر شده باز می‌شود؛ اجرا همچنان از Execution Gate)
- تنظیمات AI و مدل‌ها از Settings

**T7 · Markets**
- Crypto، Forex، Metals، US Stocks، DEX و Futures
- **ستون‌ها:** Price، Change، Volume، OI و Funding (در صورت وجود)، Spread، Liquidity، AI Signal، Market Regime و داده‌های تکنیکال موجود در Backend
- جدول مجازی (virtualized) برای لیست‌های بلند؛ مرتب‌سازی و فیلتر

**T8 · Settings** (از منوی لوگو باز می‌شود)
- Account، Exchanges/Brokers، API Keys (ماسک‌شده و رمزنگاری‌شده؛ فقط نمایش 4 رقم آخر)، Trading Mode Paper/Live (Live با تأیید صریح و Gateها، طبق S7)، Risk Management، AI Models، AI Settings، Strategies، Trading Styles، Notifications، Telegram، Display، Language، Theme و Security
- همه DB-backed هستند و به `.env` نیاز ندارند (طبق S2). صفحه‌ی settings موجود **ادغام** می‌شود، بازنویسی نمی‌شود.

**T9 · UX، کارایی و دسترس‌پذیری**
- Loading Skeleton با ابعاد ثابت (بدون Layout Shift)، Empty، Error و Unavailable states
- Lazy loading برای Chart، Order Book و ماژول‌های سنگین؛ code-splitting برای هر route
- **Keyboard shortcuts:** ⌘K جست‌وجو، B و S برای Buy و Sell (با فوکوس روی فرم)، Esc بستن، `/` جست‌وجوی نماد، و راهنمای میانبرها با `?`
- **Accessibility:** فوکوس قابل مشاهده، ARIA، کنتراست WCAG 2.2 AA و هدف لمسی ≥ ۴۴px در موبایل
- WebSocket: reconnect با backoff، نشانگر «داده‌ی کهنه» و throttle رندر (requestAnimationFrame) برای Order Book

**T10 · i18n و RTL**
- همه‌ی متن‌ها با کلید i18n (fa و en)؛ هیچ متن ثابتی باقی نمی‌ماند (این را با یک تست یا lint بررسی کنید)
- RTL و LTR خودکار با `dir`؛ Chart و اعداد همیشه LTR؛ فرمت عدد و تاریخ وابسته به locale

**T11 · تأیید و گزارش نهایی (فارسی)**
- اجرای build، typecheck، lint و همه‌ی تست‌ها، به‌علاوه‌ی تست E2E مسیر **Login → Terminal → ثبت سفارش PAPER → Position → Close** (Playwright اگر در پروژه هست)
- اسکرین‌شات صفحه‌ها در دسکتاپ، تبلت و موبایل، و در دو حالت تیره و روشن، در `docs/state/screens/`
- **گزارش `docs/state/TERMINAL_UI_REPORT_FA.md` دقیقاً شامل:**
  1. فایل‌های تغییرکرده
  2. Routeهای اضافه یا اصلاح‌شده (همراه با redirectها)
  3. APIها و کانال‌های WS استفاده‌شده برای هر ویجت
  4. قابلیت‌هایی که واقعاً فعال شدند (✅ VERIFIED با شواهد)
  5. نتیجه‌ی Test و Build
  6. هر چیزی که **Backend برای تکمیل لازم دارد** (از BACKEND_GAPS.md)
- کار تا **اعمال واقعی UI در پروژه** ادامه پیدا می‌کند. گزارش بدون پیاده‌سازی قابل قبول نیست.
