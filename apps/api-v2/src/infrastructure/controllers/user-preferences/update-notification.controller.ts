import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { UpdateNotificationUserPreferencesDTO } from 'src/application/dto/update-notification-preference.dto';

import { UserPreferencesUsecases } from 'src/application/usecases/user-preferences/user-preferences.usecases';

@Controller('user-preferences')
export class UpdateNotificationUserPreferencesController {
  constructor(
    private readonly userPreferencesUsecases: UserPreferencesUsecases,
  ) { }
  @Patch('/notification')
  @HttpCode(200)
  async updateLanguage(@Body() body: UpdateNotificationUserPreferencesDTO) {
    return await this.userPreferencesUsecases.updateNotification(body);
  }
}
