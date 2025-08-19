const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'lastKpis.json');

function ensureDir() {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function saveKPIs(kpis) {
  try {
    ensureDir();
    fs.writeFileSync(CACHE_FILE, JSON.stringify(kpis, null, 2), 'utf8');
  } catch (_) {}
}

function loadKPIs() {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const raw = fs.readFileSync(CACHE_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

module.exports = { saveKPIs, loadKPIs };
