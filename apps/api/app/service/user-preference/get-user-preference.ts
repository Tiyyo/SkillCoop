import { sql } from 'kysely';
import { db } from '../../helpers/client.db';
import type {
  UserPreference as TUserPreference,
  RawUserPreference,
  NotificationPreference,
} from 'skillcoop-types';

export class GetUserPreference {
  userId: number;
  db: typeof db;
  constructor(userId: number) {
    this.userId = userId;
    this.db = db;
  }
  async getUserPreference() {
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
      WHERE 'notification_preference'.'user_id' = 1
      GROUP BY 'notification_preference'.'user_id'
    `.execute(db);

    const userPreference: TUserPreference = {
      ...result.rows[0],
      prefered_notifications: JSON.parse(
        result.rows[0].prefered_notifications,
      ).map((notificationPreference: NotificationPreference) => ({
        ...notificationPreference,
        email: !!notificationPreference.email,
        push: !!notificationPreference.push,
        website: !!notificationPreference.website,
      })),
    };
    return userPreference;
  }
}
