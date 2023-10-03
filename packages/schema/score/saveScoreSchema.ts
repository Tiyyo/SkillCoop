import * as z from 'zod';

const saveScoreSchema = z.object({
  score_team_1: z.number().min(0).max(100),
  score_team_2: z.number().min(0).max(100),
  event_id: z.number(),
});

export default saveScoreSchema;
