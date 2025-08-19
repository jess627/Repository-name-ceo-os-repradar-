module.exports = function getLatestPipelineMetric() {
  // Later this will call a real API
  return {
    title: 'Pipeline Growth',
    value: '+18%',
    source: 'Live CRM API (mocked)',
    timestamp: new Date().toISOString()
  };
};
