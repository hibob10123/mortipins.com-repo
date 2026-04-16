;(function () {
  const DEFAULT_API =
    'https://solitary-star-3b20.caoalexander9-25f.workers.dev/api/report-video'

  function getApiBase() {
    if (typeof window.MORTI_REPORT_VIDEO_API === 'string' && window.MORTI_REPORT_VIDEO_API) {
      return window.MORTI_REPORT_VIDEO_API.replace(/\/$/, '')
    }
    return DEFAULT_API
  }

  function ensureModal() {
    let root = document.getElementById('gm-report-video-modal')
    if (root) return root

    root = document.createElement('div')
    root.id = 'gm-report-video-modal'
    root.className = 'gm-report-modal'
    root.setAttribute('role', 'dialog')
    root.setAttribute('aria-modal', 'true')
    root.setAttribute('aria-labelledby', 'gm-report-video-title')
    root.hidden = true
    root.innerHTML = [
      '<div class="gm-report-modal__backdrop" data-gm-report-close tabindex="-1"></div>',
      '<div class="gm-report-modal__panel" role="document">',
      '  <div class="gm-report-modal__head">',
      '    <h2 id="gm-report-video-title" class="gm-report-modal__title">Report clip</h2>',
      '    <button type="button" class="gm-report-modal__close" data-gm-report-close aria-label="Close">',
      '      <span class="gm-report-modal__close-icon" aria-hidden="true">×</span>',
      '    </button>',
      '  </div>',
      '  <p class="gm-report-modal__hint">Tell us what’s wrong. We review every report.</p>',
      '  <div class="gm-report-modal__fields">',
      '    <label class="gm-report-modal__label" for="gm-report-reason">Reason</label>',
      '    <select id="gm-report-reason" class="gm-report-modal__select" required>',
      '      <option value="off_topic">Off topic / not Brawl Stars</option>',
      '      <option value="wrong_game">Wrong game</option>',
      '      <option value="inappropriate">Inappropriate</option>',
      '      <option value="broken">Broken or won’t play</option>',
      '      <option value="spam">Spam</option>',
      '      <option value="other">Other</option>',
      '    </select>',
      '    <label class="gm-report-modal__label" for="gm-report-details">Details <span class="gm-report-modal__optional">(optional)</span></label>',
      '    <textarea id="gm-report-details" class="gm-report-modal__textarea" rows="3" maxlength="500" placeholder="Add context if it helps"></textarea>',
      '  </div>',
      '  <p class="gm-report-modal__status" id="gm-report-status" role="status" aria-live="polite"></p>',
      '  <div class="gm-report-modal__actions">',
      '    <button type="button" class="gm-report-modal__btn gm-report-modal__btn--secondary" data-gm-report-close>Cancel</button>',
      '    <button type="button" class="gm-report-modal__btn gm-report-modal__btn--primary" id="gm-report-submit">Send report</button>',
      '  </div>',
      '</div>'
    ].join('\n')

    document.body.appendChild(root)
    return root
  }

  let trapHandler = null
  let lastFocus = null
  let submitHandler = null

  function removeTrap() {
    if (trapHandler && trapHandler.onKey) {
      document.removeEventListener('keydown', trapHandler.onKey)
    }
    trapHandler = null
  }

  function closeModal() {
    removeTrap()
    const root = document.getElementById('gm-report-video-modal')
    if (root) {
      root.hidden = true
    }
    document.documentElement.classList.remove('gm-report-modal-open')
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus()
    }
  }

  function openModal(ctx) {
    const root = ensureModal()
    const statusEl = root.querySelector('#gm-report-status')
    const reasonEl = root.querySelector('#gm-report-reason')
    const detailsEl = root.querySelector('#gm-report-details')
    const submitBtn = root.querySelector('#gm-report-submit')

    root.dataset.videoId = ctx.videoId || ''
    root.dataset.videoUrl = ctx.videoUrl || ''
    statusEl.textContent = ''
    statusEl.classList.remove('gm-report-modal__status--error', 'gm-report-modal__status--ok')
    reasonEl.value = 'off_topic'
    detailsEl.value = ''
    root.hidden = false
    document.documentElement.classList.add('gm-report-modal-open')

    lastFocus = document.activeElement
    reasonEl.focus()

    removeTrap()
    const onKey = function (e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeModal()
      }
    }
    document.addEventListener('keydown', onKey)
    trapHandler = { onKey: onKey }

    root.querySelectorAll('[data-gm-report-close]').forEach(function (el) {
      el.addEventListener('click', closeModal, { once: true })
    })

    if (submitHandler) {
      submitBtn.removeEventListener('click', submitHandler)
    }
    submitHandler = function () {
      submitReport(ctx, root, statusEl, submitBtn)
    }
    submitBtn.addEventListener('click', submitHandler)
  }

  function submitReport(ctx, root, statusEl, submitBtn) {
    const reason = root.querySelector('#gm-report-reason').value
    const details = root.querySelector('#gm-report-details').value.trim()
    const payload = {
      reason: reason,
      video_id: ctx.videoId || '',
      video_url: ctx.videoUrl || '',
      page_url: typeof location !== 'undefined' ? location.href : '',
      details: details
    }

    statusEl.textContent = 'Sending…'
    statusEl.classList.remove('gm-report-modal__status--error', 'gm-report-modal__status--ok')
    submitBtn.disabled = true

    const url = getApiBase()
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data }
        })
      })
      .then(function (result) {
        if (result.ok && result.data && result.data.ok) {
          statusEl.textContent = 'Thanks — your report was sent.'
          statusEl.classList.add('gm-report-modal__status--ok')
          setTimeout(closeModal, 1600)
        } else {
          statusEl.textContent =
            'Could not send report. Try again later or use Discord.'
          statusEl.classList.add('gm-report-modal__status--error')
        }
      })
      .catch(function () {
        statusEl.textContent = 'Network error. Check your connection.'
        statusEl.classList.add('gm-report-modal__status--error')
      })
      .finally(function () {
        submitBtn.disabled = false
      })
  }

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-report-video]')
    if (!btn) return
    const videoId = btn.getAttribute('data-video-id') || ''
    const videoUrl = btn.getAttribute('data-video-url') || ''
    openModal({ videoId: videoId, videoUrl: videoUrl })
  })
})()
