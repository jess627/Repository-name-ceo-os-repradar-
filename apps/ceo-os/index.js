const { format } = require('date-fns');
const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getKPIs = require('../../shared/services/getKPIs');
const { saveKPIs, loadKPIs } = require('../../shared/services/persistMetric');
const { compare } = require('../../shared/services/compareWithTrend');
const generateSummary = require('../../shared/services/generateSummary');

(async () => {
  const today = format(new Date(), 'MMMM dd, yyyy');
  const currentKPIs = await getKPIs();
  const previousKPIs = loadKPIs();
  saveKPIs(currentKPIs);

  logMessage('CEO OS', `${config.appName} v${config.version} — Booted in ${config.env} mode — Today is ${today}`);

  currentKPIs.forEach(current => {
    logMessage('CEO OS', `${current.title}: ${current.value} (source: ${current.source})`);
    const prev = previousKPIs ? previousKPIs.find(k => k.title === current.title) : null;
    const trend = compare(current, prev);
    if (trend.status && trend.status !== 'no_prior') {
      logMessage('CEO OS', `Trend: ${trend.status}${trend.delta !== null ? ` (${trend.delta}${trend.unit || ''} since last)` : ''}`);
    }
  });

  const summary = generateSummary(currentKPIs);
  logMessage('CEO OS', `Executive Summary: ${summary}`);
})();
