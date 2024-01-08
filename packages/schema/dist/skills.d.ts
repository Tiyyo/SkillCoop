import * as z from "zod";
export declare const ownSkillSchema: z.ZodObject<{
    defending: z.ZodEnum<["beginner", "novice", "intermediate", "advanced", "expert"]>;
    dribbling: z.ZodEnum<["beginner", "novice", "intermediate", "advanced", "expert"]>;
    pace: z.ZodEnum<["beginner", "novice", "intermediate", "advanced", "expert"]>;
    passing: z.ZodEnum<["beginner", "novice", "intermediate", "advanced", "expert"]>;
    shooting: z.ZodEnum<["beginner", "novice", "intermediate", "advanced", "expert"]>;
    profile_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    profile_id: number;
    defending: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    dribbling: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    pace: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    passing: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    shooting: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
}, {
    profile_id: number;
    defending: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    dribbling: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    pace: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    passing: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
    shooting: "beginner" | "novice" | "intermediate" | "advanced" | "expert";
}>;
export declare const participantSkillSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    rater_id: z.ZodNumber;
    reviewee_id: z.ZodNumber;
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
    rater_id: number;
    reviewee_id: number;
}, {
    event_id: number;
    defending: number;
    dribbling: number;
    pace: number;
    passing: number;
    shooting: number;
    rater_id: number;
    reviewee_id: number;
}>;
