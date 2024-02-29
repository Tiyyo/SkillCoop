import { Injectable } from '@nestjs/common';
import { GetLastSharedDTO } from 'src/application/dto/get-last-shared.dto';
import { GetEventNearbyDTO } from 'src/application/dto/get-near-event.dto';
import { GetPaginatedEventDTO } from 'src/application/dto/get-paginated-event.dto';
import { RessourceNotFoundException } from 'src/application/exceptions/ressource-not-found.exception';
import { haversineDistance } from 'src/domain/services/haversine-formula';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';

@Injectable()
export class EventQueriesUsecases {
  constructor(private readonly eventQueriesAdapter: EventQueriesAdapter) {}
  async getOne(eventId: number, profiledId: string) {
    return await this.eventQueriesAdapter.getOneEvent(eventId, profiledId);
  }
  async getAll(profileId: string) {
    return await this.eventQueriesAdapter.getEvents(profileId);
  }
  async getOrganize(query: GetPaginatedEventDTO) {
    return await this.eventQueriesAdapter.getOrganizerEventsPaginated(
      query.profileId,
      query.page,
    );
  }
  async getPasts(query: GetPaginatedEventDTO) {
    return await this.eventQueriesAdapter.getPastEventsPaginated(
      query.profileId,
      query.page,
    );
  }
  async getUpcoming(query: GetPaginatedEventDTO) {
    return await this.eventQueriesAdapter.getUpcomingEventsPaginated(
      query.profileId,
      query.page,
    );
  }
  async getLastShared(data: GetLastSharedDTO) {
    return await this.eventQueriesAdapter.getLastSharedEvent(
      data.profileId,
      data.friendId,
    );
  }
  async getNearby(data: GetEventNearbyDTO) {
    const locations = await this.eventQueriesAdapter.getEventLocationByCountry(
      data.userCountry,
    );
    if (!locations || locations.length === 0) {
      throw new RessourceNotFoundException(
        'Not event found in this country',
        'EventQueriesUsecases',
      );
    }
    const eventIds = locations
      .filter(
        (location) =>
          haversineDistance(
            data.userLatitude,
            data.userLongitude,
            location.latitude,
            location.longitude,
          ) <= data.distance,
      )
      .map((location) => location.id);

    const events = await this.eventQueriesAdapter.getNearestEventsInfos(
      eventIds,
      data.profileId,
    );
    return events;
  }
}
