import { NextFunction, Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';

const sanitize = (val: unknown) => {
  if (typeof val !== 'string') return val;
  return sanitizeHtml(val, {
    allowedTags: [],
    allowedAttributes: {},
  });
};
/* eslint-disable @typescript-eslint/no-explicit-any */
const cleanShadowObject = <T extends Record<string, any>>(
  requestInput: T,
): T => {
  const newObj: Record<string, any> = {};
  Object.entries(requestInput).forEach(([key, value]) => {
    if (typeof value === 'string') {
      newObj[key] = sanitize(value) as any;
    } else {
      newObj[key] = value;
    }
  });
  return newObj as T;
};
/* eslint-enable @typescript-eslint/no-explicit-any */
const cleanDeepObject = (requestInput: Record<string, unknown>) => {
  const newObj: Record<string, unknown> = {};
  Object.entries(requestInput).forEach(([key, value]) => {
    if (typeof value === 'string') {
      newObj[key] = sanitize(value);
    } else if (Array.isArray(value)) {
      newObj[key] = value.map((item) =>
        cleanDeepObject(item as Record<string, unknown>),
      );
    } else if (typeof value === 'object' && value !== null) {
      newObj[key] = cleanDeepObject(value as Record<string, unknown>);
    } else {
      newObj[key] = value;
    }
  });
  return newObj;
};

export function sanitizer(req: Request, res: Response, next: NextFunction) {
  req.body = cleanDeepObject(req.body);
  req.query = cleanShadowObject(req.query);
  req.cookies = cleanShadowObject(req.cookies);
  req.headers = cleanShadowObject(req.headers);
  next();
}
