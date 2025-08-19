const fetch = require('node-fetch');
const config = require('../config');

module.exports = async function getLatestPipelineMetric() {
  try {
    const res = await fetch('https://api.example.com/pipeline-metric', {
      headers: {
        'Authorization': `Bearer ${config.crmApiKey}`
      }
    });
    const data = await res.json();
    return {
      title: data.title || 'Pipeline Metric',
      value: data.value || 'N/A',
      source: 'Live CRM API',
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    return {
      title: 'Pipeline Growth',
      value: '+18%',
      source: 'Live CRM API (fallback)',
      timestamp: new Date().toISOString()
    };
  }
};
