const { format } = require('date-fns');
const logMessage = require('../../shared/utils/logger');
const config = require('../../shared/config');
const getLatestPipelineMetric = require('../../shared/services/getLatestPipelineMetric');

const today = format(new Date(), 'MMMM dd, yyyy');
const insight = getLatestPipelineMetric();
logMessage('CEO OS', `${config.appName} v${config.version} — Booted in ${config.env} mode — Today is ${today} — Latest Metric: ${insight.title} ${insight.value}`);
