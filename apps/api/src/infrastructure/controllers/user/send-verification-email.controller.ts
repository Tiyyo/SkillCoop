import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EmailDTO } from 'src/application/dto/email.dto';
import { SendVerificationEmailUserUsecases } from 'src/application/usecases/user/send-email-verified.user.usecases';

@Controller('user')
export class SendVerificationEmailUserController {
  constructor(
    private readonly sendVerificationEmailUsecases: SendVerificationEmailUserUsecases,
  ) {}
  @Post('email')
  @HttpCode(200)
  async sendVerificationEmail(@Body() body: EmailDTO) {
    await this.sendVerificationEmailUsecases.handle(body.email);
    return { message: 'A new confirmation email has been sent' };
  }
}
