export const sumValues = (...values: Array<number | undefined | null>) => {
  return values.reduce((acc, curr) => {
    if (acc === null || acc === undefined) return 0;
    if (!curr) return acc;
    return acc + curr;
  }, 0);
};
