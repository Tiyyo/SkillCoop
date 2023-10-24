import * as z from "zod";

const updateProfileSchema = z.object({
  profile_id: z.number(),
  username: z.string().min(3).max(20).optional(),
  date_of_birth: z.string().optional(),
  avatar_url: z.string().optional(),
});

export default updateProfileSchema;