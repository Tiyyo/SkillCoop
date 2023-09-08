import { Request, Response } from 'express';
import { profile as Profile } from '../models/index';

export default {
  getMe: async (req: Request, res: Response) => {
    const { decoded } = req.body

    const userId = decoded.userId

    const userProfile = await Profile.findOne(userId)

    res.status(200).json({ userProfile })
  }
}