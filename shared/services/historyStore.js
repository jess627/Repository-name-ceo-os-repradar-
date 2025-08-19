const fs = require('fs');
const path = require('path');

const HISTORY_DIR = path.join(process.cwd(), '.cache');
const HISTORY_FILE = path.join(HISTORY_DIR, 'kpiHistory.json');

function ensureDir() {
  if (!fs.existsSync(HISTORY_DIR)) fs.mkdirSync(HISTORY_DIR, { recursive: true });
}

function addSnapshot(kpis) {
  ensureDir();
  let history = [];
  if (fs.existsSync(HISTORY_FILE)) {
    history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  }
  history.push({ timestamp: new Date().toISOString(), kpis });
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8');
}

function loadHistory() {
  if (!fs.existsSync(HISTORY_FILE)) return [];
  return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
}

module.exports = { addSnapshot, loadHistory };
