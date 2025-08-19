const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getLatestPipelineMetric = require('../../shared/services/getLatestPipelineMetric');

(async () => {
  const insight = await getLatestPipelineMetric();
  logMessage('RepRadar', `${config.appName} v${config.version} — Insight: ${JSON.stringify(insight)}`);
})();
