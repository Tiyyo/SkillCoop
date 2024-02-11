import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
import UserInputError from '../../helpers/errors/user-input.error.js';
import computeRatingUser from '../../services/compute-rating/index.js';

export async function getProfileEval(req: Request, res: Response) {
  const [profileId] = checkParams(req.params.profileId);

  try {
    const profileEval = await computeRatingUser(profileId);
    res.status(200).json(profileEval);
  } catch (error) {
    if (error instanceof UserInputError) {
      res.status(200).json({ error: error.message });
    } else {
      throw error;
    }
  }
}
