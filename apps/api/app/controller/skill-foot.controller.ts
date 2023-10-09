import { skillFoot as SkillFoot } from '../models/index';
import { Request, Response } from 'express'
import associateStringToNumber from '../utils/associate-string-number';
import UserInputError from '../helpers/errors/user-input.error'
import { cacheOrGetCacheData } from '../helpers/cache-data';
import logger from '../helpers/logger';
import checkParams from '../utils/check-params';
import computeGbRating from '../utils/compute-gb-rating';

export default {
  async getAll(req: Request, res: Response) {
    // get all skill for a reviewee 
    // and return the skill with average rating
  },
  async createOwnRating(req: Request, res: Response) {
    const { pace, shooting, passing, dribbling, defending, profile_id } = req.body

    const data = {
      pace: associateStringToNumber(pace),
      shooting: associateStringToNumber(shooting),
      passing: associateStringToNumber(passing),
      dribbling: associateStringToNumber(dribbling),
      defending: associateStringToNumber(defending),
      rater_id: profile_id,
      reviewee_id: profile_id
    }

    const isAlereadyExist = await SkillFoot.findUniqueWithTwoClause({
      rater_id: profile_id,
      reviewee_id: profile_id
    })

    if (isAlereadyExist.length > 0) throw new UserInputError('User can\'t rate himself twice')

    const skill = SkillFoot.create(data)

    res.status(201)
      .send(!!skill)

  },
  async getAverage(req: Request, res: Response) {
    const rater_id = checkParams(req.query.rater_id)
    const reviewee_id = checkParams(req.query.reviewee_id)
    const event_id = checkParams(req.query.event_id)

    const skill = await SkillFoot.findBy({ rater_id, reviewee_id, event_id })

    if (skill.length === 0) return res.status(204)

    const average = computeGbRating({
      avg_pace: skill[0].pace,
      avg_shooting: skill[0].shooting,
      avg_passing: skill[0].passing,
      avg_dribbling: skill[0].dribbling,
      avg_defending: skill[0].defending
    })

    res.status(200).json({ rating: average })
  },
  async createRating(req: Request, res: Response) {
    const { pace, shooting, passing, dribbling, defending, rater_id, reviewee_id, event_id } = req.body

    const isAlereadyExist = await SkillFoot.findBy({
      rater_id,
      reviewee_id,
      event_id
    })

    if (isAlereadyExist.length > 0) throw new UserInputError('User can\'t rate the same player twice per event')

    const skill = SkillFoot.create({ pace, shooting, passing, dribbling, defending, rater_id, reviewee_id, event_id })

    res.status(201)
      .send(!!skill)
  },
  async deleteOne(req: Request, res: Response) {
    // not sure if we need this
  }
}