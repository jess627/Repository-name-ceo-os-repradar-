module.exports = function generateSummary(kpis) {
  let sentiment = 'neutral';
  let notes = [];

  kpis.forEach(kpi => {
    const title = kpi.title.toLowerCase();
    if (title.includes('growth') || title.includes('win rate') || title.includes('deal size')) {
      if (typeof kpi.value === 'string' && kpi.value.includes('+')) {
        notes.push(`${kpi.title} is strong at ${kpi.value}`);
        sentiment = 'positive';
      } else if (typeof kpi.value === 'string' && kpi.value.includes('-')) {
        notes.push(`${kpi.title} is down at ${kpi.value}`);
        sentiment = 'negative';
      } else {
        notes.push(`${kpi.title} is steady at ${kpi.value}`);
      }
    }
  });

  const summary = `Overall performance is ${sentiment}. ${notes.join('; ')}.`;
  return summary;
};
