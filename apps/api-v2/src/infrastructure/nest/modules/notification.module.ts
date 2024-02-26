import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NotificationUsecases } from 'src/application/usecases/notification/notification.usecases';
import { NotificationReadManagerService } from 'src/domain/services/notification/notification-manager.service';
import { GetAllNotificationController } from 'src/infrastructure/controllers/notification/get-all.controller';
import { MarkAsReadNotificationController } from 'src/infrastructure/controllers/notification/mark-as-read.controller';
import { SubscriptionEventController } from 'src/infrastructure/controllers/notification/subscription.controller';
import { NotificationAdapter } from 'src/infrastructure/kysely/adapters/notification.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';
import { TestListener } from 'src/infrastructure/listeners/listeners';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';
import { JwtAdapterService } from 'src/infrastructure/service/jwt-token.adapter.service';

@Module({
  controllers: [
    MarkAsReadNotificationController,
    GetAllNotificationController,
    SubscriptionEventController,
  ],
  providers: [
    databaseProvider,
    NotificationUsecases,
    NotificationAdapter,
    NotificationReadManagerService,
    NestEnvVariableAdapterService,
    { provide: 'TokenService', useClass: JwtAdapterService },
    JwtService,
    TestListener,
  ],
})
export class NotificationModule { }
