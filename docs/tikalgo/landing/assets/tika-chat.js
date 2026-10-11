/* Tika chat widget for the public landing page.
 * 1) Tries the Tika backend:  POST /api/tika/chat  { message, lang, history }  →  { reply }
 *    (read-only, educational, confidential assistant — MASTER_PROMPT §14; runs on local models).
 * 2) If the endpoint is unavailable (static hosting, offline), answers from the built-in bilingual
 *    knowledge base below. Tika never gives buy/sell advice and never reveals internal architecture.
 */
(() => {
  const API = '/api/tika/chat';
  const AVATAR = 'assets/tika.jpg';
  const $ = (s, r = document) => r.querySelector(s);
  const getLang = () => (document.documentElement.lang === 'fa' ? 'fa' : 'en');

  const UI = {
    en: { name: 'Tika', status: 'Online · AI tutor', hint: 'Hi! I am Tika. Ask me anything about TIKALGO or trading concepts.', ph: 'Ask Tika…', send: 'Send',
      foot: 'Educational only — not financial advice.', hello: 'Hi, I am Tika 👋 I can explain how TIKALGO works and teach trading concepts. What would you like to know?',
      sugs: ['What is TIKALGO?', 'Why does the AI say WAIT?', 'What is a liquidity sweep?', 'How do I sign in?'] },
    fa: { name: 'تیکا', status: 'آنلاین · مربی هوشمند', hint: 'سلام! من تیکا هستم. هر سؤالی دربارهٔ تیکالگو یا مفاهیم معامله دارید بپرسید.', ph: 'از تیکا بپرسید…', send: 'ارسال',
      foot: 'فقط آموزشی — توصیهٔ مالی نیست.', hello: 'سلام، من تیکا هستم 👋 می‌توانم توضیح بدهم تیکالگو چطور کار می‌کند و مفاهیم معامله را آموزش بدهم. چه چیزی را می‌خواهید بدانید؟',
      sugs: ['تیکالگو چیست؟', 'چرا هوش مصنوعی می‌گوید صبر کن؟', 'لیکوییدیتی سوییپ چیست؟', 'چطور وارد شوم؟'] },
  };

  // Built-in knowledge base: [keywords (en/fa), answer en, answer fa]
  const KB = [
    [['what is tikalgo', 'tikalgo', 'platform', 'about', 'تیکالگو چیست', 'تیکالگو', 'پلتفرم', 'درباره'],
      'TIKALGO is a multi-market AI trading intelligence platform for crypto, forex, gold, US stocks and ETFs. It connects market structure, liquidity, order flow, derivatives, whales, macro and news, and turns them into explainable, risk-checked decisions. Everything starts in PAPER mode.',
      'تیکالگو یک پلتفرم هوش معاملاتی چندبازاره برای کریپتو، فارکس، طلا، سهام آمریکا و ETF است. ساختار بازار، نقدینگی، جریان سفارش، مشتقات، نهنگ‌ها، ماکرو و اخبار را به هم وصل می‌کند و به تصمیم‌هایی قابل‌توضیح و کنترل‌شده از نظر ریسک تبدیل می‌کند. همه‌چیز با حالت PAPER شروع می‌شود.'],
    [['tikalgo ai', 'offline', 'decision engine', 'آفلاین', 'موتور تصمیم', 'هوش مصنوعی تیکالگو'],
      'TIKALGO AI is our local, offline decision engine. It sits above our quantitative engines, counts only independent evidence, runs an internal critic, compares LONG / SHORT / WAIT, and measures uncertainty. It recommends; the Risk Engine has the final veto.',
      'TIKALGO AI موتور تصمیم محلی و آفلاین ماست. بالای موتورهای کمّی قرار می‌گیرد، فقط شواهد مستقل را می‌شمارد، یک منتقد داخلی دارد، LONG و SHORT و WAIT را مقایسه می‌کند و عدم‌قطعیت را اندازه می‌گیرد. پیشنهاد می‌دهد؛ حق وتوی نهایی با موتور ریسک است.'],
    [['wait', 'no trade', 'why not', 'صبر', 'معامله نکن', 'چرا نه'],
      'WAIT is a valid decision, not a failure. TIKALGO AI waits when evidence conflicts, the regime is uncertain or changing, expected edge after costs is too small, liquidity or spread is poor, news risk is high, or the portfolio is already exposed. Fewer, better trades usually beat many average ones.',
      'WAIT یک تصمیم معتبر است، نه شکست. TIKALGO AI وقتی صبر می‌کند که شواهد متناقض باشند، رژیم نامطمئن یا در حال تغییر باشد، مزیت مورد انتظار بعد از هزینه‌ها کم باشد، نقدینگی یا اسپرد نامناسب باشد، ریسک خبری بالا باشد یا پورتفولیو از قبل درگیر باشد. معاملهٔ کمتر ولی بهتر معمولاً از معاملهٔ زیاد و متوسط بهتر است.'],
    [['liquidity sweep', 'sweep', 'stop hunt', 'سوییپ', 'شکار استاپ', 'لیکوییدیتی'],
      'A liquidity sweep is when price briefly runs past an obvious high or low, where many stop orders sit, and then returns. It can mark a reversal, but TIKALGO only treats it as meaningful when market structure (a CHOCH) and order flow confirm it.',
      'لیکوییدیتی سوییپ یعنی قیمت برای مدت کوتاهی از یک سقف یا کف واضح که حد ضررهای زیادی پشتش است عبور کند و برگردد. می‌تواند نشانهٔ برگشت باشد، اما تیکالگو فقط وقتی آن را معنادار می‌داند که ساختار بازار (CHOCH) و جریان سفارش هم تأییدش کنند.'],
    [['fvg', 'fair value gap', 'imbalance', 'شکاف', 'عدم توازن'],
      'A fair value gap (FVG) is a three-candle imbalance where price moved so fast that the wicks of candles 1 and 3 do not overlap. Price often revisits it. In TIKALGO it is an entry zone, not a signal on its own.',
      'شکاف ارزش منصفانه (FVG) یک عدم‌توازن سه‌کندلی است: قیمت آن‌قدر سریع حرکت کرده که سایه‌های کندل اول و سوم هم‌پوشانی ندارند. قیمت اغلب به آن برمی‌گردد. در تیکالگو FVG یک ناحیهٔ ورود است، نه سیگنال مستقل.'],
    [['order block', 'ob', 'اوردر بلاک'],
      'An order block is the last opposite candle before a strong move that breaks structure — an area where large orders may have been placed. TIKALGO uses it as a zone together with regime and confirmation, never alone.',
      'اوردر بلاک آخرین کندل مخالف قبل از یک حرکت قوی است که ساختار را می‌شکند؛ ناحیه‌ای که ممکن است سفارش‌های بزرگ در آن ثبت شده باشد. تیکالگو آن را همراه با رژیم و تأیید به‌عنوان ناحیه استفاده می‌کند، نه به‌تنهایی.'],
    [['bos', 'choch', 'break of structure', 'change of character', 'شکست ساختار', 'تغییر کاراکتر'],
      'BOS (break of structure) is a break of the last swing in the trend direction — continuation. CHOCH (change of character) is the first break against the trend — a possible reversal. TIKALGO reads both on several timeframes.',
      'BOS یعنی شکست آخرین سقف یا کف در جهت روند؛ نشانهٔ ادامه. CHOCH یعنی اولین شکست خلاف روند؛ احتمال برگشت. تیکالگو هر دو را در چند تایم‌فریم بررسی می‌کند.'],
    [['funding', 'open interest', 'oi', 'فاندینگ', 'اوپن اینترست'],
      'Funding is the periodic payment between longs and shorts in perpetual futures; extreme funding means one side is crowded. Open interest is the total number of open contracts. Rising price with rising OI confirms a move; extremes can warn of a squeeze.',
      'فاندینگ پرداخت دوره‌ای بین لانگ‌ها و شورت‌ها در فیوچرز دائمی است؛ فاندینگ افراطی یعنی یک طرف شلوغ شده. اوپن اینترست تعداد کل قراردادهای باز است. افزایش قیمت همراه با افزایش OI حرکت را تأیید می‌کند؛ مقادیر افراطی می‌توانند هشدار اسکوئیز باشند.'],
    [['risk', 'stop loss', 'position size', ' r ', 'r-multiple', 'ریسک', 'حد ضرر', 'حجم'],
      'TIKALGO measures every trade in R (1R = the amount risked). By default about 0.5% of equity is risked per trade, total open risk is capped, correlated positions share one budget, and size is reduced during drawdowns. Confidence never increases size.',
      'تیکالگو هر معامله را بر حسب R می‌سنجد (1R = مقدار ریسک‌شده). به‌طور پیش‌فرض حدود ۰٫۵٪ سرمایه در هر معامله ریسک می‌شود، ریسک کل سقف دارد، پوزیشن‌های هم‌بسته یک بودجه مشترک دارند و در افت سرمایه حجم کم می‌شود. اطمینان بیشتر هرگز حجم را بالا نمی‌برد.'],
    [['paper', 'live', 'real money', 'کاغذی', 'لایو', 'پول واقعی'],
      'Every plan starts in PAPER mode (simulated trades with realistic costs). LIVE trading is enabled only after backtest, walk-forward, paper and shadow validation — and your explicit approval. It is off by default.',
      'همهٔ پلن‌ها با حالت PAPER (معاملهٔ شبیه‌سازی‌شده با هزینه‌های واقعی) شروع می‌شوند. معاملهٔ LIVE فقط بعد از بک‌تست، walk-forward، PAPER و Shadow و تأیید صریح شما فعال می‌شود و به‌طور پیش‌فرض خاموش است.'],
    [['market', 'crypto', 'forex', 'gold', 'stocks', 'etf', 'بازار', 'کریپتو', 'فارکس', 'طلا', 'سهام'],
      'TIKALGO covers crypto (spot and perpetual futures), forex, gold and metals, US stocks and ETFs — each with its own parameters for volatility, sessions, costs, leverage and data.',
      'تیکالگو کریپتو (اسپات و فیوچرز دائمی)، فارکس، طلا و فلزات، سهام آمریکا و ETF را پوشش می‌دهد؛ هر بازار پارامترهای خودش را برای نوسان، سشن، هزینه، اهرم و داده دارد.'],
    [['price', 'plan', 'cost', 'subscription', 'قیمت', 'پلن', 'اشتراک', 'هزینه'],
      'TIKALGO has one full-access plan with three billing options: Weekly $199/week, Monthly $999/month, or Yearly $799/month billed annually ($9,588/year, about 20% off). Prices are also shown in other currencies and USDT in the Plans section. Choose a plan in the membership request form; it is confirmed after admin approval.',
      'تیکالگو یک پلن دسترسی کامل با سه روش پرداخت دارد: هفتگی ۱۹۹ دلار در هفته، ماهانه ۹۹۹ دلار در ماه، یا سالانه ماهی ۷۹۹ دلار با پرداخت یک‌جا (۹٬۵۸۸ دلار در سال، حدود ۲۰٪ تخفیف). قیمت‌ها با ارزهای دیگر و USDT در بخش «پلن‌ها» آمده‌اند. پلن را در فرم درخواست عضویت انتخاب کنید؛ پس از تأیید مدیر نهایی می‌شود.'],
    [['register', 'sign up', 'join', 'membership', 'member', 'apply', 'ثبت نام', 'ثبت‌نام', 'عضویت', 'عضو'],
      'Membership is reviewed. Fill in the "Request membership" form (Chapter 10) with your name, age, email, mobile, WhatsApp and Telegram. An admin reviews it; after approval your account is created and activated and we contact you with sign-in details.',
      'عضویت با بررسی انجام می‌شود. فرم «درخواست عضویت» (فصل ۱۰) را با نام، سن، ایمیل، موبایل، واتس‌اپ و تلگرام پر کنید. مدیر آن را بررسی می‌کند؛ پس از تأیید، حساب شما ساخته و فعال می‌شود و اطلاعات ورود برایتان ارسال می‌شود.'],
    [['sign in', 'login', 'log in', 'account', 'ورود', 'حساب'],
      'Members use the "Sign In" button at the top of the page. Not a member yet? Send a membership request; accounts are activated after admin approval.',
      'اعضا از دکمهٔ «ورود» بالای صفحه استفاده می‌کنند. هنوز عضو نیستید؟ درخواست عضویت بفرستید؛ حساب‌ها پس از تأیید مدیر فعال می‌شوند.'],
    [['contact', 'telegram', 'instagram', 'youtube', 'twitter', 'tradingview', 'support', 'تماس', 'ارتباط', 'تلگرام', 'اینستاگرام', 'یوتیوب', 'پشتیبانی'],
      'Contact channels: Admin on Telegram @ad_tikalgo (t.me/ad_tikalgo) · Telegram channel t.me/Tikalgoai · X x.com/TikalgoAi · Instagram instagram.com/tikalgoai · YouTube youtube.com/@tikalgoai · TradingView in.tradingview.com/u/Tikalgo',
      'راه‌های ارتباطی: ادمین در تلگرام ‎@ad_tikalgo (t.me/ad_tikalgo) · کانال تلگرام t.me/Tikalgoai · ایکس x.com/TikalgoAi · اینستاگرام instagram.com/tikalgoai · یوتیوب youtube.com/@tikalgoai · تریدینگ‌ویو in.tradingview.com/u/Tikalgo'],
    [['tika', 'who are you', 'تیکا', 'تو کی هستی'],
      'I am Tika, the TIKALGO tutor. I explain the platform and trading concepts in a simple way. I am educational and read-only: I never place trades or give personal investment advice.',
      'من تیکا هستم، مربی تیکالگو. پلتفرم و مفاهیم معامله را ساده توضیح می‌دهم. آموزشی و فقط‌خواندنی هستم: هرگز معامله ثبت نمی‌کنم و توصیهٔ سرمایه‌گذاری شخصی نمی‌دهم.'],
    [['contact', 'support', 'telegram', 'instagram', 'youtube', 'تماس', 'پشتیبانی', 'تلگرام'],
      'You can message the TIKALGO admin on Telegram (@ad_tikalgo), or follow us on Telegram (t.me/Tikalgoai), X (@TikalgoAi), Instagram (@tikalgoai), YouTube (@tikalgoai) and TradingView (Tikalgo). Links are in the footer.',
      'می‌توانید به ادمین تیکالگو در تلگرام (‎@ad_tikalgo) پیام دهید، یا از طریق کانال تلگرام (t.me/Tikalgoai)، ایکس (@TikalgoAi)، اینستاگرام (@tikalgoai)، یوتیوب (@tikalgoai) و تریدینگ‌ویو (Tikalgo) با تیکالگو در ارتباط باشید. لینک‌ها در پایین صفحه هستند.'],
  ];
  const ADVICE = /(should i (buy|sell|long|short)|buy now|sell now|signal for|price target|will .* (go up|pump|dump)|بخرم|بفروشم|لانگ بگیرم|شورت بگیرم|الان بخر|سیگنال بده|پامپ|دامپ)/i;
  const SECRET = /(source code|architecture|server|api key|password|prompt|سورس|معماری|سرور|رمز|کلید api|پرامپت)/i;

  function localAnswer(q, lang) {
    const s = ` ${q.toLowerCase()} `;
    if (ADVICE.test(s)) return lang === 'fa'
      ? 'من توصیهٔ خرید یا فروش نمی‌دهم. می‌توانم توضیح بدهم تیکالگو چطور یک ستاپ را می‌سنجد: رژیم، شواهد مستقل، نسبت سود به ریسک و هزینه‌ها. هر تصمیم مسئولیت خودتان است و ریسک بالایی دارد.'
      : 'I don\'t give buy or sell advice. I can explain how TIKALGO evaluates a setup — regime, independent evidence, reward-to-risk and costs. Any trading decision is yours and carries substantial risk.';
    if (SECRET.test(s)) return lang === 'fa'
      ? 'جزئیات فنی داخلی و امنیتی تیکالگو محرمانه است. خوشحال می‌شوم دربارهٔ امکانات و مفاهیم معامله توضیح بدهم.'
      : 'TIKALGO\'s internal and security details are confidential. I\'m happy to explain the features and trading concepts.';
    let best = null, score = 0;
    for (const [keys, en, fa] of KB) {
      const sc = keys.reduce((a, k) => a + (s.includes(k.toLowerCase()) ? k.length : 0), 0);
      if (sc > score) { score = sc; best = lang === 'fa' ? fa : en; }
    }
    return best || (lang === 'fa'
      ? 'سؤال خوبی است! پاسخ دقیقش را ندارم. می‌توانید دربارهٔ تیکالگو، TIKALGO AI، مدیریت ریسک، PAPER و LIVE، یا مفاهیمی مثل FVG، اوردر بلاک، BOS/CHOCH و فاندینگ بپرسید.'
      : 'Good question! I don\'t have a precise answer here. Try asking about TIKALGO, TIKALGO AI, risk management, paper vs live, or concepts like FVG, order blocks, BOS/CHOCH and funding.');
  }

  async function ask(q, history) {
    const lang = getLang();
    try {
      const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 8000);
      const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: q, lang, history: history.slice(-8) }), signal: ctrl.signal });
      clearTimeout(t);
      if (r.ok) { const j = await r.json(); if (j && typeof j.reply === 'string' && j.reply.trim()) return j.reply; }
    } catch { /* fall back to the built-in knowledge base */ }
    return localAnswer(q, lang);
  }

  function build() {
    const fab = document.createElement('button');
    fab.className = 'tk-fab'; fab.type = 'button'; fab.setAttribute('aria-haspopup', 'dialog'); fab.setAttribute('aria-controls', 'tkPanel');
    fab.innerHTML = `<img src="${AVATAR}" alt=""><span class="ping" aria-hidden="true"></span>`;
    const hint = document.createElement('div'); hint.className = 'tk-hint'; hint.setAttribute('aria-hidden', 'true');
    const panel = document.createElement('section');
    panel.className = 'tk-panel'; panel.id = 'tkPanel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'false');
    panel.innerHTML = `<header class="tk-head"><img src="${AVATAR}" alt=""><div><div class="name"></div><div class="st"></div></div><button class="x" type="button" aria-label="Close">×</button></header>
      <div class="tk-log" aria-live="polite"></div><div class="tk-sugs"></div>
      <form class="tk-form"><label class="sr-only" for="tkInput">Message</label><input id="tkInput" autocomplete="off" maxlength="500"><button type="submit"></button></form>
      <div class="tk-foot"></div>`;
    document.body.append(hint, panel, fab);

    const log = $('.tk-log', panel), input = $('#tkInput', panel), sugs = $('.tk-sugs', panel);
    const history = [];
    let greeted = false;

    function applyLang() {
      const u = UI[getLang()];
      fab.setAttribute('aria-label', u.name); panel.setAttribute('aria-label', u.name);
      $('.name', panel).textContent = u.name; $('.st', panel).textContent = u.status;
      input.placeholder = u.ph; $('.tk-form button', panel).textContent = u.send; $('.tk-foot', panel).textContent = u.foot;
      hint.textContent = u.hint;
      sugs.innerHTML = ''; u.sugs.forEach((q) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = q; b.onclick = () => send(q); sugs.appendChild(b); });
    }
    function add(text, who) {
      const m = document.createElement('div'); m.className = `tk-msg ${who}`; m.textContent = text; log.appendChild(m); log.scrollTop = log.scrollHeight; return m;
    }
    async function send(q) {
      q = q.trim(); if (!q) return;
      add(q, 'me'); input.value = ''; history.push({ role: 'user', content: q });
      const typing = add('', 'bot'); typing.innerHTML = '<span class="tk-typing"><i></i><i></i><i></i></span>';
      const headImg = $('.tk-head img', panel); fab.classList.add('speaking'); headImg.classList.add('speaking');
      const [reply] = await Promise.all([ask(q, history), new Promise((r) => setTimeout(r, 450))]);
      typing.textContent = reply; history.push({ role: 'assistant', content: reply }); log.scrollTop = log.scrollHeight;
      fab.classList.remove('speaking'); headImg.classList.remove('speaking');
    }
    function open(on) {
      panel.classList.toggle('open', on); fab.setAttribute('aria-expanded', on); hint.classList.remove('show');
      $('.ping', fab)?.remove();
      if (on) { if (!greeted) { add(UI[getLang()].hello, 'bot'); greeted = true; } setTimeout(() => input.focus(), 150); }
    }
    fab.addEventListener('click', () => open(!panel.classList.contains('open')));
    $('.x', panel).addEventListener('click', () => { open(false); fab.focus(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('open')) { open(false); fab.focus(); } });
    $('.tk-form', panel).addEventListener('submit', (e) => { e.preventDefault(); send(input.value); });
    window.addEventListener('tk:lang', applyLang);
    applyLang();
    setTimeout(() => { if (!panel.classList.contains('open')) { hint.classList.add('show'); setTimeout(() => hint.classList.remove('show'), 6000); } }, 4000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
