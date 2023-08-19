import { Redis } from "ioredis"
import logger from '../../helpers/logger.ts';
import { ChatMessage } from "../../config/types.ts";

const redis = new Redis()

export const storeHistory = async (messageInfos: ChatMessage, historyKey: string) => {
    const DEFAULT_EXPIRATION = 2678400 // 1 month in seconds

    if (!redis.exists(historyKey)) {
        await redis.lpush(historyKey, JSON.stringify([messageInfos]), 'EX', DEFAULT_EXPIRATION)
        logger.info('New history cache created and message stored')
    } else {
        const length = await redis.llen(historyKey)
        if (length >= 200) {
            await redis.rpop(historyKey)
        }
        await redis.lpush(historyKey, JSON.stringify(messageInfos))
        logger.info('Message stored in history')
    }
}

export const getHistory = async (historyKey: string) => {
    // -1 to fetch all the list
    const history = await redis.lrange(historyKey, 0, -1)
    const jsonHistory = history.map((message) => JSON.parse(message))
    return jsonHistory
}
