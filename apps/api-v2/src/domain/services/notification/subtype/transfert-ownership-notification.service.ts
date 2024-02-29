import { Injectable } from '@nestjs/common';
import { NotificationPipelineService } from '../notification-pipeline.service';

@Injectable()
export class TransfetOwnershipNotificationService {
  constructor(
    private readonly notificationPipelineService: NotificationPipelineService,
  ) {}
  notify(eventId: number, instigatorId: string) {
    return this.notificationPipelineService.notify({
      type: 'event',
      subtype: 'transfertOwnership',
      instigatorId,
      eventId,
    });
  }
}
