/* TIKALGO landing — content, i18n (EN/FA), canvas visuals and GSAP motion. No framework. */
(() => {
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------------- i18n ---------------- */
  const T = {
    en: {
      'nav.platform': 'Platform', 'nav.markets': 'Markets', 'nav.ai': 'TIKALGO AI', 'nav.integrations': 'Integrations', 'nav.plans': 'Plans',
      'cta.login': 'Sign In', 'cta.discover': 'Discover TIKALGO', 'cta.enter': 'Sign In to TIKALGO', 'cta.discover2': 'Discover the platform',
      'hero.eyebrow': 'AI-assisted market intelligence', 'hero.t1': 'See the Market', 'hero.t2': 'Differently.',
      'hero.lead': 'One intelligent ecosystem that connects market structure, liquidity, order flow, macro and news — and turns them into explainable, risk-checked decisions across crypto, forex, gold, US stocks and ETFs.',
      'hero.badgeAi': 'TIKALGO AI · OFFLINE',
      's.bsl': 'Buy-side liquidity', 's.ob': 'Order block', 's.fvg': 'Fair value gap', 's.ssl': 'Sell-side liquidity',
      'ch1.eyebrow': 'Chapter 01 — Structure', 'ch1.title': 'Beyond the candle lies the structure.',
      'ch1.lead': 'TIKALGO reads price as a living map — swing points, BOS and CHOCH, liquidity pools, order blocks and fair value gaps — and the forces moving between them.',
      'ch2.eyebrow': 'Chapter 02 — Intelligence', 'ch2.title': 'Every signal, connected.',
      'ch2.lead': 'Independent analytical layers feed one decision context. Indicators that say the same thing count once — only independent evidence adds conviction.',
      'ch3.eyebrow': 'Chapter 03 — Markets', 'ch3.title': 'One lens. Five markets.', 'ch3.note': 'Illustrative visualization — not live market data.',
      'ch4.eyebrow': 'Chapter 04 — Process', 'ch4.title': 'From data to decision.',
      'ch4.lead': 'Every decision passes the same disciplined path. The AI recommends; the Risk Engine has the final veto.',
      'ch4.warn': '⚠ AI can make mistakes. Trading involves substantial risk. Risk management remains essential, and every decision should be reviewed.',
      'ch5.eyebrow': 'Chapter 05 — TIKALGO AI', 'ch5.title': 'An AI that knows when to wait.',
      'ch5.lead': 'TIKALGO AI is a local, offline decision engine above our quantitative engines. It weighs independent evidence, challenges itself, measures uncertainty — and only proposes a trade when there is real, cost-adjusted edge.',
      'ch6.eyebrow': 'Chapter 06 — Toolkit', 'ch6.title': 'Instruments of clarity.',
      'ch7.eyebrow': 'Chapter 07 — Tika', 'ch7.title': 'Meet Tika, your AI trading tutor.',
      'ch8.eyebrow': 'Chapter 08 — Ecosystem', 'ch8.title': 'Connected to where you trade.',
      'ch9.eyebrow': 'Chapter 09 — Plans', 'ch9.title': 'Start in paper. Grow with proof.', 'ch9.currency': 'Currency',
      'ch9.lead': 'Every plan starts in PAPER mode. LIVE trading is enabled only after validation and your explicit approval.',
      'cta.t1': 'Your next perspective', 'cta.t2': 'starts here.', 'cta.lead': 'A connected approach to financial intelligence and AI-assisted trading.',
      'foot.tag': 'Trade smarter. Trade with confidence.', 'foot.rights': 'All rights reserved.',
      'foot.risk': 'Trading involves substantial risk of loss. Nothing on this site is financial advice. Past performance does not guarantee future results.',
    },
    fa: {
      'nav.platform': 'پلتفرم', 'nav.markets': 'بازارها', 'nav.ai': 'TIKALGO AI', 'nav.integrations': 'اتصال‌ها', 'nav.plans': 'پلن‌ها',
      'cta.login': 'ورود', 'cta.discover': 'آشنایی با تیکالگو', 'cta.enter': 'ورود به تیکالگو', 'cta.discover2': 'آشنایی با پلتفرم',
      'hero.eyebrow': 'هوش بازار با کمک هوش مصنوعی', 'hero.t1': 'بازار را', 'hero.t2': 'متفاوت ببینید.',
      'hero.lead': 'یک اکوسیستم هوشمند که ساختار بازار، نقدینگی، جریان سفارش، ماکرو و اخبار را به هم وصل می‌کند و آن‌ها را به تصمیم‌هایی قابل‌توضیح و کنترل‌شده از نظر ریسک تبدیل می‌کند؛ در کریپتو، فارکس، طلا، سهام آمریکا و ETF.',
      'hero.badgeAi': 'TIKALGO AI · آفلاین',
      's.bsl': 'نقدینگی سمت خرید', 's.ob': 'اوردر بلاک', 's.fvg': 'شکاف ارزش منصفانه', 's.ssl': 'نقدینگی سمت فروش',
      'ch1.eyebrow': 'فصل ۰۱ — ساختار', 'ch1.title': 'پشت هر کندل، یک ساختار است.',
      'ch1.lead': 'تیکالگو قیمت را مثل یک نقشهٔ زنده می‌خواند: سقف و کف‌ها، BOS و CHOCH، استخرهای نقدینگی، اوردر بلاک‌ها و FVGها، و نیروهایی که بین آن‌ها حرکت می‌کنند.',
      'ch2.eyebrow': 'فصل ۰۲ — هوش', 'ch2.title': 'همهٔ سیگنال‌ها، به هم پیوسته.',
      'ch2.lead': 'لایه‌های تحلیلی مستقل به یک زمینهٔ تصمیم واحد می‌رسند. اندیکاتورهایی که یک حرف را می‌زنند یک بار شمرده می‌شوند؛ فقط شواهد مستقل اطمینان را بالا می‌برند.',
      'ch3.eyebrow': 'فصل ۰۳ — بازارها', 'ch3.title': 'یک نگاه. پنج بازار.', 'ch3.note': 'نمایش تصویری — دادهٔ زندهٔ بازار نیست.',
      'ch4.eyebrow': 'فصل ۰۴ — فرایند', 'ch4.title': 'از داده تا تصمیم.',
      'ch4.lead': 'هر تصمیم از یک مسیر منضبط عبور می‌کند. هوش مصنوعی پیشنهاد می‌دهد؛ حق وتوی نهایی با موتور ریسک است.',
      'ch4.warn': '⚠ هوش مصنوعی ممکن است اشتباه کند. معامله ریسک زیادی دارد؛ مدیریت ریسک ضروری است و هر تصمیم باید بررسی شود.',
      'ch5.eyebrow': 'فصل ۰۵ — TIKALGO AI', 'ch5.title': 'هوشی که می‌داند کی صبر کند.',
      'ch5.lead': 'TIKALGO AI یک موتور تصمیم محلی و آفلاین بالای موتورهای کمّی ماست. شواهد مستقل را می‌سنجد، خودش را به چالش می‌کشد، عدم‌قطعیت را اندازه می‌گیرد و فقط وقتی معامله پیشنهاد می‌دهد که مزیت واقعی، بعد از هزینه‌ها، وجود داشته باشد.',
      'ch6.eyebrow': 'فصل ۰۶ — ابزارها', 'ch6.title': 'ابزارهایی برای وضوح.',
      'ch7.eyebrow': 'فصل ۰۷ — تیکا', 'ch7.title': 'با تیکا، مربی معاملاتی هوشمندتان آشنا شوید.',
      'ch8.eyebrow': 'فصل ۰۸ — اکوسیستم', 'ch8.title': 'متصل به جایی که معامله می‌کنید.',
      'ch9.eyebrow': 'فصل ۰۹ — پلن‌ها', 'ch9.title': 'با معاملهٔ کاغذی شروع کنید. با اثبات رشد کنید.', 'ch9.currency': 'ارز',
      'ch9.lead': 'همهٔ پلن‌ها با حالت PAPER شروع می‌شوند. معاملهٔ LIVE فقط بعد از اعتبارسنجی و تأیید صریح شما فعال می‌شود.',
      'cta.t1': 'نگاه تازهٔ شما', 'cta.t2': 'از اینجا شروع می‌شود.', 'cta.lead': 'رویکردی پیوسته به هوش مالی و معامله با کمک هوش مصنوعی.',
      'foot.tag': 'هوشمندانه‌تر معامله کنید. با اطمینان معامله کنید.', 'foot.rights': 'تمام حقوق محفوظ است.',
      'foot.risk': 'معامله با ریسک قابل‌توجه زیان همراه است. هیچ محتوایی در این سایت توصیهٔ مالی نیست. عملکرد گذشته تضمینی برای نتایج آینده نیست.',
    },
  };
  const DATA = {
    en: {
      layers: ['Technical Analysis', 'SMC & ICT', 'Liquidity', 'Order Flow · CVD', 'Open Interest', 'Funding', 'Liquidations', 'Whales & On-chain', 'Macro', 'News & Sentiment', 'Market Regime', 'Risk Engine'],
      core: ['TIKALGO', 'AI'],
      markets: [
        { k: 'Crypto', d: 'Spot and perpetual futures with funding, open interest, liquidation maps and whale flows — including Hyperliquid positions.', c: ['Funding & OI', 'Liquidation maps', 'Whale flows', 'CVD'] },
        { k: 'Forex', d: 'Session-aware majors and crosses with macro releases, rate differentials and DXY context.', c: ['Sessions', 'Economic calendar', 'DXY & yields', 'Spread-aware'] },
        { k: 'Gold & Metals', d: 'Gold and silver read through real yields, the dollar and risk sentiment, with London/NY session logic.', c: ['Real yields', 'DXY', 'Session ranges', 'Volatility regime'] },
        { k: 'US Stocks', d: 'Regular-hours structure, earnings windows, sector exposure and gap-aware risk.', c: ['Earnings windows', 'Sector exposure', 'Gap risk', 'Relative strength'] },
        { k: 'ETFs', d: 'Index and thematic ETFs for lower-volatility, longer-horizon trend and allocation views.', c: ['Trend persistence', 'Allocation', 'Breadth', 'Low turnover'] },
      ],
      steps: [
        ['Market Data', 'Point-in-time prices, order flow, derivatives, macro and news — no future data, no repainting.'],
        ['Regime', 'Trend, range, breakout, volatility and stress — with stability and transition awareness.'],
        ['Signals', 'Existing TIKALGO strategies propose candidates with entry, invalidation and targets.'],
        ['TIKALGO AI', 'Independent evidence, counterfactuals and an internal critic decide LONG, SHORT or WAIT.', true],
        ['Portfolio Check', 'Correlation clusters and exposure budgets prevent hidden concentration.'],
        ['Risk Engine', 'Hard limits, drawdown ladder and liquidation-distance checks — with veto power.'],
        ['Execution or Your Approval', 'Cost-aware order choice; LIVE only after validation and explicit approval.'],
      ],
      ai: [
        ['Fully offline', 'Local models on our own infrastructure — no cloud AI in the decision path.'],
        ['Says WAIT', 'Conflicting evidence, high uncertainty or poor execution? It does not force a trade.'],
        ['Explains itself', 'Every decision shows why, why not, why now and why this size — from the real inputs.'],
        ['Risk has the veto', 'Confidence never increases position size. The Risk Engine can reduce or reject anything.'],
        ['Learns under control', 'Every trade is audited; improvements go through backtest, paper and shadow before use.'],
      ],
      stats: [[7, '', 'decision stages'], [12, '+', 'evidence layers'], [5, '', 'markets'], [0, '', 'cloud AI calls in the decision path']],
      tools: [
        ['AI Signals', 'Regime-aware setups with entry, stop and targets.', 'g'], ['Market Scanner', 'Ranks opportunities by edge, risk and liquidity.', 'g'],
        ['Liquidity Heatmap', 'Walls, sweeps and imbalance zones.', 'o'], ['Whale Intelligence', 'Large positions and flows, in context.', 'g'],
        ['Market Regime', 'Trend, range and stress probabilities.', 'g'], ['Backtest Lab', 'Walk-forward, Monte Carlo and cost stress.', 'g'],
        ['Risk Manager', 'Exposure, heat and drawdown in R.', 'r'], ['Journal & Autopsy', 'Prediction vs reality for every trade.', 'g'],
      ],
      chat: [
        ['user', 'Tika, what does "liquidity sweep" mean?'],
        ['tika', 'Price briefly runs past an obvious high or low where many stops sit, then returns. TIKALGO only treats it as meaningful when structure and order flow confirm it.'],
        ['user', 'Why did the AI say WAIT on BTC today?'],
        ['tika', 'The 4h trend was up, but funding was extreme and the regime was weakening — two independent warnings. Waiting is a valid decision, not a failure.'],
      ],
      venues: [['Hyperliquid', 'Evaluation', 'eval'], ['CoinEx', 'Evaluation', 'eval'], ['BingX', 'Evaluation', 'eval'], ['MT5 brokers', 'Planned', 'eval'], ['LBank', 'Market data only', 'data']],
      plans: [
        { n: 'Weekly', p: 199, per: '/week', bill: 'Billed weekly · cancel anytime', d: 'Full access for a short, focused period.' },
        { n: 'Monthly', p: 999, per: '/month', bill: 'Billed monthly', d: 'Full access with monthly flexibility.' },
        { n: 'Yearly', p: 799, per: '/month', bill: 'Billed yearly: TOTAL · save 20%', total: 799 * 12, d: 'Best value for committed traders.', pop: true },
      ],
      features: ['AI Active Signals in all 5 markets', 'TIKALGO AI decisions with explanations', 'Unlimited paper trading & backtest lab', 'Journal, trade autopsy & risk manager', 'Tika AI tutor'],
      planCta: 'Sign in to choose', popular: 'Best value', perMap: { '/week': '/week', '/month': '/month' },
    },
    fa: {
      layers: ['تحلیل تکنیکال', 'SMC و ICT', 'نقدینگی', 'جریان سفارش · CVD', 'اوپن اینترست', 'فاندینگ', 'لیکوییدیشن', 'نهنگ‌ها و آنچین', 'ماکرو', 'اخبار و احساسات', 'رژیم بازار', 'موتور ریسک'],
      core: ['TIKALGO', 'AI'],
      markets: [
        { k: 'کریپتو', d: 'اسپات و فیوچرز دائمی با فاندینگ، اوپن اینترست، نقشهٔ لیکوییدیشن و جریان نهنگ‌ها، از جمله پوزیشن‌های Hyperliquid.', c: ['فاندینگ و OI', 'نقشهٔ لیکوییدیشن', 'جریان نهنگ‌ها', 'CVD'] },
        { k: 'فارکس', d: 'جفت‌ارزهای اصلی و فرعی با توجه به سشن‌ها، داده‌های اقتصادی، اختلاف نرخ بهره و شاخص دلار.', c: ['سشن‌ها', 'تقویم اقتصادی', 'دلار و بازده', 'حساس به اسپرد'] },
        { k: 'طلا و فلزات', d: 'طلا و نقره از دریچهٔ بازده واقعی، دلار و احساسات ریسک، با منطق سشن لندن و نیویورک.', c: ['بازده واقعی', 'شاخص دلار', 'رنج سشن', 'رژیم نوسان'] },
        { k: 'سهام آمریکا', d: 'ساختار ساعات معاملاتی، پنجرهٔ گزارش سود، اکسپوژر بخشی و ریسک گپ.', c: ['گزارش سود', 'اکسپوژر بخشی', 'ریسک گپ', 'قدرت نسبی'] },
        { k: 'ETFها', d: 'ETFهای شاخصی و موضوعی برای دیدگاه روندی و تخصیص بلندمدت‌تر با نوسان کمتر.', c: ['تداوم روند', 'تخصیص', 'پهنای بازار', 'گردش کم'] },
      ],
      steps: [
        ['دادهٔ بازار', 'قیمت، جریان سفارش، مشتقات، ماکرو و اخبار در لحظهٔ تصمیم؛ بدون دادهٔ آینده و بدون ریپینت.'],
        ['رژیم', 'روند، رنج، شکست، نوسان و استرس، با توجه به پایداری و گذار رژیم.'],
        ['سیگنال‌ها', 'استراتژی‌های تیکالگو کاندیداها را با ورود، ابطال و اهداف پیشنهاد می‌دهند.'],
        ['TIKALGO AI', 'شواهد مستقل، سناریوهای جایگزین و یک منتقد داخلی تصمیم می‌گیرند: LONG، SHORT یا WAIT.', true],
        ['بررسی پورتفولیو', 'خوشه‌های هم‌بسته و بودجهٔ اکسپوژر جلوی تمرکز پنهان را می‌گیرند.'],
        ['موتور ریسک', 'سقف‌های سخت، کاهش پله‌ای در افت سرمایه و بررسی فاصلهٔ لیکوییدیشن، با حق وتو.'],
        ['اجرا یا تأیید شما', 'انتخاب سفارش با توجه به هزینه؛ LIVE فقط بعد از اعتبارسنجی و تأیید صریح.'],
      ],
      ai: [
        ['کاملاً آفلاین', 'مدل‌های محلی روی زیرساخت خود ما؛ هیچ AI ابری در مسیر تصمیم نیست.'],
        ['می‌گوید صبر کن', 'شواهد متناقض، عدم‌قطعیت بالا یا اجرای ضعیف؟ معامله را تحمیل نمی‌کند.'],
        ['خودش را توضیح می‌دهد', 'هر تصمیم نشان می‌دهد چرا، چرا نه، چرا الان و چرا این حجم؛ از روی ورودی‌های واقعی.'],
        ['وتو با ریسک است', 'اطمینان بیشتر هرگز حجم را بالا نمی‌برد. موتور ریسک می‌تواند هر چیزی را کم یا رد کند.'],
        ['یادگیری کنترل‌شده', 'هر معامله کالبدشکافی می‌شود؛ بهبودها قبل از استفاده از بک‌تست، PAPER و Shadow می‌گذرند.'],
      ],
      stats: [[7, '', 'مرحلهٔ تصمیم'], [12, '+', 'لایهٔ شواهد'], [5, '', 'بازار'], [0, '', 'فراخوانی AI ابری در مسیر تصمیم']],
      tools: [
        ['سیگنال‌های هوشمند', 'ستاپ‌های رژیم‌محور با ورود، حد ضرر و اهداف.', 'g'], ['اسکنر بازار', 'رتبه‌بندی فرصت‌ها بر اساس مزیت، ریسک و نقدینگی.', 'g'],
        ['هیت‌مپ نقدینگی', 'دیوارها، sweepها و نواحی عدم‌توازن.', 'o'], ['هوش نهنگ‌ها', 'پوزیشن‌ها و جریان‌های بزرگ، در بستر بازار.', 'g'],
        ['رژیم بازار', 'احتمال روند، رنج و استرس.', 'g'], ['آزمایشگاه بک‌تست', 'Walk-forward، مونت‌کارلو و تست هزینه.', 'g'],
        ['مدیر ریسک', 'اکسپوژر، ریسک کل و افت سرمایه بر حسب R.', 'r'], ['ژورنال و کالبدشکافی', 'پیش‌بینی در برابر واقعیت برای هر معامله.', 'g'],
      ],
      chat: [
        ['user', 'تیکا، «لیکوییدیتی سوییپ» یعنی چه؟'],
        ['tika', 'قیمت برای مدت کوتاهی از یک سقف یا کف واضح که حد ضررهای زیادی پشتش است عبور می‌کند و برمی‌گردد. تیکالگو فقط وقتی آن را معنادار می‌داند که ساختار و جریان سفارش هم تأییدش کنند.'],
        ['user', 'چرا امروز هوش مصنوعی روی بیت‌کوین گفت صبر کن؟'],
        ['tika', 'روند ۴ ساعته صعودی بود، اما فاندینگ در حد افراطی بود و رژیم در حال ضعیف شدن؛ دو هشدار مستقل. صبر کردن یک تصمیم معتبر است، نه شکست.'],
      ],
      venues: [['Hyperliquid', 'در حال ارزیابی', 'eval'], ['CoinEx', 'در حال ارزیابی', 'eval'], ['BingX', 'در حال ارزیابی', 'eval'], ['بروکرهای MT5', 'برنامه‌ریزی‌شده', 'eval'], ['LBank', 'فقط دادهٔ بازار', 'data']],
      plans: [
        { n: 'هفتگی', p: 199, per: '/week', bill: 'پرداخت هفتگی · لغو در هر زمان', d: 'دسترسی کامل برای یک دورهٔ کوتاه و متمرکز.' },
        { n: 'ماهانه', p: 999, per: '/month', bill: 'پرداخت ماهانه', d: 'دسترسی کامل با انعطاف ماهانه.' },
        { n: 'سالانه', p: 799, per: '/month', bill: 'پرداخت سالانه: TOTAL · ۲۰٪ صرفه‌جویی', total: 799 * 12, d: 'بهترین ارزش برای معامله‌گران جدی.', pop: true },
      ],
      features: ['سیگنال‌های هوشمند در هر ۵ بازار', 'تصمیم‌ها و توضیحات TIKALGO AI', 'معاملهٔ کاغذی و آزمایشگاه بک‌تست نامحدود', 'ژورنال، کالبدشکافی معامله و مدیر ریسک', 'مربی هوشمند تیکا'],
      planCta: 'برای انتخاب وارد شوید', popular: 'بهترین ارزش', perMap: { '/week': '/هفته', '/month': '/ماه' },
    },
  };
  // Demo FX rates and tax notes. In production, read them from the billing API.
  const CUR = {
    USD: { rate: 1, locale: 'en-US', round: 1, tax: { en: 'Prices exclude sales tax where applicable.', fa: 'قیمت‌ها بدون مالیات فروش (در صورت شمول) هستند.' } },
    USDT: { rate: 1, locale: 'en-US', round: 1, crypto: true, tax: { en: 'Pay with USDT (TRC20/ERC20). Network fees are paid by the sender.', fa: 'پرداخت با USDT (TRC20/ERC20). کارمزد شبکه با پرداخت‌کننده است.' } },
    EUR: { rate: 0.92, locale: 'de-DE', round: 1, tax: { en: 'Prices include VAT for EU customers.', fa: 'قیمت‌ها برای مشتریان اتحادیهٔ اروپا شامل مالیات بر ارزش افزوده است.' } },
    GBP: { rate: 0.79, locale: 'en-GB', round: 1, tax: { en: 'Prices include 20% UK VAT.', fa: 'قیمت‌ها شامل ۲۰٪ مالیات بر ارزش افزودهٔ بریتانیاست.' } },
    JPY: { rate: 150, locale: 'ja-JP', round: 100, tax: { en: 'Prices include 10% consumption tax.', fa: 'قیمت‌ها شامل ۱۰٪ مالیات مصرف ژاپن است.' } },
    INR: { rate: 83, locale: 'en-IN', round: 100, tax: { en: 'Prices exclude 18% GST.', fa: 'قیمت‌ها بدون ۱۸٪ GST هستند.' } },
  };

  let lang = 'en';
  try { lang = localStorage.getItem('tk-lang') || ((navigator.language || '').startsWith('fa') ? 'fa' : 'en'); } catch { /* storage blocked */ }
  if (!T[lang]) lang = 'en';
  let marketIdx = 0;
  let motionDone = false; // after first reveal, re-rendered content must stay visible
  const rv = () => (motionDone ? '' : ' reveal');

  /* ---------------- render dynamic sections ---------------- */
  function renderStatic() {
    const t = T[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach((el) => { const v = t[el.dataset.i18n]; if (v) el.textContent = v; });
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    $('#year').textContent = new Date().getFullYear();
  }

  function renderNetwork() {
    const d = DATA[lang], svg = $('#network'), W = 1200, H = 640, cx = W / 2, cy = H / 2;
    const n = d.layers.length;
    let lines = '', nodes = '', pulses = '';
    d.layers.forEach((label, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const rx = 420, ry = 238, x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
      const qx = cx + Math.cos(a + 0.35) * rx * 0.45, qy = cy + Math.sin(a + 0.35) * ry * 0.45;
      const col = label.match(/Risk|ریسک/) ? '#F6465D' : i % 4 === 2 ? '#E9C46A' : '#2FD08A';
      const path = `M${x.toFixed(1)} ${y.toFixed(1)} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${cx} ${cy}`;
      lines += `<path id="np${i}" class="nline" d="${path}" fill="none" stroke="${col}" stroke-opacity=".35" stroke-width="1.4"/>`;
      pulses += `<circle r="3.5" fill="${col}"><animateMotion dur="${(2.6 + (i % 4) * 0.5).toFixed(1)}s" begin="${(i * 0.25).toFixed(2)}s" repeatCount="indefinite"><mpath href="#np${i}"/></animateMotion></circle>`;
      const anchor = Math.abs(Math.cos(a)) < 0.2 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end';
      const tx = x + (anchor === 'start' ? 14 : anchor === 'end' ? -14 : 0), ty = y + (Math.sin(a) > 0.3 ? 26 : Math.sin(a) < -0.3 ? -14 : 5);
      nodes += `<g class="nnode"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="${col}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" fill="${col}" opacity=".12"/>
        <text class="node-label" x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="${anchor}">${label}</text></g>`;
    });
    const core = `<g class="ncore"><circle cx="${cx}" cy="${cy}" r="112" fill="none" stroke="#FF7A1A" stroke-opacity=".18"><animate attributeName="r" values="100;124;100" dur="4s" repeatCount="indefinite"/></circle>
      <circle cx="${cx}" cy="${cy}" r="92" fill="#0A1712" stroke="#FF7A1A" stroke-width="2"/>
      <image href="assets/tikalgo-mark.svg" x="${cx - 26}" y="${cy - 58}" width="52" height="52"/>
      <text class="core-label" x="${cx}" y="${cy + 26}" text-anchor="middle">${d.core[0]}</text>
      <text class="core-label" x="${cx}" y="${cy + 50}" text-anchor="middle" style="font-size:15px;fill:#FFB27A">${d.core[1]}</text></g>`;
    svg.innerHTML = lines + (REDUCED ? '' : pulses) + nodes + core;
    $('#marquee').innerHTML = [...d.layers, ...d.layers].map((l) => `<span class="badge">${l}</span>`).join('');
  }

  function renderMarkets() {
    const d = DATA[lang];
    $('#marketTabs').innerHTML = d.markets.map((m, i) => `<button role="tab" aria-selected="${i === marketIdx}" data-i="${i}">${m.k}</button>`).join('');
    $$('#marketTabs button').forEach((b) => b.addEventListener('click', () => { marketIdx = +b.dataset.i; renderMarkets(); seedMarket(); }));
    const m = d.markets[marketIdx];
    $('#marketInfo').innerHTML = `<p class="eyebrow">${String(marketIdx + 1).padStart(2, '0')} / 05</p><h3>${m.k}</h3><p>${m.d}</p><div class="chips">${m.c.map((c) => `<span class="chip">${c}</span>`).join('')}</div>`;
  }

  function renderSteps() {
    const wrap = $('#steps');
    $$('.step', wrap).forEach((s) => s.remove());
    DATA[lang].steps.forEach(([h, p, ai], i) => {
      const el = document.createElement('div');
      el.className = 'step' + (ai ? ' ai' : '');
      el.innerHTML = `<span class="n">${String(i + 1).padStart(2, '0')}</span><h4>${h}</h4><p>${p}</p>`;
      wrap.appendChild(el);
    });
  }

  function renderAI() {
    const d = DATA[lang];
    const icons = ['⌂', '⏸', '?', '⛨', '↻'];
    $('#aiPoints').innerHTML = d.ai.map(([h, p], i) => `<div class="ai-point"><span class="ic" aria-hidden="true">${icons[i]}</span><div><h5>${h}</h5><p>${p}</p></div></div>`).join('');
    $('#stats').innerHTML = d.stats.map(([v, suf, l]) => `<div class="stat${rv()}"><div class="v"><span class="count" data-to="${v}">0</span>${suf}</div><div class="l">${l}</div></div>`).join('');
  }

  function sparkPath(seed, up) {
    let y = 30, d = 'M0 30';
    for (let i = 1; i <= 20; i++) { y += Math.sin(seed * 7 + i * 1.3) * 7 + (up ? -0.9 : 0.6); y = Math.max(6, Math.min(40, y)); d += ` L${i * 10} ${y.toFixed(1)}`; }
    return d;
  }
  function renderTools() {
    const col = { g: '#2FD08A', o: '#FF7A1A', r: '#F6465D' };
    $('#tools').innerHTML = DATA[lang].tools.map(([h, p, c], i) => `<article class="tool${rv()}"><h5>${h}</h5><p>${p}</p>
      <svg viewBox="0 0 200 46" preserveAspectRatio="none" aria-hidden="true"><path class="spark" d="${sparkPath(i + 1, c !== 'r')}" stroke="${col[c]}"/></svg></article>`).join('');
  }

  function renderTika() {
    $('#bubbles').innerHTML = DATA[lang].chat.map(([who, txt]) => `<div class="bubble ${who === 'user' ? 'user' : ''}${rv()}">${txt}</div>`).join('');
  }

  function renderVenues() {
    $('#venues').innerHTML = DATA[lang].venues.map(([n, s, c]) => `<div class="venue"><span>${n}</span><span class="s ${c}">${s}</span></div>`).join('');
  }

  function renderPlans() {
    const d = DATA[lang], code = $('#currency').value, c = CUR[code];
    const fmt = (v) => {
      const x = Math.round((v * c.rate) / c.round) * c.round;
      if (c.crypto) return `${new Intl.NumberFormat('en-US').format(x)} USDT`;
      return new Intl.NumberFormat(c.locale, { style: 'currency', currency: code, maximumFractionDigits: 0 }).format(x);
    };
    $('#plansGrid').innerHTML = d.plans.map((p) => `<article class="plan ${p.pop ? 'pop' : ''}${rv()}">
        ${p.pop ? `<span class="tag-pop">${d.popular}</span>` : ''}
        <h3>${p.n}</h3>
        <div class="price"><span dir="ltr">${fmt(p.p)}</span><small>${d.perMap[p.per]}</small></div>
        <div class="seat">${p.bill.replace('TOTAL', `<span dir="ltr">${fmt(p.total || 0)}</span>`)}</div>
        <p class="desc">${p.d}</p>
        <ul>${d.features.map((f) => `<li>${f}</li>`).join('')}</ul>
        <a href="/login" class="btn ${p.pop ? 'btn-primary' : 'btn-ghost'}">${d.planCta}</a>
      </article>`).join('');
    $('#taxNote').textContent = c.tax[lang];
  }

  /* ---------------- decision-trace typing ---------------- */
  const TRACE = [
    ['k', 'decision   '], ['g', 'LONG BTCUSDT'], ['', '  · crypto_perp · 4h/1h/15m\n'],
    ['k', 'regime     '], ['', 'TREND_UP 0.82 · stable\n'],
    ['k', 'support    '], ['g', 'trend +0.91  structure +0.83  cvd +0.76\n'],
    ['k', 'conflict   '], ['r', 'funding −0.31  htf wall −0.22\n'],
    ['k', 'critic     '], ['', 'PASS (1 medium)\n'],
    ['k', 'evidence   '], ['', '4 independent groups · conflict LOW\n'],
    ['k', 'counterfact'], ['', ' LONG +0.62R · WAIT +0.18R · SHORT −0.41R\n'],
    ['k', 'uncertainty'], ['', ' 0.21 ≤ 0.35 ✓\n'],
    ['k', 'risk       '], ['o', '0.5% equity'], ['', ' · heat 1.6R · liq-dist ✓\n'],
    ['k', 'final      '], ['g', 'APPROVED by Risk Engine'], ['', ' (size −10%)\n'],
    ['k', '# illustrative example — not a trade recommendation'],
  ];
  let traceStarted = false;
  function typeTrace() {
    if (traceStarted) return; traceStarted = true;
    const el = $('#trace');
    if (REDUCED) { el.innerHTML = TRACE.map(([c, s]) => `<span class="${c}">${s}</span>`).join(''); return; }
    let seg = 0, ch = 0, html = '';
    const tick = () => {
      if (seg >= TRACE.length) { el.innerHTML = html + '<span class="caret"></span>'; return; }
      const [c, s] = TRACE[seg];
      ch++;
      const cur = `<span class="${c}">${s.slice(0, ch)}</span>`;
      el.innerHTML = html + cur + '<span class="caret"></span>';
      if (ch >= s.length) { html += `<span class="${c}">${s}</span>`; seg++; ch = 0; }
      setTimeout(tick, s[ch - 1] === '\n' ? 120 : 14);
    };
    tick();
  }

  /* ---------------- canvases ---------------- */
  function fitCanvas(cv) {
    const r = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.max(1, r.width * dpr); cv.height = Math.max(1, r.height * dpr);
    const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: r.width, h: r.height };
  }
  function makeCandles(n, start = 100, vol = 1.6, drift = 0.25) {
    const out = []; let p = start;
    for (let i = 0; i < n; i++) {
      const o = p, c = o + (Math.random() - 0.5 + drift * 0.1) * vol * 2 + drift * 0.4;
      const hi = Math.max(o, c) + Math.random() * vol, lo = Math.min(o, c) - Math.random() * vol;
      out.push({ o, c, hi, lo }); p = c;
    }
    return out;
  }
  function drawCandles(ctx, w, h, cs, alpha = 1, curve = true, levels = true) {
    ctx.clearRect(0, 0, w, h);
    const min = Math.min(...cs.map((c) => c.lo)), max = Math.max(...cs.map((c) => c.hi));
    const pad = h * 0.12, y = (v) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
    const bw = w / cs.length;
    if (levels) {
      ctx.setLineDash([2, 6]); ctx.lineWidth = 1;
      [['BSL', max, '#2FD08A'], ['EQ', (max + min) / 2, '#E9C46A'], ['SSL', min, '#F6465D']].forEach(([t, v, col]) => {
        ctx.strokeStyle = col + '55'; ctx.beginPath(); ctx.moveTo(0, y(v)); ctx.lineTo(w, y(v)); ctx.stroke();
        ctx.fillStyle = col + '99'; ctx.font = '10px JetBrains Mono, monospace'; ctx.fillText(t, w - 34, y(v) - 6);
      });
      ctx.setLineDash([]);
    }
    cs.forEach((c, i) => {
      const x = i * bw + bw / 2, up = c.c >= c.o;
      ctx.globalAlpha = alpha * (0.35 + 0.65 * (i / cs.length));
      ctx.strokeStyle = ctx.fillStyle = up ? '#2FD08A' : '#F6465D';
      ctx.beginPath(); ctx.moveTo(x, y(c.hi)); ctx.lineTo(x, y(c.lo)); ctx.lineWidth = 1; ctx.stroke();
      const top = y(Math.max(c.o, c.c)), bh = Math.max(2, Math.abs(y(c.o) - y(c.c)));
      ctx.fillRect(x - bw * 0.3, top, bw * 0.6, bh);
    });
    ctx.globalAlpha = 1;
    if (curve) {
      ctx.strokeStyle = 'rgba(233,196,106,.75)'; ctx.lineWidth = 2; ctx.beginPath();
      let ema = cs[0].c; cs.forEach((c, i) => { ema = ema + (c.c - ema) * 0.15; const x = i * bw + bw / 2; i ? ctx.lineTo(x, y(ema)) : ctx.moveTo(x, y(ema)); });
      ctx.stroke();
    }
  }
  function animatedChart(cv, n, opts = {}) {
    let cs = makeCandles(n, 100, opts.vol || 1.6, opts.drift ?? 0.25), dims = fitCanvas(cv), visible = true;
    const draw = () => drawCandles(dims.ctx, dims.w, dims.h, cs, opts.alpha || 1, opts.curve !== false, opts.levels !== false);
    draw();
    new ResizeObserver(() => { dims = fitCanvas(cv); draw(); }).observe(cv);
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(cv);
    if (!REDUCED) setInterval(() => {
      if (!visible || document.hidden) return;
      const last = cs[cs.length - 1];
      const nx = makeCandles(1, last.c, opts.vol || 1.6, opts.drift ?? 0.25)[0];
      cs = [...cs.slice(1), nx]; draw();
    }, opts.every || 900);
    return { reseed: (o = {}) => { cs = makeCandles(n, 100, o.vol || 1.6, o.drift ?? 0.25); draw(); } };
  }
  let marketChart;
  const MARKET_PROFILE = [{ vol: 2.6, drift: 0.3 }, { vol: 0.9, drift: 0.05 }, { vol: 1.3, drift: 0.2 }, { vol: 1.5, drift: 0.15 }, { vol: 0.8, drift: 0.22 }];
  function seedMarket() { marketChart && marketChart.reseed(MARKET_PROFILE[marketIdx]); }

  /* ---------------- motion ---------------- */
  function counters() {
    $$('.count').forEach((el) => {
      const to = +el.dataset.to; if (REDUCED || !to) { el.textContent = to; return; }
      let start; const dur = 1400;
      const step = (ts) => { start ??= ts; const k = Math.min(1, (ts - start) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  function motion() {
    const hasGSAP = window.gsap && window.ScrollTrigger;
    if (REDUCED || !hasGSAP) {
      document.documentElement.classList.add('no-motion');
      // Fallback reveal without GSAP.
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.style.transition = 'opacity .8s, transform .8s'; e.target.style.opacity = 1; e.target.style.transform = 'none'; io.unobserve(e.target); } }), { threshold: 0.12 });
      $$('.reveal').forEach((el) => io.observe(el));
      const stepsIO = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('on', e.isIntersecting)), { rootMargin: '-35% 0px -35% 0px' });
      $$('.step').forEach((s) => stepsIO.observe(s));
      new IntersectionObserver(([e]) => { if (e.isIntersecting) { typeTrace(); counters(); } }).observe($('#ai'));
      motionDone = true;
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    // Hero intro
    gsap.from('.hero .h-xl .line > span', { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.12, delay: 0.1 });
    gsap.to('.hero .reveal', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.5 });
    gsap.to('#heroBg', { yPercent: 12, scale: 1.16, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    // Section reveals
    $$('.chapter .reveal, .cta .reveal').forEach((el) => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
    // Structure path drawing
    const path = $('#structPath'), dot = $('#structDot'), len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '#structure', start: 'top 75%', end: 'bottom 40%', scrub: 0.6,
      onUpdate: (st) => { const p = path.getPointAtLength(len * st.progress); dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); } } });
    // Network nodes pop
    gsap.from('#network .nnode', { scale: 0, transformOrigin: 'center', opacity: 0, duration: 0.6, ease: 'back.out(2)', stagger: 0.05, scrollTrigger: { trigger: '#network', start: 'top 75%' } });
    gsap.from('#network .nline', { opacity: 0, duration: 1.2, stagger: 0.04, scrollTrigger: { trigger: '#network', start: 'top 75%' } });
    // Process rail + steps
    gsap.to('#railFill', { height: '100%', ease: 'none', scrollTrigger: { trigger: '#steps', start: 'top 60%', end: 'bottom 60%', scrub: true } });
    $$('.step').forEach((s) => ScrollTrigger.create({ trigger: s, start: 'top 62%', end: 'bottom 38%', toggleClass: 'on' }));
    // AI trace + counters
    ScrollTrigger.create({ trigger: '#ai', start: 'top 60%', once: true, onEnter: () => { typeTrace(); counters(); } });
    // Tool sparklines draw
    $$('.spark').forEach((p) => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }); gsap.to(p, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: p, start: 'top 92%' } }); });
    // Nav background
    ScrollTrigger.create({ start: 80, onUpdate: (st) => $('#nav').classList.toggle('scrolled', st.scroll() > 80) });
    motionDone = true;
  }

  /* ---------------- boot ---------------- */
  function renderAll() {
    renderStatic(); renderNetwork(); renderMarkets(); renderSteps(); renderAI(); renderTools(); renderTika(); renderVenues(); renderPlans();
  }
  function boot() {
    renderAll();
    animatedChart($('#heroCanvas'), 70, { alpha: 0.55, every: 1100 });
    marketChart = animatedChart($('#marketCanvas'), 48, MARKET_PROFILE[0]);
    animatedChart($('#ctaCanvas'), 60, { alpha: 0.35, levels: false, every: 1300 });
    $('#currency').addEventListener('change', renderPlans);
    $$('.lang button').forEach((b) => b.addEventListener('click', () => {
      lang = b.dataset.lang; try { localStorage.setItem('tk-lang', lang); } catch { /* ignore */ }
      renderAll(); window.dispatchEvent(new CustomEvent('tk:lang', { detail: lang })); if (window.ScrollTrigger) { $$('.reveal').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; }); ScrollTrigger.refresh(); }
      $$('.step').forEach((s) => { const r = s.getBoundingClientRect(); s.classList.toggle('on', r.top < innerHeight * 0.62 && r.bottom > innerHeight * 0.38); });
      if (traceStarted) { traceStarted = false; typeTrace(); }
      counters();
    }));
    motion();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
