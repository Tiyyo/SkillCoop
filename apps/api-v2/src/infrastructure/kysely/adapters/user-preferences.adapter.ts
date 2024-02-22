import { Inject, Injectable } from '@nestjs/common';
import { Kysely, sql } from 'kysely';
import { UserPreferencesRepository } from 'src/domain/repositories/user-preferences.repository';
import { DB } from '../database.type';
import { UserPreferences } from 'src/domain/entities/user-preferences.entity';
import { transformNumberToBooleanInObject } from 'src/infrastructure/utils/bool-to-int';

type RawNotificationType = {
  type_name: string;
  email: number;
  push: number;
  website: number;
};

type RawUserPreference = Omit<UserPreferences, 'prefered_notifications'> & {
  prefered_notifications: RawNotificationType[];
};

@Injectable()
export class UserPreferencesAdapter implements UserPreferencesRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) { }
  async get(userId: string) {
    const result = await sql<RawUserPreference>`
      SELECT 
        json_group_array(json_object
        (
         'type_name', type_name, 
         'email', email, 
         'push' , push, 
         'website', website )
        ) AS 'prefered_notifications',
        theme_preference.name AS 'prefered_theme',
        language_preference.name AS 'prefered_language'
      FROM 'notification_preference' 
      LEFT JOIN 'theme_preference' 
        ON 'theme_preference'.'user_id' = 'notification_preference'.'user_id'
      LEFT JOIN 'language_preference'
        ON 'language_preference'.'user_id' = 'notification_preference'.'user_id'
      WHERE 'notification_preference'.'user_id' = ${userId}
      GROUP BY 'notification_preference'.'user_id'
    `.execute(this.dbClient);

    const userPreferences = {
      ...result.rows[0],
      prefered_notifications: result.rows[0].prefered_notifications.map(
        (notificationType) =>
          transformNumberToBooleanInObject(notificationType),
      ),
    };

    return userPreferences as UserPreferences;
  }
}
