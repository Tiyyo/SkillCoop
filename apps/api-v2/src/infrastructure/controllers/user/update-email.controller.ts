import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { UpdateEmailDTO } from 'src/application/dto/update-email.dto';
import { UpdateEmailUserUsecases } from 'src/application/usecases/user/update-email.user.usecases';

@Controller('user')
export class UpdateEmailUserController {
  constructor(
    private readonly updateEmailUserUsecases: UpdateEmailUserUsecases,
  ) { }

  @Patch('email')
  @HttpCode(200)
  async updateEmail(@Body() body: UpdateEmailDTO) {
    const hasBeenUpdated = await this.updateEmailUserUsecases.updateEmail(body);
    return {
      success: hasBeenUpdated,
      new_email: hasBeenUpdated ? body.email : null,
    };
  }
}
