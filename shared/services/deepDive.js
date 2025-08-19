module.exports = function deepDive(kpi) {
  if (kpi.title.toLowerCase().includes('pipeline')) {
    return `Pipeline deep dive: review stage conversion rates, lead sources, and deal aging.`;
  }
  if (kpi.title.toLowerCase().includes('win rate')) {
    return `Win rate deep dive: analyze lost deal reasons, competitive overlaps, and rep performance.`;
  }
  if (kpi.title.toLowerCase().includes('deal size')) {
    return `Deal size deep dive: segment closed‑won deals by source, industry, and cycle length.`;
  }
  return `No deep dive logic for ${kpi.title}`;
};
