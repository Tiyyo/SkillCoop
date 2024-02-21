import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/application/dto/create-user.dto';
import { RegisterUserUsecases } from 'src/application/usecases/user/register.user.usecases';

@Controller('auth')
export class RegisterUserController {
  constructor(private readonly userUsecases: RegisterUserUsecases) { }
  @Post('register')
  async createOne(@Body() body: CreateUserDTO) {
    const profile = await this.userUsecases.createUser(body);
    return profile;
  }
}
