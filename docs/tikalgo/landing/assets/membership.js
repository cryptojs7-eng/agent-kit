/* TIKALGO — membership request form.
 * POST /api/membership/applications → the request is stored as "pending".
 * An admin reviews it; on approval the backend creates and activates the account
 * and contacts the applicant. This page never creates accounts and never fakes success. */
(() => {
  'use strict';
  const API = '/api/membership/applications';
  const form = document.getElementById('joinForm');
  if (!form) return;
  const $ = (id) => document.getElementById(id);
  const lang = () => (document.documentElement.lang === 'fa' ? 'fa' : 'en');

  const M = {
    en: {
      name: 'Enter your full name.', age: 'Age must be between 18 and 100.', email: 'Enter a valid email address.',
      mobile: 'Enter a valid number with country code, e.g. +98 912 345 6789.', whatsapp: 'Enter a valid WhatsApp number with country code.',
      telegram: 'Telegram username: 5–32 letters, digits or _.', terms: 'Please accept the terms.', risk: 'Please confirm the risk disclosure.',
      done: (id) => `<b>Request received${id ? ` (#${id})` : ''}.</b><br>Your request is pending admin review. After approval your account is created and activated, and we contact you by your preferred channel with sign-in details.`,
      dup: 'A request with this email or mobile is already under review. We will contact you.',
      rate: 'Too many requests. Please try again later.',
      fail: 'Your request could not be sent. Please try again, or message the admin on Telegram: @ad_tikalgo (t.me/ad_tikalgo)',
    },
    fa: {
      name: 'نام و نام خانوادگی را وارد کنید.', age: 'سن باید بین ۱۸ تا ۱۰۰ باشد.', email: 'یک ایمیل معتبر وارد کنید.',
      mobile: 'شمارهٔ معتبر با کد کشور وارد کنید؛ مثلاً ‎+98 912 345 6789.', whatsapp: 'شمارهٔ واتس‌اپ معتبر با کد کشور وارد کنید.',
      telegram: 'نام کاربری تلگرام: ۵ تا ۳۲ حرف انگلیسی، عدد یا _.', terms: 'لطفاً شرایط را بپذیرید.', risk: 'لطفاً بیانیهٔ ریسک را تأیید کنید.',
      done: (id) => `<b>درخواست شما ثبت شد${id ? ` (شماره ${id})` : ''}.</b><br>درخواست در انتظار بررسی مدیر است. پس از تأیید، حساب شما ساخته و فعال می‌شود و اطلاعات ورود از راه ارتباطی انتخابی‌تان ارسال می‌شود.`,
      dup: 'درخواستی با این ایمیل یا موبایل در حال بررسی است. با شما تماس می‌گیریم.',
      rate: 'تعداد درخواست‌ها زیاد است. کمی بعد دوباره تلاش کنید.',
      fail: 'ارسال درخواست ممکن نشد. دوباره تلاش کنید یا به ادمین در تلگرام پیام دهید: ‎@ad_tikalgo',
    },
  };

  const PHONE = /^\+[1-9]\d{7,14}$/;
  const TG = /^@?[A-Za-z0-9_]{5,32}$/;
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const normPhone = (v) => {
    let x = String(v || '').replace(/[\s\-().]/g, '').replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    if (x.startsWith('00')) x = '+' + x.slice(2);
    return x;
  };

  const wa = $('jWhatsapp'), same = $('jSameWa');
  const syncWa = () => { wa.disabled = same.checked; if (same.checked) wa.value = $('jMobile').value; };
  same.addEventListener('change', syncWa);
  $('jMobile').addEventListener('input', () => same.checked && syncWa());
  syncWa();

  // Plan buttons ("Request membership") preselect the plan.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-plan]');
    if (a && a.dataset.plan) $('jPlan').value = a.dataset.plan;
  });

  function setErr(input, msg) {
    const field = input.closest('.field') || input.closest('.check');
    let t = field && field.querySelector('.err-t');
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
      if (field && !t) { t = document.createElement('span'); t.className = 'err-t'; field.appendChild(t); }
      if (t) t.textContent = msg;
    } else {
      input.removeAttribute('aria-invalid');
      if (t) t.remove();
    }
  }

  function collect() {
    const m = M[lang()];
    const mobile = normPhone($('jMobile').value);
    const whatsapp = same.checked ? mobile : normPhone(wa.value);
    const tg = $('jTelegram').value.trim();
    const data = {
      full_name: $('jName').value.trim(),
      age: Number($('jAge').value),
      email: $('jEmail').value.trim().toLowerCase(),
      mobile, whatsapp,
      telegram: tg ? '@' + tg.replace(/^@/, '') : '',
      plan: $('jPlan').value,
      preferred_contact: $('jContact').value,
      lang: lang(),
      consent_terms: $('jTerms').checked,
      consent_risk: $('jRisk').checked,
      website: $('jWebsite').value, // honeypot: must stay empty
    };
    const checks = [
      [$('jName'), data.full_name.length >= 3 && data.full_name.length <= 80, m.name],
      [$('jAge'), Number.isInteger(data.age) && data.age >= 18 && data.age <= 100, m.age],
      [$('jEmail'), EMAIL.test(data.email), m.email],
      [$('jMobile'), PHONE.test(mobile), m.mobile],
      [wa, !whatsapp || PHONE.test(whatsapp), m.whatsapp],
      [$('jTelegram'), !tg || TG.test(tg), m.telegram],
      [$('jTerms'), data.consent_terms, m.terms],
      [$('jRisk'), data.consent_risk, m.risk],
    ];
    let first = null;
    checks.forEach(([el, ok, msg]) => { setErr(el, ok ? '' : msg); if (!ok && !first) first = el; });
    return { data, first };
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const m = M[lang()], err = $('joinError'), btn = $('joinBtn');
    err.hidden = true;
    const { data, first } = collect();
    if (first) { first.focus(); return; }
    if (data.website) return; // bot

    const label = btn.textContent;
    btn.disabled = true; btn.textContent = lang() === 'fa' ? 'در حال ارسال…' : 'Sending…';
    const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 15000);
    try {
      const res = await fetch(API, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data), signal: ctl.signal, credentials: 'same-origin',
      });
      let body = {}; try { body = await res.json(); } catch { /* non-JSON */ }
      if (res.ok && (body.status === 'pending' || body.id)) {
        form.querySelectorAll('input, select, button').forEach((el) => { el.disabled = true; });
        const done = $('joinDone'); done.innerHTML = m.done(body.id ? String(body.id).replace(/[^\w-]/g, '') : ''); done.hidden = false;
        done.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      if (res.status === 422 && body.errors) {
        const map = { full_name: 'jName', age: 'jAge', email: 'jEmail', mobile: 'jMobile', whatsapp: 'jWhatsapp', telegram: 'jTelegram' };
        Object.keys(body.errors).forEach((k) => map[k] && setErr($(map[k]), m[k === 'full_name' ? 'name' : k] || String(body.errors[k])));
      }
      err.textContent = res.status === 409 ? m.dup : res.status === 429 ? m.rate : m.fail;
      err.hidden = false;
    } catch {
      err.textContent = m.fail; err.hidden = false;
    } finally {
      clearTimeout(timer);
      if ($('joinDone').hidden) { btn.disabled = false; btn.textContent = label; }
    }
  });

  window.addEventListener('tk:lang', () => form.querySelectorAll('[aria-invalid]').forEach((el) => setErr(el, '')));
})();
