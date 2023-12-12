import * as z from "zod";
export declare const inviteParticipantSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    ids: z.ZodArray<z.ZodNumber, "many">;
    initiator: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    event_id?: number;
    ids?: number[];
    initiator?: number;
}, {
    event_id?: number;
    ids?: number[];
    initiator?: number;
}>;
export declare const updateParticipantSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    profile_id: z.ZodNumber;
    status_name: z.ZodEnum<["confirmed", "declined", "pending"]>;
}, "strip", z.ZodTypeAny, {
    event_id?: number;
    profile_id?: number;
    status_name?: "confirmed" | "declined" | "pending";
}, {
    event_id?: number;
    profile_id?: number;
    status_name?: "confirmed" | "declined" | "pending";
}>;
