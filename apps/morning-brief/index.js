const { format } = require('date-fns');
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

(async () => {
  const today = format(new Date(), 'MMMM dd, yyyy');
  const currentKPIs = await getKPIs();

  // CEO OS part
  addSnapshot(currentKPIs);
  const history = loadHistory();
  logMessage('Morning Brief', `${config.appName} v${config.version} — ${today}`);
  currentKPIs.forEach(kpi => logMessage('Morning Brief', `${kpi.title}: ${kpi.value} (${kpi.source})`));
  logMessage('Morning Brief', `Executive Summary: ${generateSummary(currentKPIs)}`);

  const medTerm = analyzeHistory(history, 7);
  medTerm.forEach(avg => {
    if (avg.average !== null) {
      logMessage('Morning Brief', `${avg.title} avg over ${avg.periodDays} days: ${avg.average}${avg.title.includes('%') ? '%' : ''}`);
    }
  });

  const emerging = detectEmergingTrends(history, 3);
  emerging.forEach(t => {
    logMessage('Morning Brief', `Emerging Trend: ${t.title} trending ${t.direction} for ${t.streak} consecutive runs.`);
  });

  // RepRadar part
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
    logMessage('Morning Brief', `Top ${top.length} Actions to Take Today:`);
    top.forEach(item => {
      logMessage('Morning Brief', `⚡ ${item.kpi.title} — Drop: ${item.delta}${item.unit || ''} — Impact: ${item.impact} — Urgency: ${item.urgency}`);
      item.actions.forEach(a => logMessage('Morning Brief', `   → ${a}`));
    });
  } else {
    logMessage('Morning Brief', `No priority issues detected — all KPIs stable or improving.`);
  }
})();
