import { event as Event } from '../models/index';
import { profileOnEvent as ProfileOnEvent } from '../models/index';
import { Request, Response } from 'express'
import AuthorizationError from '../helpers/errors/unauthorized.error'
import ServerError from '../helpers/errors/server.error'
import { cacheOrGetCacheData } from '../helpers/cache-data';
import logger from '../helpers/logger';
import redis from 'ioredis'
import checkParams from '../utils/check-params';

const redisClient = new redis()

export default {
  async getAll(req: Request, res: Response) {
    // get all events from the database

    const events = await cacheOrGetCacheData("events", async () => {
      try {
        const events = await Event.findAll()
        return events
      } catch (error) {
        logger.error(error)
      }
    })

    res.status(200).json(events)

  },
  async createOne(req: Request, res: Response) {
    // create one event
    // add organizer to the event
    // add organizer to the participant list to this event
    const {ids, ...data} = req.body

    const eventId = await Event.create(data)

    const result = ProfileOnEvent.create({ event_id: eventId, profile_id: data.organizer_id, status_name: "confirmed" })

    
    if (ids) {
    const participantsToInvite = ids.map((id) => {
      return  {
        profile_id : id ,
        event_id : eventId,
        status_name : 'pending'
      }
    }
    const instertedParticipant = await ProfileOnEvent.createMany(participantsToInvite)
    }
      
    res.status(201).json(result)
  },
  async getOne(req: Request, res: Response) {
    // get one event from the database

    const { id: event_id } = req.params

    const event = await cacheOrGetCacheData(`event${event_id}`, async () => {
      try {
        const event = await Event.findByPk(Number(event_id))
        return event

      } catch (error) {
        logger.error(error)
      }
    })

    res.status(200).json(event)
  },
  async updateOne(req: Request, res: Response) {
    // update one event
    // only the organize can update the event

    const { id: event_id, ...data } = req.body

    const isUpdate = await Event.update(event_id, data)

    await redisClient.del([`event${event_id}`, 'events'], (err, reply) => {
      if (err) throw new ServerError('Could not delete cache')
      logger.debug(`delete cache ${reply}`)
    })

    res.status(204).send(isUpdate)

  },
  async deleteOne(req: Request, res: Response) {
    // delete one event
    // only the organizer can delete the event

    const { id: event_id, profileId: profile_id } = req.params

    const event = await Event.findByPk(Number(event_id))

    if (event.length === 0) throw new ServerError("No event")

    if (event[0].organizer_id !== Number(profile_id)) throw new AuthorizationError("Operation not allowed")

    const result = await Event.delete(Number(event_id))

    await redisClient.del([`event${event_id}`, 'events'], (err, reply) => {
      if (err) throw new ServerError('Could not delete cache')
      logger.debug(`delete cache ${reply}`)
    })

    res.status(204).send(result + 'Succesfully deleted')

  },
  async getAllByUser(req: Request, res: Response) {
    const userId = checkParams(req.params.id)

    const events = await Event.getEventByUserId(userId)

    res.status(200).json(events)
  }
}
