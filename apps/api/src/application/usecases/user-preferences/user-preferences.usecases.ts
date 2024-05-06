import { Injectable } from '@nestjs/common';
import { UpdateNotificationUserPreferencesDTO } from 'src/application/dto/update-notification-preference.dto';
import { UserPreferences } from 'src/domain/entities/user-preferences.entity';
import { UserPreferencesService } from 'src/domain/services/user-prefrerences/user-preferences.service';
import { LanguagePreferenceAdapter } from 'src/infrastructure/kysely/adapters/language-preference.adapter';
import { NotificationPreferenceAdapter } from 'src/infrastructure/kysely/adapters/notification-preference.adapter';
import { ThemePreferenceAdapter } from 'src/infrastructure/kysely/adapters/theme-preference.adapter';

@Injectable()
export class UserPreferencesUsecases {
  constructor(
    private readonly themePreferenceAdapter: ThemePreferenceAdapter,
    private readonly languagePreferenceAdapter: LanguagePreferenceAdapter,
    private readonly notificationPreferenceAdapter: NotificationPreferenceAdapter,
    private readonly userPreferencesService: UserPreferencesService,
  ) { }

  async updateTheme(userId: string, name: 'light' | 'dark') {
    return await this.themePreferenceAdapter.updateOne(
      { user_id: userId },
      { name },
    );
  }
  async updateLanguage(userId: string, name: string) {
    return await this.languagePreferenceAdapter.updateOne(
      {
        user_id: userId,
      },
      { name: name },
    );
  }
  async updateNotification(
    update: UpdateNotificationUserPreferencesDTO, // replace by DTO
  ) {
    const { user_id, type_name, email, push, website } = update;
    return await this.notificationPreferenceAdapter.updateOne(
      { user_id, type_name },
      {
        email: email as unknown as number,
        push: push as unknown as number,
        website: website as unknown as number,
      },
    );
  }
  async get(userId: string) {
    let userPreferences: UserPreferences;
    userPreferences = await this.userPreferencesService.get(userId);
    if (!userPreferences) {
      await this.userPreferencesService.generate(userId);
      userPreferences = await this.userPreferencesService.get(userId);
      return null;
    }
    return userPreferences;
  }
}
