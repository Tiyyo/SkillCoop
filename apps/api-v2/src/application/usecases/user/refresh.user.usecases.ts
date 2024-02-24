import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { decode } from 'punycode';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Injectable()
export class RefreshUserUsecases {
  constructor(
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
    private readonly envVariableService: NestEnvVariableAdapterService,
  ) { }
  async handle(token: string) {
    const JWTRefreshKey = this.envVariableService.getEnvVariable(
      'JWT_REFRESH_TOKEN_KEY',
    );
    const JWTAccessKey =
      this.envVariableService.getEnvVariable('JWT_TOKEN_KEY');
    const VALID_TIME_ACCESS_TOKEN = '15m';

    const decoded = await this.tokenService.verifyToken(token, JWTRefreshKey);
    if (!decoded || !decoded.user_id) {
      throw new UnauthorizedException('Invalid token');
    }
    delete decoded.exp;
    delete decoded.iat;
    return await this.tokenService.generateToken(
      VALID_TIME_ACCESS_TOKEN,
      JWTAccessKey,
      decoded,
    );
  }
}
