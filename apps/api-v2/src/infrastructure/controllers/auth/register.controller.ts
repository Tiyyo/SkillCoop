import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/application/dto/create-user.dto';
import { RegisterUserUsecases } from 'src/application/usecases/user/register.user.usecases';

@Controller('auth')
export class RegisterUserController {
  constructor(private readonly userUsecases: RegisterUserUsecases) { }
  @Post('register')
  async register(@Body() body: CreateUserDTO) {
    console.log('register user is called');
    const response = await this.userUsecases.createUser(body);
    return response;
  }
}
