const { format } = require('date-fns');
const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getKPIs = require('../../shared/services/getKPIs');

(async () => {
  const today = format(new Date(), 'MMMM dd, yyyy');
  const kpis = await getKPIs();
  logMessage('CEO OS', `${config.appName} v${config.version} — Booted in ${config.env} mode — Today is ${today}`);
  kpis.forEach(kpi => {
    logMessage('CEO OS', `${kpi.title}: ${kpi.value} (source: ${kpi.source})`);
  });
})();
