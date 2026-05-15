/* ============================================================
   js/ai.js — SmartFlow AI Traffic Management
   Renders the AI Brain tab content from AIModuleData
   ============================================================ */

const AIModule = (() => {

  function _buildStats() {
    return `
      <div class="ai-stats-row">
        ${AIModuleData.stats.map(s => `
          <div class="ai-stat">
            <div class="ai-stat-val" ${s.id ? `id="${s.id}"` : ''}>${s.value}</div>
            <div class="ai-stat-lbl">${s.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function _buildModules() {
    return AIModuleData.modules.map(m => `
      <div class="ai-module">
        <div class="ai-module-icon" style="background:${m.iconBg}">${m.icon}</div>
        <div class="ai-module-info">
          <div class="ai-module-name">${m.name}</div>
          <div class="ai-module-desc">${m.desc}</div>
        </div>
        <span class="ai-module-status ${m.statusClass}">${m.status}</span>
      </div>
    `).join('');
  }

  function init() {
    const container = document.getElementById('ai-body');
    if (!container) return;
    container.innerHTML = _buildStats() + _buildModules();
  }

  /* Called by app.js live-update loop */
  function updateDecisionCount(count) {
    const el = document.getElementById('ai-today');
    if (el) el.textContent = count.toLocaleString();
  }

  return { init, updateDecisionCount };

})();
