import { skillFoot as SkillFoot } from '../models/index';
import { Request, Response } from 'express'
import associateStringToNumber from '../utils/associate.string.number';
import UserInputError from '../helpers/errors/user.input.error'
import { cacheOrGetCacheData } from '@/helpers/cache.data';
import logger from '@/helpers/logger';

export default {
    async getAll(req: Request, res: Response) {
        // get all skill for a reviewee 
        // and return the skill with average rating
    },
    async createOne(req: Request, res: Response) {
        const { pace, shooting, passing, dribbling, defending, sport_id, rater_id, reviewee_id } = req.body

        const data = {
            pace: associateStringToNumber(pace),
            shooting: associateStringToNumber(shooting),
            passing: associateStringToNumber(passing),
            dribbling: associateStringToNumber(dribbling),
            defending: associateStringToNumber(defending),
            sport_id: sport_id,
            rater_id: rater_id,
            reviewee_id: reviewee_id
        }

        const isAlereadyExist = await SkillFoot.findUniqueWithTwoClause({
            rater_id,
            reviewee_id
        })

        if (isAlereadyExist.length > 0) throw new UserInputError('Profile already rate')

        const skill = SkillFoot.create(data)

        res.status(201).send(!!skill)

    },
    async getOne(req: Request, res: Response) {
        const { id } = req.params

        const skill = await cacheOrGetCacheData(`skill${id}`, async () => {
            try {
                const skill = await SkillFoot.find(Number(id))
                return skill
            } catch (error) {
                logger.error(error)
            }
        })

        res.status(200).json(skill)
    },
    async updateOne(req: Request, res: Response) {
        // not sure if we need this
    },
    async deleteOne(req: Request, res: Response) {
        // not sure if we need this
    }
}