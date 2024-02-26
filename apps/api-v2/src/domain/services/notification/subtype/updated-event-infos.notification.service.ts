import { Injectable } from '@nestjs/common';
import { NotificationPipelineService } from '../notification-pipeline.service';

@Injectable()
export class UpdatedEventInfosNotificationService {
  constructor(
    private readonly notificationPipelineService: NotificationPipelineService,
  ) { }
  notify(eventId: number) {
    return this.notificationPipelineService.notify({
      type: 'event',
      subtype: 'eventInfosHasBeenUpdated',
      eventId,
    });
  }
}
