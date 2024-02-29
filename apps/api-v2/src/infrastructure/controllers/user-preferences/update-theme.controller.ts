import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { UpdateThemeUserPreferencesDTO } from 'src/application/dto/update-theme-preference.dto';
import { UserPreferencesUsecases } from 'src/application/usecases/user-preferences/user-preferences.usecases';

@Controller('user-preferences')
export class UpdateThemeUserPreferencesController {
  constructor(
    private readonly userPreferencesUsecases: UserPreferencesUsecases,
  ) {}
  @Patch('/theme')
  @HttpCode(200)
  async updateLanguage(@Body() body: UpdateThemeUserPreferencesDTO) {
    console.log('body', body);
    return await this.userPreferencesUsecases.updateTheme(
      body.user_id,
      body.name,
    );
  }
}
