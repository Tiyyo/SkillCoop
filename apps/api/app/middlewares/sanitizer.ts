import { NextFunction, Request, Response } from 'express';
import { Sanitize } from '#utils/clean-objects';

export function sanitizer(req: Request, _res: Response, next: NextFunction) {
  req.body = Sanitize.deepObject(req.body);
  req.query = Sanitize.object(req.query);
  req.cookies = Sanitize.object(req.cookies);
  req.headers = Sanitize.object(req.headers);
  next();
}
