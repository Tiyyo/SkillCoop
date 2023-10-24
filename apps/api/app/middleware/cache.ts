import { NextFunction, Request, Response } from 'express';
import logger from '../helpers/logger.js';
import Cache from '../utils/cache.js';

// paramsKey should be used with pamameters in the route
export default (key: string, paramsKey?: string) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!key) next();
  let cacheKeyRef = key;
  if (paramsKey) cacheKeyRef = key + req.params[paramsKey];
  try {
    const cacheValue = await Cache.get(cacheKeyRef);
    req.body.cacheKey = cacheKeyRef;
    if (req.method === 'GET' && cacheValue) {
      return res.status(200).json({ message: 'cached data', data: cacheValue });
    }
    return next();
  } catch (error) {
    logger.error(error);
    return next();
  }
};
