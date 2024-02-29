import {
  EventAggr,
  EventFoundedNearby,
  EventLocation,
  LastSharedEvent,
} from '../entities/event.entity';

export abstract class EventQueriesRepository {
  abstract getOneEvent(eventId: number, profileId: string): Promise<EventAggr>;
  abstract getEvents(profileId: string): Promise<EventAggr[]>;
  abstract getOrganizerEventsPaginated(
    profileId: string,
    page: number,
  ): Promise<{ events: EventAggr[]; count: number }>;
  abstract getPastEventsPaginated(
    profileId: string,
    page: number,
  ): Promise<{ events: EventAggr[]; count: number }>;
  abstract getUpcomingEventsPaginated(
    profileId: string,
    page: number,
  ): Promise<{ events: EventAggr[]; count: number }>;
  // Not needed anymore
  // abstract getEventNotificationSubscribers(eventId: number): Promise<number[]>;
  abstract getLastSharedEvent(
    profileId: string,
    friendId: string,
  ): Promise<LastSharedEvent[]>;
  abstract getEventLocationByCountry(country: string): Promise<EventLocation[]>;
  abstract getNearestEventsInfos(
    eventIds: number[],
    profileId: string,
  ): Promise<EventFoundedNearby[]>;
  abstract getNbBonusPerProfile(
    city: string,
  ): Promise<{ nb_mvp_bonus: number; nb_best_striker_bonus: number }>;
  abstract getMvpCount(profileId: string): Promise<{
    nb_mvp: number;
  }>;
  abstract getBestStrikerCount(profileId: string): Promise<{
    nb_best_striker: number;
  }>;
}
