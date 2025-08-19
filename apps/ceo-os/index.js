const { format } = require('date-fns');
const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getLatestPipelineMetric = require('../../shared/services/getLatestPipelineMetric');
const { saveMetric, loadMetric } = require('../../shared/services/persistMetric');
const { compare } = require('../../shared/services/compareWithTrend');

(async () => {
  const today = format(new Date(), 'MMMM dd, yyyy');
  const current = await getLatestPipelineMetric();
  const previous = loadMetric();
  const trend = compare(current, previous);
  saveMetric(current);

  let trendText = '';
  if (trend.status === 'no_prior') trendText = 'no prior data';
  else if (trend.status === 'incomparable') trendText = 'trend unavailable';
  else {
    const deltaStr = trend.unit === '%' ? `${trend.delta.toFixed(2)}%` : `${trend.delta}`;
    trendText = `${trend.status} (${deltaStr} since last)`;
  }

  logMessage('CEO OS',
    `${config.appName} v${config.version} — Booted in ${config.env} mode — Today is ${today} — ` +
    `Latest Metric: ${current.title} ${current.value} — ${trendText}`
  );
})();
