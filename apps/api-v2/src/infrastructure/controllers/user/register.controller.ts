import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/application/dto/create-user.dto';
import { UserUsecases } from 'src/application/usecases/user.usecases';

@Controller('auth')
export class RegisterUserController {
  constructor(private readonly userUsecases: UserUsecases) { }
  @Post('register')
  async createOne(@Body() body: CreateUserDTO) {
    const profile = await this.userUsecases.createUser(body);
    return profile;
  }
}
