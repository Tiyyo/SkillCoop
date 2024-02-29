import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { VerifiedUserAccountService } from 'src/domain/services/user/verified-account.service';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Injectable()
export class VerfiyEmailUserUsecases {
  constructor(
    private readonly envVariableService: NestEnvVariableAdapterService,
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
    private readonly verifiedUserAccountService: VerifiedUserAccountService,
  ) {}
  async handle(userId: string, token: string) {
    const JWTEmailKey = this.envVariableService.getEnvVariable(
      'JWT_EMAIL_TOKEN_KEY',
    );

    const decoded = await this.tokenService.verifyToken(token, JWTEmailKey);
    if (decoded.user_id !== userId) {
      throw new UnauthorizedException('Invalid token or user id');
    }

    await this.verifiedUserAccountService.makeVerified(userId);
  }
}
