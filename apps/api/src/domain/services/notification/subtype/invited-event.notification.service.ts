import { Injectable } from '@nestjs/common';
import { NotificationPipelineService } from '../notification-pipeline.service';

@Injectable()
export class InvitedEventNotificationService {
  constructor(
    private readonly notificationPipelineService: NotificationPipelineService,
  ) {}
  notify(eventId: number, profileIds: string[]) {
    if (!profileIds || !profileIds.length) {
      return;
    }
    profileIds.forEach((profileId) => {
      this.notificationPipelineService.notify({
        type: 'event',
        subtype: 'userHasBeenInvitedToEvent',
        eventId,
        profileId,
      });
    });
  }
}
