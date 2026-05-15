/* ============================================================
   js/app.js — SmartFlow AI Traffic Management
   Main application bootstrap.
   - Initialises all modules in the correct order
   - Runs the live-update loop (clock, metrics, hero bar)
   - Exposes the App object that HTML onclick handlers call
   ============================================================ */

/* ─────────────────────────────────────────
   LIVE-UPDATE STATE
───────────────────────────────────────── */
let _aiDecisionCount = 48312;

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function _jitter(base, range) {
  return base + Math.floor((Math.random() - 0.5) * range);
}

function _colorForPct(pct) {
  if (pct > 80) return '#EF4444';
  if (pct > 60) return '#F59E0B';
  return '#22C55E';
}

function _setEl(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/* ─────────────────────────────────────────
   CLOCK
───────────────────────────────────────── */
function _tickClock() {
  _setEl('clock', new Date().toTimeString().slice(0, 8));
}

/* ─────────────────────────────────────────
   HERO BAR + METRIC CARD LIVE UPDATES
───────────────────────────────────────── */
function _updateMetrics() {
  const speed   = _jitter(38, 6);
  const density = _jitter(74, 10);
  const wait    = _jitter(42, 8);
  const thru    = _jitter(89, 4);
  _aiDecisionCount += Math.floor(Math.random() * 90) + 30;

  /* Hero bar */
  document.getElementById('h-speed').innerHTML =
    speed + ' <span class="hero-unit">km/h</span>';
  _setEl('h-density',   density);
  _setEl('h-decisions', _aiDecisionCount.toLocaleString());

  /* Metric cards */
  document.getElementById('m-speed').innerHTML =
    speed + '<span class="metric-unit">km/h</span>';
  document.getElementById('m-density').innerHTML =
    density + '<span class="metric-unit">v/km</span>';
  document.getElementById('m-wait').innerHTML =
    wait + '<span class="metric-unit">sec</span>';
  document.getElementById('m-thru').innerHTML =
    thru + '<span class="metric-unit">%</span>';

  /* AI brain decision counter (if tab visible) */
  AIModule.updateDecisionCount(_aiDecisionCount);
}

/* ─────────────────────────────────────────
   PUBLIC APP OBJECT  (called from HTML)
───────────────────────────────────────── */
const App = {

  /** Switch main operation tabs */
  openTab(id, btn) {
    document.querySelectorAll('.tab-panel')
      .forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn')
      .forEach(b => b.classList.remove('active'));

    const panel = document.getElementById('tab-' + id);
    if (panel) panel.classList.add('active');
    btn.classList.add('active');
  },

  /** Select junction from signal controller card */
  selectJunction(index, cardEl) {
    SignalsModule.selectJunction(index, cardEl);
  },

  /** Filter violations table */
  filterViolations(category, btn) {
    ViolationsModule.filterBy(category, btn);
  },

  /** Map layer toggle */
  toggleLayer(layer, btn) {
    btn.classList.toggle('on');
    MapModule.toggleLayer(layer);
  },

  /** Ambulance route overlay */
  toggleAmbuRoute(btn) {
    const visible = MapModule.toggleAmbuRoute();
    btn.classList.toggle('on', visible);
  }
};

/* ─────────────────────────────────────────
   BOOTSTRAP  — runs after all scripts load
───────────────────────────────────────── */
(function init() {
  /* Render all injected sections */
  MapModule.init();
  ChartsModule.init();
  SignalsModule.init();
  ZonesModule.init();
  AlertsModule.init();
  EmergencyModule.init();
  AIModule.init();
  HealthModule.init();
  ViolationsModule.init();

  /* Start live intervals */
  setInterval(_tickClock,    1000);
  setInterval(_updateMetrics, 3500);

  /* Tick clock immediately so it's not blank for 1s */
  _tickClock();
})();
