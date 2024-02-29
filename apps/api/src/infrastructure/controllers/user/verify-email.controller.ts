import { Controller, Get, HttpCode, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { TokenUserIdDTO } from 'src/application/dto/token-userid.dto';
import { VerfiyEmailUserUsecases } from 'src/application/usecases/user/verify-email.user.usecases';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Controller('user')
export class VerifyEmailUserController {
  constructor(
    private readonly verifyEmailUsecases: VerfiyEmailUserUsecases,
    private envVariableService: NestEnvVariableAdapterService,
  ) {}
  @Get('/:userId/verify/:token')
  @HttpCode(200)
  async verifyEmail(@Param() params: TokenUserIdDTO, @Res() res: Response) {
    const CLIENT_URL = this.envVariableService.getClientUrl();
    await this.verifyEmailUsecases.handle(params.userId, params.token);
    res.status(300).redirect(`${CLIENT_URL}/verify-email/success`);
  }
}
