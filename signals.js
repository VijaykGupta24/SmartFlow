/* ============================================================
   js/signals.js — SmartFlow AI Traffic Management
   Signal countdown timers and junction detail selection
   ============================================================ */

const SignalsModule = (() => {

  /* Live countdown state (seconds remaining per junction) */
  const timers = {};
  let timerInterval = null;

  /* ── Helpers ── */
  function _colorForPct(pct) {
    if (pct > 80) return '#EF4444';
    if (pct > 60) return '#F59E0B';
    return '#22C55E';
  }

  function _setDirBox(dirId, fillId, pct) {
    const valEl  = document.getElementById(dirId);
    const fillEl = document.getElementById(fillId);
    if (!valEl || !fillEl) return;
    const color = _colorForPct(pct);
    valEl.textContent    = pct + '%';
    valEl.style.color    = color;
    fillEl.style.width   = pct + '%';
    fillEl.style.background = color;
  }

  /* ── Public API ── */
  function init() {
    /* Seed timers from data */
    JunctionData.forEach(j => {
      timers[j.id] = j.initialTimer;
    });

    /* Start countdown */
    timerInterval = setInterval(_tick, 1000);

    /* Render initial detail for first junction */
    selectJunction(0, document.querySelector('.signal-card'));
  }

  function _tick() {
    JunctionData.forEach(j => {
      timers[j.id]--;
      if (timers[j.id] < 0) {
        timers[j.id] = Math.floor(Math.random() * 38) + 8;
      }
      const el = document.getElementById('t-' + j.id);
      if (el) el.textContent = String(timers[j.id]).padStart(2, '0');
    });
  }

  function selectJunction(index, cardEl) {
    /* Highlight card */
    document.querySelectorAll('.signal-card')
      .forEach(c => c.classList.remove('active'));
    if (cardEl) cardEl.classList.add('active');

    const j = JunctionData[index];
    if (!j) return;

    /* Update intersection detail panel */
    const label = document.getElementById('int-label');
    const rec   = document.getElementById('rec-text');
    if (label) label.textContent = j.name + ' — ' + j.road;
    if (rec)   rec.textContent   = j.aiRecommendation;

    _setDirBox('dir-n', 'df-n', j.directions.north);
    _setDirBox('dir-s', 'df-s', j.directions.south);
    _setDirBox('dir-e', 'df-e', j.directions.east);
    _setDirBox('dir-w', 'df-w', j.directions.west);
  }

  function destroy() {
    clearInterval(timerInterval);
  }

  return { init, selectJunction, destroy };

})();
