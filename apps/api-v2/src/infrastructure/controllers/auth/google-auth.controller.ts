import { Controller, Get, HttpCode, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthUsecases } from 'src/application/usecases/google/google-auth.usecasses';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Controller('auth')
export class GoogleAuthController {
  constructor(
    private readonly googleAuthUsecases: GoogleAuthUsecases,
    private readonly envVariableService: NestEnvVariableAdapterService,
  ) { }
  @Get('google/callback')
  @HttpCode(301)
  async createOne(
    @Query() queryParams: { code: string },
    @Res() res: Response,
  ) {
    console.log('Auth Google is called');
    const CLIENT_URL = this.envVariableService.getClientUrl();
    const { accessToken, refreshToken } = await this.googleAuthUsecases.handle(
      queryParams.code,
    );

    console.log('Client URL', CLIENT_URL);
    console.log('Access Token', accessToken);
    console.log('Refresh Token', refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect(`${CLIENT_URL}/auth/google/?access_token=${accessToken}`);
  }
}
