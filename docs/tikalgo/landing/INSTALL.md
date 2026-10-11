# صفحهٔ عمومی TIKALGO (www.tikalgoai.com): نصب و راه‌اندازی

این پوشه صفحهٔ اصلی عمومی سایت است:
- لوگوی رسمی تیکالگو، فونت‌های اختصاصی خود سایت، موشن؛
- دو زبان انگلیسی و فارسی با RTL؛
- **دادهٔ زندهٔ بازار** (بدون نمودار ساختگی)؛
- **لوگوهای رسمی** صرافی‌ها، بروکرها و شبکه‌های اجتماعی؛
- **فرم درخواست عضویت با تأیید مدیر**؛
- چت‌بات تیکا با آواتار رسمی.

ثبت‌نام آزاد و پلن رایگان ندارد: عضویت فقط از راه **درخواست و تأیید مدیر** انجام می‌شود.

> **پرامپت آمادهٔ نصب برای Claude Code:** [`INSTALL_PROMPT.md`](INSTALL_PROMPT.md)
> **بستهٔ آمادهٔ دیپلوی:** `tikalgo-landing.zip`، شامل `index.html` و `assets/`.

---

## ۱. فایل‌ها
| مسیر | کاربرد |
|---|---|
| `index.html` | صفحه |
| `assets/landing.css` | استایل؛ توکن‌های برند در `:root` |
| `assets/landing.js` | متن‌های EN/FA، بخش‌ها، **دادهٔ زندهٔ بازار**، پلن‌ها، موشن |
| `assets/membership.js` | **فرم درخواست عضویت**: اعتبارسنجی، ارسال، پیام‌ها |
| `assets/tika-chat.js` | چت‌بات تیکا: API، پایگاه دانش داخلی، ایمنی |
| `assets/fonts/` | **فونت‌های اختصاصی self-hosted**: `fonts.css`، چهار فایل woff2 و `OFL-LICENSES.txt` |
| `assets/venues/` | **لوگوهای رسمی** ۱۳ صرافی و بروکر |
| `assets/tika.jpg`، `tika-512.jpg` | آواتار رسمی تیکا |
| `assets/tikalgo-logo-on-dark.svg`، `tikalgo-mark.svg`، `favicon.svg` | لوگوی تیکالگو |
| `assets/bull-bear.jpg` | تصویر هیرو |
| `reference-lovable-build/` | فقط برای مقایسه. **دیپلوی نشود** |

## ۲. بخش‌های صفحه
| بخش | محتوا |
|---|---|
| هیرو | تیتر، توضیح، دکمه‌های «آشنایی» و «ورود». **کندل‌های زندهٔ BTC/USDT (۱ دقیقه‌ای)** در پس‌زمینه، با قیمت و تغییر زنده |
| نوار بازار زنده | ابزار رسمی TradingView: BTC، ETH، EUR/USD، GBP/USD، USD/JPY، طلا، نقره، S&P 500، نزدک ۱۰۰، اپل، انویدیا، تسلا، SPY |
| ۰۱ ساختار | BOS/CHOCH، نقدینگی، OB، FVG |
| ۰۲ هوش | ۱۲ لایهٔ شواهد متصل به TIKALGO AI |
| ۰۳ بازارها | **کریپتو، فارکس، طلا و فلزات، سهام آمریکا، ETF**. هر تب نمودار زندهٔ نماد واقعی خودش را دارد: BTC/USDT، EUR/USD، XAU/USD، AAPL، SPY |
| ۰۴ فرایند | ۷ مرحلهٔ تصمیم |
| ۰۵ TIKALGO AI | آفلاین، WAIT، توضیح‌پذیری، وتوی ریسک |
| ۰۶ ابزارها | ۸ ابزار. اسپارک‌لاین هر کارت = **قیمت واقعی ۲۴ ساعت اخیر** یک دارایی، رنگ بر اساس جهت واقعی |
| ۰۷ تیکا | معرفی تیکا |
| ۰۸ اکوسیستم | **صرافی‌های کریپتو:** XT.com، Binance، Bybit، OKX، Bitget، KuCoin، Gate، Hyperliquid، BingX، LBank. **فارکس، فلزات و سهام:** بروکرهای MetaTrader 5، OANDA، Interactive Brokers |
| ۰۹ پلن‌ها | هفتگی ‎$199، ماهانه ‎$999، سالانه ‎$799 در ماه (‎$9,588 در سال). دکمه‌ها: «درخواست عضویت» با پلن از پیش انتخاب‌شده |
| ۱۰ عضویت | **فرم درخواست عضویت** و **راه‌های ارتباطی** |
| CTA و فوتر | ورود، شبکه‌های اجتماعی با آیکون رسمی، هشدار ریسک |

