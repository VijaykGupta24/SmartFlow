/* ============================================================
   js/violations.js — SmartFlow AI Traffic Management
   Renders and filters the violations table
   ============================================================ */

const ViolationsModule = (() => {

  /* Badge class lookup */
  const TYPE_BADGE = {
    'Red Light':       'vb-red',
    'Speeding 78 km/h':'vb-yellow',
    'Speeding 91 km/h':'vb-yellow',
    'Lane Departure':  'vb-blue',
    'Wrong Way':       'vb-red'
  };

  const STATUS_BADGE = {
    'Captured':   'vb-red',
    'Flagged':    'vb-yellow',
    'Fine Issued':'vb-green',
    'Alert Sent': 'vb-blue'
  };

  function _typeBadge(type)   { return TYPE_BADGE[type]   || 'vb-blue'; }
  function _statusBadge(status){ return STATUS_BADGE[status] || 'vb-yellow'; }

  function _buildRow(v) {
    return `
      <tr>
        <td style="font-family:'Space Mono',monospace;font-size:13px">${v.time}</td>
        <td>${v.location}</td>
        <td><span class="viol-badge ${_typeBadge(v.type)}">${v.type}</span></td>
        <td style="font-family:'Space Mono',monospace;font-weight:700">${v.plate}</td>
        <td><span class="viol-badge ${_statusBadge(v.status)}">${v.status}</span></td>
        <td>
          <button class="map-btn"
                  style="font-size:12px;padding:4px 10px"
                  onclick="alert('Viewing details for ${v.plate}')">
            View
          </button>
        </td>
      </tr>
    `;
  }

  /* ── Public API ── */
  function render(filter) {
    const tbody = document.getElementById('viol-body');
    if (!tbody) return;

    const filtered = (filter === 'all')
      ? ViolationData
      : ViolationData.filter(v => v.category === filter);

    tbody.innerHTML = filtered.map(_buildRow).join('');
  }

  function init() {
    render('all');
  }

  /* Called from HTML filter buttons via App.filterViolations */
  function filterBy(category, clickedBtn) {
    /* Toggle button styling within the same filter-row */
    const row = clickedBtn.closest('.filter-row');
    if (row) row.querySelectorAll('.map-btn')
      .forEach(b => b.classList.remove('on'));
    clickedBtn.classList.add('on');

    render(category);
  }

  return { init, render, filterBy };

})();
