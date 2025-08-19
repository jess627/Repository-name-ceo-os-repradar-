const { format } = require('date-fns');
const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getKPIs = require('../../shared/services/getKPIs');
const { addSnapshot, loadHistory } = require('../../shared/services/historyStore');
const generateSummary = require('../../shared/services/generateSummary');

(async () => {
  const today = format(new Date(), 'MMMM dd, yyyy');
  const currentKPIs = await getKPIs();

  addSnapshot(currentKPIs);
  const history = loadHistory();

  logMessage('CEO OS', `${config.appName} v${config.version} — Booted in ${config.env} mode — Today is ${today}`);
  currentKPIs.forEach(kpi => {
    logMessage('CEO OS', `${kpi.title}: ${kpi.value} (source: ${kpi.source})`);
  });

  const summary = generateSummary(currentKPIs);
  logMessage('CEO OS', `Executive Summary: ${summary}`);
  logMessage('CEO OS', `KPI history entries: ${history.length}`);
})();
