const { parse } = require('date-fns');

function avgNumeric(values) {
  const nums = values.map(v => parseFloat(v.replace(/[^\d.-]/g, '')))
                     .filter(n => !isNaN(n));
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

module.exports = function analyzeHistory(history, days = 7) {
  if (!history.length) return [];

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const recent = history.filter(h => new Date(h.timestamp || h.time || h.date || h.createdAt || h.kpis[0]?.timestamp) >= cutoff);

  if (!recent.length) return [];

  const titles = [...new Set(recent.flatMap(h => h.kpis.map(k => k.title)))];

  return titles.map(title => {
    const values = recent.flatMap(h => h.kpis.filter(k => k.title === title).map(k => k.value));
    const avg = avgNumeric(values);
    return { title, average: avg, count: values.length, periodDays: days };
  });
};
