import { Request, Response } from 'express';
import { profile as Profile } from '../models/index';

export default {
  getMe: async (req: Request, res: Response) => {
    const { decoded } = req.body
    const userId = decoded[0].user_id
    const userProfile = await Profile.findByUserId(userId)

    res.status(200).json({ userProfile: userProfile ?? decoded[0] })
  }
} 