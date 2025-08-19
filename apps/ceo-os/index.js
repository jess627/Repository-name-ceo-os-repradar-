const { format } = require('date-fns');
const logMessage = require('../../shared/utils/logger');
const today = format(new Date(), 'MMMM dd, yyyy');
logMessage('CEO OS', `Booted — Today is ${today}`);
