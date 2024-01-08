import * as z from 'zod';
export declare const voteSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    profile_id: z.ZodNumber;
    rater_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    profile_id: number;
    event_id: number;
    rater_id: number;
}, {
    profile_id: number;
    event_id: number;
    rater_id: number;
}>;
