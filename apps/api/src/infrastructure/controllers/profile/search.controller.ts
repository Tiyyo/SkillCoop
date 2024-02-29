import { Controller, Get, Query } from '@nestjs/common';
import { SearchProfileDTO } from 'src/application/dto/search-profile.dto';
import { ProfileUsecases } from 'src/application/usecases/profile/profile.usecases';

@Controller('profile')
export class SearchProfileController {
  constructor(private readonly profileUsecases: ProfileUsecases) {}
  @Get('/search/one')
  async getOne(@Query() queryParams: SearchProfileDTO) {
    const profile = await this.profileUsecases.search(queryParams);
    return profile;
  }
}
