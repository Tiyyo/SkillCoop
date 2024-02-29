import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenException } from 'src/application/exceptions/refresh-token.exception';
import { TokenServiceException } from 'src/application/exceptions/token-service.exception';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Injectable()
export class RefreshUserUsecases {
  constructor(
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
    private readonly envVariableService: NestEnvVariableAdapterService,
  ) {}
  async handle(token: string) {
    const JWTRefreshKey = this.envVariableService.getEnvVariable(
      'JWT_REFRESH_TOKEN_KEY',
    );
    const JWTAccessKey =
      this.envVariableService.getEnvVariable('JWT_TOKEN_KEY');
    const VALID_TIME_ACCESS_TOKEN = '15m';

    let decoded: any;
    try {
      decoded = await this.tokenService.verifyToken(token, JWTRefreshKey);
    } catch (error) {
      if (error instanceof TokenServiceException) {
        throw new RefreshTokenException(error.message, 'RefreshUserUsecases');
      }
    }

    if (!decoded || !decoded.user_id) {
      throw new RefreshTokenException(
        'No payload inside refresh token',
        'RefreshUserUsecases',
      );
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
