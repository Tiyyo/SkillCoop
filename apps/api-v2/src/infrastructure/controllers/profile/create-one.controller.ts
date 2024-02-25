import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfileDTO } from 'src/application/dto/create-profile.dto';
import { ProfileUsecases } from 'src/application/usecases/profile/profile.usecases';

@Controller('profile')
export class CreateOneProfileController {
  constructor(private readonly profileUsecases: ProfileUsecases) { }
  @Post()
  async createOne(@Body() body: CreateProfileDTO) {
    const profile = await this.profileUsecases.createOne(body);
    return profile;
  }
}
