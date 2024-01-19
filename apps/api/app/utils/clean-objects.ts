import sanitizeHtml from 'sanitize-html';

export class Sanitize {
  static string(val: unknown) {
    if (typeof val !== 'string') return val;
    return sanitizeHtml(val, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  static object<T extends Record<string, any>>(input: T) {
    const newObj: Record<string, any> = {};
    Object.entries(input).forEach(([key, value]) => {
      if (typeof value === 'string') {
        newObj[key] = Sanitize.string(value) as any;
      } else {
        newObj[key] = value;
      }
    });
    return newObj as T;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
  static deepObject(input: Record<string, unknown>) {
    const newObj: Record<string, unknown> = {};

    Object.entries(input).forEach(([key, value]) => {
      if (typeof value === 'string') {
        newObj[key] = Sanitize.string(value);
      } else if (Array.isArray(value)) {
        newObj[key] = value.map((item) => {
          if (typeof item === 'object') {
            Sanitize.deepObject(item as Record<string, unknown>);
          }
          return typeof item === 'string' ? Sanitize.string(item) : item;
        });
      } else if (typeof value === 'object' && value !== null) {
        newObj[key] = Sanitize.deepObject(value as Record<string, unknown>);
      } else {
        newObj[key] = value;
      }
    });

    return newObj;
  }
}
