import * as z from "zod";
export declare const createEventSchema: z.ZodObject<{
    date: z.ZodString;
    duration: z.ZodNumber;
    location: z.ZodString;
    required_participants: z.ZodNumber;
    organizer_id: z.ZodNumber;
    status_name: z.ZodOptional<z.ZodEnum<["open", "full"]>>;
    participants: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    date?: string;
    duration?: number;
    location?: string;
    required_participants?: number;
    organizer_id?: number;
    status_name?: "open" | "full";
    participants?: number[];
}, {
    date?: string;
    duration?: number;
    location?: string;
    required_participants?: number;
    organizer_id?: number;
    status_name?: "open" | "full";
    participants?: number[];
}>;
export declare const updateEventSchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
    location: z.ZodOptional<z.ZodString>;
    required_participants: z.ZodOptional<z.ZodNumber>;
    profile_id: z.ZodNumber;
    status_name: z.ZodOptional<z.ZodEnum<["open", "full", "cancelled", "completed"]>>;
    participants: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    date?: string;
    duration?: number;
    location?: string;
    required_participants?: number;
    profile_id?: number;
    status_name?: "open" | "full" | "cancelled" | "completed";
    participants?: number[];
}, {
    date?: string;
    duration?: number;
    location?: string;
    required_participants?: number;
    profile_id?: number;
    status_name?: "open" | "full" | "cancelled" | "completed";
    participants?: number[];
}>;
