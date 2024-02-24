import { Injectable } from '@nestjs/common';
import { NotificationPreferenceService } from './notification-preference.service';
import { LanguagePreferenceService } from './language-preference.service';
import { ThemePreferenceService } from './theme-preference.service';
import { UserPreferencesAdapter } from 'src/infrastructure/kysely/adapters/user-preferences.adapter';

@Injectable()
export class UserPreferencesService {
  constructor(
    private readonly notificationPreferenceService: NotificationPreferenceService,
    private readonly languagePreferenceService: LanguagePreferenceService,
    private readonly themePreferenceService: ThemePreferenceService,
    private readonly userPreferencesAdapter: UserPreferencesAdapter,
  ) { }

  async get(id: string) {
    return await this.userPreferencesAdapter.get(id);
  }
  async generate(userId: string) {
    Promise.all([
      this.notificationPreferenceService.generate(userId),
      this.languagePreferenceService.generate(userId),
      this.themePreferenceService.generate(userId),
    ]);
  }
}
