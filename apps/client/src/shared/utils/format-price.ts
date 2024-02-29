export function formatPrice(price: number) {
  if (typeof price !== 'number') return null;
  return Number(price.toFixed(2));
}
