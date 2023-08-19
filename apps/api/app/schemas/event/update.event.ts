import * as z from "zod";

const updateEventSchema = z.object({
    event_id: z.number(),
    duration: z.number().optional(),
    location: z.string().optional(),
    required_participants: z.number().optional(),
    num_teams: z.number().optional(),
    organizer_id: z.number(),
    status_name: z.enum(["open", "full"]).optional(),

});

export default updateEventSchema;