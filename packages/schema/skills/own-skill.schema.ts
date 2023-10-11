import * as z from "zod";

const ownSkillSchema = z.object({
  defending: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
  dribbling: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
  pace: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
  passing: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
  shooting: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
  profile_id: z.number().int().positive(),
});

export default ownSkillSchema;