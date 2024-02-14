import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
/*eslint-disable */
import { EventGeoLocatorService } from '../../services/geoloc/nearest-events.js';
/*eslint-enable */

export async function getEventsByProximity(req: Request, res: Response) {
  // CheckParams only convert params to int
  // so can't used with latitude and longitude
  const { userCountry, userLongitude, userLatitude } = req.query;
  const [distance] = checkParams(req.query.distance);
  // TODO assert query params as string

  const lat = parseFloat(userLatitude as string);
  const long = parseFloat(userLongitude as string);
  const country = typeof userCountry === 'string' ? userCountry : 'France ';

  const events = await new EventGeoLocatorService({
    country,
    centerLongitude: long,
    centerLatitude: lat,
    distance,
  }).getNearestEvents();

  res.status(200).json(events);
}
