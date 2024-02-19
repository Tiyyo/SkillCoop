import { Controller, Get, Param } from '@nestjs/common';
import { ProfileUsecases } from 'src/application/usecases/profile.usecases';

@Controller('profile')
export class GetOneProfileController {
  constructor(private readonly profileUsecases: ProfileUsecases) { }
  @Get('/:id')
  async getOne(@Param('id') id: string) {
    const profileId = Number(id);
    console.log('Get One Profile is called', profileId);
    const profile = await this.profileUsecases.getOne(profileId);
    return profile;
  }
}