### وضعیت صرافی‌ها
| وضعیت | صرافی‌ها |
|---|---|
| در حال ارزیابی | XT.com، Hyperliquid، BingX |
| برنامه‌ریزی‌شده | Binance، Bybit، OKX، Bitget، KuCoin، Gate، MT5، OANDA، IBKR |
| فقط دادهٔ بازار | LBank |

هر وقت اتصالی واقعاً فعال شد، وضعیتش را در `assets/landing.js` (آرایهٔ `venues`، هم en و هم fa) به‌روز کنید. وضعیت «متصل» را فقط بعد از اتصال واقعی بگذارید.

---

## ۳. دادهٔ زندهٔ بازار (هیچ عدد ساختگی‌ای نیست)
ترتیب منابع داده در `assets/landing.js` (`liveChart`، `loadCandles`):

1. **فید خود TIKALGO:**
   `GET /api/market/candles?symbol=BTCUSDT&interval=15m&limit=64`
   - پاسخ: آرایه با **فرمت kline بایننس**: `[[openTime, open, high, low, close, ...], ...]`، یا `{ "candles": [...] }`.
   - این endpoint را به فید داده‌ای که الان دارید وصل کنید:
     - کریپتو از صرافی؛
     - فارکس، طلا و سهام از MT5 یا بروکر.
   - نمادهای مورد نیاز: `BTCUSDT`، `EURUSD`، `XAUUSD`، `AAPL`، `SPY`، `ETHUSDT`.
2. **اگر فید TIKALGO پاسخ ندهد (فقط کریپتو):** داده از API عمومی بازار بایننس خوانده می‌شود:
   - REST: `data-api.binance.vision`؛
   - به‌روزرسانی لحظه‌ای با WebSocket: `data-stream.binance.vision`؛
   - اگر WebSocket وصل نشود، هر ۲۰ ثانیه یک بار polling.
3. **فارکس، طلا، سهام و ETF بدون فید TIKALGO:** ویجت رسمی و زندهٔ **TradingView** همان نماد نمایش داده می‌شود.
4. اگر هیچ منبعی در دسترس نباشد، نمودار **خالی می‌ماند** و عدد ساختگی نمایش داده نمی‌شود.

برچسب زیر هر نمودار منبع واقعی داده را نشان می‌دهد، مثلاً `LIVE · BTC/USDT · 15m · Binance`.

> **نکتهٔ مهم:** بایننس برای بعضی مناطق محدودیت دارد. برای اینکه دادهٔ زنده برای همهٔ کاربران کار کند، **endpoint شمارهٔ ۱ را روی سرور خودتان بسازید**. با آن، مرورگر کاربر مستقیم به بایننس وصل نمی‌شود.

---

## ۴. فرم درخواست عضویت و تأیید مدیر
### روند
**کاربر فرم را می‌فرستد** ← وضعیت `pending` ← **مدیر بررسی می‌کند** ←
- **تأیید:** حساب ساخته و فعال می‌شود و اطلاعات ورود برای کاربر فرستاده می‌شود.
- **رد:** با ذکر دلیل.

### فیلدهای فرم
| فیلد | اعتبارسنجی |
|---|---|
| نام و نام خانوادگی | ۳ تا ۸۰ حرف |
| **سن** | عدد صحیح، ۱۸ تا ۱۰۰ |
| **ایمیل** | |
| **موبایل** | با کد کشور، فرمت E.164 مثل `+989123456789` (اعداد فارسی خودکار تبدیل می‌شوند) |
| **واتس‌اپ** | با گزینهٔ «همان شمارهٔ موبایل» |
| **تلگرام** | `@username`، ۵ تا ۳۲ کاراکتر |
| پلن | هفتگی، ماهانه یا سالانه |
| راه ارتباطی ترجیحی | |
| تأییدها | ۱۸+ و شرایط، بیانیهٔ ریسک |
| فیلد مخفی ضدربات | honeypot |

### قرارداد API (باید در بک‌اند TIKALGO ساخته شود)
```http
POST /api/membership/applications
Content-Type: application/json

{ "full_name": "Ali Rezaei", "age": 29, "email": "ali@example.com",
  "mobile": "+989123456789", "whatsapp": "+989123456789", "telegram": "@ali_trader",
  "plan": "yearly", "preferred_contact": "telegram", "lang": "fa",
  "consent_terms": true, "consent_risk": true, "website": "" }
```
| پاسخ | معنا | رفتار صفحه |
|---|---|---|
| `201 { "id": "A-1042", "status": "pending" }` | ثبت شد | پیام «در انتظار تأیید مدیر» |
| `409` | درخواست تکراری (ایمیل یا موبایل) | پیام «در حال بررسی است» |
| `422 { "errors": { "email": "..." } }` | خطای فیلد | خطا زیر همان فیلد |
| `429` | تعداد درخواست زیاد | پیام «بعداً تلاش کنید» |
| هر خطای دیگر یا قطعی | | پیام خطای واقعی و لینک تلگرام |

