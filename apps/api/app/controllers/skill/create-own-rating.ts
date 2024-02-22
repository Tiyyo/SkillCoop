import { Request, Response } from 'express';
import associateStringToNumber from '../../utils/associate-string-number.js';
import { skillFoot as SkillFoot } from '../../models/index.js';
import UserInputError from '../../helpers/errors/user-input.error.js';
// Migrated
export async function createOwnRating(req: Request, res: Response) {
  const { pace, shooting, passing, dribbling, defending, profile_id } =
    req.body;

  const data = {
    pace: associateStringToNumber(pace),
    shooting: associateStringToNumber(shooting),
    passing: associateStringToNumber(passing),
    dribbling: associateStringToNumber(dribbling),
    defending: associateStringToNumber(defending),
    rater_id: profile_id,
    reviewee_id: profile_id,
  };

  const userEval = await SkillFoot.findOne({
    rater_id: profile_id,
    reviewee_id: profile_id,
  });
  if (userEval) throw new UserInputError("User can't rate himself twice");

  const skill = await SkillFoot.createOne(data);
  res.status(201).send({ success: !!skill });
}
