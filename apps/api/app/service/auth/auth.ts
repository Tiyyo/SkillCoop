import createAccesToken from "../../helpers/create-token"
import createRefreshToken from "../../helpers/create-refresh-token"
import DatabaseError from "../../helpers/errors/database.error"
import ServerError from "../../helpers/errors/server.error"
import UserInputError from "../../helpers/errors/user-input.error"
import { db } from "../../helpers/database"
import { user as User } from "../../models/index"
import bcrypt from "bcrypt"
import emailService from "../../utils/send-email"

interface UserInfos {
  id: number,
  email: string
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
      const emailToken = createAccesToken('1h', { userId: user.id })

      const url = `${process.env.API_URL}/auth/${user.id}/verify/${emailToken}`
      const text = `Click on the link to verify your email: ${url}`
      await emailService.sendVerify(email, 'validate your email', text)
      throw new UserInputError("Email not verified")
    }

    const userInfos = { user_id: user.id, email: user.email }

    const accessToken = createAccesToken("15m", userInfos)
    const refreshToken = createRefreshToken("7d", userInfos)

    return { accessToken, refreshToken }
  }
}
