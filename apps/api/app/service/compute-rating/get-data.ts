import { PlayerStatInsight, type UserEvaluationsBonus } from './sql-methods';

export async function getData(
  profileId: number,
): Promise<UserEvaluationsBonus> {
  const queries = [
    PlayerStatInsight.mvp(profileId),
    PlayerStatInsight.bestStriker(profileId),
    PlayerStatInsight.ownEvaluation(profileId),
    PlayerStatInsight.averageEvaluation(profileId),
  ];
  const rawResult = await Promise.all(queries);
  const formatedResult = rawResult.reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {}) as UserEvaluationsBonus;

  return formatedResult;
}
