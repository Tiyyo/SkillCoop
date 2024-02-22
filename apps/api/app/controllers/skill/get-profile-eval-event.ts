import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
import { skillFoot as SkillFoot } from '../../models/index.js';
import computeGbRating from '../../utils/compute-gb-rating.js';
//Migrated
export async function getProfileEvalByEvent(req: Request, res: Response) {
  const [rater_id, reviewee_id, event_id] = checkParams(
    req.query.rater_id,
    req.query.reviewee_id,
    req.query.event_id,
  );
  const skill = await SkillFoot.findOne({ rater_id, reviewee_id, event_id });

  if (!skill) return res.status(200).json({ rating: null });

  const average = computeGbRating({
    avg_pace: skill.pace,
    avg_shooting: skill.shooting,
    avg_passing: skill.passing,
    avg_dribbling: skill.dribbling,
    avg_defending: skill.defending,
  });

  res.status(200).json({ rating: average });
}
