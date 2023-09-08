import createAccesToken from "../../helpers/create.token"
import createRefreshToken from "../../helpers/create.refresh.token"
import DatabaseError from "../../helpers/errors/database.error"
import ServerError from "../../helpers/errors/server.error"
import UserInputError from "../../helpers/errors/user.input.error"
import { db } from "../../helpers/database"
import { user as User } from "../../models/index"
import bcrypt from "bcrypt"
import logger from "../../helpers/logger"

export default {
  async createUser(data: { email: string, password: string }): Promise<boolean> {
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

      return !!newUser
    } catch (error: any) {
      throw new DatabaseError(error)
    }
  },
  async login(data: { email: string, password: string }): Promise<Record<string, string>> {
    const { email, password } = data

    const user = await User.findMany({ email: email })

    if (!user) throw new UserInputError("Can't find any user with this email", "wrong credentials")
    if (!await bcrypt.compare(password, user[0].password)) throw new UserInputError("Password didn't match", "wrong credentials")

    const accessToken = createAccesToken("15m", { userId: user.id, email: user.email })
    const refreshToken = createRefreshToken("7d", { userId: user.id, email: user.email })

    return { accessToken, refreshToken }
  }
}
