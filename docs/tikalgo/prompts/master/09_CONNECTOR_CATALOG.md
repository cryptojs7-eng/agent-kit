> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 9. کاتالوگ کامل صرافی‌ها و بروکرها (Connector Catalog)

> **قاعده‌ی کانکتور:** هر Venue فقط وقتی «قابل معامله» علامت می‌خورد که قابلیت‌هایش با تست واقعی تأیید شده باشد (رابط `VenueCapabilities` در Super Plan بخش 5.4). ترتیب پیاده‌سازی بر اساس ستون «اولویت» است.
> **مسیر اتصال:** `ccxt` یعنی از طریق CCXT (شناسه‌ی CCXT داده شده)؛ `native` یعنی SDK یا API اختصاصی، وقتی اطلاعات بیشتری می‌دهد؛ `MT5` یعنی از طریق MT5 Bridge (Wine + RPyC یا REST). قبل از پیاده‌سازی، وجود شناسه در نسخه‌ی نصب‌شده‌ی CCXT را با `ccxt.exchanges` بررسی کنید.

### 9.1 صرافی‌های متمرکز کریپتو (CEX: Spot و Futures)
| Venue | مسیر اتصال | Spot | Futures | اولویت | یادداشت |
|---|---|---|---|---|---|
| Binance | `ccxt: binance / binanceusdm / binancecoinm` + native WS | ✔ | ✔ | P0 | لیکوییدیشن (forceOrder)، OI و فاندینگ |
| Bybit | `ccxt: bybit` + native v5 | ✔ | ✔ | P0 | |
| OKX | `ccxt: okx` | ✔ | ✔ | P0 | |
| Bitget | `ccxt: bitget` | ✔ | ✔ | P0 | |
| **LBank** | فقط endpointهای عمومی (داده) | داده | داده و PAPER؛ **LIVE ممکن نیست** | P2 | پاسخ رسمی LBank (2026-10): API فقط برای شرکای سازمانی است و درخواست سازمانی جدید پذیرفته نمی‌شود؛ «API برای استفادهٔ تجاری باز نیست». اجرای فیوچرز به venue دیگر منتقل می‌شود (بخش ۱۶) |
| **Toobit** | native (`agent-kit`: MCP و CLI) | ✔ | ✔ | **P0** | ابزارهای آماده + ایچیموکو |
| XT.com | `ccxt: xt` | ✔ | ✔ | P1 | |
| KuCoin | `ccxt: kucoin / kucoinfutures` | ✔ | ✔ | P1 | |
| Gate | `ccxt: gate` | ✔ | ✔ | P1 | |
| MEXC | `ccxt: mexc` | ✔ | ✔ | P1 | |
| HTX (Huobi) | `ccxt: htx` | ✔ | ✔ | P1 | |
| BingX | `ccxt: bingx` | ✔ | ✔ | P1 | |
| Phemex | `ccxt: phemex` | ✔ | ✔ | P2 | |
| BitMart | `ccxt: bitmart` | ✔ | ✔ | P2 | |
| WOO X | `ccxt: woo` | ✔ | ✔ | P2 | |
| Crypto.com | `ccxt: cryptocom` | ✔ | ✔ | P2 | |
| Coinbase (Advanced) | `ccxt: coinbase` | ✔ | ⚠ محدود | P2 | |
| Kraken | `ccxt: kraken / krakenfutures` | ✔ | ✔ | P2 | |
| Bitfinex | `ccxt: bitfinex` | ✔ | ✔ | P2 | |
| Bitstamp | `ccxt: bitstamp` | ✔ | — | P2 | |
| Deribit | `ccxt: deribit` | — | ✔ + آپشن | P2 | داده‌ی آپشن و نوسان ضمنی |
| Upbit | `ccxt: upbit` | ✔ | — | P2 | داده‌ی بازار کره |

**صرافی‌های ایرانی** (برای کاربران داخل؛ API و قوانین هر کدام جداگانه بررسی شود؛ ممکن است در CCXT نباشند و کانکتور native لازم داشته باشند):
| Venue | مسیر | اولویت |
|---|---|---|
| نوبیتکس (Nobitex) | native REST/WS | P1 |
| والکس (Wallex) | native | P1 |
| رمزینکس (Ramzinex) | native | P2 |
| بیت‌پین (Bitpin) | native | P2 |
| تبدیل (Tabdeal) | native | P2 |

### 9.2 صرافی‌های غیرمتمرکز (DEX، Perp DEX و Aggregator)
| Venue | مسیر | نوع | اولویت |
|---|---|---|---|
| **Hyperliquid** | native: `hyperliquid-python-sdk` (+ `ccxt: hyperliquid`) | Perp + Spot | **P0** (live + Whale Engine) |
| dYdX v4 | native SDK | Perp | P2 |
| GMX | قراردادهای هوشمند (web3) | Perp | P2 |
| Aster | API یا native | Perp | P2 |
| Uniswap | web3 / SDK | AMM | P2 |
| PancakeSwap | web3 | AMM (BSC) | P2 |
| Jupiter (Solana) | API | Aggregator | P2 |
| 1inch / 0x | API | Aggregator | P2 |

> برای DEX کلید خصوصی **هرگز** روی سرور و به‌صورت plaintext ذخیره نمی‌شود. یکی از این دو راه: کیف‌پول API یا Agent Wallet (مثل Agent Wallet در Hyperliquid با دسترسی محدود و بدون برداشت)، یا امضا در سمت کاربر (WalletConnect).

### 9.3 فارکس، فلزات و CFD (بروکرها)
| بروکر یا پلتفرم | مسیر اتصال | بازارها | اولویت |
|---|---|---|---|
| **هر بروکر MT5** (مثل IC Markets، Exness، XM، Pepperstone، FxPro، RoboForex، Alpari، LiteFinance، Tickmill، FBS، Admirals، Vantage) | `MT5` Bridge | فارکس، طلا و نقره، شاخص‌ها، نفت | **P0** |
| بروکرهای MT4 | پل MT4 (EA + ZMQ/REST) | فارکس و فلزات | P2 |
| OANDA | native REST v20 (`oandapyV20`) | فارکس، فلزات و CFD | P1 |
| cTrader (Spotware Open API؛ مثل IC Markets و Pepperstone) | native Open API | فارکس و CFD | P1 |
| Interactive Brokers | native (`ib_async`) | فارکس، فلزات، سهام، فیوچرز و آپشن | P1 |
| FXCM | native REST / ForexConnect | فارکس و CFD | P2 |
| Saxo Bank | OpenAPI | چندبازاره | P2 |
| IG | REST/Streaming API | CFD | P2 |
| FIX (بروکرهای نهادی) | QuickFIX | — | P2 |

### 9.4 سهام آمریکا
| بروکر | مسیر | اولویت |
|---|---|---|
| Alpaca | native (`alpaca-py`) + Paper رسمی | P1 |
| Interactive Brokers | native (`ib_async`) | P1 |
| Charles Schwab (Trader API) | native REST | P2 |
| Tradier | native REST | P2 |
| TradeStation | native REST | P2 |
| Webull (OpenAPI) | native | P2 |

### 9.5 داده‌ی فلزات و کالاها بدون بروکر
- XAUUSD و XAGUSD از MT5، OANDA، IBKR یا Saxo
- طلای توکنی (PAXG و XAUT) از صرافی‌های کریپتو
- داده‌ی کلان (FRED و OpenBB) برای روند طلا، نفت و DXY
