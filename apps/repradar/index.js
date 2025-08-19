const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getKPIs = require('../../shared/services/getKPIs');
const { loadKPIs } = require('../../shared/services/persistMetric');
const { compare } = require('../../shared/services/compareWithTrend');
const deepDive = require('../../shared/services/deepDive');
const recommendActions = require('../../shared/services/recommendActions');
const prioritizeActions = require('../../shared/services/prioritizeActions');

(async () => {
  const previousKPIs = loadKPIs();
  const currentKPIs = await getKPIs();
  const trendActions = [];

  currentKPIs.forEach(kpi => {
    const prev = previousKPIs ? previousKPIs.find(p => p.title === kpi.title) : null;
    const trend = compare(kpi, prev);
    logMessage('RepRadar', `${config.appName} — Insight: ${kpi.title} is ${kpi.value} [${kpi.source}]`);

    if (trend.status === 'down') {
      const actions = recommendActions(kpi);
      trendActions.push({ kpi, delta: trend.delta, unit: trend.unit, actions });
    }
  });

  if (trendActions.length) {
    const top = prioritizeActions(trendActions);
    logMessage('RepRadar', `Top ${top.length} Actions to Take Today:`);
    top.forEach(item => {
      logMessage('RepRadar', `⚡ ${item.kpi.title} — Drop: ${item.delta}${item.unit || ''} — Impact: ${item.impact} — Urgency: ${item.urgency}`);
      item.actions.forEach(a => logMessage('RepRadar', `   → ${a}`));
    });
  } else {
    logMessage('RepRadar', `No priority issues detected today — all KPIs stable or improving.`);
  }
})();
