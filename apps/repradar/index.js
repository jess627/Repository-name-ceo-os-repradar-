const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getKPIs = require('../../shared/services/getKPIs');
const deepDive = require('../../shared/services/deepDive');

(async () => {
  const kpis = await getKPIs();
  kpis.forEach(kpi => {
    logMessage('RepRadar', `${config.appName} — Insight: ${kpi.title} is ${kpi.value} [${kpi.source}]`);
    if (typeof kpi.value === 'string' && kpi.value.includes('-')) {
      logMessage('RepRadar', deepDive(kpi));
    }
  });
})();
