import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
    private readonly envVariableService: NestEnvVariableAdapterService,
  ) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies.refreshToken;
    const authHeader =
      req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('UnAuthorized');
    }
    const accessToken = authHeader?.split(' ')[1];
    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('UnAuthorized');
    }
    const accessKey = this.envVariableService.getEnvVariable('JWT_TOKEN_KEY');
    const refreshKey = this.envVariableService.getEnvVariable(
      'JWT_REFRESH_TOKEN_KEY',
    );
    const accessTokenPayload = await this.tokenService.verifyToken(
      accessToken,
      accessKey,
    );
    const refreshTokenPayload = await this.tokenService.verifyToken(
      refreshToken,
      refreshKey,
    );
    if (accessTokenPayload.user_id !== refreshTokenPayload.user_id) {
      throw new UnauthorizedException('UnAuthorized');
    }
    //@ts-expect-error Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'
    req.user = accessTokenPayload.user_id;
    next();
  }
}
