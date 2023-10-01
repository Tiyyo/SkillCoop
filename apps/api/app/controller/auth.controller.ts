import { Request, Response } from 'express'
import authService from '../service/auth/auth'
import createRefreshToken from '../helpers/create-refresh-token'
import google from '../service/auth/google'
import { user as User } from '../models/index'
import { image as Image } from '../models/index'
import { profile as Profile } from '../models/index'
import randomBytes from 'randombytes'
import createAccessToken from '../helpers/create-token'
import ServerError from '../helpers/errors/server.error'
import emailService from '../utils/send-email'
import checkParams from '../utils/check-params'
import { verify } from 'jsonwebtoken'
import NotFoundError from '../helpers/errors/not-found.error'
import generateTokens from '../helpers/create-tokens'



export default {
  async register(req: Request, res: Response) {
    const { email, password } = req.body
    const newUser = await authService.createUser({ email, password })


    if (!newUser) throw new ServerError("Couldn't create user")

    const emailToken = createAccessToken('1h', { userId: newUser.id })

    await emailService.sendEmailToConfirmEmail({ emailToken, email, userId: newUser.id })

    return res.status(201).json({ message: "User created successfully and confirmation email has been sent" })

  },
  async signin(req: Request, res: Response) {
    const { email, password } = req.body
    const MAX_AGE = 1000 * 60 * 60 * 24 * 7 // 7 days

    try {
      const { accessToken, refreshToken } = await authService.login({ email, password })

      res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: MAX_AGE })

      res.status(200).json({ accessToken })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  },
  async refresh(req: Request, res: Response) {
    const { decoded } = req.body

    const accessToken = createAccessToken("15m", decoded[0])

    res.status(200).json({ accessToken })

  },
  async logout(_req: Request, res: Response) {
    res.clearCookie("refreshToken")

    res.status(200).json({ message: "Logout successfully" })
  },
  async googleAuth(req: Request, res: Response) {
    const { code, state } = req.query

    const { access_token: googleToken, id_token } = await google.getOAuthToken({ code })

    const { email, given_name, family_name, picture } = await google.getUser({ access_token: googleToken, id_token })

    const user = await User.findMany({ email })

    let accessToken = null
    let refreshToken = null

    if (!user) {
      const userInfos = authService.createGoogleUser({ email, given_name, family_name, picture })
      accessToken = createAccessToken("15m", userInfos)
      refreshToken = createRefreshToken("7d", userInfos)
    } else {
      const userInfos = { user_id: user.id, email: user.email }
      accessToken = createAccessToken("15m", userInfos)
      refreshToken = createRefreshToken("7d", userInfos)
    }

    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 })

    res.status(301).redirect(`http://localhost:5173/auth/google/?access_token=${accessToken}`)
  },
  async verifyEmail(req: Request, res: Response) {
    const { token } = req.params
    const userId = checkParams(req.params.userId)
    let tokenUserId = null


    verify(token, process.env.JWT_TOKEN_KEY as string, (err, decoded) => {
      if (err) throw new ServerError('Invalid token')
      if (!decoded) throw new ServerError('decoded is missing')
      console.log(decoded);
      tokenUserId = decoded[0].userId
    })

    if (userId !== tokenUserId) throw new ServerError("Invalid user id")

    const verifiedUser = await User.update(userId, { verified: 1 })

    if (!verifiedUser) throw new ServerError("Couldn't update user")

    res.status(300).redirect(`${process.env.CLIENT_URL}/login`)
  },
  async resendEmail(req: Request, res: Response) {
    const { email } = req.body
    const user = await User.findMany({ email })

    if (!user) throw new NotFoundError("Couldn't find user")

    const emailToken = createAccessToken('1h', { userId: user.id })
    const url = `${process.env.API_URL}/auth/${user.id}/verify/${emailToken}`
    const text = `Click on the link to verify your email: ${url}`
    await emailService.sendVerify(email, 'validate your email', text)

    return res.status(200).json({ message: "A new confirmation email has been sent" })
  }
}