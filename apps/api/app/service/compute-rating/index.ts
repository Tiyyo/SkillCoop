import { db } from '../../helpers/client.db'
import { sql } from 'kysely'
import computeGbRating from '../../utils/compute-gb-rating'

type Eval = {
  defending: number,
  pace: number,
  dribbling: number,
  shooting: number,
  passing: number,
}

type AvgEval = Eval & {
  nb_eval_received: number
}

async function computeRatingUser(profileId: number) {
  // TODO consider to first user Promise.all to make this async/await in parallel
  // In second to migrate to Postgres to move this logic into SQL function

  const nbMvpQueryResult = await sql<{ nb_mvp: number }>`
      SELECT 
        COUNT (*) AS nb_mvp
      FROM event  
      WHERE mvp_id = ${profileId}
      `.execute(db)

  const nbBestStrikerQueryResult = await sql<{ nb_best_striker: number }>`
       SELECT 
        COUNT (*) AS nb_best_striker
      FROM event  
      WHERE best_striker_id = ${profileId}   
      `.execute(db)

  const userOwnEvalQueryResult = await sql<Eval>`
      SELECT 
        pace,
        dribbling,
        defending,
        passing,
        shooting
      FROM skill_foot
      WHERE rater_id  =  ${profileId}
      AND reviewee_id =  ${profileId}   
    `.execute(db)

  const avgEvalsReceivedQueryResult = await sql<AvgEval>`
      SELECT 
        COUNT (*) AS nb_eval_received,
        IFNULL(AVG(pace), 0) AS pace,
        IFNULL(AVG(dribbling), 0) AS dribbling,
        IFNULL(AVG(defending), 0) AS defending,
        IFNULL(AVG(passing), 0) AS passing,
        IFNULL(AVG(shooting), 0) AS shooting
      FROM skill_foot
      WHERE rater_id <>  ${profileId}
      AND reviewee_id =  ${profileId}   
      GROUP BY reviewee_id 
    `.execute(db)

  const WEIGHT_OWN_EVAL = 7
  const VALUE_BONUS = 100
  const NB_MVP = nbMvpQueryResult.rows[0].nb_mvp
  const NB_EVAL_RECEIVED = avgEvalsReceivedQueryResult.rows[0].nb_eval_received
  const NB_STRIKER = nbBestStrikerQueryResult.rows[0].nb_best_striker
  const avgEvalReceived = avgEvalsReceivedQueryResult.rows[0]
  const userOwnEval = userOwnEvalQueryResult.rows[0]

  const avg_skills = {
    avg_pace: Math.floor(((userOwnEval.pace * WEIGHT_OWN_EVAL) + avgEvalReceived.pace)
      / (WEIGHT_OWN_EVAL + NB_EVAL_RECEIVED)),
    avg_defending: Math.floor(((userOwnEval.defending * WEIGHT_OWN_EVAL) + avgEvalReceived.defending)
      / (WEIGHT_OWN_EVAL + NB_EVAL_RECEIVED)),
    avg_passing: Math.floor(((userOwnEval.passing * WEIGHT_OWN_EVAL) + avgEvalReceived.passing)
      / (WEIGHT_OWN_EVAL + NB_EVAL_RECEIVED)),
    avg_dribbling: Math.floor(((userOwnEval.dribbling * WEIGHT_OWN_EVAL) + avgEvalReceived.dribbling)
      / (WEIGHT_OWN_EVAL + NB_EVAL_RECEIVED)),
    avg_shooting: Math.floor(((userOwnEval.shooting * WEIGHT_OWN_EVAL) + avgEvalReceived.shooting + (VALUE_BONUS * NB_STRIKER))
      / (WEIGHT_OWN_EVAL + NB_EVAL_RECEIVED + NB_STRIKER))
  }

  const gbRatingBeforeBonus = computeGbRating(avg_skills)
  const gbRating = Math.floor((gbRatingBeforeBonus * WEIGHT_OWN_EVAL + NB_EVAL_RECEIVED + 100 * NB_MVP) / (WEIGHT_OWN_EVAL + NB_EVAL_RECEIVED + NB_MVP))
  const profileSkills = { ...avg_skills, gb_rating: gbRating }

  return profileSkills
}

export default computeRatingUser