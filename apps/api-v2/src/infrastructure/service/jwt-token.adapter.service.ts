import { TokenServiceInterface } from 'src/application/services/token.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { TokenServiceException } from 'src/application/exceptions/token-service.exception';
import { NestEnvVariableAdapterService } from './env.adapter.service';

@Injectable()
export class JwtAdapterService implements TokenServiceInterface {
  constructor(
    private readonly jwtService: JwtService,
    private readonly nestEnvVariableService: NestEnvVariableAdapterService,
  ) { }
  async generateToken(
    expireTime: string,
    key: string,
    payload: Record<string, any>,
  ): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(payload, {
        expiresIn: expireTime,
        secret: key,
      });
      return token;
    } catch (error) {
      console.log(error);
      throw new TokenServiceException(
        'Could not generate token',
        'JWT Adapter',
      );
    }
  }
  async verifyToken(
    token: string,
    key: string,
  ): Promise<Record<string, any>> | null {
    try {
      const decoded = await this.jwtService.verify(token, { secret: key });
      return decoded;
    } catch (error) {
      console.log(error);
      throw new TokenServiceException('Invalid token', 'JWT Adapter');
    }
  }
  async generateAuthTokens(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const VALID_TIME_ACCESS_TOKEN = '15m';
    const VALID_TIME_REFRESH_TOKEN = '24h';
    const accessToken = await this.generateToken(
      VALID_TIME_ACCESS_TOKEN,
      this.nestEnvVariableService.getEnvVariable('JWT_TOKEN_KEY'),
      { uuser_id: userId },
    );
    const refreshToken = await this.generateToken(
      VALID_TIME_REFRESH_TOKEN,
      this.nestEnvVariableService.getEnvVariable('JWT_REFRESH_TOKEN_KEY'),
      { user_id: userId },
    );
    return { accessToken, refreshToken };
  }
}
