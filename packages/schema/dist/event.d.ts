import * as z from "zod";
export declare const createEventSchema: z.ZodObject<{
    start_date: z.ZodString;
    start_time: z.ZodString;
    date: z.ZodString;
    duration: z.ZodNumber;
    location_id: z.ZodNumber;
    required_participants: z.ZodEffects<z.ZodNumber, number, number>;
    organizer_id: z.ZodNumber;
    status_name: z.ZodOptional<z.ZodEnum<["open"]>>;
    participants: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    date: string;
    start_date: string;
    start_time: string;
    duration: number;
    location_id: number;
    required_participants: number;
    organizer_id: number;
    status_name?: "open" | undefined;
    participants?: number[] | undefined;
}, {
    date: string;
    start_date: string;
    start_time: string;
    duration: number;
    location_id: number;
    required_participants: number;
    organizer_id: number;
    status_name?: "open" | undefined;
    participants?: number[] | undefined;
}>;
export declare const updateEventSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    date: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
    location_id: z.ZodNumber;
    required_participants: z.ZodOptional<z.ZodEffects<z.ZodNumber, number, number>>;
    profile_id: z.ZodNumber;
    status_name: z.ZodOptional<z.ZodEnum<["open", "full", "cancelled", "completed"]>>;
    participants: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    location_id: number;
    event_id: number;
    profile_id: number;
    date?: string | undefined;
    duration?: number | undefined;
    required_participants?: number | undefined;
    status_name?: "open" | "full" | "cancelled" | "completed" | undefined;
    participants?: number[] | undefined;
}, {
    location_id: number;
    event_id: number;
    profile_id: number;
    date?: string | undefined;
    duration?: number | undefined;
    required_participants?: number | undefined;
    status_name?: "open" | "full" | "cancelled" | "completed" | undefined;
    participants?: number[] | undefined;
}>;
export declare const updateOrganizerSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    organizer_id: z.ZodNumber;
    new_organizer_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    organizer_id: number;
    event_id: number;
    new_organizer_id: number;
}, {
    organizer_id: number;
    event_id: number;
    new_organizer_id: number;
}>;
