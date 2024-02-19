import { TokenServiceInterface } from 'src/application/token-service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAdapterService implements TokenServiceInterface {
  constructor(private readonly jwtService: JwtService) { }
  async generateToken(
    expireTime: string,
    key: string,
    payload: Record<string, any>,
  ): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: expireTime,
      secret: key,
    });
    return token;
  }
  verifyToken(token: string, key: string): Record<string, any> | null {
    const decoded = this.jwtService.verify(token, { secret: key });
    return decoded;
  }
}
