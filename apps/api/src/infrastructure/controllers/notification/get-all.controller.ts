import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { NotificationUsecases } from 'src/application/usecases/notification/notification.usecases';

@Controller('notification')
export class GetAllNotificationController {
  constructor(private readonly notificationUsecases: NotificationUsecases) {}

  @Get('/:profileId')
  @HttpCode(200)
  async getAll(@Param('profileId') profileId: string) {
    return await this.notificationUsecases.getLast(profileId);
  }
}
