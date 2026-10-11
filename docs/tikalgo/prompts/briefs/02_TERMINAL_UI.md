# Authenticated Trading Terminal UI (T0–T11)

| | |
|---|---|
| **Area** | Frontend / terminal |
| **Executable version / spec** | MASTER §5T |
| **Use** | Original brief (as written by the project owner). For Claude Code on the server, prefer the executable prompt in `TIKALGO_MASTER_PROMPT.md`, which adds the safety rules, phases and reporting format. |

---

روی پروژه فعلی TIKALGO کار کن و مستقیماً کد را تغییر بده و UI را روی ترمینال واقعی اعمال کن. فقط توضیح، Mockup، Demo یا طراحی جداگانه نساز. معماری، API، دیتابیس، معاملات و منطق موجود را خراب نکن و قابلیت‌های فعلی را حفظ کن.

هدف

ترمینال بعد از Login باید یک Trading Terminal حرفه‌ای، مینیمال و سریع شبیه UI/UX مدرن صرافی‌هایی مثل Toobit و LBank باشد؛ اما با هویت اختصاصی TIKALGO:

- فونت SaaS مدرن و خوانا
- کارت‌های تمیز، Border ظریف، فضای مناسب
- Dark/Light آماده
- Motion/Transition نرم و محدود
- Responsive Desktop/Tablet/Mobile
- بدون شلوغی و با سلسله‌مراتب بصری واضح
- استفاده از کامپوننت‌های موجود پروژه و حذف Duplicate UI
- تمام داده‌ها از API/State واقعی پروژه؛ هیچ Mock/Hardcode برای داده بازار، موجودی یا پوزیشن نساز

Navigation اصلی

۵ بخش اصلی:

1. Home

- Logo TIKALGO در Header؛ کلیک روی Logo یک Menu/Command Menu باز کند.
- میانبر تمام ماژول‌های پروژه با Icon + Label
- Total Account Equity
- مجموع موجودی تمام حساب‌ها
- عملکرد 24H / 7D / 30D با مقدار، درصد سود/زیان و نمودار
- تفکیک موجودی هر Exchange/Broker/Wallet
- Market Regime
- BTC Trend
- Gold Trend
- Oil Trend
- Fear & Greed
- همه به‌صورت کارت‌های گرافیکی compact
- بخش Market Lists با Tabs:
  - Top Gainers
  - Top Losers
  - Favorites
  - AI Signals
- هر ردیف: Symbol / Name / Price / Change% / Trend / AI Signal
- نمایش وضعیت Live/Paper و آخرین زمان بروزرسانی

2. Trading Terminal
Tabs:

- Gainers
- Losers
- AI Signals
- Favorites
- انتخاب Exchange/Broker/Account
- Symbol/Search
- Chart
- Order Book/Depth
- Trades
- Positions
- Open Orders
- Order Entry
- Balance/Margin/Available
- Leverage + Cross/Isolated برای Futures
- Buy/Sell
- Market/Limit/Stop
- TP/SL/Trailing
- Close Position / Close All
- اطلاعات ریسک و Liquidation
- حفظ تمام قابلیت‌های معاملاتی فعلی پروژه

3. Forex / Metals / US Stocks
بازارها کاملاً جدا و واضح:

- Forex
- Metals
- US Stocks

هر بازار دارای:

- Gainers
- Losers
- AI Signals
- Favorites
- Search
- Account/Broker selector
- Chart
- Positions
- Orders
- Balance
- Order panel
- Market details
- برای Forex: Lots/Leverage/Margin
- برای Stocks: Quantity/Order Type
- برای Metals: قرارداد/حجم/ریسک متناسب با Adapter موجود

4. Crypto
Tabs:

- Spot
- DEX
- Futures

هر بخش:

- Gainers
- Losers
- AI Signals
- Favorites
- Exchange/Wallet selector
- Chart
- Order Book
- Positions
- Orders
- Balance
- Order Entry
- Risk/Leverage برای Futures

5. AI Signals
یک مرکز کامل AI:

- Active Signals
- Open Signals
- Closed Signals
- Signal History
- AI Watchlist
- Strategy
- Trading Style
- Timeframe
- AI Model selector
- Confidence
- Entry
- TP/SL
- Trailing
- Signal status
- دلیل ایجاد سیگنال
- Market Context
- Indicators/Data used
- Decision Trace
- نتیجه Signal
- امکان انتقال Signal به Watchlist/Terminal
- تنظیمات AI و مدل‌ها از Settings پروژه

Markets

یک بخش Markets کامل برای مشاهده جزئیات:

- Crypto
- Forex
- Metals
- US Stocks
- DEX
- Futures
- Price
- Change
- Volume
- OI/Funding در صورت وجود
- Spread
- Liquidity
- AI Signal
- Market Regime
- Technical/Market data موجود در Backend

Settings

تنظیمات از طریق کلیک روی Logo در Home به‌صورت Menu باز شود و شامل:

- Account
- Exchanges/Brokers
- API Keys
- Trading Mode: Paper/Live
- Risk Management
- AI Models
- AI Settings
- Strategies
- Trading Styles
- Notifications
- Telegram
- Display
- Language
- Theme
- Security

الزامات UX

- Desktop-first مانند Trading Terminalهای حرفه‌ای ولی Responsive
- Sidebar/Header ثابت و قابل جمع‌شدن
- Quick Actions
- Global Search
- Command Menu
- Favorites
- آخرین بازارهای مشاهده‌شده
- Loading Skeleton
- Empty/Error States
- Toast/Confirm برای عملیات حساس
- نمایش واضح Live/Paper
- وضعیت اتصال Exchange/Broker
- WebSocket برای داده‌های Real-Time موجود پروژه
- جلوگیری از Layout Shift
- Lazy loading برای ماژول‌های سنگین
- Keyboard shortcuts برای عملیات رایج
- Accessibility مناسب
- RTL برای فارسی و LTR برای انگلیسی
- i18n واقعی، نه متن ثابت

قوانین حیاتی

1. ابتدا ساختار فعلی Frontend/Backend و Routing/Components/API را بررسی کن.
2. قابلیت‌های موجود را Reuse کن؛ دوباره‌کاری نکن.
3. هیچ API، Exchange، Broker، Trading Logic یا Database schema موجود را حذف نکن.
4. هیچ Mock Data یا Fake Balance/Position/Price ایجاد نکن.
5. اگر API موجود است مستقیماً به آن متصل شو.
6. اگر داده‌ای در Backend وجود ندارد، UI باید Empty/Unavailable State نشان دهد، نه داده جعلی.
7. UI باید واقعاً در مسیر Login → Terminal قابل مشاهده باشد.
8. Routeهای قبلی و Authentication را حفظ کن.
9. فقط Landing Page عمومی خارج از این کار است؛ این تغییر مربوط به Authenticated Trading Terminal است.
10. Build، Typecheck و Test را اجرا کن و خطاهای ایجادشده را برطرف کن.
11. در پایان دقیقاً گزارش بده:

- فایل‌های تغییرکرده
- Routeهای اضافه/اصلاح‌شده
- APIهای استفاده‌شده
- قابلیت‌هایی که واقعاً فعال شدند
- Test/Build result
- هر موردی که Backend برای تکمیل آن نیاز دارد

مهم: کار را تا مرحله اعمال واقعی UI در پروژه ادامه بده. فقط کد پیشنهادی یا گزارش نده.

اینم برای ui اضافه کنید
