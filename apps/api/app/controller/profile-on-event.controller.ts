import { cacheOrGetCacheData } from '../helpers/cache-data';
import UserInputError from '../helpers/errors/user-input.error';
import logger from '../helpers/logger';
import { profileOnEvent as ProfileOnEvent } from '../models/index';
import { event as Event } from '../models/index'
import { Request, Response } from 'express'
import redis from 'ioredis'
import ServerError from '../helpers/errors/server.error';

const redisClient = new redis()


export default {
  async getAllUserByEvent(req: Request, res: Response) {
    const { event_id } = req.params

    const participantList = await cacheOrGetCacheData("participants", async () => {
      try {
        const participantList = await ProfileOnEvent.findMany({ event_id })
        return participantList
      } catch (error) {
        logger.error(error)
      }
    })
    res.status(200).json(participantList)
  },
  async updateStatus(req: Request, res: Response) {
    const { profile_id, event_id, status_name } = req.body

    const isConfirmed = "confirmed"
    let userMessage = "Status has been updated"

    const data = { profile_id, event_id, status_name, updatedAt: undefined }

    await redisClient.del(["participants", `event${event_id}`], (err, reply) => {
      if (err) throw new ServerError('Could not delete cache')
      logger.debug(`delete cache ${reply}`)
    })

    if (status_name === "declined") {

      await ProfileOnEvent.updateStatus(data)
      return res.status(204).send('Status has been updated')
    }
    // check if the event is full

    const participants = await ProfileOnEvent.findMany({ event_id: data.event_id })

    const event = await Event.findByPk(data.event_id)

    let count = 0;

    participants.forEach((p) => {
      if (p.status_name === isConfirmed) {
        count += 1
      }
    })

    // check type number before strict equality

    if (Number(event[0].required_particpants) === Number(count)) throw new UserInputError('Event is already full')


    const confirmed = await ProfileOnEvent.updateStatus(data)

    if (Number(event[0].required_particpants) === Number(count) + 1) {

      userMessage = "Teams has been generated "
      logger.debug('Team has been generated')
    }

    logger.debug("status has been upload")
    // launch generation team service
    // generation team if needed

    // TODO check if we are actually casting a boolean
    res.status(201).json(userMessage)

  },
  async sendInvitationToEvent(req: Request, res: Response) {
    const { profile_id, event_id } = req.body
    const data = { profile_id, event_id, status_name: "pending" }

    await redisClient.del("participants", (err, reply) => {
      if (err) throw new ServerError('Could not delete cache')
      logger.debug(`delete cache ${reply}`)
    })

    const isSend = ProfileOnEvent.create(data)

    res.status(201).send(isSend)

  },
}