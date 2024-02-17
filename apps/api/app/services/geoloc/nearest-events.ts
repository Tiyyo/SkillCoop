import UserInputError from '../../helpers/errors/user-input.error.js';
import { event as Event } from '../../models/index.js';
import { haversineDistance } from '../../utils/haversine-distance.js';

type EventLocation = {
  id: number;
  latitude: number;
  longitude: number;
  country: string;
};

type EventGeoLocatorServiceContructor = {
  country: string;
  centerLongitude: number;
  centerLatitude: number;
  distance?: number;
  profileId: number;
};

export class EventGeoLocatorService {
  country: string;
  distance: number = 50; // default distance in kilometers
  centerLongitude: number;
  centerLatitude: number;
  profileId: number;
  declare locations: EventLocation[];

  constructor({
    country,
    centerLongitude,
    centerLatitude,
    distance = 50,
    profileId,
  }: EventGeoLocatorServiceContructor) {
    this.country = country;
    this.distance = distance;
    this.centerLongitude = centerLongitude;
    this.centerLatitude = centerLatitude;
    this.profileId = profileId;
  }
  async getNearestEvents() {
    await this.getLocationByCountry();
    const eventIds = this.filterByDistance();
    if (!eventIds || eventIds.length === 0)
      throw new UserInputError('No events found');
    return this.aggregateEventIds(eventIds, this.profileId);
  }
  private async getLocationByCountry() {
    const locations = await Event.getEventLocationByCountry(this.country);
    if (!locations || locations.length === 0)
      throw new UserInputError("No events located in user's country");

    return (this.locations = locations);
  }
  private filterByDistance() {
    return this.locations
      .filter(
        (location) =>
          haversineDistance(
            this.centerLatitude,
            this.centerLongitude,
            location.latitude,
            location.longitude,
          ) <= this.distance,
      )
      .map((location) => location.id);
  }
  private aggregateEventIds(eventIds: number[], profileId: number) {
    const events = Event.getNearestEventsInfos(eventIds, profileId);
    return events;
  }
}
