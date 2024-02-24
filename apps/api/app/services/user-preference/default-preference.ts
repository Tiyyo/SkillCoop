import type { NotificationType as TNotificationTypes } from '@skillcoop/types';
import DatabaseError from '../../helpers/errors/database.error.js';
import ServerError from '../../helpers/errors/server.error.js';
import {
  themePreference as ThemePreference,
  languagePreference as LanguagePreference,
  notificationPreference as NotificationPreference,
  notificationType as NotificationType,
} from '../../models/index.js';

/*eslint-disable max-len*/

/*eslint-enable max-len*/
//Migrated
export class DefaultUserPreference {
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
  async generateDefaultPreferences() {
    await this.generateDefaultThemePreference();
    await this.generateDefaultLanguagePreference();
    await this.generateDefaultNotificationPreference();
  }
  async generateDefaultThemePreference() {
    await ThemePreference.createOne({
      user_id: this.userId,
      created_at: '',
    }).catch((err) => {
      if (err instanceof DatabaseError) {
        throw new ServerError(
          'Theme preference creation failed',
          'UserPreference',
        );
      }
    });
  }
  async generateDefaultLanguagePreference() {
    await LanguagePreference.createOne({
      user_id: this.userId,
      created_at: '',
    }).catch((err) => {
      if (err instanceof DatabaseError) {
        throw new ServerError(
          'Language preference creation failed',
          'UserPreference',
        );
      }
    });
  }
  async generateDefaultNotificationPreference() {
    const notificationTypes = await NotificationType.findAll().catch(() => {
      throw new ServerError(
        'Error extracting notification type from database',
        'DefaultUserPreference',
      );
    });
    if (!notificationTypes)
      throw new ServerError(
        'No notification types found',
        'DefaultUserPreference',
      );

    const inferredNotificationTypesOnName = notificationTypes.map((type) => ({
      ...type,
      name: type.name as TNotificationTypes,
    }));

    const notificationTypesReduced = inferredNotificationTypesOnName.reduce(
      (acc: TNotificationTypes[], curr) => {
        acc.push(curr.name);
        return acc;
      },
      [],
    );

    const queries = notificationTypesReduced.map((type) => {
      return NotificationPreference.createOne({
        user_id: this.userId,
        type_name: type,
        created_at: '',
      });
    });
    await Promise.all(queries).catch((err) => {
      if (err instanceof DatabaseError) {
        throw new ServerError(
          'Notification preference creation failed',
          'UserPreference',
        );
      }
    });
  }
}
