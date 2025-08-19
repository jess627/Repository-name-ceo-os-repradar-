function parseValue(value) {
  if (typeof value === 'number') return { num: value, type: 'number' };
  if (typeof value === 'string') {
    const isPercent = value.includes('%');
    const cleaned = value.replace(/[^\d\.\-]/g, '');
    const num = parseFloat(cleaned);
    if (Number.isFinite(num)) return { num, type: isPercent ? 'percent' : 'number' };
  }
  return { num: NaN, type: 'unknown' };
}

function compare(current, previous) {
  if (!previous) return { status: 'no_prior', delta: null, current, previous };

  const c = parseValue(current.value);
  const p = parseValue(previous.value);
  if (!Number.isFinite(c.num) || !Number.isFinite(p.num) || c.type !== p.type) {
    return { status: 'incomparable', delta: null, current, previous };
  }

  const delta = c.num - p.num;
  const eps = 1e-9;
  const status = Math.abs(delta) < eps ? 'flat' : (delta > 0 ? 'up' : 'down');
  return { status, delta, current, previous, unit: c.type === 'percent' ? '%' : null };
}

module.exports = { compare };
