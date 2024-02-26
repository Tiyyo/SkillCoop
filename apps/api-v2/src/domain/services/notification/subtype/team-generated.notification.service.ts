import { Injectable } from '@nestjs/common';
import { NotificationPipelineService } from '../notification-pipeline.service';

@Injectable()
export class TeamGeneratedNotificationService {
  constructor(
    private readonly notificationPipelineService: NotificationPipelineService,
  ) { }
  notify(eventId: number) {
    return this.notificationPipelineService.notify({
      type: 'event',
      subtype: 'teamHasBeenGenerated',
      eventId,
    });
  }
}
