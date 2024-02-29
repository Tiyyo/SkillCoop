import { Controller, HttpCode, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { TokenUserIdDTO } from 'src/application/dto/token-userid.dto';
import { VerifyResetTokenUserIdUserUsecases } from 'src/application/usecases/user/verify-token-userid.user.usecases';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Controller('user')
export class RedirectToResetPasswordUserController {
  constructor(
    private readonly envVarible: NestEnvVariableAdapterService,
    private readonly verifyResetToken: VerifyResetTokenUserIdUserUsecases,
  ) {}
  @Get(':userId/reset-password/:token')
  @HttpCode(204)
  async redirectToReset(@Param() params: TokenUserIdDTO, @Res() res: Response) {
    const CLIENT_URL = this.envVarible.getClientUrl();
    const MAX_AGE = 1000 * 60 * 20; // 20 minutes

    await this.verifyResetToken.handle(params.token, params.userId);

    res.cookie('_rset', params.token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      domain: process.env.DOMAIN,
      maxAge: MAX_AGE,
    });
    res.status(301).redirect(`${CLIENT_URL}/reset-password`);
  }
}
