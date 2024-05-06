import * as z from "zod";
export declare const createEventSchema: z.ZodObject<{
    start_date: z.ZodString;
    start_time: z.ZodString;
    date: z.ZodString;
    duration: z.ZodNumber;
    location_id: z.ZodNumber;
    required_participants: z.ZodEffects<z.ZodNumber, number, number>;
    organizer_id: z.ZodString;
    status_name: z.ZodOptional<z.ZodEnum<["open"]>>;
    participants: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    date: string;
    start_date: string;
    start_time: string;
    duration: number;
    location_id: number;
    required_participants: number;
    organizer_id: string;
    status_name?: "open" | undefined;
    participants?: string[] | undefined;
}, {
    date: string;
    start_date: string;
    start_time: string;
    duration: number;
    location_id: number;
    required_participants: number;
    organizer_id: string;
    status_name?: "open" | undefined;
    participants?: string[] | undefined;
}>;
export declare const updateEventSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    date: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
    location_id: z.ZodOptional<z.ZodNumber>;
    required_participants: z.ZodOptional<z.ZodEffects<z.ZodNumber, number, number>>;
    profile_id: z.ZodString;
    status_name: z.ZodOptional<z.ZodEnum<["open", "full", "cancelled", "completed"]>>;
    participants: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    event_id: number;
    profile_id: string;
    date?: string | undefined;
    duration?: number | undefined;
    location_id?: number | undefined;
    required_participants?: number | undefined;
    status_name?: "open" | "full" | "cancelled" | "completed" | undefined;
    participants?: string[] | undefined;
}, {
    event_id: number;
    profile_id: string;
    date?: string | undefined;
    duration?: number | undefined;
    location_id?: number | undefined;
    required_participants?: number | undefined;
    status_name?: "open" | "full" | "cancelled" | "completed" | undefined;
    participants?: string[] | undefined;
}>;
export declare const updateOrganizerSchema: z.ZodObject<{
    event_id: z.ZodNumber;
    organizer_id: z.ZodString;
    new_organizer_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    organizer_id: string;
    event_id: number;
    new_organizer_id: string;
}, {
    organizer_id: string;
    event_id: number;
    new_organizer_id: string;
}>;
export declare const getEventNearbySchema: z.ZodObject<{
    userCountry: z.ZodString;
    userLongitude: z.ZodString;
    userLatitude: z.ZodString;
    distance: z.ZodString;
    profileId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userCountry: string;
    userLongitude: string;
    userLatitude: string;
    distance: string;
    profileId: string;
}, {
    userCountry: string;
    userLongitude: string;
    userLatitude: string;
    distance: string;
    profileId: string;
}>;
