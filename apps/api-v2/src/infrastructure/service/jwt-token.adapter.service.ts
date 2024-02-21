import { TokenServiceInterface } from 'src/application/services/token.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { TokenServiceException } from 'src/application/exceptions/token-service.exception';

@Injectable()
export class JwtAdapterService implements TokenServiceInterface {
  constructor(private readonly jwtService: JwtService) { }
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
      throw new TokenServiceException('Invalid token', 'JWT Adapter');
    }
  }
  async generateAuthTokens(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.generateToken(
      '15m',
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { userId },
    );
    const refreshToken = await this.generateToken(
      '24h',
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { userId },
    );
    return { accessToken, refreshToken };
  }
}
