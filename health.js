/* ============================================================
   js/health.js — SmartFlow AI Traffic Management
   Renders the System Health tab content from AIModuleData
   ============================================================ */

const HealthModule = (() => {

  const HEALTH_METRICS = [
    { icon: '📷', name: 'Cameras Online', value: '312', unit: 'cams', pct: 98,  color: '#22C55E', change: 'change-up',      changeText: '98% operational' },
    { icon: '💻', name: 'GPU Utilization', value: '94',  unit: '%',    pct: 94,  color: '#1368AA', change: 'change-neutral', changeText: 'High but stable' },
    { icon: '🌐', name: 'Network Latency', value: '4.2', unit: 'ms',   pct: 100, color: '#F59E0B', change: 'change-up',      changeText: 'Excellent' },
    { icon: '⚡', name: 'Uptime (30d)',    value: '99.2',unit: '%',    pct: 99,  color: '#22C55E', change: 'change-up',      changeText: 'SLA Met' }
  ];

  function _buildTopMetrics() {
    return `
      <div class="grid-4" style="margin-bottom:24px">
        ${HEALTH_METRICS.map(m => `
          <div class="metric-card" style="--accent-color:${m.color}">
            <span class="metric-emoji">${m.icon}</span>
            <div class="metric-value" style="font-size:36px">
              ${m.value}<span class="metric-unit" style="font-size:14px">${m.unit}</span>
            </div>
            <div class="metric-name">${m.name}</div>
            <span class="metric-change ${m.change}">${m.changeText}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  function _buildHealthBars() {
    return AIModuleData.health.map(h => `
      <div class="health-row">
        <span class="health-icon">${h.icon}</span>
        <span class="health-name">${h.name}</span>
        <div class="health-bar-track">
          <div class="health-bar-fill"
               style="width:${h.pct}%;background:${h.color}"></div>
        </div>
        <span class="health-pct">${h.pct}%</span>
      </div>
    `).join('');
  }

  function init() {
    const container = document.getElementById('health-body');
    if (!container) return;
    container.innerHTML = _buildTopMetrics() + _buildHealthBars();
  }

  return { init };

})();
