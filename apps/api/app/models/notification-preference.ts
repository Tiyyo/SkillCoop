import { TableNames } from '../@types/database';
import { Core } from './core';
import { db } from '../helpers/client.db';
import DatabaseError from '../helpers/errors/database.error';
import { NotificationType } from 'skillcoop-types';
import { getFormattedUTCTimestamp } from 'date-handler';

type UpdateNotificationPreferenceObject = {
  user_id: number;
  type_name: NotificationType;
  email?: boolean;
  push?: boolean;
  website?: boolean;
};

type TransportMethods = {
  email?: number;
  push?: number;
  website?: number;
};

type UpdateNotificationPayload = TransportMethods & {
  updated_at?: string;
};

export class NotificationPreference extends Core {
  tableName: TableNames;

  constructor(client: typeof db) {
    super(client);
    this.tableName = 'notification_preference';
  }
  async updatePreference(updateObject: UpdateNotificationPreferenceObject) {
    const { user_id, type_name, ...methods } = updateObject;
    const todayUTCString = getFormattedUTCTimestamp();
    const updatePayload: UpdateNotificationPayload = {};

    Object.keys(methods).forEach((key) => {
      updatePayload[key as keyof TransportMethods] = methods[
        key as keyof typeof methods
      ]
        ? 1
        : 0;
    });
    updatePayload.updated_at = todayUTCString;

    try {
      const [result] = await this.client
        .updateTable(this.tableName)
        .set(updatePayload)
        .where('user_id', '=', user_id)
        .where('type_name', '=', type_name)
        .execute();

      return !!Number(result.numUpdatedRows);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
