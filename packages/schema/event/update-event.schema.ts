import * as z from "zod";

const updateEventSchema = z.object({
  // TODO make a custom regex for the date in string format
  date: z.string().optional(),
  duration: z.number().optional(),
  location: z.string().optional(),
  required_participants: z.number().optional(),
  profile_id: z.number().int().positive(),
  status_name: z.enum(["open", "full", "cancelled", "completed"]).optional(),
  participants: z.array(z.number()).optional(),
});

export default updateEventSchema;