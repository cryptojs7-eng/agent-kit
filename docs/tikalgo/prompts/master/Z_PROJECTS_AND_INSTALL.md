> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## پیوست Z — فهرست کامل پروژه‌ها و اسکیل‌های گیت‌هاب، و دستور نصب (ادغام همه‌ی فایل‌ها)

> این پیوست **همه‌ی لینک‌های گیت‌هاب** را یک‌جا جمع کرده است، از همه‌ی نسخه‌ها و فایل‌های قبلی:
> Master Plan v1، Super Plan v2، Super Project Architecture (فایل شما)، فهرست‌های گفت‌وگو و فاز AI Signals.
> **راهنمای ستون نصب:** `pip` یا `npm` = وابستگی قابل نصب در پروژه (فقط بعد از بررسی لایسنس و محیط فعلی). `clone→refs` = فقط برای مطالعه در `/root/tikalgo-refs`، **نه** داخل مخزن. `مرجع` = فقط ایده.
> **وضعیت لایسنس:** ✔ لایسنس شناخته‌شده · ⚠ GPL، LGPL یا محدودیت دیگر (کد کپی نشود یا ایزوله شود) · ❓ بررسی شود.
> لینک‌ها از نتایج جست‌وجو و فایل‌های قبلی آمده‌اند. **قبل از استفاده، اسکریپت Z.6 را اجرا کنید** تا لینک‌های از کار افتاده مشخص شوند.

