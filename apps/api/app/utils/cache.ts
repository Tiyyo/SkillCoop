import { Redis } from 'ioredis';
import { ObjectRecordGeneric } from '../@types/types';

const redis = new Redis();

export default class Cache {
  static DEFAULT_EXPIRATION = 300; // 5 minutes

  static async get(key: string) {
    const cacheValue = await redis.get(key);
    return cacheValue ? JSON.parse(cacheValue) : null;
  }

  static async set(
    key: string,
    data: ObjectRecordGeneric | Array<ObjectRecordGeneric>,
    expiration: number = Cache.DEFAULT_EXPIRATION,
  ) {
    redis.set(key, JSON.stringify(data), 'EX', expiration);
  }

  static async del(keys: string[]) {
    await redis.del(...keys);
  }
}
