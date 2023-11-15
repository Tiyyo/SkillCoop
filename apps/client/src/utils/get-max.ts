export const getMaxValue = <T extends number>(values: T[]): number | null => {
  if (!values) return null;
  return Math.max(...values);
};
