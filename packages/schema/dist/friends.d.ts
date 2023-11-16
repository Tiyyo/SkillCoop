import * as z from 'zod';
export declare const createInvitationSchema: z.ZodObject<{
    adder_id: z.ZodNumber;
    friend_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    adder_id?: number;
    friend_id?: number;
}, {
    adder_id?: number;
    friend_id?: number;
}>;
export declare const searchFriendsSchema: z.ZodObject<{
    username: z.ZodString;
    profile: z.ZodString;
    page: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username?: string;
    profile?: string;
    page?: string;
}, {
    username?: string;
    profile?: string;
    page?: string;
}>;
export declare const updateFriendshipSchema: z.ZodObject<{
    adder_id: z.ZodNumber;
    friend_id: z.ZodNumber;
    username: z.ZodOptional<z.ZodString>;
    status_name: z.ZodEnum<["pending", "confirmed", "declined"]>;
}, "strip", z.ZodTypeAny, {
    adder_id?: number;
    friend_id?: number;
    username?: string;
    status_name?: "pending" | "confirmed" | "declined";
}, {
    adder_id?: number;
    friend_id?: number;
    username?: string;
    status_name?: "pending" | "confirmed" | "declined";
}>;
