module.exports = function prioritizeActions(trendActions) {
  // trendActions: [{ kpi, delta, unit, actions }]
  // Higher absolute delta = higher urgency; pipeline > win rate > deal size for impact
  const impactWeights = { pipeline: 3, 'win rate': 2, 'deal size': 1 };

  const scored = trendActions.map(item => {
    const titleLower = item.kpi.title.toLowerCase();
    const impact = Object.keys(impactWeights).find(k => titleLower.includes(k))
      ? impactWeights[Object.keys(impactWeights).find(k => titleLower.includes(k))]
      : 1;
    const urgency = Math.abs(item.delta || 0);
    const score = impact * urgency;
    return { ...item, impact, urgency, score };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
};
