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
export class ResetPasswordGuard implements CanActivate {
  constructor(
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
    private readonly envVariableService: NestEnvVariableAdapterService,
  ) { }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = request.cookies._rset;

    if (!token) throw new UnauthorizedException('Invalid token');

    const JwtEmailKey = this.envVariableService.getEnvVariable(
      'JWT_EMAIL_TOKEN_KEY',
    );

    const decoded = await this.tokenService.verifyToken(token, JwtEmailKey);

    if (decoded && !decoded.user_id) {
      return response.status(200).json({ message: 'expire' });
    }
    return true;
  }
}
