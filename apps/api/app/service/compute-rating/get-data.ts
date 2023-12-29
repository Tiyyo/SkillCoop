import sqlMethods, { type UserEvaluationsBonus } from './sql-methods';

export async function getData(
  profileId: number,
): Promise<UserEvaluationsBonus> {
  const queries = [
    sqlMethods.getNbMvpAwards(profileId),
    sqlMethods.getNbBestStrikerAwards(profileId),
    sqlMethods.getUserOwnEvaluation(profileId),
    sqlMethods.getAverageEvaluationReceived(profileId),
  ];
  const rawResult = await Promise.all(queries);
  const formatedResult = rawResult.reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {}) as UserEvaluationsBonus;

  console.log(rawResult);
  console.log(formatedResult);
  return formatedResult;
}
