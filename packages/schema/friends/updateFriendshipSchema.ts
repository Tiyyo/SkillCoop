import * as z from "zod";

const updateFriendshipSchema = z.object({
  adder_id: z.number(),
  friend_id: z.number(),
  status_name: z.enum(["pending", "confirmed", "declined"]),
});

export default updateFriendshipSchema;
