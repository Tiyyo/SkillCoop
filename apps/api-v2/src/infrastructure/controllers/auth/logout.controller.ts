import { Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Controller('auth')
export class LogoutUserController {
  constructor(
    private readonly envVariableService: NestEnvVariableAdapterService,
  ) { }
  @Post('logout')
  @HttpCode(204)
  async logout(@Res() res: Response) {
    res.clearCookie('refreshToken', {
      sameSite: 'none',
      secure: true,
      domain: this.envVariableService.getHost(),
    });
    res.end();
  }
}
