import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { NestEnvVariableAdapterService } from '../../service/env.adapter.service';

@Injectable()
export class SSEGuard implements CanActivate {
  constructor(
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,

    private readonly envVariableService: NestEnvVariableAdapterService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const refreshToken = req.cookies.refreshToken;

    const refreshKey = this.envVariableService.getEnvVariable(
      'JWT_REFRESH_TOKEN_KEY',
    );

    const refreshTokenPayload = await this.tokenService.verifyToken(
      refreshToken,
      refreshKey,
    );

    if (!refreshTokenPayload.user_id) {
      throw new UnauthorizedException('UnAuthorized');
    }

    req.user = refreshTokenPayload.user_id;

    return true;
  }
}
