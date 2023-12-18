import { NextFunction, Request, Response } from 'express';

export type Controller = (req: Request, res: Response, next?: NextFunction) => any | Promise<any>; // eslint-disable-line

// find a less confusuing name
export type ObjectRecordGeneric = Record<string, string | number | boolean | null>;

export const canals = {
  body: 'body',
  params: 'params',
  query: 'query',
} as const;

