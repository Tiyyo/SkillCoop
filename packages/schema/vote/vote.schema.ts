import * as z from 'zod';

const voteSchema = z.object({
  event_id: z.number(),
  profile_id: z.number(),
  rater_id: z.number(),
});

export default voteSchema;