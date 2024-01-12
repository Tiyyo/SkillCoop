import { NextFunction, Request, Response } from 'express';
import { ZodError } from '@skillcoop/schema';
import ServerError from '../helpers/errors/server.error.js';
import ValidationError from '../helpers/errors/validation.error.js';
import type { ZodType, ZodTypeDef } from '@skillcoop/schema';

export function validateSchema(
  schema: ZodType<unknown, ZodTypeDef, unknown>,
  canal: 'body' | 'params' | 'query',
) {
  return async function (request: Request, _res: Response, next: NextFunction) {
    if (!schema) return next(new ServerError('No schema provided'));
    try {
      await schema.parseAsync(request[canal]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErros: Record<string, string> = {};
        // We don't use ZodError formErrors accessor
        // because we can't associate the error with the field
        error.issues.map((e) => {
          return (fieldErros[e.path[0]] = e.message);
        });
        next(new ValidationError('Schema is not valid', fieldErros));
      }
      next(error);
    }
  };
}
