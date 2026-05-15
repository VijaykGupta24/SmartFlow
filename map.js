/* ============================================================
   js/map.js — SmartFlow AI Traffic Management
   Builds and animates the SVG city grid map
   ============================================================ */

const MapModule = (() => {

  /* ── SVG markup ── */
  const SVG_MARKUP = `
    <svg viewBox="0 0 620 380" width="100%"
         style="display:block;background:#F1F5F9"
         id="city-svg">

      <!-- Background -->
      <rect width="620" height="380" fill="#E2E8F0"/>

      <!-- City blocks -->
      <rect x="20"  y="20"  width="110" height="90"  rx="6" fill="#CBD5E1"/>
      <rect x="160" y="20"  width="90"  height="90"  rx="6" fill="#CBD5E1"/>
      <rect x="280" y="20"  width="130" height="90"  rx="6" fill="#CBD5E1"/>
      <rect x="440" y="20"  width="80"  height="90"  rx="6" fill="#CBD5E1"/>
      <rect x="540" y="20"  width="60"  height="90"  rx="6" fill="#CBD5E1"/>
      <rect x="20"  y="140" width="90"  height="120" rx="6" fill="#CBD5E1"/>
      <rect x="160" y="140" width="90"  height="120" rx="6" fill="#CBD5E1"/>
      <rect x="440" y="140" width="80"  height="120" rx="6" fill="#CBD5E1"/>
      <rect x="540" y="140" width="60"  height="120" rx="6" fill="#CBD5E1"/>
      <rect x="20"  y="290" width="110" height="75"  rx="6" fill="#CBD5E1"/>
      <rect x="160" y="290" width="130" height="75"  rx="6" fill="#CBD5E1"/>
      <rect x="320" y="290" width="100" height="75"  rx="6" fill="#CBD5E1"/>
      <rect x="440" y="290" width="80"  height="75"  rx="6" fill="#CBD5E1"/>
      <rect x="540" y="290" width="60"  height="75"  rx="6" fill="#CBD5E1"/>

      <!-- Horizontal roads -->
      <rect x="0" y="108" width="620" height="30" fill="#94A3B8"/>
      <rect x="0" y="260" width="620" height="30" fill="#94A3B8"/>

      <!-- Vertical roads -->
      <rect x="128" y="0" width="28" height="380" fill="#94A3B8"/>
      <rect x="258" y="0" width="28" height="380" fill="#94A3B8"/>
      <rect x="398" y="0" width="28" height="380" fill="#94A3B8"/>
      <rect x="520" y="0" width="28" height="380" fill="#94A3B8"/>

      <!-- Road centre dashes -->
      <line x1="0"   y1="123" x2="620" y2="123" stroke="white" stroke-width="1.5" stroke-dasharray="22,14" opacity=".5"/>
      <line x1="0"   y1="275" x2="620" y2="275" stroke="white" stroke-width="1.5" stroke-dasharray="22,14" opacity=".5"/>
      <line x1="142" y1="0"   x2="142" y2="380" stroke="white" stroke-width="1.5" stroke-dasharray="22,14" opacity=".5"/>
      <line x1="272" y1="0"   x2="272" y2="380" stroke="white" stroke-width="1.5" stroke-dasharray="22,14" opacity=".5"/>
      <line x1="412" y1="0"   x2="412" y2="380" stroke="white" stroke-width="1.5" stroke-dasharray="22,14" opacity=".5"/>
      <line x1="534" y1="0"   x2="534" y2="380" stroke="white" stroke-width="1.5" stroke-dasharray="22,14" opacity=".5"/>

      <!-- Congestion overlays -->
      <rect x="398" y="0"   width="28" height="275" fill="rgba(239,68,68,0.18)"/>
      <rect x="0"   y="108" width="142" height="30" fill="rgba(245,158,11,0.14)"/>

      <!-- Signal indicators -->
      <circle cx="142" cy="123" r="9"  fill="#EF4444"/>
      <circle cx="142" cy="123" r="14" fill="none" stroke="#EF4444" stroke-width="1.5" opacity=".4"/>

      <circle cx="272" cy="123" r="9"  fill="#22C55E"/>
      <circle cx="272" cy="123" r="14" fill="none" stroke="#22C55E" stroke-width="1.5" opacity=".4"/>

      <circle cx="412" cy="123" r="9"  fill="#F59E0B"/>
      <circle cx="412" cy="123" r="14" fill="none" stroke="#F59E0B" stroke-width="1.5" opacity=".4"/>

      <circle cx="534" cy="123" r="9"  fill="#22C55E"/>
      <circle cx="534" cy="123" r="14" fill="none" stroke="#22C55E" stroke-width="1.5" opacity=".4"/>

      <circle cx="142" cy="275" r="9"  fill="#22C55E"/>
      <circle cx="142" cy="275" r="14" fill="none" stroke="#22C55E" stroke-width="1.5" opacity=".4"/>

      <circle cx="272" cy="275" r="9"  fill="#EF4444"/>
      <circle cx="272" cy="275" r="14" fill="none" stroke="#EF4444" stroke-width="1.5" opacity=".4"/>

      <circle cx="412" cy="275" r="9"  fill="#22C55E"/>
      <circle cx="412" cy="275" r="14" fill="none" stroke="#22C55E" stroke-width="1.5" opacity=".4"/>

      <circle cx="534" cy="275" r="9"  fill="#F59E0B"/>
      <circle cx="534" cy="275" r="14" fill="none" stroke="#F59E0B" stroke-width="1.5" opacity=".4"/>

      <!-- Animated cars -->
      <rect id="mc1" x="170" y="112" width="18" height="10" rx="4" fill="#1368AA"/>
      <rect id="mc2" x="50"  y="264" width="18" height="10" rx="4" fill="#7C3AED"/>
      <rect id="mc3" x="320" y="112" width="18" height="10" rx="4" fill="#D97706"/>
      <rect id="mc4" x="440" y="264" width="18" height="10" rx="4" fill="#0891B2"/>

      <!-- Ambulance route (hidden until toggled) -->
      <path id="ambu-route"
            d="M20 275 L142 275 L142 123 L272 123"
            stroke="#22C55E" stroke-width="3"
            stroke-dasharray="10,6"
            fill="none"
            opacity="0"
            style="transition:opacity 0.4s"/>

      <!-- Violation markers -->
      <g id="mv1">
        <circle cx="412" cy="123" r="6" fill="#EF4444" opacity=".95"/>
        <rect x="420" y="108" width="70" height="18" rx="4" fill="rgba(239,68,68,0.9)"/>
        <text x="424" y="121" fill="white" font-size="10"
              font-family="Outfit, sans-serif" font-weight="700">Red Light</text>
      </g>
      <g id="mv2">
        <circle cx="272" cy="275" r="6" fill="#F59E0B" opacity=".95"/>
        <rect x="280" y="260" width="68" height="18" rx="4" fill="rgba(245,158,11,0.9)"/>
        <text x="284" y="273" fill="white" font-size="10"
              font-family="Outfit, sans-serif" font-weight="700">Speeding</text>
      </g>

      <!-- Zone labels -->
      <text x="65"  y="200" fill="#64748B" font-size="12"
            font-family="Outfit, sans-serif" font-weight="700" text-anchor="middle">PINK CITY</text>
      <text x="205" y="200" fill="#64748B" font-size="12"
            font-family="Outfit, sans-serif" font-weight="700" text-anchor="middle">C-SCHEME</text>
      <text x="460" y="200" fill="#64748B" font-size="12"
            font-family="Outfit, sans-serif" font-weight="700" text-anchor="middle">VAISHALI</text>

      <!-- Legend -->
      <rect x="8" y="342" width="210" height="30" rx="8" fill="white" opacity=".9"/>
      <circle cx="24" cy="357" r="6" fill="#22C55E"/>
      <text x="34" y="361" fill="#475569" font-size="11"
            font-family="Outfit, sans-serif" font-weight="600">Green</text>
      <circle cx="82" cy="357" r="6" fill="#F59E0B"/>
      <text x="92" y="361" fill="#475569" font-size="11"
            font-family="Outfit, sans-serif" font-weight="600">Yellow</text>
      <circle cx="148" cy="357" r="6" fill="#EF4444"/>
      <text x="158" y="361" fill="#475569" font-size="11"
            font-family="Outfit, sans-serif" font-weight="600">Red / Violation</text>
    </svg>
  `;

  /* Car positions state */
  const carPos = { mc1: 170, mc2: 50, mc3: 320, mc4: 440 };
  let carInterval = null;
  let ambuVisible  = false;

  /* ── Private helpers ── */
  function _moveCars() {
    carPos.mc1 = (carPos.mc1 + 2.5) % 580 + 20;
    carPos.mc2 = (carPos.mc2 + 1.8) % 580 + 10;
    carPos.mc3 = (carPos.mc3 + 3.0) % 540 + 20;
    carPos.mc4 = (carPos.mc4 + 2.0) % 560 + 20;

    Object.keys(carPos).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('x', Math.round(carPos[id]));
    });
  }

  /* ── Public API ── */
  function init() {
    const container = document.getElementById('map-container');
    if (!container) return;
    container.innerHTML = SVG_MARKUP;

    /* Start car animation */
    carInterval = setInterval(_moveCars, 80);
  }

  function toggleLayer(layer) {
    if (layer === 'violations') {
      ['mv1', 'mv2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.opacity = (el.style.opacity === '0') ? '1' : '0';
      });
    }
  }

  function toggleAmbuRoute() {
    ambuVisible = !ambuVisible;
    const path = document.getElementById('ambu-route');
    if (path) path.style.opacity = ambuVisible ? '1' : '0';
    return ambuVisible;
  }

  function destroy() {
    clearInterval(carInterval);
  }

  return { init, toggleLayer, toggleAmbuRoute, destroy };

})();
