import * as z from "zod";

const createEventSchema = z.object({
    date: z.string().datetime(),
    duration: z.number(),
    location: z.string(),
    required_participants: z.number(),
    num_teams: z.number(),
    organizer_id: z.number(),
    status_name: z.enum(["open", "full"]).optional(),
});

export default createEventSchema;