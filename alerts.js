/* ============================================================
   js/alerts.js — SmartFlow AI Traffic Management
   Renders live alert feed from AlertData
   ============================================================ */

const AlertsModule = (() => {

  function _buildAlert(a) {
    return `
      <div class="alert-item ${a.typeClass}">
        <div class="alert-icon-circle" style="background:${a.iconBg}">${a.icon}</div>
        <div class="alert-content">
          <div class="alert-title">${a.title}</div>
          <div class="alert-desc">${a.desc}</div>
          <div class="alert-time">${a.time}</div>
        </div>
      </div>
    `;
  }

  function init() {
    const feed = document.getElementById('alert-feed');
    if (!feed) return;
    feed.innerHTML = AlertData.map(_buildAlert).join('');

    const badge = document.getElementById('alert-count');
    if (badge) badge.textContent = AlertData.length;
  }

  return { init };

})();
