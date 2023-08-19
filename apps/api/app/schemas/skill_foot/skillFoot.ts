import * as z from "zod";

const skillFootSchema = z.object({
    pace: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
    shooting: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
    passing: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
    dribbling: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
    defending: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
    sport_id: z.number(),
    rater_id: z.number(),
    reviewee_id: z.number(),
});

export default skillFootSchema;