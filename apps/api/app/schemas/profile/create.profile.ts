import * as z from "zod";

const createProfileSchema = z.object({
    user_id: z.number(),
    username: z.string().min(3).max(20),
    date_of_birth: z.string(),
    avatar_url: z.string().optional(),
})

export default createProfileSchema;