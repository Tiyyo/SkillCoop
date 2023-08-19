import * as z from "zod";

const profileOnEventSchema = z.object({
    profile_id: z.number(),
    event_id: z.number(),
    status_name: z.enum(["pending", "confirmed", "declined"])
});

export default profileOnEventSchema;