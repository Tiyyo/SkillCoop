export function transformBooleanToNumber<T>(value: T): T | number {
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  return value;
}

export function transformNumberToBoolean<T>(value: T): T | boolean {
  if (value === 1) {
    return true;
  }
  if (value === 0) {
    return false;
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

export function transformNumberToBooleanInObject(obj: any) {
  // NOTE: Dont work on deep object
  const copyObj = { ...obj };
  for (const key in obj) {
    copyObj[key] = transformNumberToBoolean(copyObj[key]);
  }
  return copyObj;
}
