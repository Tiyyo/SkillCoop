import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
/*eslint-disable */
import { EventGeoLocatorService } from '../../services/geoloc/nearest-events.js';
import { isString } from '../../utils/assert-primitve-type.js';
/*eslint-enable */
// Migrated
export async function getEventsByProximity(req: Request, res: Response) {
  // CheckParams only convert params to int
  // so can't used with latitude and longitude
  const { userCountry, userLongitude, userLatitude } = req.query;
  const [distance, profileId] = checkParams(
    req.query.distance,
    req.query.profileId,
  );
  // Assert function throw error if not a string
  isString(userCountry);
  isString(userLongitude);
  isString(userLatitude);

  const lat = parseFloat(userLatitude);
  const long = parseFloat(userLongitude);

  const events = await new EventGeoLocatorService({
    country: userCountry,
    centerLongitude: long,
    centerLatitude: lat,
    distance,
    profileId,
  }).getNearestEvents();

  res.status(200).json(events);
}
