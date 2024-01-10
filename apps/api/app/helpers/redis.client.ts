// import Redis from 'ioredis';
// import type { RedisOptions, Redis as IRedis } from 'ioredis';
// import logger from './logger.js';

// let redis: IRedis | null = null;
// const redisConfig: RedisOptions = {
//   port: 6379,
//   host: 'localhost',
//   autoResubscribe: false,
//   lazyConnect: true,
//   maxRetriesPerRequest: 0,
// };

// const getRedisInfos = () => {
//   if (!redis) return null;
//   const infos = redis?.info().then((res) => res);
//   return infos;
// };

// try {
//   redis = new Redis(redisConfig);
//   const infos = getRedisInfos();
//   logger.info(`Redis connected with: ${infos} client`);

// } catch (error) {
//   logger.error(`Redis connection error: ${error}`);
//   redis?.disconnect();

// } finally {
//   // if (redis) redis.disconnect();
// }

// export default redis;
