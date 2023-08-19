import { status as Status } from '../models/index'
import { Request, Response } from 'express'

export default {
    async getAll(req: Request, res: Response) {
        const result = await Status.findAll()

        res.status(200).json(result)
    },
    async createOne(req: Request, res: Response) {
        const { name } = req.body

        const result = await Status.create({ name })

        res.status(201).json({ id: result })
    },
    async getOne(req: Request, res: Response) {

        const { id } = req.params

        const result = await Status.findByPk(Number(id))

        res.status(200).send(result)

    },
    async updateOne(req: Request, res: Response) {

        const { id } = req.params
        const { name } = req.body

        const result = await Status.update(Number(id), { name })

        res.status(204).send(result)

    },
    async deleteOne(req: Request, res: Response) {

        const { id } = req.params

        const result = await Status.delete(Number(id))

        res.status(204).send(result)
    }
}