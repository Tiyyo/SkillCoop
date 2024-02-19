export function transformBooleanToNumber<T>(value: T): T | number {
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  return value;
}

export function transformBoolToNumberInObject(obj: any) {
  // NOTE: Dont work on deep object
  const copyObj = { ...obj };
  for (const key in obj) {
    copyObj[key] = transformBooleanToNumber(copyObj[key]);
  }
  return copyObj;
}
