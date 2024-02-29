import { EventCoreEntity } from '../entities/event.entity';

export abstract class EventMutationsRepository {
  abstract create(data: Partial<EventCoreEntity>): Promise<{ id: number }>;
  abstract updateMvp(eventId: number): Promise<boolean>;
  abstract updateBestStriker(eventId: number): Promise<boolean>;
}
