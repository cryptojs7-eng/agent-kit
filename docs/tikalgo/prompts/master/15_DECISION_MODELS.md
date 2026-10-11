> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 15. مدل‌های تصمیم: Jev + مدل‌های آفلاین و ابری (قابل انتخاب و قابل افزودن)

> **قاعده:** تصمیم‌گیری معاملاتی **قابل اتصال به چند مدل** است. **TypeSafe/Jev یکی از مدل‌های تصمیم** است (پیش‌فرض)، در کنار مدل‌های **آفلاین** (Ollama، llama.cpp و vLLM) و مدل‌های **ابری** (از طریق 9router). کاربر از Settings مدل تصمیم و ترتیب fallback را انتخاب می‌کند. مدل‌های جدید از طریق Model Registry اضافه می‌شوند.
> **ثابت برای همه‌ی مدل‌ها:** هیچ مدلی مستقیم سفارش نمی‌دهد. خروجی همه‌ی مدل‌ها **تصمیم ساختاریافته** است که از Policy، Risk و Execution Gate عبور می‌کند.

### 15.1 مدل‌های تصمیم پشتیبانی‌شده
| مدل | نوع | آنلاین یا آفلاین | یادداشت |
|---|---|---|---|
| **TypeSafe/Jev** | Decision model تخصصی (بردار احتمال تایپ‌شده) | **آنلاین (API)** | پیش‌فرض. در [jev-trader](https://github.com/buberlo/jev-trader) و [Jev-Trades](https://github.com/zadescoxp/Jev-Trades) به‌صورت سرویس TypeSafe با کلید API (`TYPESAFE_API_KEY`) استفاده شده است. اگر TypeSafe نسخه‌ی on-prem بدهد، با نام `jev-local` اضافه می‌شود. |
| **Ollama** (مثل Qwen2.5 یا Llama 3.1) | LLM عمومی با خروجی JSON طبق schema | **آفلاین** | تصمیم‌گیری بدون اینترنت و بدون هزینه‌ی API؛ روی CPU کندتر است |
| **llama.cpp و vLLM** | LLM محلی | **آفلاین** | vLLM برای سرور دارای GPU |
| **مدل‌های ابری از طریق 9router** (مثل Claude یا مدل‌های OpenRouter) | LLM عمومی | آنلاین | برای Reasoning عمیق یا به‌عنوان مدل تصمیم |
| **مدل ML کلاسیک** (LightGBM یا مدل‌های Qlib، آموزش‌دیده روی داده‌ی خودمان) | Classifier یا Regressor | **آفلاین** | سریع، قطعی و قابل بک‌تست کامل |
| **قواعد قطعی (Deterministic Rules)** | بدون مدل | آفلاین | آخرین پله‌ی fallback |

### 15.2 انتخاب و زنجیره‌ی fallback (از Settings)
- برای هر کاربر و **جداگانه برای PAPER و LIVE**: `decision_model` اصلی، به‌علاوه‌ی **زنجیره‌ی fallback** به ترتیب دلخواه. نمونه‌ها:
  - آنلاین: `Jev → Ollama(qwen2.5) → Deterministic`
  - کاملاً آفلاین: `Ollama(qwen2.5) → LightGBM → Deterministic`
- امکان **حالت Ensemble یا رأی‌گیری** (اختیاری): چند مدل نظر می‌دهند و Policy با قاعده‌ی تعریف‌شده ترکیب می‌کند (مثلاً اکثریت یا حداقل confidence).
- وقتی همه‌ی مدل‌های زنجیره در دسترس نیستند، **Fallback Ladder قطعی** اجرا می‌شود: `REDUCED_SIZE → HOLD_LAST_STATE (با TTL) → DETERMINISTIC_RULES (فقط مدیریت پوزیشن‌های باز و سفت کردن SL؛ ورود جدید ممنوع) → CIRCUIT_BREAKER`
- **برای LIVE** فقط مدل‌هایی قابل انتخاب‌اند که وضعیت `approved_for_live` دارند (۱۵.۴).

### 15.3 قرارداد تصمیم (یکسان برای همه‌ی مدل‌ها)
- **ورودی:** snapshot قطعی از featureها (فقط کندل‌های بسته‌شده، non-repainting، حدود ۴۰۰ توکن)، رژیم، شواهد (TA، SMC، جریان سفارش، OI، فاندینگ، نهنگ‌ها و اخبار) و وضعیت حساب **بدون هیچ credential**
- **خروجی:** JSON تایپ‌شده (direction probabilities، confidence، entry zone، invalidation و reasoning کوتاه) که با **schema validation** بررسی می‌شود. پاسخ نامعتبر رد می‌شود و پله‌ی بعدی زنجیره اجرا می‌شود.
- برای LLMهای عمومی: **structured output / JSON mode** و temperature پایین
- **کالیبراسیون** confidence برای هر مدل (Platt یا Isotonic) روی نتایج ژورنال
- **Policy Engine** (کد ما) احتمال‌ها را با آستانه‌های قابل تنظیم به `LONG / SHORT / HOLD / WATCH` و اقدامات پوزیشن تبدیل می‌کند، و بعد Risk ← Execution Gate
- **لاگ:** مدل، نسخه، تأخیر، پله‌ی زنجیره، وضعیت degraded، ورودی و خروجی (بدون داده‌ی حساس)

### 15.4 افزودن مدل جدید و ارتقا (Model Registry)
- **ثبت:** `model_id، provider (typesafe | ollama | llamacpp | vllm | 9router | ml)، version، offline: bool، latency، cost، capabilities، status`
- **چرخه‌ی وضعیت:** `registered → benchmarked (روی دیتاست ارزیابی و بک‌تست) → paper_approved → approved_for_live`. هر ارتقا تأیید کاربر یا مدیر لازم دارد.
- **مقایسه‌ی مدل‌ها:** دقت جهت، Expectancy، کالیبراسیون، تأخیر و هزینه، در یک داشبورد

### 15.5 تنظیمات (در بخش ۱۰، گروه مدل‌های AI)
مدل تصمیم و زنجیره‌ی fallback (جدا برای PAPER و LIVE)؛ حالت Ensemble؛ کلید TypeSafe و کلیدهای ابری (رمزنگاری‌شده و ماسک‌شده)؛ endpoint و مدل‌های Ollama؛ timeout و retry؛ آستانه‌های Policy برای هر سبک؛ پله‌ها و TTLهای Fallback Ladder؛ نمایش سلامت و تأخیر هر مدل در UI.

### 15.6 تست‌ها
- انتخاب مدل بدون `approved_for_live` برای LIVE ← رد
- مدل اول در دسترس نیست ← رفتن به مدل بعدی زنجیره، با `degraded=true` در UI؛ همه‌ی مدل‌ها در دسترس نیستند ← Fallback Ladder و بدون ورود جدید
- خروجی با schema نامعتبر ← رد و رفتن به پله‌ی بعد
- **تست کاملاً آفلاین:** با اینترنت قطع، مسیر سیگنال تا سفارش PAPER با مدل محلی کار می‌کند
- هیچ کلیدی در لاگ، frontend یا prompt مدل‌ها ظاهر نمی‌شود
