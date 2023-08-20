import { Request, Response } from 'express'
import { user as User } from '../models/index'
import { createUser, login } from '../service/auth/auth'
import createAccesToken from '../helpers/create.token'

export default {
    async getAll(req: Request, res: Response) { },
    async register(req: Request, res: Response) {

        const { email, password } = req.body

        const isCreated = await createUser({ email, password })

        return res.json(isCreated)

    },
    async signin(req: Request, res: Response) {

        const { email, password } = req.body

        const { accesToken, refreshToken } = await login({ email, password })

        res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 + 1000 })

        res.status(200).json({ accesToken })

    },
    async refresh(req: Request, res: Response) {
        const { decoded } = req.body

        const accesToken = createAccesToken("15m", decoded)

        res.status(200).json({ accesToken })

    },
    async logout(req: Request, res: Response) {
        res.clearCookie("refreshToken")

        res.status(200).json({ message: "Logout successfully" })
    }
}