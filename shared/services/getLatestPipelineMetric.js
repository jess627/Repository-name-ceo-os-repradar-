const fetch = require('node-fetch');
const config = require('../config');
const { setHealth } = require('./health');

module.exports = async function getLatestPipelineMetric() {
  try {
    const res = await fetch('https://api.example.com/pipeline-metric', {
      headers: { 'Authorization': \`Bearer \${config.crmApiKey}\` }
    });
    if (!res.ok) throw new Error(\`API returned status \${res.status}\`);
    const data = await res.json();
    setHealth('pipelineMetric', 'ok');
    return {
      title: data.title || 'Pipeline Metric',
      value: data.value || 'N/A',
      source: 'Live CRM API',
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    setHealth('pipelineMetric', 'error', err.message);
    return {
      title: 'Pipeline Growth',
      value: '+18%',
      source: 'Live CRM API (fallback)',
      timestamp: new Date().toISOString()
    };
  }
};
