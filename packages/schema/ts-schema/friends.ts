import * as z from 'zod';

export const createInvitationSchema = z.object({
  adder_id: z.number().int().positive(),
  friend_id: z.number().int().positive(),
});

export const searchFriendsSchema = z.object({
  username: z.string(),
  profile: z.string(),
  page: z.string().optional()
})

export const updateFriendshipSchema = z.object({
  adder_id: z.number().int().positive(),
  friend_id: z.number().int().positive(),
  username: z.string().optional(),
  status_name: z.enum(["pending", "confirmed", "declined"]),
});
