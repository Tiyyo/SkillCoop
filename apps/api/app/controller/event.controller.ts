import { event as Event } from '../models/index';
import { profileOnEvent as ProfileOnEvent } from '../models/index';
import { Request, Response } from 'express'
import AuthorizationError from '../helpers/errors/unauthorized.error'
import checkParams from '../utils/check-params';
import NotFoundError from '../helpers/errors/not-found.error';
import deleteDecodedKey from '../utils/delete-decoded';


export default {
  async createOne(req: Request, res: Response) {
    // create one event
    // add organizer to the event
    // add organizer to the participant list to this event
    deleteDecodedKey(req.body)
    const { ids, ...data } = req.body
    console.log(data);
    const eventId = await Event.create(data)
    const result = ProfileOnEvent.create({ event_id: eventId, profile_id: data.organizer_id, status_name: "confirmed" })

    if (ids) {
      const participantsToInvite = ids.map((id: number) => {
        return {
          profile_id: id,
          event_id: eventId,
          status_name: 'pending'
        }
      })
      await ProfileOnEvent.createMany(participantsToInvite)
    }

    res.status(201).json(result)
  },
  async getOne(req: Request, res: Response) {
    const eventId = checkParams(req.params.eventId)
    const profileId = checkParams(req.params.profileId)

    const event = await Event.getEventById(eventId, profileId)

    res.status(200).json(event)
  },
  async updateOne(req: Request, res: Response) {
    // update one event
    // only the organize can update the event
    const { event_id, profile_id, ...data } = req.body

    const event = await Event.findByPk(event_id)
    if (!event || event.organizer_id !== profile_id) throw new AuthorizationError("Operation not allowed")

    const isUpdate = await Event.update(event_id, data)

    res.status(204).send(isUpdate)
  },
  async deleteOne(req: Request, res: Response) {
    // delete one event
    // only the organizer can delete the event
    const eventId = checkParams(req.params.id)
    const profileId = checkParams(req.params.profileId)

    const event = await Event.findByPk(eventId)

    if (event.length === 0) throw new NotFoundError("No event")
    if (event.organizer_id !== profileId) throw new AuthorizationError("Operation not allowed")

    await Event.delete(eventId)

    res.status(204)
  },
  async getAllByUser(req: Request, res: Response) {
    const profileId = checkParams(req.params.profileId)

    const events = await Event.getEventByUserId(profileId)

    res.status(200).json(events)
  },
  async getOrganizerEvents(req: Request, res: Response) {
    const profileId = checkParams(req.query.profileId)
    const page = checkParams(req.query.page)

    const events = await Event.getOrganizerEvents(profileId, page)

    res.status(200).json(events)
  },
  async getPasts(req: Request, res: Response) {
    const profileId = checkParams(req.query.profileId)
    const page = checkParams(req.query.page)

    const events = await Event.getPastEvents(profileId, page)

    res.status(200).json(events)
  }
}