import * as zod from 'zod';

const participantSkillSchema = zod.object({
  event_id: zod.number(),
  rater_id: zod.number(),
  reviewee_id: zod.number(),
  pace: zod.number().min(10).max(100),
  shooting: zod.number().min(10).max(100),
  passing: zod.number().min(10).max(100),
  dribbling: zod.number().min(10).max(100),
  defending: zod.number().min(10).max(100),
});

export default participantSkillSchema;