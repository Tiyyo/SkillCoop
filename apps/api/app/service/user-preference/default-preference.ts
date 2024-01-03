import type { NotificationType as TNotificationTypes } from 'skillcoop-types';
import { themePreference as ThemePreference } from '../../models/index';
import { languagePreference as LanguagePreference } from '../../models/index';
/*eslint-disable max-len*/
import { notificationPreference as NotificationPreference } from '../../models/index';
import { notificationType as NotificationType } from '../../models/index';
import ServerError from '../../helpers/errors/server.error';
import DatabaseError from '../../helpers/errors/database.error';
import logger from '../../helpers/logger';
/*eslint-enable max-len*/

type NotificationTypeDB = {
  name: TNotificationTypes;
  created_at: string;
  updated_at: string;
};

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
    await ThemePreference.create({ user_id: this.userId }).catch((err) => {
      if (err instanceof DatabaseError) {
        throw new ServerError(
          'Theme preference creation failed',
          'UserPreference',
        );
      }
    });
  }
  async generateDefaultLanguagePreference() {
    await LanguagePreference.create({ user_id: this.userId }).catch((err) => {
      if (err instanceof DatabaseError) {
        throw new ServerError(
          'Language preference creation failed',
          'UserPreference',
        );
      }
    });
  }
  async generateDefaultNotificationPreference() {
    const notificationTypes = await NotificationType.findAll().catch((err) => {
      logger.error(err.message);
      throw new ServerError(
        'Error extracting notification type from database',
        'DefaultUserPreference',
      );
    });

    const notificationTypesReduced = notificationTypes.reduce(
      (acc: string[], curr: NotificationTypeDB) => {
        acc.push(curr.name);
        return acc;
      },
      [],
    ) as TNotificationTypes[];

    const queries = notificationTypesReduced.map((type) => {
      return NotificationPreference.create({
        user_id: this.userId,
        type_name: type,
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
