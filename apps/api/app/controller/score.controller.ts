import { score as Score } from '../models/index'
import { event as Event } from '../models/index'

import { Request, Response } from 'express'
import deleteDecodedKey from '../utils/delete-decoded'
import { eventStatus } from '../@types/types'


export default {
  async createOne(req: Request, res: Response) {
    deleteDecodedKey(req.body)
    const { score_team_1, score_team_2, event_id } = req.body

    await Score.create({ score_team_1, score_team_2, event_id })
    await Event.update(event_id, { status_name: eventStatus.completed })

    res.status(201)
  }
}