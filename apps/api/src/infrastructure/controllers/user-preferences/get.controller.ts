import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { UserPreferencesUsecases } from 'src/application/usecases/user-preferences/user-preferences.usecases';

@Controller('user-preferences')
export class GetUserPreferencesController {
  constructor(
    private readonly userPreferencesUsecases: UserPreferencesUsecases,
  ) {}

  @Get('/:profileId')
  @HttpCode(200)
  async get(@Param('profileId') id: string) {
    return await this.userPreferencesUsecases.get(id);
  }
}
