import { Request, Response } from 'express'
import authService from '../service/auth/auth'
import createAccesToken from '../helpers/create.token'
import createRefreshToken from '../helpers/create.refresh.token'
import google from '../service/auth/google'
import { user as User } from '../models/index'
import { image as Image } from '../models/index'
import { profile as Profile } from '../models/index'
import randomBytes from 'randombytes'

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

    const accessToken = createAccesToken("15m", decoded[0])

    res.status(200).json({ accessToken })

  },
  async logout(_req: Request, res: Response) {
    res.clearCookie("refreshToken")

    res.status(200).json({ message: "Logout successfully" })
  },
  async googleAuth(req: Request, res: Response) {
    const { code, state } = req.query

    console.log(code, state);

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
      accessToken = createAccesToken("15m", userInfos)
      refreshToken = createRefreshToken("7d", userInfos)
    } else {
      const userInfos = { user_id: user.id, email: user.email }
      accessToken = createAccesToken("15m", userInfos)
      refreshToken = createRefreshToken("7d", userInfos)
    }
    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 })



    res.status(301).redirect(`http://localhost:5173/auth/google/?access_token=${accessToken}`)
  }
}