import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginUserDTO } from 'src/application/dto/login-dto';
import { LoginUserUsecases } from 'src/application/usecases/user/login.user.usecases';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Controller('auth')
export class LoginUserController {
  constructor(
    private readonly loginUsecases: LoginUserUsecases,
    private readonly envVarible: NestEnvVariableAdapterService,
  ) { }
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginUserDTO, @Res() res: Response) {
    const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days
    const HOST = this.envVarible.getHost();

    const loginTrack = await this.loginUsecases.handle(
      body.email,
      body.password,
    );

    if (!loginTrack.success) {
      return res.status(loginTrack.status).json({
        error: loginTrack.error,
        blocked: loginTrack.blocked,
        failedAttemps: loginTrack.failedAttempts,
      });
    }
    if (
      loginTrack.success &&
      loginTrack.accessToken &&
      loginTrack.refreshToken
    ) {
      res.cookie('refreshToken', loginTrack.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: MAX_AGE,
        domain: HOST,
      });
      return res.json({ accessToken: loginTrack.accessToken });
    }
    return res.status(400).json({ error: 'Bad credentials' });
  }
}
