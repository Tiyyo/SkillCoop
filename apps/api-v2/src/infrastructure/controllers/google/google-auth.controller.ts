import { Controller, Get, HttpCode, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthUsecases } from 'src/application/usecases/google/google-auth.usecasses';

@Controller('auth')
export class GoogleAuthController {
  constructor(private readonly googleAuthUsecases: GoogleAuthUsecases) { }
  @Get('google/back')
  @HttpCode(301)
  async createOne(
    @Query() queryParams: { code: string },
    @Res() res: Response,
  ) {
    const CLIENT_URL = 'http://localhost:3000';
    const { accessToken, refreshToken } = await this.googleAuthUsecases.handle(
      queryParams.code,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect(`${CLIENT_URL}/auth/google/?access_token=${accessToken}`);
  }
}
