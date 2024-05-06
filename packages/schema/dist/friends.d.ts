import * as z from 'zod';
export declare const createInvitationSchema: z.ZodObject<{
    adder_id: z.ZodString;
    friend_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    adder_id: string;
    friend_id: string;
}, {
    adder_id: string;
    friend_id: string;
}>;
export declare const searchFriendsSchema: z.ZodObject<{
    username: z.ZodString;
    profile: z.ZodString;
    page: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    profile: string;
    page?: string | undefined;
}, {
    username: string;
    profile: string;
    page?: string | undefined;
}>;
export declare const updateFriendshipSchema: z.ZodObject<{
    adder_id: z.ZodString;
    friend_id: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
    status_name: z.ZodEnum<["pending", "confirmed", "declined"]>;
}, "strip", z.ZodTypeAny, {
    status_name: "pending" | "confirmed" | "declined";
    adder_id: string;
    friend_id: string;
    username?: string | undefined;
}, {
    status_name: "pending" | "confirmed" | "declined";
    adder_id: string;
    friend_id: string;
    username?: string | undefined;
}>;
