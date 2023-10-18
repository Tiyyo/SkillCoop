import { cacheOrGetCacheData } from '../helpers/cache-data';
import UserInputError from '../helpers/errors/user-input.error';
import logger from '../helpers/logger';
import { profileOnEvent as ProfileOnEvent } from '../models/index';
import { event as Event } from '../models/index'
import { Request, Response } from 'express'
import redis from 'ioredis'
import ServerError from '../helpers/errors/server.error';
import { invitationStatus } from '../@types/types';
import { generateBalancedTeam } from '../service/generate-teams';
import deleteDecodedKey from '../utils/delete-decoded';
import checkParams from '../utils/check-params';

const redisClient = new redis()


export default {
  // async getAllUserByEvent(req: Request, res: Response) {
  //   const [event_id] = checkParams(req.params.event_id)

  //   const participantList = await cacheOrGetCacheData("participants", async () => {
  //     try {
  //       const participantList = await ProfileOnEvent.findBy({ event_id })
  //       return participantList
  //     } catch (error) {
  //       logger.error(error)
  //     }
  //   })
  //   res.status(200).json(participantList)
  // },
  async updateStatus(req: Request, res: Response) {
    deleteDecodedKey(req.body)

    const { profile_id, event_id, status_name } = req.body
    let userMessage = "Status has been updated"

    const data = { profile_id, event_id, status_name, updated_at: undefined }

    if (status_name === "declined") {
      await ProfileOnEvent.updateStatus(data)

      return res.status(200).send(userMessage)
    }

    // check if the event is full
    const confirmedParticipants = await ProfileOnEvent.findBy({ event_id: data.event_id, status_name: invitationStatus.confirmed })
    const event = await Event.findByPk(data.event_id)

    if (event.required_participants <= confirmedParticipants.length) throw new UserInputError('Event is already full')

    await ProfileOnEvent.updateStatus(data)


    if (event.required_participants === confirmedParticipants.length + 1) {
      await Event.update(event.id, { status_name: "full" })
      await generateBalancedTeam(event.id)
      userMessage = "Teams has been generated "
    }

    res.status(200).json(userMessage)

  },
  async sendInvitationToEvent(req: Request, res: Response) {
    deleteDecodedKey(req.body)

    const { ids, event_id } = req.body
    const data = ids.map((id: number) => ({ profile_id: id, event_id, status_name: "pending" }))

    const isCreated = await ProfileOnEvent.createMany(data)

    res.status(201).send({ success: isCreated })

  },
}