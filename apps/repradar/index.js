const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const sampleInsight = {
  title: 'Pipeline Growth',
  value: '+12%',
  source: 'CRM Mock Data — validated through RepRadar'
};
logMessage('RepRadar', `${config.appName} v${config.version} — Insight: ${JSON.stringify(sampleInsight)}`);
