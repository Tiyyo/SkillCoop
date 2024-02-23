import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { UpdatePasswordDTO } from 'src/application/dto/update-password.dto';
import { UpdatePasswordUserUsecases } from 'src/application/usecases/user/update-password.use.usecases';

@Controller('user')
export class UpdatePasswordUserController {
  constructor(
    private readonly updatePasswordUserUsecases: UpdatePasswordUserUsecases,
  ) { }

  @Patch('password')
  @HttpCode(200)
  async updatePassword(@Body() body: UpdatePasswordDTO) {
    return await this.updatePasswordUserUsecases.updatePassword(body);
  }
}
