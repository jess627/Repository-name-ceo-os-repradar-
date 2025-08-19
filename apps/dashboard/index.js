const logMessage = require('../../shared/utils/logger');
const { getHealth } = require('../../shared/services/health');

logMessage('System Health', JSON.stringify(getHealth(), null, 2));
