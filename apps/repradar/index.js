const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getLatestPipelineMetric = require('../../shared/services/getLatestPipelineMetric');

const insight = getLatestPipelineMetric();
logMessage('RepRadar', `${config.appName} v${config.version} — Insight: ${JSON.stringify(insight)}`);
