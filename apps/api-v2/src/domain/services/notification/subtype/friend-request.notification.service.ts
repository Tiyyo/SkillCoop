import { Injectable } from '@nestjs/common';
import { NotificationPipelineService } from '../notification-pipeline.service';

@Injectable()
export class FriendRequestNotificationService {
  constructor(
    private readonly notificationPipelineService: NotificationPipelineService,
  ) { }
  notify(subscriberId: string, instigatorId: string) {
    return this.notificationPipelineService.notify({
      type: 'friend',
      subtype: 'userHasBeenAddedToFriendlist',
      instigatorId,
      profileId: subscriberId,
    });
  }
}
