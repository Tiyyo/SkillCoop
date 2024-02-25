import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ResetPasswordDTO } from 'src/application/dto/password.dto';
import { ResetPasswordUserUsecases } from 'src/application/usecases/user/reset-password.user.usecases';

@Controller('user')
export class ResetPasswordUserController {
  constructor(
    private readonly resetPasswordUsecases: ResetPasswordUserUsecases,
  ) { }
  @Post('/reset-password')
  @HttpCode(200)
  async resetPassword(@Req() req: Request, @Body() body: ResetPasswordDTO) {
    const token = req.cookies._rset;

    try {
      await this.resetPasswordUsecases.handle(token, body.password);
    } catch (error) {
      return { message: 'expire' };
    }

    return { message: 'success' };
  }
}
