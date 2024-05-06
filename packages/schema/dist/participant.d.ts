import * as z from "zod";
export declare const inviteParticipantSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    ids: z.ZodArray<z.ZodString, "many">;
    initiator: z.ZodString;
}, "strip", z.ZodTypeAny, {
    event_id: number;
    ids: string[];
    initiator: string;
}, {
    event_id: number;
    ids: string[];
    initiator: string;
}>;
export declare const updateParticipantSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    profile_id: z.ZodString;
    status_name: z.ZodEnum<["confirmed", "declined", "pending", "refused", "requested"]>;
}, "strip", z.ZodTypeAny, {
    status_name: "pending" | "confirmed" | "declined" | "refused" | "requested";
    event_id: number;
    profile_id: string;
}, {
    status_name: "pending" | "confirmed" | "declined" | "refused" | "requested";
    event_id: number;
    profile_id: string;
}>;
