import { Controller, Get, HttpCode, Req } from '@nestjs/common';
import { Request } from 'express';
import { RefreshUserUsecases } from 'src/application/usecases/user/refresh.user.usecases';

@Controller('auth')
export class RefreshUserController {
  constructor(private readonly refreshUsecases: RefreshUserUsecases) { }
  @Get('refresh')
  @HttpCode(200)
  async refresh(@Req() req: Request) {
    const token = req.cookies.refreshToken;
    console.log('Refresh Controller Token:', token);
    const accessToken = await this.refreshUsecases.handle(token);
    console.log('Refresh Controller Access Token:', accessToken);
    return { accessToken };
  }
}
