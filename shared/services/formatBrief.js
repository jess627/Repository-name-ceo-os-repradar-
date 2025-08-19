
  // Generate chart script
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      const historyData = ${JSON.stringify(history)};

      function parseNumeric(val) {
        return isNaN(num) ? null : num;

      function renderCharts() {
        const kpiTitles = [...new Set(historyData.flatMap(h => h.kpis.map(k => k.title)))];
          const canvas = document.createElement('canvas');
          container.appendChild(document.createElement('h3')).innerText = title;
          container.appendChild(canvas);

          const labels = historyData.map(h => new Date(h.timestamp).toLocaleDateString());
          });
          new Chart(canvas, {
              labels,
                borderColor: 'rgba(75, 192, 192, 1)',
            options: { responsive: true, maintainAspectRatio: false }
    </script>
  const html = `
      <head>
        <style>
          canvas { width: 100%; height: 300px; margin-bottom: 40px; }
      <body>
        <div id="charts"></div>
        ${chartScript}
      </body>
    </html>
};

# Update Morning Brief generator to pass history into formatBrief
const { format } = require('date-fns');
const logMessage = require('../../shared/utils/logger');
const generateSummary = require('../../shared/services/generateSummary');
const detectEmergingTrends = require('../../shared/services/detectEmergingTrends');
const { compare } = require('../../shared/services/compareWithTrend');
const recommendActions = require('../../shared/services/recommendActions');
const prioritizeActions = require('../../shared/services/prioritizeActions');
const formatBrief = require('../../shared/services/formatBrief');

(async () => {
  const entries = [];
  // KPI snapshot + summary
  entries.push(\`\${config.appName} v\${config.version} — \${today}\`);

  // 7‑day averages
  medTerm.forEach(avg => {
      entries.push(\`\${avg.title} avg over \${avg.periodDays} days: \${avg.average}\${avg.title.includes('%') ? '%' : ''}\`);

  // Emerging trends
  const emerging = detectEmergingTrends(history, 3);
  emerging.forEach(t => {
  });

  // Priority actions
  const previousKPIs = loadKPIs();
  currentKPIs.forEach(kpi => {
    const trend = compare(kpi, prev);
    if (trend.status === 'down') {
      trendActions.push({ kpi, delta: trend.delta, unit: trend.unit, actions });
  });
  if (trendActions.length) {
    const top = prioritizeActions(trendActions);
[O    top.forEach(item => {
      item.actions.forEach(a => entries.push(\`   → \${a}\`));
  } else {
    entries.push(\`No priority issues detected — all KPIs stable or improving.\`);

  // Log to console
  entries.forEach(e => logMessage('Morning Brief', e));
  // Save shareable HTML + text with charts
  const { text, html } = formatBrief(entries, history);
  fs.writeFileSync('.cache/morning-brief.html', html);
