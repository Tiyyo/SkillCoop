import { Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginUserUsecases } from 'src/application/usecases/user/login.user.usecases';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Controller('auth')
export class LoginDemoUserController {
  constructor(
    private readonly loginUsecases: LoginUserUsecases,
    private readonly envVarible: NestEnvVariableAdapterService,
  ) { }
  @Post('demo')
  @HttpCode(200)
  async login(@Res() res: Response) {
    console.log('login demo is called');
    const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days
    const HOST = this.envVarible.getHost();
    const emailDemo = 'john.doe@example.com';
    const passwordDemo = this.envVarible.getEnvVariable('DEMO_PASSWORD');

    const loginTrack = await this.loginUsecases.handle(emailDemo, passwordDemo);

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
      console.log(
        'Login Demo Controller Access Token:',
        loginTrack.accessToken,
      );
      console.log(
        'Login Demo Controller Refresh Token:',
        loginTrack.refreshToken,
      );
      return res.json({ accessToken: loginTrack.accessToken });
    }
    return res.status(400).json({ error: 'Bad credentials' });
  }
}
