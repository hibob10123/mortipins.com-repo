/**
 * brawldle-splash.js
 * Shows a full-screen punchy splash on first visit to a game page.
 *
 * Config lives on <body> data attributes:
 *   data-splash-key   — unique localStorage key (per page)
 *   data-splash-lines — pipe-separated lines, e.g. "Watch the clip.|Guess the rank.|One shot."
 *
 * Auto-dismisses after 1.5 s. Click/tap anywhere dismisses instantly.
 * Shows only once ever (key stored in localStorage indefinitely).
 */
(function () {
  const body = document.body;
  const key   = body.dataset.splashKey;
  const raw   = body.dataset.splashLines || '';

  if (!key || !raw || localStorage.getItem(key)) return;
  localStorage.setItem(key, '1');

  const lines = raw.split('|').filter(Boolean);

  // Build overlay
  const el = document.createElement('div');
  el.className = 'bd-splash';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', 'Welcome to Brawldle');

  const inner = document.createElement('div');
  inner.className = 'bd-splash__inner';

  lines.forEach(function (text, i) {
    const p = document.createElement('p');
    p.className = 'bd-splash__line bd-splash__line--' + (i + 1);
    p.textContent = text;
    inner.appendChild(p);
  });

  const skip = document.createElement('span');
  skip.className = 'bd-splash__skip';
  skip.textContent = 'tap anywhere to skip';
  inner.appendChild(skip);

  el.appendChild(inner);
  document.body.appendChild(el);

  function dismiss() {
    if (el.classList.contains('bd-splash--out')) return;
    el.classList.add('bd-splash--out');
    el.addEventListener('animationend', function handler(e) {
      if (e.animationName === 'bd-splash-out') {
        el.removeEventListener('animationend', handler);
        el.remove();
      }
    });
  }

  el.addEventListener('click',      dismiss);
  el.addEventListener('touchstart', dismiss, { passive: true });

  setTimeout(dismiss, 1500);
}());
