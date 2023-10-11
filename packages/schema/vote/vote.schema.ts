import * as z from 'zod';

const voteSchema = z.object({
  event_id: z.number().int().positive(),
  profile_id: z.number().int().positive(),
  rater_id: z.number().int().positive(),
});

export default voteSchema;