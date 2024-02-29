import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ResetPasswordGuard } from 'src/infrastructure/nest/guards/reset-password.guard';

@Controller('user')
export class VerifyResetTokenhUserController {
  constructor() {}
  @Get('reset-password')
  @UseGuards(ResetPasswordGuard)
  @HttpCode(200)
  // Client needed a route to verify the reset token before accessing the reset password page
  async verifyResetToken() {
    return { message: 'success' };
  }
}
