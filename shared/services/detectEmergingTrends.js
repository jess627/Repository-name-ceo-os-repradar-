module.exports = function detectEmergingTrends(history, minRuns = 3) {
  const trends = [];

  const titles = [...new Set(history.flatMap(h => h.kpis.map(k => k.title)))];

  titles.forEach(title => {
    const records = history
      .map(h => {
        const match = h.kpis.find(k => k.title === title);
        return match ? match.value : null;
      })
      .filter(v => v !== null);

    if (records.length < minRuns) return;

    const nums = records.map(v => parseFloat(v.replace(/[^\d.-]/g, ''))).filter(n => !isNaN(n));
    if (nums.length < minRuns) return;

    const lastRuns = nums.slice(-minRuns);
    const isUp = lastRuns.every((v, i, arr) => i === 0 || v > arr[i - 1]);
    const isDown = lastRuns.every((v, i, arr) => i === 0 || v < arr[i - 1]);

    if (isUp) {
      trends.push({ title, direction: 'up', streak: minRuns });
    } else if (isDown) {
      trends.push({ title, direction: 'down', streak: minRuns });
    }
  });

  return trends;
};
