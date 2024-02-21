import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EmailDTO } from 'src/application/dto/email.dto';
import { ForgotPasswordUserUsecases } from 'src/application/usecases/user/forgot-password.user.usecases';

@Controller('user')
export class ForgotPasswordUserController {
  constructor(
    private readonly forgotPasswordUserUsecases: ForgotPasswordUserUsecases,
  ) { }
  @Post('/forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() body: EmailDTO) {
    await this.forgotPasswordUserUsecases.handle(body.email);
    return { message: 'If you have a valid account an email has been sent' };
  }
}
