// import { Redis } from 'ioredis';
import redis from '../helpers/redis.client';
import { ObjectRecordGeneric } from '../@types/types';
import ServerError from '../helpers/errors/server.error';

// const redis = new Redis();

export default class Cache {
  static DEFAULT_EXPIRATION = 300; // 5 minutes

  static async get(key: string) {
    if (!redis) throw new Error('Redis connection error');
    try {
      const cacheValue = await redis.get(key);
      return cacheValue ? JSON.parse(cacheValue) : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new ServerError(error.message);
      }
    }
  }

  // static async set(
  //   key: string,
  //   data: ObjectRecordGeneric | Array<ObjectRecordGeneric>,
  //   expiration: number = Cache.DEFAULT_EXPIRATION,
  // ) {
  //   if (!redis) throw new Error('Redis connection error');
  //   redis.set(key, JSON.stringify(data), 'EX', expiration);
  // }

  // static async del(keys: string[]) {
  //   if (!redis) throw new Error('Redis connection error');
  //   await redis.del(...keys);
  // }
}
