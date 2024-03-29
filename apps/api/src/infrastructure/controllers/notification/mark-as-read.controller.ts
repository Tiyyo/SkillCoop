import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { MarkNotificationDTO } from 'src/application/dto/mark-notification.dto';
import { NotificationUsecases } from 'src/application/usecases/notification/notification.usecases';

@Controller('notification')
export class MarkAsReadNotificationController {
  constructor(private readonly notificationUsecases: NotificationUsecases) { }

  @Patch()
  @HttpCode(200)
  async markAsRead(@Body() body: MarkNotificationDTO) {
    await this.notificationUsecases.markAsRead(body.notificationId);
    return { success: true };
  }
}
