import { Request, Response } from 'express'
import { user as User } from '../models/index'

export default {
    async getAll(req: Request, res: Response) { },
    async createOne(req: Request, res: Response) {

        const { email, password } = req.body

        const user = await User.create({ email, password })

        return res.json(user)

    },
    async getOne(req: Request, res: Response) { },
    async updateOne(req: Request, res: Response) { },
    async deleteOne(req: Request, res: Response) { }
}