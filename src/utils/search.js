export const normalizeSearchText = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const buildSearchText = (product) => {
  return [product.title, product.description, product.category, product.categoryLabel, product.sku]
    .map(normalizeSearchText)
    .filter(Boolean)
    .join(' ');
};

export const productMatchesSearch = (product, term) => {
  const normalizedTerm = normalizeSearchText(term);
  if (!normalizedTerm) return true;

  const targetText = buildSearchText(product);
  return normalizedTerm
    .split(' ')
    .every((keyword) => targetText.includes(keyword));
};
