/* ============================================================
   js/zones.js — SmartFlow AI Traffic Management
   Renders zone traffic flow bars and keeps them live
   ============================================================ */

const ZonesModule = (() => {

  let updateInterval = null;

  /* ── Helpers ── */
  function _colorForPct(pct) {
    if (pct > 80) return '#EF4444';
    if (pct > 60) return '#F59E0B';
    if (pct > 40) return '#22C55E';
    return '#1368AA';
  }

  function _statusForPct(pct) {
    if (pct > 80) return { text: 'Critical', cls: 'status-critical' };
    if (pct > 60) return { text: 'High',     cls: 'status-high' };
    if (pct > 40) return { text: 'Normal',   cls: 'status-normal' };
    return              { text: 'Low',       cls: 'status-low' };
  }

  function _jitter(base, range) {
    return Math.min(99, Math.max(10, base + Math.floor((Math.random() - 0.5) * range)));
  }

  /* ── Build initial HTML ── */
  function _buildRows() {
    return ZoneData.map(z => `
      <div class="flow-row">
        <span class="flow-zone">${z.name}</span>
        <div class="flow-track">
          <div class="flow-fill" id="z-${z.id}"
               style="width:${z.basePct}%;background:${_colorForPct(z.basePct)}"></div>
        </div>
        <span class="flow-pct" id="zv-${z.id}">${z.basePct}%</span>
        <span class="flow-status ${z.statusClass}" id="zs-${z.id}">${z.status}</span>
      </div>
    `).join('');
  }

  /* ── Live updates ── */
  function _updateZones() {
    ZoneData.forEach(z => {
      const pct    = _jitter(z.basePct, 10);
      const color  = _colorForPct(pct);
      const status = _statusForPct(pct);

      const fill   = document.getElementById('z-'  + z.id);
      const val    = document.getElementById('zv-' + z.id);
      const badge  = document.getElementById('zs-' + z.id);

      if (fill)  { fill.style.width = pct + '%'; fill.style.background = color; }
      if (val)   val.textContent = pct + '%';
      if (badge) {
        badge.textContent = status.text;
        badge.className   = 'flow-status ' + status.cls;
      }
    });
  }

  /* ── Public API ── */
  function init() {
    const container = document.getElementById('zone-traffic-body');
    if (!container) return;
    container.innerHTML = _buildRows();
    updateInterval = setInterval(_updateZones, 4000);
  }

  function destroy() {
    clearInterval(updateInterval);
  }

  return { init, destroy };

})();
