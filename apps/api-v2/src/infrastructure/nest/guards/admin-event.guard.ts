import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';

@Injectable()
export class OrganizerEventGuard implements CanActivate {
  constructor(private readonly eventQueriesAdapter: EventQueriesAdapter) { }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // const response = context.switchToHttp().getResponse();

    const allPossibleStoreEventId =
      request.body.eventId ||
      request.body.event_id | request.query.eventId ||
      request.query.eventId ||
      request.query.event_id;

    const profileId =
      request.body.profileId ||
      request.query.profileId ||
      request.query.profile_id ||
      request.body.profile_id ||
      request.params.profileId ||
      request.params.profile_id;

    const eventId = Number(allPossibleStoreEventId);

    if (request.user.user_id !== profileId) {
      throw new ForbiddenException('Forbidden');
    }

    const event = await this.eventQueriesAdapter.getOneEvent(
      eventId,
      profileId,
    );
    if (event.organizer_id !== profileId) {
      throw new ForbiddenException('Forbidden');
    }
    return true;
  }
}
