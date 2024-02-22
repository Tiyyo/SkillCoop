import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { UpdateLanguageUserPreferencesDTO } from 'src/application/dto/update-language-preference.dto';
import { UserPreferencesUsecases } from 'src/application/usecases/user-preferences/user-preferences.usecases';

@Controller('user-preferences')
export class UpdateLanguageUserPreferences {
  constructor(
    private readonly userPreferencesUsecases: UserPreferencesUsecases,
  ) { }
  @Patch('/language')
  @HttpCode(200)
  async updateLanguage(@Body() body: UpdateLanguageUserPreferencesDTO) {
    return await this.userPreferencesUsecases.updateLanguage(
      body.user_id,
      body.name,
    );
  }
}
