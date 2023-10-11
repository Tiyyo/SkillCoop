import * as z from "zod";

const updateFriendshipSchema = z.object({
  adder_id: z.number().int().positive(),
  friend_id: z.number().int().positive(),
  status_name: z.enum(["pending", "confirmed", "declined"]),
});

export default updateFriendshipSchema;
