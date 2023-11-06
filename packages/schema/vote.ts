import * as z from 'zod';

export const voteSchema = z.object({
  event_id: z.number().int().positive(),
  profile_id: z.number().int().positive(),
  rater_id: z.number().int().positive(),
});