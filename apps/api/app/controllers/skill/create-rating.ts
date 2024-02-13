import { Request, Response } from 'express';
import { skillFoot as SkillFoot } from '../../models/index.js';
import UserInputError from '../../helpers/errors/user-input.error.js';

export async function createRating(req: Request, res: Response) {
  const {
    pace,
    shooting,
    passing,
    dribbling,
    defending,
    rater_id,
    reviewee_id,
    event_id,
  } = req.body;

  const isAlereadyExist = await SkillFoot.findOne({
    rater_id,
    reviewee_id,
    event_id,
  });

  if (isAlereadyExist)
    throw new UserInputError("User can't rate the same player twice per event");

  const skill = await SkillFoot.createOne({
    pace,
    shooting,
    passing,
    dribbling,
    defending,
    rater_id,
    reviewee_id,
    event_id,
    created_at: '',
  });

  res.status(201).send(!!skill);
}
