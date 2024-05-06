import * as z from "zod";
export declare const ownSkillSchema: z.ZodObject<{
    defending: z.ZodEnum<["beginner", "novice", "intermediate", "advanced", "expert"]>;
    dribbling: z.ZodEnum<["beginner", "novice", "intermediate", "advanced", "expert"]>;
    pace: z.ZodEnum<["beginner", "novice", "intermediate", "advanced", "expert"]>;
    passing: z.ZodEnum<["beginner", "novice", "intermediate", "advanced", "expert"]>;
    shooting: z.ZodEnum<["beginner", "novice", "intermediate", "advanced", "expert"]>;
    profile_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    profile_id: string;
    defending: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    dribbling: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    pace: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    passing: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    shooting: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
}, {
    profile_id: string;
    defending: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    dribbling: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    pace: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    passing: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    shooting: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
}>;
export type OwnSkill = z.infer<typeof ownSkillSchema>;
export declare const participantSkillSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    rater_id: z.ZodString;
    reviewee_id: z.ZodString;
    pace: z.ZodNumber;
    shooting: z.ZodNumber;
    passing: z.ZodNumber;
    dribbling: z.ZodNumber;
    defending: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    event_id: number;
    defending: number;
    dribbling: number;
    pace: number;
    passing: number;
    shooting: number;
    rater_id: string;
    reviewee_id: string;
}, {
    event_id: number;
    defending: number;
    dribbling: number;
    pace: number;
    passing: number;
    shooting: number;
    rater_id: string;
    reviewee_id: string;
}>;
export type EvaluationParticipantSkill = z.infer<typeof participantSkillSchema>;
