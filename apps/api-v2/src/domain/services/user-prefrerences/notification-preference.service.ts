import { Injectable } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { DomainException } from 'src/domain/shared/domain-exception';
import { NotificationPreferenceAdapter } from 'src/infrastructure/kysely/adapters/notification-preference.adapter';
import { NotificationTypeAdapter } from 'src/infrastructure/kysely/adapters/notification-type.adapter';

@Injectable()
export class NotificationPreferenceService {
  constructor(
    private readonly notificationPreferenceAdapter: NotificationPreferenceAdapter,
    private readonly notificationTypeAdapter: NotificationTypeAdapter,
  ) {}
  async generate(userId: string) {
    const notificationTypes = await this.notificationTypeAdapter.findAll();
    if (!notificationTypes) {
      throw new DomainException(
        'No notification types found',
        'NotificationPreferenceService',
      );
    }
    const notificationTypesObject = notificationTypes.map((type) => ({
      ...type,
      name: type.name,
    }));

    const notificationTypesReducedList = notificationTypesObject.reduce(
      (acc, curr) => {
        acc.push(curr.name);
        return acc;
      },
      [],
    );

    const notificationPreferenceQueries = notificationTypesReducedList.map(
      (type) =>
        this.notificationPreferenceAdapter.createOne({
          user_id: userId,
          type_name: type,
        }),
    );

    return await Promise.all(notificationPreferenceQueries).catch((err) => {
      throw new ApplicationException(
        'Error creating notification preferences : ' + err.message,
        'NotificationPreferenceService',
      );
    });
  }
  // Return transport for subscribe notification type
  async get(userId: string, type?: string | string[]) {
    const notificationPreferences =
      await this.notificationPreferenceAdapter.find(userId);

    const transports = notificationPreferences.map((n) => {
      const transport = Object.entries(n).map(([key, value]) => {
        if (typeof value !== 'boolean' || !value) return n.type_name;
        return key;
      });
      const unique = [...new Set(transport)];
      return unique;
    });

    return transports.filter((t) => (type ? type.includes(t[0]) : true));
  }
}
