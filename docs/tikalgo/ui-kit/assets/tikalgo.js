/* TIKALGO UI kit — shared Tailwind config, brand tokens and demo chrome (LTR/RTL toggle). */
(window.tailwind = window.tailwind || {}).config = {
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0A1712', 800: '#13281F', 700: '#1C3A2D' },   // --brand-bg
        brand: { DEFAULT: '#3DDC2F', dark: '#1FA81F', soft: '#E9FBE6' }, // --brand-green
        ai: { DEFAULT: '#FF7A1A', soft: '#FFF1E6' },                    // --brand-orange (AI accents only)
        down: { DEFAULT: '#F6465D', soft: '#FEECEE' },                  // loss / negative
      },
      fontFamily: {
        sans: ['Inter', 'Vazirmatn', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
};
(function () {
  const fonts = document.createElement('link');
  fonts.rel = 'stylesheet';
  fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Vazirmatn:wght@400;500;700&display=swap';
  document.head.appendChild(fonts);
  const icon = document.createElement('link');
  icon.rel = 'icon'; icon.href = 'assets/favicon.svg'; icon.type = 'image/svg+xml';
  document.head.appendChild(icon);
  document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.chrome === 'off') return;
    const bar = document.createElement('div');
    bar.className = 'fixed top-3 end-3 z-50 flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-2 py-1 text-xs shadow-sm backdrop-blur';
    bar.innerHTML = '<a href="index.html" class="flex items-center gap-1.5 rounded-full px-2 py-1 hover:bg-neutral-100"><img src="assets/tikalgo-mark.svg" alt="" class="size-4 rounded">Gallery</a>' +
      '<button type="button" id="tk-dir" class="rounded-full px-2 py-1 font-medium hover:bg-neutral-100">RTL</button>';
    document.body.appendChild(bar);
    const btn = bar.querySelector('#tk-dir');
    btn.addEventListener('click', () => {
      const rtl = document.documentElement.dir !== 'rtl';
      document.documentElement.dir = rtl ? 'rtl' : 'ltr';
      btn.textContent = rtl ? 'LTR' : 'RTL';
    });
  });
})();