صفحه **هرگز موفقیت ساختگی نشان نمی‌دهد** و هیچ حسابی در مرورگر ساخته نمی‌شود.

### جدول پایگاه داده
```sql
CREATE TABLE membership_applications (
  id              VARCHAR(16) PRIMARY KEY,          -- e.g. A-1042
  full_name       VARCHAR(80)  NOT NULL,
  age             SMALLINT     NOT NULL CHECK (age BETWEEN 18 AND 100),
  email           VARCHAR(120) NOT NULL,
  mobile          VARCHAR(16)  NOT NULL,             -- E.164
  whatsapp        VARCHAR(16),
  telegram        VARCHAR(33),
  plan            VARCHAR(10)  NOT NULL CHECK (plan IN ('weekly','monthly','yearly')),
  preferred_contact VARCHAR(10) NOT NULL,
  lang            VARCHAR(2)   NOT NULL DEFAULT 'fa',
  status          VARCHAR(10)  NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  reject_reason   TEXT,
  admin_notes     TEXT,
  ip_hash         VARCHAR(64),                       -- hashed, not the raw IP
  user_agent      VARCHAR(255),
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
  reviewed_by     VARCHAR(64),
  reviewed_at     TIMESTAMPTZ,
  user_id         VARCHAR(64)                        -- set when the account is created
);
CREATE UNIQUE INDEX ux_app_pending_email  ON membership_applications (lower(email)) WHERE status = 'pending';
CREATE UNIQUE INDEX ux_app_pending_mobile ON membership_applications (mobile)       WHERE status = 'pending';
```

### پنل مدیر (`/admin/membership`، فقط نقش admin)
- **فهرست درخواست‌ها:** فیلتر وضعیت، جست‌وجو، و دکمهٔ تماس مستقیم برای هر درخواست: `mailto:`، `https://wa.me/<number>`، `https://t.me/<username>`.
- **تأیید**، در یک تراکنش:
  1. کاربر با نقش `member` ساخته می‌شود، با پلن انتخابی و حالت پیش‌فرض **PAPER**؛
  2. لینک فعال‌سازی و تعیین رمز (یک‌بارمصرف، ۲۴ ساعته) فرستاده می‌شود: ایمیل، و در صورت تنظیم، ربات تلگرام؛
  3. `status = approved`، و `reviewed_by`، `reviewed_at` و `user_id` ثبت می‌شوند.
- **رد:** دلیل الزامی است. پیام محترمانه برای کاربر فرستاده می‌شود.
- **لاگ ممیزی** برای هر تأیید و رد.
- **اعلان درخواست جدید** به مدیر (تلگرام یا ایمیل).

### امنیت و حریم خصوصی
- **محدودیت نرخ:** ۵ درخواست در ساعت برای هر IP.
- اگر honeypot (`website`) پر باشد، درخواست بی‌صدا رد می‌شود.
- اعتبارسنجی دوباره در سرور انجام می‌شود (به اعتبارسنجی مرورگر اعتماد نکنید).
- IP به صورت hash ذخیره می‌شود.
- دادهٔ درخواست‌های ردشده بعد از ۹۰ روز حذف می‌شود.
- ثبت‌نام آزاد (`/register`) نباید وجود داشته باشد. حساب فقط از راه تأیید مدیر ساخته می‌شود.
- LIVE به صورت پیش‌فرض خاموش است. عضو جدید با **PAPER** شروع می‌کند.

---

## ۵. فونت‌های اختصاصی (self-hosted)
همهٔ فونت‌ها روی سرور خود سایت هستند و هیچ فونتی از Google Fonts بارگذاری نمی‌شود. این برای سرعت، حریم خصوصی و پایداری در ایران مهم است.

| نام در سایت | فونت پایه | کاربرد |
|---|---|---|
| `TIKALGO Display` | Space Grotesk (تایپ‌فیس مونوگرام برند) | تیترها |
| `TIKALGO Sans` | Manrope | متن و رابط کاربری انگلیسی |
| `TIKALGO Sans FA` | Vazirmatn | متن فارسی |
| `TIKALGO Mono` | JetBrains Mono | قیمت‌ها، اعداد، برچسب‌ها |

- هر چهار فونت با **مجوز OFL 1.1** هستند (استفادهٔ تجاری آزاد) و متن مجوز در `assets/fonts/OFL-LICENSES.txt` آمده است.
- فونت‌ها variable هستند: یک فایل برای همهٔ وزن‌ها.

