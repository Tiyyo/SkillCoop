import { Module } from '@nestjs/common';
import { NotificationUsecases } from 'src/application/usecases/notification/notification.usecases';
import { NotificationReadManagerService } from 'src/domain/services/notification/notification-manager.service';
import { GetAllNotificationController } from 'src/infrastructure/controllers/notification/get-all.controller';
import { MarkAsReadNotificationController } from 'src/infrastructure/controllers/notification/mark-as-read.controller';
import { NotificationAdapter } from 'src/infrastructure/kysely/adapters/notification.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';

@Module({
  controllers: [MarkAsReadNotificationController, GetAllNotificationController],
  providers: [
    databaseProvider,
    NotificationUsecases,
    NotificationAdapter,
    NotificationReadManagerService,
  ],
})
export class NotificationModule { }
