import createAccesToken from "../../helpers/create-token"
import createRefreshToken from "../../helpers/create-refresh-token"
import DatabaseError from "../../helpers/errors/database.error"
import ServerError from "../../helpers/errors/server.error"
import UserInputError from "../../helpers/errors/user-input.error"
import { db } from "../../helpers/database"
import { user as User } from "../../models/index"
import { image as Image } from "../../models/index"
import { profile as Profile } from "../../models/index"
import bcrypt from "bcrypt"
import emailService from "../../utils/send-email"
import generateTokens from "../../helpers/create-tokens"
import randomBytes from 'randombytes'

interface UserInfos {
  user_id: number,
  email: string
}

interface GoogleUserInfos {
  email: string,
  given_name: string,
  family_name: string,
  picture: string
}

export default {
  async createUser(data: { email: string, password: string }): Promise<UserInfos> {
    const { email, password } = data
    const saltRouds = 10

    try {
      const hashedPassword = await bcrypt.hash(password, saltRouds).catch((err) => {
        if (err) throw new ServerError("Couldn't hash user password")
      })

      if (!hashedPassword) throw new ServerError('hash password is missing')

      const newUser = await User.create({
        email,
        password: hashedPassword,
      })

      return newUser
    } catch (error: any) {
      throw new DatabaseError(error)
    }
  },
  async login(data: { email: string, password: string }): Promise<Record<string, string>> {
    const { email, password } = data

    const user = await User.findMany({ email: email })

    if (!user) throw new UserInputError("Can't find any user with this email", "wrong credentials")

    if (!await bcrypt.compare(password, user.password)) throw new UserInputError("Password didn't match", "wrong credentials")

    if (!user.verified) {
      // generate an new email to send to the user
      const emailToken = createAccesToken('1h', { userId: user.id })
      await emailService.sendEmailToConfirmEmail({ emailToken, email, userId: user.id })
      throw new UserInputError("Email not verified")
    }
    const userInfos = { user_id: user.id, email: user.email }
    const { accessToken, refreshToken } = generateTokens(userInfos)

    return { accessToken, refreshToken }
  },
  async createGoogleUser({ email, given_name, family_name, picture }: GoogleUserInfos): Promise<UserInfos> {
    const password = randomBytes(16).toString('hex')
    const isCreated = await this.createUser({ email, password })
    if (!isCreated) throw new Error('Error creating user')

    const newUser = await User.findMany({ email })
    const username = `${given_name} ${family_name[0]}.`
    await User.update(newUser.id, { verified: 1 })
    await Image.create({ url: picture })
    await Profile.create({ username, avatar_url: picture, user_id: newUser.id })
    return { user_id: newUser.id, email: newUser.email }
  }
}