### Z.1 مراجع اصلی AI Signals و TypeSafe/Jev
| # | پروژه | لایسنس | کاربرد در TikAlgo | نصب |
|---|---|---|---|---|
| 1 | [buberlo/jev-trader](https://github.com/buberlo/jev-trader) | MIT ✔ | Jev به‌عنوان Decision Model، Policy با آستانه، Fallback Ladder، کالیبراسیون Platt | clone→refs |
| 2 | [zadescoxp/Jev-Trades](https://github.com/zadescoxp/Jev-Trades) | Apache-2.0 ✔ | اندیکاتورهای MTF از کندل بسته‌شده، TP/SL با Jev و ATR، پروفایل ریسک، لاگ JSONL | clone→refs |
| 3 | [Jev-trading/Jev-trading](https://github.com/Jev-trading/Jev-trading) | MIT ✔ | Trigger→AI→Confidence→Action، Safety Net | clone→refs |
| 4 | [naimkatiman/alpha-scanner](https://github.com/naimkatiman/alpha-scanner) | MIT ✔ | اسکنر MTF، امتیاز ۶ فاکتوری، توضیح LLM با fallback | clone→refs |
| 5 | [Manjussha/AI-trader](https://github.com/Manjussha/AI-trader) | MIT ✔ | Confluence 0 تا 10، ATR و Kelly، پایش SL/TP در پس‌زمینه | clone→refs |
| 6 | [freqtrade/freqtrade](https://github.com/freqtrade/freqtrade) | GPL-3.0 ⚠ | Trailing، stoploss on exchange، Protections، reconcile (فقط ایده) | clone→refs |

### Z.2 موتورهای معامله و ربات‌ها
| # | پروژه | لایسنس | کاربرد | نصب |
|---|---|---|---|---|
| 7 | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Apache-2.0 ✔ | الگوی کانکتور و چرخه‌ی عمر استراتژی؛ Market Making | clone→refs |
| 8 | [QuantConnect/Lean](https://github.com/QuantConnect/Lean) | Apache-2.0 ✔ | Research و Backtest ایزوله، الگوی Brokerage | clone→refs |
| 9 | [nautechsystems/nautilus_trader](https://github.com/nautechsystems/nautilus_trader) | LGPL-3.0 ⚠ | معماری event-driven (ایزوله) | `pip install nautilus_trader` |
| 10 | [vnpy/vnpy](https://github.com/vnpy/vnpy) | MIT ✔ | الگوی Gateway و Event Engine | `pip install vnpy` |
| 11 | [jesse-ai/jesse](https://github.com/jesse-ai/jesse) | MIT ✔ | ساختار استراتژی و بک‌تست | مرجع |
| 12 | [Drakkar-Software/OctoBot](https://github.com/Drakkar-Software/OctoBot) | GPL-3.0 ⚠ | ربات با UI، Grid و DCA | مرجع |
| 13 | [Superalgos/Superalgos](https://github.com/Superalgos/Superalgos) | Apache-2.0 ✔ | طراحی بصری استراتژی | مرجع |
| 14 | [EA31337/EA31337](https://github.com/EA31337/EA31337) | GPL-3.0 ⚠ | EA چنداستراتژی MT4/MT5 | مرجع |
| 15 | [BlackRichGuy/Deriv-Trading-Bot](https://github.com/BlackRichGuy/Deriv-Trading-Bot) | ❓ | ربات‌های فارکس و کریپتو (کیفیت نامعلوم) | مرجع با احتیاط |
| 16 | [Benjam1nCup/Polymarket-trading-bot-python-V2](https://github.com/Benjam1nCup/Polymarket-trading-bot-python-V2) | ❓ | نمونه‌ی HMM regime در ربات | مرجع |

### Z.3 اتصال به صرافی‌ها، بروکرها و متاتریدر
| # | پروژه | لایسنس | کاربرد | نصب |
|---|---|---|---|---|
| 17 | [ccxt/ccxt](https://github.com/ccxt/ccxt) | MIT ✔ | نرمال‌سازی صرافی‌های کریپتو | `pip install ccxt` |
| 18 | [hyperliquid-dex/hyperliquid-python-sdk](https://github.com/hyperliquid-dex/hyperliquid-python-sdk) | MIT ✔ | داده و اجرای رسمی Hyperliquid | `pip install hyperliquid-python-sdk` |
| 19 | [hyperliquid-dex/hyperliquid-rust-sdk](https://github.com/hyperliquid-dex/hyperliquid-rust-sdk) | ❓ | SDK Rust | مرجع |
| 20 | [hyperliquid-dex/order_book_server](https://github.com/hyperliquid-dex/order_book_server) | ❓ | سرور اوردربوک | مرجع |
| 21 | [cryptojs7-eng/agent-kit](https://github.com/cryptojs7-eng/agent-kit) | MIT ✔ | Toobit MCP و ایچیموکو | `npm i -g toobit-trade-mcp toobit-trade-cli` |
| 22 | [tiloye/mt5linux](https://github.com/tiloye/mt5linux) | ❓ | MT5 روی لینوکس (Wine + RPyC) | `pip install mt5linux` |
| 23 | [DeadSecure/Dockerized-MetaTrader5-with-Python-DataBridge](https://github.com/DeadSecure/Dockerized-MetaTrader5-with-Python-DataBridge) | ❓ | MT5 داکری + RPC و WS | clone→refs |
| 24 | [django-trader/Metatrader5-Docker](https://github.com/django-trader/Metatrader5-Docker) | ❓ | MT5 روی Docker | clone→refs |
| 25 | [ejtraderLabs/Metatrader5-Docker](https://github.com/ejtraderLabs/Metatrader5-Docker) | ❓ | MT5 + Wine + VNC + ZMQ | clone→refs |
| 26 | [pongsakorn-onsri/metatrader-mcp-server-mac](https://github.com/pongsakorn-onsri/metatrader-mcp-server-mac) | ❓ | MCP برای MetaTrader | مرجع |
| 27 | [hootnot/oanda-api-v20](https://github.com/hootnot/oanda-api-v20) | MIT ✔ | OANDA | `pip install oandapyV20` |
| 28 | [alpacahq/alpaca-py](https://github.com/alpacahq/alpaca-py) | Apache-2.0 ✔ | سهام آمریکا | `pip install alpaca-py` |
| 29 | [ib-api-reloaded/ib_async](https://github.com/ib-api-reloaded/ib_async) | BSD ✔ | Interactive Brokers | `pip install ib_async` |
| — | MetaTrader5 (رسمی، [PyPI](https://pypi.org/project/MetaTrader5/)) | اختصاصی | API رسمی MT5 (فقط ویندوز) | `pip install MetaTrader5` |

### Z.4 داده‌ی بازار، اقتصاد کلان و Research
| # | پروژه | لایسنس | کاربرد | نصب |
|---|---|---|---|---|
| 30 | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | Apache-2.0 ✔ | داده‌ی Macro، سهام و کریپتو | `pip install openbb` |
| 31 | [mortada/fredapi](https://github.com/mortada/fredapi) | Apache-2.0 ✔ | داده‌های FRED | `pip install fredapi` |
| 32 | [ranaroussi/yfinance](https://github.com/ranaroussi/yfinance) | Apache-2.0 ✔ | داده‌ی تاریخی (استفاده‌ی غیرتجاری از Yahoo) | `pip install yfinance` |
| 33 | [tchala120/forex-factory-scarping](https://github.com/tchala120/forex-factory-scarping) | ❓ | تقویم اقتصادی Forex Factory | مرجع |
| 34 | [microsoft/qlib](https://github.com/microsoft/qlib) | MIT ✔ | ML و Research کوانت | `pip install pyqlib` |
| 35 | [stefan-jansen/machine-learning-for-trading](https://github.com/stefan-jansen/machine-learning-for-trading) | ❓ | مرجع آموزشی ML در ترید | clone→refs |
| 36 | [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | Apache-2.0 ✔ | استخراج وب از منابع مجاز | `pip install crawl4ai` |

### Z.5 تحلیل تکنیکال، SMC/ICT و رژیم بازار
| # | پروژه | لایسنس | کاربرد | نصب |
|---|---|---|---|---|
| 37 | [TA-Lib/ta-lib-python](https://github.com/TA-Lib/ta-lib-python) | BSD ✔ | بیش از ۱۵۰ اندیکاتور و ۶۱ الگوی کندلی | `pip install TA-Lib` |
| 38 | [twopirllc/pandas-ta](https://github.com/twopirllc/pandas-ta) | MIT ✔ | اندیکاتورها و ایچیموکو | `pip install pandas-ta` |
| 39 | [bukosabino/ta](https://github.com/bukosabino/ta) | MIT ✔ | اندیکاتورهای سبک | `pip install ta` |
| 40 | [joshyattridge/smart-money-concepts](https://github.com/joshyattridge/smart-money-concepts) | MIT ✔ | BOS، CHoCH، OB، FVG و نقدینگی | `pip install smartmoneyconcepts` |
| 41 | [BennyThadikaran/stock-pattern](https://github.com/BennyThadikaran/stock-pattern) | ❓ | الگوهای نموداری و هارمونیک | clone→refs |
| 42 | [Sakeeb91/market-regime-detection](https://github.com/Sakeeb91/market-regime-detection) | ❓ | تشخیص رژیم با HMM | clone→refs |
| 43 | [hmmlearn/hmmlearn](https://github.com/hmmlearn/hmmlearn) | BSD ✔ | HMM | `pip install hmmlearn` |
| 44 | [deepcharles/ruptures](https://github.com/deepcharles/ruptures) | BSD ✔ | Change-point | `pip install ruptures` |

### Z.6 اخبار، تحلیل احساسات، شبکه‌های اجتماعی و NLP
| # | پروژه | لایسنس | کاربرد | نصب |
|---|---|---|---|---|
| 45 | [ProsusAI/finBERT](https://github.com/ProsusAI/finBERT) | Apache-2.0 ✔ | احساسات متن مالی | `pip install transformers torch` و مدل `ProsusAI/finbert` |
| 46 | [yya518/FinBERT](https://github.com/yya518/FinBERT) | ❓ | FinBERT برای ارتباطات مالی | مرجع |
| 47 | [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | MIT ✔ | LLM مالی | clone→refs |
| 48 | [AI4Finance-Foundation/FinNLP](https://github.com/AI4Finance-Foundation/FinNLP) | MIT ✔ | جمع‌آوری داده‌ی متنی مالی | clone→refs |
| 49 | [ifieryarrows/stock-sentiment-analysis-finBERT-to-LLM](https://github.com/ifieryarrows/stock-sentiment-analysis-finBERT-to-LLM) | ❓ | FinBERT + Llama 3 | مرجع |
| 50 | [Jay172111420/financial-sentiment-analysis](https://github.com/Jay172111420/financial-sentiment-analysis) | ❓ | احساسات مالی | مرجع |
| 51 | [janthoXO/sentiment-analysis-recommender](https://github.com/janthoXO/sentiment-analysis-recommender) | ❓ | امتیاز خبرها از ‎−۱ تا ‎+۱ | مرجع |
| 52 | [Samarthpatel29/financial-news-sentiment](https://github.com/Samarthpatel29/financial-news-sentiment) | ❓ | داشبورد احساسات از بیش از ۲۵ منبع | مرجع |
| 53 | [nirholas/cryptocurrency.cv](https://github.com/nirholas/cryptocurrency.cv) | ❓ | API رایگان خبر کریپتو، RSS و MCP | مرجع/API |
| 54 | [roccomuso/cryptopanic](https://github.com/roccomuso/cryptopanic) | ❓ | کلاینت CryptoPanic | `npm i cryptopanic` |
| 55 | [Cryptoinsider-it/CryptoSignalBot](https://github.com/Cryptoinsider-it/CryptoSignalBot) | ❓ | پایش اخبار و ریسک | مرجع |
| 56 | [joannawan/cryptoscrape](https://github.com/joannawan/cryptoscrape) | ❓ | اسکرپ انجمن‌ها | مرجع |
| 57 | [lueurxax/crypto-tweet-sense](https://github.com/lueurxax/crypto-tweet-sense) | ❓ | ترندهای توییتر کریپتو | مرجع |
| 58 | [kurtmckee/feedparser](https://github.com/kurtmckee/feedparser) | BSD ✔ | RSS | `pip install feedparser` |
| 59 | [praw-dev/praw](https://github.com/praw-dev/praw) | BSD ✔ | Reddit API | `pip install praw` |
| 60 | [LonamiWebs/Telethon](https://github.com/LonamiWebs/Telethon) | MIT ✔ | کانال‌های عمومی تلگرام | `pip install telethon` |
| 61 | [GeneralMills/pytrends](https://github.com/GeneralMills/pytrends) | Apache-2.0 ✔ | Google Trends | `pip install pytrends` |

### Z.7 آن‌چین و نهنگ‌ها
| # | پروژه | لایسنس | کاربرد | نصب |
|---|---|---|---|---|
| 62 | [ethereum/web3.py](https://github.com/ethereum/web3.py) | MIT ✔ | خواندن زنجیره | `pip install web3` |
| 63 | [Br0ski777/hyperliquid-whales-x402](https://github.com/Br0ski777/hyperliquid-whales-x402) | ❓ | ردیاب ۵۰ تریدر برتر Hyperliquid | مرجع |
| 64 | [jeremylongshore/claude-code-plugins-plus-skills](https://github.com/jeremylongshore/claude-code-plugins-plus-skills) | ❓ | اسکیل monitoring-whale-activity | clone→refs |
| 65 | [aAAaqwq/AGI-Super-Team](https://github.com/aAAaqwq/AGI-Super-Team) | MIT ✔ | اسکیل whale-alert-monitor | clone→refs |

### Z.8 AI، ایجنت‌ها، LLM آفلاین و MLOps
| # | پروژه | لایسنس | کاربرد | نصب |
|---|---|---|---|---|
| 66 | [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Apache-2.0 ❓ | تحلیلگرها، منتقد و تریدر | clone→refs |
| 67 | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT ✔ | الگوی ایجنت‌ها | clone→refs |
| 68 | [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | Apache-2.0 ✔ | تحلیل فاندامنتال | clone→refs |
| 69 | [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT ✔ (برند محدودیت دارد) | یادگیری تقویتی (RL) | clone→refs |
| 70 | [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | چندلایسنسی ⚠ | فقط ایده؛ کپی نشود | مرجع |
| 71 | [ollama/ollama](https://github.com/ollama/ollama) | MIT ✔ | **AI آفلاین** | `curl -fsSL https://ollama.com/install.sh \| sh` |
| 72 | [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) | MIT ✔ | استنتاج روی CPU | build از سورس / Docker |
| 73 | [vllm-project/vllm](https://github.com/vllm-project/vllm) | Apache-2.0 ✔ | استنتاج روی GPU | `pip install vllm` |
| 74 | [mlflow/mlflow](https://github.com/mlflow/mlflow) | Apache-2.0 ✔ | Model Registry | `pip install mlflow` |
| 75 | [microsoft/LightGBM](https://github.com/microsoft/LightGBM) | MIT ✔ | ML کلاسیک | `pip install lightgbm` |
| 76 | [pgvector/pgvector](https://github.com/pgvector/pgvector) | PostgreSQL ✔ | حافظه‌ی برداری (RAG) | افزونه‌ی Postgres + `pip install pgvector` |

### Z.9 بک‌تست و بهینه‌سازی
| # | پروژه | لایسنس | کاربرد | نصب |
|---|---|---|---|---|
| 77 | [polakowo/vectorbt](https://github.com/polakowo/vectorbt) | Apache-2.0 + Commons Clause ⚠ | بک‌تست سریع | `pip install vectorbt` |
| 78 | [kernc/backtesting.py](https://github.com/kernc/backtesting.py) | AGPL-3.0 ⚠ | بک‌تست ساده (ایزوله) | `pip install backtesting` |
| 79 | [mementum/backtrader](https://github.com/mementum/backtrader) | GPL-3.0 ⚠ | بک‌تست (ایزوله) | مرجع |
| 80 | [optuna/optuna](https://github.com/optuna/optuna) | MIT ✔ | بهینه‌سازی پارامترها | `pip install optuna` |

### Z.10 محصول: نمودار، UI، موبایل، صدا، چت و پرداخت
| # | پروژه | لایسنس | کاربرد | نصب |
|---|---|---|---|---|
| 81 | [tradingview/lightweight-charts](https://github.com/tradingview/lightweight-charts) | Apache-2.0 ✔ (attribution) | نمودار ترمینال | `npm install lightweight-charts` |
| 82 | [klinecharts/KLineChart](https://github.com/klinecharts/KLineChart) | Apache-2.0 ✔ | نمودار با ابزار ترسیم | `npm i klinecharts` |
| 83 | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | MIT ✔ | کامپوننت‌های UI | `npx shadcn@latest init` |
| 84 | [expo/expo](https://github.com/expo/expo) | MIT ✔ | اپ موبایل | `npx create-expo-app` |
| 85 | [pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat) | BSD-2 ✔ | دستیار صوتی | `pip install pipecat-ai` |
| 86 | [livekit/agents](https://github.com/livekit/agents) | Apache-2.0 ✔ | دستیار صوتی | `pip install livekit-agents` |
| 87 | [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper) | MIT ✔ | تبدیل گفتار به متن (STT) | `pip install faster-whisper` |
| 88 | [centrifugal/centrifugo](https://github.com/centrifugal/centrifugo) | Apache-2.0 ✔ | چت و WebSocket | Docker |
| 89 | [btcpayserver/btcpayserver](https://github.com/btcpayserver/btcpayserver) | MIT ✔ | درگاه پرداخت کریپتو | Docker |
| 90 | [btcpayserver/btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker) | MIT ✔ | استقرار BTCPay | `git clone` + اسکریپت نصب |
| 91 | [yan253319066/XPayLabs](https://github.com/yan253319066/XPayLabs) | ❓ | درگاه USDT/USDC خودمیزبان | clone→refs |

### Z.11 اسکیل‌ها و ابزارهای Claude Code
| # | پروژه | لایسنس | کاربرد | نصب |
|---|---|---|---|---|
| 92 | [safishamsi/graphify](https://github.com/safishamsi/graphify) (یا [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)) | ❓ | **گراف دانش کد و حافظه‌ی پروژه** | `uv tool install graphifyy && graphify install` |
| 93 | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | ❓ | **سیستم طراحی و UI** | `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` |
| 94 | [agiprolabs/claude-trading-skills](https://github.com/agiprolabs/claude-trading-skills) | ❓ | ۶۷ اسکیل ترید | clone→refs |
| 95 | [SKE-Labs/agent-trading-skills](https://github.com/SKE-Labs/agent-trading-skills) | ❓ | ۵۶ اسکیل ترید | clone→refs |
| 96 | [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | ❓ | SMC و social-media-intelligence | clone→refs |
| 97 | [MobiusQuant/OpenMobius-skill](https://github.com/MobiusQuant/OpenMobius-skill) | ❓ | ICT/SMC با ۹۶۴ کارت دانش | clone→refs |
| 98 | [kukapay/crypto-skills](https://github.com/kukapay/crypto-skills) | ❓ | استراتژیست ترید | clone→refs |
| 99 | [senpi-ai/senpi-skills](https://github.com/senpi-ai/senpi-skills) | ❓ | ترید خودکار | مرجع |
| 100 | [bybit-exchange/skills](https://github.com/bybit-exchange/skills) | MIT ✔ | الگوی SKILL.md صرافی (⚠ دستورهایش را خودکار از راه دور به‌روز می‌کند) | مرجع |
| 101 | [base/demos (trading-agent)](https://github.com/base/demos/tree/master/agents/trading-agent) | ❓ | الگوی اسکیل و CLI | مرجع |

### Z.12 دستورهای یک‌جا

**الف) کلون همه‌ی مراجع برای مطالعه (خارج از مخزن):**
```bash
mkdir -p /root/tikalgo-refs && cd /root/tikalgo-refs
for r in \
  buberlo/jev-trader zadescoxp/Jev-Trades Jev-trading/Jev-trading naimkatiman/alpha-scanner \
  Manjussha/AI-trader freqtrade/freqtrade hummingbot/hummingbot QuantConnect/Lean \
  DeadSecure/Dockerized-MetaTrader5-with-Python-DataBridge django-trader/Metatrader5-Docker \
  ejtraderLabs/Metatrader5-Docker stefan-jansen/machine-learning-for-trading \
  BennyThadikaran/stock-pattern Sakeeb91/market-regime-detection \
  AI4Finance-Foundation/FinGPT AI4Finance-Foundation/FinNLP AI4Finance-Foundation/FinRobot \
  AI4Finance-Foundation/FinRL TauricResearch/TradingAgents virattt/ai-hedge-fund \
  jeremylongshore/claude-code-plugins-plus-skills aAAaqwq/AGI-Super-Team yan253319066/XPayLabs \
  agiprolabs/claude-trading-skills SKE-Labs/agent-trading-skills HKUDS/Vibe-Trading \
  MobiusQuant/OpenMobius-skill kukapay/crypto-skills ; do
  git clone --depth 1 "https://github.com/$r" "$(echo $r | tr / _)" || echo "FAILED: $r"
done
```

**ب) وابستگی‌های پایتون (فقط آن‌هایی که فاز جاری لازم دارد، بعد از بررسی `requirements` فعلی):**
```bash
# اتصال
pip install ccxt hyperliquid-python-sdk oandapyV20 alpaca-py ib_async mt5linux
# داده و Macro
pip install openbb fredapi yfinance crawl4ai pyqlib
# تحلیل
pip install TA-Lib pandas-ta ta smartmoneyconcepts hmmlearn ruptures lightgbm
# اخبار و شبکه‌های اجتماعی
pip install transformers torch feedparser praw telethon pytrends web3
# AI و MLOps
pip install mlflow pgvector vllm          # vllm فقط با GPU
# بک‌تست
pip install vectorbt optuna nautilus_trader vnpy   # لایسنس‌های ⚠ را بخوانید
# صدا
pip install pipecat-ai livekit-agents faster-whisper
```

**ج) وابستگی‌های فرانت‌اند:**
```bash
npm install lightweight-charts klinecharts
npx shadcn@latest init
npm i -g toobit-trade-mcp toobit-trade-cli
```

**د) ابزارهای Claude Code و AI آفلاین:** بخش ۱.۱ همین فایل (Graphify، UI/UX Pro Max و Ollama)

**ه) سرویس‌های Docker:** BTCPay ([btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker))، Centrifugo و MT5 Bridge

### Z.13 بررسی سلامت لینک‌ها (قبل از استفاده روی سرور اجرا کنید)
```bash
grep -oE 'https://github\.com/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+' docs/TIKALGO_MASTER_PROMPT.md | sort -u |
while read u; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -I -L --max-time 15 "$u")
  [ "$code" = "200" ] || echo "$code $u"
done
# هر خطی که چاپ شود یعنی لینک باید بررسی یا جایگزین شود
```

### Z.14 لینک‌های غیرگیت‌هابی (از همه‌ی فهرست‌های قبلی)

| منبع | کاربرد |
|---|---|
| [MetaTrader5 (PyPI)](https://pypi.org/project/MetaTrader5/) | API رسمی پایتون MT5 |
| [metatrader-ai (PyPI)](https://pypi.org/project/metatrader-ai/1.2.1/) | دستیار AI متاتریدر با بیش از ۲۰ اندیکاتور 🔍 |
| [AI-Driven MT5 Bot (Contra)](https://contra.com/community/sJFcZrr7-automate-forex-trading-with-ai-driven-meta-trader) | معماری XGBoost + LSTM + SMC روی MT5 |
| [EA31337 / topic mt5](https://scriptagc.wasmer.app/https_github_com/topics/mt5) | فهرست پروژه‌های MT5 |
| [موضوع news-sentiment در گیت‌هاب](https://github.com/topics/news-sentiment) | فهرست پروژه‌های احساسات خبر |
| [Hybrid News Sentiment Engine (arXiv)](https://arxiv.org/pdf/2606.03457) | مقاله‌ی موتور احساسات خبری |
| [OpenBB/FRED (Autonomous Econ)](https://autonomousecon.substack.com/p/this-little-known-python-package) | راهنمای OpenBB برای داده‌ی Macro |
| [fredpy](https://github.com/letsgoexploring/fredpy) | داده‌های FRED |
| [fedfred](https://pypi.org/project/fedfred/) | کلاینت مدرن FRED (async و کش) |
| [mostlyrightmd-economy](https://pypi.org/project/mostlyrightmd-economy/) | CPI، NFP، GDP و تقویم انتشار 🔍 |
| [openbb-fred](https://pypi.org/project/openbb-fred/1.0.0rc0) | افزونه‌ی FRED برای OpenBB |
| [TA-Lib Python docs](https://docsearch.algolia.com/mcp/docs/repo/ta-lib/ta-lib-python) | مستندات TA-Lib |
| [ta-lib skill](https://claudeskills.info/skills/agiprolabs/claude-trading-skills/ta-lib/) | اسکیل TA-Lib |
| [sentiment-analysis skill](https://claudeskills.info/skills/agiprolabs/claude-trading-skills/sentiment-analysis/) | اسکیل تحلیل احساسات |
| [News Sentiment AI Blueprint](https://tripolskypetr-backtest-kit-docs.static.hf.space/documents/article_06_ai_strategy_blueprint.html) | الگوی استراتژی خبری با AI |
| [Forex Factory Calendar dataset (HuggingFace)](https://huggingface.co/datasets/Tropstan/Forex_Factory_Calendar/blob/main/README.md) | داده‌ی تاریخی تقویم اقتصادی |
| [ForexFactory scraper (Apify)](https://apify.com/xtracto/forexfactory-calendar) | اسکرپر ابری تقویم (پولی) |
| [FinRobot (neurohive)](https://neurohive.io/en/state-of-the-art/finrobot-open-source-multi-agent-framework-for-automated-equity-research/) | معرفی FinRobot |
| [FinRobot paper (arXiv)](https://arxiv.org/html/2411.08804v1) | مقاله‌ی FinRobot |
| [FinMem paper](https://arxiv.org/pdf/2311.13743) | حافظه‌ی لایه‌ای ایجنت |
| [LLM Trading Agents Survey](https://arxiv.org/pdf/2408.06361) | مرور ایجنت‌های LLM |
| [TradingGroup (arXiv)](https://arxiv.org/html/2508.17565v1) | Self-reflection |
| [Best AI Trading Agents 2026](https://pinggy.io/blog/best_ai_trading_agents/) | مرور ایجنت‌ها |
| [The 5 GitHub Repos Rewriting How AI Trades Money](https://themenonlab.blog/blog/ai-finance-github-repos-march-2026) | مرور مخزن‌ها |
| [Vibe-Trading SMC skill](https://tessl.io/registry/skills/github/HKUDS/Vibe-Trading/smc/review) | اسکیل SMC |
| [Vibe-Trading social-media-intelligence](https://tessl.io/registry/skills/github/HKUDS/Vibe-Trading/social-media-intelligence) | اسکیل هوش شبکه‌های اجتماعی |
| [Vibe-Trading elliott-wave skill](https://tessl.io/registry/skills/github/HKUDS/Vibe-Trading/elliott-wave) | اسکیل الیوت |
| [OpenMobius-skill](https://agentskill.work/en/skills/MobiusQuant/OpenMobius-skill) | ICT/SMC |
| [agent-trading-skills README](https://cdn.jsdelivr.net/gh/SKE-Labs/agent-trading-skills@main/README.md) | ۵۶ اسکیل |
| [kukapay trading-strategist](https://claudemarketplaces.com/skills/kukapay/crypto-skills/trading-strategist) | اسکیل استراتژیست |
| [senpi autonomous-trading](https://claudemarketplaces.com/skills/senpi-ai/senpi-skills/autonomous-trading) | اسکیل ترید خودکار |
| [monitoring-whale-activity skill](https://claudeskills.info/skills/jeremylongshore/claude-code-plugins-plus-skills/monitoring-whale-activity/) | نهنگ‌ها |
| [whale-alert-monitor skill](https://claudeskills.info/skills/aAAaqwq/AGI-Super-Team/whale-alert-monitor/) | هشدار نهنگ |
| [Hyperliquid whale tracking (Dwellir)](https://www.dwellir.com/guides/hyperliquid-whale-tracking) | راهنمای پایتون |
| [Hyperliquid tracker (Chainstack)](https://chainstack.com/hyperliquid-on-chain-activity-tracker-build-your-own-telegram-bot/amp/) | ربات تلگرام نهنگ |
| [Hyperliquid whales MCP](https://www.getdrio.com/mcp/io-github-br0ski777-hyperliquid-whales) | MCP نهنگ‌ها |
| [Hyperliquid API guide 2026](https://onekey.so/blog/ecosystem/hyperliquid-api-getting-started-2026/) | راهنمای API |
| [elliott-wave-engine skill (tradecraft)](https://www.skills.sh/mahmoud20138/tradecraft/elliott-wave-engine) | اسکیل الیوت 🔍 |
| [terminalskills trading-agents](https://www.skills.sh/terminalskills/skills/trading-agents) | اسکیل ایجنت ترید 🔍 |
| [Bybit trading skill](https://skills.sh/bybit-exchange/skills/bybit-trading) | ⚠ به‌روزرسانی خودکار از راه دور |
| [Graphify × Claude Code](https://graphify.com/integrations/claude-code) | حافظه‌ی پروژه |
| [UI/UX Pro Max docs](https://www.mintlify.com/nextlevelbuilder/ui-ux-pro-max-skill/platforms/claude-code) | سیستم طراحی |
| QuorumTrading | رأی‌گیری ایجنت‌های تکنیکال، فاندامنتال و احساسات (AGPL ⚠؛ لینک دقیق در جست‌وجو پیدا نشد) |

### Z.15 سبک‌های معاملاتی و استراتژی‌های جدید (Volume Profile، Footprint و...)

| # | پروژه | سبک | لایسنس | نصب |
|---|---|---|---|---|
| 102 | [bfolkens/py-market-profile](https://github.com/bfolkens/py-market-profile) | **Volume Profile و Market Profile (TPO)**: POC، Value Area، Initial Balance و HVN/LVN | BSD ✔ | `pip install marketprofile` ([docs](https://marketprofile.readthedocs.io/)) |
| 103 | [murtazayusuf/OrderflowChart](https://github.com/murtazayusuf/OrderflowChart) | **Footprint Chart** (bid، ask، delta در هر قیمت) با plotly | ❓ | clone→refs |
| 104 | [Vandoriz/MT5-OrderFlow-Footprint-Engine](https://github.com/Vandoriz/MT5-OrderFlow-Footprint-Engine) | **Footprint و Order Flow روی MT5**: imbalance، delta cluster و absorption | ❓ | clone→refs |
| 105 | [nazmiefearmutcu/flowmap](https://github.com/nazmiefearmutcu/flowmap) | **Liquidity Heatmap، DOM و Time & Sales** (WebGL2) برای کریپتو و سهام | ❓ | clone→refs |
| 106 | [nssanta/quant-order-book](https://github.com/nssanta/quant-order-book) | Heatmap اوردربوک با ۵۰۰۰ سطح (Binance، OKX و Bybit) | ❓ | clone→refs |
| 107 | [niall-oc/pyharmonics](https://github.com/niall-oc/pyharmonics) | **الگوهای هارمونیک** | ❓ | `pip install pyharmonics` |
| 108 | [taew (PyPI)](https://pypi.org/project/taew/) | **امواج الیوت** (پیاده‌سازی پایتونی بر اساس یک مقاله) | ❓ | `pip install taew` |
| 109 | [freqtrade/freqtrade-strategies](https://github.com/freqtrade/freqtrade-strategies) | مجموعه‌ی رسمی استراتژی‌های نمونه | GPL-3.0 ⚠ | مرجع |
| 110 | [iterativv/NostalgiaForInfinity](https://github.com/iterativv/NostalgiaForInfinity) | استراتژی پرطرفدار freqtrade (NFIX) | GPL-3.0 ⚠ | مرجع |
| 111 | [OnChainVibe/freqtrade-strategies](https://github.com/OnChainVibe/freqtrade-strategies) | مجموعه‌ی استراتژی‌ها | ❓ | مرجع |
| 112 | [paperswithbacktest/awesome-systematic-trading](https://github.com/paperswithbacktest/awesome-systematic-trading) | بیش از ۴۰ استراتژی توصیف‌شده، ۹۷ کتابخانه و ۵۵ کتاب | ❓ | مرجع |
| 113 | [wangzhe3224/awesome-systematic-trading](https://github.com/wangzhe3224/awesome-systematic-trading) | فهرست ابزارهای ترید سیستماتیک | ❓ | مرجع |
| 114 | [wilsonfreitas/awesome-quant](https://github.com/wilsonfreitas/awesome-quant) | فهرست جامع کتابخانه‌های کوانت | ❓ | مرجع |
| 115 | [LLMQuant/awesome-trading-agents](https://github.com/LLMQuant/awesome-trading-agents) | ایجنت‌ها، MCPها و اسکیل‌های ترید | ❓ | مرجع |
| 116 | [VictorVVedtion/trading-skills](https://github.com/VictorVVedtion/trading-skills) | اسکیل‌های دانش تریدرهای مشهور (Livermore، Soros، Buffett و Simons) | ❓ | clone→refs |
| 117 | [llmquant/quant-wiki](https://docsearch.algolia.com/mcp/docs/repo/llmquant/quant-wiki) | پایگاه دانش کوانت (چینی) | ❓ | مرجع |

**نصب و کلون مراجع سبک‌ها:**
```bash
pip install marketprofile pyharmonics taew      # بعد از بررسی لایسنس (❓)
cd /root/tikalgo-refs
for r in bfolkens/py-market-profile murtazayusuf/OrderflowChart Vandoriz/MT5-OrderFlow-Footprint-Engine \
  nazmiefearmutcu/flowmap nssanta/quant-order-book niall-oc/pyharmonics freqtrade/freqtrade-strategies \
  iterativv/NostalgiaForInfinity paperswithbacktest/awesome-systematic-trading \
  LLMQuant/awesome-trading-agents VictorVVedtion/trading-skills ; do
  git clone --depth 1 "https://github.com/$r" "$(echo $r | tr / _)" || echo "FAILED: $r"
done
```

**منطق سبک‌هایی که کتابخانه‌ی پایتونی معتبر ندارند** (از اسکریپت‌های متن‌باز TradingView؛ فقط منطق، کد Pine کپی نشود):
- **Wyckoff و VSA:** [Volume Climax Detector](https://www.tradingview.com/script/bV5x4Wxe-Volume-Climax-Detector-AGPro-Series/) (Z-Score حجم، Spread و Close Location) · [Wyckoff + VSA](https://www.tradingview.com/script/wFtWIbNb)
- **Footprint:** [Footprint (TradingView)](https://www.tradingview.com/script/X9edevPd/) · [Order Flow docs (LuxAlgo)](https://docs.luxalgo.com/llms.mdx/docs/charts/order-flow/introduction/content.md)
- **TPO:** [TPOLib](https://www.tradingview.com/script/XeSvtb5w-TPOLib/)
- **هارمونیک:** [Harmonic Pattern Detector](https://jp.tradingview.com/script/jmsP8DC6-Harmonic-Pattern-Detector/)

**پرامپت افزودن سبک:**
```text
ADD TRADING STYLE "<Volume Profile|Footprint|Wyckoff-VSA|Harmonic|Elliott|...>":
1) Implement the indicator/engine as a non-repainting worker on closed candles (and on
   trades/orderbook for footprint/order-flow), reusing vendored libs (marketprofile,
   pyharmonics, taew) where license allows, or clean re-implementation from documented logic.
2) Expose its scores to the Scanner (§5 S3) and as overlays on the terminal chart (POC/VAH/VAL,
   footprint cells, delta, imbalance, harmonic PRZ, wave labels).
3) Add the style to Settings → Trading Styles with editable defaults (TFs, RR, SL, trailing).
4) Add a knowledge pack in skills/knowledge/ (§12) and a backtest/paper evaluation.
Persian report + Save State + Deploy & Commit.
```
