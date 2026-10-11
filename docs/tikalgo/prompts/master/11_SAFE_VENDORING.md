> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 11. استفاده‌ی مستقیم از کد پروژه‌ها و اسکیل‌ها (Vendoring امن)

> خواسته‌ی شما: «اگر پروژه‌ها و اسکیل‌ها واقعاً مفیدند، عیناً کدشان را استفاده کنید، با حفظ امنیت.» این کار **مجاز است، با رعایت لایسنس و امنیت**.

**کد با لایسنس MIT، Apache-2.0، BSD یا ISC: استفاده‌ی مستقیم مجاز است**
- از طریق پکیج (`pip` یا `npm`)، یا کپی در `third_party/<name>/` همراه با **فایل LICENSE و NOTICE اصلی**، **SHA کامیت ثابت**، و ثبت در `third_party/MANIFEST.md` (نام، لینک، لایسنس، SHA، تاریخ، تغییرات ما)

**کد GPL، AGPL یا LGPL** (مثل freqtrade، OctoBot، backtrader، backtesting.py، nautilus و EA31337)
- کپی در هسته‌ی تجاری بسته **مجاز نیست**، چون الزام می‌کند کل کد تیک‌الگو منتشر شود
- **دو راه قانونی:**
  1. اجرا به‌صورت **سرویس جدا** (مثلاً کانتینر جدا با ارتباط از راه API، که با ادعای حقوقی مشخص و بعد از مشورت حقوقی انجام می‌شود)
  2. **پیاده‌سازی تمیز ایده** با کد خودمان

**لایسنس نامعلوم (❓)**
- تا مشخص شدن لایسنس، فقط برای مطالعه استفاده می‌شود

**پروتکل امنیتی قبل از ورود هر کد یا اسکیل:**
1. بررسی و `pip-audit` یا `npm audit`
2. اسکن secret با gitleaks
3. بررسی دستی بخش‌های شبکه، فایل و اجرای دستور
4. حذف کد تله‌متری یا به‌روزرسانی خودکار از راه دور (مثل اسکیل Bybit)
5. اجرای تست‌ها در sandbox
6. اجرای paper
7. ثبت در `DECISIONS.md`

**پرامپت:**
```text
VENDOR "<repo>" (pin commit SHA). Check license: if MIT/Apache/BSD/ISC → vendor into
third_party/<name>/ with LICENSE/NOTICE + MANIFEST entry, or add as pinned dependency; if
GPL/AGPL/LGPL → do NOT copy into core; propose isolated service or clean re-implementation.
Run security protocol (audit, gitleaks, manual review of network/fs/exec, remove remote
auto-update/telemetry), wrap behind our interfaces + feature flag, add tests, paper-test.
Persian report + Save State.
```