## ۶. لوگوها
- **صرافی‌ها و بروکرها** (`assets/venues/`): از سایت یا CDN رسمی خود هر شرکت گرفته شده‌اند.
  - Binance با علامت رسمی و رنگ برند `#F0B90B`.
- **شبکه‌های اجتماعی:** علامت‌های رسمی برند با رنگ رسمی هر شبکه (از مجموعهٔ Simple Icons، مجوز CC0)، به‌صورت inline SVG.
- این لوگوها علامت تجاری صاحبانشان هستند و فقط برای معرفی صرافی‌ها و شبکه‌ها استفاده شده‌اند. این استفاده به معنی همکاری یا تأیید آن شرکت‌ها نیست.

## ۷. راه‌های ارتباطی (در فوتر و بخش عضویت)
| شبکه | آدرس |
|---|---|
| تلگرام | https://t.me/Tikalgoai |
| X | https://x.com/TikalgoAi |
| اینستاگرام | https://www.instagram.com/tikalgoai |
| یوتیوب | https://youtube.com/@tikalgoai |
| تریدینگ‌ویو | https://in.tradingview.com/u/Tikalgo/ |

شعار: **Trade Smarter. Trade with Confidence.**

## ۸. چت‌بات تیکا
- **با بک‌اند:** درخواست `POST /api/tika/chat` با بدنهٔ `{ message, lang, history }` و پاسخ `{ reply }`. این همان دستیار فقط‌خواندنی و آموزشی با مدل محلی است.
- **بدون بک‌اند:** پاسخ از پایگاه دانش داخلی دوزبانه می‌آید. پرسش‌های عضویت، ورود، پلن‌ها و راه‌های ارتباطی را پوشش می‌دهد.
- **ایمنی:**
  - توصیهٔ خرید یا فروش داده نمی‌شود؛
  - سؤال دربارهٔ معماری، سرور، کلید یا پرامپت پاسخ «محرمانه» می‌گیرد.

---

## ۹. دیپلوی روی سرور (Nginx)
```bash
# On the server (the repo is cloned at /root/agent-kit or copy the zip)
sudo mkdir -p /var/www/tikalgo-landing
sudo unzip -o tikalgo-landing.zip -d /var/www/tikalgo-landing
#   or: sudo cp -r docs/tikalgo/landing/{index.html,assets} /var/www/tikalgo-landing/
sudo chown -R www-data:www-data /var/www/tikalgo-landing
```
```nginx
server {
    server_name tikalgoai.com www.tikalgoai.com;
    root /var/www/tikalgo-landing;

    location = / { try_files /index.html =404; }
    location /assets/ {
        expires 30d; add_header Cache-Control "public, immutable";
        types { font/woff2 woff2; }   # fonts
    }

    # Existing TIKALGO app (login, dashboard, admin) and API:
    location /login { proxy_pass http://127.0.0.1:<APP_PORT>; }
    location /admin { proxy_pass http://127.0.0.1:<APP_PORT>; }
    location /api/  { proxy_pass http://127.0.0.1:<API_PORT>; }

    # Rate-limit the public membership endpoint (define the zone in the http block:
    #   limit_req_zone $binary_remote_addr zone=membership:10m rate=5r/h;)
    location = /api/membership/applications {
        limit_req zone=membership burst=3 nodelay;
        proxy_pass http://127.0.0.1:<API_PORT>;
    }
}
```
```bash
sudo nginx -t && sudo systemctl reload nginx
```

**اگر هدر CSP دارید**، این دامنه‌ها را مجاز کنید:

| دستور | دامنه‌ها |
|---|---|
| `script-src` | `cdnjs.cloudflare.com`، `s3.tradingview.com` |
| `connect-src` | `data-api.binance.vision`، `wss://data-stream.binance.vision` |
| `frame-src` | `*.tradingview-widget.com`، `*.tradingview.com` |

## ۱۰. آزمایش بعد از نصب
1. صفحه را باز کنید. کنار نمودار هیرو باید قیمت زندهٔ BTC و برچسب منبع دیده شود.
2. تب‌های بازار (فارکس، طلا، سهام، ETF) را بزنید. هر کدام باید نمودار زندهٔ نماد خودش را نشان دهد.
3. فرم عضویت را خالی بفرستید. باید خطای فیلدها نمایش داده شود.
4. فرم را کامل بفرستید:
   - **بدون بک‌اند:** پیام خطای واقعی؛
   - **با بک‌اند:** شمارهٔ درخواست و «در انتظار تأیید مدیر».
5. در پنل مدیر، درخواست را تأیید کنید. حساب باید ساخته شود و پیام فعال‌سازی برسد.
6. زبان را به فارسی تغییر دهید. همه‌چیز باید راست‌به‌چپ و بدون اسکرول افقی باشد.
