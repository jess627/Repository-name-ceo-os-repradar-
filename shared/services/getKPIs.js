const getLatestPipelineMetric = require('./getLatestPipelineMetric');

module.exports = async function getKPIs() {
  // In production, you'd run multiple API calls here in parallel
  const pipeline = await getLatestPipelineMetric();
  const winRate = { title: 'Win Rate', value: '42%', source: 'CRM API (mock)', timestamp: new Date().toISOString() };
  const avgDealSize = { title: 'Avg Deal Size', value: '$15,000', source: 'CRM API (mock)', timestamp: new Date().toISOString() };

  return [pipeline, winRate, avgDealSize];
};
