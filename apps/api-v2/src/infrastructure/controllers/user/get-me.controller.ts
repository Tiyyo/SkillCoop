import {
  Controller,
  Get,
  Inject,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AccessTokenException } from 'src/application/exceptions/access-token.exception';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { GetMeUserUsecases } from 'src/application/usecases/user/get-me.user.usecases';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Controller('user')
export class GetMeController {
  constructor(
    @Inject('TokenService') private tokenService: TokenServiceInterface,
    private readonly envVariableService: NestEnvVariableAdapterService,
    private readonly getMeUserUsecases: GetMeUserUsecases,
  ) { }

  @Get('me')
  async getMe(@Req() req: Request, @Res() res: Response) {
    const authHeaders = req.headers.Authorization || req.headers.authorization;
    let token: string;
    if (
      authHeaders &&
      typeof authHeaders === 'string' &&
      authHeaders.startsWith('Bearer')
    ) {
      token = authHeaders.split(' ')[1];
    }
    if (!token) {
      throw new AccessTokenException(
        'No access token provided',
        'GetMeController',
      );
    }

    const accessKey = this.envVariableService.getEnvVariable('JWT_TOKEN_KEY');
    let decoded: any;
    try {
      decoded = await this.tokenService.verifyToken(token, accessKey);
    } catch (error) {
      return res.status(401).json({ error: 'UnAuthorized' });
    }

    const profile = await this.getMeUserUsecases.getProfile(decoded.user_id);
    if (!profile) {
      throw new UnauthorizedException('No access');
    }
    return res.status(200).json({
      userProfile: profile,
      success: !!profile,
      userId: decoded.user_id,
    });
  }
}
