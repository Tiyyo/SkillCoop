export function isString(value: unknown): asserts value is string {
  if (typeof value !== 'string')
    throw new TypeError(`Expected string but received ${typeof value}`);
}

export function isNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number')
    throw new TypeError(`Expected number but received ${typeof value}`);
}

export function isBoolean(value: unknown): asserts value is boolean {
  if (typeof value !== 'boolean')
    throw new TypeError(`Expected boolean but received ${typeof value}`);
}

export function isUndefined(value: unknown): asserts value is undefined {
  if (typeof value !== 'undefined')
    throw new TypeError(`Expected undefined but received ${typeof value}`);
}

export function isNull(value: unknown): asserts value is null {
  if (value !== null)
    throw new TypeError(`Expected null but received ${value}`);
}
