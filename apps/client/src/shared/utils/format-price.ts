export function formatPrice(price: unknown): number | null {
  if (typeof price !== 'number') return null;
  return Number(price.toFixed(2));
}
