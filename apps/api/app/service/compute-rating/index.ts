import UserInputError from '../../helpers/errors/user-input.error.js';
import { profile as Profile } from '../../models/index.js';
import { ComputeRating } from './compute-data.js';
import { getData } from './get-data.js';

async function computeRatingUser(profileId: number) {
  const userEvaluationsAndBonus = await getData(profileId);

  if (!userEvaluationsAndBonus.user_own_evaluation)
    throw new UserInputError('User have to evaluate his skill');

  const profileSkills = new ComputeRating(
    userEvaluationsAndBonus,
    profileId,
  ).compute();

  await Profile.updateOne(
    { profile_id: profileId },
    { last_evaluation: profileSkills.gb_rating },
  );
  return profileSkills;
}
export default computeRatingUser;
