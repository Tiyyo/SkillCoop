import * as z from 'zod';
export declare const voteSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    profile_id: z.ZodString;
    rater_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    event_id: number;
    profile_id: string;
    rater_id: string;
}, {
    event_id: number;
    profile_id: string;
    rater_id: string;
}>;
