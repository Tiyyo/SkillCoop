import { Request, Response } from 'express'
import authService from '../service/auth/auth'
import createAccesToken from '../helpers/create.token'

export default {
  async register(req: Request, res: Response) {

    const { email, password } = req.body

    const isCreated = await authService.createUser({ email, password })

    return res.status(201).json(isCreated)

  },
  async signin(req: Request, res: Response) {

    const { email, password } = req.body

    const { accessToken, refreshToken } = await authService.login({ email, password })

    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 })

    res.status(200).json({ accessToken })

  },
  async refresh(req: Request, res: Response) {
    const { decoded } = req.body

    const accesToken = createAccesToken("15m", decoded)

    res.status(200).json({ accesToken })

  },
  async logout(_req: Request, res: Response) {
    res.clearCookie("refreshToken")

    res.status(200).json({ message: "Logout successfully" })
  }
}