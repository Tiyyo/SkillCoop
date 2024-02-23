import { Body, Controller, Patch } from '@nestjs/common';
import { UpdateProfileDTO } from 'src/application/dto/update-profile.dto';
import { ProfileUsecases } from 'src/application/usecases/profile/profile.usecases';

@Controller('profile')
export class UpdateOneProfileController {
  constructor(private readonly profileUsecases: ProfileUsecases) { }
  @Patch()
  async createOne(@Body() body: UpdateProfileDTO) {
    const profile = await this.profileUsecases.updateOne(body);
    return profile;
  }
}
