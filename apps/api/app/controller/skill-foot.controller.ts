import { skillFoot as SkillFoot } from '../models/index';
import { Request, Response } from 'express';
import associateStringToNumber from '../utils/associate-string-number';
import UserInputError from '../helpers/errors/user-input.error';
import checkParams from '../utils/check-params';
import computeGbRating from '../utils/compute-gb-rating';
import computeRatingUser from '../service/compute-rating';

export default {
  async createOwnRating(req: Request, res: Response) {
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

    const isAlereadyExist = await SkillFoot.findUniqueWithTwoClause({
      rater_id: profile_id,
      reviewee_id: profile_id,
    });

    if (isAlereadyExist.length > 0)
      throw new UserInputError("User can't rate himself twice");

    const skill = await SkillFoot.create(data);

    res.status(201).send({ success: !!skill });
  },
  async getProfileEvalByEvent(req: Request, res: Response) {
    const [rater_id, reviewee_id, event_id] = checkParams(
      req.query.rater_id,
      req.query.reviewee_id,
      req.query.event_id,
    );
    const skill = await SkillFoot.findBy({ rater_id, reviewee_id, event_id });

    if (skill.length === 0) return res.status(200).json({ rating: null });

    const average = computeGbRating({
      avg_pace: skill[0].pace,
      avg_shooting: skill[0].shooting,
      avg_passing: skill[0].passing,
      avg_dribbling: skill[0].dribbling,
      avg_defending: skill[0].defending,
    });

    res.status(200).json({ rating: average });
  },
  async createRating(req: Request, res: Response) {
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

    const isAlereadyExist = await SkillFoot.findBy({
      rater_id,
      reviewee_id,
      event_id,
    });

    if (isAlereadyExist.length > 0)
      throw new UserInputError(
        "User can't rate the same player twice per event",
      );

    const skill = await SkillFoot.create({
      pace,
      shooting,
      passing,
      dribbling,
      defending,
      rater_id,
      reviewee_id,
      event_id,
    });

    res.status(201).send(!!skill);
  },
  async getProfileEval(req: Request, res: Response) {
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
  },
};
