import { bestStriker as BestStriker } from '../models/index'
import { event as Event } from '../models/index'
import { Request, Response } from 'express'

export default {
  createOne: async (req: Request, res: Response) => {
    const { profile_id, rater_id, event_id } = req.body
    const event = await Event.getEventById(event_id, profile_id)
    if (!event || event.status_name !== 'completed') throw new Error('Event not found or not completed')
    const isCreated = await BestStriker.create({ profile_id, rater_id, event_id })
    if (!isCreated) throw new Error('Not created')
    const isUpdated = await Event.updateBestStriker(event_id)
    res.status(201).json({ succces: isUpdated })
  },
}