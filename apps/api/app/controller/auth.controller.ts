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


export default {
  async register(req: Request, res: Response) {

    const { email, password } = req.body

    const newUser = await authService.createUser({ email, password })

    if (!newUser) throw new ServerError("Couldn't create user")

    const emailToken = createAccessToken('1h', { userId: newUser.id })

    const url = `${process.env.API_URL}/auth/${newUser.id}/verify/${emailToken}`

    const text = `Click on the link to verify your email: ${url}`

    await emailService.sendVerify(email, 'validate your email', text)

    return res.status(201).json({ message: "User created successfully and confirmation email has been sent" })

  },
  async signin(req: Request, res: Response) {

    const { email, password } = req.body

    const { accessToken, refreshToken } = await authService.login({ email, password })

    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 })

    res.status(200).json({ accessToken })

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
    let accessToken = ""
    let refreshToken = ""

    if (!user) {
      // create a new user with a random password and email
      // create a new profile wit picture, username as given_name + first letter of family_name
      // create tokens and send it back

      const password = randomBytes(16).toString('hex')
      const isCreated = await authService.createUser({ email, password })
      if (!isCreated) throw new Error('Error creating user')

      const newUser = await User.findMany({ email })
      const username = `${given_name} ${family_name[0]}.`
      const newImage = await Image.create({ url: picture })
      const newProfile = await Profile.create({ username, avatar_url: picture, user_id: newUser.id })

      console.log(newProfile);
      const userInfos = { user_id: newUser.id, email: newUser.email }
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

    console.log('is controller is called');
    console.log(token);

    verify(token, process.env.JWT_TOKEN_KEY as string, (err, decoded) => {
      if (err) throw new ServerError('Invalid token')
      if (!decoded) throw new ServerError('decoded is missing')
      console.log(decoded);
      tokenUserId = decoded[0].userId
    })

    console.log(userId, tokenUserId);
    if (userId !== tokenUserId) throw new ServerError("Invalid user id")

    const verifiedUser = await User.update(userId, { verified: 1 })

    console.log(verifiedUser);


    if (!verifiedUser) throw new ServerError("Couldn't update user")

    res.status(300).redirect(`http://localhost:5173/login`)

  }
}