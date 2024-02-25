import * as z from "zod";

export const ownSkillSchema = z.object({
  defending: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
  dribbling: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
  pace: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
  passing: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
  shooting: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
  profile_id: z.string().uuid(),
});

export type OwnSkill = z.infer<typeof ownSkillSchema>;

export const participantSkillSchema = z.object({
  event_id: z.number().int().positive(),
  rater_id: z.number().int().positive(),
  reviewee_id: z.number().int().positive(),
  pace: z.number().min(10).max(100),
  shooting: z.number().min(10).max(100),
  passing: z.number().min(10).max(100),
  dribbling: z.number().min(10).max(100),
  defending: z.number().min(10).max(100),
});
