import { NextFunction, Request, Response } from 'express';

export function infosDemoAccountProvider(req: Request, res: Response, next: NextFunction) {
  req.body.email = 'john.doe@example.com';
  req.body.password = process.env.DEMO_PASSWORD as string;
  next();
}