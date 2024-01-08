import * as z from 'zod';
export declare const saveScoreSchema: z.ZodObject<{
    score_team_1: z.ZodNumber;
    score_team_2: z.ZodNumber;
    event_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    event_id: number;
    score_team_1: number;
    score_team_2: number;
}, {
    event_id: number;
    score_team_1: number;
    score_team_2: number;
}>;
