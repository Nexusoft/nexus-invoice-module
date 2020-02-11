const ensureSignificantDigit = (decimalDigits, num) => {
  let digits = Number(decimalDigits) || 0;
  if (num && typeof num === 'number') {
    let threshold = 10 ** -digits;
    num = Math.abs(num);
    while (num < threshold) {
      threshold /= 10;
      ++digits;
    }
  }
  return digits;
};

export const formatNumber = (num, maxDecimalDigits = 3) => {
  const digits = ensureSignificantDigit(maxDecimalDigits, num);
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits,
  }).format(num);
};

export const formatCurrency = (num, currency = 'USD', maxDecimalDigits = 3) => {
  const digits = ensureSignificantDigit(maxDecimalDigits, num);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: digits,
  }).format(num);
};

export const formatPercent = (num, maxDecimalDigits) => {
  const digits = ensureSignificantDigit(maxDecimalDigits, num);
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: digits,
  }).format(num);
};

export const formatDateTime = (date, options) =>
  date ? new Intl.DateTimeFormat(locale, options).format(date) : 'Invalid';

const relativeTimeUnit = [
  [1000, 'second'],
  [1000 * 60, 'minute'],
  [1000 * 60 * 60, 'hour'],
  [1000 * 60 * 60 * 24, 'day'],
  [1000 * 60 * 60 * 24 * 7, 'week'],
];
const toRelativeTime = timestamp => {
  const ms = new Date(timestamp).valueOf() - Date.now();
  let count = Math.round(ms / 1000);
  let unit = 'second';
  for (let [threshold, tempUnit] of relativeTimeUnit) {
    const tempCount = Math.round(ms / threshold);
    if (tempCount === 0) break;
    else {
      count = tempCount;
      unit = tempUnit;
    }
  }
  return [count, unit];
};

export const formatRelativeTime = (timestamp, options) =>
  new Intl.RelativeTimeFormat(locale, {
    style: 'long',
    numeric: 'auto',
    ...options,
  }).format(...toRelativeTime(timestamp));
