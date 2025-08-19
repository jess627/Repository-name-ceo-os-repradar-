const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getKPIs = require('../../shared/services/getKPIs');
const { loadKPIs } = require('../../shared/services/persistMetric');
const { compare } = require('../../shared/services/compareWithTrend');
const deepDive = require('../../shared/services/deepDive');

(async () => {
  const previousKPIs = loadKPIs();
  const currentKPIs = await getKPIs();

  currentKPIs.forEach(kpi => {
    const prev = previousKPIs ? previousKPIs.find(p => p.title === kpi.title) : null;
    const trend = compare(kpi, prev);
    logMessage('RepRadar', `${config.appName} — Insight: ${kpi.title} is ${kpi.value} [${kpi.source}]`);
    
    if (trend.status === 'down') {
      logMessage('RepRadar', `${deepDive(kpi)} — Dropped ${trend.delta}${trend.unit || ''} since last run.`);
    }
    if (trend.status === 'up') {
      logMessage('RepRadar', `Improved ${trend.delta}${trend.unit || ''} since last run. ${deepDive(kpi)}`);
    }
  });
})();
