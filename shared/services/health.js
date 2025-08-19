const health = {};

function setHealth(service, status, details = null) {
  health[service] = { status, details, timestamp: new Date().toISOString() };
}

function getHealth() {
  return health;
}

module.exports = { setHealth, getHealth };
