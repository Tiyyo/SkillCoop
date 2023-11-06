"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFriendshipSchema = exports.searchFriendsSchema = exports.createInvitationSchema = void 0;
const z = require("zod");
exports.createInvitationSchema = z.object({
    adder_id: z.number().int().positive(),
    friend_id: z.number().int().positive(),
});
exports.searchFriendsSchema = z.object({
    username: z.string(),
    profile: z.string(),
    page: z.string().optional()
});
exports.updateFriendshipSchema = z.object({
    adder_id: z.number().int().positive(),
    friend_id: z.number().int().positive(),
    status_name: z.enum(["pending", "confirmed", "declined"]),
});
