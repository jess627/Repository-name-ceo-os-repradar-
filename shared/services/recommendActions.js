module.exports = function recommendActions(kpi) {
  const title = kpi.title.toLowerCase();
  
  if (title.includes('pipeline')) {
    return [
      'Review lead source performance and drop underperforming channels',
      'Re‑engage dormant opportunities in earlier stages',
      'Audit top‑of‑funnel conversion tactics'
    ];
  }
  if (title.includes('win rate')) {
    return [
      'Analyze recent lost deals to identify common objections',
      'Refine qualification criteria to avoid weak fit prospects',
      'Conduct deal post‑mortems with reps on losing streaks'
    ];
  }
  if (title.includes('deal size')) {
    return [
      'Bundle products/services to increase average order value',
      'Target higher‑budget segments or industries',
      'Review discounting practices and enforce pricing discipline'
    ];
  }
  return ['No specific playbook for this KPI yet'];
};
