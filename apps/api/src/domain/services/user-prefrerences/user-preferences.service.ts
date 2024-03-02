import { Injectable } from '@nestjs/common';
import { NotificationPreferenceService } from './notification-preference.service';
import { LanguagePreferenceService } from './language-preference.service';
import { ThemePreferenceService } from './theme-preference.service';
import { UserPreferencesAdapter } from 'src/infrastructure/kysely/adapters/user-preferences.adapter';
import { UserPreferences } from 'src/domain/entities/user-preferences.entity';
import { ApplicationException } from 'src/application/exceptions/application.exception';

@Injectable()
export class UserPreferencesService {
  constructor(
    private readonly notificationPreferenceService: NotificationPreferenceService,
    private readonly languagePreferenceService: LanguagePreferenceService,
    private readonly themePreferenceService: ThemePreferenceService,
    private readonly userPreferencesAdapter: UserPreferencesAdapter,
  ) { }
  async get(id: string) {
    let preferences: UserPreferences;
    try {
      preferences = await this.userPreferencesAdapter.get(id);
      if (preferences) return preferences;
    } catch (error) {
      throw new ApplicationException(
        'Error while getting user preferences',
        'UserPreferencesService',
      );
    }
    if (!preferences) {
      await this.generate(id);
      preferences = await this.userPreferencesAdapter.get(id);
      return preferences;
    }
  }
  async generate(userId: string) {
    Promise.allSettled([
      this.notificationPreferenceService.generate(userId),
      this.languagePreferenceService.generate(userId),
      this.themePreferenceService.generate(userId),
    ]);
  }
}
