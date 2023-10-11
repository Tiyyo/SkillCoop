import * as z from 'zod';

const participantSkillSchema = z.object({
  event_id: z.number().int().positive(),
  rater_id: z.number().int().positive(),
  reviewee_id: z.number().int().positive(),
  pace: z.number().min(10).max(100),
  shooting: z.number().min(10).max(100),
  passing: z.number().min(10).max(100),
  dribbling: z.number().min(10).max(100),
  defending: z.number().min(10).max(100),
});

export default participantSkillSchema;