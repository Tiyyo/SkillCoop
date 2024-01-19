import { Injectable } from '@nestjs/common';
import { EventQueuePublisher } from '@skillcoop/types';
import { EventSyncService } from 'src/data-sync/event-sync.service';

@Injectable()
export class EventQueueDispatcher {
  constructor(private eventSyncService: EventSyncService) { }

  async dispatch(data: EventQueuePublisher) {
    switch (data.action) {
      case 'create_event':
        return this.eventSyncService.create(data);
      case 'delete_event':
        return this.eventSyncService.delete(data);
    }
  }
}
