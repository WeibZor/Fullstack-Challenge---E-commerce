export const formatCurrency = (value) => {
  const number = Number(value);
  return `$${Number.isFinite(number) ? number.toFixed(2) : '0.00'}`;
};