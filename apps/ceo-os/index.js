const { format } = require('date-fns');
const today = format(new Date(), 'MMMM dd, yyyy');
console.log(`CEO OS Booted — Today is ${today}`);
