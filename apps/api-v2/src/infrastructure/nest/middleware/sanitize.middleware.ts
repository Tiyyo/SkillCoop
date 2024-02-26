import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SanitizeService } from 'src/infrastructure/service/sanitize.service';

@Injectable()
export class SanitizeMiddleware implements NestMiddleware {
  constructor() { }
  async use(req: Request, _res: Response, next: NextFunction) {
    req.body = SanitizeService.deepObject(req.body);
    req.query = SanitizeService.object(req.query);
    req.cookies = SanitizeService.object(req.cookies);
    req.headers = SanitizeService.object(req.headers);
    next();
  }
}
