import { Controller, Get, Param } from '@nestjs/common';
import { ProfileUsecases } from 'src/application/usecases/profile.usecases';

@Controller('profile')
export class GetOneProfileController {
  constructor(private readonly profileUsecases: ProfileUsecases) { }
  @Get('/:id')
  async getOne(@Param('id') id: string) {
    console.log('Get One Profile is called', id);
    const profile = await this.profileUsecases.getOne(id);
    return profile;
  }
}
