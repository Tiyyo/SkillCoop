import { sport as Sport } from '../models/index';
import { Request, Response } from 'express'

export default {
    async getAll(req: Request, res: Response) {

        const sports = await Sport.findAll()

        res.status(200).json(sports)
    },
    async createOne(req: Request, res: Response) {
    },
    async getOne(req: Request, res: Response) {

        const { id } = req.params

        const sport = await Sport.findByPk(Number(id))
    },
}