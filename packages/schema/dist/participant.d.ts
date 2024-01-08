import * as z from "zod";
export declare const inviteParticipantSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    ids: z.ZodArray<z.ZodNumber, "many">;
    initiator: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    event_id: number;
    ids: number[];
    initiator?: number | undefined;
}, {
    event_id: number;
    ids: number[];
    initiator?: number | undefined;
}>;
export declare const updateParticipantSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    profile_id: z.ZodNumber;
    status_name: z.ZodEnum<["confirmed", "declined", "pending"]>;
}, "strip", z.ZodTypeAny, {
    status_name: "pending" | "confirmed" | "declined";
    profile_id: number;
    event_id: number;
}, {
    status_name: "pending" | "confirmed" | "declined";
    profile_id: number;
    event_id: number;
}>;
