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
import NotFoundError from '../helpers/errors/not-found.error'
import tokenHandler from '../helpers/token.handler'



export default {
  async register(req: Request, res: Response) {
    const { email, password } = req.body
    let newUser: { id: number, email: string }

    try {
      newUser = await authService.createUser({ email, password })
    } catch (error) {
      return res.status(400).send('We couldn\'t create a new account with this informations')
    }


    const emailToken = tokenHandler.createToken('1h', process.env.JWT_EMAIL_TOKEN_KEY as string, { user_id: newUser.id })
    await emailService.sendEmailToConfirmEmail({ emailToken, email, userId: newUser.id })

    return res.status(200).json({ message: "User created successfully and confirmation email has been sent" })
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
    const accessToken = tokenHandler.createToken('15m', process.env.JWT_TOKEN_KEY as string, decoded)

    res.status(200).json({ accessToken })
  },
  async logout(_req: Request, res: Response) {
    res.clearCookie("refreshToken", { domain: "localhost", path: '/' })

    res.status(204).send('Logged out')
  },
  async googleAuth(req: Request, res: Response) {
    const { code, state } = req.query
    if (typeof code !== 'string') throw new Error('Invalid type')
    const { access_token: googleToken, id_token } = await google.getOAuthToken({ code })

    const { email, given_name, family_name, picture } = await google.getUser({ access_token: googleToken, id_token })

    const [user] = await User.findBy({ email })

    let userInfos
    if (!user) {
      userInfos = authService.createGoogleUser({ email, given_name, family_name, picture })
    } else {
      // TODO think about to automaticly update profile with google information 
      userInfos = { user_id: user.id, email: user.email }
    }
    const { accessToken, refreshToken } = tokenHandler.createPairAuthToken(userInfos)

    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 })
    res.status(301).redirect(`${process.env.CLIENT_URL}/auth/google/?access_token=${accessToken}`)
  },
  async verifyEmail(req: Request, res: Response) {
    const { token } = req.params
    const userId = checkParams(req.params.userId)

    const userInfos = tokenHandler.verifyTokenAndGetData(token, process.env.JWT_EMAIL_TOKEN_KEY as string)
    if (userInfos && userId !== (userInfos as any).user_id) throw new ServerError("Invalid user id")

    const verifiedUser = await User.update(userId, { verified: 1 })
    if (!verifiedUser) throw new ServerError("Couldn't update user")

    res.status(300).redirect(`${process.env.CLIENT_URL}/login`)
  },
  async resendEmail(req: Request, res: Response) {
    const { email } = req.body
    const [user] = await User.findBy({ email })

    if (!user) throw new NotFoundError("Couldn't find user")
    const emailToken = tokenHandler.createToken('1h', process.env.JWT_EMAIL_TOKEN_KEY as string, { user_id: user.id })

    const url = `${process.env.API_URL}/auth/${user.id}/verify/${emailToken}`
    const text = `Click on the link to verify your email: ${url}`
    await emailService.sendVerify(email, 'validate your email', text)

    return res.status(200).json({ message: "A new confirmation email has been sent" })
  }
}
