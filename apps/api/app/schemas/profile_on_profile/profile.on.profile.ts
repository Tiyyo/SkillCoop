import * as z from "zod";

const profileOnProfileSchema = z.object({
    adder_id: z.number(),
    frien_id: z.number(),
    status_name: z.enum(["pending", "confirmed", "declined"]).optional(),
});

export default profileOnProfileSchema;