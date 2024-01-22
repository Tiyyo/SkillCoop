import { sql } from 'kysely';
import { db } from '#helpers/client.db';
import { AvgSkill, Skills } from '@skillcoop/types';

export type UserEvaluationsBonus = {
  nb_mvp: number;
  nb_best_striker: number;
  user_own_evaluation: Skills | undefined;
  avg_evaluation_received: AvgSkill | undefined;
};

export class PlayerStatInsight {
  static async mvp(profileId: number) {
    const nbMvpResult = await sql<{ nb_mvp: number }>`
      SELECT 
        COUNT (*) AS nb_mvp
      FROM event  
      WHERE mvp_id = ${profileId}
      `.execute(db);
    return nbMvpResult.rows[0];
  }
  static async bestStriker(profileId: number) {
    const nbBestStrikerResult = await sql<{ nb_best_striker: number }>`
       SELECT 
        COUNT (*) AS nb_best_striker
      FROM event  
      WHERE best_striker_id = ${profileId}   
      `.execute(db);
    return nbBestStrikerResult.rows[0];
  }
  static async ownEvaluation(profileId: number) {
    const userOwnEvalResult = await sql<Skills | undefined>`
          SELECT
            pace,
            dribbling,
            defending,
            passing,
            shooting
          FROM skill_foot
          WHERE rater_id  = ${profileId}
          AND reviewee_id = ${profileId}
        `.execute(db);
    return { user_own_evaluation: userOwnEvalResult.rows[0] };
  }
  static async averageEvaluation(profileId: number) {
    const avgEvalsReceivedResult = await sql<AvgSkill>`
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
    `.execute(db);
    return { avg_evaluation_received: avgEvalsReceivedResult.rows[0] };
  }
}
