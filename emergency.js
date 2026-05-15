/* ============================================================
   js/emergency.js — SmartFlow AI Traffic Management
   Renders the emergency vehicle tracker tab
   ============================================================ */

const EmergencyModule = (() => {

  const HTML = `
    <div class="green-corridor-banner">
      <span class="banner-icon">🟢</span>
      <div>
        <div class="banner-title">AI Green Corridor System — ACTIVE</div>
        <div class="banner-desc">
          2 emergency vehicles tracked &middot; 6 signals overridden &middot; All corridors clear
        </div>
      </div>
    </div>

    <!-- AMB-47 -->
    <div class="ambu-card ambu-critical">
      <div class="ambu-header">
        <div class="ambu-id">
          🚑 AMB-47
          <span class="viol-badge vb-red">CRITICAL</span>
        </div>
        <div class="ambu-eta">ETA 4:12</div>
      </div>

      <div class="ambu-track-bar">
        <div class="ambu-progress ambu-anim"></div>
      </div>

      <div class="ambu-labels">
        <span>📍 Malviya Nagar</span>
        <span>🏥 SMS Hospital</span>
      </div>

      <div class="ambu-stats">
        <div class="ambu-stat-box">
          <div class="ambu-stat-val" style="color:#15803D">8.3 km</div>
          <div class="ambu-stat-lbl">Distance</div>
        </div>
        <div class="ambu-stat-box">
          <div class="ambu-stat-val" style="color:#1D4ED8">54 km/h</div>
          <div class="ambu-stat-lbl">Avg Speed</div>
        </div>
        <div class="ambu-stat-box">
          <div class="ambu-stat-val" style="color:#D97706">6</div>
          <div class="ambu-stat-lbl">Signals Cleared</div>
        </div>
      </div>

      <div class="ambu-chain">
        Signal override chain:
        <span>A1 &rarr; C3 &rarr; B2 &rarr; D4 &rarr; E1 &rarr; F3</span>
      </div>
    </div>

    <!-- FIRE-12 -->
    <div class="ambu-card ambu-moderate" style="margin-top:14px">
      <div class="ambu-header">
        <div class="ambu-id">
          🚒 FIRE-12
          <span class="viol-badge vb-yellow">MODERATE</span>
        </div>
        <div class="ambu-eta" style="color:#D97706">ETA 7:45</div>
      </div>

      <div class="ambu-track-bar">
        <div class="ambu-progress ambu-anim-2"
             style="background:linear-gradient(90deg,#F59E0B,#FDE68A)"></div>
      </div>

      <div class="ambu-labels">
        <span>📍 Lal Kothi</span>
        <span>🔥 Bani Park Fire Site</span>
      </div>
    </div>

    <!-- Override queue -->
    <div style="margin-top:20px">
      <div style="font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;
                  letter-spacing:1px;margin-bottom:12px">Signal Override Queue</div>

      <div class="alert-item alert-success">
        <div class="alert-icon-circle" style="background:#DCFCE7">🟢</div>
        <div class="alert-content">
          <div class="alert-title">Junction A1 — Green extended +45s for AMB-47</div>
          <div class="alert-time">00:32 ago</div>
        </div>
      </div>

      <div class="alert-item alert-success">
        <div class="alert-icon-circle" style="background:#DCFCE7">🟢</div>
        <div class="alert-content">
          <div class="alert-title">Junction C3 — Preempted 22s ahead of schedule</div>
          <div class="alert-time">01:18 ago</div>
        </div>
      </div>

      <div class="alert-item alert-warning">
        <div class="alert-icon-circle" style="background:#FEF3C7">🟡</div>
        <div class="alert-content">
          <div class="alert-title">Junction B2 — Cross traffic holding for 65s</div>
          <div class="alert-time">02:05 ago</div>
        </div>
      </div>
    </div>
  `;

  function init() {
    const container = document.getElementById('emergency-body');
    if (container) container.innerHTML = HTML;
  }

  return { init };

})();
