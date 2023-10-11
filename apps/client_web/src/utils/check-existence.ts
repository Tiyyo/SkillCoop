function checkIfExist<T>(value?: T): NonNullable<T> {
  if (!value) return '' as NonNullable<T>;
  return value;
}

export default checkIfExist;