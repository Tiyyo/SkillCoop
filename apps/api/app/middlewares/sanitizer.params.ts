import { Request, Response, NextFunction } from 'express';
import { Sanitize } from '../utils/clean-objects.js';

export function sanitizeParams(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  req.params = Sanitize.object(req.params);
  next();
}
