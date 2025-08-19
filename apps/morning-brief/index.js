const { format } = require('date-fns');
const fs = require('fs');
const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getKPIs = require('../../shared/services/getKPIs');
const generateSummary = require('../../shared/services/generateSummary');
const { addSnapshot, loadHistory } = require('../../shared/services/historyStore');
const analyzeHistory = require('../../shared/services/analyzeHistory');
const detectEmergingTrends = require('../../shared/services/detectEmergingTrends');
const { loadKPIs } = require('../../shared/services/persistMetric');
const { compare } = require('../../shared/services/compareWithTrend');
const recommendActions = require('../../shared/services/recommendActions');
const prioritizeActions = require('../../shared/services/prioritizeActions');
const formatBrief = require('../../shared/services/formatBrief');

(async () => {
  const today = format(new Date(), 'MMMM dd, yyyy');
  const entries = [];

  // KPI snapshot + summary
  const currentKPIs = await getKPIs();
  addSnapshot(currentKPIs);
  const history = loadHistory();

  entries.push(`${config.appName} v${config.version} — ${today}`);
  currentKPIs.forEach(kpi => entries.push(`${kpi.title}: ${kpi.value} (${kpi.source})`));
  entries.push(`Executive Summary: ${generateSummary(currentKPIs)}`);

  // 7‑day averages
  const medTerm = analyzeHistory(history, 7);
  medTerm.forEach(avg => {
    if (avg.average !== null) {
      entries.push(`${avg.title} avg over ${avg.periodDays} days: ${avg.average}${avg.title.includes('%') ? '%' : ''}`);
    }
  });

  // Emerging trends
  const emerging = detectEmergingTrends(history, 3);
  emerging.forEach(t => {
    entries.push(`Emerging Trend: ${t.title} trending ${t.direction} for ${t.streak} consecutive runs.`);
  });

  // Priority actions
  const previousKPIs = loadKPIs();
  const trendActions = [];
  currentKPIs.forEach(kpi => {
    const prev = previousKPIs ? previousKPIs.find(p => p.title === kpi.title) : null;
    const trend = compare(kpi, prev);
    if (trend.status === 'down') {
      const actions = recommendActions(kpi);
      trendActions.push({ kpi, delta: trend.delta, unit: trend.unit, actions });
    }
  });

  if (trendActions.length) {
    const top = prioritizeActions(trendActions);
    entries.push(`Top ${top.length} Actions to Take Today:`);
    top.forEach(item => {
      entries.push(`⚡ ${item.kpi.title} — Drop: ${item.delta}${item.unit || ''} — Impact: ${item.impact} — Urgency: ${item.urgency}`);
      item.actions.forEach(a => entries.push(`   → ${a}`));
    });
  } else {
    entries.push(`No priority issues detected — all KPIs stable or improving.`);
  }

  // Log to console
  entries.forEach(e => logMessage('Morning Brief', e));

  // Save shareable HTML + text
  const { text, html } = formatBrief(entries);
  fs.writeFileSync('.cache/morning-brief.txt', text);
  fs.writeFileSync('.cache/morning-brief.html', html);
})();
