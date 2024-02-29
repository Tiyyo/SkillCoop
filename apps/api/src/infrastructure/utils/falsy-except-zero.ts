export function isFalsyExceptZero(value: unknown): boolean {
  return (
    value === false || value === null || value === undefined || value === ''
  );
}
