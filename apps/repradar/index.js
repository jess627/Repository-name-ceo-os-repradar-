const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getLatestPipelineMetric = require('../../shared/services/getLatestPipelineMetric');
const { saveMetric, loadMetric } = require('../../shared/services/persistMetric');
const { compare } = require('../../shared/services/compareWithTrend');

(async () => {
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

  logMessage('RepRadar',
    `${config.appName} v${config.version} — Insight: ${JSON.stringify(current)} — ${trendText}`
  );
})();
