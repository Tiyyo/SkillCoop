import * as z from "zod";
export declare const inviteParticipantSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    ids: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    event_id?: number;
    ids?: number[];
}, {
    event_id?: number;
    ids?: number[];
}>;
export declare const updateParticipantSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    profile_id: z.ZodNumber;
    status_name: z.ZodEnum<["confirmed", "declined"]>;
}, "strip", z.ZodTypeAny, {
    event_id?: number;
    profile_id?: number;
    status_name?: "confirmed" | "declined";
}, {
    event_id?: number;
    profile_id?: number;
    status_name?: "confirmed" | "declined";
}>;
