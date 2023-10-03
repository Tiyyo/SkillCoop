import { score as Score } from '../models/index'
import { Request, Response } from 'express'


export default {
  async createOne(req: Request, res: Response) {
    const { score_team_1, score_team_2, event_id } = req.body

    await Score.create({ score_team_1, score_team_2, event_id })

    res.status(201)
  }
}