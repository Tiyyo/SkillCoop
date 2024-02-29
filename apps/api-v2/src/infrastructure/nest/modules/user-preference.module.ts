import { Module } from '@nestjs/common';
import { UserPreferencesUsecases } from 'src/application/usecases/user-preferences/user-preferences.usecases';
import { LanguagePreferenceService } from 'src/domain/services/user-prefrerences/language-preference.service';
import { NotificationPreferenceService } from 'src/domain/services/user-prefrerences/notification-preference.service';
import { ThemePreferenceService } from 'src/domain/services/user-prefrerences/theme-preference.service';
import { UserPreferencesService } from 'src/domain/services/user-prefrerences/user-preferences.service';
import { GetUserPreferencesController } from 'src/infrastructure/controllers/user-preferences/get.controller';
import { UpdateLanguageUserPreferencesController } from 'src/infrastructure/controllers/user-preferences/update-language.controller';
import { UpdateNotificationUserPreferencesController } from 'src/infrastructure/controllers/user-preferences/update-notification.controller';
import { UpdateThemeUserPreferencesController } from 'src/infrastructure/controllers/user-preferences/update-theme.controller';
import { LanguagePreferenceAdapter } from 'src/infrastructure/kysely/adapters/language-preference.adapter';
import { NotificationPreferenceAdapter } from 'src/infrastructure/kysely/adapters/notification-preference.adapter';
import { NotificationTypeAdapter } from 'src/infrastructure/kysely/adapters/notification-type.adapter';
import { ThemePreferenceAdapter } from 'src/infrastructure/kysely/adapters/theme-preference.adapter';
import { UserPreferencesAdapter } from 'src/infrastructure/kysely/adapters/user-preferences.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';

@Module({
  controllers: [
    GetUserPreferencesController,
    UpdateThemeUserPreferencesController,
    UpdateNotificationUserPreferencesController,
    UpdateLanguageUserPreferencesController,
  ],
  providers: [
    databaseProvider,
    UserPreferencesUsecases,
    LanguagePreferenceAdapter,
    ThemePreferenceAdapter,
    NotificationPreferenceAdapter,
    NotificationTypeAdapter,
    UserPreferencesAdapter,
    UserPreferencesService,
    NotificationPreferenceService,
    LanguagePreferenceService,
    ThemePreferenceService,
  ],
})
export class UserPreferencesModule {}
