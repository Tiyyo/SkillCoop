import { Request, Response } from 'express';
import { profile as Profile } from '../models/index';
import { user as User } from '../models/index';
import bcrypt from 'bcrypt';
import checkParams from '../utils/check-params';
import computeRatingUser from '../service/compute-rating';

export default {
  getMe: async (req: Request, res: Response) => {
    const { decoded } = req.body
    const userId = decoded[0].user_id
    const userProfile = await Profile.findByUserId(userId)

    const ccomputedRatings = await computeRatingUser(userProfile.profile_id)

    res.status(200).json({ userProfile: userProfile ?? decoded[0] })
  },
  updateEmail: async (req: Request, res: Response) => {
    const { email, user_id } = req.body

    const userProfile = await User.update(user_id, { email })

    res.status(200).json({ userProfile })
  },
  updatePassword: async (req: Request, res: Response) => {
    const { old_password, new_password, user_id } = req.body

    const user = await User.findByPk(user_id)

    // check if old password match 
    // create a new hash password
    // update the user with the new hash password

    const isMatch = await bcrypt.compare(old_password, user.password)
    if (!isMatch) throw new Error('Password do not match')

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(new_password, saltRounds)

    const updateUser = await User.update(user_id, { password: hashedPassword })

    res.status(200).json({ updateUser })

  },
  deleteUser: async (req: Request, res: Response) => {
    const user_id = checkParams(req.params.id)

    const user = await User.delete(user_id)

    res.status(200).json({ user })
  }
} 