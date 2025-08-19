const logMessage = require('../../shared/utils/logger');
const sampleInsight = {
  title: 'Pipeline Growth',
  value: '+12%',
  source: 'CRM Mock Data — validated through RepRadar'
};
logMessage('RepRadar', `Insight: ${JSON.stringify(sampleInsight)}`);
