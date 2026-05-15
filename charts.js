/* ============================================================
   js/charts.js — SmartFlow AI Traffic Management
   Renders the 30-minute forecast bar chart
   ============================================================ */

const ChartsModule = (() => {

  /* Forecast data points */
  const FORECAST = [
    { label: 'Now',   pct: 32, color: '#22C55E' },
    { label: '',      pct: 48, color: '#22C55E' },
    { label: '+10m',  pct: 65, color: '#F59E0B' },
    { label: '',      pct: 78, color: '#F59E0B' },
    { label: '+20m',  pct: 92, color: '#EF4444' },
    { label: 'Peak',  pct: 98, color: '#EF4444' },
    { label: '',      pct: 90, color: '#EF4444' },
    { label: '+25m',  pct: 72, color: '#F59E0B' },
    { label: '',      pct: 55, color: '#22C55E' },
    { label: '+30m',  pct: 40, color: '#22C55E' }
  ];

  /* Render forecast bars and labels into the HTML placeholders */
  function init() {
    const barsEl   = document.getElementById('forecast-bars');
    const labelsEl = document.getElementById('forecast-labels');
    if (!barsEl || !labelsEl) return;

    let barsHTML   = '';
    let labelsHTML = '';

    FORECAST.forEach(f => {
      barsHTML += `
        <div class="forecast-bar"
             style="height:${f.pct}%;background:${f.color}"
             data-val="${f.pct}%"></div>`;
      labelsHTML += `<span class="forecast-lbl">${f.label}</span>`;
    });

    barsEl.innerHTML   = barsHTML;
    labelsEl.innerHTML = labelsHTML;
  }

  return { init };

})();
